// Captura os elementos do HTML
const container = document.getElementById('games-container');
const galleryScreen = document.getElementById('gallery-screen');
const playerScreen = document.getElementById('player-screen');
const iframe = document.getElementById('game-iframe');

// Pega a lista de jogos que veio do arquivo jogos.js e joga na tela
function carregarGaleria() {
    container.innerHTML = "";
    
    // window.meusJogos vem do arquivo jogos.js
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

// Abre o jogo
function iniciarJogo(url) {
    iframe.src = url;
    galleryScreen.classList.remove('active');
    playerScreen.classList.add('active');
}

// Fecha o jogo e força o celular a limpar a memória RAM
function fecharJogo() {
    iframe.src = "about:blank"; 
    playerScreen.classList.remove('active');
    galleryScreen.classList.add('active');
}

// Executa assim que a página carrega
carregarGaleria();