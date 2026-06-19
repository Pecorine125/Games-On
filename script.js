async function carregarJogos() {
    const grid = document.getElementById('grid-jogos');
    try {
        // Usamos um caminho relativo simples
        const res = await fetch('./jogos.json');
        const jogos = await res.json();
        grid.innerHTML = jogos.map(j => `
            <div class="card" onclick="abrirJogo('${j.url}')">
                <img src="${j.capa}" alt="${j.nome}">
                <p>${j.nome}</p>
            </div>
        `).join('');
    } catch (e) { console.error("Erro ao carregar jogos:", e); }
}

function abrirJogo(url) {
    const wrapper = document.getElementById('iframe-wrapper');
    // Injetamos um iframe simples que o AdBlock não vê como anúncio
    wrapper.innerHTML = `<iframe src="${url}" allow="fullscreen; autoplay; gamepad"></iframe>`;
    document.getElementById('container-jogo').classList.remove('hidden');
}

function fecharJogo() {
    const wrapper = document.getElementById('iframe-wrapper');
    wrapper.innerHTML = '';
    document.getElementById('container-jogo').classList.add('hidden');
}
carregarJogos();