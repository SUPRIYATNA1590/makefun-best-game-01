// Sound without sound files: every effect is an oscillator or a burst of filtered
// noise from the Web Audio API, built once and reused. The context only starts on a
// user gesture, because browsers refuse to start one before the first click, so the
// first thing the play button does is unlock it.
export function createAudio() {
  let context = null;
  let master = null;
  let noiseBuffer = null;
  let muted = false;

  // Build the context on first use (and wake it if the browser put it to sleep).
  // False when the browser has no Web Audio at all; the game plays on silently.
  function ensure() {
    if (context) {
      if (context.state === 'suspended') context.resume();
      return true;
    }
    try {
      context = new (window.AudioContext || window.webkitAudioContext)();
      master = context.createGain();
      master.gain.value = 0.5;
      master.connect(context.destination);
      noiseBuffer = context.createBuffer(1, context.sampleRate * 0.5, context.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
      return true;
    } catch {
      return false;
    }
  }

  // A burst of white noise through a low-pass filter, fading out exponentially.
  function noise(duration, filterFreq, gainValue, when = 0) {
    if (!ensure() || muted) return;
    const start = context.currentTime + when;
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    const gain = context.createGain();
    gain.gain.setValueAtTime(gainValue, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    source.connect(filter).connect(gain).connect(master);
    source.start(start);
    source.stop(start + duration);
  }

  // A single oscillator, optionally sliding down to another pitch as it fades.
  function tone(freq, duration, type, gainValue, slideTo = null, when = 0) {
    if (!ensure() || muted) return;
    const start = context.currentTime + when;
    const osc = context.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, start + duration);
    const gain = context.createGain();
    gain.gain.setValueAtTime(gainValue, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(gain).connect(master);
    osc.start(start);
    osc.stop(start + duration);
  }

  // Distant shots are quieter, never silent: a floor of 0.05 keeps them audible.
  function volumeFor(distance) {
    return Math.max(0.05, 1 - distance / 60);
  }

  return {
    unlock() {
      ensure();
    },
    toggleMute() {
      muted = !muted;
      return muted;
    },
    shot(weaponId, distance = 0) {
      const volume = volumeFor(distance) * 0.5;
      if (weaponId === 'sniper') {
        noise(0.28, 900, volume);
        tone(120, 0.2, 'sine', volume * 0.8, 40);
      } else if (weaponId === 'pistol') {
        noise(0.12, 1800, volume * 0.8);
        tone(220, 0.08, 'square', volume * 0.25, 90);
      } else {
        noise(0.14, 1400, volume);
        tone(160, 0.1, 'sawtooth', volume * 0.3, 60);
      }
    },
    enemyShot(distance) {
      noise(0.12, 1200, volumeFor(distance) * 0.35);
    },
    dryFire() {
      tone(1400, 0.03, 'square', 0.12);
    },
    reload() {
      tone(500, 0.04, 'square', 0.15);
      tone(700, 0.04, 'square', 0.15, null, 0.35);
    },
    hit() {
      tone(2400, 0.05, 'sine', 0.2);
    },
    kill() {
      tone(1200, 0.07, 'sine', 0.25);
      tone(1800, 0.09, 'sine', 0.25, null, 0.07);
    },
    hurt() {
      tone(90, 0.18, 'sine', 0.5, 50);
      noise(0.1, 400, 0.25);
    },
    footstep() {
      noise(0.05, 500, 0.06);
    },
    plantBeep() {
      tone(1100, 0.08, 'square', 0.18);
    },
    spikeBeep() {
      tone(1500, 0.06, 'square', 0.12);
    },
    explosion() {
      noise(0.9, 300, 0.9);
      tone(70, 0.8, 'sine', 0.8, 28);
    },
    roundWin() {
      tone(523, 0.14, 'triangle', 0.25);
      tone(659, 0.14, 'triangle', 0.25, null, 0.14);
      tone(784, 0.28, 'triangle', 0.3, null, 0.28);
    },
    roundLose() {
      tone(392, 0.16, 'triangle', 0.25);
      tone(330, 0.16, 'triangle', 0.25, null, 0.16);
      tone(262, 0.34, 'triangle', 0.28, null, 0.32);
    },
    buy() {
      tone(900, 0.06, 'sine', 0.2);
      tone(1350, 0.08, 'sine', 0.2, null, 0.06);
    },
    denied() {
      tone(180, 0.12, 'square', 0.15);
    },
  };
}
