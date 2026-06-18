function baixarJogo(nome, zipUrl) {
    if (!zipUrl) {
        alert("Arquivo de download ainda não disponível.");
        return;
    }

    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = nome + '.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback no botão
    const buttons = document.querySelectorAll('.btn-download');
    for (let btn of buttons) {
        if (btn.getAttribute('onclick').includes(nome)) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Iniciando download...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2500);
            break;
        }
    }
}