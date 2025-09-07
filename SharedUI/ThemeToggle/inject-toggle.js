// === SharedUI ThemeToggle Injector ===
// Injects the theme toggle UI and logic. Because your users deserve a choice.
(function injectThemeToggle() {
  // Helper to resolve SharedUI path from any subfolder
  function sharedUIBase() {
    var path = window.location.pathname;
    var idx = path.lastIndexOf('/SharedUI/');
    if (idx !== -1) return path.substring(0, idx + '/SharedUI/'.length);
    return 'SharedUI/';
  }
  function sharedUIPath(rel) {
    var base = sharedUIBase();
    if (base.endsWith('/')) return base + rel;
    return base + '/' + rel;
  }
  // Add CSS for the toggle
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = sharedUIPath('ThemeToggle/theme-toggle.css');
  document.head.appendChild(link);

  // Add container if not present
  let container = document.getElementById('theme-toggle-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'theme-toggle-container';
    document.body.insertBefore(container, document.body.firstChild);
  }

  // Inject the toggle HTML and JS
  fetch(sharedUIPath('ThemeToggle/theme-toggle.html'))
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;
      const script = document.createElement('script');
      script.src = sharedUIPath('ThemeToggle/theme-toggle.js');
      document.body.appendChild(script);
    });
})();
