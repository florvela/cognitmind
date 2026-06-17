/* NeuralData — replicates the `style-hover` pseudo-class behavior from the design
   runtime as plain DOM hover handlers, so the landing matches the .dc design 1:1. */
(function () {
  function parse(css) {
    var o = {};
    (css || '').split(';').forEach(function (decl) {
      var i = decl.indexOf(':');
      if (i < 0) return;
      o[decl.slice(0, i).trim()] = decl.slice(i + 1).trim();
    });
    return o;
  }
  function init() {
    var els = document.querySelectorAll('[style-hover]');
    Array.prototype.forEach.call(els, function (el) {
      var hover = parse(el.getAttribute('style-hover'));
      var base = el.getAttribute('style') || '';
      el.addEventListener('mouseenter', function () {
        for (var k in hover) el.style.setProperty(k, hover[k]);
      });
      el.addEventListener('mouseleave', function () {
        el.setAttribute('style', base);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
