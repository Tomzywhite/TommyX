// Web Audio API procedural sound engine
// Zero external assets, 100% reliable, low-latency, and tactile!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.ambientDrone = null;
    this.droneGain = null;
    this.lofiInterval = null;
    this.isLofiPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(force) {
    if (force !== undefined) {
      this.enabled = force;
    } else {
      this.enabled = !this.enabled;
    }
    if (!this.enabled) {
      this.stopDrone();
      this.stopLofiBeat();
    }
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  }

  playKeypress() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs = [320, 360, 400, 440, 480];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playGlitch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.setValueAtTime(850, now + 0.03);
      osc.frequency.setValueAtTime(220, now + 0.06);
      osc.frequency.setValueAtTime(1100, now + 0.09);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  playTeleport() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.3);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.22);
      });
    } catch (e) {}
  }

  // Atmospheric drone for THE VOID
  startDrone() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ambientDrone) return;

    try {
      const now = this.ctx.currentTime;
      const droneOsc1 = this.ctx.createOscillator();
      const droneOsc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      this.droneGain = this.ctx.createGain();

      droneOsc1.type = 'sawtooth';
      droneOsc1.frequency.setValueAtTime(55, now); // A1 note

      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(82.4, now); // E2 note

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);

      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.08, now + 2.0);

      droneOsc1.connect(filter);
      droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      droneOsc1.start(now);
      droneOsc2.start(now);

      this.ambientDrone = [droneOsc1, droneOsc2];
    } catch (e) {}
  }

  stopDrone() {
    if (!this.ambientDrone || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (this.droneGain) {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      }
      setTimeout(() => {
        if (this.ambientDrone) {
          this.ambientDrone.forEach(osc => {
            try { osc.stop(); } catch(e){}
          });
          this.ambientDrone = null;
        }
      }, 850);
    } catch (e) {
      this.ambientDrone = null;
    }
  }

  // Procedural Lo-Fi / Afrobeat rhythm generator for Music Player
  startLofiBeat(trackType = 'lagos_nights') {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.stopLofiBeat();

    this.isLofiPlaying = true;
    let step = 0;
    const tempoMs = 280; // ~107 BPM chill groove

    const chords = [
      [220, 261.63, 329.63, 392], // Am7
      [174.61, 220, 261.63, 329.63], // Fmaj7
      [261.63, 329.63, 392, 493.88], // Cmaj7
      [196, 246.94, 293.66, 349.23]  // G7
    ];

    this.lofiInterval = setInterval(() => {
      if (!this.enabled || !this.isLofiPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Kick drum on beats 0, 4, 8, 12
      if (step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(130, now);
        kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.09);
        kickGain.gain.setValueAtTime(0.18, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.13);
      }

      // Snare / Rimshot on beats 2, 6, 10, 14
      if (step % 8 === 4) {
        const snareOsc = this.ctx.createOscillator();
        const snareGain = this.ctx.createGain();
        snareOsc.type = 'triangle';
        snareOsc.frequency.setValueAtTime(280, now);
        snareOsc.frequency.exponentialRampToValueAtTime(90, now + 0.08);
        snareGain.gain.setValueAtTime(0.09, now);
        snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        snareOsc.connect(snareGain);
        snareGain.connect(this.ctx.destination);
        snareOsc.start(now);
        snareOsc.stop(now + 0.1);
      }

      // Shaker / Hi-hat every beat with Afrobeat swing syncopation
      if (step % 2 === 0 || step % 4 === 3) {
        const hatOsc = this.ctx.createOscillator();
        const hatGain = this.ctx.createGain();
        hatOsc.type = 'highpass';
        hatOsc.frequency.setValueAtTime(4500, now);
        hatGain.gain.setValueAtTime(0.03, now);
        hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        hatOsc.connect(hatGain);
        hatGain.connect(this.ctx.destination);
        hatOsc.start(now);
        hatOsc.stop(now + 0.045);
      }

      // Soft Rhodes chord every 8 steps
      if (step % 8 === 0) {
        const chordIndex = Math.floor((step / 8) % chords.length);
        const currentChord = chords[chordIndex];
        currentChord.forEach(f => {
          const chordOsc = this.ctx.createOscillator();
          const chordGain = this.ctx.createGain();
          chordOsc.type = 'sine';
          chordOsc.frequency.setValueAtTime(f, now);
          chordGain.gain.setValueAtTime(0.025, now);
          chordGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          chordOsc.connect(chordGain);
          chordGain.connect(this.ctx.destination);
          chordOsc.start(now);
          chordOsc.stop(now + 1.3);
        });
      }

      step = (step + 1) % 32;
    }, tempoMs);
  }

  stopLofiBeat() {
    this.isLofiPlaying = false;
    if (this.lofiInterval) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }
  }
}

export const sound = new SoundEngine();
