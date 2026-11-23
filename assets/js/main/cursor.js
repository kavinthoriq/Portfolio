/* ═══════════════════════════════════════════════════════════════
   main/cursor.js — Custom Cursor: SINGULARITY
   Hanya aktif di perangkat dengan mouse (hover:hover & pointer:fine).

   KONFIGURASI:
   Untuk mengubah ukuran       → ubah CORE_SIZE dan RING_SIZE di bawah.
   Untuk mengubah warna        → edit variabel CSS --cyan / --gold di :root.
   Untuk mengubah kecepatan    → ubah ROT_SPEED (deg/frame) & HOVER_ROT_SPEED.
   Untuk mematikan semua       → setel ENABLED = false.
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────── KONFIGURASI ─────────────── */
  var ENABLED         = true;    /* false = nonaktifkan cursor kustom sepenuhnya */
  var ORBIT_MOON      = true;    /* true  = aktifkan bulan orbit emas */
  var CORE_SIZE       = 10;      /* px — diameter inti */
  var RING_SIZE       = 34;      /* px — diameter cincin */
  var LERP_FACTOR     = 0.15;    /* 0.0–1.0 — kelambatan cincin (lebih kecil = lebih lambat) */
  var ROT_SPEED       = 2.2;     /* derajat/frame — kecepatan putar normal */
  var HOVER_ROT_SPEED = 5.8;     /* derajat/frame — kecepatan putar saat hover */
  var MOON_SPEED      = 0.55;    /* derajat/frame — kecepatan orbit bulan normal */
  var MOON_HOVER_SPD  = 2.2;     /* derajat/frame — kecepatan orbit bulan saat hover */
  var MAX_PARTICLES   = 30;      /* maksimum partikel sekaligus */

  /* ─────────────── CEK PERANGKAT ─────────────── */
  if (!ENABLED) return;
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  /* ─────────────── CEK prefers-reduced-motion ─────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────── ELEMEN DOM ─────────────── */
  var wrap      = document.getElementById('sg-cursor');
  var core      = document.getElementById('sg-core');
  var ring      = document.getElementById('sg-ring');
  var moonOrbit = document.getElementById('sg-moon-orbit');

  if (!wrap || !core || !ring) return;

  if (!ORBIT_MOON && moonOrbit) moonOrbit.style.display = 'none';

  /* ─────────────── STATE ─────────────── */
  var mouseX = -200, mouseY = -200;
  var ringX  = -200, ringY  = -200;
  var moonX  = -200, moonY  = -200;
  var ringRot    = 0;
  var moonAngle  = 0;
  var isHover    = false;
  var particleCount = 0;
  var visible    = false;

  /* Matikan animasi CSS bawaan ring — kita kendalikan via JS */
  ring.style.animation = 'none';

  if (reducedMotion && moonOrbit) moonOrbit.style.display = 'none';

  /* ─────────────── ELEMEN INTERAKTIF ─────────────── */
  var INTERACTIVE_SEL = [
    'a', 'button', 'label',
    '[role="button"]', '[role="link"]', '[role="tab"]',
    '.nav-links a', '.hamburger', '.contact-card',
    '#sfx-mute-btn', '.proj-filter-btn', '.proj-btn',
    '.tool-badge', '.info-card', '.stat-card',
    '.press', '.btn', 'select'
  ].join(',');

  /* ─────────────── UTILITAS LERP ─────────────── */
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ─────────────── LOOP ANIMASI UTAMA ─────────────── */
  function tick() {
    requestAnimationFrame(tick);

    wrap.style.transform = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0)';

    if (!reducedMotion) {
      var lf = LERP_FACTOR;
      ringX = lerp(ringX, mouseX, lf);
      ringY = lerp(ringY, mouseY, lf);
      moonX = lerp(moonX, mouseX, lf * 0.85);
      moonY = lerp(moonY, mouseY, lf * 0.85);

      var speed = isHover ? HOVER_ROT_SPEED : ROT_SPEED;
      ringRot = (ringRot + speed) % 360;

      var rdx = ringX - mouseX;
      var rdy = ringY - mouseY;
      var sc  = isHover ? 0.62 : 1;
      ring.style.transform =
        'translate(calc(-50% + ' + rdx + 'px), calc(-50% + ' + rdy + 'px)) rotate(' + ringRot + 'deg) scale(' + sc + ')';

      if (ORBIT_MOON && moonOrbit) {
        var ms      = isHover ? MOON_HOVER_SPD : MOON_SPEED;
        moonAngle   = (moonAngle + ms) % 360;
        var orbitR  = RING_SIZE * 0.55;
        var rad     = (moonAngle * Math.PI) / 180;
        var mdx     = moonX - mouseX;
        var mdy     = moonY - mouseY;
        moonOrbit.style.transform =
          'translate(calc(-50% + ' + mdx + 'px), calc(-50% + ' + mdy + 'px)) rotate(' + moonAngle + 'deg)';
      }
    } else {
      ring.style.transform = 'translate(-50%, -50%)';
    }
  }

  /* ─────────────── TAMPILKAN CURSOR PERTAMA KALI ─────────────── */
  function activateCursor() {
    if (visible) return;
    visible = true;
    document.documentElement.classList.add('has-custom-cursor');
    wrap.style.transition = 'opacity 0.3s ease';
    wrap.style.opacity    = '1';
    tick();
  }

  /* ─────────────── MOUSE MOVE ─────────────── */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!visible) {
      ringX = mouseX; ringY = mouseY;
      moonX = mouseX; moonY = mouseY;
      activateCursor();
    }

    var target      = e.target;
    var interactive = !!(
      target.closest(INTERACTIVE_SEL) &&
      !target.closest('input, textarea, [contenteditable="true"]')
    );
    setHover(interactive);
  }, { passive: true });

  /* ─────────────── MOUSE ENTER / LEAVE WINDOW ─────────────── */
  document.addEventListener('mouseleave', function () {
    wrap.style.transition = 'opacity 0.35s ease';
    wrap.style.opacity    = '0';
  });
  document.addEventListener('mouseenter', function () {
    if (!visible) return;
    wrap.style.transition = 'opacity 0.2s ease';
    wrap.style.opacity    = '1';
  });

  /* ─────────────── HOVER STATE ─────────────── */
  function setHover(on) {
    if (isHover === on) return;
    isHover = on;
    if (on) {
      core.style.transform  = 'translate(-50%, -50%) scale(0.75)';
      core.style.boxShadow  =
        '0 0 0 1.5px rgba(255,215,0,0.9),' +
        '0 0 8px 3px rgba(255,215,0,0.5),' +
        '0 0 16px 5px rgba(255,165,0,0.25)';
      ring.style.boxShadow  = '0 0 14px rgba(255,215,0,0.55)';
      ring.style.background =
        'linear-gradient(#020812, #020812) padding-box,' +
        'conic-gradient(from 0deg, var(--gold) 0%, #ff8c00 40%, transparent 60%, var(--gold) 100%) border-box';
    } else {
      core.style.transform  = 'translate(-50%, -50%) scale(1)';
      core.style.boxShadow  =
        '0 0 0 1.5px rgba(0,245,255,0.9),' +
        '0 0 6px 2px rgba(0,245,255,0.45),' +
        '0 0 12px 4px rgba(0,153,255,0.25)';
      ring.style.boxShadow  = '0 0 8px rgba(0,245,255,0.3)';
      ring.style.background =
        'linear-gradient(#020812, #020812) padding-box,' +
        'conic-gradient(from 0deg, var(--cyan) 0%, var(--blue) 40%, transparent 60%, var(--cyan) 100%) border-box';
    }
  }

  /* ─────────────── KLIK: SHOCKWAVE + PARTIKEL ─────────────── */
  document.addEventListener('mousedown', function (e) {
    core.style.transform = 'translate(-50%, -50%) scale(0.55)';
    if (!reducedMotion) {
      spawnShockwave(e.clientX, e.clientY);
      spawnParticles(e.clientX, e.clientY);
    }
  });
  document.addEventListener('mouseup', function () {
    core.style.transform = isHover
      ? 'translate(-50%, -50%) scale(0.75)'
      : 'translate(-50%, -50%) scale(1)';
  });

  /* ─────────────── SHOCKWAVE ─────────────── */
  function spawnShockwave(x, y) {
    var sw  = document.createElement('div');
    sw.className = 'sg-shockwave';
    var sz  = RING_SIZE * 1.2;
    sw.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;left:' + x + 'px;top:' + y + 'px;';
    document.body.appendChild(sw);
    sw.addEventListener('animationend', function () { sw.remove(); }, { once: true });
  }

  /* ─────────────── PARTIKEL ─────────────── */
  function spawnParticles(x, y) {
    var count = Math.min(7, MAX_PARTICLES - particleCount);
    if (count <= 0) return;

    for (var i = 0; i < count; i++) {
      particleCount++;
      var p    = document.createElement('div');
      p.className = 'sg-particle';
      var sz   = Math.random() * 3 + 1.5;
      var angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      var dist  = 22 + Math.random() * 22;
      var tx    = Math.cos(angle) * dist;
      var ty    = Math.sin(angle) * dist;
      var dur   = 420 + Math.random() * 220;

      p.style.cssText =
        'width:' + sz + 'px;height:' + sz + 'px;' +
        'left:' + x + 'px;top:' + y + 'px;' +
        'background:' + (Math.random() > 0.5 ? 'var(--cyan)' : '#fff') + ';' +
        'box-shadow:0 0 ' + (sz * 2) + 'px ' + (Math.random() > 0.5 ? 'var(--cyan)' : 'var(--gold)') + ';' +
        'transform:translate(-50%,-50%) translate(0px,0px);' +
        'opacity:1;' +
        'transition:transform ' + dur + 'ms ease-out, opacity ' + dur + 'ms ease-out;';

      document.body.appendChild(p);

      requestAnimationFrame(function (p, tx, ty, dur) {
        return function () {
          requestAnimationFrame(function () {
            p.style.transform = 'translate(-50%,-50%) translate(' + tx + 'px,' + ty + 'px)';
            p.style.opacity   = '0';
          });
        };
      }(p, tx, ty, dur));

      setTimeout(function (p) {
        return function () { p.remove(); particleCount--; };
      }(p), dur + 20);
    }
  }

  /* ─────────────── INPUT/TEXTAREA: sembunyikan cursor ─────────────── */
  document.addEventListener('focusin', function (e) {
    if (e.target.matches('input, textarea, [contenteditable="true"]')) {
      wrap.style.opacity = '0';
    }
  });
  document.addEventListener('focusout', function (e) {
    if (e.target.matches('input, textarea, [contenteditable="true"]')) {
      if (visible) wrap.style.opacity = '1';
    }
  });

})();
