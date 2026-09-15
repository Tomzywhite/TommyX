import React, { useState, useEffect, useRef } from 'react';
import { 
  Bug, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  Terminal, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Send,
  FileText,
  Activity,
  Layers,
  Check,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundSynth';

export default function BugAssassinGame({ onOpenContact, onOpenResume }) {
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'won' | 'gameover'
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [activeBugIdx, setActiveBugIdx] = useState(0);

  // The 5 real-world QA / Frontend glitches
  const [bugs, setBugs] = useState([
    {
      id: 'BUG-01',
      name: 'Race Condition: Button Double-Spam',
      category: 'Concurrency / State',
      severity: 'CRITICAL',
      description: 'Checkout button does not disable on trigger. Spam clicking generates duplicate charge transactions.',
      stackSnippet: 'POST /api/v1/charge - 409 Conflict (Duplicate Idempotency Key Missing)',
      patchLabel: 'Inject Idempotent Debounce & Lock State',
      patched: false,
      symptom: 'User balance decremented 3 times in 40ms!'
    },
    {
      id: 'BUG-02',
      name: 'Ghost Z-Index Pointer Trap',
      category: 'DOM / Layout',
      severity: 'HIGH',
      description: 'An unmounted modal left an invisible backdrop div with pointer-events: auto blocking all form clicks.',
      stackSnippet: '<div class="fixed inset-0 opacity-0 z-[9999]" /> <!-- Intercepting clicks -->',
      patchLabel: 'Destroy Ghost Overlay & Nullify Pointer Events',
      patched: false,
      symptom: 'Form inputs unresponsive to user taps and clicks.'
    },
    {
      id: 'BUG-03',
      name: 'Corrupted Cart Total ($NaN.00)',
      category: 'Data Integrity',
      severity: 'HIGH',
      description: 'Discount coupon code calculated 100 / null without type casting, corrupting state with NaN.',
      stackSnippet: 'TypeError: total.toFixed is not a function at Cart.jsx:84 (Received NaN)',
      patchLabel: 'Sanitize Math, Guard Null & Cast Number',
      patched: false,
      symptom: 'Checkout total displays "TOTAL: $NaN.undefined".'
    },
    {
      id: 'BUG-04',
      name: 'Contrast & a11y Failure (WCAG AAA)',
      category: 'Accessibility',
      severity: 'MEDIUM',
      description: 'Error alert rendered #555 gray on #222 background with 1.4:1 contrast ratio, failing screen reader visibility.',
      stackSnippet: 'Lighthouse Audit: 1 low-contrast element detected (Expected min 7.0:1)',
      patchLabel: 'Inject High-Contrast Theme & ARIA Live Region',
      patched: false,
      symptom: 'Critical error text is virtually invisible to human eyes.'
    },
    {
      id: 'BUG-05',
      name: 'Zombie setInterval Memory Leak',
      category: 'Performance',
      severity: 'CRITICAL',
      description: 'useEffect polling telemetry forgot cleanup return function. 1,400 detached DOM nodes leaking memory.',
      stackSnippet: 'Warning: Can only update a mounted or mounting component at TelemetryWatcher',
      patchLabel: 'Attach Cleanup AbortController & Clear Interval',
      patched: false,
      symptom: 'Browser tab memory climbing at +18MB per second!'
    }
  ]);

  const timerRef = useRef(null);

  // Timer loop
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('gameover');
            sound.playGlitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const startGame = () => {
    sound.playClick();
    setBugs((prev) => prev.map((b) => ({ ...b, patched: false })));
    setScore(0);
    setTimeLeft(60);
    setActiveBugIdx(0);
    setGameState('playing');
  };

  const handlePatchBug = (idx) => {
    if (bugs[idx].patched || gameState !== 'playing') return;

    sound.playSuccess();
    const updated = [...bugs];
    updated[idx].patched = true;
    setBugs(updated);

    const bonus = Math.max(100, timeLeft * 10);
    setScore((s) => s + 200 + bonus);

    // Check if all bugs patched
    const allPatched = updated.every((b) => b.patched);
    if (allPatched) {
      setGameState('won');
      sound.playSuccess();
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      // Advance to next unpatched bug
      const nextUnpatched = updated.findIndex((b, i) => i > idx && !b.patched);
      if (nextUnpatched !== -1) {
        setActiveBugIdx(nextUnpatched);
      } else {
        const firstUnpatched = updated.findIndex((b) => !b.patched);
        if (firstUnpatched !== -1) setActiveBugIdx(firstUnpatched);
      }
    }
  };

  const patchedCount = bugs.filter((b) => b.patched).length;

  return (
    <div className="flex flex-col h-full bg-[#0d0d14] text-slate-100 font-mono select-none overflow-y-auto">
      {/* HUD Header */}
      <div className="bg-[#13131f] border-b border-white/10 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40">
            <Bug className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>BUG ASSASSIN // CHAOS HARNESS</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                SIMULATION
              </span>
            </h2>
            <p className="text-[11px] text-zinc-400">
              5 Critical Glitches Injected. Triage &amp; deploy fixes before crash.
            </p>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs">
          {/* Timer */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold ${
            timeLeft <= 15 
              ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' 
              : 'bg-white/5 border-white/10 text-emerald-400'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s</span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{patchedCount}/5 SQUASHED</span>
          </div>

          {/* Score */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <Award className="w-3.5 h-3.5" />
            <span>{score} PTS</span>
          </div>
        </div>
      </div>

      {/* Screen Views */}
      <div className="flex-1 p-3 sm:p-6 flex flex-col justify-center">
        {/* State 1: Ready Screen */}
        {gameState === 'ready' && (
          <div className="max-w-xl mx-auto w-full text-center space-y-6 py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <Zap className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Welcome to the QA Chaos Benchmark
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Most developers only test the happy path. In Tommy&apos;s world, we stress-test edge cases, memory leaks, and asynchronous race conditions until the code is indestructible.
              </p>
            </div>

            {/* Quick Rules */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-left text-xs space-y-2 text-zinc-300">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>MISSION PARAMETERS:</span>
              </div>
              <p>• 5 active exploits have corrupted the simulated client state.</p>
              <p>• You have 60 seconds to inspect the stack traces and apply the correct patch.</p>
              <p>• Faster triages earn higher time-bonus multipliers.</p>
            </div>

            <button
              onClick={startGame}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 mx-auto"
            >
              <Zap className="w-4 h-4" />
              <span>ENGAGE BUG ASSASSIN PROTOCOL</span>
            </button>
          </div>
        )}

        {/* State 2: Active Playing Screen */}
        {gameState === 'playing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/* Left Column: Bug Selector List */}
            <div className="lg:col-span-4 space-y-2 overflow-y-auto">
              <div className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>ACTIVE BUG ROSTER</span>
                <span>{patchedCount}/5 RESOLVED</span>
              </div>
              {bugs.map((bug, idx) => {
                const isCurrent = activeBugIdx === idx;
                return (
                  <button
                    key={bug.id}
                    onClick={() => {
                      sound.playKeypress();
                      setActiveBugIdx(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                      bug.patched
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-400'
                        : isCurrent
                        ? 'bg-red-500/15 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.2)] text-white'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {bug.patched ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-ping" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 text-[10px] font-bold">
                        <span className="text-zinc-400">{bug.id}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                          bug.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {bug.severity}
                        </span>
                      </div>
                      <div className="text-xs font-bold truncate mt-0.5">
                        {bug.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 truncate">
                        {bug.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Bug Diagnostics & Patch Workbench */}
            <div className="lg:col-span-8 bg-black/60 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
              {bugs[activeBugIdx] && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-xs font-bold text-red-400 tracking-wider">
                        TARGET: {bugs[activeBugIdx].id} // {bugs[activeBugIdx].category}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {bugs[activeBugIdx].name}
                      </h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      bugs[activeBugIdx].patched
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                    }`}>
                      {bugs[activeBugIdx].patched ? 'STATUS: PATCHED' : 'STATUS: LIVE EXPLOIT'}
                    </span>
                  </div>

                  {/* Symptom Callout */}
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Symptom Detected: </span>
                      {bugs[activeBugIdx].symptom}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {bugs[activeBugIdx].description}
                  </p>

                  {/* Simulated Terminal Crash Dump */}
                  <div className="rounded-xl bg-[#08080c] border border-white/10 p-3 text-[11px] font-mono overflow-x-auto text-zinc-300">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1 text-[10px]">
                      <Terminal className="w-3 h-3" />
                      <span>RUNTIME_CONSOLE_TRACE</span>
                    </div>
                    <code className="text-red-400 break-all">
                      &gt; {bugs[activeBugIdx].stackSnippet}
                    </code>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-[11px] text-zinc-500">
                  {bugs[activeBugIdx]?.patched ? 'Fix deployed to client state.' : 'Deploying patch will verify unit invariant.'}
                </span>

                <button
                  onClick={() => handlePatchBug(activeBugIdx)}
                  disabled={bugs[activeBugIdx]?.patched}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                    bugs[activeBugIdx]?.patched
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white shadow-lg shadow-red-500/20 active:scale-95'
                  }`}
                >
                  {bugs[activeBugIdx]?.patched ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>VULNERABILITY RESOLVED</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>{bugs[activeBugIdx]?.patchLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Victory Screen */}
        {gameState === 'won' && (
          <div className="max-w-xl mx-auto w-full text-center space-y-6 py-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(0,255,136,0.3)]">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black tracking-widest uppercase inline-block mb-3">
                #BUG_ASSASSIN // RANK: S+
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Zero Defects Remaining. Production Saved.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2">
                All 5 edge cases triaged and neutralized with {timeLeft}s remaining on the clock.
              </p>
            </div>

            {/* Final Stats Scorecard */}
            <div className="grid grid-cols-3 gap-3 bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">FINAL SCORE</div>
                <div className="text-lg sm:text-xl font-black text-purple-400">{score}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">TIME REMAINING</div>
                <div className="text-lg sm:text-xl font-black text-emerald-400">{timeLeft}s</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">QUALITY GRADE</div>
                <div className="text-lg sm:text-xl font-black text-orange-400">100% WCAG</div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenResume) onOpenResume();
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>INSPECT TOMMY&apos;S RESUME</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenContact) onOpenContact();
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs font-black uppercase transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT MESSAGE TO TOMMY</span>
              </button>

              <button
                onClick={startGame}
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs transition-colors flex items-center gap-1.5"
                title="Play Again"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>SPEEDRUN</span>
              </button>
            </div>
          </div>
        )}

        {/* State 4: Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="max-w-md mx-auto w-full text-center space-y-5 py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white uppercase">
                CRASH: UNCAUGHT EXCEPTION IN PROD
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                The 60s timer expired before all exploits were locked down. {5 - patchedCount} bugs slipped past the gate.
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETRY TRIAGE MATRIX</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
