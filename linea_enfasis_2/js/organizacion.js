/* Muestra en cada unidad de Temas un resumen de su contenido (mismo comportamiento que Línea de Énfasis III). */
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
})();
