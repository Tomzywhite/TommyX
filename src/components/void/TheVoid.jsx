import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Volume2, VolumeX, X, CircleDot } from 'lucide-react';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';

export default function TheVoid() {
  const [activeThought, setActiveThought] = useState(null);
  const [dronePlaying, setDronePlaying] = useState(false);
  const canvasRef = useRef(null);

  // Toggle ambient drone audio
  const handleToggleDrone = () => {
    sound.playClick();
    if (dronePlaying) {
      sound.stopDrone();
      setDronePlaying(false);
    } else {
      sound.startDrone();
      setDronePlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      sound.stopDrone();
    };
  }, []);

  // Canvas interactive particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle settings
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 18));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.7 + 0.2
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Interaction with mouse / touch
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          p1.x -= dxMouse * 0.02;
          p1.y -= dyMouse * 0.02;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 180, 220, ${p1.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(140, 140, 200, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050508] text-slate-100 pt-16 sm:pt-20 pb-16 sm:pb-32 px-3 sm:px-6 md:px-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <Moon className="w-3.5 h-3.5" />
            <span>02:00 AM // DEEP SOLITUDE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight text-white uppercase">
            The Void
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Beyond the noise of production. Speed, iron, and late-night clarity.
          </p>
        </div>

        {/* Ambient Sound Drone Toggle */}
        <button
          onClick={handleToggleDrone}
          className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${
            dronePlaying
              ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          {dronePlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-[11px] sm:text-xs">{dronePlaying ? 'DRONE: ACTIVE' : 'AMBIENT DRONE'}</span>
        </button>
      </div>

      {/* Floating Thought Nodes Grid */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {tommyData.voidThoughts.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              sound.playClick();
              setActiveThought(t);
            }}
            className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] shadow-lg shadow-black/60 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">
                  {t.category}
                </span>
                <span className="text-purple-400 flex items-center gap-1 font-bold">
                  <CircleDot className="w-3 h-3" />
                  {t.time}
                </span>
              </div>
              <h3 className="font-syne font-bold text-white text-lg group-hover:text-purple-300 transition-colors mb-2">
                {t.title}
              </h3>
              <p className="text-xs text-zinc-400 font-sans line-clamp-3 leading-relaxed">
                {t.text}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>{t.coords}</span>
              <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">
                EXPAND NODE &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Thought Modal */}
      {activeThought && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-[#0e0e15] border border-purple-500/40 shadow-2xl shadow-purple-950/40 text-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setActiveThought(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{activeThought.category} • {activeThought.time}</span>
            </div>

            <h2 className="text-2xl font-syne font-bold text-white mb-4">
              {activeThought.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed mb-6">
              {activeThought.text}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>COORDINATES: {activeThought.coords}</span>
              <span className="text-purple-400">MEMORY LOGGED</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Quote */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center pt-6 border-t border-white/5 font-serif italic text-zinc-500 text-xs sm:text-sm">
        &ldquo;In the absolute stillness between midnight and dawn, the machine and the rider become one.&rdquo;
      </div>
    </div>
  );
}
