/* ═══════════════════════════════════════
   shared/audio-engine.js
   Shared Web Audio API base — dipakai intro.html & index.html
   Ekspor global: window.AudioEngine
═══════════════════════════════════════ */
(function () {
  'use strict';

  /* State bersama */
  var audioCtx    = null;
  var masterGain  = null;
  var isMuted     = false;
  var audioReady  = false;

  function initAudio(gainValue) {
    if (audioReady) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = gainValue !== undefined ? gainValue : 0.5;
      masterGain.connect(audioCtx.destination);
      audioReady = true;
    } catch (e) {
      console.warn('Audio not supported');
    }
  }

  function createReverb(duration, decay) {
    if (!audioCtx) return null;
    var len     = audioCtx.sampleRate * duration;
    var impulse = audioCtx.createBuffer(2, len, audioCtx.sampleRate);
    for (var c = 0; c < 2; c++) {
      var ch = impulse.getChannelData(c);
      for (var i = 0; i < len; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    var convolver   = audioCtx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  function setMuted(val) {
    isMuted = val;
    if (masterGain) masterGain.gain.value = isMuted ? 0 : (masterGain._baseGain || 0.5);
  }

  function toggleMute() {
    setMuted(!isMuted);
    return isMuted;
  }

  /* Ekspor */
  window.AudioEngine = {
    init:         initAudio,
    createReverb: createReverb,
    toggleMute:   toggleMute,
    setMuted:     setMuted,
    getCtx:       function () { return audioCtx; },
    getGain:      function () { return masterGain; },
    isReady:      function () { return audioReady; },
    isMuted:      function () { return isMuted; }
  };

})();
