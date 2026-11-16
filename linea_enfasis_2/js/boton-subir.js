(function () {
  var boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'boton-subir';
  boton.setAttribute('aria-label', 'Volver al inicio de la página');
  boton.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(boton);

  function actualizar() {
    boton.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();

  boton.addEventListener('click', function () {
    var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' });
  });
})();
