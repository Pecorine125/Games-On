const gamesList = [
    { id: 1, link: "https://cdn77.gamesofdesire.com/files/html5_new/klee-prank-adventure-1-15/index.html", title: "Genshin 1" },
    { id: 2, link: "https://cdn77.gamesofdesire.com/files/html5_new/shogun-trainer/index.html", title: "Genshin 2" }, 
    { id: 3, link: "https://cdn77.gamesofdesire.com/files/html5_new/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-v0-07/index.html", title: "Tales of Divinity" },
    { id: 4, link: "https://cdn77.gamesofdesire.com/files/html5_new/my-state-sponsored-catgirl-0-97/index.html", title: "Girl Cat" },
    { id: 5, link: "https://cdn77.gamesofdesire.com/files/html5_new/mongirl-conquest-0-9-3/index.html", title: "Mongirl Conquest" },
    { id: 6, link: "https://cdn77.gamesofdesire.com/files/html5_new/isekai-brothel-0-80/index.html", title: "Isekai Brothel" },
    { id: 7, link: "https://cdn77.gamesofdesire.com/files/html5_new/fnaf-lustful-shift-0-02/index.html", title: "FNAF Lustful Shift" }, 
    { id: 8, link: "https://cdn77.gamesofdesire.com/files/html5_new/salacious-sakura/index.html", title: "Jogo 8" },
    { id: 9, link: "https://cdn77.gamesofdesire.com/files/html5_new/ochako-s-secret-full-version/index.html", title: "Ochaco Uraraka" },
    { id: 10, link: "https://cdn77.gamesofdesire.com/files/html5_new/from-wife-to-wench-ch-5/index.html", title: "De esposa a mulher de vida fácil" },
    { id: 11, link: "https://cdn77.gamesofdesire.com/files/html5_new/step-sis-is-kinda-horny/index.html", title: "Minha meia-irmã" },
    { id: 12, link: "https://cdn77.gamesofdesire.com/files/html5_new/orange-smash-0-8-2/index.html", title: "Orange Smash" },
    { id: 13, link: "https://cdn77.gamesofdesire.com/files/html5_new/milfust/index.html", title: "Milfst" },
    { id: 14, link: "https://cdn77.gamesofdesire.com/files/html5_new/perfect-family-a-family-of-perverts/index.html", title: "Jogo 14" },
    { id: 15, link: "https://cdn77.gamesofdesire.com/files/html5_new/welcome-to-nicest-0-4/index.html", title: "Jogo 15" },
    { id: 16, link: "https://cdn77.gamesofdesire.com/files/html5_new/headpats-handholding-completed/index.html", title: "Jogo 16" },
    { id: 17, link: "https://cdn77.gamesofdesire.com/files/html5_new/milf-busters-0-5/index.html", title: "Jogo 17" },
    { id: 18, link: "https://cdn77.gamesofdesire.com/files/html5_new/my-harem-saga/index.html", title: "Jogo 18" },
    { id: 19, link: "https://cdn77.gamesofdesire.com/files/html5_new/isekai-incubus-1-3/index.html", title: "Jogo 19" },
    { id: 20, link: "https://cdn77.gamesofdesire.com/files/html5_new/delicious-business-v0-25-1/index.html", title: "Jogo 20" },
    { id: 21, link: "https://lwdbase3.com/from-wife-to-wench/", title: "Games 21" },
    { id: 22, link: "https://lwdbase3.com/my-cuckquean-girlfriend_0.10.0D_2026-06-15/", title: "Games 22" },
    { id: 23, link: "https://lwdbase3.com/lust-brawl_0.4A_2026-06-15/", title: "Games 23" },
    { id: 24, link: "https://lwdbase2.com/goddesses-whim/", title: "Games 24" },
    { id: 25, link: "https://lwdbase2.com/my-girlfriends-friends/", title: "Games 25" },
    { id: 26, link: "https://lwdbase3.com/fourteenth-fantasy-harem-reborn/", title: "Games 26" },
    { id: 27, link: "https://lwdbase2.com/impurities/", title: "Games 27" },
    { id: 28, link: "https://lwdbase3.com/my-new-island-life/", title: "Games 28" },
    { id: 29, link: "https://lwdbase3.com/fall-of-the-angels/", title: "Games 29" },
    { id: 30, link: "https://lwdbase3.com/brewing-curves/", title: "Games 30" },
    { id: 31, link: "https://lwdbase3.com/my-life-with-4-succubus/", title: "Games 31" },
    { id: 32, link: "https://lwdbase3.com/tias-path-home/", title: "Games 32" },
    { id: 33, link: "https://lewdspot.com/embed/renryuu-ascension_26.05.06_2026-06-04/", title: "Games 33" },
    { id: 34, link: "https://lwdbase3.com/facefuck-madness-reloaded016-20260618/", title: "Games 34" },
    { id: 35, link: "https://lwdbase2.com/hindsdale-days-15-2026-06-29/", title: "Games 35" },
    { id: 36, link: "https://lwdbase3.com/my-girlfriends-new-kink-08-2026-07-13/", title: "Games 36" },
    { id: 37, link: "https://lwdbase2.com/heiss-ward-14-20260707/", title: "Games 37" }
];

