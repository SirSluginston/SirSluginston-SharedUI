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

## Example: Project Selector

<select id="projectSelector">
  <option value="" disabled selected>Select a project...</option>
  <!-- Your app should inject project options here -->
</select>


## Philosophy
- **Plug-and-play:** Works in any project with minimal setup.
- **Minimal:** No dependencies, no backend, no config.
- **Strategic:** Easy updates and consistent branding.
