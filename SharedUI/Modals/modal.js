console.log('[SharedUI] modal.js loaded', window.location.href, document.currentScript && document.currentScript.src);
// SharedUI Modal Component
class SharedUIModal {
  constructor(modalEl) {
    this.modalEl = modalEl;
    this.closeBtn = modalEl.querySelector('.sharedui-modal-close');
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    modalEl.addEventListener('mousedown', e => {
      if (e.target === modalEl) this.close();
    });
  }
  open() {
    this.modalEl.classList.add('open');
  }
  close() {
    this.modalEl.classList.remove('open');
  }
  static initAll() {
    document.querySelectorAll('.sharedui-modal').forEach(el => new SharedUIModal(el));
  }
}
if (!window.SharedUIModal) window.SharedUIModal = SharedUIModal;
