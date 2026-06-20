// LISTA DE JOGOS (Preencha os IDs de 2 a 10 alterando as propriedades aqui)
const gamesList = [
    { id: 1, image: "https://img.itch.zone/aW1nLzI3OTY4Njk3LmdpZg==/315x250%23c/0E2dBb.gif", link: "https://html-classic.itch.zone/html/13491748/index.html", title: "Jogo 1" },
    { id: 2, image: "", link: "", title: "Jogo 2" },
    { id: 3, image: "", link: "", title: "Jogo 3" },
    { id: 4, image: "", link: "", title: "Jogo 4" },
    { id: 5, image: "", link: "", title: "Jogo 5" },
    { id: 6, image: "", link: "", title: "Jogo 6" },
    { id: 7, image: "", link: "", title: "Jogo 7" },
    { id: 8, image: "", link: "", title: "Jogo 8" },
    { id: 9, image: "", link: "", title: "Jogo 9" },
    { id: 10, image: "", link: "", title: "Jogo 10" }
];

const gamesGrid = document.getElementById('gamesGrid');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');

// Evita o menu de clique direito nativo dentro da área do jogo
gameScreen.oncontextmenu = function () { return false; };

// Renderiza a lista de jogos na tela em formato Grid
function renderGames() {
    gamesGrid.innerHTML = ""; // Limpa o grid antes de renderizar
    gamesList.forEach(game => {
        // Exibe o card no grid apenas se houver link configurado
        if(game.link !== "") {
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

// Abre o jogo tentando usar uma requisição limpa para o iframe
function openGame(link) {
    // Definimos o link direto no iframe
    gameIframe.src = link;
    
    // Esconde o menu e mostra a tela do jogo
    menuContainer.style.display = 'none';
    gameScreen.style.display = 'flex';
}

// Botão Back Menu (Voltar)
document.getElementById('btnBack').addEventListener('click', () => {
    gameIframe.src = ""; // Reseta o iframe para parar o som do jogo ao fundo
    gameScreen.style.display = 'none';
    menuContainer.style.display = 'block';
});

// Botão Tela Cheia (Usa a API do Navegador)
document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen().catch(err => {
            alert(`Não foi possível ativar tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

// Botão Close Web
document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; // Fallback caso o navegador bloqueie o window.close()
});

// Inicializa o script renderizando os jogos na tela
renderGames();