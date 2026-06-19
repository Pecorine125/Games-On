async function carregarJogos() {
    const grid = document.getElementById('grid-jogos');
    try {
        const res = await fetch('jogos.json');
        const jogos = await res.json();
        
        grid.innerHTML = jogos.map(j => `
            <div class="card" onclick="abrirJogo('${j.url}')">
                <img src="${j.capa}" alt="${j.nome}" loading="lazy">
                <p>${j.nome}</p>
            </div>
        `).join('');
    } catch (e) {
        console.error("Erro ao carregar lista de jogos:", e);
    }
}

function abrirJogo(url) {
    const wrapper = document.getElementById('iframe-wrapper');
    const container = document.getElementById('container-jogo');
    
    // O segredo está no 'sandbox': ele impede que o jogo redirecione sua página
    wrapper.innerHTML = `
        <iframe 
            src="${url}" 
            allow="autoplay; fullscreen; gamepad; microphone" 
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
            allowfullscreen>
        </iframe>`;
    
    container.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
}

function fecharJogo() {
    const wrapper = document.getElementById('iframe-wrapper');
    const container = document.getElementById('container-jogo');
    
    wrapper.innerHTML = ''; // Limpa o iframe para parar o som/processamento
    container.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Libera o scroll
}

carregarJogos();