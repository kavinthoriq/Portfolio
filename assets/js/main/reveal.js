/* ═══════════════════════════════════════
   main/reveal.js
   IntersectionObserver scroll-reveal, animated counter,
   radial canvas chart, press effect
═══════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Animated counter ── */
  function animCount(el, target, suffix) {
    var start = 0;
    var dur   = 1500;
    var step  = target / (dur / 16);
    function tick() {
      start += step;
      if (start >= target) { el.textContent = target + suffix; return; }
      el.textContent = Math.floor(start) + suffix;
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ── Radial canvas chart ── */
  function drawRadial(cv, val, color, animate) {
    var ctx    = cv.getContext('2d');
    var cx     = cv.width / 2;
    var cy     = cv.height / 2;
    var r      = 33;
    var lw     = 5;
    var start  = -Math.PI / 2;
    var full   = Math.PI * 2;
    var prog   = 0;
    var target = val / 100;

    function frame() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      /* track */
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, full);
      ctx.strokeStyle = 'rgba(0,245,255,0.1)';
      ctx.lineWidth   = lw;
      ctx.stroke();
      /* fill */
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, start + full * prog);
      ctx.strokeStyle = color;
      ctx.lineWidth   = lw;
      ctx.lineCap     = 'round';
      ctx.shadowBlur  = 10;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur  = 0;
      /* text */
      ctx.fillStyle    = color;
      ctx.font         = 'bold 13px Orbitron,sans-serif';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(prog * 100), cx, cy);
      if (animate && prog < target) {
        prog = Math.min(prog + target / 60, target);
        requestAnimationFrame(frame);
      }
    }
    frame();
  }

  /* Static render awal untuk canvas yang langsung terlihat */
  document.querySelectorAll('.radial-canvas').forEach(function (cv) {
    drawRadial(cv, 0, cv.dataset.color, false);
  });

  /* ── Scroll Reveal (IntersectionObserver) ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');

      /* skill bars */
      e.target.querySelectorAll('.skill-fill').forEach(function (bar) {
        bar.style.width = bar.dataset.pct + '%';
      });

      /* counters */
      e.target.querySelectorAll('[data-count]').forEach(function (el) {
        animCount(el, parseInt(el.dataset.count), el.dataset.suffix || '');
      });

      /* radial */
      e.target.querySelectorAll('.radial-canvas').forEach(function (cv) {
        drawRadial(cv, parseInt(cv.dataset.val), cv.dataset.color, true);
      });
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObs.observe(el);
  });

  /* Observer khusus radial canvases (observe langsung) */
  var radialObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      drawRadial(e.target, parseInt(e.target.dataset.val), e.target.dataset.color, true);
      radialObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.radial-canvas').forEach(function (cv) {
    radialObs.observe(cv);
  });

  /* ── Press effect pada elemen static ── */
  document.querySelectorAll('.press').forEach(function (el) {
    el.addEventListener('mousedown',  function () { el.style.transform = 'translateY(1px) scale(0.99)'; });
    el.addEventListener('mouseup',    function () { el.style.transform = ''; });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });

  /* Ekspor revealObs agar projects.js bisa observe kartu yang dirender dinamis */
  window._revealObs = revealObs;

})();
