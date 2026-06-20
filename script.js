let games = [];

async function loadGames() {
  try {
    const response = await fetch('games.txt?' + Date.now());
    const text = await response.text();
    games = parseGames(text);
    renderGames();
  } catch (e) {
    console.error("Erro ao carregar games.txt", e);
    document.getElementById('game-grid').innerHTML = "<p style='color:red; text-align:center; padding:50px;'>Erro ao carregar jogos. Verifique o games.txt</p>";
  }
}

function parseGames(text) {
  const list = [];
  const blocks = text.split(/ID\s*=\s*\d+/i).filter(b => b.trim() !== '');

  blocks.forEach((block, i) => {
    const titleMatch = block.match(/TitleGames\s*=\s*(.+)/i);
    const imageMatch = block.match(/ImageGames\s*=\s*(.+)/i);
    const linkMatch  = block.match(/LinkGames\s*=\s*(.+)/i);

    const game = {
      title: titleMatch ? titleMatch[1].trim() : `Jogo ${i+1}`,
      image: imageMatch ? imageMatch[1].trim() : '',
      link: linkMatch ? linkMatch[1].trim() : ''
    };
    if (game.image && game.link) list.push(game);
  });
  return list;
}

function renderGames() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  if (games.length === 0) {
    grid.innerHTML = `<p style="text-align:center; padding:40px; color:#888;">Nenhum jogo encontrado</p>`;
    return;
  }

  games.forEach(game => {
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
  const term = document.getElementById('search-input').value.toLowerCase();
  const filtered = games.filter(g => g.title.toLowerCase().includes(term));
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  filtered.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<img src="${game.image}" loading="lazy"><p>${game.title}</p>`;
    card.onclick = () => openGame(game);
    grid.appendChild(card);
  });
}

function openGame(game) {
  document.getElementById('menu').classList.remove('active');
  const screen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('loading');

  screen.classList.add('active');
  loading.style.display = 'block';
  iframe.src = game.link;

  iframe.onload = () => {
    loading.style.display = 'none';
  };
}

function backToMenu() {
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

window.onload = loadGames;