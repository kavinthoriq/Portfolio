/* ═══════════════════════════════════════
   shared/starfield.js
   Canvas bintang — dipakai index.html (bg-canvas) & intro.html (star-canvas)
   Ekspor: window.StarField (bukan dipakai langsung; auto-inisialisasi via data-canvas-id)
═══════════════════════════════════════ */
(function () {
  'use strict';

  /**
   * Inisialisasi starfield pada sebuah canvas.
   * @param {string} canvasId - id elemen <canvas>
   */
  function initStarField(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, stars = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = [];
      var count = Math.floor((W * H) / 6000);
      for (var i = 0; i < count; i++) {
        stars.push({
          x:    Math.random() * W,
          y:    Math.random() * H,
          r:    Math.random() * 1.3 + 0.2,
          a:    Math.random(),
          da:   Math.random() * 0.006 + 0.002,
          cyan: Math.random() < 0.18
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da = -s.da;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, s.a)) * 0.85;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle   = s.cyan ? '#00f5ff' : '#ffffff';
        ctx.shadowBlur  = s.cyan ? 8 : 3;
        ctx.shadowColor = s.cyan ? '#00f5ff' : '#ffffff';
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  /* Auto-inisialisasi semua canvas yang ada di halaman.
     Defer scripts run after DOM is parsed; DOMContentLoaded may already have fired. */
  function onReady(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  onReady(function () {
    /* index.html */
    if (document.getElementById('bg-canvas'))   initStarField('bg-canvas');
    /* intro.html */
    if (document.getElementById('star-canvas')) initStarField('star-canvas');
  });

})();
