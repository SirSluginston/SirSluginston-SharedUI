// === SharedUI Navbar Injection ===
// Loads navbar HTML and populates links (with dropdowns) from SharedUIConfig (fetched from https://www.sirsluginston.com/projects.json).
// Modular, dynamic, and ready for your next 17 projects.
// Helper to resolve SharedUI path from any subfolder
function sharedUIBase() {
  var path = window.location.pathname;
  var idx = path.lastIndexOf('/SharedUI/');
  if (idx !== -1) return path.substring(0, idx + '/SharedUI/'.length);
  return 'SharedUI/';
}
function sharedUIPath(rel) {
  var base = sharedUIBase();
  if (base.endsWith('/')) return base + rel;
  return base + '/' + rel;
}

fetch(sharedUIPath('Navbar/navbar.html'))
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
                // Ensure .html extension
                if (baseHref && !baseHref.endsWith('.html')) baseHref += '.html';
                // If root-level page, use absolute path from server root (e.g. /home.html)
                if (/^(\.\/)?(home|projects|assets|about|index|about\s|about-this-project|about-sirsluginston|aboutthisproject|aboutsirsluginstonco)(\.html)?$/i.test(baseHref.replace(/%20/g, '').replace(/\s+/g, '').toLowerCase())) {
                  // Remove any leading ./
                  baseHref = baseHref.replace(/^\.\//, '');
                  // Ensure .html extension
                  if (!baseHref.endsWith('.html')) baseHref += '.html';
                  // Always use root-level absolute path
                  baseHref = '/' + baseHref.replace(/^\//, '');
                } else if (!baseHref.startsWith('./') && !baseHref.startsWith('/')) {
                  baseHref = './' + baseHref;
                }
                let sep = baseHref.includes('?') ? '&' : '?';
                dropA.href = baseHref + sep + 'project=' + encodeURIComponent(SharedUIConfig.slug);
                console.log('[SharedUI][Navbar] dropA.href:', dropA.href, 'slug:', SharedUIConfig.slug);
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
              if (baseHref2 && !baseHref2.endsWith('.html')) baseHref2 += '.html';
              if (baseHref2 && /^(\.\/)?(home|projects|assets|about|index|about\s|about-this-project|about-sirsluginston|aboutthisproject|aboutsirsluginstonco)(\.html)?$/i.test(baseHref2.replace(/%20/g, '').replace(/\s+/g, '').toLowerCase())) {
                baseHref2 = baseHref2.replace(/^\.\//, '');
                if (!baseHref2.endsWith('.html')) baseHref2 += '.html';
                baseHref2 = '/' + baseHref2.replace(/^\//, '');
              } else if (baseHref2 && !baseHref2.startsWith('./') && !baseHref2.startsWith('/')) {
                baseHref2 = './' + baseHref2;
              }
              let sep2 = baseHref2 && baseHref2.includes('?') ? '&' : '?';
              dropA.href = baseHref2 + sep2 + 'project=' + encodeURIComponent(SharedUIConfig.slug);
              console.log('[SharedUI][Navbar] dropA.href:', dropA.href, 'slug:', SharedUIConfig.slug);
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
              if (baseHref3 && !baseHref3.endsWith('.html')) baseHref3 += '.html';
              if (/^(\.\/)?(home|projects|assets|about|index|about\s|about-this-project|about-sirsluginston|aboutthisproject|aboutsirsluginstonco)(\.html)?$/i.test(baseHref3.replace(/%20/g, '').replace(/\s+/g, '').toLowerCase())) {
                baseHref3 = baseHref3.replace(/^\.\//, '');
                if (!baseHref3.endsWith('.html')) baseHref3 += '.html';
                baseHref3 = '/' + baseHref3.replace(/^\//, '');
              } else if (!baseHref3.startsWith('./') && !baseHref3.startsWith('/')) {
                baseHref3 = './' + baseHref3;
              }
              let sep3 = baseHref3.includes('?') ? '&' : '?';
              a.href = baseHref3 + sep3 + 'project=' + encodeURIComponent(SharedUIConfig.slug);
              if (link.pageKey === 'home') {
                console.log('[SharedUI][Navbar][DEBUG] Home link generated:', a.href, 'baseHref3:', baseHref3, 'sep3:', sep3, 'slug:', SharedUIConfig.slug);
              } else {
                console.log('[SharedUI][Navbar] a.href:', a.href, 'slug:', SharedUIConfig.slug);
              }
              // ...
              a.textContent = page.pageTitle || page.key;
              // No special case for Home; all root-level links use absolute path (e.g., /home.html)
            } else {
              a.href = '#';
              a.textContent = link.pageKey;
            }
          } else {
            // Always append ?project=slug for internal links
            let baseHref4 = link.href;
            if (baseHref4 && !baseHref4.endsWith('.html')) baseHref4 += '.html';
            if (baseHref4 && /^(\.\/)?(home|projects|assets|about|index|about\s|about-this-project|about-sirsluginston|aboutthisproject|aboutsirsluginstonco)(\.html)?$/i.test(baseHref4.replace(/%20/g, '').replace(/\s+/g, '').toLowerCase())) {
              baseHref4 = baseHref4.replace(/^\.\//, '');
              if (!baseHref4.endsWith('.html')) baseHref4 += '.html';
              baseHref4 = '/' + baseHref4.replace(/^\//, '');
            } else if (baseHref4 && !baseHref4.startsWith('./') && !baseHref4.startsWith('/')) {
              baseHref4 = './' + baseHref4;
            }
            let sep4 = baseHref4 && baseHref4.includes('?') ? '&' : '?';
            a.href = baseHref4 + sep4 + 'project=' + encodeURIComponent(SharedUIConfig.slug);
            console.log('[SharedUI][Navbar] a.href:', a.href, 'slug:', SharedUIConfig.slug);
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
