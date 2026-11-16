(function () {
  var actual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var enlaces = [
    ['../index.html', 'Portal LDE'],
    ['index.html', 'Inicio'],
    ['temas.html', 'Temas'],
    ['conceptos.html', 'Conceptos'],
    ['aprendizaje.html', 'Aprendizaje'],
    ['casos-practicos.html', 'Casos prácticos'],
    ['proyecto.html', 'Proyecto']
  ];
  var menu = enlaces.map(function (e) {
    var cur = e[0] === actual ? ' aria-current="page"' : '';
    return '<a href="' + e[0] + '"' + cur + '>' + e[1] + '</a>';
  }).join('\n    ');
  document.write(
    '<a class="skip-link" href="#contenido">Saltar al contenido</a>\n' +
    '<header class="site-header">\n' +
    '  <div class="brand-row">\n' +
    '    <div class="brand-title">Línea de Énfasis II</div>\n' +
    '  </div>\n' +
    '</header>\n' +
    '<div class="nav-wrap">\n' +
    '  <nav class="navbar" aria-label="Navegación principal">\n    ' + menu + '\n  </nav>\n' +
    '</div>'
  );
})();
