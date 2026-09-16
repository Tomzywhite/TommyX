import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Eye } from 'lucide-react';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';

export default function TheTerminal({ onNavigateZone, onOpenContact }) {
  const [inputVal, setInputVal] = useState('');
  const [theme, setTheme] = useState('green'); // green | amber | cyan | matrix
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `TOMMY-SH // KERNEL v4.19.0-eko-amd64 (LAGOS)\nCONNECTED TO: Adejuwon Akintomide Samuel [TOMMY]\nTYPE 'help' FOR LIST OF SYSTEM COMMANDS OR USE QUICK CHIPS BELOW.\n-----------------------------------------------------------------`
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeClasses = {
    green: {
      text: 'text-[#00ff88]',
      border: 'border-[#00ff88]/30',
      caret: 'bg-[#00ff88]',
      accent: '#00ff88'
    },
    amber: {
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      caret: 'bg-amber-400',
      accent: '#f59e0b'
    },
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      caret: 'bg-cyan-400',
      accent: '#06b6d4'
    },
    matrix: {
      text: 'text-emerald-300',
      border: 'border-emerald-500/30',
      caret: 'bg-emerald-300',
      accent: '#10b981'
    }
  };

  const currentTheme = themeClasses[theme] || themeClasses.green;

  const validCommands = [
    'help',
    'whoami',
    'socials',
    'contact',
    'resume',
    'cv',
    'bughunt',
    'game',
    'chaos',
    'photos',
    'faouzia',
    'ls',
    'cat about.txt',
    'open projects',
    'play music',
    'qa-report',
    'lagos',
    'void',
    'zine',
    'os',
    'danfo',
    'jollof',
    'skills',
    'easter-egg',
    'sudo',
    'clear',
    'exit'
  ];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandExecution = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    sound.playKeypress();
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'prompt', text: `tommy@eko-node:~$ ${trimmed}` }];

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      sound.playClick();
      setHistory([]);
      return;
    }

    if (lower === 'help') {
      sound.playClick();
      newHistory.push({
        type: 'output',
        text: `AVAILABLE COMMANDS:
  whoami          - Display operator identity and specifications
  resume / cv     - Inspect and export Tommy's ATS & Cyber Resume
  bughunt / game  - Launch interactive 60s QA Chaos Benchmark
  socials         - Display verified social channels, handles, and email
  contact         - Transmit direct communication packet / open modal
  ls              - List contents of Tommy's virtual file tree
  cat about.txt   - Output detailed biography, origin, and core QA tenets
  open projects   - Inspect compiled repositories and test frameworks
  qa-report       - Run synthetic automated regression suite
  play music      - Initialize Faouzia audio & synth engine
  photos          - Display Tommy's Photo Vault & gallery
  skills          - Render technical proficiency matrix
  lagos           - Telemetry & cultural report from Eko
  danfo           - [EASTER EGG] Summon the indestructible yellow bus
  jollof          - [EASTER EGG] The definitive culinary assertion test
  void            - Teleport directly to Zone 4: THE VOID
  zine            - Teleport directly to Zone 2: THE ZINE
  os              - Teleport directly to Zone 1: THE OS
  easter-egg      - Peek behind the neural curtain
  sudo            - Attempt root administrative override
  clear           - Wipe current terminal output buffer`
      });
    } else if (lower === 'whoami') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `OPERATOR: Adejuwon Akintomide Samuel (Tommy)
HANDLE:   @Tommy_MetaX (Twitter/X & Instagram)
EMAIL:    ${tommyData.profile.socials.email}
LINKEDIN: ${tommyData.profile.socials.linkedin}
AGE:      ${tommyData.profile.age}
ROLE:     QA Engineer & Front-End Developer
NODE:     Lagos, Nigeria (6.5244° N, 3.3792° E)
SPECIALTY: Test Automation, Performance Resilience, Frontend Architecture
STATUS:   Actively hunting race conditions & shipping indestructible code.`
      });
    } else if (lower === 'socials' || lower === 'links' || lower === 'email') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== VERIFIED TRANSMISSION CHANNELS ===
• EMAIL:     ${tommyData.profile.socials.email}
• TWITTER/X: ${tommyData.profile.socials.twitter} (@Tommy_MetaX)
• INSTAGRAM: ${tommyData.profile.socials.instagram} (@Tommy_MetaX)
• LINKEDIN:  ${tommyData.profile.socials.linkedin}
• GITHUB:    ${tommyData.profile.socials.github}

Tip: Type 'contact' or click CONNECT in the header dock to send a direct message.`
      });
    } else if (lower === 'ls') {
      sound.playClick();
      newHistory.push({
        type: 'output',
        text: `drwxr-xr-x  projects/
drwxr-xr-x  photos/
-rw-r--r--  about.txt
-rw-r--r--  faouzia_discography.m3u
-rw-r--r--  qa_assertions.log
-rwxr-xr-x  motorcycle_telemetry.sh
-rw-r--r--  lagos_transit_map.svg
-rw-r--r--  jollof_benchmarks.json`
      });
    } else if (lower === 'cat about.txt') {
      sound.playClick();
      newHistory.push({
        type: 'output',
        text: `${tommyData.profile.name} // "${tommyData.profile.alias}" (@Tommy_MetaX)
