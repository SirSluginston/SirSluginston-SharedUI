// === SharedUI NavigationBar Injection ===
// Loads navigation-bar.html and populates links from SharedUIConfig (project-config driven)
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
const navUrl = 'SirSluginston-SharedUI/NavigationBar/navigation-bar.html';
console.log('[DEBUG][NavigationBar] Fetching URL:', navUrl);
fetch(navUrl)
  .then(response => {
    console.log('[DEBUG][NavigationBar] Response status:', response.status);
    return response.text();
  })
  .then(html => {
    var target = document.getElementById('site-navbar') || document.getElementById('navbar-container');
    if (!target) {
      console.warn('[SharedUI][NavigationBar] No #site-navbar or #navbar-container found');
      return;
    }
    target.innerHTML = html;
    if (window.SharedUIConfig && Array.isArray(window.SharedUIConfig.navbarLinks)) {
      var ul = document.querySelector('.shared-navbar-list');
      ul.innerHTML = '';
      window.SharedUIConfig.navbarLinks.forEach(function(link) {
        var li = document.createElement('li');
        // Dropdown support
        if (link.dropdown && Array.isArray(link.dropdown)) {
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
            if (item.pageKey && Array.isArray(window.SharedUIConfig.pages)) {
              var page = window.SharedUIConfig.pages.find(p => p.key === item.pageKey);
              if (page) {
                let baseHref = page.href;
                if (baseHref && !baseHref.endsWith('.html')) baseHref += '.html';
                if (/^(\.\/)?(home|projects|assets|about|index|about\s|about-this-project|about-sirsluginston|aboutthisproject|aboutsirsluginstonco)(\.html)?$/i.test(baseHref.replace(/%20/g, '').replace(/\s+/g, '').toLowerCase())) {
                  baseHref = baseHref.replace(/^\.\//, '');
                  if (!baseHref.endsWith('.html')) baseHref += '.html';
                  baseHref = '/' + baseHref.replace(/^\//, '');
                } else if (!baseHref.startsWith('./') && !baseHref.startsWith('/')) {
                  baseHref = './' + baseHref;
                }
                let sep = baseHref.includes('?') ? '&' : '?';
                dropA.href = baseHref + sep + 'project=' + encodeURIComponent(window.SharedUIConfig.slug);
                if (page.key === 'about-project' && window.SharedUIConfig.projectTitle) {
                  dropA.textContent = 'About ' + window.SharedUIConfig.projectTitle;
                } else {
                  dropA.textContent = page.pageTitle || page.key;
                }
              } else {
                dropA.href = '#';
                if (item.pageKey === 'about-project' && window.SharedUIConfig.projectTitle) {
                  dropA.textContent = 'About ' + window.SharedUIConfig.projectTitle;
                } else {
                  dropA.textContent = item.pageKey;
                }
              }
            } else {
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
              dropA.href = baseHref2 + sep2 + 'project=' + encodeURIComponent(window.SharedUIConfig.slug);
              if ((item.text && item.text.toLowerCase().includes('about this project')) && window.SharedUIConfig.projectTitle) {
                dropA.textContent = 'About ' + window.SharedUIConfig.projectTitle;
              } else {
                dropA.textContent = item.text;
              }
            }
            if (item.external) dropA.target = '_blank';
            dropdownContent.appendChild(dropA);
          });
          li.appendChild(dropdownContent);
        } else {
          var a = document.createElement('a');
          if (link.pageKey && Array.isArray(window.SharedUIConfig.pages)) {
            var page = window.SharedUIConfig.pages.find(p => p.key === link.pageKey);
            if (page) {
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
              a.href = baseHref3 + sep3 + 'project=' + encodeURIComponent(window.SharedUIConfig.slug);
              a.textContent = page.pageTitle || page.key;
            } else {
              a.href = '#';
              a.textContent = link.pageKey;
            }
          } else {
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
            a.href = baseHref4 + sep4 + 'project=' + encodeURIComponent(window.SharedUIConfig.slug);
            a.textContent = link.text;
          }
          li.appendChild(a);
        }
        ul.appendChild(li);
      });
    }
    if (window.SharedUIDropdown) window.SharedUIDropdown.initAll();
  });
