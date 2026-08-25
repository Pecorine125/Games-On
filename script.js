// 1. REGISTRO DO SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW Ativo:', reg.scope))
      .catch(err => console.warn('Erro no SW:', err));
  });
}

// 2. BANCO DE DADOS DOS JOGOS
const gamesData = [
    { title: "harem-residence", image: "https://img.itch.zone/aW1nLzgyMzM5MDEuanBn/original/w4dWJr.jpg", url: "https://mopoga.com/embed/harem-residence/" },
    { title: "garden-of-venus", image: "https://newgamesbox.com/wp-content/uploads/2025/09/Garden-of-Venus-Download-Free-PC-Game-Direct-Link.jpg", url: "https://mopoga.com/embed/garden-of-venus/" },
    { title: "my-family-farm", image: "https://img.itch.zone/aW1nLzk4ODE5ODcucG5n/original/H3AtOM.png", url: "https://cdn77.gamesofdesire.com/files/html5_new/my-family-farm/index.html" },
    { title: "klee-prank-adventure", image: "https://img.itch.zone/aW1hZ2UvMTIyODUzMy85MjY0Nzk4LmdpZg==/original/LZ65Ih.gif", url: "https://cdn77.gamesofdesire.com/files/html5_new/klee-prank-adventure-1-15/index.html" },
    { title: "fall-of-the-angels", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFhqhK8nBkgV1YS9msrSW1rZqgnvhgEhDOjjbTCoeVJLdJkSqAaaeIEuR&s=10", url: "https://lwdbase3.com/fall-of-the-angels/" },
    { title: "my-life-with-4-succubus", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2fBq0dJRatV81OyCl5TykTY6rVbCWKVMjEw8nA0jp-zxbkSkgU90htx4H&s=10", url: "https://lwdbase3.com/my-life-with-4-succubus/" },
    { title: "18-titans", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeU5IK-aazAzPnW4tzBCMV2zjhxYUPgTDql9OFgblsjf0h0mBjwKwd5xY&s=10", url: "https://mopoga.com/embed/18titans-167-2026-0707/" },
    { title: "complex-society", image: "https://img.itch.zone/aW1hZ2UvODEyODU2LzIyMTM3NzcxLnBuZw==/original/yz1Xhx.png", url: "https://mopoga.com/embed/complex-society/" },
    { title: "Hex: Becoming a Succubus", image: "https://data.lewdspot.com/img/thumbs/hex-becoming-a-succubus.webp", url: "https://lwdbase2.com/hex-becoming-a-succubus-035-2026-08-20/" },
    { title: "Lustful Sin", image: "https://data.lewdspot.com/img/thumbs/lustful-sin.webp", url: "https://lwdbase2.com/lustful-sin-099-2026-08-11/" },
    { title: "The Girl Who Confessed to Me", image: "https://data.lewdspot.com/img/thumbs/the-girl-who-confessed-to-me.webp", url: "https://lwdbase2.com/the-girl-who-confessed-to-me" },
    { title: "Kamogawa Island", image: "https://data.lewdspot.com/img/thumbs/kamogawa-island.webp", url: "https://lwdbase2.com/kamogawa-island-031-2026-07-24/" },
    { title: "D20 Magic Dice", image: "https://data.lewdspot.com/img/thumbs/d20-magic-dice.webp", url: "https://lwdbase2.com/d20-magic-dice-102-2026-08-21/" },
    { title: "Adventurer Trainer", image: "https://data.lewdspot.com/img/thumbs/adventurer-trainer.webp", url: "https://lwdbase2.com/adventurer-trainer-023c-2026-08-19/" },
    { title: "My Cuckqueen Girlfriend", image: "https://data.lewdspot.com/img/thumbs/my-cuckqueen-girlfriend.webp", url: "https://lwdbase3.com/my-cuckquean-girlfriend_0.10.0D_2026-06-15/" },
    { title: "Impurities", image: "https://data.lewdspot.com/img/thumbs/impurities.webp", url: "https://lwdbase2.com/impurities/" },
    { title: "My New Island Life", image: "https://data.lewdspot.com/img/thumbs/my-new-island-life.webp", url: "https://lwdbase3.com/my-new-island-life/" },
    { title: "Fall Of The Angels", image: "https://data.lewdspot.com/img/thumbs/fall-of-the-angels.webp", url: "https://lwdbase3.com/fall-of-the-angels/" },
    { title: "Brewing Curves", image: "https://data.lewdspot.com/img/thumbs/brewing-curves.webp", url: "https://lwdbase3.com/brewing-curves/" },
    { title: "AIRevolution", image: "https://data.lewdspot.com/img/thumbs/airevolution.webp", url: "https://lwdbase2.com/airevolution/" },
    { title: "Academy Live", image: "https://data.lewdspot.com/img/thumbs/academy-live.webp", url: "https://lwdbase2.com/academy-live/" },
    { title: "Chasing Memories", image: "https://data.lewdspot.com/img/thumbs/chasing-memories.webp", url: "https://lwdbase2.com/chasing-memories-045-2026-08-25/" },
    { title: "Heiss Ward", image: "https://data.lewdspot.com/img/thumbs/heiss-ward.webp", url: "https://lwdbase2.com/heiss-ward-27-2026-08-17/" },
    { title: "Vicindio", image: "https://data.lewdspot.com/img/thumbs/vicindio.webp", url: "https://lwdbase3.com/vicindio-0884-2026-08-11/" },
    { title: "My New Girlfriend", image: "https://data.lewdspot.com/img/thumbs/my-new-girlfriend.webp", url: "https://lewdspot.com/embed/my-new-girlfriend-BeachDay2R-2026-07-15/" },
    { title: "From Wife to Wench", image: "https://data.lewdspot.com/img/thumbs/from-wife-to-wench.webp", url: "https://lwdbase3.com/from-wife-to-wench-ch8-2026-08-11/" },
    { title: "The Fixer", image: "https://data.lewdspot.com/img/thumbs/the-fixer.webp", url: "https://lwdbase2.com/the-fixer-03604-2026-07-24/" },
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
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" },
    { title: "", image: "", url: "" }
];

// Salva a posição anterior do carrossel no LocalStorage
let currentIndex = parseInt(localStorage.getItem('last_game_index'), 10) || 0;

// ELEMENTOS DOM
const gamesSlider = document.getElementById('gamesSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const iframeContainer = document.getElementById('iframeContainer');
const btnBack = document.getElementById('btnBack');
const btnFullscreen = document.getElementById('btnFullscreen');

// 3. RENDERIZAÇÃO DO CARD
function renderCard(index) {
  const game = gamesData[index];
  localStorage.setItem('last_game_index', index);

  gamesSlider.innerHTML = `
    <div class="game-card-container">
      <div class="game-image-wrapper" id="cardClickArea">
        <img src="${game.image}" alt="${game.title}" class="game-image-preview" loading="lazy">
      </div>
      <div class="game-card-title">${game.title}</div>
    </div>
  `;

  document.getElementById('cardClickArea').addEventListener('click', () => openGame(game.url));

  // Pré-carregamento da próxima capa para navegação fluida
  const nextIdx = (index + 1) % gamesData.length;
  const imgPreload = new Image();
  imgPreload.src = gamesData[nextIdx].image;
}

// NAVEGAÇÃO
function navigate(direction) {
  if (direction === 'next') {
    currentIndex = (currentIndex === gamesData.length - 1) ? 0 : currentIndex + 1;
  } else {
    currentIndex = (currentIndex === 0) ? gamesData.length - 1 : currentIndex - 1;
  }
  renderCard(currentIndex);
}

prevBtn.addEventListener('click', () => navigate('prev'));
nextBtn.addEventListener('click', () => navigate('next'));

// SUPORTE A GESTOS (TOUCH/SWIPE NO CELULAR)
let touchStartX = 0;
let touchEndX = 0;

gamesSlider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

gamesSlider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) navigate('next');
  if (touchEndX > touchStartX + 50) navigate('prev');
}, { passive: true });

// 4. ABRIR JOGO COM CRIAÇÃO DINÂMICA DE IFRAME
function openGame(url) {
  iframeContainer.innerHTML = ''; // Limpa qualquer resto prévio

  const iframe = document.createElement('iframe');
  iframe.className = 'game-iframe';
  iframe.id = 'gameIframe';
  iframe.setAttribute('allow', 'fullscreen; autoplay; payment; gamepad; accelerometer; gyroscope');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads');
  iframe.src = url;

  iframeContainer.appendChild(iframe);

  menuContainer.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  // Solicita travamento em modo deitado se disponível
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {});
  }
}

