// LISTA DE JOGOS (Filtra automaticamente os que têm link configurado)
const gamesList = [
    { id: 1, image: "./games/1.png", link: "https://exemplo.com/jogo1", title: "Jogo 1" },
    { id: 2, image: "./games/2.png", link: "https://exemplo.com/jogo2", title: "Jogo 2" }, 
    { id: 3, image: "./games/3.png", link: "https://exemplo.com/jogo3", title: "Jogo 3" },
    { id: 4, image: "./games/4.png", link: "https://exemplo.com/jogo4", title: "Jogo 4" },
    { id: 5, image: "./games/5.png", link: "https://exemplo.com/jogo5", title: "Jogo 5" },
    { id: 6, image: "./games/6.png", link: "https://exemplo.com/jogo6", title: "Jogo 6" },
    { id: 7, image: "./games/7.png", link: "https://exemplo.com/jogo7", title: "Jogo 7" }, 
    { id: 8, image: "./games//.png", link: "https://exemplo.com/jogo8", title: "Jogo 8" },
    { id: 9, image: "./games/8.png", link: "https://exemplo.com/jogo9", title: "Jogo 9" },
    { id: 10, image: "./games/10.png", link: "https://exemplo.com/jogo10", title: "Jogo 10" }
];

// Filtra apenas os jogos válidos que possuem link preenchido
const activeGames = gamesList.filter(game => game.link.trim() !== "");

let currentIndex = 0; // Controla qual jogo está ativo na tela

const gamesSlider = document.getElementById('gamesSlider');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');
const btnFullscreen = document.getElementById('btnFullscreen');

// Evita clique direito na tela do jogo
gameScreen.oncontextmenu = function () { return false; };

// Renderiza apenas o jogo do índice atual
function updateCarousel() {
    gamesSlider.innerHTML = "";
    
    if (activeGames.length === 0) {
        gamesSlider.innerHTML = "<p>Nenhum jogo configurado com link.</p>";
        return;
    }

    const game = activeGames[currentIndex];
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <div class="game-title">${game.title}</div>
    `;
    
    // Clica na imagem e o jogo roda na própria página sem sair do site
    card.addEventListener('click', () => openGame(game.link));
    gamesSlider.appendChild(card);
}

// Passar para o próximo jogo
document.getElementById('nextBtn').addEventListener('click', () => {
    if (activeGames.length === 0) return;
    currentIndex = (currentIndex + 1) % activeGames.length;
    updateCarousel();
});

// Voltar para o jogo anterior
document.getElementById('prevBtn').addEventListener('click', () => {
    if (activeGames.length === 0) return;
    currentIndex = (currentIndex - 1 + activeGames.length) % activeGames.length;
    updateCarousel();
});

// Abre o jogo (Troca de tela com animação suave)
function openGame(link) {
    gameIframe.src = link;
    menuContainer.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Botão Back Menu (Voltar para o menu caso enjoe)
document.getElementById('btnBack').addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    setTimeout(() => { gameIframe.src = ""; }, 400); // Para o som do iframe
});

/* ================= LÓGICA DE SAVE / LOAD ================= */

// Salva o progresso no armazenamento interno do navegador
document.getElementById('btnSave').addEventListener('click', () => {
    if (activeGames.length === 0) return;
    const currentGame = activeGames[currentIndex];
    
    localStorage.setItem('gamesOn_savedIndex', currentIndex);
    alert(`Progresso salvo! Jogo atual: ${currentGame.title}`);
});

// Carrega o progresso salvo
document.getElementById('btnLoad').addEventListener('click', () => {
    const savedIndex = localStorage.getItem('gamesOn_savedIndex');
    
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex, 10);
        updateCarousel();
        alert(`Save carregado com sucesso!`);
    } else {
        alert("Nenhum save encontrado no sistema.");
    }
});

/* ================= CONTROLES EXTRAS ================= */

btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen().then(() => {
            btnFullscreen.textContent = "Sair da Tela Cheia";
        }).catch(err => alert(`Erro ao ativar tela cheia: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) btnFullscreen.textContent = "Tela Cheia";
});

document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; 
});

// Inicialização do Carrossel
updateCarousel();