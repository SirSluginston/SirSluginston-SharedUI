// === SharedUI ThemeToggle Injector ===
// Injects the theme toggle UI and logic. Because your users deserve a choice.
(function injectThemeToggle() {
  // Add CSS for the toggle
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'SharedUI/ThemeToggle/theme-toggle.css';
  document.head.appendChild(link);

  // Add container if not present
  let container = document.getElementById('theme-toggle-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'theme-toggle-container';
    document.body.insertBefore(container, document.body.firstChild);
  }

  // Inject the toggle HTML and JS
  fetch('SharedUI/ThemeToggle/theme-toggle.html')
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;
      const script = document.createElement('script');
  script.src = 'SharedUI/ThemeToggle/theme-toggle.js';
      document.body.appendChild(script);
    });
})();
