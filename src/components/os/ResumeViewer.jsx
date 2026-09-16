import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  MapPin, 
  ShieldCheck, 
  Code2, 
  Share2, 
  Zap, 
  Check 
} from 'lucide-react';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';

export default function ResumeViewer({ onOpenContact }) {
  const [viewMode, setViewMode] = useState('ats'); // 'ats' | 'cyber'
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a10] text-slate-100 font-mono select-none overflow-y-auto">
      {/* Top Toolbar (Hidden when printing) */}
      <div className="print:hidden bg-[#12121c] border-b border-white/10 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>ADEJUWON_AKINTOMIDE_RESUME.PDF</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                VERIFIED
              </span>
            </h2>
            <p className="text-[10px] text-zinc-400">
              19 y/o QA Engineer &amp; Frontend Architect • Lagos, Nigeria
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-black/50 p-0.5 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('ats');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                viewMode === 'ats'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              CLEAN ATS
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('cyber');
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                viewMode === 'cyber'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              CYBER HUD
            </button>
          </div>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs flex items-center gap-1.5 transition-colors"
            title="Copy Portfolio URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">{copied ? 'COPIED' : 'SHARE'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / SAVE PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Canvas */}
      <div className="flex-1 p-3 sm:p-8 flex justify-center">
        {/* VIEW 1: CLEAN ATS PRINTABLE RESUME (Standard corporate / ATS friendly) */}
        {viewMode === 'ats' ? (
          <div 
            id="ats-resume-document"
            className="w-full max-w-4xl bg-white text-zinc-900 rounded-xl shadow-2xl p-6 sm:p-12 font-sans selection:bg-zinc-300 selection:text-black print:p-0 print:shadow-none print:m-0 print:w-full print:max-w-none"
          >
            {/* ATS Header */}
            <header className="border-b-2 border-zinc-800 pb-5 mb-6">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 uppercase tracking-tight">
                {tommyData.profile.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-800 mt-1 uppercase tracking-wide">
                QA Engineer &amp; Front-End Developer // Web Resilience Architect
              </p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-600 font-mono mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-800" />
                  {tommyData.profile.location} ({tommyData.profile.timezone})
                </span>
                <span>•</span>
                <a href={`mailto:${tommyData.profile.socials.email}`} className="text-zinc-900 font-bold hover:underline">
                  {tommyData.profile.socials.email}
                </a>
                <span>•</span>
                <a href={tommyData.profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-900 font-bold hover:underline">
                  LinkedIn
                </a>
                <span>•</span>
                <a href={tommyData.profile.socials.twitter} target="_blank" rel="noreferrer" className="text-zinc-900 font-bold hover:underline">
                  {tommyData.profile.handle}
                </a>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-700 border-b border-zinc-300 pb-1 mb-2 font-mono">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                19-year-old QA Engineer and front-end developer based in Lagos, Nigeria with specialized expertise in automated end-to-end regression testing, client-side resilience under unstable broadband networks, and high-performance React 19/TypeScript architecture. Proven track record triaging over 840+ real-world defects, maintaining 98%+ automated test coverage, and designing mission-critical web applications that degrade gracefully under extreme latency.
              </p>
            </section>

            {/* Core Competencies Matrix */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-700 border-b border-zinc-300 pb-1 mb-2 font-mono">
                CORE TECHNICAL COMPETENCIES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-bold text-zinc-950">QA &amp; Automated Testing:</span>
                  <p className="text-zinc-700 mt-0.5">
                    Playwright, Cypress, Jest, Vitest, k6 API Load Testing, Postman, Chaos Injection, Visual Regression Diffing, WCAG 2.1 AAA Accessibility Auditing.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Frontend Engineering:</span>
                  <p className="text-zinc-700 mt-0.5">
                    React 19, TypeScript, JavaScript (ESNext), Next.js, Tailwind CSS, HTML5/CSS3, State Management (Zustand, Redux), Framer Motion, Web Audio API.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">DevOps &amp; Quality Gates:</span>
                  <p className="text-zinc-700 mt-0.5">
                    GitHub Actions CI/CD, Docker Containerization, Flaky Test Sentinel Pipelines, Vercel, Git Version Control.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-zinc-950">Performance &amp; Diagnostics:</span>
                  <p className="text-zinc-700 mt-0.5">
                    Lighthouse 99+ Auditing, Chrome DevTools Memory Profiling, Network Throttling Simulation, Offline IndexedDB Caching.
                  </p>
                </div>
              </div>
            </section>

            {/* Featured Projects & Engineering Accomplishments */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-700 border-b border-zinc-300 pb-1 mb-3 font-mono">
                ENGINEERING PROJECTS &amp; CASE STUDIES
              </h2>

              <div className="space-y-4 text-xs">
                {tommyData.projects.map((proj) => (
                  <div key={proj.id} className="border-l-2 border-emerald-700 pl-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-bold text-sm text-zinc-950">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-[11px] font-semibold text-emerald-800">
                        {proj.role} • {proj.metrics}
                      </span>
                    </div>
                    <p className="text-zinc-700 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                    <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-zinc-600">
                      {proj.features.map((feat, fIdx) => (
                        <li key={fIdx}>{feat}</li>
                      ))}
                    </ul>
                    <div className="mt-1 font-mono text-[10px] text-zinc-500">
                      Stack: {proj.stack.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Verified Performance Metrics */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-700 border-b border-zinc-300 pb-1 mb-2 font-mono">
                VERIFIED PERFORMANCE METRICS
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {tommyData.profile.stats.map((stat, idx) => (
                  <div key={idx} className="p-2 bg-zinc-100 rounded border border-zinc-200">
                    <div className="text-base font-black text-zinc-900">{stat.value}</div>
                    <div className="text-[10px] text-zinc-600 font-medium uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Philosophy & Work Authorization */}
            <footer className="border-t border-zinc-300 pt-3 text-[11px] text-zinc-500 font-mono flex flex-wrap justify-between items-center gap-2">
              <span>LOCATION: LAGOS, NIGERIA (OPEN TO GLOBAL REMOTE ROLES)</span>
              <span>WAT (GMT+1) • AVAILABLE IMMEDIATELY</span>
            </footer>
          </div>
        ) : (
          /* VIEW 2: CYBER HUD MODE (Neon Cyberpunk Interactive View) */
          <div className="w-full max-w-4xl space-y-6">
            {/* Cyber Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#11111a] border border-emerald-500/30 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>STATUS: READY FOR PRODUCTION DEPLOYMENT</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                    {tommyData.profile.name}
                  </h1>
                  <p className="text-sm text-zinc-400 font-mono mt-1">
                    // {tommyData.profile.role} • {tommyData.profile.location}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Printer className="w-4 h-4" />
                    <span>EXPORT PDF</span>
                  </button>
                </div>
              </div>

              {/* Stat HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {tommyData.profile.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                    <div className="text-xl font-black text-emerald-400">{stat.value}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Radar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#11111a] border border-white/10">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-4 tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>QA &amp; Automated Testing Matrix</span>
                </div>
                <div className="space-y-3">
                  {tommyData.skills.qaAndTesting.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-emerald-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#11111a] border border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase mb-4 tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>Frontend Architecture &amp; Infra</span>
                </div>
                <div className="space-y-3">
                  {tommyData.skills.frontendEngineering.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Quick Connect Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-orange-500/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h3 className="text-base font-bold text-white">READY TO RECRUIT OR COLLABORATE?</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Let’s discuss how I can harden your test pipelines or craft resilient user experiences.</p>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenContact) onOpenContact();
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg shrink-0"
              >
                DIRECT TRANSMISSION
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
