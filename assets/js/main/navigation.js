/* ═══════════════════════════════════════
   main/navigation.js
   Navbar scroll, scrollToSection, hamburger
   Ekspor global: window.scrollToSection, window.closeMob
   (keduanya dipanggil via onclick atribut HTML)
═══════════════════════════════════════ */
(function () {
  'use strict';

  var navbar      = document.getElementById('navbar');
  var allSections = ['hero', 'about', 'education', 'skills', 'certificates', 'projects', 'contact'];
  var navLinks    = document.querySelectorAll('.nav-links a, #mobile-menu a');

  /* ── Scroll: navbar scrolled state + active link ── */
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    var cur = 'hero';
    allSections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 130) cur = id;
    });

    navLinks.forEach(function (a, i) {
      var sid = allSections[i % allSections.length];
      a.classList.toggle('active', sid === cur);
    });
  }, { passive: true });

  /* ── Scroll helper ── */
  function scrollToSection(id, e) {
    if (e && e.preventDefault) e.preventDefault();
    var el = document.getElementById(id);
    if (!el) return;
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      var nav       = document.getElementById('navbar');
      var navHeight = nav ? nav.offsetHeight : 70;
      var targetY   = el.getBoundingClientRect().top + window.pageYOffset - (navHeight - 20);
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
    navLinks.forEach(function (a, i) {
      var sid = allSections[i % allSections.length];
      a.classList.toggle('active', sid === id);
    });
  }

  window.scrollToSection = scrollToSection;

  /* ── Hamburger ── */
  var mobOpen = false;
  var mob     = document.getElementById('mobile-menu');
  var hamBtn  = document.getElementById('ham-btn');

  if (hamBtn) {
    hamBtn.addEventListener('click', function () {
      mobOpen = !mobOpen;
      mob.classList.toggle('open', mobOpen);
    });
  }

  function closeMob() {
    mobOpen = false;
    if (mob) mob.classList.remove('open');
  }

  window.closeMob = closeMob;

})();
