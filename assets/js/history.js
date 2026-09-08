/* History page: highlights the timeline entry currently in view in the
   sticky rail. Progressive; the page is complete without it. */
(function () {
  'use strict';
  var rail = document.getElementById('tl-rail');
  if (!rail || !('IntersectionObserver' in window)) return;

  var links = {};
  Array.prototype.forEach.call(rail.querySelectorAll('a[href^="#"]'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  var visible = {};

  function paint() {
    var current = null;
    Object.keys(links).forEach(function (id) {
      if (visible[id] && !current) current = id;
    });
    Object.keys(links).forEach(function (id) {
      if (id === current) links[id].setAttribute('aria-current', 'true');
      else links[id].removeAttribute('aria-current');
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    paint();
  }, { rootMargin: '-120px 0px -55% 0px', threshold: 0 });

  Object.keys(links).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();
