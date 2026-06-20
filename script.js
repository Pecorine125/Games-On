let games = [];

async function loadGames() {
  try {
    const response = await fetch('games.txt?' + Date.now());
    const text = await response.text();
    games = parseGames(text);
    renderGames();
  } catch (e) {
    console.error(e);
    document.getElementById('game-grid').innerHTML = `<p style="color:orange;text-align:center;padding:60px;">Erro ao carregar games.txt</p>`;
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

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}" loading="lazy">
      <p>${game.title}</p>
    `;
    card.onclick = () => openGame(game.link);
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
    card.onclick = () => openGame(game.link);
    grid.appendChild(card);
  });
}

function openGame(url) {
  document.getElementById('menu').classList.remove('active');
  const screen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  const loading = document.getElementById('loading');

  screen.classList.add('active');
  loading.style.display = 'block';
  
  // Aplica as permissões e politicas de recursos recomendadas para jogos HTML5 no itch.io
  iframe.setAttribute("sandbox", "allow-scripts allow-popups allow-forms allow-modals");
  iframe.setAttribute("allow", "fullscreen; autoplay; gamepad; midi");
  iframe.src = url;

  iframe.onload = () => {
    loading.style.display = 'none';
  };
}

function backToMenu() {
  const iframe = document.getElementById('game-iframe');
  
  // Limpa os atributos para interromper os processos do jogo anterior em segundo plano
  iframe.src = '';
  iframe.removeAttribute("sandbox");
  iframe.removeAttribute("allow");
  
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('menu').classList.add('active');
}

function closeGame() {
  if (confirm("Deseja fechar o jogo?")) backToMenu();
}

function toggleFullscreen() {
  const elem = document.getElementById('game-screen');
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

window.onload = loadGames;