${tommyData.profile.bio}

CORE METRICS:
${tommyData.profile.stats.map((s) => `• ${s.label}: ${s.value}`).join('\n')}

VERIFIED CHANNELS:
• Email:     ${tommyData.profile.socials.email}
• Twitter/X: ${tommyData.profile.socials.twitter}
• Instagram: ${tommyData.profile.socials.instagram}
• LinkedIn:  ${tommyData.profile.socials.linkedin}`
      });
    } else if (lower === 'open projects' || lower === 'projects') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== COMPILED REPOSITORIES ===\n` +
          tommyData.projects
            .map(
              (p, idx) =>
                `[${idx + 1}] ${p.title} (${p.category})\n    Metric: ${p.metrics}\n    Stack: ${p.stack.join(', ')}\n    Desc: ${p.description}`
            )
            .join('\n\n')
      });
    } else if (lower === 'qa-report' || lower === 'qa') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== RUNNING CYPRESS & PLAYWRIGHT REGRESSION SENTINEL ===\n` +
          tommyData.qaTestSuite
            .map((t) => `[✔] ${t.id} - ${t.name} (${t.latency}) -> ${t.status}`)
            .join('\n') +
          `\n\nALL 6 CRITICAL SUITES PASSED (0 REGRESSIONS, 0 FLAKES)`
      });
    } else if (lower === 'play music' || lower === 'music' || lower === 'faouzia') {
      sound.playSuccess();
      sound.stopLofiBeat();
      newHistory.push({
        type: 'output',
        text: `[♪] FAOUZIA MUSIC ENGINE READY // ACTIVE: "RIP, Love"
Moroccan-Canadian Vocal Virtuoso & Pop Icon.
Tip: Switch to Zone 1 ('THE OS') -> 'Faouzia_Player' to stream all ${tommyData.musicTracks.length} high-fidelity Faouzia tracks live!`
      });
    } else if (lower === 'photos' || lower === 'gallery') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== TOMMY'S PHOTO VAULT & CAPTURED MOMENTS ===
${tommyData.photoGallery.map(p => `• [${p.tag}] ${p.title} (${p.category}) -> ${p.src}`).join('\n')}

Tip: Place downloaded photos in public/images/ or open THE OS -> Photo_Vault to preview!`
      });
    } else if (lower === 'skills') {
      sound.playClick();
      newHistory.push({
        type: 'output',
        text: `=== QA & AUTOMATION SKILLS ===
${tommyData.skills.qaAndTesting.map((s) => `${s.name.padEnd(38, '.')} [${s.level}%]`).join('\n')}

=== FRONTEND ENGINEERING SKILLS ===
${tommyData.skills.frontendEngineering.map((s) => `${s.name.padEnd(38, '.')} [${s.level}%]`).join('\n')}`
      });
    } else if (lower === 'lagos') {
      sound.playClick();
      newHistory.push({
        type: 'output',
        text: `[LOCATION TELEMETRY]
Coordinates: 6.5244° N, 3.3792° E
Weather: Humid nocturnal breeze, 27°C
Status: Eko never sleeps. Electric yellow Danfo buses weaving through traffic, tech hubs humming in Yaba, and late-night engineers shipping to the world.`
      });
    } else if (lower === 'danfo') {
      sound.playGlitch();
      newHistory.push({
        type: 'output',
        text: `
  ___________________________
 /  _______________________  \\
|  /       DANFO EXPRESS   \\  |
| |  [CMS]  [OST]  [YABA]   | |
| |                         | |
|  \\_______________________/  |
|   O                     O   |
 \\___________________________/
  (O)                     (O)

"Oya enter with your exact change! No 1000 Naira note o!"
The Lagos Danfo: Zero air conditioning, 100% resilience, unyielding forward momentum.`
      });
    } else if (lower === 'jollof') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== JOLLOF VERIFICATION TEST SUITE ===
ASSERTION: nigerian_jollof.smokiness > ghana_jollof.smokiness
RESULT: TRUE (99.999% confidence interval)
STATUS: TEST PASSED. No further debate is permitted by the system compiler.`
      });
    } else if (lower === 'easter-egg') {
      sound.playGlitch();
      newHistory.push({
        type: 'output',
        text: `[EASTER EGG DETECTED]
You uncovered Tommy's hidden secret stash:
1. When he was 17, he found a critical race condition that saved a staging server from an out-of-memory crash.
2. He rode Third Mainland Bridge end-to-end at 2:00 AM on two wheels with a playlist of Nigerian highlife and lo-fi synthwave.
3. Try typing 'danfo', 'jollof', or 'sudo rm -rf /'.`
      });
    } else if (lower.startsWith('sudo')) {
      sound.playGlitch();
      newHistory.push({
        type: 'output',
        text: `PERMISSION DENIED: Operator is only ${tommyData.profile.age} but his neural kernel is heavily protected.
