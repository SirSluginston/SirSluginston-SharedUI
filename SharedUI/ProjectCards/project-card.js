// SharedUI Project Card Component
// Usage: ProjectCard.render(container, projectConfig)

const ProjectCard = {
  /**
   * Renders a project card into the given container
   * @param {HTMLElement} container - The parent element to append the card to
   * @param {Object} proj - The project config object
   */
  render(container, proj) {
    const card = document.createElement('div');
    card.className = 'project-card';
    const taglineColor = proj.projectColor || '';
    card.innerHTML = `
      <a href="${proj.projectSiteUrl || proj.siteUrl || '#'}" style="text-decoration:none;color:inherit;">
        <img src="${proj.projectLogoUrl || proj.logoUrl || 'https://placehold.co/80x80/EEE/222?text=Logo'}" alt="Project Logo" class="project-logo">
        <div class="project-title">${proj.projectTitle || proj.title || ''}</div>
  <div class="project-tagline">${proj.projectTagline || proj.tagline || ''}</div>
      </a>
    `;
    container.appendChild(card);
  }
};
// For global usage if not using modules
if (typeof window !== 'undefined') {
  window.SharedUIProjectCard = ProjectCard;
}
