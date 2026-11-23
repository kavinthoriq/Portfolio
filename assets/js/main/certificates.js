/* ═══════════════════════════════════════
   main/certificates.js
   Render kartu sertifikat + lightbox HUD.
   Bergantung: window.CERTIFICATES (dari data/certificates.js),
               window._revealObs (dari reveal.js)
   Suara opsional: typeof playHoverBeep / playCyberClick
═══════════════════════════════════════ */
(function () {
  'use strict';

  var certs = window.CERTIFICATES || [];
  var grid  = document.getElementById('cert-grid');
  if (!grid || !certs.length) return;

  /* ══════════════════════════════════════
     LIGHTBOX
  ══════════════════════════════════════ */
  var lb         = null;  // element, built on first open
  var lbTrigger  = null;  // element that opened LB (for focus restore)

  function buildLightbox() {
    if (lb) return;
    lb = document.createElement('div');
    lb.id               = 'cert-lightbox';
    lb.className        = 'cert-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Pratinjau Sertifikat');

    lb.innerHTML =
      '<div class="cert-lb-backdrop" id="cert-lb-bd"></div>' +
      '<div class="cert-lb-box">' +
        '<button class="cert-lb-close" id="cert-lb-close" aria-label="Tutup pratinjau">✕ TUTUP</button>' +
        '<img class="cert-lb-img" id="cert-lb-img" src="" alt="" />' +
        '<div class="cert-lb-info">' +
          '<p class="cert-lb-title" id="cert-lb-title"></p>' +
          '<p class="cert-lb-meta" id="cert-lb-meta"></p>' +
          '<div class="cert-lb-actions" id="cert-lb-actions"></div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(lb);

    /* ── Close on backdrop click ── */
    document.getElementById('cert-lb-bd').addEventListener('click', closeLightbox);

    /* ── Close button ── */
    document.getElementById('cert-lb-close').addEventListener('click', closeLightbox);

    /* ── Escape key ── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
    });

    /* ── Tab trap inside modal ── */
    lb.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = lb.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function openLightbox(cert, trigger) {
    buildLightbox();
    lbTrigger = trigger || null;

    var img     = document.getElementById('cert-lb-img');
    var title   = document.getElementById('cert-lb-title');
    var meta    = document.getElementById('cert-lb-meta');
    var actions = document.getElementById('cert-lb-actions');

    img.src = cert.img;
    img.alt = 'Sertifikat ' + cert.title;

    title.textContent = cert.award + ' — ' + cert.title;

    meta.innerHTML =
      '◈ PENERBIT: ' + cert.issuer + '<br>' +
      '◈ TANGGAL: ' + cert.date + '<br>' +
      '◈ DITANDATANGANI OLEH: ' + cert.signer + ' (' + cert.signerRole + ')';

    /* Tombol aksi */
    var dlBtn = '';
    if (cert.pdf) {
      dlBtn =
        '<a class="proj-btn proj-btn-cert-dl" href="' + cert.pdf + '" download ' +
        'aria-label="Unduh PDF ' + cert.title + '">⊕ UNDUH PDF</a>';
    }
    actions.innerHTML = dlBtn;

    /* Lock scroll */
    document.body.style.overflow = 'hidden';

    lb.classList.add('open');

    /* Fokus ke tombol tutup */
    requestAnimationFrame(function () {
      var closeBtn = document.getElementById('cert-lb-close');
      if (closeBtn) closeBtn.focus();
    });

    if (typeof playCyberClick === 'function') playCyberClick();
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';

    /* Kembalikan fokus ke elemen pemicu */
    if (lbTrigger) {
      try { lbTrigger.focus(); } catch (e) {}
      lbTrigger = null;
    }

    if (typeof playCyberClick === 'function') playCyberClick();
  }

  /* ══════════════════════════════════════
     RENDER KARTU
  ══════════════════════════════════════ */
  function renderCertCard(cert, delay) {
    var tagsHTML = cert.tags
      .map(function (t) { return '<span class="mission-tag">' + t + '</span>'; })
      .join('');

    var dlBtn = cert.pdf
      ? '<a class="proj-btn proj-btn-cert-dl" href="' + cert.pdf + '" download ' +
        'aria-label="Unduh PDF ' + cert.title + '">⊕ UNDUH PDF</a>'
      : '';

    var card = document.createElement('article');
    card.className = 'cert-card glass cut hud-box reveal';
    card.style.transitionDelay = delay + 's';
    card.setAttribute('role', 'listitem');

    card.innerHTML =
      '<span class="c-bl"></span><span class="c-br"></span>' +

      /* Thumbnail */
      '<div class="cert-thumb" role="button" tabindex="0" ' +
        'aria-label="Lihat sertifikat ' + cert.title + '" ' +
        'title="Klik untuk pratinjau">' +
        '<img' +
          ' src="'     + cert.img   + '"' +
          ' alt="Sertifikat ' + cert.title + '"' +
          ' loading="lazy"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.nextElementSibling.style.display=\'flex\';"' +
        '/>' +
        '<div class="cert-thumb-overlay"><span>◈ LIHAT SERTIFIKAT</span></div>' +
        '<div class="cert-thumb-placeholder" style="display:none;">[ NO IMAGE ]</div>' +
      '</div>' +

      /* Body */
      '<div class="cert-body">' +
        '<div class="proj-meta">' +
          '<span class="proj-id">'  + cert.id + '</span>' +
          '<span class="proj-status certified">● CERTIFIED</span>' +
          '<span class="cert-issuer">' + cert.issuer + '</span>' +
        '</div>' +
        '<h3 class="proj-title">' + cert.title + '</h3>' +
        '<p class="proj-desc">'   + cert.desc  + '</p>' +
        '<p class="cert-signer">✍ <b>' + cert.signer + '</b> — ' + cert.signerRole + '</p>' +
        '<div class="proj-tags">' + tagsHTML + '</div>' +
        '<div class="proj-actions">' +
          '<button class="proj-btn proj-btn-cert-view cert-view-btn" ' +
            'aria-label="Lihat sertifikat ' + cert.title + '">◈ LIHAT SERTIFIKAT</button>' +
          dlBtn +
        '</div>' +
      '</div>';

    /* ── Lightbox triggers ── */
    var thumb   = card.querySelector('.cert-thumb');
    var viewBtn = card.querySelector('.cert-view-btn');

    function openThis(e) {
      openLightbox(cert, e.currentTarget);
    }

    thumb.addEventListener('click', openThis);
    thumb.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openThis(e); }
    });
    viewBtn.addEventListener('click', openThis);

    /* ── SFX hover ── */
    [thumb, viewBtn].forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        if (typeof playHoverBeep === 'function') playHoverBeep(900);
      });
    });

    /* ── PDF btn SFX ── */
    var dlEl = card.querySelector('.proj-btn-cert-dl');
    if (dlEl) {
      dlEl.addEventListener('click', function () {
        if (typeof playCyberClick === 'function') playCyberClick();
      });
      dlEl.addEventListener('mouseenter', function () {
        if (typeof playHoverBeep === 'function') playHoverBeep(750);
      });
    }

    return card;
  }

  /* ── Render semua kartu ── */
  certs.forEach(function (cert, i) {
    var card = renderCertCard(cert, (i % 2) * 0.08);
    grid.appendChild(card);
    if (window._revealObs) window._revealObs.observe(card);
  });

})();
