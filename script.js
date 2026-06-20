let games = [];

async function loadGames() {
  try {
    const res = await fetch('games.txt?' + Date.now());
    const text = await res.text();
    games = parseGames(text);
    renderGames(games);
  } catch (e) {
    console.error(e);
    document.getElementById('game-grid').innerHTML = `<p style="color:orange;text-align:center;padding:60px;">Erro ao carregar games.txt</p>`;
  }
}

function parseGames(text) {
  const list = [];
  const blocks = text.split(/ID\s*=\s*\d+/i).filter(b => b.trim() !== '');

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

function renderGames(gamesList) {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  gamesList.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" loading="lazy">
      <p>${game.title}</p>
    `;
    card.onclick = () => openGame(game.link);
    grid.appendChild(card);
  });
}

function filterGames() {
  const term = document.getElementById('search-input').value.toLowerCase();
  const filtered = games.filter(g => g.title.toLowerCase().includes(term));
  renderGames(filtered);
}

function openGame(url) {
  const menu = document.getElementById('menu');
  const screen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('loading');

  menu.classList.remove('active');
  screen.classList.add('active');
  loading.style.display = 'block';
  
  iframe.src = url;

  iframe.onload = () => {
    loading.style.display = 'none';
  };
}

function backToMenu() {
  const menu = document.getElementById('menu');
  const screen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');

  screen.classList.remove('active');
  menu.classList.add('active');
  iframe.src = '';
}

function closeGame() {
  backToMenu();
}

function toggleFullscreen() {
  const screen = document.getElementById('game-screen');
  if (!document.fullscreenElement) {
    screen.requestFullscreen().catch(err => {
      console.error(`Erro ao ativar tela cheia: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

window.onload = loadGames;
