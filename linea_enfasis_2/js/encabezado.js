/* Encabezado y menú compartidos por todas las páginas.
   Se escribe en el lugar donde se incluye: <script src="js/encabezado.js"></script> */
(function () {
  var actual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var enlaces = [
    ['../index.html', '↩', 'Portal LDE'],
    ['index.html', '⌂', 'Inicio'],
    ['temas.html', '▤', 'Temas'],
    ['conceptos.html', '◇', 'Conceptos'],
    ['casos-practicos.html', '▣', 'Casos prácticos'],
    ['proyecto.html', '▶', 'Proyecto - Video Tutorial']
  ];
  var menu = enlaces.map(function (e) {
    var cur = e[0] === actual ? ' aria-current="page"' : '';
    return '<a href="' + e[0] + '"' + cur + '><span aria-hidden="true">' + e[1] + '</span><span>' + e[2] + '</span></a>';
  }).join('\n      ');
  document.write(
    '<a class="skip-link" href="#contenido">Saltar al contenido</a>\n' +
    '<header class="site-header">\n' +
    '  <div class="header-inner brand-row">\n' +
    '    <div>\n' +
    '      <p class="brand-title">LÍNEA DE ÉNFASIS 2</p>\n' +
    '      <p class="brand-subtitle">Aprendizaje · Tecnología · Innovación</p>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</header>\n' +
    '<div class="nav-wrap">\n' +
    '  <nav class="navbar" aria-label="Navegación principal">\n      ' + menu + '\n  </nav>\n' +
    '</div>'
  );
})();
