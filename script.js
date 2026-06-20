let games = [];
let filteredGames = [];
let lastGamesHash = '';

// Carrega jogos do games.txt com auto-update
async function loadGames(silent = false) {
  try {
    const response = await fetch('games.txt?' + new Date().getTime());
    const text = await response.text();
    
    const currentHash = hashCode(text);
    if (currentHash === lastGamesHash) return;

    lastGamesHash = currentHash;
    games = parseGames(text);
    filteredGames = [...games];
    renderGames();
    
    if (!silent) showUpdateMessage();
  } catch (error) {
    console.error("Erro ao carregar games.txt:", error);
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

function parseGames(text) {
  const gamesList = [];
  const blocks = text.split(/ID\s*=\s*\d+/i).filter(b => b.trim() !== '');

  blocks.forEach((block, index) => {
    const titleMatch = block.match(/TitleGames\s*=\s*(.+)/i);
    const imageMatch = block.match(/ImageGames\s*=\s*(.+)/i);
    const linkMatch  = block.match(/LinkGames\s*=\s*(.+)/i);

    const game = {
      id: index + 1,
      title: titleMatch ? titleMatch[1].trim() : `Jogo ${index + 1}`,
      image: imageMatch ? imageMatch[1].trim() : '',
      link: linkMatch ? linkMatch[1].trim() : ''
    };

    if (game.image && game.link) gamesList.push(game);
  });

  return gamesList;
}

function renderGames() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  if (filteredGames.length === 0) {
    grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; padding:40px; color:#888;">Nenhum jogo encontrado 😢</p>`;
    return;
  }

  filteredGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}" loading="lazy">
      <p>${game.title}</p>
    `;
    card.onclick = () => openGame(game);
    grid.appendChild(card);
  });
}

function filterGames() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
  renderGames();
}

// Abre o jogo (SEM tela cheia automática)
function openGame(game) {
  const menu = document.getElementById('menu');
  const gameScreen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('loading');

  menu.classList.remove('active');
  gameScreen.classList.add('active');
  
  loading.style.display = 'block';
  iframe.style.opacity = '0';
  iframe.src = game.link;

  iframe.onload = () => {
    loading.style.display = 'none';
    iframe.style.transition = 'opacity 0.6s';
    iframe.style.opacity = '1';
  };
}

// ==================== CONTROLES ====================
function backToMenu() {
  const iframe = document.getElementById('game-iframe');
  const gameScreen = document.getElementById('game-screen');
  const menu = document.getElementById('menu');

  if (document.fullscreenElement) document.exitFullscreen();

  iframe.src = '';
  gameScreen.classList.remove('active');
  menu.classList.add('active');
}

function closeGame() {
  if (confirm("Deseja fechar o jogo e voltar ao menu?")) backToMenu();
}

function toggleFullscreen() {
  const iframe = document.getElementById('game-iframe');
  
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    // Tenta no iframe primeiro
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen().catch(() => {
        document.documentElement.requestFullscreen().catch(() => {});
      });
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }
}

function showUpdateMessage() {
  const status = document.getElementById('status');
  status.textContent = "✅ Jogos atualizados!";
  status.classList.add('updating');
  setTimeout(() => {
    status.textContent = "Atualizando automaticamente...";
    status.classList.remove('updating');
  }, 3000);
}

// Auto Update
function startAutoUpdate() {
  loadGames(true);
  setInterval(() => loadGames(true), 5000);
}

window.onload = startAutoUpdate;