// JS for Projects page: modal form for new project, and JSON snippet generation

// Modal HTML
const modalHtml = `
  <div id="new-project-modal" style="display:none;position:fixed;z-index:1000;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);align-items:center;justify-content:center;">
    <div style="background:#fff;color:#222;max-width:400px;width:90vw;padding:2rem 1.5rem;border-radius:1rem;box-shadow:0 4px 32px 0 rgba(0,0,0,0.18);position:relative;">
      <button id="close-modal" style="position:absolute;top:0.5rem;right:0.7rem;font-size:1.5em;background:none;border:none;cursor:pointer;">&times;</button>
      <h3 style="margin-top:0;">Create New Project</h3>
      <form id="new-project-form">
        <label>Title:<br><input name="title" required style="width:100%"></label><br><br>
        <label>Tagline:<br><input name="tagline" required style="width:100%"></label><br><br>
        <label>Logo URL:<br><input name="logo" required style="width:100%"></label><br><br>
        <label>Project URL:<br><input name="url" required style="width:100%"></label><br><br>
        <button type="submit" style="margin-top:0.5rem;width:100%;">Generate JSON</button>
      </form>
      <div id="json-output" style="margin-top:1.2rem;display:none;">
        <label>Copy this JSON for projects.json:</label>
        <textarea id="json-snippet" style="width:100%;height:7em;font-size:0.95em;"></textarea>
      </div>
    </div>
  </div>
`;

// Insert modal into body
if (!document.getElementById('new-project-modal')) {
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Button event to open modal
const startBtn = document.querySelector('.body-content button[title*="Start New Project"]');
if (startBtn) {
  startBtn.addEventListener('click', function() {
    document.getElementById('new-project-modal').style.display = 'flex';
  });
}

// Modal close
const closeModal = document.getElementById('close-modal');
if (closeModal) {
  closeModal.onclick = function() {
    document.getElementById('new-project-modal').style.display = 'none';
    document.getElementById('json-output').style.display = 'none';
    document.getElementById('new-project-form').reset();
  };
}

// Form submit handler
const form = document.getElementById('new-project-form');
if (form) {
  form.onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const json = JSON.stringify(data, null, 2);
    document.getElementById('json-snippet').value = json;
    document.getElementById('json-output').style.display = 'block';
  };
}
