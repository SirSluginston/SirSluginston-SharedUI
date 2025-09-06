
// === SharedUI Header Injector ===
// Plucks logo, title, and tagline from SharedUIConfig and makes your header shine.

function initSharedHeader() {
	if (!window.SharedUIConfig) return;
	var logoEl = document.querySelector('.shared-header-logo');
	if (logoEl && SharedUIConfig.projectLogoUrl) logoEl.src = SharedUIConfig.projectLogoUrl;
	var titleEl = document.querySelector('.shared-header-title');
	if (titleEl && SharedUIConfig.projectTitle) titleEl.textContent = SharedUIConfig.projectTitle;
	var taglineEl = document.querySelector('.shared-header-tagline');
	if (taglineEl && SharedUIConfig.projectTagline) taglineEl.textContent = SharedUIConfig.projectTagline;

	// Inject favicon if not already present
	if (SharedUIConfig.projectLogoUrl) {
		var existingFavicon = document.querySelector('link[rel="icon"]');
		if (!existingFavicon) {
			var favicon = document.createElement('link');
			favicon.rel = 'icon';
			favicon.type = 'image/jpeg';
			favicon.href = SharedUIConfig.projectLogoUrl;
			document.head.appendChild(favicon);
		}
	}
}


