import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, ArrowRight, Play } from 'lucide-react';
import { sound } from '../../utils/soundSynth';

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0); 
  // Phase 0: System Boot
  // Phase 1: Identity Decryption
  // Phase 2: Glitch "Welcome to Tommy's World"
  // Phase 3: Dissolve

  const [typedText, setTypedText] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);

  const fullWelcome = "Welcome to Tommy's World";

  useEffect(() => {
    // Initial sound effect
    const timer1 = setTimeout(() => {
      sound.playGlitch();
      setPhase(1);
    }, 900);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      const timer2 = setTimeout(() => {
        sound.playGlitch();
        setPhase(2);
      }, 1600);
      return () => clearTimeout(timer2);
    }
  }, [phase]);

  // Typewriter effect for "Welcome to Tommy's World"
  useEffect(() => {
    if (phase === 2) {
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < fullWelcome.length) {
          setTypedText(fullWelcome.slice(0, currentIdx + 1));
          sound.playKeypress();
          currentIdx++;
        } else {
          clearInterval(interval);
          setGlitchActive(true);
          sound.playGlitch();
          
          // Auto dissolve after brief pause
          const dissolveTimer = setTimeout(() => {
            sound.playTeleport();
            setPhase(3);
            setTimeout(() => {
              onComplete();
            }, 800);
          }, 1800);

          return () => clearTimeout(dissolveTimer);
        }
      }, 70);

      return () => clearInterval(interval);
    }
  }, [phase, onComplete]);

  const handleSkip = () => {
    sound.playTeleport();
    setPhase(3);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] transition-all duration-700 select-none ${
        phase === 3 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* CRT Scanline & Radar Grid */}
      <div className="absolute inset-0 crt-overlay" />
      <div className="absolute inset-0 radar-grid opacity-30" />

      {/* Cyber Noise Accents */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-zinc-500 tracking-widest">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="hidden sm:inline">SYS_INIT // SECURE_SOCKET: 6.5244N_3.3792E</span>
        <span className="sm:hidden">LAGOS NODE</span>
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 font-mono text-[10px] sm:text-[11px] text-zinc-500">
        <button 
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all group"
        >
          <span>SKIP</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Terminal Box */}
      <div className="relative z-10 max-w-2xl w-full mx-4 px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center">
        
        {/* Step Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] sm:text-xs mb-6 sm:mb-8 shadow-[0_0_15px_rgba(0,255,136,0.15)]">
          <Terminal className="w-3.5 h-3.5" />
          <span>PORT 443 — LAGOS MAINFRAME</span>
        </div>

        {/* Phase 0 & 1: Technical Handshake */}
        <div className="font-mono text-xs md:text-sm text-zinc-400 space-y-2 mb-6 sm:mb-8 min-h-[50px]">
          {phase >= 0 && (
            <div className="text-zinc-500 tracking-wide animate-pulse text-[11px] sm:text-xs">
              &gt; CONNECTING TO ADEJUWON AKINTOMIDE SAMUEL [QA &amp; FRONTEND ARCHITECT]...
            </div>
          )}
          {phase >= 1 && (
            <div className="text-emerald-400 font-semibold tracking-wider text-xs sm:text-sm">
              &gt; HANDSHAKE VERIFIED: 19 Y/O QA ASSASSIN // ZERO FLAKY TOLERANCE
            </div>
          )}
        </div>

        {/* Phase 2: Giant Glitch Headline */}
        <div className="relative my-2 sm:my-4 min-h-[70px] sm:min-h-[80px] flex items-center justify-center">
          <h1 
            className={`text-3xl sm:text-5xl md:text-7xl font-syne font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-purple-400 break-words ${
              glitchActive ? 'animate-glitch' : ''
            }`}
            style={{
              textShadow: glitchActive 
                ? '-3px 0 #00ff88, 3px 0 #7c3aed, 0 0 30px rgba(0,255,136,0.5)' 
                : '0 0 25px rgba(255,255,255,0.2)'
            }}
          >
            {typedText}
            {phase === 2 && typedText.length < fullWelcome.length && (
              <span className="inline-block w-2 sm:w-3 h-8 sm:h-12 md:h-14 bg-emerald-400 ml-1.5 animate-pulse align-middle" />
            )}
          </h1>
        </div>


        {/* Subtitle / Telemetry */}
        <p className="text-zinc-400 font-sans text-sm md:text-base max-w-md mx-auto mt-4 leading-relaxed">
          Four distinct sectors. One uncompromising perspective. Explore the code, the chaos, the machine, and the void.
        </p>

        {/* Enter Button */}
        <div className="mt-10">
          <button
            onClick={handleSkip}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black font-syne font-extrabold text-sm tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(0,255,136,0.35)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>ENTER THE SECTORS</span>
          </button>
        </div>

        {/* Bottom Coordinates & Tag */}
        <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-6 font-mono text-[10px] text-zinc-600">
          <span>LAT 6.5244° N</span>
          <span>LON 3.3792° E</span>
          <span>EKO / LAGOS</span>
        </div>
      </div>
    </div>
  );
}
