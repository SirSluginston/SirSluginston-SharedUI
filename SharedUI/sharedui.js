// Minimal SharedUI helpers: inject header, footer, and apply branding

/**
 * Injects header HTML and sets logo, title, tagline from config
 * @param {Object} config - { projectLogoUrl, projectTitle, projectTagline }
 */
function injectHeader(config) {
  fetch('Header/header.html').then(r => r.text()).then(html => {
    document.getElementById('header-container').innerHTML = html;
    var logoEl = document.querySelector('.shared-header-logo');
    if (logoEl && config.projectLogoUrl) logoEl.src = config.projectLogoUrl;
    var headerTitleEl = document.querySelector('.shared-header-title');
    if (headerTitleEl && config.projectTitle) headerTitleEl.textContent = config.projectTitle;
    var headerTaglineEl = document.querySelector('.shared-header-tagline');
    if (headerTaglineEl && config.projectTagline) headerTaglineEl.textContent = config.projectTagline;
    // Account icon placeholder remains; consuming app can inject logic
    if (typeof initThemeToggle === 'function') initThemeToggle();
  });
}

/**
 * Injects footer HTML and sets footer content from config
 * @param {Object} config - { footerNote, copyright }
 */
function injectFooter(config) {
  fetch('Footer/footer.html').then(r => r.text()).then(html => {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    var p = temp.querySelector('p');
    if (p) p.id = 'shared-footer-copyright';
    document.getElementById('footer-container').innerHTML = temp.innerHTML;
    var footerNoteEl = document.querySelector('.shared-footer-note');
    if (footerNoteEl && config.footerNote) footerNoteEl.textContent = config.footerNote;
    var copyrightEl = document.getElementById('shared-footer-copyright');
    if (copyrightEl && config.copyright) copyrightEl.textContent = config.copyright;
  });
}

/**
 * Sets secondary color and document title from config
 * @param {Object} config - { projectColor, projectTitle }
 */
function applyBranding(config) {
  if (config.projectColor) {
    document.documentElement.style.setProperty('--color-secondary', config.projectColor);
  }
  if (config.projectTitle) document.title = config.projectTitle;
}

// Export for use in other scripts
window.SharedUILib = {
  injectHeader,
  injectFooter,
  applyBranding
};