Nice try! Tommy's brain is protected by write-protected memory and Lagos resilience.`
      });
    } else if (lower === 'void') {
      sound.playTeleport();
      onNavigateZone('void');
      return;
    } else if (lower === 'zine') {
      sound.playTeleport();
      onNavigateZone('zine');
      return;
    } else if (lower === 'os') {
      sound.playTeleport();
      onNavigateZone('os');
      return;
    } else if (lower === 'bughunt' || lower === 'game' || lower === 'chaos') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== ENGAGING BUG ASSASSIN PROTOCOL ===
Target: 5 Active Production Exploits (Race conditions, NaN overflows, memory leaks).
Redirecting to THE OS -> Bug_Assassin_Benchmark.exe...`
      });
      setHistory(newHistory);
      setTimeout(() => {
        sound.playTeleport();
        onNavigateZone('os');
      }, 700);
      return;
    } else if (lower === 'resume' || lower === 'cv') {
      sound.playSuccess();
      newHistory.push({
        type: 'output',
        text: `=== ADEJUWON AKINTOMIDE SAMUEL // RESUME SUMMARY ===
• ROLE:     QA Engineer & Front-End Developer
• NODE:     Lagos, Nigeria (WAT GMT+1)
• METRICS:  840+ Bugs Triaged, 98.4% Automated Test Coverage, Lighthouse 99/100
• STACK:    Playwright, Cypress, Jest, Vitest, k6, React 19, TypeScript, Tailwind
• EMAIL:    ${tommyData.profile.socials.email}

Redirecting to THE OS -> Adejuwon_Samuel_Resume.pdf.exe for printable ATS format...`
      });
      setHistory(newHistory);
      setTimeout(() => {
        sound.playTeleport();
        onNavigateZone('os');
      }, 700);
      return;
    } else if (lower === 'contact') {
      sound.playClick();
      onOpenContact();
      newHistory.push({
        type: 'output',
        text: `Opening direct transmission modal to Tommy...
Direct Email: ${tommyData.profile.socials.email}
Twitter/X: @Tommy_MetaX | Instagram: @Tommy_MetaX`
      });
    } else {
      sound.playGlitch();
      newHistory.push({
        type: 'output',
        text: `bash: command not found: ${trimmed}. Type 'help' to inspect valid commands.`
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommandExecution(inputVal);
      setInputVal('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete
      const match = validCommands.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        sound.playKeypress();
        setInputVal(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else {
      sound.playKeypress();
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-200 pt-20 pb-32 px-4 sm:px-6 md:px-12 flex flex-col font-mono relative overflow-hidden">
      {/* CRT Scanline Overlay */}
      {crtEnabled && <div className="absolute inset-0 crt-overlay" />}

      {/* Terminal Header & Toolbar */}
      <div className="max-w-5xl mx-auto w-full mb-4 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span className="font-bold tracking-wider text-white text-sm">
            TOMMY-SH // NEURAL_CONSOLE
          </span>
        </div>

        {/* Theme and CRT Controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Theme Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
            {['green', 'amber', 'cyan', 'matrix'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  sound.playClick();
                  setTheme(t);
                }}
                className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] transition-colors ${
                  theme === t ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CRT Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setCrtEnabled(!crtEnabled);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
              crtEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-white/5 border-white/10 text-zinc-500'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>CRT {crtEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Quick Action Chips (horizontally scrollable on mobile) */}
      <div className="max-w-5xl mx-auto w-full mb-3 flex items-center flex-nowrap sm:flex-wrap overflow-x-auto pb-1.5 scrollbar-none gap-1.5 z-10 text-xs">
        <span className="text-zinc-500 py-1 text-[11px] shrink-0">SUGGESTED:</span>
        {['whoami', 'resume', 'bughunt', 'socials', 'contact', 'cat about.txt', 'open projects', 'qa-report', 'play music', 'skills', 'clear'].map(
          (cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommandExecution(cmd)}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors text-xs font-mono shrink-0 whitespace-nowrap"
            >
              {cmd}
            </button>
          )
        )}
      </div>

      {/* Terminal Main Window Frame */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className={`max-w-5xl mx-auto w-full flex-1 rounded-2xl bg-[#0c0c12]/95 border ${currentTheme.border} p-3 sm:p-6 shadow-2xl shadow-black/80 flex flex-col z-10 min-h-[380px] cursor-text overflow-hidden`}
      >
        {/* Output List */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-3 text-xs sm:text-sm leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap font-mono">
              {item.type === 'prompt' && (
                <div className="text-zinc-400 font-semibold">{item.text}</div>
              )}
              {item.type === 'system' && (
                <div className="text-zinc-500">{item.text}</div>
              )}
              {item.type === 'output' && (
                <div className={currentTheme.text}>{item.text}</div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar - text-base on mobile prevents iOS auto-zoom */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10 font-mono text-base sm:text-sm">
          <span className={`${currentTheme.text} text-xs sm:text-sm`}>tommy@eko-node:~$</span>
          <div className="flex-1 flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              className="w-full bg-transparent border-none outline-none text-white font-mono placeholder-zinc-700 text-base sm:text-sm"
              placeholder={isMobile ? "Type command..." : "Type command... (Press Tab to autocomplete)"}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
