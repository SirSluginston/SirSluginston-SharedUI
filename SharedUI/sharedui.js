
// === SharedUI Core Utility Functions ===
// All your config are belong to projects.json. Modular, future-proof, and API-ready.
// Injects, abstracts, and generally makes your UI less of a mess.

/**
 * Fetches the projects config from projects.json
 * @returns {Promise<Array>} Array of project configs
 */
async function getProjects() {
  let projectsPath = 'https://www.sirsluginston.com/projects.json';
  // Use local config if running on localhost or 127.0.0.1
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    projectsPath = '/SirSluginston-SharedUI/SharedUI/Projects/projects.json';
  }
  const resp = await fetch(projectsPath);
  return resp.ok ? resp.json() : [];
}

/**
 * Injects header HTML and sets logo, title, tagline from config
 * @param {Object} config - Project config object
 */
function injectHeader(config) {
  fetch('/SirSluginston-SharedUI/SharedUI/Header/header.html').then(r => r.text()).then(html => {
    document.getElementById('header-container').innerHTML = html;
    var logoEl = document.querySelector('.shared-header-logo');
    if (logoEl && config.projectLogoUrl) logoEl.src = config.projectLogoUrl;
    var headerTitleEl = document.querySelector('.shared-header-title');
    if (headerTitleEl && config.projectTitle) headerTitleEl.textContent = config.projectTitle;
    var headerTaglineEl = document.querySelector('.shared-header-tagline');
    if (headerTaglineEl && config.projectTagline) headerTaglineEl.textContent = config.projectTagline;
    // Inject account icon after header is present
  // Inject account icon SVG from SharedUI/Assets/Icons/AccountIcon, styled
    // Ensure CSS is loaded
  var iconCss = document.querySelector('link[href="/SirSluginston-SharedUI/SharedUI/Assets/Icons/AccountIcon/account-icon.css"]');
    if (!iconCss) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/SirSluginston-SharedUI/SharedUI/Assets/Icons/AccountIcon/account-icon.css';
      document.head.appendChild(link);
    }
  fetch('/SirSluginston-SharedUI/SharedUI/Assets/Icons/AccountIcon/account-icon.svg')
      .then(response => response.ok ? response.text() : '')
      .then(svg => {
        var container = document.getElementById('account-inject');
        if (container) {
          container.innerHTML = '<div class="account-icon-container" id="shared-account-icon-container">' + svg + '</div>';
          // Attach click handler to SVG or container
          var icon = container.querySelector('.account-icon-container, svg');
          if (icon) {
            icon.style.cursor = 'pointer';
            icon.title = 'Account Settings';
            icon.onclick = function(e) {
              e.preventDefault();
              window.location.href = '/SirSluginston-SharedUI/SharedUI/Account/account.html';
            };
          }
        }
      });
    if (typeof initSharedHeader === 'function') initSharedHeader();
    if (typeof initThemeToggle === 'function') initThemeToggle();
  });
}

/**
 * Injects footer HTML and sets footer content from config
 * @param {Object} config - Project config object
 */
function injectFooter(config) {
  fetch('/SirSluginston-SharedUI/SharedUI/Footer/footer.html').then(r => r.text()).then(html => {
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
 * @param {Object} config - Project config object
 */
function applyBranding(config) {
  if (config.projectColor) {
    document.documentElement.style.setProperty('--color-secondary', config.projectColor);
  }
  if (config.projectTitle) document.title = config.projectTitle;
}


/**
 * Loads config for a given page (by siteUrl or by matching pages[].href) or defaults to first project
 * @param {string} siteUrl
 * @returns {Promise<Object>} Project config
 */
async function loadConfig(siteUrl) {
  const projects = await getProjects();
  // Check for ?project=slug in the URL
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project');
  if (slug) {
    const bySlug = projects.find(p => p.slug === slug);
    if (bySlug) return bySlug;
  }
  // Try to match by siteUrl first
  let project = projects.find(p => p.projectSiteUrl === siteUrl);
  if (!project) {
    // Try to match by pages[].href
    project = projects.find(p => Array.isArray(p.pages) && p.pages.some(pg => pg.href && pg.href.toLowerCase() === siteUrl.toLowerCase()));
  }
  return project || projects[0];
}

// Export for use in other scripts
window.SharedUILib = {
  getProjects,
  injectHeader,
  injectFooter,
  applyBranding,
  loadConfig
};
// TODO: Add addProject() and API integration in the future
