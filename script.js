let games = [];
let filteredGames = [];
let lastGamesHash = '';

// ==================== CARREGA JOGOS ====================
async function loadGames(silent = false) {
  try {
    const response = await fetch('games.txt?' + Date.now());
    const text = await response.text();
    
    const currentHash = hashCode(text);
    if (currentHash === lastGamesHash) return;

    lastGamesHash = currentHash;
    games = parseGames(text);
    filteredGames = [...games];
    renderGames();
    
    if (!silent) showUpdateMessage();
  } catch (e) {
    console.error("Erro ao carregar games.txt", e);
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i) | 0;
  }
  return hash.toString();
}

function parseGames(text) {
  const list = [];
  const blocks = text.split(/ID\s*=\s*\d+/i).filter(b => b.trim());
  
  blocks.forEach((block, i) => {
    const title = block.match(/TitleGames\s*=\s*(.+)/i);
    const image = block.match(/ImageGames\s*=\s*(.+)/i);
    const link  = block.match(/LinkGames\s*=\s*(.+)/i);

    const game = {
      id: i + 1,
      title: title ? title[1].trim() : `Jogo ${i+1}`,
      image: image ? image[1].trim() : '',
      link: link ? link[1].trim() : ''
    };
    if (game.image && game.link) list.push(game);
  });
  return list;
}

function renderGames() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  filteredGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<img src="${game.image}" alt="${game.title}" loading="lazy"><p>${game.title}</p>`;
    card.onclick = () => openGame(game);
    grid.appendChild(card);
  });
}

function filterGames() {
  const term = document.getElementById('search-input').value.toLowerCase();
  filteredGames = games.filter(g => g.title.toLowerCase().includes(term));
  renderGames();
}

// ==================== ABRIR JOGO ====================
function openGame(game) {
  document.getElementById('menu').classList.remove('active');
  const screen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('loading');

  screen.classList.add('active');
  loading.style.display = 'block';
  iframe.style.opacity = '0';
  iframe.src = game.link;

  iframe.onload = () => {
    loading.style.display = 'none';
    iframe.style.opacity = '1';
  };
}

function backToMenu() {
  if (document.fullscreenElement) document.exitFullscreen();
  document.getElementById('game-iframe').src = '';
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('menu').classList.add('active');
}

function closeGame() {
  if (confirm("Fechar o jogo?")) backToMenu();
}

function toggleFullscreen() {
  const iframe = document.getElementById('game-iframe');
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    iframe.requestFullscreen?.().catch(() => document.documentElement.requestFullscreen?.());
  }
}

function showUpdateMessage() {
  const status = document.getElementById('status');
  status.textContent = "✅ Atualizado!";
  setTimeout(() => status.textContent = "Atualizando automaticamente...", 2500);
}

// Auto Update
function startAutoUpdate() {
  loadGames(true);
  setInterval(() => loadGames(true), 5000);
}

window.onload = startAutoUpdate;