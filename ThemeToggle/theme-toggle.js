// === SharedUI Theme Toggle ===
// Handles dark/light mode like a pro. Modular, persistent, and sun/moon approved.
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  var icon = document.getElementById('theme-toggle-icon');
  if (icon) icon.textContent = theme === 'dark' ? '🌚' : '🌞';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(current);
}

// Initialize theme toggle button and set theme from localStorage or system preference
function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  var btn = document.getElementById('theme-toggle');
  if (btn && !btn._themeToggleInitialized) {
    btn.addEventListener('click', toggleTheme);
    btn._themeToggleInitialized = true;
  }
}

window.initThemeToggle = initThemeToggle;

// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}
