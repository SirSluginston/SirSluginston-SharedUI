// === SharedUI Navbar Injection ===
// Loads navbar HTML and populates links (with dropdowns) from SharedUIConfig (fetched from https://www.sirsluginston.com/projects.json).
// Modular, dynamic, and ready for your next 17 projects.
fetch('SharedUI/Navbar/navbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('site-navbar').innerHTML = html;
    if (window.SharedUIConfig && Array.isArray(SharedUIConfig.navbarLinks)) {
      var ul = document.querySelector('.shared-navbar-list');
      ul.innerHTML = '';
      SharedUIConfig.navbarLinks.forEach(function(link) {
        var li = document.createElement('li');
        // Dropdown support
        if (link.dropdown && Array.isArray(link.dropdown)) {
          // Use SharedUI dropdown component markup
          li.classList.add('sharedui-dropdown');
          var trigger = document.createElement('span');
          trigger.className = 'sharedui-dropdown-trigger';
          trigger.textContent = link.text;
          trigger.setAttribute('tabindex', '0');
          li.appendChild(trigger);
          var dropdownContent = document.createElement('div');
          dropdownContent.className = 'sharedui-dropdown-content';
          link.dropdown.forEach(function(item) {
            var dropA = document.createElement('a');
            // Support pageKey in dropdowns
            if (item.pageKey && Array.isArray(SharedUIConfig.pages)) {
              var page = SharedUIConfig.pages.find(p => p.key === item.pageKey);
              if (page) {
                // Always append ?project=slug for internal links
                // Append ? or & depending on existing query
                let baseHref = page.href;
                let sep = baseHref.includes('?') ? '&' : '?';
                dropA.href = baseHref + sep + 'project=' + encodeURIComponent(SharedUIConfig.slug);
                // ...
                // If this is the about-project page, use 'About {projectTitle}'
                if (page.key === 'about-project' && SharedUIConfig.projectTitle) {
                  dropA.textContent = 'About ' + SharedUIConfig.projectTitle;
                } else {
                  dropA.textContent = page.pageTitle || page.key;
                }
              } else {
                dropA.href = '#';
                // If this is the about-project pageKey, use 'About {projectTitle}'
                if (item.pageKey === 'about-project' && SharedUIConfig.projectTitle) {
                  dropA.textContent = 'About ' + SharedUIConfig.projectTitle;
                } else {
                  dropA.textContent = item.pageKey;
                }
              }
            } else {
              // Always append ?project=slug for internal links
              let baseHref2 = item.href;
              let sep2 = baseHref2 && baseHref2.includes('?') ? '&' : '?';
              dropA.href = baseHref2 + sep2 + 'project=' + encodeURIComponent(SharedUIConfig.slug);
              // ...
              // If this is the About This Project link, use 'About {projectTitle}'
              if ((item.text && item.text.toLowerCase().includes('about this project')) && SharedUIConfig.projectTitle) {
                dropA.textContent = 'About ' + SharedUIConfig.projectTitle;
              } else {
                dropA.textContent = item.text;
              }
            }
            if (item.external) dropA.target = '_blank';
            dropdownContent.appendChild(dropA);
          });
          li.appendChild(dropdownContent);
        } else {
          // Simple link, support pageKey
          var a = document.createElement('a');
          if (link.pageKey && Array.isArray(SharedUIConfig.pages)) {
            var page = SharedUIConfig.pages.find(p => p.key === link.pageKey);
            if (page) {
              // Always append ?project=slug for internal links
              let baseHref3 = page.href;
              let sep3 = baseHref3.includes('?') ? '&' : '?';
              a.href = baseHref3 + sep3 + 'project=' + encodeURIComponent(SharedUIConfig.slug);
              // ...
              a.textContent = page.pageTitle || page.key;
              // Force Home link to always use home.html in URL
              if (link.pageKey === 'home' && (page.href === 'index.html' || page.href === 'home.html')) {
                  a.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = '/SirSluginston-SharedUI/home.html?project=' + encodeURIComponent(SharedUIConfig.slug);
                });
              }
            } else {
              a.href = '#';
              a.textContent = link.pageKey;
            }
          } else {
            // Always append ?project=slug for internal links
            let baseHref4 = link.href;
            let sep4 = baseHref4 && baseHref4.includes('?') ? '&' : '?';
            a.href = baseHref4 + sep4 + 'project=' + encodeURIComponent(SharedUIConfig.slug);
            // ...
            a.textContent = link.text;
          }
          li.appendChild(a);
        }
        ul.appendChild(li);
      });
    }
    if (window.SharedUIDropdown) SharedUIDropdown.initAll();
  });
