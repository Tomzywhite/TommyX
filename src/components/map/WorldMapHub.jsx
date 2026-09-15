import React, { useState } from 'react';
import { 
  Monitor, 
  BookOpen, 
  Terminal, 
  Sparkles, 
  ArrowUpRight, 
  Activity, 
  Compass, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Globe,
  Flame
} from 'lucide-react';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';

export default function WorldMapHub({ onSelectZone }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  const zones = [
    {
      id: 'os',
      number: '01',
      title: 'THE OS',
      tagline: 'Cyber-Desktop Environment',
      description: 'Draggable desktop windows, projects file explorer, procedural lo-fi player, and live QA telemetry runner.',
      accent: '#00ff88',
      accentClass: 'border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 shadow-[0_0_20px_rgba(0,255,136,0.15)]',
      glowBg: 'group-hover:bg-emerald-500/10',
      icon: Monitor,
      tags: ['DRAGGABLE WINDOWS', 'PROJECTS', 'LO-FI PLAYER', 'QA DASHBOARD']
    },
    {
      id: 'zine',
      number: '02',
      title: 'THE ZINE',
      tagline: 'Raw Editorial & Lagos Energy',
      description: 'Magazine meets street graffiti. Uncompromising essays on testing philosophy, 300ms ping frontends, and creative destruction.',
      accent: '#f97316',
      accentClass: 'border-orange-500/40 text-orange-400 group-hover:border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)]',
      glowBg: 'group-hover:bg-orange-500/10',
      icon: BookOpen,
      tags: ['EDITORIAL ESSAYS', 'LAGOS TECH', 'BRUTALIST', 'STICKERS']
    },
    {
      id: 'terminal',
      number: '03',
      title: 'THE TERMINAL',
      tagline: 'Hacker CLI & Neural Shell',
      description: 'Type commands to inspect Tommy’s brain, trigger hidden easter eggs, run simulated test suites, or inspect system logs.',
      accent: '#06b6d4',
      accentClass: 'border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      glowBg: 'group-hover:bg-cyan-500/10',
      icon: Terminal,
      tags: ['BASH REPL', 'EASTER EGGS', 'CRT SCANLINES', 'TAB COMPLETE']
    },
    {
      id: 'void',
      number: '04',
      title: 'THE VOID',
      tagline: 'Deep Solitude & 02:00 AM Thoughts',
      description: 'Dark, atmospheric particle space. Midnight rides on Third Mainland Bridge, raw iron discipline, and late-night philosophy.',
      accent: '#7c3aed',
      accentClass: 'border-purple-500/40 text-purple-400 group-hover:border-purple-400 shadow-[0_0_20px_rgba(124,58,237,0.2)]',
      glowBg: 'group-hover:bg-purple-500/10',
      icon: Sparkles,
      tags: ['INTERACTIVE PARTICLES', 'MOTORCYCLES', 'FITNESS', 'AMBIENT DRONE']
    }
  ];

  const handleZoneEnter = (zoneId) => {
    sound.playTeleport();
    onSelectZone(zoneId);
  };

  return (
    <div className="min-h-screen relative bg-[#0a0a0a] text-slate-100 flex flex-col justify-between pt-16 sm:pt-20 pb-16 sm:pb-24 px-3 sm:px-6 md:px-12 overflow-hidden select-none">
      {/* Background Cyber Grid & Ambient Orbs */}
      <div className="absolute inset-0 radar-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* World Map Tactical Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mb-6 sm:mb-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-emerald-400 mb-2 sm:mb-3">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SECTOR GRID ACTIVE // STATUS: OPERATIONAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-syne font-black tracking-tight text-white uppercase">
              Tommy&apos;s World
            </h1>
            <p className="text-zinc-400 text-xs sm:text-base font-sans mt-1 sm:mt-2 max-w-xl">
              Adejuwon Akintomide Samuel — 19 y/o QA Engineer &amp; Front-End Developer.
              Navigating between Lagos real-world constraints and global software frontiers.
            </p>
          </div>

          {/* Quick HUD Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2 sm:gap-3 font-mono text-xs text-zinc-300 w-full md:w-auto">
            <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 rounded-xl text-left">
              <span className="text-zinc-500 block text-[10px]">ORIGIN</span>
              <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                LAGOS, NG
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 rounded-xl text-left">
              <span className="text-zinc-500 block text-[10px]">CORE SPEC</span>
              <span className="text-orange-400 font-bold text-xs sm:text-sm">QA &amp; FRONTEND</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 rounded-xl text-left">
              <span className="text-zinc-500 block text-[10px]">TEST RIGOR</span>
              <span className="text-purple-400 font-bold text-xs sm:text-sm">98.4% COVERAGE</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 sm:p-3 rounded-xl text-left">
              <span className="text-zinc-500 block text-[10px]">PHILOSOPHY</span>
              <span className="text-cyan-400 font-bold text-xs sm:text-sm">CHAOS-TESTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Zone Portals */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-auto">
        {zones.map((zone) => {
          const Icon = zone.icon;
          return (
            <div
              key={zone.id}
              onClick={() => handleZoneEnter(zone.id)}
              onMouseEnter={() => {
                setHoveredZone(zone.id);
                sound.playKeypress();
              }}
              onMouseLeave={() => setHoveredZone(null)}
              className={`group relative p-5 sm:p-8 rounded-2xl bg-[#0d0d14]/90 backdrop-blur-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[210px] sm:min-h-[250px] ${zone.accentClass} ${zone.glowBg} hover:-translate-y-1 hover:shadow-2xl`}
            >

              {/* Top Row: Zone Identifier & Icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/10 font-bold tracking-widest text-zinc-300">
                      ZONE {zone.number}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 hidden sm:inline">
                      // {zone.tagline}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-transform">
                    <Icon className="w-5 h-5" style={{ color: zone.accent }} />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-syne font-black text-white tracking-wide mb-2 group-hover:text-white transition-colors">
                  {zone.title}
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                  {zone.description}
                </p>
              </div>

              {/* Bottom Tags & Warp Action */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {zone.tags.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-mono font-bold tracking-wider group-hover:translate-x-1 transition-transform" style={{ color: zone.accent }}>
                  <span>ACCESS ZONE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Glowing Corner Accent */}
              <div 
                className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: zone.accent }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>LAGOS GRID RADAR // WAT (UTC+1)</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-[11px] sm:text-xs">
          <a
            href={tommyData.profile.socials.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            X: @Tommy_MetaX
          </a>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <a
            href={tommyData.profile.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            IG: @Tommy_MetaX
          </a>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <a
            href={tommyData.profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            LINKEDIN
          </a>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <a
            href={`mailto:${tommyData.profile.socials.email}`}
            className="hover:text-emerald-400 transition-colors text-emerald-400"
          >
            {tommyData.profile.socials.email}
          </a>
        </div>
      </div>
    </div>
  );
}
