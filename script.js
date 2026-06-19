async function carregarJogos() {
    const grid = document.getElementById('grid-jogos');
    try {
        const res = await fetch('./jogos.json');
        const jogos = await res.json();
        grid.innerHTML = jogos.map(j => `
            <div class="card" onclick="abrirJogo('${j.url}')">
                <img src="${j.capa}" alt="${j.nome}">
                <p>${j.nome}</p>
            </div>
        `).join('');
    } catch (e) { console.error("Erro no JSON:", e); }
}

function abrirJogo(url) {
    const wrapper = document.getElementById('iframe-wrapper');
    // Iframe limpo sem scripts de rastreamento
    wrapper.innerHTML = `<iframe 
        src="${url}" 
        style="width:100%; height:100%; border:none;"
        allow="fullscreen; autoplay; gamepad">
    </iframe>`;
    document.getElementById('container-jogo').classList.remove('hidden');
}

function fecharJogo() {
    const wrapper = document.getElementById('iframe-wrapper');
    wrapper.innerHTML = '';
    document.getElementById('container-jogo').classList.add('hidden');
}
carregarJogos();