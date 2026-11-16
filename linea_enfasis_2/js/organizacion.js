(function () {
  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }

  Array.prototype.forEach.call(document.querySelectorAll('[data-unidad]'), function (unidad) {
    var salida = unidad.querySelector('[data-conteo-unidad]');
    if (!salida) return;
    var contar = function (tipo) { return unidad.querySelectorAll('[data-tipo="' + tipo + '"]').length; };
    var talleres = contar('teorico') + contar('practico');
    var casos = contar('caso');
    var videos = contar('video');
    var partes = [];
    if (talleres) partes.push(plural(talleres, 'taller', 'talleres'));
    if (casos) partes.push(plural(casos, 'análisis de caso', 'análisis de caso'));
    if (videos) partes.push(plural(videos, 'video presentación', 'videos presentación'));
    salida.textContent = partes.join(' · ');
  });

  var ultimoClic = null;
  document.addEventListener('click', function (e) {
    var resumen = e.target.closest && e.target.closest('summary');
    ultimoClic = resumen ? resumen.parentElement : null;
  });
  function mostrarEncabezado(det) {
    var resumen = det.querySelector('summary');
    if (!resumen) return;
    requestAnimationFrame(function () {
      var nav = document.querySelector('.nav-wrap');
      var margen = (nav ? nav.offsetHeight : 0) + 12;
      var arriba = resumen.getBoundingClientRect().top;
      if (arriba >= margen && arriba <= window.innerHeight * 0.4) return;
      var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: window.scrollY + arriba - margen, behavior: reducir ? 'auto' : 'smooth' });
    });
  }

  document.addEventListener('toggle', function (e) {
    var abierto = e.target;
    if (abierto.tagName !== 'DETAILS' || !abierto.open) return;
    Array.prototype.forEach.call(abierto.parentElement.children, function (otro) {
      if (otro !== abierto && otro.tagName === 'DETAILS') otro.open = false;
    });
    if (abierto === ultimoClic) { ultimoClic = null; mostrarEncabezado(abierto); }
  }, true);
})();
