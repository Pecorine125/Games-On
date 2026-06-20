let games = [];
let filteredGames = [];

// Carrega jogos do games.txt
async function loadGames() {
  try {
    const response = await fetch('games.txt');
    const text = await response.text();
    games = parseGames(text);
    filteredGames = [...games];
    renderGames();
  } catch (error) {
    console.error("Erro ao carregar games.txt:", error);
    alert("❌ Não foi possível carregar o arquivo games.txt!");
  }
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

// Renderiza os jogos
function renderGames() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  if (filteredGames.length === 0) {
    grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; padding:40px;">Nenhum jogo encontrado 😢</p>`;
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

// Filtra jogos pela busca
function filterGames() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm)
  );
  renderGames();
}

// Abre o jogo com animações
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
    
    // Tenta tela cheia em landscape
    if (window.innerWidth > window.innerHeight) {
      setTimeout(() => {
        document.documentElement.requestFullscreen().catch(() => {});
      }, 600);
    }
  };
}

// Volta ao menu
function backToMenu() {
  const iframe = document.getElementById('game-iframe');
  const gameScreen = document.getElementById('game-screen');
  const menu = document.getElementById('menu');

  iframe.src = '';
  gameScreen.classList.remove('active');
  menu.classList.add('active');
}

function closeGame() {
  if (confirm("Deseja fechar o jogo e voltar ao menu?")) {
    backToMenu();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Inicializa
window.onload = loadGames;