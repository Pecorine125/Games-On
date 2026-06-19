async function carregarJogos() {
    try {
        const resposta = await fetch('jogos.json');
        const jogos = await resposta.json();
        const grid = document.getElementById('grid-jogos');

        jogos.forEach(jogo => {
            grid.innerHTML += `
                <div class="card" onclick="abrirJogo('${jogo.url}')">
                    <img src="${jogo.capa}" alt="${jogo.nome}" loading="lazy">
                    <p>${jogo.nome}</p>
                </div>`;
        });
    } catch (e) {
        console.error("Erro ao carregar jogos:", e);
    }
}

function abrirJogo(url) {
    document.getElementById('iframe-wrapper').innerHTML = 
        `<iframe src="${url}" allow="autoplay; fullscreen" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>`;
    document.getElementById('container-jogo').classList.remove('hidden');
}

function fecharJogo() {
    document.getElementById('iframe-wrapper').innerHTML = '';
    document.getElementById('container-jogo').classList.add('hidden');
}

carregarJogos();