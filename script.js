let games = [];

async function loadGames() {
  try {
    const res = await fetch('games.txt?' + Date.now());
    const text = await res.text();
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

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.image}" loading="lazy">
      <p>${game.title}</p>
    `;
    card.onclick = () => window.open(game.link, '_blank');
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
    card.onclick = () => window.open(game.link, '_blank');
    grid.appendChild(card);
  });
}

window.onload = loadGames;