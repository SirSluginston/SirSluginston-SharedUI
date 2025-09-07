// SharedUI/init.js
// Centralized initialization for all SharedUI pages

(function() {
  // Only run once per page
  if (window.__SharedUIInit) return;
  window.__SharedUIInit = true;

  function initDropdownsAfterNavbar() {
    if (window.SharedUIDropdown) SharedUIDropdown.initAll();
    if (window.SharedUIModal) SharedUIModal.initAll();
  }

  async function sharedUIInit() {
    if (!window.SharedUILib) {
      console.error('[SharedUI] SharedUILib not loaded!');
      return;
    }
    // Compute the relative path to the SharedUI folder from the current HTML file
    var currentPath = window.location.pathname;
    var sharedUIIndex = currentPath.lastIndexOf('/SharedUI/');
    var basePath = '';
    if (sharedUIIndex !== -1) {
      // e.g. /SirSluginston-SharedUI/SharedUI/Account/account.html => /SirSluginston-SharedUI/SharedUI/
      basePath = currentPath.substring(0, sharedUIIndex + '/SharedUI/'.length);
    } else {
      // Fallback: try to find the SharedUI folder by going up directories
      basePath = (currentPath.match(/\//g) || []).length > 1 ? '../'.repeat((currentPath.match(/\//g) || []).length - 1) + 'SharedUI/' : 'SharedUI/';
    }
    // Helper to resolve a path from SharedUI root
    function sharedUIPath(rel) {
      if (basePath.endsWith('/')) return basePath + rel;
      return basePath + '/' + rel;
    }
    const { getProjects, injectHeader, injectFooter, applyBranding } = window.SharedUILib;
    // Use slug from URL or default to 'sharedui'
    const params = new URLSearchParams(window.location.search);
    let slug = params.get('project');
    const projects = await getProjects();
    // If no ?project param, use the first project with slug 'sharedui' or fallback to first project
    if (!slug) {
      const defaultProj = projects.find(p => p.slug && p.slug.toLowerCase() === 'sharedui');
      slug = defaultProj ? defaultProj.slug : (projects[0] && projects[0].slug);
    }
    const config = projects.find(p => p.slug && p.slug.toLowerCase() === (slug || '').toLowerCase()) || projects[0];
    window.SharedUIConfig = config;
    if (!config) {
      console.error('[SharedUI] No config found for slug', slug, projects);
      return;
    }
    applyBranding(config);
    injectHeader(config);
    injectFooter(config);
    // Set hero if present
    var heroContainer = document.getElementById('shared-hero-container');
    var pageHref = window.location.pathname.split('/').pop() || 'home.html';
    var normPageHref = pageHref.endsWith('.html') ? pageHref.toLowerCase() : (pageHref + '.html').toLowerCase();
    var pageConfig = (config.pages || []).find(p => {
      if (!p.href) return false;
      var normHref = p.href.toLowerCase();
      return normHref === normPageHref || normHref.replace('.html','') === pageHref.toLowerCase().replace('.html','');
    });
    if (window.SharedUIHero && heroContainer && pageConfig) {
      SharedUIHero.inject(heroContainer, pageConfig.pageTitle, pageConfig.pageTagline);
    }
    // Now load the navbar script so it can use SharedUIConfig
    var navbarScript = document.createElement('script');
    navbarScript.src = sharedUIPath('Navbar/navbar.js');
    navbarScript.onload = function() {
      // Load Dropdown, Modals, Hero scripts using sharedUIPath
      var dropdownScript = document.createElement('script');
      dropdownScript.src = sharedUIPath('Dropdown/dropdown.js');
      document.body.appendChild(dropdownScript);
      var modalScript = document.createElement('script');
      modalScript.src = sharedUIPath('Modals/modal.js');
      document.body.appendChild(modalScript);
      var heroScript = document.createElement('script');
      heroScript.src = sharedUIPath('Hero/hero.js');
      document.body.appendChild(heroScript);
      initDropdownsAfterNavbar();
    };
    document.body.appendChild(navbarScript);
  }

  // Wait for DOMContentLoaded if needed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sharedUIInit);
  } else {
    sharedUIInit();
  }
})();
