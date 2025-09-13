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

   <link rel="stylesheet" href="SharedUI/Dropdown/dropdown.css">
   <script src="SharedUI/Dropdown/dropdown.js"></script>
   <!-- Repeat for other components as needed -->

3. **Use the UI components in your pages:**
   - Example: Add a dropdown, modal, or header from SharedUI.
   - Populate dynamic content (like project lists) from your own app logic.
4. **Customize with your own CSS variables for theming.**

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
