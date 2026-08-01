// REGISTRO DO SERVICE WORKER (Adicione no início do seu arquivo JS)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker de Cache ativo!', reg.scope))
            .catch(err => console.warn('Erro ao registrar Service Worker:', err));
    });
}

// BANCO DE DADOS LOCAL DOS JOGOS
const gamesData = [
    { title: "Heiss Ward", image: "https://data.lewdspot.com/img/thumbs/heiss-ward.png", url: "https://lwdbase2.com/heiss-ward-14-20260707/" },
    { title: "Renryuu Ascension", image: "https://data.lewdspot.com/img/thumbs/renryuu-ascension.webp", url: "https://lewdspot.com/embed/renryuu-ascension_26.05.06_2026-06-04/" },
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
    { title: "Klee Prank Adventure", image: "https://cdn77.gamesofdesire.com/files/img/klee-prank-adventure-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/klee-prank-adventure-1-15/index.html" },
    { title: "Ochakos Secret", image: "https://cdn77.gamesofdesire.com/files/img/s1/ochako-s-secret-1.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/ochako-s-secret-full-version/index.html" },
    { title: "My State Sponsored Catgirl", image: "https://cdn77.gamesofdesire.com/files/img/s1/my-state-sponsored-catgirl-1.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-state-sponsored-catgirl-0-97/index.html" },
    { title: "Tales of Divinity: The Lewdest Journey of Rodinka Called Squirrel", image: "https://cdn77.gamesofdesire.com/files/img/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/tales-of-divinity-the-lewdest-journey-of-rodinka-called-squirrel-v0-07/index.html" },
    { title: "Naughty Principal", image: "https://cdn77.gamesofdesire.com/files/img/naughty-principal-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/naughty-principal-full-game/index.html" },
    { title: "Idle Waifu", image: "https://cdn77.gamesofdesire.com/files/img/idle-waifu-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/idle-waifu/index.html" },
    { title: "Strip Blackjack French Maid", image: "https://cdn77.gamesofdesire.com/files/img/strip-blackjack-french-maid-2.webp", url: "https://www.gamesofdesire.com/ruffle.php?id=200" },
    { title: "Lust for Wealth", image: "https://cdn77.gamesofdesire.com/files/img/lust-for-wealth-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/lust-for-wealth/index.html" },
    { title: "Lotte's Red Chair", image: "https://cdn77.gamesofdesire.com/files/img/lotte-s-red-chair-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/lotte-s-red-chair-full-version/index.html" },
    { title: "Tainted Harmony: A Succubus`s Embrace", image: "https://cdn77.gamesofdesire.com/files/img/tainted-harmony-a-succubus-s-embrace-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/tainted-harmony-a-succubus-s-embrace/index.html" },
    { title: "Salacious Sakura", image: "https://cdn77.gamesofdesire.com/files/img/salacious-sakura-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/salacious-sakura/index.html" },
    { title: "Reika Mission", image: "https://cdn77.gamesofdesire.com/files/img/reika-mission-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/reika-mission/index.html" },
    { title: "Branded to Fall", image: "https://cdn77.gamesofdesire.com/files/img/branded-to-fall-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/branded-to-fall/index.html" },
    { title: "DickCare", image: "https://cdn77.gamesofdesire.com/files/img/dickcare-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/dickcare-0-345/index.html" },
    { title: "Gazonga Chronicles", image: "https://cdn77.gamesofdesire.com/files/img/gazonga-chronicles-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/gazonga-chronicles/index.html" },
    { title: "Milk University", image: "https://cdn77.gamesofdesire.com/files/img/milk-university-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/milk-university/index.html" },
    { title: "ChariKiss", image: "https://cdn77.gamesofdesire.com/files/img/charikiss-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/charikiss/index.html" },
    { title: "The After Hours: Office Predators", image: "https://cdn77.gamesofdesire.com/files/img/the-after-hours-office-predators-1.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/the-after-hours-office-predators/index.html" },
    { title: "Step Sis Is Kinda Horny?!", image: "https://cdn77.gamesofdesire.com/files/img/step-sis-is-kinda-horny-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/step-sis-is-kinda-horny/index.html" },
    { title: "My New Paranormal Life", image: "https://cdn77.gamesofdesire.com/files/img/my-new-paranormal-life-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-new-paranormal-life/index.html" },
    { title: "Lost Lagoon", image: "https://cdn77.gamesofdesire.com/files/img/lost-lagoon-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/lost-lagoon-0-3-3/index.html" },
    { title: "Demon's Servant", image: "https://cdn77.gamesofdesire.com/files/img/demon-s-servant-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/demon-s-servant/index.html" },
    { title: "Milfust", image: "https://cdn77.gamesofdesire.com/files/img/milfust-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/milfust/index.html" },
    { title: "The Fixer", image: "https://cdn77.gamesofdesire.com/files/img/the-fixer-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/the-fixer-v0-3-3-21/index.html" },
    { title: "Perfect Family: A Family of Perverts", image: "https://cdn77.gamesofdesire.com/files/img/perfect-family-a-family-of-perverts-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/perfect-family-a-family-of-perverts/index.html" },
    { title: "Welcome to Nicest", image: "https://cdn77.gamesofdesire.com/files/img/welcome-to-nicest-3.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/welcome-to-nicest-0-4/index.html" },
    { title: "Lust Legion", image: "https://cdn77.gamesofdesire.com/files/img/lust-legion-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/lust-legion/index.html" },
    { title: "Kingdom of Subversion", image: "https://cdn77.gamesofdesire.com/files/img/kingdom-of-subversion-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/kingdom-of-subversion-v0-23-1/index.html" },
    { title: "KonoSuba: This lecherous World", image: "https://cdn77.gamesofdesire.com/files/img/konosuba-this-lecherous-world-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/konosuba-this-lecherous-world/index.html" },
    { title: "My Hero Rising", image: "https://cdn77.gamesofdesire.com/files/img/my-hero-rising-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-hero-rising-0-76/index.html" },
    { title: "My Sweet Home", image: "https://cdn77.gamesofdesire.com/files/img/my-sweet-home-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-sweet-home/index.html" },
    { title: "Meet'N'Fuck : Grandma Boobitch", image: "https://cdn77.gamesofdesire.com/files/img/meet-n-fuck-grandma-boobitch-free-full-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/meet-n-fuck-grandma-boobitch-free-full/index.html" },
    { title: "Goblin Waifu", image: "https://cdn77.gamesofdesire.com/files/img/goblin-waifu-3.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/goblin-waifu/index.html" },
    { title: "Isekai Incubus", image: "https://cdn77.gamesofdesire.com/files/img/isekai-incubus-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/isekai-incubus-1-3/index.html" },
    { title: "MonGirl Sexpedition", image: "https://cdn77.gamesofdesire.com/files/img/mongirl-sexpedition-3.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/mongirl-sexpedition/index.html" },
    { title: "Surrendering to My Crush", image: "https://cdn77.gamesofdesire.com/files/img/surrendering-to-my-crush-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/surrendering-to-my-crush-1-11/index.html" },
    { title: "The void club ", image: "https://cdn77.gamesofdesire.com/files/img/the-voic-club-ch-5-2-0-pokemon-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/the-voic-club-ch-5-2-0-pokemon/index.html" },
    { title: "Manic Pixie Waifus Update", image: "https://cdn77.gamesofdesire.com/files/img/manic-pixie-waifus-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/manic-pixie-waifus/index.html" },
    { title: "Monster Girl 1,000", image: "https://cdn77.gamesofdesire.com/files/img/monster-girl-1-000-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/monster-girl-1-000/index.html" },
    { title: "Peerless Lust", image: "https://cdn77.gamesofdesire.com/files/img/peerless-lust-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/peerless-lust/index.html" },
    { title: "My Family Farm", image: "https://cdn77.gamesofdesire.com/files/img/my-family-farm-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-family-farm/index.html" },
    { title: "Emilia & Joseph: Exploited Innocence", image: "https://cdn77.gamesofdesire.com/files/img/emilia-joseph-exploited-innocence-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/emilia-joseph-exploited-innocence/index.html" },
    { title: "BDSM Apocalypse", image: "https://cdn77.gamesofdesire.com/files/img/bdsm-apocalypse-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/bdsm-apocalypse/index.html" },
    { title: "Erosion", image: "https://cdn77.gamesofdesire.com/files/img/erosion-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/erosion/index.html" },
    { title: "My Girlfriend's Friends", image: "https://cdn77.gamesofdesire.com/files/img/my-girlfriend-s-friends-3.webp", url: "https://cdn77.gamesofdesire.com/files/html5/my-girlfriend-s-friends/index.html" },
    { title: "Breaking The Lust", image: "https://cdn77.gamesofdesire.com/files/img/breaking-the-lust-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5/breaking-the-lust/index.html" },
    { title: "Paprika Trainer", image: "https://cdn77.gamesofdesire.com/files/img/paprika-trainer-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5_new/paprika-trainer-1-2-0-0/index.html" },
    { title: "Milfy Cummy: Gloria Returns", image: "https://cdn77.gamesofdesire.com/files/img/milfy-cummy-gloria-returns-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5/milfy-cummy-gloria-returns/index.html" },
    { title: "Teens Do Porn", image: "https://cdn77.gamesofdesire.com/files/img/teens-do-porn-2.webp", url: "https://cdn77.gamesofdesire.com/files/html5/teens-do-porn/index.html" },
    { title: "Foxgirl Cassidy", image: "https://porngames.com/img/foxgirl-cassidy.jpg", url: "https://collegesexgames.com/swf/cdn/1384/" },
    { title: "the-goblin-girl-i-met-on-the-farm", image: "https://wetpussygames.com/images/games/180x135/the-goblin-girl-i-met-on-the-farm200.jpg", url: "https://blogofsex.com/files/games2/the-goblin-girl-i-met-on-the-farm" },
    { title: "Galactic Love Utopia Arrival", image: "https://wetpussygames.com/images/games/180x135/galactic-love-utopia-arrival200.jpg", url: "https://blogofsex.com/files/games2/galactic-love-utopia-arrival" },
    { title: "Academy Live", image: "https://data.mopoga.com/img/thumbs/academy-live.webp", url: "https://mopoga.com/embed/academy-live/" },
    { title: "18Titans", image: "https://data.mopoga.com/img/thumbs/18titans.webp", url: "https://mopoga.com/embed/18titans-167-2026-0707/" },
    { title: "AIRevolution", image: "https://data.mopoga.com/img/thumbs/airevolution.webp", url: "https://mopoga.com/embed/airevolution/" },
    { title: "Airhead Academy", image: "https://data.mopoga.com/img/thumbs/airhead-academy.webp", url: "https://mopoga.com/embed/airhead-academy/" },
    { title: "Android LIFE", image: "https://data.mopoga.com/img/thumbs/android-life.webp", url: "https://mopoga.com/embed/android-life/" },
    { title: "Blurring the Walls", image: "https://data.mopoga.com/img/thumbs/blurring-the-walls.webp", url: "https://mopoga.com/embed/blurring-the-walls/index.html" },
    { title: "Booty Hunter", image: "https://data.mopoga.com/img/thumbs/booty-hunter.webp", url: "https://mopoga.com/embed/booty-hunter-0140-2026-05-21/" },
    { title: "Broken Sky", image: "https://data.mopoga.com/img/thumbs/broken-sky.webp", url: "https://mopoga.com/embed/broken-sky/" },
    { title: "Brothel Slop", image: "https://data.mopoga.com/img/thumbs/brothel-slop.webp", url: "https://mopoga.com/embed/brothel-slop/" },
    { title: "Chasing Memories", image: "https://data.mopoga.com/img/thumbs/chasing-memories.webp", url: "https://mopoga.com/embed/chasing-memories-042-2026-07-31/" },
    { title: "Complex Society", image: "https://data.mopoga.com/img/thumbs/complex-society.webp", url: "https://mopoga.com/embed/complex-society/" }
    { title: "Cursed Forest Quest", image: "https://data.mopoga.com/img/thumbs/cursed-forest-quest.webp", url: "https://mopoga.com/embed/cursed-forest-quest/" },
    { title: "D20 Magic Dice", image: "https://data.mopoga.com/img/thumbs/d20-magic-dice.webp", url: "https://mopoga.com/embed/d20-magic-dice-101-2026-07-30/" },
    { title: "Edgefield", image: "https://data.mopoga.com/img/thumbs/edgefield.webp", url: "https://mopoga.com/embed/edgefield/" },
    { title: "FLESHBREAK", image: "https://data.mopoga.com/img/thumbs/fleshbreak.webp", url: "https://mopoga.com/embed/fleshbreak/" },
    { title: "Falling Stars", image: "https://data.mopoga.com/img/thumbs/falling-stars.webp", url: "https://mopoga.com/embed/falling-stars/" },
    { title: "Familiar Circumstances", image: "https://data.mopoga.com/img/thumbs/familiar-circumstances.webp", url: "https://mopoga.com/familiar-circumstances-12-2026-07-31/" },
    { title: "Friendship With Benefits 2", image: "https://data.mopoga.com/img/thumbs/friendship-with-benefits-2.webp", url: "https://mopoga.com/embed/friendship-with-benefits-2/" },
    { title: "Futa Academy of Sex", image: "https://data.mopoga.com/img/thumbs/futa-academy-of-sex.webp", url: "https://mopoga.com/embed/futa-academy-of-sex/" },
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

// Otimização para Mobile: Configura permissões essenciais do Iframe
gameIframe.setAttribute('allow', 'fullscreen; autoplay; payment');
gameIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');

function renderCard(index) {
    const game = gamesData[index];
    gamesSlider.innerHTML = `
        <div class="game-card-container">
            <div class="game-image-wrapper" id="cardClickArea">
                <img src="${game.image}" alt="${game.title}" class="game-image-preview" loading="lazy">
            </div>
            <div class="game-card-title">${game.title}</div>
        </div>
    `;
    
    document.getElementById('cardClickArea').addEventListener('click', () => openGame(game.url));
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

// Abrir Jogo
function openGame(link) {
    gameIframe.src = link;
    menuContainer.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Limpeza de RAM do IFRAME (Sem apagar o Cache mantido pelo Service Worker)
btnBack.addEventListener('click', () => {
    gameIframe.src = "about:blank"; 
    
    gameScreen.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
});

// Fullscreen Dinâmico ajustado para Android / Chrome
btnFullscreen.addEventListener('click', async () => {
    try {
        if (!document.fullscreenElement) {
            if (gameScreen.requestFullscreen) {
                await gameScreen.requestFullscreen();
            } else if (gameScreen.webkitRequestFullscreen) {
                await gameScreen.webkitRequestFullscreen();
            }

            btnFullscreen.textContent = "Sair da Tela Cheia";
            gameIframe.focus(); 

            if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('landscape-primary').catch(() => {
                    return screen.orientation.lock('landscape');
                }).catch(err => console.log("Erro de orientação ignorado:", err));
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
    } catch (err) {
        console.warn("Falha no modo tela cheia:", err);
    }
});

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        btnFullscreen.textContent = "Tela Cheia";
        gameIframe.focus();
        
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }
}

// Renderização inicial
renderCard(currentIndex);