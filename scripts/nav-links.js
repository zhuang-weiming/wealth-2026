/* nav-links.js
   Attach click/keyboard navigation to elements matching
   .nav__link[data-href] without changing their styles.
*/
(function(){
  'use strict';
  function initNavLinks(){
    var nodes = document.querySelectorAll('.nav__link[data-href]');
    if (!nodes || !nodes.length) return;
    nodes.forEach(function(btn){
      // Click navigates to target
      btn.addEventListener('click', function(evt){
        var href = btn.getAttribute('data-href');
        if (!href) return;
        // Respect modifiers (Ctrl/Cmd/Shift) — open in new tab when appropriate
        if (evt.metaKey || evt.ctrlKey || evt.shiftKey) {
          window.open(href, '_blank');
          return;
        }
        window.location.href = href;
      });

      // Keyboard support: Enter or Space should activate
      btn.addEventListener('keydown', function(evt){
        var code = evt.key || evt.keyCode;
        if (code === 'Enter' || code === ' ' || code === 'Spacebar' || code === 13 || code === 32) {
          evt.preventDefault();
          btn.click();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavLinks);
  } else {
    initNavLinks();
  }
})();
