// LISTA DE JOGOS (Ajustado para caminhos locais de imagem corretos)
const gamesList = [
    { id: 1, image: "./games/1.png", link: "https://exemplo.com/jogo1", title: "Jogo 1" }, // Exemplo com link ativo
    { id: 2, image: "./games/2.png", link: "", title: "Jogo 2" },
    { id: 3, image: "./games/3.png", link: "", title: "Jogo 3" },
    { id: 4, image: "./games/4.png", link: "", title: "Jogo 4" },
    { id: 5, image: "./games/5.png", link: "", title: "Jogo 5" },
    { id: 6, image: "./games/6.png", link: "", title: "Jogo 6" },
    { id: 7, image: "./games/7.png", link: "", title: "Jogo 7" },
    { id: 8, image: "./games/8.png", link: "", title: "Jogo 8" },
    { id: 9, image: "./games/9.png", link: "", title: "Jogo 9" },
    { id: 10, image: "./games/10.png", link: "", title: "Jogo 10" }
];

const gamesGrid = document.getElementById('gamesGrid');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');
const btnFullscreen = document.getElementById('btnFullscreen');

// Desativa o clique direito dentro da tela do jogo
gameScreen.oncontextmenu = function () { return false; };

// Renderiza a lista de jogos na tela
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

// Abre o jogo com animação fade
function openGame(link) {
    gameIframe.src = link;
    menuContainer.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Botão Back Menu com delay estratégico para suavizar a transição do som/imagem
document.getElementById('btnBack').addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    
    // Aguarda o término da animação do CSS (400ms) para limpar o iframe
    setTimeout(() => {
        gameIframe.src = ""; 
    }, 400);
});

// Controle de Tela Cheia
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

// Sincroniza o texto do botão caso o usuário saia pelo botão ESC do teclado
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        btnFullscreen.textContent = "Tela Cheia";
    }
});

// Botão Fechar Web
document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; 
});

// Inicialização
renderGames();