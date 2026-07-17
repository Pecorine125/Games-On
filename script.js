// LISTA DE JOGOS (Preencha as propriedades link para os jogos aparecerem)
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

// Evita o menu de clique direito nativo dentro da área do jogo
gameScreen.oncontextmenu = function () { return false; };

// Renderiza a lista de jogos na tela em formato Grid
function renderGames() {
    gamesGrid.innerHTML = ""; // Limpa o grid antes de renderizar
    gamesList.forEach(game => {
        // Exibe o card no grid apenas se houver link configurado (evita links em branco)
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

// Abre o jogo com transição suave
function openGame(link) {
    gameIframe.src = link;
    
    // Alterna as classes para iniciar o fade-in / fade-out
    menuContainer.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Botão Back Menu (Voltar) com tratamento de delay para a animação acabar
document.getElementById('btnBack').addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    
    // Espera os 400ms da animação do CSS terminarem para limpar o iframe.
    // Isso evita um flash branco feio na tela enquanto o jogo some.
    setTimeout(() => {
        gameIframe.src = ""; 
    }, 400);
});

// Botão Tela Cheia (Usa a API do Navegador e altera o texto do botão)
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

// Sincroniza o texto do botão se o usuário sair do fullscreen usando a tecla 'ESC'
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        btnFullscreen.textContent = "Tela Cheia";
    }
});

// Botão Close Web
document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; // Fallback para limpar a tela caso o navegador bloqueie o fechamento
});

// Inicializa o script renderizando os jogos na tela
renderGames();