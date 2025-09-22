// Minimal SharedUI helpers: inject header, footer, and apply branding
// Enhanced with base path resolution + default theme initialization.

// Resolve base path (directory of this script) once so internal fetches work regardless of where copied
const _sharedUIScriptEl = document.currentScript || document.querySelector('script[src*="sharedui.js"]');
const _sharedUIBase = (function() {
  if (!_sharedUIScriptEl) return '';
  const src = _sharedUIScriptEl.getAttribute('src');
  if (!src) return '';
  return src.split('?')[0].split('#')[0].replace(/[^\/]*$/, '');
})();
function _sharedUIPath(rel) { return _sharedUIBase + rel; }

/**
 * Injects header HTML and sets logo, title, tagline from config
 * @param {Object} config - { projectLogoUrl, projectTitle, projectTagline }
 */
function injectHeader(config) {
  fetch(_sharedUIPath('Header/header.html'))
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(html => {
      const host = document.getElementById('header-container');
      if (host) host.innerHTML = html;
      const logoEl = document.querySelector('.shared-header-logo');
      if (logoEl && config.projectLogoUrl) logoEl.src = config.projectLogoUrl;
      const headerTitleEl = document.querySelector('.shared-header-title');
      if (headerTitleEl && config.projectTitle) headerTitleEl.textContent = config.projectTitle;
      const headerTaglineEl = document.querySelector('.shared-header-tagline');
      if (headerTaglineEl && config.projectTagline) headerTaglineEl.textContent = config.projectTagline;
      if (typeof initThemeToggle === 'function') initThemeToggle();
    })
    .catch(err => console.error('[SharedUI] Failed to load header.html', err));
}

/**
 * Injects footer HTML and sets footer content from config
 * @param {Object} config - { footerNote, copyright }
 */
function injectFooter(config) {
  fetch(_sharedUIPath('Footer/footer.html'))
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const p = temp.querySelector('p');
      if (p) p.id = 'shared-footer-copyright';
      const container = document.getElementById('footer-container');
      if (container) container.innerHTML = temp.innerHTML;
      const footerNoteEl = document.querySelector('.shared-footer-note');
      if (footerNoteEl && config.footerNote) footerNoteEl.textContent = config.footerNote;
      const copyrightEl = document.getElementById('shared-footer-copyright');
      if (copyrightEl && config.copyright) copyrightEl.textContent = config.copyright;
    })
    .catch(err => console.error('[SharedUI] Failed to load footer.html', err));
}

/**
 * Sets secondary color and document title from config
 * @param {Object} config - { projectColor, projectTitle }
 */
function applyBranding(config) {
  if (!document.documentElement.hasAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  if (config.projectColor) {
    document.documentElement.style.setProperty('--color-secondary', config.projectColor);
  }
  if (config.projectTitle) document.title = config.projectTitle;
}


/**
 * Injects navbar HTML and sets links from config
 * @param {Object} config - { navbar: { links: [{ href, text }] } }
 */
function injectNavbar(config) {
  fetch(_sharedUIPath('NavigationBar/navigation-bar.html'))
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(html => {
      const host = document.getElementById('site-navbar');
      if (!host) {
        console.warn('[SharedUI] No #site-navbar found for navbar injection');
        return;
      }
      host.innerHTML = html;
  // Optionally set links if needed
  // ...
    })
    .catch(err => console.error('[SharedUI] Failed to load navbar.html', err));
}

/**
 * Injects hero section using window.SharedUIHero
 * @param {Object} config - { pageTitle, pageTagline }
 */
function injectHero(config) {
  const host = document.getElementById('hero-container');
  if (!host) {
    console.warn('[SharedUI] No #hero-container found for hero injection');
    return;
  }
  if (window.SharedUIHero?.inject) {
    window.SharedUIHero.inject(host, config.pageTitle, config.pageTagline);
  } else {
    console.warn('[SharedUI] SharedUIHero.inject not available');
  }
}

// Export for use in other scripts
window.SharedUILib = {
  injectHeader,
  injectFooter,
  injectNavbar,
  injectHero,
  applyBranding,
  basePath: _sharedUIBase
};
