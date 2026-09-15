import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Monitor, 
  BookOpen, 
  Terminal, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Send, 
  Clock
} from 'lucide-react';
import { sound } from '../../utils/soundSynth';

export default function TeleporterDock({ activeZone, setActiveZone, onOpenContact, soundEnabled, setSoundEnabled }) {
  const [lagosTime, setLagosTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Africa/Lagos', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setLagosTime(now.toLocaleTimeString('en-GB', options) + ' WAT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { id: 'hub', label: 'WORLD HUB', shortLabel: 'HUB', icon: Compass, color: 'text-emerald-400' },
    { id: 'os', label: 'THE OS', shortLabel: 'OS', icon: Monitor, color: 'text-emerald-400' },
    { id: 'zine', label: 'THE ZINE', shortLabel: 'ZINE', icon: BookOpen, color: 'text-orange-400' },
    { id: 'terminal', label: 'THE TERMINAL', shortLabel: 'TERMINAL', icon: Terminal, color: 'text-cyan-400' },
    { id: 'void', label: 'THE VOID', shortLabel: 'VOID', icon: Sparkles, color: 'text-purple-400' },
  ];

  const handleZoneClick = (zoneId) => {
    sound.playTeleport();
    setActiveZone(zoneId);
  };

  const handleAudioToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sound.toggleSound(newState);
    if (newState) sound.playClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#09090d]/95 backdrop-blur-xl border-b border-white/10 px-2.5 sm:px-6 py-2 flex items-center justify-between gap-1.5 sm:gap-3 shadow-2xl shadow-black/80 font-mono text-xs select-none">
      {/* Left: Node Telemetry & Lagos Time */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold tracking-wider hidden sm:inline">TOMMY // LAGOS</span>
          <span className="text-emerald-400 font-bold tracking-wider sm:hidden">TOMMY</span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400 text-[11px]">
          <Clock className="w-3 h-3 text-zinc-500" />
          <span>{lagosTime || 'LAGOS WAT'}</span>
        </div>
      </div>

      {/* Center: Tactical Zone Switcher */}
      <nav 
        aria-label="Zone Navigation"
        className="flex items-center gap-0.5 sm:gap-1 bg-black/60 p-0.5 sm:p-1 rounded-xl border border-white/15 shadow-inner overflow-x-auto max-w-[58vw] sm:max-w-none scrollbar-none"
      >
        {zones.map((zone) => {
          const Icon = zone.icon;
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              onMouseEnter={() => sound.playKeypress()}
              title={zone.label}
              className={`relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-200 text-xs font-mono font-medium shrink-0 ${
                isActive 
                  ? 'bg-white/15 text-white border border-white/20 shadow-sm' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? zone.color : 'text-zinc-400'}`} />
              <span className="hidden lg:inline">{zone.label}</span>
              <span className="hidden md:inline lg:hidden text-[11px]">{zone.shortLabel}</span>
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ff88]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Audio Toggle & Connect Button */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Sound Toggle */}
        <button
          onClick={handleAudioToggle}
          className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg border transition-all text-xs font-mono flex items-center gap-1.5 ${
            soundEnabled 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(0,255,136,0.15)]' 
              : 'bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-300'
          }`}
          title={soundEnabled ? 'Mute Procedural Audio' : 'Enable Procedural Audio'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline text-[11px]">{soundEnabled ? 'FX' : 'MUTED'}</span>
        </button>

        {/* Connect Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenContact();
          }}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500/20 to-purple-500/20 hover:from-emerald-500/30 hover:to-purple-500/30 border border-white/20 text-xs font-mono text-zinc-100 hover:text-white transition-all shadow-md group"
        >
          <Send className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          <span className="font-semibold text-[10px] sm:text-[11px]">CONNECT</span>
        </button>
      </div>
    </header>
  );
}

