// render.js
function renderGames() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '';

    games.forEach(game => {
        const cardHTML = `
            <div class="card">
                <img class="capa" src="${game.capa}" alt="${game.nome}">
                <div class="nome">${game.nome}</div>
                <div class="buttons">
                    ${game.temWeb ? `
                    <a class="btn-play" href="jogos_baixados/${game.pasta}/index.html" target="_blank">
                        ▶ Jogar
                    </a>` : ''}
                    
                    <button class="btn-download" onclick="baixarJogo('${game.nome}', 'zips/${game.pasta}.zip')">
                        ⬇️ Baixar
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

// Renderiza ao carregar a página
window.onload = renderGames;