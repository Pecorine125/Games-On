// ==================== CARREGA JOGOS DO ARQUIVO games.txt ====================

let games = [];

async function loadGames() {
  try {
    const response = await fetch('games.txt');
    const text = await response.text();
    games = parseGames(text);
    renderGames();
  } catch (error) {
    console.error("Erro ao carregar games.txt", error);
    alert("Não foi possível carregar o arquivo games.txt!");
  }
}

function parseGames(text) {
  const gamesList = [];
  const blocks = text.split(/ID\s*=\s*\d+/i).filter(block => block.trim() !== '');

  blocks.forEach((block, index) => {
    const idMatch = block.match(/ID\s*=\s*(\d+)/i);
    const imageMatch = block.match(/ImageGames\s*=\s*(.+)/i);
    const linkMatch = block.match(/LinkGames\s*=\s*(.+)/i);
    const titleMatch = block.match(/TitleGames\s*=\s*(.+)/i); // opcional

    const game = {
      id: idMatch ? parseInt(idMatch[1]) : index + 1,
      title: titleMatch ? titleMatch[1].trim() : `Jogo ${index + 1}`,
      image: imageMatch ? imageMatch[1].trim() : '',
      link: linkMatch ? linkMatch[1].trim() : ''
    };

    if (game.image && game.link) {
      gamesList.push(game);
    }
  });

  return gamesList;
}

// Renderiza os cards
function renderGames() {
  const grid = document.getElementById('game-grid');
  grid.innerHTML = '';

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <p>${game.title}</p>
    `;
    card.onclick = () => openGame(game);
    grid.appendChild(card);
  });
}

// Abre o jogo
function openGame(game) {
  document.getElementById('menu').style.display = 'none';
  const gameScreen = document.getElementById('game-screen');
  const iframe = document.getElementById('game-iframe');
  
  iframe.src = game.link;
  gameScreen.style.display = 'block';
}

// Volta ao menu
function backToMenu() {
  document.getElementById('game-iframe').src = '';
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
}

function closeGame() {
  if (confirm("Deseja realmente fechar o jogo?")) {
    backToMenu();
  }
}

// Tela Cheia
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

// Inicializa
window.onload = loadGames;