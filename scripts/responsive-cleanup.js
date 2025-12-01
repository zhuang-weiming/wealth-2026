/* responsive-cleanup.js
   Consolidated responsive behaviours for the fluid sublayout.
   - Cleans/restores inline style and data-col for small screens
   - Updates the positional top for the 3rd and 4th content blocks
   Lightweight, vanilla JS.
*/
(function(){
  'use strict';

  // Utility: simple debounce
  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  // Target the actual UL used in markup
  var containerSelector = '.fluid-sublayout__content';

  function saveOriginals(items){
    items.forEach(function(li){
      if (typeof li.dataset._origStyle === 'undefined') {
        li.dataset._origStyle = li.getAttribute('style') || '';
      }
      if (typeof li.dataset._origDataCol === 'undefined') {
        li.dataset._origDataCol = li.getAttribute('data-col') || '';
      }
    });
  }

  function applyClean(items){
    items.forEach(function(li){
      li.removeAttribute('data-col');
      li.removeAttribute('style');
    });
  }

  function restoreOriginals(items){
    items.forEach(function(li){
      var origStyle = li.dataset._origStyle || '';
      var origDataCol = li.dataset._origDataCol || '';
      if (origStyle) {
        li.setAttribute('style', origStyle);
      } else {
        li.removeAttribute('style');
      }
      if (origDataCol) {
        li.setAttribute('data-col', origDataCol);
      } else {
        li.removeAttribute('data-col');
      }
    });
  }

  function handleCleanRestore(){
    var container = document.querySelector(containerSelector);
    if (!container) return;
    var nodeList = container.querySelectorAll('li.content-block');
    var items = Array.prototype.slice.call(nodeList);
    if (!items.length) return;
    saveOriginals(items);
    if (window.matchMedia('(max-width: 767px)').matches) {
      applyClean(items);
    } else {
      restoreOriginals(items);
    }
  }

  function updateFluidSublayoutPositions() {
    var container = document.querySelector(containerSelector);
    if (!container) return;
    var items = container.querySelectorAll('li.content-block');
    if (!items || items.length < 4) return;

    var first = items[0];
    var second = items[1];
    var third = items[2];
    var fourth = items[3];

    // On small screens we let CSS handle layout (media query was defined for <=767px)
    if (window.innerWidth <= 767) {
      third.style.top = '';
      fourth.style.top = '';
      return;
    }

    // Use getBoundingClientRect to include margins/paddings rendered height
    var firstH = first.getBoundingClientRect().height || 0;
    var secondH = second.getBoundingClientRect().height || 0;
    // Per requirement (kept original calculations to preserve behaviour):
    // third.top = second.height + 30px
    // fourth.top = first.height + 30px
    third.style.top = Math.round(firstH  - 100) + 'px';
    fourth.style.top = Math.round(secondH ) + 'px';
  }

  var debouncedCombined = debounce(function(){
    handleCleanRestore();
    updateFluidSublayoutPositions();
  }, 120);

  // Run at DOMContentLoaded + on load (images) and when window is resized
  document.addEventListener('DOMContentLoaded', function(){
    handleCleanRestore();
    updateFluidSublayoutPositions();
  });
  window.addEventListener('load', function(){
    handleCleanRestore();
    updateFluidSublayoutPositions();
  });
  window.addEventListener('resize', debouncedCombined);

})();
