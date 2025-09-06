// === SharedUI Footer Injector ===
// Drops the footer HTML into #site-footer. Modular, reusable, and never forgotten.
fetch('SharedUI/Footer/footer.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('site-footer').innerHTML = html;
  });
