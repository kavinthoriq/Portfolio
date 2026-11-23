/* ═══════════════════════════════════════
   main/sfx.js
   Index audio engine: hover & click sounds, attach listeners.
   Menggunakan AudioContext sendiri (bukan shared AudioEngine)
   agar terpisah dari entry-sound & tidak konflik.
═══════════════════════════════════════ */
(function () {
  'use strict';

  var idxAudioCtx   = null;
  var idxMasterGain = null;
  var idxMuted      = false;
  var idxAudioReady = false;

  function idxInitAudio() {
    if (idxAudioReady) return;
    try {
      idxAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      idxMasterGain = idxAudioCtx.createGain();
      idxMasterGain.gain.value = 0.45;
      idxMasterGain.connect(idxAudioCtx.destination);
      idxAudioReady = true;
    } catch (e) {}
  }

  /* ─── SOFT CYBER BEEP (hover) ─── */
  function playHoverBeep(freq) {
    if (!idxAudioReady || idxMuted) return;
    freq = freq || 800;
    var now  = idxAudioCtx.currentTime;
    var osc  = idxAudioCtx.createOscillator();
    var gain = idxAudioCtx.createGain();
    osc.connect(gain); gain.connect(idxMasterGain);
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.start(now); osc.stop(now + 0.08);
  }

  /* ─── CYBER CLICK ─── */
  function playCyberClick() {
    if (!idxAudioReady || idxMuted) return;
    var now = idxAudioCtx.currentTime;
    [600, 900, 1200].forEach(function (freq, i) {
      var osc  = idxAudioCtx.createOscillator();
      var gain = idxAudioCtx.createGain();
      osc.connect(gain); gain.connect(idxMasterGain);
      osc.type = 'triangle'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, now + i * 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.025 + 0.12);
      osc.start(now + i * 0.025); osc.stop(now + i * 0.025 + 0.13);
    });
  }

  /* ─── NAV CLICK ─── */
  function playNavClick() {
    if (!idxAudioReady || idxMuted) return;
    var now  = idxAudioCtx.currentTime;
    var osc  = idxAudioCtx.createOscillator();
    var gain = idxAudioCtx.createGain();
    osc.connect(gain); gain.connect(idxMasterGain);
    osc.type = 'sine'; osc.frequency.value = 600;
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.start(now); osc.stop(now + 0.11);
  }

  /* ─── HAMBURGER TOGGLE ─── */
  function playToggleBeep() {
    if (!idxAudioReady || idxMuted) return;
    var now  = idxAudioCtx.currentTime;
    var osc  = idxAudioCtx.createOscillator();
    var gain = idxAudioCtx.createGain();
    osc.connect(gain); gain.connect(idxMasterGain);
    osc.type = 'square'; osc.frequency.value = 400;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(now); osc.stop(now + 0.09);
  }

  /* ─── MUTE TOGGLE ─── */
  var sfxMuteBtn = document.getElementById('sfx-mute-btn');
  if (sfxMuteBtn) {
    sfxMuteBtn.addEventListener('click', function () {
      idxInitAudio();
      idxMuted = !idxMuted;
      if (idxMasterGain) idxMasterGain.gain.value = idxMuted ? 0 : 0.45;
      sfxMuteBtn.textContent = idxMuted ? '🔇 SFX' : '🔊 SFX';
      sfxMuteBtn.style.color  = idxMuted ? 'rgba(0,245,255,0.3)' : 'rgba(0,245,255,0.75)';
    });
  }

  /* ─── USER INTERACTION UNLOCK ─── */
  function idxUnlockAudio() {
    idxInitAudio();
    document.removeEventListener('click',      idxUnlockAudio);
    document.removeEventListener('keydown',    idxUnlockAudio);
    document.removeEventListener('touchstart', idxUnlockAudio);
  }
  document.addEventListener('click',      idxUnlockAudio);
  document.addEventListener('keydown',    idxUnlockAudio);
  document.addEventListener('touchstart', idxUnlockAudio);

  /* ─── ATTACH HOVER/CLICK SOUNDS ─── */

  /* Buttons (.btn) */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () { playHoverBeep(750); });
    btn.addEventListener('touchstart', function () { playHoverBeep(750); }, { passive: true });
    btn.addEventListener('click', playCyberClick);
  });

  /* Contact cards */
  document.querySelectorAll('.contact-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () { playHoverBeep(600); });
    card.addEventListener('click', playCyberClick);
  });

  /* Nav links */
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(function (link) {
    link.addEventListener('mouseenter', function () { playHoverBeep(500); });
    link.addEventListener('click', playNavClick);
  });

  /* Tool badges */
  document.querySelectorAll('.tool-badge').forEach(function (badge) {
    badge.addEventListener('mouseenter', function () { playHoverBeep(900); });
  });

  /* Nav logo */
  var navLogo = document.querySelector('.nav-logo');
  if (navLogo) navLogo.addEventListener('click', playNavClick);

  /* Hamburger */
  var hamBtn = document.getElementById('ham-btn');
  if (hamBtn) hamBtn.addEventListener('click', playToggleBeep);

  /* Project filter buttons */
  document.querySelectorAll('.proj-filter-btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () { playHoverBeep(700); });
    btn.addEventListener('click', playCyberClick);
  });

  /* Project action buttons (event delegation — kartu dirender dinamis) */
  var projGrid = document.getElementById('proj-grid');
  if (projGrid) {
    projGrid.addEventListener('mouseenter', function (e) {
      if (e.target.classList.contains('proj-btn') || e.target.closest('.proj-btn')) {
        playHoverBeep(820);
      }
    }, true);
    projGrid.addEventListener('click', function (e) {
      if (e.target.classList.contains('proj-btn') || e.target.closest('.proj-btn')) {
        playCyberClick();
      }
    }, true);
  }

  /* Ekspor global — agar modul lain (certificates.js, dsb.) bisa pakai */
  window.playHoverBeep  = playHoverBeep;
  window.playCyberClick = playCyberClick;

})();
