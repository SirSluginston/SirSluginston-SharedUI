
// Modular body injector: pulls title/tagline from SharedUIConfig (fetched from https://www.sirsluginston.com/projects.json)
// No more site-config.json. Welcome to the future.
fetch('SharedUI/Body/body.html').then(r => r.text()).then(html => {
  // Wait for SharedUIConfig to be available (injected by SharedUI)
  function injectBody() {
    if (!window.SharedUIConfig) {
      setTimeout(injectBody, 30); // Wait and retry
      return;
    }
    const config = window.SharedUIConfig;
  const filled = html.replace('{{TITLE}}', config.projectTitle || '')
             .replace('{{TAGLINE}}', config.projectTagline || '');
  document.getElementById('site-body').innerHTML = filled;
  }
  injectBody();
});
