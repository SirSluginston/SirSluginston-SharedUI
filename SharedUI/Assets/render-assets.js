// JS for dynamically rendering asset cards from assets.json

async function renderAssets() {
  const grid = document.querySelector('.mascot-elements-grid');
  let assets = [];
  try {
  const resp = await fetch('SharedUI/Assets/assets.json');
    if (resp.ok) {
      assets = await resp.json();
    }
  } catch (e) {
    // fallback to static if fetch fails
  }
  if (!Array.isArray(assets) || assets.length === 0) {
    // fallback static asset
    assets = [
      {
        title: 'SirSluginston_Logo_Original.JPG',
        type: 'image',
  url: 'SharedUI/Assets/Images/SirSluginston_Logo_Original.JPG',
        description: 'Original SirSluginston logo in JPG format.'
      }
    ];
  }
  grid.innerHTML = '';
  for (const asset of assets) {
    const card = document.createElement('div');
    card.className = 'mascot-element-placeholder';
    card.innerHTML = `
      <div style="font-weight:bold;">${asset.title || ''}</div>
      <div style="font-size:0.95em;margin:0.5em 0;">${asset.description || ''}</div>
      <a href="${asset.url || '#'}" target="_blank" style="color:var(--color-accent);text-decoration:underline;">View</a>
    `;
    grid.appendChild(card);
  }
}
document.addEventListener('DOMContentLoaded', renderAssets);
