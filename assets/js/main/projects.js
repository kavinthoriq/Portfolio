/* ═══════════════════════════════════════
   main/projects.js
   Render kartu proyek + filter.
   Bergantung: window.PROJECTS (dari data/projects.js), window._revealObs (dari reveal.js)
═══════════════════════════════════════ */
(function () {
  'use strict';

  var projects = window.PROJECTS || [];

  /* ── Sinkronisasi jumlah proyek ke stat card ── */
  document.querySelectorAll('.stat-card').forEach(function (card) {
    var lbl = card.querySelector('.stat-lbl');
    if (lbl && lbl.textContent.trim() === 'PROYEK') {
      var num = card.querySelector('.stat-num');
      if (num) {
        num.dataset.count  = projects.length;
        num.textContent    = projects.length + '+';
      }
    }
  });

  /* ── Render kartu proyek ── */
  function renderProjectCard(proj, delay) {
    var isCompleted  = proj.status === 'COMPLETED';
    var statusClass  = isCompleted ? 'completed' : 'in-progress';
    var statusLabel  = isCompleted ? '● COMPLETED' : '⟳ IN PROGRESS';

    var tagsHTML = proj.tags
      .map(function (t) { return '<span class="mission-tag">' + t + '</span>'; })
      .join('');

    var demoBtn = proj.demo
      ? '<a class="proj-btn proj-btn-demo" href="' + proj.demo + '" target="_blank" rel="noopener noreferrer" aria-label="Buka live demo ' + proj.title + '">▶ LIVE DEMO</a>'
      : '';

    var card = document.createElement('article');
    card.className = 'proj-card glass cut hud-box reveal';
    card.style.transitionDelay = delay + 's';
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-tags', proj.tags.join(','));

    card.innerHTML =
      '<span class="c-bl"></span><span class="c-br"></span>' +
      '<div class="proj-thumb">' +
        '<img' +
          ' src="' + proj.img + '"' +
          ' alt="Screenshot proyek ' + proj.title + '"' +
          ' loading="lazy"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"' +
        '/>' +
        '<div class="proj-thumb-placeholder" style="display:none;">[ NO IMAGE ]</div>' +
      '</div>' +
      '<div class="proj-body">' +
        '<div class="proj-meta">' +
          '<span class="proj-id">'  + proj.id    + '</span>' +
          '<span class="proj-status ' + statusClass + '">' + statusLabel + '</span>' +
          '<span class="proj-year">' + proj.year  + '</span>' +
        '</div>' +
        '<h3 class="proj-title">' + proj.title + '</h3>' +
        '<p class="proj-desc">'   + proj.desc  + '</p>' +
        '<div class="proj-tags">' + tagsHTML   + '</div>' +
        '<div class="proj-actions">' +
          demoBtn +
          '<a class="proj-btn proj-btn-repo" href="' + proj.repo + '" target="_blank" rel="noopener noreferrer" aria-label="Lihat source code ' + proj.title + '">⊕ SOURCE CODE</a>' +
        '</div>' +
      '</div>';

    return card;
  }

  /* ── Filter + render awal ── */
  (function initProjectsFilter() {
    var grid       = document.getElementById('proj-grid');
    var emptyMsg   = document.getElementById('proj-empty');
    var filterBtns = document.querySelectorAll('.proj-filter-btn');
    if (!grid) return;

    /* Render awal */
    projects.forEach(function (proj, i) {
      var card = renderProjectCard(proj, (i % 3) * 0.08);
      grid.appendChild(card);
      if (window._revealObs) window._revealObs.observe(card);
    });

    function applyFilter(filter) {
      var visible = 0;
      grid.querySelectorAll('.proj-card').forEach(function (card) {
        var tags = card.dataset.tags || '';
        var show = filter === 'ALL' || tags.split(',').some(function (t) {
          return t.trim() === filter;
        });
        if (show) {
          card.removeAttribute('hidden');
          card.style.transitionDelay = ((visible % 3) * 0.06) + 's';
          visible++;
        } else {
          card.setAttribute('hidden', '');
        }
      });
      if (emptyMsg) emptyMsg.classList.toggle('visible', visible === 0);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        applyFilter(filter);
      });
    });
  })();

})();
