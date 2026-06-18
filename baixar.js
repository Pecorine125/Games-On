function baixarJogo(nome, zipUrl) {
    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = nome + '.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Feedback visual
    const btns = document.querySelectorAll('.btn-download');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick').includes(nome)) {
            const original = btn.innerHTML;
            btn.innerHTML = '✅ Baixando...';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = original;
                btn.disabled = false;
            }, 2000);
        }
    });
}