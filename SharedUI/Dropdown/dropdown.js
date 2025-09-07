console.log('[SharedUI] dropdown.js loaded', window.location.href, document.currentScript && document.currentScript.src);
// SharedUI Dropdown Component
class SharedUIDropdown {
  constructor(dropdownEl) {
    this.dropdownEl = dropdownEl;
    this.trigger = dropdownEl.querySelector('.sharedui-dropdown-trigger');
    this.content = dropdownEl.querySelector('.sharedui-dropdown-content');
    this.hoverTimeout = null;
    if (this.trigger && this.content) {
      // Open on click
      this.trigger.addEventListener('click', e => {
        e.stopPropagation();
        dropdownEl.classList.toggle('open');
      });
      // Open on hover
      let isOverTrigger = false;
      let isOverContent = false;
      const openDropdown = () => {
        clearTimeout(this.hoverTimeout);
        dropdownEl.classList.add('open');
      };
      const closeDropdown = () => {
        if (!isOverTrigger && !isOverContent) {
          this.hoverTimeout = setTimeout(() => {
            dropdownEl.classList.remove('open');
          }, 1000);
        }
      };
      this.trigger.addEventListener('mouseenter', () => {
        isOverTrigger = true;
        openDropdown();
      });
      this.trigger.addEventListener('mouseleave', () => {
        isOverTrigger = false;
        closeDropdown();
      });
      this.content.addEventListener('mouseenter', () => {
        isOverContent = true;
        openDropdown();
      });
      this.content.addEventListener('mouseleave', () => {
        isOverContent = false;
        closeDropdown();
      });
      // Keyboard accessibility
      this.trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          dropdownEl.classList.add('open');
          const firstLink = this.content.querySelector('a');
          if (firstLink) firstLink.focus();
        }
        if (e.key === 'Escape') {
          dropdownEl.classList.remove('open');
          this.trigger.focus();
        }
      });
      // Close on click outside
      document.addEventListener('click', e => {
        if (!dropdownEl.contains(e.target)) dropdownEl.classList.remove('open');
      });
    }
  }
  static initAll() {
    document.querySelectorAll('.sharedui-dropdown').forEach(el => new SharedUIDropdown(el));
  }
}
if (!window.SharedUIDropdown) window.SharedUIDropdown = SharedUIDropdown;
