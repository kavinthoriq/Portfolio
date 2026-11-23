/* ═══════════════════════════════════════
   main/typewriter.js
   Typewriter efek pada hero tagline (#typewriter)
═══════════════════════════════════════ */
(function () {
  'use strict';

  var el = document.getElementById('typewriter');
  if (!el) return;

  var texts = [
    'Siap berevolusi dan menembus batas...',
    '...dalam dunia Web & Game Development.',
    'Adaptif. Terampil. Tangguh.',
    'Level Up: Setiap Hari.',
  ];

  var ti = 0, ci = 0, deleting = false;

  function tick() {
    var txt = texts[ti];
    if (!deleting && ci <= txt.length) {
      el.innerHTML = txt.slice(0, ci) + '<span class="cursor">▊</span>';
      ci++;
      setTimeout(tick, ci === txt.length + 1 ? 1800 : 60);
    } else if (deleting && ci >= 0) {
      el.innerHTML = txt.slice(0, ci) + '<span class="cursor">▊</span>';
      ci--;
      if (ci < 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
        ci = 0;
        setTimeout(tick, 300);
      } else {
        setTimeout(tick, 30);
      }
    } else {
      deleting = true;
      setTimeout(tick, 1800);
    }
  }

  tick();

})();
