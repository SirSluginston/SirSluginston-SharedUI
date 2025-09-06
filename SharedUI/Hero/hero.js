// SharedUI Hero Component
// Injects a hero section with title and tagline into the given container
window.SharedUIHero = {
	inject: function(container, title, tagline) {
		if (!container) return;
		container.innerHTML = `
			<section class="shared-hero">
				<h2 class="shared-hero-title">${title || ''}</h2>
				<p class="shared-hero-tagline">${tagline || ''}</p>
			</section>
		`;
	}
};
