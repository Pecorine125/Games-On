let games = [];
let filteredGames = [];

async function loadGames() {
  try {
    const res = await fetch('games.txt?' + Date.now());
    const text = await res.text();
    games = parseGames(text);
    filteredGames = [...games];
    renderGames();
  } catch(e) { console.error(e); }
}

function parseGames(text) {
  const list = [];
  const blocks = text.split(/ID\s*=\s*\d+/i).filter(b => b.trim());
  blocks.forEach((block, i) => {
    const title = block.match(/TitleGames\s*=\s*(.+)/i);
    const image = block.match(/ImageGames\s*=\s*(.+)/i);
    const link  = block.match(/LinkGames\s*=\s*(.+)/i);
    const game = {
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
    card.innerHTML = `<img src="${game.image}" loading="lazy"><p>${game.title}</p>`;
    card.onclick = () => openGame(game);
    grid.appendChild(card);
  });
}

function filterGames() {
  const term = document.getElementById('search-input').value.toLowerCase();
  filteredGames = games.filter(g => g.title.toLowerCase().includes(term));
  renderGames();
}

function openGame(game) {
  document.getElementById('menu').classList.remove('active');
  const screen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('loading');

  screen.classList.add('active');
  loading.style.display = 'block';
  iframe.src = game.link;

  iframe.onload = () => loading.style.display = 'none';
}

function backToMenu() {
  document.getElementById('game-iframe').src = '';
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('menu').classList.add('active');
}

function closeGame() { if(confirm("Fechar?")) backToMenu(); }
function toggleFullscreen() {
  const iframe = document.getElementById('game-iframe');
  if (document.fullscreenElement) document.exitFullscreen();
  else iframe.requestFullscreen?.() || document.documentElement.requestFullscreen?.();
}

window.onload = loadGames;