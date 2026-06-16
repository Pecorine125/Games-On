// Banco de dados dos seus jogos. Já configurado com o proxy para pular o bloqueio de imagens.
const meusJogos = [
    { id: 1, nome: "Game 1", capa: "https://img.itch.zone/aW1nLzI3MTUyMzQ1LmdpZg==/315x250%23c/6xHqNm.gif", url: "https://worldtamergame.com/release/index.html" },
    { id: 2, nome: "Game 2", capa: "https://img.itch.zone/aW1nLzI3NjUzODc3LnBuZw==/315x250%23c/lCJ7s1.png", url: "https://html-classic.itch.zone/html/17791990/MonsterTutor-0.2-web/index.html?v=1780499465" },
    { id: 3, nome: "Game 3", capa: "https://img.itch.zone/aW1nLzI0OTU0OTg3LmpwZw==/315x250%23c/pDZXFd.jpg", url: "https://html-classic.itch.zone/html/17694679/index.html?v=1779820873" },
    { id: 4, nome: "Game 4", capa: "https://img.itch.zone/aW1nLzIzMTI2MzUxLmdpZg==/315x250%23c/7TYtQT.gif", url: "https://html.itch.zone/html/14112196/index.html" },
    { id: 5, nome: "Game 5", capa: "https://img.itch.zone/aW1nLzI2MzY0NTMyLmpwZw==/315x250%23c/X%2Bkr5D.jpg", url: "https://html-classic.itch.zone/html/16956657/index.html?v=1774660687" },
    { id: 6, nome: "Game 6", capa: "https://img.itch.zone/aW1nLzE5NTk2OTMyLmdpZg==/315x250%23c/NZUWJS.gif", url: "https://html-classic.itch.zone/html/16133272/index.html" },
    { id: 7, nome: "Game 7", capa: "https://img.itch.zone/aW1nLzIwNjcyMTc0LmpwZw==/315x250%23c/ua5aDt.jpg", url: "https://html-classic.itch.zone/html/13349837/index.html" },
    { id: 8, nome: "Game 8", capa: "https://img.itch.zone/aW1nLzIwNjU2NTY1LmpwZw==/315x250%23c/zqHoJG.jpg", url: "https://html-classic.itch.zone/html/16797714/index.html?v=1773484292" },
    { id: 9, nome: "Game 9", capa: "https://img.itch.zone/aW1nLzExNDA4ODY1LnBuZw==/315x250%23c/fhpaf7.png", url: "https://html-classic.itch.zone/html/7300614/index.html?v=1732313662" },
    { id: 10, nome: "Game 10", capa: "https://img.itch.zone/aW1nLzEyMzQyMzE4LnBuZw==/315x250%23c/L5uMLp.png", url: "https://html-classic.itch.zone/html/8028076/index.html?v=1732313643" },
    { id: 11, nome: "Game 11", capa: "https://img.itch.zone/aW1nLzExNjQyNDIwLnBuZw==/315x250%23c/Sb72IT.png", url: "https://html-classic.itch.zone/html/7558797/index.html?v=1732313654" },
    { id: 12, nome: "Game 12", capa: "https://img.itch.zone/aW1nLzI0OTU0OTg3LmpwZw==/315x250%23c/pDZXFd.jpg", url: "https://html-classic.itch.zone/html/17694679/index.html?v=1779820873" },
    { id: 13, nome: "Game 13", capa: "https://img.itch.zone/aW1nLzI3MTkwMTU4LnBuZw==/315x250%23c/f6qDLP.png", url: "https://html-classic.itch.zone/html/17477313/StuckwithmyExsFamilyandZombies-DEMO-web/index.html?v=1778335312" },
    { id: 14, nome: "Game 14", capa: "https://img.itch.zone/aW1nLzE3NzE2Mzg0LnBuZw==/315x250%23c/B6oJgd.png", url: "https://html.itch.zone/html/11543078/html/index.html?v=1732313542" },
    { id: 15, nome: "Game 15", capa: "https://img.itch.zone/aW1nLzI1OTkyNzY2LmdpZg==/315x250%23c/FAI%2FfC.gif", url: "https://html-classic.itch.zone/html/16717086/WebGL-Mother-in-Lust-v1.0-DEMO/index.html?v=1772840227" },
    { id: 16, nome: "Game 16", capa: "https://img.itch.zone/aW1nLzIzOTI1MTM2LnBuZw==/315x250%23c/gR5qwb.png", url: "https://html-classic.itch.zone/html/15440552/MyFluffyNeighborMoonfall-1.2.0-web/index.html" },
    { id: 17, nome: "Game 17", capa: "", url: "" },
    { id: 18, nome: "Game 18", capa: "", url: "" },
    { id: 19, nome: "Game 19", capa: "", url: "" },
    { id: 20, nome: "Game 20", capa: "", url: "" },
    { id: 21, nome: "Game 21", capa: "", url: "" },
    { id: 22, nome: "Game 22", capa: "", url: "" },
    { id: 23, nome: "Game 23", capa: "", url: "" },
];

// Compartilha os dados com o app.js
window.meusJogos = meusJogos;