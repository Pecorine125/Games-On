async function carregarJogos() {
    const grid = document.getElementById('grid-jogos');
    try {
        const res = await fetch('jogos.json');
        const jogos = await res.json();
        grid.innerHTML = jogos.map(j => `
            <div class="card" onclick="abrirJogo('${j.url}')">
                <img src="${j.capa}" alt="${j.nome}">
                <p>${j.nome}</p>
            </div>
        `).join('');
    } catch (e) { console.error(e); }
}

function abrirJogo(url) {
    document.getElementById('iframe-wrapper').innerHTML = 
        `<iframe src="${url}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.getElementById('container-jogo').classList.remove('hidden');
}

function fecharJogo() {
    document.getElementById('iframe-wrapper').innerHTML = '';
    document.getElementById('container-jogo').classList.add('hidden');
}
carregarJogos();