# SirSluginston SharedUI

Reusable UI components for consistent, modular user experiences across all SirSluginston projects.

## What is SharedUI?
SharedUI is a pure frontend library: it contains only UI components (HTML, CSS, JS) and no backend, config, or project-specific logic. Use it to quickly add beautiful, consistent UI elements to any web project.

## Structure
- `Header/` – Site headers, branding, navigation
- `Navbar/` – Navigation bars and menus
- `Footer/` – Site footers and legal info
- `ThemeToggle/` – Theme switchers and color utilities
- `Body/` – Page layout and containers
- `Dropdown/` – Dropdown menus and selectors
- `Modals/` – Modal dialogs
- `ProjectCards/` – Project card UI
- `Account/` – Account/profile UI (login, signup, etc.)
- `Assets/` – Asset rendering helpers


## Usage

1. **Add SharedUI to your project:**
   - As an npm package, or
   - Copy the `SharedUI/` folder and CSS files into your project.

2. **Reference the components in your HTML:**
   ```html
   <link rel="stylesheet" href="SharedUI/Header/header.css">
   <link rel="stylesheet" href="SharedUI/Navbar/navbar.css">
   <link rel="stylesheet" href="SharedUI/Hero/hero.css">
   <link rel="stylesheet" href="SharedUI/Body/body.css">
   <link rel="stylesheet" href="SharedUI/variables.css">
   <script src="SharedUI/sharedui.js"></script>
   <script src="SharedUI/Hero/hero.js"></script>
   <!-- Repeat for other components as needed -->
   ```

3. **Inject UI components dynamically:**
   ```js
   import { projects } from './projects-config.js';
   const project = projects.find(p => p.projectKey === 'your-project-key');
   const page = project.pages.find(pg => pg.pageKey === 'your-page-key');
   const config = {
     projectTitle: project.projectTitle,
     projectTagline: project.projectTagline,
     pageTitle: page.pageTitle,
     pageTagline: page.pageTagline,
     hasHeader: page.hasHeader !== false,
     hasNavbar: page.hasNavbar !== false,
     hasHero: page.hasHero !== false,
     hasBody: page.hasBody !== false,
     hasFooter: page.hasFooter !== false,
     navbar: { links: project.pages.filter(p => p.inNavbar).map(p => ({ href: p.href, text: p.text })) }
   };

   if (window.SharedUILib) {
     window.SharedUILib.applyBranding(config);
     if (config.hasHeader) window.SharedUILib.injectHeader(config);
     if (config.hasNavbar) window.SharedUILib.injectNavbar(config);
     if (config.hasHero) window.SharedUILib.injectHero(config);
     if (config.hasFooter) window.SharedUILib.injectFooter(config);
   }
   ```

4. **Config Contract:**
   - `projectTitle`, `projectTagline`, `pageTitle`, `pageTagline`: Strings for branding and hero.
   - `hasHeader`, `hasNavbar`, `hasHero`, `hasBody`, `hasFooter`: Booleans to control injection.
   - `navbar.links`: Array of `{ href, text }` for navbar links.

5. **Theming:**
   - Customize with CSS variables in `variables.css`.
   - Theme toggle supported via `ThemeToggle/theme-toggle.js`.

## SSO / Login Template
A reusable SSO page template is provided at `templates/sso-index.template.html`.
Copy it into a new project and replace the tokens:

| Token | Meaning |
|-------|---------|
| `{{PROJECT_LOGO}}` | URL to logo image |
| `{{PROJECT_TITLE}}` | Display name of project |
| `{{PROJECT_TAGLINE}}` | Short tagline/subtitle |
| `{{PROJECT_COLOR}}` | Hex or CSS color for secondary brand color |
| `{{FOOTER_NOTE}}` | Footer accent note |
| `{{COPYRIGHT}}` | Copyright line |

Example minimal replacement (manual):
```
{{PROJECT_LOGO}} => SharedUI/Assets/Images/SirSluginston_Logo_Original.JPG
{{PROJECT_TITLE}} => SirSluginston Co
{{PROJECT_TAGLINE}} => Single Sign-On
{{PROJECT_COLOR}} => #4B3A78
{{FOOTER_NOTE}} => Debonair Gastropod Genius
{{COPYRIGHT}} => © 2025 SirSluginston
```

### Initializing the Page
The template already:
- Loads variables + border + component CSS
- Injects header & footer via `SharedUILib`
- Provides placeholder login form
- Includes theme toggle & basic project selector stub

Add your own project list logic:
```js
const projects = await fetch('/api/projects').then(r=>r.json());
const selector = document.getElementById('projectSelector');
projects.forEach(p => { const opt=document.createElement('option'); opt.value=p.slug; opt.textContent=p.projectTitle; selector.appendChild(opt); });
```

## Central Admin Model
The SirSluginston Co admin panel acts as the *single source of truth* for project metadata (titles, slugs, colors, status). Downstream projects consume a *generated JSON snapshot* (per-project) to render their UI with SharedUI. This keeps SharedUI free of data logic while enabling consistent cross-project identity.

Recommended flow:
1. Admin updates project info in central backend.
2. A build step (or serverless function) emits `project-manifest.json` per project.
3. Each project fetches or bundles its manifest and applies values to `SharedUILib.applyBranding()` / injected components.

## Backport / Versioning Notes
Recent improvements:
- Base path detection inside `sharedui.js` (no more relative fetch issues)
- Default light theme auto-applied if none set
- Fallback root CSS variables ensure immediate color availability
- Added SSO template for rapid bootstrap

## Contributing
Keep contributions UI-only. No backend calls, no environment-specific logic. For project data, rely on external JSON/manifest inputs.

## Philosophy
- **Plug-and-play:** Works in any project with minimal setup.
- **Minimal:** No dependencies, no backend, no config.
- **Strategic:** Easy updates and consistent branding.
