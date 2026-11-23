/* ═══════════════════════════════════════
   shared/hud-clock.js
   Jam realtime HUD — dipakai index.html & intro.html
   Ekspor: window.initHudClock (opsional, auto-inisialisasi via id="hud-clock")
═══════════════════════════════════════ */
(function () {
  'use strict';

  var MONTHS_ID = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

  function updateClock(clockEl) {
    if (!clockEl) return;
    var now = new Date();
    var h  = String(now.getHours()).padStart(2, '0');
    var m  = String(now.getMinutes()).padStart(2, '0');
    var s  = String(now.getSeconds()).padStart(2, '0');
    var d  = String(now.getDate()).padStart(2, '0');
    var mo = MONTHS_ID[now.getMonth()];
    var y  = now.getFullYear();
    clockEl.textContent = h + ':' + m + ':' + s + ' // ' + d + ' ' + mo + ' ' + y;
  }

  /* Defer scripts run after DOM is parsed; DOMContentLoaded may already have fired. */
  function onReady(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  onReady(function () {
    var clockEl = document.getElementById('hud-clock');
    if (!clockEl) return;
    updateClock(clockEl);
    setInterval(function () { updateClock(clockEl); }, 1000);
  });

})();
