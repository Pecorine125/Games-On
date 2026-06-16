// Este arquivo é responsável apenas por guardar a lista de jogos, imagens e URLs
const meusJogos = [
    {
        id: 1,
        nome: "Jogo Exemplo 1",
        capa: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300",
        url: "COLOQUE_AQUI_O_LINK_DO_IFRAME_1"
    },
    {
        id: 2,
        nome: "Jogo Exemplo 2",
        capa: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300",
        url: "COLOQUE_AQUI_O_LINK_DO_IFRAME_2"
    }
];

// Exporta a lista para que o arquivo app.js consiga ler
window.meusJogos = meusJogos;