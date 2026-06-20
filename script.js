// LISTA DE JOGOS
const gamesList = [
    {
        id: 1,
        // Usando o link completo com a versão exata que você extraiu
        link: "https://html-classic.itch.zone/html/17151144/index.html?v=1776086364",
        image: "https://img.itch.zone/aW1nLzIwODI0ODA3LnBuZw==/315x250%23c/grufc0.png",
        title: "Jogo 1"
    },
    { id: 2, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 2" },
    { id: 3, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 3" },
    { id: 4, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 4" },
    { id: 5, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 5" },
    { id: 6, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 6" },
    { id: 7, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 7" },
    { id: 8, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 8" },
    { id: 9, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 9" },
    { id: 10, image: "https://via.placeholder.com/315x250", link: "", title: "Jogo 10" }
];

const gamesGrid = document.getElementById('gamesGrid');
const menuContainer = document.getElementById('menuContainer');
const gameScreen = document.getElementById('gameScreen');
const gameIframe = document.getElementById('gameIframe');

// Desativa o clique direito na tela do jogo para não atrapalhar os controles
gameScreen.oncontextmenu = function () { return false; };

function renderGames() {
    gamesList.forEach(game => {
        if(game.link !== "") {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-title">${game.title}</div>
            `;
            card.addEventListener('click', () => openGame(game.link));
            gamesGrid.appendChild(card);
        }
    });
}

function openGame(link) {
    gameIframe.src = link;
    menuContainer.style.display = 'none';
    gameScreen.style.display = 'flex';
}

document.getElementById('btnBack').addEventListener('click', () => {
    gameIframe.src = ""; 
    gameScreen.style.display = 'none';
    menuContainer.style.display = 'block';
});

document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        gameScreen.requestFullscreen().catch(err => {
            alert(`Não foi possível ativar tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

document.getElementById('btnCloseWeb').addEventListener('click', () => {
    window.close();
    window.location.href = "about:blank"; 
});

renderGames();