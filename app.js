// Captura os elementos do HTML
const container = document.getElementById('games-container');
const galleryScreen = document.getElementById('gallery-screen');
const playerScreen = document.getElementById('player-screen');
const iframe = document.getElementById('game-iframe');

// Pega a lista limpa de jogos e monta o grid de 5 colunas direto
function carregarGaleria() {
    // Se o index.html ainda tiver o ID antigo do carrossel, adaptamos para o container correto
    const gridContainer = container || document.getElementById('categories-container');
    if (!gridContainer) return;
    
    // Garante que a classe de estilo do grid de 5 colunas está aplicada
    gridContainer.className = "games-grid";
    gridContainer.innerHTML = "";
    
    if (window.meusJogos) {
        window.meusJogos.forEach((jogo) => {
            // Ignora itens da lista que ainda estão sem link (vazios)
            if (!jogo.url) return;

            const card = document.createElement('div');
            card.className = 'game-card';
            card.onclick = () => iniciarJogo(jogo.url);
            
            card.innerHTML = `
                <img src="${jogo.capa}" alt="${jogo.nome}">
                <span>${jogo.nome}</span>
            `;
            gridContainer.appendChild(card);
        });
    }
}

// Abre o jogo
function iniciarJogo(url) {
    iframe.src = url;
    galleryScreen.classList.remove('active');
    playerScreen.classList.add('active');
}

// Fecha o jogo e limpa a memória RAM do celular
function fecharJogo() {
    iframe.src = "about:blank"; 
    playerScreen.classList.remove('active');
    galleryScreen.classList.add('active');
}

// Executa ao carregar a página
carregarGaleria();