(function () {
  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }

  function abrirDestino(hash) {
    if (!hash || hash.length < 2) return;
    var destino = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!destino) return;
    for (var el = destino; el; el = el.parentElement) {
      if (el.tagName === 'DETAILS') el.open = true;
    }
    destino.scrollIntoView();
  }
  window.addEventListener('hashchange', function () { abrirDestino(location.hash); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href') === location.hash) abrirDestino(location.hash);
  });
  abrirDestino(location.hash);

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
    Array.prototype.forEach.call(document.querySelectorAll('details[open]'), function (otro) {
      if (otro === abierto || otro.contains(abierto) || abierto.contains(otro)) return;
      var padre = otro.parentElement.closest('details');
      if (!padre || padre.contains(abierto)) otro.open = false;
    });
    if (abierto === ultimoClic) { ultimoClic = null; mostrarEncabezado(abierto); }
  }, true);

  function conteosLocales(doc) {
    return {
      teoricos: doc.querySelectorAll('[data-tipo="teorico"]:not([data-estado="pendiente"])').length,
      practicos: doc.querySelectorAll('[data-tipo="practico"]').length,
      referencias: doc.querySelectorAll('.refs li').length
    };
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-unidad]'), function (unidad) {
    var salida = unidad.querySelector('[data-conteo-unidad]');
    if (!salida) return;
    var talleres = unidad.querySelectorAll('[data-tipo="teorico"], [data-tipo="practico"]').length;
    var pendientes = unidad.querySelectorAll('[data-estado="pendiente"]').length;
    var presentaciones = unidad.querySelectorAll('[data-tipo="presentacion"]').length;
    var texto = plural(talleres, 'taller', 'talleres');
    if (pendientes) texto += ' (' + plural(pendientes, 'pendiente', 'pendientes') + ')';
    if (presentaciones) texto += ' · ' + plural(presentaciones, 'presentación', 'presentaciones');
    var videos = unidad.querySelectorAll('[data-tipo="video"]').length;
    if (videos) texto += ' · ' + plural(videos, 'video presentación', 'videos presentación');
    salida.textContent = texto;
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-conteo-conceptos]'), function (salida) {
    var id = salida.getAttribute('data-conteo-conceptos');
    var grupo = id ? document.getElementById(id) : salida.closest('details.grupo-taller');
    if (!grupo) return;
    var n = grupo.querySelectorAll('.card').length;
    salida.textContent = id ? '(' + plural(n, 'concepto', 'conceptos') + ')' : plural(n, 'concepto', 'conceptos');
  });

  if (window.parent !== window) {
    window.parent.postMessage({ lde3Conteos: conteosLocales(document) }, '*');
  }

  var indicadores = document.querySelectorAll('[data-indicador]');
  if (!indicadores.length) return;

  var paginas = [
    { url: 'temas.html', claves: ['teoricos', 'referencias'] },
    { url: 'casos-practicos.html', claves: ['practicos', 'referencias'] }
  ];
  var marcos = [], respuestas = [], total = { teoricos: 0, practicos: 0, referencias: 0 };

  function mostrar(valores) {
    Array.prototype.forEach.call(indicadores, function (el) {
      var v = valores ? valores[el.getAttribute('data-indicador')] : null;
      el.textContent = (v === null || v === undefined) ? '—' : v;
    });
  }

  window.addEventListener('message', function (e) {
    var i = marcos.findIndex(function (m) { return m.contentWindow === e.source; });
    if (i < 0 || respuestas[i] || !e.data || !e.data.lde3Conteos) return;
    respuestas[i] = true;
    var c = e.data.lde3Conteos;
    paginas[i].claves.forEach(function (k) { total[k] += c[k]; });
    marcos[i].remove();
    if (respuestas.filter(Boolean).length === paginas.length) { clearTimeout(espera); mostrar(total); }
  });

  paginas.forEach(function (p) {
    var f = document.createElement('iframe');
    f.src = p.url;
    f.hidden = true;
    f.setAttribute('aria-hidden', 'true');
    f.tabIndex = -1;
    marcos.push(f);
    document.body.appendChild(f);
  });

  var espera = setTimeout(function () { mostrar(null); }, 15000);
})();
