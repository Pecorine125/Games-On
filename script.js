// BANCO DE DADOS LOCAL DOS JOGOS
const gamesData = [
    { title: "Heiss Ward", image: "https://data.lewdspot.com/img/thumbs/heiss-ward.png", url: "https://lwdbase2.com/heiss-ward-14-20260707/" },
    { title: "Renryuu Ascension", image: "https://data.lewdspot.com/img/thumbs/renryuu-ascension.webp", url: "https://lewdspot.com/embed/renryuu-ascension_26.05.06_2026-06-04/" },
    { title: "Tias Path Home", image: "https://data.lewdspot.com/img/thumbs/tias-path-home.webp", url: "https://lewdspot.com/play?mob=0&url=https://lwdbase3.com/tias-path-home/&fixedwidth=0&gameid=10840&pageid=tias-path-home" },
    { title: "The Girl Who Confessed to Me", image: "https://data.lewdspot.com/img/thumbs/the-girl-who-confessed-to-me.webp", url: "https://lwdbase2.com/the-girl-who-confessed-to-me" },
    { title: "From Wife to Wench", image: "https://data.lewdspot.com/img/thumbs/from-wife-to-wench.webp", url: "https://lwdbase3.com/from-wife-to-wench/" },
    { title: "Margarets Sin", image: "https://data.lewdspot.com/img/thumbs/margarets-sin.webp", url: "https://lwdbase2.com/margarets-sin/" },
    { title: "Lust Brawl", image: "https://data.lewdspot.com/img/thumbs/lust-brawl.webp", url: "https://lwdbase3.com/lust-brawl_0.4A_2026-06-15/" },
    { title: "Goddesses Whim", image: "https://data.lewdspot.com/img/thumbs/goddesses-whim.webp", url: "https://lwdbase2.com/goddesses-whim/" },
    { title: "My Girlfriends Friends", image: "https://data.lewdspot.com/img/thumbs/my-girlfriends-friends.webp", url: "https://lwdbase2.com/my-girlfriends-friends/" },
    { title: "Impurities", image: "https://data.lewdspot.com/img/thumbs/impurities.webp", url: "https://lwdbase2.com/impurities/" },
    { title: "My New Island Life", image: "https://data.lewdspot.com/img/thumbs/my-new-island-life.webp", url: "https://lwdbase3.com/my-new-island-life/" },
    { title: "Fall Of The Angels", image: "https://data.lewdspot.com/img/thumbs/fall-of-the-angels.webp", url: "https://lwdbase3.com/fall-of-the-angels/" },
    { title: "Brewing Curves", image: "https://data.lewdspot.com/img/thumbs/brewing-curves.webp", url: "https://lwdbase3.com/brewing-curves/" },
    { title: "My Life With 4 Succubus", image: "https://data.lewdspot.com/img/thumbs/my-life-with-4-succubus.webp", url: "https://lwdbase3.com/my-life-with-4-succubus/" },
    { title: "Shogun Trainer", image: "https://data.lewdspot.com/img/thumbs/shogun-trainer.webp", url: "https://lwdbase2.com/shogun-trainer/" },
    { title: "Klee Prank Adventure", image: "https://img.itch.zone/aW1hZ2UvMTIyODUzMy83MTY1MDU2LnBuZw==/347x500/%2Fr3FJ7.png", url: "https://cdn77.gamesofdesire.com/files/html5_new/klee-prank-adventure-1-15/index.html" },
    { title: "Ochakos Secret", image: "https://cdn77.gamesofdesire.com/files/img/s1/ochako-s-secret-1.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/ochako-s-secret-full-version/index.html" },
    { title: "My State Sponsored Catgirl", image: "https://cdn77.gamesofdesire.com/files/img/s1/my-state-sponsored-catgirl-1.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-state-sponsored-catgirl-0-97/index.html" },
    { title: "World Tamer", image: "https://img.itch.zone/aW1nLzI4NDA5OTY2LmdpZg==/315x250%23c/Du2eLG.gif", url: "https://html-classic.itch.zone/html/13491748/index.html?v=1782254084" },
    { title: "Tales of Divinity: The Lewdest Journey of Rodinka Called Squirrel", image: "https://cdn77.gamesofdesire.com/files/img/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-v0-07/index.html" },
    { title: "Naughty Principal", image: "https://cdn77.gamesofdesire.com/files/img/naughty-principal-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/naughty-principal-full-game/index.html" },
    { title: "Idle Waifu", image: "https://cdn77.gamesofdesire.com/files/img/idle-waifu-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/idle-waifu/index.html" },
    { title: "Strip Blackjack French Maid", image: "https://cdn77.gamesofdesire.com/files/img/strip-blackjack-french-maid-2.webp", url: "https://www.gamesofdesire.com/ruffle.php?id=200" },
    { title: "Lust for Wealth", image: "https://cdn77.gamesofdesire.com/files/img/lust-for-wealth-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/lust-for-wealth/index.html" },
    { title: "Lotte's Red Chair", image: "https://cdn77.gamesofdesire.com/files/img/lotte-s-red-chair-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/lotte-s-red-chair-full-version/index.html" },
    { title: "Tainted Harmony: A Succubus`s Embrace", image: "https://cdn77.gamesofdesire.com/files/img/tainted-harmony-a-succubus-s-embrace-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/tainted-harmony-a-succubus-s-embrace/index.html" },
    { title: "Salacious Sakura", image: "https://cdn77.gamesofdesire.com/files/img/salacious-sakura-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/salacious-sakura/index.html" },
    { title: "Reika Mission", image: "https://cdn77.gamesofdesire.com/files/img/reika-mission-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/reika-mission/index.html" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" }
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