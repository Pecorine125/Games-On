// LISTA DE JOGOS (Filtra automaticamente os que têm link configurado)
const gamesList = [
    { id: 1, image: "./games/1.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/klee-prank-adventure-1-15/index.html", title: "Jogo 1" },
    { id: 2, image: "./games/2.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/shogun-trainer/index.html", title: "Jogo 2" }, 
    { id: 3, image: "./games/3.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-v0-07/index.html", title: "Jogo 3" },
    { id: 4, image: "./games/4.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/my-state-sponsored-catgirl-0-97/index.html", title: "Jogo 4" },
    { id: 5, image: "./games/5.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/mongirl-conquest-0-9-3/index.html", title: "Jogo 5" },
    { id: 6, image: "./games/6.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/isekai-brothel-0-80/index.html", title: "Jogo 6" },
    { id: 7, image: "./games/7.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/fnaf-lustful-shift-0-02/index.html", title: "Jogo 7" }, 
    { id: 8, image: "./games/8.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/salacious-sakura/index.html", title: "Jogo 8" },
    { id: 9, image: "./games/9.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/ochako-s-secret-full-version/index.html", title: "Jogo 9" },
    { id: 10, image: "./games/10.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/from-wife-to-wench-ch-5/index.html", title: "Jogo 10" },
    { id: 11, image: "./games/11.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/step-sis-is-kinda-horny/index.html", title: "Jogo 11" },
    { id: 12, image: "./games/12.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/orange-smash-0-8-2/index.html", title: "Jogo 12" },
    { id: 13, image: "./games/13.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/milfust/index.html", title: "Jogo 13" },
    { id: 14, image: "./games/14.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/perfect-family-a-family-of-perverts/index.html", title: "Jogo 14" },
    { id: 15, image: "./games/15.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/welcome-to-nicest-0-4/index.html", title: "Jogo 15" },
    { id: 16, image: "./games/16.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/headpats-handholding-completed/index.html", title: "Jogo 16" },
    { id: 17, image: "./games/17.png", link: "https://cdn77.gamesofdesire.com/files/html5_new/milf-busters-0-5/index.html", title: "Jogo 17" },
    { id: 18, image: "./games/18.png", link: "", title: "Jogo 18" },
    { id: 19, image: "./games/19.png", link: "", title: "Jogo 19" },
    { id: 20, image: "./games/20.png", link: "", title: "Jogo 20" },
    
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