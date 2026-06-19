async function carregarJogos() {
    const grid = document.getElementById('grid-jogos');
    try {
        const resposta = await fetch('jogos.json');
        const jogos = await resposta.json();
        grid.innerHTML = jogos.map(jogo => `
            <div class="card" onclick="abrirJogo('${jogo.url}')">
                <img src="${jogo.capa}" alt="${jogo.nome}">
                <p>${jogo.nome}</p>
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = "<p>Erro ao carregar jogos. Verifique o arquivo JSON.</p>";
    }
}

function abrirJogo(url) {
    const wrapper = document.getElementById('iframe-wrapper');
    wrapper.innerHTML = `<iframe src="${url}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    document.getElementById('container-jogo').classList.remove('hidden');
}

function fecharJogo() {
    document.getElementById('iframe-wrapper').innerHTML = '';
    document.getElementById('container-jogo').classList.add('hidden');
}

carregarJogos();