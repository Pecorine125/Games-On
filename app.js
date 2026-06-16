// Seleção dos elementos do DOM
const container = document.getElementById('games-container');
const galleryScreen = document.getElementById('gallery-screen');
const playerScreen = document.getElementById('player-screen');
const iframe = document.getElementById('game-iframe');

// Função que cria os cards e exibe na tela
function carregarGaleria() {
    container.innerHTML = "";
    
    if (window.meusJogos) {
        window.meusJogos.forEach((jogo) => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.onclick = () => iniciarJogo(jogo.url);
            
            card.innerHTML = `
                <img src="${jogo.capa}" alt="${jogo.nome}">
                <span>${jogo.nome}</span>
            `;
            container.appendChild(card);
        });
    }
}

// Inicia o jogo trocando a tela ativa
function iniciarJogo(url) {
    iframe.src = url;
    galleryScreen.classList.remove('active');
    playerScreen.classList.add('active');
}

// Fecha o jogo e força o navegador do celular a limpar a memória RAM
function fecharJogo() {
    iframe.src = "about:blank"; // Limpeza anti-tela cinza
    playerScreen.classList.remove('active');
    galleryScreen.classList.add('active');
}

// Inicializa a galeria ao abrir o app
carregarGaleria();