// Este arquivo é responsável apenas por guardar a lista de jogos, imagens e URLs
const meusJogos = [
    {
        id: 1,
        nome: "Game 1",
        capa: "https://fgn.cdn.serverable.com/common/flashes/w/b/becoming_a_king.webp",
        url: "https://fgn.cdn.serverable.com/common/flashes/nf/becoming_a_king/index.html?d=20250404182532"
    },
    {
        id: 2,
        nome: "Game 2",
        capa: "https://fgn.cdn.serverable.com/common/flashes/w/b/biological_lust.webp",
        url: "https://fgn.cdn.serverable.com/common/flashes/nf/biological_lust/index.html?d=20250530005319"
    }
];

// Exporta a lista para que o arquivo app.js consiga ler
window.meusJogos = meusJogos;