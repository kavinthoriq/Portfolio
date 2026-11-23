/* ═══════════════════════════════════════
   main/entry-sound.js
   Memainkan epic entry sound sekali saat pertama masuk dari intro.html.
   Bergantung: dipanggil setelah DOMContentLoaded.
═══════════════════════════════════════ */
(function () {
  'use strict';

  /* Cek apakah user baru saja dari intro.html */
  var justEntered = sessionStorage.getItem('just_entered');
  if (!justEntered) return;

  /* Hapus flag agar hanya play sekali */
  sessionStorage.removeItem('just_entered');

  var entrySoundPlayed = false;

  function playEpicEntry() {
    if (entrySoundPlayed) return;
    entrySoundPlayed = true;

    var ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return; }

    var masterOut = ctx.createGain();
    masterOut.gain.value = 0.52;
    masterOut.connect(ctx.destination);

    var now = ctx.currentTime;

    /* ─── Layer 1: DEEP COSMIC BOOM ─── */
    var boom       = ctx.createOscillator();
    var boomGain   = ctx.createGain();
    var boomFilter = ctx.createBiquadFilter();
    boomFilter.type = 'lowpass';
    boomFilter.frequency.value = 180;
    boom.type = 'sine';
    boom.frequency.setValueAtTime(55, now);
    boom.frequency.exponentialRampToValueAtTime(28, now + 1.2);
    boomGain.gain.setValueAtTime(0, now);
    boomGain.gain.linearRampToValueAtTime(0.7, now + 0.04);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    boom.connect(boomFilter);
    boomFilter.connect(boomGain);
    boomGain.connect(masterOut);
    boom.start(now); boom.stop(now + 1.5);

    /* ─── Layer 2: POWER WHOOSH ─── */
    var bufLen   = ctx.sampleRate * 1.8;
    var noiseBuf = ctx.createBuffer(2, bufLen, ctx.sampleRate);
    for (var c = 0; c < 2; c++) {
      var ch = noiseBuf.getChannelData(c);
      for (var i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;
    }
    var noise       = ctx.createBufferSource();
    noise.buffer    = noiseBuf;
    var noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(100, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(4500, now + 0.9);
    noiseFilter.Q.value = 0.8;
    var noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.38, now + 0.08);
    noiseGain.gain.setValueAtTime(0.38, now + 0.45);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterOut);
    noise.start(now);

    /* ─── Layer 3: COSMIC CHORD ASCENT ─── */
    var chordFreqs = [
      { f: 82,  delay: 0.05, dur: 2.2, vol: 0.28 },
      { f: 123, delay: 0.12, dur: 2.0, vol: 0.22 },
      { f: 164, delay: 0.22, dur: 1.8, vol: 0.18 },
      { f: 246, delay: 0.35, dur: 1.5, vol: 0.14 },
      { f: 328, delay: 0.5,  dur: 1.2, vol: 0.10 },
      { f: 492, delay: 0.65, dur: 0.9, vol: 0.07 }
    ];
    chordFreqs.forEach(function (item) {
      var osc = ctx.createOscillator();
      var g   = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + item.delay);
      osc.frequency.exponentialRampToValueAtTime(item.f * 1.02, now + item.delay + item.dur);
      g.gain.setValueAtTime(0, now + item.delay);
      g.gain.linearRampToValueAtTime(item.vol, now + item.delay + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + item.delay + item.dur);
      osc.connect(g); g.connect(masterOut);
      osc.start(now + item.delay); osc.stop(now + item.delay + item.dur + 0.1);
    });

    /* ─── Layer 4: HIGH FREQ ENERGY SHIMMER ─── */
    [1200, 1800, 2400, 3200].forEach(function (f, i) {
      var osc = ctx.createOscillator();
      var g   = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + 0.3 + i * 0.08);
      osc.frequency.linearRampToValueAtTime(f * 1.15, now + 1.5);
      g.gain.setValueAtTime(0, now + 0.3 + i * 0.08);
      g.gain.linearRampToValueAtTime(0.09 - i * 0.015, now + 0.5 + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      osc.connect(g); g.connect(masterOut);
      osc.start(now + 0.3 + i * 0.08); osc.stop(now + 1.9);
    });

    /* ─── Layer 5: SYSTEM ONLINE PING ─── */
    [880, 1108, 1320].forEach(function (f, i) {
      var osc = ctx.createOscillator();
      var g   = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = f;
      g.gain.setValueAtTime(0, now + 0.55 + i * 0.1);
      g.gain.linearRampToValueAtTime(0.06, now + 0.57 + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.70 + i * 0.1);
      osc.connect(g); g.connect(masterOut);
      osc.start(now + 0.55 + i * 0.1); osc.stop(now + 0.75 + i * 0.1);
    });

    /* ─── Fade master out gracefully ─── */
    masterOut.gain.setValueAtTime(0.52, now + 1.8);
    masterOut.gain.linearRampToValueAtTime(0, now + 2.6);
  }

  /* Coba play langsung (browser izinkan setelah navigasi user-gesture).
     Defer scripts run after DOM parsed; DOMContentLoaded may have already fired. */
  function onReady(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  try {
    var testCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (testCtx.state === 'running') {
      testCtx.close();
      onReady(function () {
        setTimeout(playEpicEntry, 120);
      });
    } else {
      testCtx.close();
      throw new Error('suspended');
    }
  } catch (_) {
    /* Fallback: play saat interaksi pertama */
    var _events = ['click', 'keydown', 'touchstart', 'mousemove', 'scroll'];
    function _onFirstInteraction() {
      playEpicEntry();
      _events.forEach(function (ev) {
        document.removeEventListener(ev, _onFirstInteraction);
      });
    }
    _events.forEach(function (ev) {
      document.addEventListener(ev, _onFirstInteraction, { once: true, passive: true });
    });
  }

})();
