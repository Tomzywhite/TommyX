import React, { useState, useEffect } from 'react';
import { X, Send, Copy, Check, Terminal, ExternalLink, Mail, MapPin, Key, AlertCircle, ShieldCheck, Sparkles, Settings } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(''); // 'web3forms' | 'formspree' | 'mailto'
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [localKey, setLocalKey] = useState('');

  // Resolve API access key
  const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
  const dataKey = tommyData.profile?.contactConfig?.web3FormsAccessKey || '';
  const formspreeId = tommyData.profile?.contactConfig?.formspreeId || import.meta.env.VITE_FORMSPREE_ID || '';
  
  const [activeKey, setActiveKey] = useState(envKey || dataKey || '');

  useEffect(() => {
    const saved = localStorage.getItem('tommy_web3forms_key');
    if (saved) {
      setLocalKey(saved);
      if (!envKey && !dataKey) setActiveKey(saved);
    } else {
      setActiveKey(envKey || dataKey || '');
    }
  }, [envKey, dataKey]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(tommyData.profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const saveLocalAccessKey = (e) => {
    e.preventDefault();
    sound.playClick();
    if (localKey.trim()) {
      localStorage.setItem('tommy_web3forms_key', localKey.trim());
      setActiveKey(localKey.trim());
      sound.playSuccess();
      setShowConfigDrawer(false);
    }
  };

  const triggerMailtoFallback = (name, email, message) => {
    const subject = encodeURIComponent(`⚡ [TommyX Transmission] from ${name || 'Visitor'}`);
    const body = encodeURIComponent(
      `OPERATOR: Adejuwon Akintomide Samuel (Tommy)\n` +
      `FROM: ${name} (${email})\n\n` +
      `TRANSMISSION PAYLOAD:\n${message}\n\n` +
      `-- Sent via TommyX Neural Link Protocol`
    );
    const mailtoUrl = `mailto:${tommyData.profile.socials.email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    setSending(true);
    setErrorMessage('');

    // PATH A: If Formspree ID is configured
    if (formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            message: formState.message,
            _subject: `[TommyX Portfolio] Transmission from ${formState.name}`
          })
        });

        if (res.ok) {
          setDeliveryMethod('formspree');
          setSentSuccess(true);
          sound.playSuccess();
          triggerConfetti();
          return;
        } else {
          throw new Error('Formspree dispatch failed');
        }
      } catch (err) {
        console.warn('Formspree failed, falling back to mailto:', err);
      } finally {
        setSending(false);
      }
    }

    // PATH B: If Web3Forms Access Key is available
    if (activeKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: activeKey,
            name: formState.name,
            email: formState.email,
            message: formState.message,
            from_name: `TommyX Portfolio // ${formState.name}`,
            subject: `⚡ [TommyX Incoming Transmission] from ${formState.name} <${formState.email}>`,
          })
        });

        const data = await res.json();

        if (data.success) {
          setDeliveryMethod('web3forms');
          setSentSuccess(true);
          sound.playSuccess();
          triggerConfetti();
        } else {
          setErrorMessage(data.message || 'Transmission failed. Access Key may need verification.');
          // Auto fallback to Mailto so message is never lost
          triggerMailtoFallback(formState.name, formState.email, formState.message);
          setDeliveryMethod('mailto');
          setSentSuccess(true);
        }
      } catch (err) {
        setErrorMessage('Network connection to gateway timed out. Dispatched via direct mail client.');
        triggerMailtoFallback(formState.name, formState.email, formState.message);
        setDeliveryMethod('mailto');
        setSentSuccess(true);
      } finally {
        setSending(false);
      }
      return;
    }

    // PATH C: No background API key entered yet -> graceful direct mailto dispatch with notification
    setTimeout(() => {
      setSending(false);
      triggerMailtoFallback(formState.name, formState.email, formState.message);
      setDeliveryMethod('mailto');
      setSentSuccess(true);
      sound.playSuccess();
      triggerConfetti();
    }, 900);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00ff88', '#a855f7', '#06b6d4']
      });
    } catch (e) {}
  };

  const hasBackgroundService = Boolean(activeKey || formspreeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0e0e14] border border-white/20 rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl shadow-emerald-950/40 text-slate-100 overflow-hidden max-h-[92vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing border accents */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-purple-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto pr-1 custom-scrollbar">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Terminal className="w-4 h-4" />
              <span>TRANSMISSION_PROTOCOL // V2.0 (LIVE GATEWAY)</span>
            </div>

            {/* Background API status badge */}
            <button
              onClick={() => {
                sound.playClick();
                setShowConfigDrawer(!showConfigDrawer);
              }}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border transition-all ${
                hasBackgroundService 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
              title="Click to configure or inspect email gateway"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${hasBackgroundService ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{hasBackgroundService ? 'INBOX GATEWAY READY' : 'CLICK TO ADD FREE KEY'}</span>
              <Settings className="w-3 h-3 opacity-60 ml-0.5" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-syne font-bold tracking-tight text-white mb-1">
            Initiate Direct Link
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mb-4 font-sans">
            Delivering transmissions straight to <strong className="text-white">Adejuwon Akintomide Samuel (Tommy)</strong> in Lagos.
          </p>

          {/* Optional In-Modal Key Configuration Drawer */}
          {showConfigDrawer && (
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 mb-4 text-xs font-mono space-y-2.5 animate-in slide-in-from-top duration-200">
              <div className="flex items-center justify-between text-purple-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  CONNECT WEB3FORMS / INBOX GATEWAY
                </span>
                <a
                  href="https://web3forms.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Get Free Key (10s)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">
                Enter your free Web3Forms Access Key below or set <code className="text-purple-300 bg-white/5 px-1 py-0.5 rounded">VITE_WEB3FORMS_ACCESS_KEY</code> in <code className="text-purple-300 bg-white/5 px-1 py-0.5 rounded">.env</code>. Submissions will land silently in your Gmail!
              </p>
              <form onSubmit={saveLocalAccessKey} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
                  value={localKey}
                  onChange={(e) => setLocalKey(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white text-xs font-mono focus:border-purple-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-syne font-bold transition-colors"
                >
                  SAVE KEY
                </button>
              </form>
            </div>
          )}

          {/* Quick Email Copy Box */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-5">
            <div className="flex items-center gap-2.5 truncate">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <a 
                href={`mailto:${tommyData.profile.socials.email}`}
                className="font-mono text-xs sm:text-sm text-zinc-200 hover:text-emerald-400 truncate transition-colors"
                title="Click to draft email"
              >
                {tommyData.profile.socials.email}
              </a>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <a
                href={`mailto:${tommyData.profile.socials.email}`}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-all"
                title="Open Mail Client"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>MAILTO</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {sentSuccess ? (
            <div className="text-center py-7 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-3 text-emerald-400 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-wider uppercase">
                {deliveryMethod === 'web3forms' ? 'TRANSMISSION DELIVERED VIA GATEWAY' : 'PACKET DISPATCHED'}
              </h3>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-3 max-w-md mx-auto my-3 text-left text-xs space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>DESTINATION:</span>
                  <span className="text-emerald-400 font-bold">{tommyData.profile.socials.email}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>CHANNEL:</span>
                  <span className="text-cyan-300 font-bold">
                    {deliveryMethod === 'web3forms' 
                      ? 'Web3Forms Direct API' 
                      : deliveryMethod === 'formspree' 
                      ? 'Formspree REST Relay' 
                      : 'Direct Client Mailto Protocol'}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>SENDER:</span>
                  <span className="text-white truncate max-w-[200px]">{formState.name} ({formState.email})</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4 font-sans leading-relaxed">
                {deliveryMethod === 'web3forms' || deliveryMethod === 'formspree' ? (
                  <>Your message was processed and routed straight to Tommy's Lagos inbox. Expect an answer within 24 standard hours.</>
                ) : (
                  <>Your transmission was composed and opened in your email client to send to <strong className="text-emerald-300">{tommyData.profile.socials.email}</strong>.</>
                )}
              </p>

              {errorMessage && (
                <div className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg mb-3">
                  Notice: {errorMessage}
                </div>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  setSentSuccess(false);
                  setFormState({ name: '', email: '', message: '' });
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-all font-mono"
              >
                SEND ANOTHER TRANSMISSION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">CALLSIGN / NAME</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-zinc-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">RETURN ADDRESS / EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="ada@domain.io"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-zinc-600 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">TRANSMISSION PAYLOAD</label>
                <textarea
                  required
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Let's build something indestructible or break some frontends..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-zinc-600 font-sans resize-none"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-syne font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,255,136,0.3)] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {sending 
                    ? 'ROUTING TRANSMISSION VIA GATEWAY...' 
                    : hasBackgroundService 
                    ? 'DISPATCH DIRECT TO INBOX' 
                    : 'DISPATCH TRANSMISSION'}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-mono text-center">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>
                  {hasBackgroundService 
                    ? `Connected: Direct background delivery to ${tommyData.profile.socials.email}`
                    : `Zero data lost: Dispatches instantly to ${tommyData.profile.socials.email}`}
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Social Links Footer */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href={tommyData.profile.socials.twitter} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
              <span>@Tommy_MetaX</span>
            </a>
            <a 
              href={tommyData.profile.socials.instagram} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-pink-400 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>INSTAGRAM</span>
            </a>
            <a 
              href={tommyData.profile.socials.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-purple-400 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LINKEDIN</span>
            </a>
            <a 
              href={tommyData.profile.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            <MapPin className="w-3 h-3 text-orange-400" />
            <span>6.5244° N, 3.3792° E</span>
          </div>
        </div>
      </div>
    </div>
  );
}
