// BANCO DE DADOS LOCAL DOS JOGOS
const gamesData = [
    { title: "Visual Novel 1", image: "https://via.placeholder.com/600x300/202024/ffffff?text=Jogo+1", url: "https://exemplo.com/jogo1" },
    { title: "Visual Novel 2", image: "https://via.placeholder.com/600x300/202024/ffffff?text=Jogo+2", url: "https://exemplo.com/jogo2" },
    { title: "Visual Novel 3", image: "https://via.placeholder.com/600x300/202024/ffffff?text=Jogo+3", url: "https://exemplo.com/jogo3" }
];

let currentIndex = 0;

// Elementos do DOM
const gamesSlider = document.getElementById('gamesSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');
const btnBack = document.getElementById('btnBack');
const btnFullscreen = document.getElementById('btnFullscreen');

// Renderizar o card do Carrossel com estrutura atualizada
function renderCard(index) {
    const game = gamesData[index];
    gamesSlider.innerHTML = `
        <div class="game-card-container">
            <div class="game-image-wrapper" onclick="openGame('${game.url}')">
                <img src="${game.image}" alt="${game.title}" class="game-image-preview">
            </div>
            <div class="game-card-title">${game.title}</div>
        </div>
    `;
}

// Controles do Carrossel
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? gamesData.length - 1 : currentIndex - 1;
    renderCard(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === gamesData.length - 1) ? 0 : currentIndex + 1;
    renderCard(currentIndex);
});

// Ações de Gameplay e Rotação Lock
function openGame(link) {
    window.focus(); 
    gameIframe.src = link;
    menuContainer.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
            console.log("Nota: Trava rígida de rotação aguardando tela cheia.");
        });
    }
}

// Botão de voltar (Limpeza de RAM essencial)
btnBack.addEventListener('click', () => {
    gameIframe.src = "about:blank"; 
    gameScreen.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Fullscreen dinâmico com trava automática de hardware
btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen().then(() => {
            btnFullscreen.textContent = "Sair da Tela Cheia";
            gameIframe.focus(); 
            
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape-primary').catch(err => console.log(err));
            }
        }).catch(err => alert(`Erro ao entrar em Tela Cheia: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
});

// Ouvinte de mudança de tela cheia
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        btnFullscreen.textContent = "Tela Cheia";
        gameIframe.focus();
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }
});

// Carregar o primeiro card ao abrir o site
renderCard(currentIndex);