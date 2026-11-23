/* ═══════════════════════════════════════
   intro/intro.js
   Semua logika intro.html:
   - Typewriter terminal helper
   - 4-fase animasi
   - exitIntro (global — dipanggil dari onclick)
   - Keyboard listener
   - Intro audio hooks (menggunakan AudioEngine dari shared/audio-engine.js)
═══════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. TYPEWRITER TERMINAL HELPER ── */
  var termPanel = document.getElementById('term-panel');

  /* Versi internal dengan audio blip */
  function typewriter(text, color, onFinish) {
    var line = document.createElement('div');
    line.style.color      = color || '#00ff88';
    line.style.textShadow = '0 0 8px ' + (color || '#00ff88') + '80';
    termPanel.appendChild(line);

    var cursor = document.createElement('span');
    cursor.className = 'term-cursor';
    line.appendChild(cursor);

    var i = 0;
    var speed = 25; /* ms per karakter */
    var timer = setInterval(function () {
      if (i <= text.length) {
        line.textContent = text.slice(0, i);
        line.appendChild(cursor);
        /* blip setiap 3 karakter */
        if (i % 3 === 0 && i > 0) _playTerminalBlip();
        i++;
      } else {
        clearInterval(timer);
        cursor.remove();
        if (onFinish) onFinish();
      }
    }, speed);
  }

  /* ── 2. SKENARIO ANIMASI 4 FASE ── */
  (function runIntroSequence() {
    /* FASE 1: System Boot-up */
    setTimeout(function () {
      typewriter('> INITIALIZING SYSTEM...', '#00ff88', function () {
        setTimeout(function () {
          typewriter('> CONNECTING TO HR ALLIANCE SATELLITE...', '#00ff88', function () {
            setTimeout(function () {
              typewriter('> BYPASSING SECURITY... OK.', '#00ff88', function () {

                /* FASE 2: User Authentication */
                setTimeout(function () {
                  typewriter('> AUTHENTICATING OPERATOR...', '#00f5ff', function () {
                    setTimeout(function () {
                      var phaseAuth     = document.getElementById('phase-auth');
                      var welcomeWrap   = document.getElementById('welcome-wrap');
                      var welcomeDivider = document.getElementById('welcome-divider');

                      phaseAuth.classList.add('active');
                      welcomeWrap.classList.add('shown');
                      setTimeout(function () { welcomeDivider.classList.add('expand'); }, 150);

                      /* FASE 3: Visual Reveal & CTA */
                      setTimeout(function () {
                        document.getElementById('phase-boot').style.opacity = '0';
                        document.getElementById('phase-auth').style.opacity = '0';

                        setTimeout(function () {
                          document.getElementById('phase-boot').classList.remove('active');
                          document.getElementById('phase-auth').classList.remove('active');

                          document.getElementById('fullscreen-bg').classList.add('revealed');
                          document.getElementById('holo-rings').style.opacity = '1';

                          var phaseReveal = document.getElementById('phase-reveal');
                          phaseReveal.classList.add('active');

                          setTimeout(function () {
                            document.getElementById('cta-container').classList.add('shown');
                          }, 250);
                        }, 500);

                      }, 2200);
                    }, 300);
                  });
                }, 400);

              });
            }, 300);
          });
        }, 300);
      });
    }, 200);
  })();

  /* ── 3. FASE 4: EXIT ANIMATION KE INDEX.HTML ── */
  window.exitIntro = function () {
    /* Play blast sound sebelum exit */
    _playCosmicBlast();

    setTimeout(function () {
      var overlay = document.getElementById('intro-overlay');
      overlay.classList.add('exit-slide');

      /* Tandai sesi agar tidak mengulang intro */
      sessionStorage.setItem('intro_done', '1');
      /* Flag: user baru saja enter → index.html akan play entry sound */
      sessionStorage.setItem('just_entered', '1');

      overlay.addEventListener('animationend', function () {
        window.location.href = 'index.html';
      }, { once: true });
    }, 180);
  };

  /* ── 4. KEYBOARD Enter / Space / Escape ── */
  document.addEventListener('keydown', function (e) {
    var cta = document.getElementById('cta-container');
    if (cta && cta.classList.contains('shown')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        exitIntro();
      }
    }
    if (e.key === 'Escape') exitIntro();
  });

  /* ── 5. AUDIO (menggunakan AudioEngine) ── */

  /* Buat AudioContext intro sendiri agar terpisah dari index */
  var introCtx    = null;
  var introGain   = null;
  var introMuted  = false;
  var introReady  = false;
  var ambientOsc  = null;
  var ambientGain = null;

  function _initIntroAudio() {
    if (introReady) return;
    try {
      introCtx = new (window.AudioContext || window.webkitAudioContext)();
      introGain = introCtx.createGain();
      introGain.gain.value = 0.5;
      introGain.connect(introCtx.destination);
      introReady = true;
    } catch (e) {}
  }

  function _createReverb(duration, decay) {
    if (!introCtx) return null;
    var len     = introCtx.sampleRate * duration;
    var impulse = introCtx.createBuffer(2, len, introCtx.sampleRate);
    for (var c = 0; c < 2; c++) {
      var ch = impulse.getChannelData(c);
      for (var i = 0; i < len; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    var conv = introCtx.createConvolver();
    conv.buffer = impulse;
    return conv;
  }

  function _playTerminalBlip() {
    if (!introReady || introMuted) return;
    var osc  = introCtx.createOscillator();
    var gain = introCtx.createGain();
    osc.connect(gain); gain.connect(introGain);
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, introCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, introCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, introCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, introCtx.currentTime + 0.06);
    osc.start(); osc.stop(introCtx.currentTime + 0.06);
  }

  function _playEnergyPulse() {
    if (!introReady || introMuted) return;
    var now = introCtx.currentTime;
    var osc = introCtx.createOscillator();
    var gain = introCtx.createGain();
    var filter = introCtx.createBiquadFilter();
    filter.type = 'bandpass'; filter.frequency.value = 300; filter.Q.value = 2;
    osc.connect(filter); filter.connect(gain); gain.connect(introGain);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.start(now); osc.stop(now + 0.85);
    var osc2 = introCtx.createOscillator();
    var gain2 = introCtx.createGain();
    osc2.connect(gain2); gain2.connect(introGain);
    osc2.type = 'sine'; osc2.frequency.value = 2400;
    gain2.gain.setValueAtTime(0, now + 0.1);
    gain2.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc2.start(now + 0.1); osc2.stop(now + 0.75);
  }

  function _playCosmicReveal() {
    if (!introReady || introMuted) return;
    var now    = introCtx.currentTime;
    var reverb = _createReverb(2, 3);
    var bufferSize  = introCtx.sampleRate * 0.8;
    var noiseBuffer = introCtx.createBuffer(1, bufferSize, introCtx.sampleRate);
    var data = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    var noiseSource = introCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    var noiseFilter = introCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass'; noiseFilter.frequency.value = 800; noiseFilter.Q.value = 0.5;
    var noiseGain = introCtx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.45, now + 0.15);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(3000, now + 0.5);
    noiseSource.connect(noiseFilter);
    if (reverb) { noiseFilter.connect(reverb); reverb.connect(noiseGain); }
    else noiseFilter.connect(noiseGain);
    noiseGain.connect(introGain);
    noiseSource.start(now);
    [80, 120, 160, 240].forEach(function (freq, i) {
      var osc = introCtx.createOscillator();
      var g   = introCtx.createGain();
      osc.connect(g);
      if (reverb) { g.connect(reverb); reverb.connect(introGain); }
      else g.connect(introGain);
      osc.type = 'sine'; osc.frequency.value = freq;
      g.gain.setValueAtTime(0, now + i * 0.04);
      g.gain.linearRampToValueAtTime(0.2 - i * 0.03, now + i * 0.04 + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc.start(now + i * 0.04); osc.stop(now + 1.6);
    });
  }

  function _playCyberHover() {
    if (!introReady || introMuted) return;
    var now = introCtx.currentTime;
    var osc  = introCtx.createOscillator();
    var gain = introCtx.createGain();
    osc.connect(gain); gain.connect(introGain);
    osc.type = 'sine'; osc.frequency.value = 1200;
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.04);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.start(now); osc.stop(now + 0.06);
  }

  function _playCosmicBlast() {
    if (!introReady || introMuted) return;
    var now = introCtx.currentTime;
    [440, 660, 880, 1320].forEach(function (freq, i) {
      var osc  = introCtx.createOscillator();
      var gain = introCtx.createGain();
      osc.connect(gain); gain.connect(introGain);
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.03);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + i * 0.03 + 0.3);
      gain.gain.setValueAtTime(0.25, now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.35);
      osc.start(now + i * 0.03); osc.stop(now + i * 0.03 + 0.4);
    });
  }

  function _startAmbientHum() {
    if (!introReady || introMuted || ambientOsc) return;
    ambientOsc  = introCtx.createOscillator();
    var osc2 = introCtx.createOscillator();
    ambientGain  = introCtx.createGain();
    var filter = introCtx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 200;
    ambientOsc.type = 'sine'; ambientOsc.frequency.value = 40;
    osc2.type = 'sine'; osc2.frequency.value = 60;
    ambientOsc.connect(filter); osc2.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(introGain);
    ambientGain.gain.setValueAtTime(0, introCtx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.07, introCtx.currentTime + 2);
    ambientOsc.start(); osc2.start();
  }

  /* Mute toggle */
  var muteBtn = document.getElementById('audio-mute-btn');
  if (muteBtn) {
    muteBtn.addEventListener('click', function () {
      _initIntroAudio();
      introMuted = !introMuted;
      if (introGain) introGain.gain.value = introMuted ? 0 : 0.5;
      muteBtn.textContent = introMuted ? '🔇 SFX' : '🔊 SFX';
      muteBtn.style.color  = introMuted ? 'rgba(0,245,255,0.35)' : 'rgba(0,245,255,0.8)';
    });
  }

  /* Unlock audio on first interaction */
  function _unlockIntroAudio() {
    _initIntroAudio();
    document.removeEventListener('click',      _unlockIntroAudio);
    document.removeEventListener('keydown',    _unlockIntroAudio);
    document.removeEventListener('touchstart', _unlockIntroAudio);
    setTimeout(_startAmbientHum, 500);
  }
  document.addEventListener('click',      _unlockIntroAudio);
  document.addEventListener('keydown',    _unlockIntroAudio);
  document.addEventListener('touchstart', _unlockIntroAudio);

  /* Hook enter button hover */
  var enterBtnEl = document.getElementById('enter-btn');
  if (enterBtnEl) {
    enterBtnEl.addEventListener('mouseenter', _playCyberHover);
    enterBtnEl.addEventListener('touchstart',  _playCyberHover);
  }

  /* MutationObserver: hook phase sounds */
  var phaseAuth    = document.getElementById('phase-auth');
  var fullscreenBg = document.getElementById('fullscreen-bg');

  if (phaseAuth && fullscreenBg) {
    var phaseObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.target === phaseAuth && phaseAuth.classList.contains('active')) {
          setTimeout(_playEnergyPulse, 100);
        }
        if (m.target === fullscreenBg && fullscreenBg.classList.contains('revealed')) {
          setTimeout(_playCosmicReveal, 200);
        }
      });
    });
    phaseObserver.observe(phaseAuth,    { attributes: true, attributeFilter: ['class'] });
    phaseObserver.observe(fullscreenBg, { attributes: true, attributeFilter: ['class'] });
  }

})();
