// i18n.js
const translations = {
  pt: {
    appTitle: "Web Games Launcher",
    rotateWarningText: "Gire o dispositivo para o modo Paisagem (Deitado)",
    btnBack: "Voltar ao Menu",
    btnFullscreen: "Tela Cheia",
    prevLabel: "Jogo Anterior",
    nextLabel: "Próximo Jogo"
  },
  en: {
    appTitle: "Web Games Launcher",
    rotateWarningText: "Rotate your device to Landscape mode",
    btnBack: "Back to Menu",
    btnFullscreen: "Fullscreen",
    prevLabel: "Previous Game",
    nextLabel: "Next Game"
  }
};

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('launcher_lang') || 'pt';
  }

  setLang(lang) {
    if (translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('launcher_lang', lang);
      this.updateUI();
    }
  }

  t(key) {
    return translations[this.currentLang]?.[key] || key;
  }

  updateUI() {
    // Atualiza o título do App
    const titleEl = document.querySelector('.app-title');
    if (titleEl) titleEl.textContent = this.t('appTitle');

    // Aviso de rotação
    const rotateEl = document.querySelector('#rotateWarning p');
    if (rotateEl) rotateEl.textContent = this.t('rotateWarningText');

    // Botões do jogo
    const btnBack = document.querySelector('#btnBack');
    if (btnBack) btnBack.textContent = this.t('btnBack');

    const btnFs = document.querySelector('#btnFullscreen');
    if (btnFs) btnFs.textContent = this.t('btnFullscreen');

    // Labels do carrossel
    const prevBtn = document.querySelector('#prevBtn');
    if (prevBtn) prevBtn.setAttribute('aria-label', this.t('prevLabel'));

    const nextBtn = document.querySelector('#nextBtn');
    if (nextBtn) nextBtn.setAttribute('aria-label', this.t('nextLabel'));

    // Dispara evento caso precise escutar em outros scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
  }
}

const i18n = new I18n();