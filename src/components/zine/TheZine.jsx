import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  ArrowUpRight, 
  Tag, 
  Clock, 
  Bookmark, 
  Share2, 
  Check, 
  Hash,
  Layers,
  Zap
} from 'lucide-react';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';

export default function TheZine() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);

  const categories = ['ALL', 'QA PHILOSOPHY', 'FRONTEND & INFRA', 'LIFESTYLE / SPEED', 'FITNESS / DISCIPLINE'];

  const filteredArticles = selectedCategory === 'ALL'
    ? tommyData.zineArticles
    : tommyData.zineArticles.filter(a => a.category === selectedCategory);

  const handleShare = (slug) => {
    sound.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-slate-100 pt-20 pb-32 px-4 sm:px-6 md:px-12 selection:bg-[#f97316] selection:text-black">
      {/* Editorial Street Marquee Ticker */}
      <div className="relative overflow-hidden w-full bg-gradient-to-r from-orange-500 via-purple-600 to-emerald-500 text-black py-2.5 font-syne font-black text-xs sm:text-sm tracking-widest uppercase transform -rotate-1 shadow-xl mb-12 select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          <span>⚡ LAGOS IS AN UNHANDLED EXCEPTION THAT NEVER CRASHES</span>
          <span>•</span>
          <span>BREAK IT BEFORE PRODUCTION BREAKS YOU</span>
          <span>•</span>
          <span>19-YEAR-OLD QA ADVERSARY // FRONTEND ARCHITECT</span>
          <span>•</span>
          <span>300MS PING FORCES RESILIENT CODE</span>
          <span>•</span>
          <span>TWO WHEELS ON THIRD MAINLAND AT 02:00 AM</span>
          <span>•</span>
          <span>⚡ LAGOS IS AN UNHANDLED EXCEPTION THAT NEVER CRASHES</span>
        </div>
      </div>

      {/* Editorial Cover Header */}
      <div className="max-w-6xl mx-auto mb-16 relative">
        {/* Floating Graffiti Sticker Tags */}
        <div className="absolute -top-6 right-4 hidden md:flex items-center gap-3 transform rotate-3">
          <span className="px-3 py-1 rounded bg-[#00ff88] text-black font-mono text-xs font-black shadow-[4px_4px_0px_#000]">
            #BUG_ASSASSIN
          </span>
          <span className="px-3 py-1 rounded bg-[#f97316] text-black font-mono text-xs font-black shadow-[4px_4px_0px_#000] -rotate-6">
            EKO CYBERPUNK
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-orange-400 mb-2 tracking-widest">
          <Flame className="w-4 h-4 fill-orange-400" />
          <span>ISSUE NO. 019 // THE RAW LOGS</span>
        </div>

        <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-syne font-black tracking-tighter text-white uppercase leading-none break-words">
          THE CHAOS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-400 to-emerald-400">
            &amp; THE CRAFT
          </span>
        </h1>

        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white/10 pb-6">
          <p className="font-serif italic text-zinc-400 text-base sm:text-xl max-w-xl leading-relaxed">
            &quot;A digital manifesto on software destruction, resilient user interfaces under African broadband constraints, and the razor edge of midnight speed.&quot;
          </p>
          <div className="font-mono text-xs text-zinc-500">
            BY ADEJUWON AKINTOMIDE SAMUEL (TOMMY) • LAGOS
          </div>
        </div>
      </div>

      {/* Category Filter Pills (horizontally scrollable on mobile) */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-nowrap sm:flex-wrap overflow-x-auto pb-2 scrollbar-none gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-xs whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Zine Articles Grid */}
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {filteredArticles.map((article, idx) => {
          const isExpanded = expandedArticle === article.id;
          const isEven = idx % 2 === 0;

          return (
            <article
              key={article.id}
              className="relative p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#111118]/90 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl overflow-hidden group"
            >
              {/* Color Accent Bar */}
              <div 
                className="absolute top-0 left-0 bottom-0 w-1.5 sm:w-2"
                style={{
                  backgroundColor: 
                    article.accent === 'green' ? '#00ff88' :
                    article.accent === 'orange' ? '#f97316' : '#7c3aed'
                }}
              />

              {/* Meta Top Line */}
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold text-[10px] sm:text-xs">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400 text-[10px] sm:text-xs">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                  <span className="text-zinc-500">{article.date}</span>
                  <button
                    onClick={() => handleShare(article.slug)}
                    className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Article Link"
                  >
                    {copiedSlug === article.slug ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Article Headline */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black text-white tracking-tight leading-tight mb-2 group-hover:text-orange-400 transition-colors">
                {article.title}
              </h2>
              <p className="font-mono text-xs sm:text-sm text-zinc-400 tracking-wider mb-4 sm:mb-6">
                // {article.subtitle}
              </p>


              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed mb-6">
                {article.snippet}
              </p>

              {/* Highlighted Quote Callout */}
              <div className="my-6 p-4 sm:p-6 rounded-2xl bg-white/5 border-l-4 border-orange-500 font-serif italic text-lg sm:text-xl text-zinc-200">
                &ldquo;{article.quote}&rdquo;
              </div>

              {/* Expanded Paragraphs */}
              {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in duration-300 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                  {article.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Read More / Read Less Toggle */}
              <div className="mt-6 pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    sound.playClick();
                    setExpandedArticle(isExpanded ? null : article.id);
                  }}
                  className="flex items-center gap-2 font-mono text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-wider"
                >
                  <span>{isExpanded ? 'COLLAPSE ESSAY [-]' : 'EXPAND ESSAY & PERSPECTIVES [+]'}</span>
                </button>

                <span className="font-mono text-[10px] text-zinc-500 uppercase">
                  ADEJUWON.LOG // #{article.tag}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Street Editorial Footer Manifesto */}
      <div className="max-w-4xl mx-auto mt-20 text-center p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
        <h3 className="text-2xl font-syne font-black text-white mb-2">
          HAVE A SYSTEM YOU WANT TO BREAK-TEST?
        </h3>
        <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
          Reach out. Whether it’s an ambitious React frontend or an intractable flakiness issue in your CI pipeline.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs mb-6">
          <a
            href={`mailto:${tommyData.profile.socials.email}`}
            className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
          >
            EMAIL: {tommyData.profile.socials.email}
          </a>
          <a
            href={tommyData.profile.socials.twitter}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 transition-all"
          >
            X: @Tommy_MetaX
          </a>
          <a
            href={tommyData.profile.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-pink-400 border border-white/10 transition-all"
          >
            IG: @Tommy_MetaX
          </a>
          <a
            href={tommyData.profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-400 border border-white/10 transition-all"
          >
            LINKEDIN
          </a>
        </div>
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-zinc-400 font-mono text-xs">
          6.5244° N, 3.3792° E — LAGOS, NIGERIA
        </span>
      </div>
    </div>
  );
}
