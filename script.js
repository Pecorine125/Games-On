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
    } catch (e) { console.error(e); }
}

function abrirJogo(url) {
    const wrapper = document.getElementById('iframe-wrapper');
    // O atributo sandbox COM 'allow-top-navigation-by-user-activation'
    // mas SEM 'allow-top-navigation' força o jogo a ficar no iframe.
    wrapper.innerHTML = `
        <iframe 
            src="${url}" 
            allow="autoplay; fullscreen; gamepad" 
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
            allowfullscreen>
        </iframe>`;
    document.getElementById('container-jogo').classList.remove('hidden');
}

function fecharJogo() {
    document.getElementById('iframe-wrapper').innerHTML = '';
    document.getElementById('container-jogo').classList.add('hidden');
}
carregarJogos();