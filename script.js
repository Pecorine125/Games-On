function abrirJogo(url) {
    const wrapper = document.getElementById('iframe-wrapper');
    const container = document.getElementById('container-jogo');
    
    // Adicionamos 'allow-popups-to-escape-sandbox' para jogos complexos que abrem janelas extras
    wrapper.innerHTML = `
        <iframe 
            src="${url}" 
            allow="fullscreen; autoplay; gamepad; microphone; camera" 
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox"
            style="width: 100%; height: 100%; border: none;">
        </iframe>`;
    
    container.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}