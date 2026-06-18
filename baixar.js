function baixarJogo(nome, zipUrl) {
    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = nome + '.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback visual
    const btn = event.currentTarget;
    const originalText = btn.textContent;
    btn.textContent = '✅ Baixando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
}