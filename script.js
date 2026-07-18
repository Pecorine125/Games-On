// LISTA DE JOGOS (Filtra automaticamente os que têm link configurado)
const gamesList = [
    { id: 1, link: "https://cdn77.gamesofdesire.com/files/html5_new/klee-prank-adventure-1-15/index.html", title: "Game Genshin 1" },
    { id: 2, link: "https://cdn77.gamesofdesire.com/files/html5_new/shogun-trainer/index.html", title: "Game Genshin 2" }, 
    { id: 3, link: "https://cdn77.gamesofdesire.com/files/html5_new/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-v0-07/index.html", title: "Tales of Divinity: A Jornada Mais Lasciva de Rodinka, a Esquilo" },
    { id: 4, link: "https://cdn77.gamesofdesire.com/files/html5_new/my-state-sponsored-catgirl-0-97/index.html", title: "Game Girl Cat" },
    { id: 5, link: "https://cdn77.gamesofdesire.com/files/html5_new/mongirl-conquest-0-9-3/index.html", title: "Game Mongirl Conquest" },
    { id: 6, link: "https://cdn77.gamesofdesire.com/files/html5_new/isekai-brothel-0-80/index.html", title: "Game Isekai Brothel" },
    { id: 7, link: "https://cdn77.gamesofdesire.com/files/html5_new/fnaf-lustful-shift-0-02/index.html", title: "Jogo 7" }, 
    { id: 8, link: "https://cdn77.gamesofdesire.com/files/html5_new/salacious-sakura/index.html", title: "Jogo 8" },
    { id: 9, link: "https://cdn77.gamesofdesire.com/files/html5_new/ochako-s-secret-full-version/index.html", title: "Jogo 9" },
    { id: 10, link: "https://cdn77.gamesofdesire.com/files/html5_new/from-wife-to-wench-ch-5/index.html", title: "Jogo 10" },
    { id: 11, link: "https://cdn77.gamesofdesire.com/files/html5_new/step-sis-is-kinda-horny/index.html", title: "Jogo 11" },
    { id: 12, link: "https://cdn77.gamesofdesire.com/files/html5_new/orange-smash-0-8-2/index.html", title: "Jogo 12" },
    { id: 13, link: "https://cdn77.gamesofdesire.com/files/html5_new/milfust/index.html", title: "Jogo 13" },
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

// Renderiza apenas o botão do jogo do índice atual
function updateCarousel() {
    gamesSlider.innerHTML = "";
    
    if (activeGames.length === 0) {
        gamesSlider.innerHTML = "<p>Nenhum jogo ativo configurado.</p>";
        return;
    }

    const game = activeGames[currentIndex];
    
    // Cria o elemento como um botão interativo de texto puro
    const gameButton = document.createElement('button');
    gameButton.className = 'game-button-card';
    gameButton.textContent = game.title;
    
    // Ao clicar no botão, roda o jogo na própria página
    gameButton.addEventListener('click', () => openGame(game.link));
    gamesSlider.appendChild(gameButton);
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

// Botão Back Menu (Voltar para o menu)
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