// 5. FECHAR JOGO COM LIMPEZA RIGOROSA DE MEMÓRIA RAM
btnBack.addEventListener('click', () => {
  const iframe = document.getElementById('gameIframe');
  
  if (iframe) {
    iframe.src = 'about:blank'; // Força desalocação da memória no browser
    iframe.remove();
  }

  gameScreen.classList.add('hidden');
  menuContainer.classList.remove('hidden');

  if (document.fullscreenElement || document.webkitFullscreenElement) {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }

  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  }
});

// 6. TRATAMENTO DE TELA CHEIA
async function toggleFullscreen() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

  if (!isFullscreen) {
    try {
      if (iframeContainer.requestFullscreen) {
        await iframeContainer.requestFullscreen();
      } else if (iframeContainer.webkitRequestFullscreen) {
        await iframeContainer.webkitRequestFullscreen();
      }

      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape').catch(() => {});
      }
    } catch (e) {
      console.warn('Fullscreen negado ou não suportado:', e);
    }
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}

btnFullscreen.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', handleFSChange);
document.addEventListener('webkitfullscreenchange', handleFSChange);

function handleFSChange() {
  const isFS = document.fullscreenElement || document.webkitFullscreenElement;
  btnFullscreen.textContent = isFS ? "Sair da Tela Cheia" : "Tela Cheia";
  
  const iframe = document.getElementById('gameIframe');
  if (iframe) iframe.focus();
}

// RENDER INICIAL
renderCard(currentIndex);