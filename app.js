const container = document.getElementById('games-container');
const galleryScreen = document.getElementById('gallery-screen');
const playerScreen = document.getElementById('player-screen');
const iframe = document.getElementById('game-iframe');

const notificationBox = document.getElementById('update-notification');
const newVersionTag = document.getElementById('new-version-tag');
const currentVersionTag = document.getElementById('current-version-tag');

let versaoLocal = null;

// Monta a galeria na tela
function carregarGaleria() {
    if (!container) return;
    container.innerHTML = "";
    
    if (window.meusJogos) {
        window.meusJogos.forEach((jogo) => {
            if (!jogo.url) return;

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

// Checa o arquivo de versão burlando o cache do navegador
function verificarVersao() {
    fetch('./versao.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const versaoServidor = data.versao;
            if (versaoLocal === null) {
                versaoLocal = versaoServidor;
                currentVersionTag.innerText = versaoLocal;
            } else if (versaoServidor !== versaoLocal) {
                newVersionTag.innerText = versaoServidor;
                notificationBox.classList.add('show');
            }
        })
        .catch(err => console.log("Erro ao verificar versão técnica:", err));
}

function atualizarPagina() {
    notificationBox.classList.remove('show');
    window.location.reload(true);
}

// Abre o jogo e solicita o travamento em Modo Paisagem
function iniciarJogo(url) {
    iframe.src = url;
    galleryScreen.classList.remove('active');
    playerScreen.classList.add('active');

    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
            console.log("A rotação automática depende do sensor físico estar ativo no painel do celular.");
        });
    }
}

// Ativa o modo Fullscreen nativo do navegador
function activarTelaCheia() {
    const elem = playerScreen;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }

    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
    }
}

// Desativa o Fullscreen e limpa travas de rotação
function desativarTelaCheia() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen().catch(() => {});
        }
    }

    if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
    }
}

// Fecha o player e limpa a memória RAM do iframe
function fecharJogo() {
    desativarTelaCheia();
    iframe.src = "about:blank"; 
    playerScreen.classList.remove('active');
    galleryScreen.classList.add('active');
}

// Evento inteligente: monitora se o usuário virou o celular "em pé" para sair da tela cheia automaticamente
function monitorarRotacaoFisica() {
    if (playerScreen.classList.contains('active')) {
        const sensorRetrato = window.matchMedia("(orientation: portrait)");
        if (sensorRetrato.matches) {
            desativarTelaCheia();
        }
    }
}

// Escuta as ações do sensor do celular
window.addEventListener("orientationchange", monitorarRotacaoFisica);
window.addEventListener("resize", monitorarRotacaoFisica);

// Escuta os dois cliques rápidos na tela
playerScreen.addEventListener('dblclick', () => {
    desativarTelaCheia();
});

// Inicialização automática do sistema
carregarGaleria();
verificarVersao();
setInterval(verificarVersao, 30000); // Roda em background a cada 30 segundos