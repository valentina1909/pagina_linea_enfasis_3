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

  document.addEventListener('toggle', function (e) {
    var abierto = e.target;
    if (abierto.tagName !== 'DETAILS' || !abierto.open) return;
    Array.prototype.forEach.call(abierto.parentElement.children, function (otro) {
      if (otro !== abierto && otro.tagName === 'DETAILS') otro.open = false;
    });
  }, true);
})();