const activeGames = gamesList.filter(game => game.link.trim() !== "");
let currentIndex = 0;

const gamesSlider = document.getElementById('gamesSlider');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');
const btnFullscreen = document.getElementById('btnFullscreen');

// Proteções contra saídas e anúncios invasivos
gameIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-pointer-lock');
gameIframe.setAttribute('loading', 'eager');

gameScreen.oncontextmenu = () => false;

function updateCarousel() {
    gamesSlider.innerHTML = "";
    if (activeGames.length === 0) {
        gamesSlider.innerHTML = "<p>Nenhum jogo ativo configurado.</p>";
        return;
    }

    const game = activeGames[currentIndex];
    
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-card-container';

    const gameImg = document.createElement('img');
    gameImg.src = `./games/${game.id}.png`; 
    gameImg.alt = game.title;
    gameImg.className = 'game-image-preview';

    // Fallback se a foto sumir ou falhar
    gameImg.onerror = function() {
        this.src = 'https://via.placeholder.com/180x120/222/fff?text=Sem+Imagem';
    };

    const gameTitle = document.createElement('div');
    gameTitle.className = 'game-card-title';
    gameTitle.textContent = game.title;

    gameContainer.appendChild(gameImg);
    gameContainer.appendChild(gameTitle);
    
    gameContainer.addEventListener('click', () => openGame(game.link));
    gamesSlider.appendChild(gameContainer);
}

document.getElementById('nextBtn').addEventListener('click', () => {
    if (activeGames.length === 0) return;
    currentIndex = (currentIndex + 1) % activeGames.length;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (activeGames.length === 0) return;
    currentIndex = (currentIndex - 1 + activeGames.length) % activeGames.length;
    updateCarousel();
});

function openGame(link) {
    window.focus(); 
    gameIframe.src = link;
    menuContainer.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

document.getElementById('btnBack').addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    // Limpeza completa de cache/RAM do jogo anterior ao sair (Foco no hardware do A05)
    setTimeout(() => { gameIframe.src = "about:blank"; }, 100); 
});

/* SAVE / LOAD */
document.getElementById('btnSave').addEventListener('click', () => {
    if (activeGames.length === 0) return;
    const currentGame = activeGames[currentIndex];
    localStorage.setItem('gamesOn_savedIndex', currentIndex);
    alert(`Salvo: ${currentGame.title}`);
});

document.getElementById('btnLoad').addEventListener('click', () => {
    const savedIndex = localStorage.getItem('gamesOn_savedIndex');
    if (savedIndex !== null) {
        currentIndex = parseInt(savedIndex, 10);
        updateCarousel();
        alert(`Carregado com sucesso!`);
    } else {
        alert("Nenhum save encontrado.");
    }
});

/* FULLSCREEN */
btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen().then(() => {
            btnFullscreen.textContent = "Sair da Tela Cheia";
            gameIframe.focus(); 
        }).catch(err => alert(`Erro: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        btnFullscreen.textContent = "Tela Cheia";
        gameIframe.focus();
    }
});

document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; 
});

updateCarousel();