// Função para baixar jogos (simulada por enquanto)
function baixarJogo(nomeJogo) {
    const url = `jogos_baixados/${nomeJogo}.zip`;
    
    // Cria um link temporário para download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nomeJogo}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Iniciando download de ${nomeJogo}... (se o arquivo .zip existir na pasta jogos_baixados)`);
}