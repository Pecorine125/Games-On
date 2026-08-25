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