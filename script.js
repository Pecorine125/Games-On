// LISTA DE JOGOS
const gamesList = [
    { id: 1, image: "Pecorine125/Games-On/games/1.png", link: "https://exemplo.com/jogo1", title: "Jogo 1" }, // Coloquei um link de teste
    { id: 2, image: "Pecorine125/Games-On/games/2.png", link: "", title: "Jogo 2" },
    { id: 3, image: "Pecorine125/Games-On/games/3.png", link: "", title: "Jogo 3" },
    { id: 4, image: "Pecorine125/Games-On/games/4.png", link: "", title: "Jogo 4" }
];

const gamesGrid = document.getElementById('gamesGrid');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');

// Evita o menu de clique direito nativo dentro da área do jogo
gameScreen.oncontextmenu = function () { return false; };

// Renderiza a lista de jogos na tela em formato Grid
function renderGames() {
    gamesGrid.innerHTML = ""; 
    gamesList.forEach(game => {
        // Exibe apenas se houver link configurado
        if(game.link.trim() !== "") {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-title">${game.title}</div>
            `;
            card.addEventListener('click', () => openGame(game.link));
            gamesGrid.appendChild(card);
        }
    });
}

// Abre o jogo
function openGame(link) {
    gameIframe.src = link;
    
    // Melhores práticas: usando propriedades nativas de exibição em vez de adivinhar o display anterior
    menuContainer.style.display = 'none';
    gameScreen.style.display = 'flex';
}

// Botão Back Menu (Voltar)
document.getElementById('btnBack').addEventListener('click', () => {
    gameIframe.src = ""; // Para o som do jogo
    gameScreen.style.display = 'none';
    menuContainer.style.display = ''; // Efeito "reset": remove o 'none' e volta ao que estava no CSS nativamente
});

// Botão Tela Cheia (Com suporte atualizado e tratamento de saída)
const btnFullscreen = document.getElementById('btnFullscreen');
btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen()
            .then(() => {
                btnFullscreen.textContent = "Sair da Tela Cheia";
            })
            .catch(err => {
                alert(`Não foi possível ativar tela cheia: ${err.message}`);
            });
    } else {
        document.exitFullscreen();
    }
});

// Atualiza o texto do botão caso o usuário saia da tela cheia apertando 'ESC' no teclado
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        btnFullscreen.textContent = "Tela Cheia";
    }
});

// Botão Close Web
document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; 
});

// Inicializa o script
renderGames();