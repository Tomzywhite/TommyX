import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, 
  Music, 
  User, 
  ShieldCheck, 
  Minus, 
  Square, 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Volume1,
  Bug, 
  CheckCircle2, 
  RefreshCw,
  Cpu,
  ChevronLeft,
  Mail,
  Camera,
  Image,
  Upload,
  Disc3,
  Sparkles,
  FileText
} from 'lucide-react';
import { sound } from '../../utils/soundSynth';
import { tommyData } from '../../data/tommyData';
import BugAssassinGame from './BugAssassinGame';
import ResumeViewer from './ResumeViewer';


export default function TommyOS({ onOpenContact }) {
  // Desktop windows state - high zIndex ensures windows are ALWAYS above desktop icons (z-[1])
  const [windows, setWindows] = useState([
    {
      id: 'about',
      title: 'About_Tommy_Samuel.exe',
      icon: User,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 25,
      position: { x: 40, y: 50 },
      size: { w: 580, h: 480 }
    },
    {
      id: 'projects',
      title: 'Projects_Directory // File_Explorer',
      icon: Folder,
      isOpen: false, // Closed initially to avoid mobile overlay collisions
      isMinimized: false,
      isMaximized: false,
      zIndex: 24,
      position: { x: 260, y: 90 },
      size: { w: 680, h: 500 }
    },
    {
      id: 'music',
      title: 'Faouzia_Discography // Music_Player.mp3',
      icon: Music,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 23,
      position: { x: 120, y: 140 },
      size: { w: 580, h: 540 }
    },
    {
      id: 'photos',
      title: 'Photo_Vault // Tommy_Gallery.exe',
      icon: Image,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 22,
      position: { x: 160, y: 100 },
      size: { w: 680, h: 520 }
    },
    {
      id: 'qa_matrix',
      title: 'E2E_Test_Sentinel_Runner.log',
      icon: ShieldCheck,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 21,
      position: { x: 180, y: 120 },
      size: { w: 560, h: 420 }
    },
    {
      id: 'bughunt',
      title: 'Bug_Assassin_Benchmark.exe',
      icon: Bug,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 20,
      position: { x: 190, y: 70 },
      size: { w: 740, h: 540 }
    },
    {
      id: 'resume',
      title: 'Adejuwon_Samuel_Resume.pdf.exe',
      icon: FileText,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 19,
      position: { x: 210, y: 60 },
      size: { w: 780, h: 580 }
    }
  ]);

  const [topZ, setTopZ] = useState(30);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Faouzia Music Player State
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [musicTab, setMusicTab] = useState('tracks'); // 'tracks' | 'spotify'
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [customAudioMap, setCustomAudioMap] = useState({});
  const [audioError, setAudioError] = useState(false);

  // Photo Vault & Avatar State
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [localPhotos, setLocalPhotos] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On small phones, start clean on desktop or single window
      if (mobile) {
        setWindows(prev => prev.map(w => w.id === 'about' ? { ...w, isOpen: false } : w));
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  // QA Test Runner State
  const [testResults, setTestResults] = useState(tommyData.qaTestSuite);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Dragging logic
  const [draggingId, setDraggingId] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const bringToFront = (id) => {
    sound.playClick();
    setTopZ((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: topZ + 1, isMinimized: false } : w))
    );
  };

  const toggleMinimize = (id, e) => {
    e.stopPropagation();
    sound.playClick();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  };

  const toggleMaximize = (id, e) => {
    e.stopPropagation();
    sound.playClick();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  };

  const closeWindow = (id, e) => {
    e.stopPropagation();
    sound.playClick();
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  };

  const openWindow = (id) => {
    sound.playClick();
    setTopZ((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return { ...w, isOpen: true, isMinimized: false, zIndex: topZ + 1 };
        }
        // On mobile, minimize other windows so only one clean app is in the foreground
        if (isMobile) {
          return { ...w, isMinimized: true };
        }
        return w;
      })
    );
  };


  // Drag Handlers
  const handleMouseDown = (id, e) => {
    if (isMobile) return; // Disable drag on mobile
    bringToFront(id);
    const win = windows.find((w) => w.id === id);
    if (!win || win.isMaximized) return;

    setDraggingId(id);
    dragOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y
    };
  };


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingId) return;
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== draggingId) return w;
          const newX = Math.max(10, Math.min(window.innerWidth - 300, e.clientX - dragOffset.current.x));
          const newY = Math.max(50, Math.min(window.innerHeight - 200, e.clientY - dragOffset.current.y));
          return { ...w, position: { x: newX, y: newY } };
        })
      );
    };

    const handleMouseUp = () => {
      setDraggingId(null);
    };

    if (draggingId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId]);

  // Real Audio Engine Handlers for Faouzia Player
  const currentTrack = tommyData.musicTracks[currentTrackIdx] || tommyData.musicTracks[0];
  const activeAudioSrc = customAudioMap[currentTrack?.id] || currentTrack?.audioUrl || currentTrack?.localFile || '';

  // Synchronize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : audioVolume;
    }
  }, [audioVolume, isMuted]);

  // Terminate procedural lofi synth
  useEffect(() => {
    sound.stopLofiBeat();
    return () => {
      sound.stopLofiBeat();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playTrackAtIndex = (idx, autoPlay = true) => {
    sound.playClick();
    sound.stopLofiBeat(); // Terminate procedural lofi
    setCurrentTrackIdx(idx);
    setAudioError(false);
    setAudioCurrentTime(0);

    const targetTrack = tommyData.musicTracks[idx];
    const targetSrc = customAudioMap[targetTrack.id] || targetTrack.audioUrl || targetTrack.localFile;

    if (audioRef.current) {
      audioRef.current.src = targetSrc;
      audioRef.current.currentTime = 0;
      if (autoPlay) {
        audioRef.current.play()
          .then(() => setIsPlayingMusic(true))
          .catch((err) => {
            console.warn('Audio playback error:', err);
            setIsPlayingMusic(false);
          });
      }
    }
  };

  const handleTogglePlayMusic = () => {
    sound.playClick();
    sound.stopLofiBeat(); // Terminate procedural lofi

    if (!audioRef.current) return;

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      const targetSrc = customAudioMap[currentTrack.id] || currentTrack.audioUrl || currentTrack.localFile;
      if (!audioRef.current.src || !audioRef.current.src.includes(encodeURIComponent(targetSrc.slice(-25)))) {
        audioRef.current.src = targetSrc;
      }
      audioRef.current.play()
        .then(() => {
          setIsPlayingMusic(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.warn('Audio play error:', err);
          setAudioError(true);
          setIsPlayingMusic(false);
        });
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % tommyData.musicTracks.length;
    playTrackAtIndex(nextIdx, isPlayingMusic);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIdx - 1 + tommyData.musicTracks.length) % tommyData.musicTracks.length;
    playTrackAtIndex(prevIdx, isPlayingMusic);
  };

  const formatAudioTime = (secs) => {
    if (isNaN(secs) || secs === undefined || secs === null) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    setAudioCurrentTime(seekTo);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const handleCustomAudioUpload = (trackId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.playSuccess();
      const url = URL.createObjectURL(file);
      setCustomAudioMap(prev => ({ ...prev, [trackId]: url }));
      if (audioRef.current && currentTrack.id === trackId) {
        audioRef.current.src = url;
        audioRef.current.play().then(() => setIsPlayingMusic(true));
      }
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.playSuccess();
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handlePhotoUpload = (photoId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.playSuccess();
      const url = URL.createObjectURL(file);
      setLocalPhotos((prev) => ({ ...prev, [photoId]: url }));
    }
  };

  // Run simulated QA test suite
  const handleRunQA = () => {
    sound.playClick();
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      sound.playSuccess();
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07070a] overflow-hidden pt-14 pb-14 select-none">
      {/* OS Background Art & Grid */}
      <div className="absolute inset-0 radar-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop Watermark */}
      <div className="absolute bottom-16 right-8 pointer-events-none text-right font-mono opacity-20">
        <p className="text-4xl font-syne font-black tracking-widest text-zinc-600">TOMMY_OS</p>
        <p className="text-xs text-zinc-500">KERNEL V4.19 // LAGOS NODE</p>
      </div>

      {/* Desktop Shortcuts / Icons (z-[1] so they never render above any window) */}
      <div 
        className={`relative z-[1] p-4 sm:p-6 ${
          isMobile && windows.some(w => w.isOpen && !w.isMinimized) ? 'hidden' : 'grid grid-cols-3 sm:flex sm:flex-col'
        } gap-2.5 sm:gap-6 max-w-sm sm:w-36`}
      >
        <button
          onClick={() => openWindow('about')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.2)]">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-emerald-400 tracking-wide truncate max-w-full">
            About_Me
          </span>
        </button>

        <button
          onClick={() => openWindow('projects')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <Folder className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-orange-400 tracking-wide truncate max-w-full">
            Projects
          </span>
        </button>

        <button
          onClick={() => openWindow('music')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <Disc3 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-purple-400 tracking-wide truncate max-w-full">
            Faouzia_Player
          </span>
        </button>

        <button
          onClick={() => openWindow('photos')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-pink-400 tracking-wide truncate max-w-full">
            Photo_Vault
          </span>
        </button>

        <button
          onClick={() => openWindow('qa_matrix')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-cyan-400 tracking-wide truncate max-w-full">
            QA_Sentinel
          </span>
        </button>

        <button
          onClick={() => openWindow('bughunt')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Bug className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-red-400 tracking-wide truncate max-w-full">
            Bug_Assassin
          </span>
        </button>

        <button
          onClick={() => openWindow('resume')}
          className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-center"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.2)]">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-emerald-400 tracking-wide truncate max-w-full">
            Resume.pdf
          </span>
        </button>
      </div>

      {/* RENDER WINDOWS */}
      {windows.map((win) => {
        if (!win.isOpen || win.isMinimized) return null;

        const isMax = win.isMaximized;
        const style = isMobile
          ? {
              top: 50,
              left: 8,
              right: 8,
              bottom: 58,
              width: 'calc(100vw - 16px)',
              maxWidth: 'calc(100vw - 16px)',
              height: 'calc(100dvh - 110px)',
              zIndex: win.zIndex,
              borderRadius: 14
            }
          : isMax
          ? { top: 54, left: 12, right: 12, bottom: 56, zIndex: win.zIndex }
          : {
              top: `${win.position.y}px`,
              left: `${Math.min(win.position.x, Math.max(10, (typeof window !== 'undefined' ? window.innerWidth : 1200) - win.size.w - 20))}px`,
              width: `${win.size.w}px`,
              maxWidth: '94vw',
              height: `${win.size.h}px`,
              zIndex: win.zIndex
            };

        return (
          <div
            key={win.id}
            onClick={() => bringToFront(win.id)}
            style={style}
            className={`fixed flex flex-col ${
              isMobile ? 'rounded-2xl inset-x-2' : 'rounded-xl'
            } bg-[#0c0c12]/95 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black overflow-hidden transition-all duration-150 ${
              draggingId === win.id ? 'opacity-95 ring-1 ring-emerald-500/50' : ''
            }`}
          >
            {/* Window Titlebar */}
            <div
              onMouseDown={(e) => handleMouseDown(win.id, e)}
              className="h-11 bg-[#151520] border-b border-white/10 px-3 flex items-center justify-between cursor-move shrink-0 select-none"
            >
              <div className="flex items-center gap-2 truncate">
                {isMobile && (
                  <button
                    onClick={(e) => closeWindow(win.id, e)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20 text-[11px] font-mono font-bold text-emerald-400 hover:bg-emerald-500/30 transition-colors mr-1 shrink-0"
                    title="Back to Desktop"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>DESKTOP</span>
                  </button>
                )}
                <win.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono font-semibold text-zinc-200 truncate">
                  {win.title}
                </span>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1.5 ml-2 shrink-0">
                <button
                  onClick={(e) => toggleMinimize(win.id, e)}
                  className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                {!isMobile && (
                  <button
                    onClick={(e) => toggleMaximize(win.id, e)}
                    className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    title={isMax ? 'Restore' : 'Maximize'}
                  >
                    <Square className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={(e) => closeWindow(win.id, e)}
                  className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>



            {/* Window Content Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 font-sans text-sm text-zinc-300">
              {/* ===================== ABOUT ME WINDOW ===================== */}
              {win.id === 'about' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-white/10">
                    <div className="relative group shrink-0">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-purple-500 p-0.5 shadow-lg shadow-emerald-500/20 overflow-hidden">
                        <img
                          src={avatarPreview || tommyData.profile.avatar}
                          alt={tommyData.profile.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                          className="w-full h-full object-cover rounded-[14px]"
                        />
                        <div className="hidden w-full h-full bg-[#0d0d12] rounded-[14px] flex-col items-center justify-center text-center p-1">
                          <span className="font-syne text-2xl font-black text-emerald-400">T</span>
                          <span className="text-[9px] font-mono text-zinc-500">TOMMY</span>
                        </div>
                      </div>
                      <label 
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer shadow-md transition-transform hover:scale-110" 
                        title="Upload / Preview Your Photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                      </label>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-syne font-bold text-white">
                          {tommyData.profile.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px]">
                          VERIFIED
                        </span>
                      </div>
                      <p className="text-xs font-mono text-emerald-400">
                        {tommyData.profile.age} Y/O QA ENGINEER &amp; FRONT-END ARCHITECT // LAGOS, NG
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        &quot;Break it before production breaks you.&quot;
                      </p>
                    </div>
                  </div>

                  {/* Bio statement */}
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm">
                    {tommyData.profile.bio}
                  </p>

                  {/* Direct Contact & Social Transmission Channels */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Direct Communication Channels</span>
                      </span>
                      <span className="text-[10px] text-zinc-500">LAGOS NODE</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <a
                        href={`mailto:${tommyData.profile.socials.email}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-zinc-300 hover:text-emerald-400 transition-all group"
                        title="Direct Email"
                      >
                        <span className="text-zinc-400 group-hover:text-emerald-300">EMAIL</span>
                        <span className="truncate max-w-[170px] text-zinc-200 group-hover:text-white font-sans text-[11px]">{tommyData.profile.socials.email}</span>
                      </a>

                      <a
                        href={tommyData.profile.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-zinc-300 hover:text-cyan-400 transition-all group"
                        title="Twitter / X Profile"
                      >
                        <span className="text-zinc-400 group-hover:text-cyan-300">X / TWITTER</span>
                        <span className="text-zinc-200 group-hover:text-white">@Tommy_MetaX</span>
                      </a>

                      <a
                        href={tommyData.profile.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/10 text-zinc-300 hover:text-pink-400 transition-all group"
                        title="Instagram Profile"
                      >
                        <span className="text-zinc-400 group-hover:text-pink-300">INSTAGRAM</span>
                        <span className="text-zinc-200 group-hover:text-white">@Tommy_MetaX</span>
                      </a>

                      <a
                        href={tommyData.profile.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 text-zinc-300 hover:text-purple-400 transition-all group"
                        title="LinkedIn Profile"
                      >
                        <span className="text-zinc-400 group-hover:text-purple-300">LINKEDIN</span>
                        <span className="text-zinc-200 group-hover:text-white">/in/thetomide</span>
                      </a>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                      Core QA &amp; Testing Weaponry
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {tommyData.skills.qaAndTesting.map((skill, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-zinc-200">{skill.name}</span>
                            <span className="text-emerald-400 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                      Frontend Engineering Arsenal
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {tommyData.skills.frontendEngineering.map((skill, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-zinc-200">{skill.name}</span>
                            <span className="text-purple-400 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== PROJECTS WINDOW ===================== */}
              {win.id === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                    <span className="text-zinc-400">4 REPOSITORIES COMPILED</span>
                    <span className="text-emerald-400">STATUS: ALL PASSING</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tommyData.projects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedProject(proj);
                        }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                              {proj.previewTag}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500">
                              {proj.role}
                            </span>
                          </div>
                          <h4 className="font-syne font-bold text-white group-hover:text-emerald-400 transition-colors text-base mb-1">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                            {proj.description}
                          </p>
                        </div>

                        <div>
                          <div className="text-[11px] font-mono text-zinc-400 mb-2">
                            ⚡ {proj.metrics}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {proj.stack.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-zinc-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Project Detailed Inspector Modal if clicked */}
                  {selectedProject && (
                    <div className="p-4 mt-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 animate-in fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                          INSPECTOR: {selectedProject.title}
                        </span>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="text-zinc-400 hover:text-white text-xs font-mono"
                        >
                          [CLOSE]
                        </button>
                      </div>
                      <p className="text-xs text-zinc-300 mb-3">{selectedProject.description}</p>
                      <div className="space-y-1 text-xs font-mono text-zinc-400">
                        {selectedProject.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-emerald-400">✔</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ===================== FAOUZIA MUSIC PLAYER WINDOW ===================== */}
              {win.id === 'music' && (
                <div className="space-y-4">
                  {/* Music Mode Switcher Tabs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                        <Disc3 className={`w-5 h-5 ${isPlayingMusic ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-syne font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                          <span>Faouzia // Official Player</span>
                          <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                            {tommyData.musicTracks.length} TRACKS
                          </span>
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-mono">
                          Moroccan-Canadian Vocal Virtuoso &amp; Pop Icon
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setMusicTab('tracks');
                        }}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          musicTab === 'tracks'
                            ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        TRACKLIST
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setMusicTab('spotify');
                        }}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          musicTab === 'spotify'
                            ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/30'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        SPOTIFY STREAM
                      </button>
                    </div>
                  </div>

                  {musicTab === 'spotify' ? (
                    <div className="space-y-3">
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between">
                        <span>LIVE FAOUZIA STREAM // SPOTIFY MASTER</span>
                        <span className="text-[10px] text-zinc-400">DIRECT INTEGRATION</span>
                      </div>
                      <iframe
                        style={{ borderRadius: '14px' }}
                        src="https://open.spotify.com/embed/artist/0e86yPdV4BceGERgNaCwRJ?utm_source=generator&theme=0"
                        width="100%"
                        height="380"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Faouzia on Spotify"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Active Playing Track Hero Card */}
                      <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-950/40 via-black/70 to-black/80 border border-purple-500/30 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
                        {/* Vinyl Art & Equalizer */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-[0_0_30px_rgba(168,85,247,0.35)] shrink-0 flex items-center justify-center overflow-hidden group">
                          {currentTrack.artwork ? (
                            <img
                              src={currentTrack.artwork}
                              alt={currentTrack.title}
                              className={`w-full h-full object-cover rounded-[14px] transition-transform duration-700 ${
                                isPlayingMusic ? 'scale-105' : 'grayscale-[20%]'
                              }`}
                            />
                          ) : (
                            <div className="w-full h-full bg-[#0e0e16] rounded-[14px] flex flex-col items-center justify-center p-2 text-center">
                              <Disc3 className={`w-8 h-8 text-pink-400 ${isPlayingMusic ? 'animate-spin' : ''}`} />
                              <span className="text-[8px] font-mono text-purple-300 mt-1 font-bold">FAOUZIA</span>
                            </div>
                          )}

                          {/* Vinyl center badge */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-pink-400">
                              <Disc3 className={`w-4 h-4 ${isPlayingMusic ? 'animate-spin' : ''}`} />
                            </div>
                          </div>
                        </div>

                        {/* Song Metadata & Scrub Bar */}
                        <div className="flex-1 w-full text-center sm:text-left space-y-1.5">
                          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                              <span>NOW STREAMING</span>
                              <span>•</span>
                              <span>{currentTrack.genre}</span>
                            </div>

                            {/* Local MP3 upload button */}
                            <label className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer border border-white/10 flex items-center gap-1 transition-colors">
                              <Upload className="w-3 h-3 text-purple-400" />
                              <span>LOAD LOCAL MP3</span>
                              <input
                                type="file"
                                accept="audio/*"
                                className="hidden"
                                onChange={(e) => handleCustomAudioUpload(currentTrack.id, e)}
                              />
                            </label>
                          </div>

                          <h4 className="text-lg sm:text-xl font-syne font-black text-white tracking-wide">
                            {currentTrack.title}
                          </h4>
                          <p className="text-xs font-mono text-zinc-400">
                            By Faouzia // Album: {currentTrack.album || 'Single'} ({currentTrack.duration})
                          </p>

                          {currentTrack.lyricsSnippet && (
                            <p className="text-xs font-serif italic text-purple-300/90 pt-0.5 line-clamp-1">
                              &ldquo;{currentTrack.lyricsSnippet}&rdquo;
                            </p>
                          )}

                          {/* Interactive Audio Progress Bar */}
                          <div className="pt-1.5 space-y-1">
                            <input
                              type="range"
                              min={0}
                              max={audioDuration || 180}
                              step={0.1}
                              value={audioCurrentTime}
                              onChange={handleSeek}
                              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400 transition-all"
                            />
                            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                              <span>{formatAudioTime(audioCurrentTime)}</span>
                              <span className="text-purple-300/80 uppercase tracking-widest text-[9px]">
                                {customAudioMap[currentTrack.id] ? 'CUSTOM AUDIO' : 'HIGH-RES FAOUZIA MASTER'}
                              </span>
                              <span>{formatAudioTime(audioDuration || (currentTrack.duration ? parseInt(currentTrack.duration.split(':')[0])*60 + parseInt(currentTrack.duration.split(':')[1]) : 180))}</span>
                            </div>
                          </div>
                        </div>

                        {/* Playback & Volume Controls */}
                        <div className="flex flex-col sm:flex-col items-center gap-3 shrink-0">
                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={handlePrevTrack}
                              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                              title="Previous Track"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleTogglePlayMusic}
                              className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-purple-500 hover:scale-105 text-white flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all"
                              title={isPlayingMusic ? 'Pause Faouzia' : 'Play Faouzia'}
                            >
                              {isPlayingMusic ? (
                                <Pause className="w-5 h-5 fill-white" />
                              ) : (
                                <Play className="w-5 h-5 fill-white ml-0.5" />
                              )}
                            </button>
                            <button
                              onClick={handleNextTrack}
                              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                              title="Next Track"
                            >
                              <SkipForward className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Volume Slider & Mute Toggle */}
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/50 border border-white/10 text-zinc-400 text-xs font-mono">
                            <button
                              onClick={() => {
                                sound.playClick();
                                setIsMuted(!isMuted);
                              }}
                              className="hover:text-white transition-colors"
                              title={isMuted ? "Unmute" : "Mute"}
                            >
                              {isMuted || audioVolume === 0 ? (
                                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                              ) : audioVolume < 0.5 ? (
                                <Volume1 className="w-3.5 h-3.5 text-purple-300" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5 text-purple-300" />
                              )}
                            </button>
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.05}
                              value={isMuted ? 0 : audioVolume}
                              onChange={(e) => {
                                setAudioVolume(parseFloat(e.target.value));
                                if (isMuted) setIsMuted(false);
                              }}
                              className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-400"
                            />
                          </div>
                        </div>
                      </div>

                      {audioError && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-between">
                          <span>Browser autoplay policy paused audio. Click Play above to resume stream!</span>
                          <button
                            onClick={handleTogglePlayMusic}
                            className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-[10px] font-bold"
                          >
                            PLAY NOW
                          </button>
                        </div>
                      )}

                      {/* Equalizer Waveform Bars */}
                      <div className="h-8 rounded-lg bg-black/50 border border-white/5 px-3 flex items-center justify-between gap-1 overflow-hidden">
                        {[35, 60, 85, 45, 95, 70, 50, 80, 65, 40, 90, 75, 55, 30, 85, 60, 45, 95, 70, 55, 80, 40].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-150 ${
                              isPlayingMusic ? 'bg-gradient-to-t from-purple-500 via-pink-400 to-cyan-400' : 'bg-zinc-800'
                            }`}
                            style={{
                              height: isPlayingMusic ? `${Math.max(15, (h * (i % 4 + 1)) % 100)}%` : '20%'
                            }}
                          />
                        ))}
                      </div>

                      {/* Faouzia Discography Track List */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/10 mb-2">
                          <span>FAOUZIA DISCOGRAPHY ({tommyData.musicTracks.length} SONGS)</span>
                          <span className="text-[10px] text-purple-400">CLICK ANY TRACK TO STREAM</span>
                        </div>

                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                          {tommyData.musicTracks.map((track, idx) => {
                            const isCurrent = currentTrackIdx === idx;
                            return (
                              <div
                                key={track.id}
                                onClick={() => playTrackAtIndex(idx, true)}
                                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                  isCurrent
                                    ? 'bg-purple-600/25 border-purple-500/60 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-zinc-300'
                                }`}
                              >
                                <div className="flex items-center gap-3 truncate">
                                  {/* Artwork thumbnail */}
                                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-black/60 border border-white/10 relative">
                                    {track.artwork ? (
                                      <img src={track.artwork} alt={track.title} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center font-mono text-[11px] font-bold text-zinc-400">
                                        {idx + 1}
                                      </div>
                                    )}
                                    {isCurrent && isPlayingMusic && (
                                      <div className="absolute inset-0 bg-purple-900/60 flex items-center justify-center">
                                        <Disc3 className="w-4 h-4 text-pink-300 animate-spin" />
                                      </div>
                                    )}
                                  </div>

                                  <div className="truncate">
                                    <div className="font-syne font-bold text-xs truncate flex items-center gap-2">
                                      <span className={isCurrent ? 'text-purple-200' : 'text-white'}>{track.title}</span>
                                      {isCurrent && (
                                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/40 text-purple-200 border border-purple-400/30">
                                          STREAMING
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] font-mono text-zinc-400 truncate">
                                      {track.genre} • {track.bpm}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 font-mono text-xs text-zinc-400 ml-2">
                                  <span>{track.duration}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isCurrent) {
                                        handleTogglePlayMusic();
                                      } else {
                                        playTrackAtIndex(idx, true);
                                      }
                                    }}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                      isCurrent && isPlayingMusic
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-white/10 hover:bg-white/20 text-zinc-300'
                                    }`}
                                  >
                                    {isCurrent && isPlayingMusic ? (
                                      <Pause className="w-3 h-3 fill-white" />
                                    ) : (
                                      <Play className="w-3 h-3 fill-current ml-0.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hidden HTML5 Audio Controller */}
                      <audio
                        ref={audioRef}
                        src={activeAudioSrc}
                        preload="metadata"
                        onTimeUpdate={() => {
                          if (audioRef.current) {
                            setAudioCurrentTime(audioRef.current.currentTime);
                          }
                        }}
                        onLoadedMetadata={() => {
                          if (audioRef.current) {
                            setAudioDuration(audioRef.current.duration);
                          }
                        }}
                        onEnded={handleNextTrack}
                        onError={() => {
                          console.warn('Audio stream error');
                          setAudioError(true);
                          setIsPlayingMusic(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ===================== PHOTO VAULT / GALLERY WINDOW ===================== */}
              {win.id === 'photos' && (
                <div className="space-y-5">
                  {/* Photo Header & Instructions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-pink-400" />
                        <h4 className="text-sm font-syne font-bold text-white uppercase tracking-wider">
                          Tommy&apos;s Visual Vault // Captured Moments
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                        Portraits, Lagos tech, midnight rides, and fitness discipline
                      </p>
                    </div>

                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 text-xs font-mono cursor-pointer transition-all shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>PREVIEW ANY PICTURE</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            sound.playSuccess();
                            const url = URL.createObjectURL(file);
                            setLocalPhotos(prev => ({ ...prev, 'photo-profile': url }));
                          }
                        }} 
                      />
                    </label>
                  </div>

                  {/* Pro-Tip banner */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-2.5 text-xs text-zinc-300 font-mono">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-purple-300 font-bold">PERMANENT PHOTO STORAGE:</span> Drop your downloaded pictures into <code className="text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded">public/images/</code> as <code className="text-white">profile.jpg</code>, <code className="text-white">lagos.jpg</code>, <code className="text-white">motorcycle.jpg</code>, <code className="text-white">gym.jpg</code>, or <code className="text-white">setup.jpg</code>. They will automatically load here!
                    </div>
                  </div>

                  {/* Photos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {tommyData.photoGallery.map((item) => {
                      const displaySrc = localPhotos[item.id] || item.src;
                      return (
                        <div
                          key={item.id}
                          className="group rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 overflow-hidden flex flex-col transition-all duration-200"
                        >
                          {/* Photo Frame Container */}
                          <div className="relative w-full aspect-video bg-black/60 overflow-hidden flex items-center justify-center">
                            <img
                              src={displaySrc}
                              alt={item.title}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.nextSibling;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Fallback Cyber Card when image file is awaiting download */}
                            <div className="hidden w-full h-full p-4 flex-col items-center justify-center text-center bg-gradient-to-b from-purple-950/40 to-black/80">
                              <Image className="w-8 h-8 text-pink-400/60 mb-2" />
                              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{item.category}</span>
                              <span className="text-[11px] font-syne font-bold text-white mt-1">Awaiting {item.src.split('/').pop()}</span>
                            </div>

                            {/* Tag Badge */}
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono text-pink-400">
                              #{item.tag}
                            </div>
                          </div>

                          {/* Details & Pick File Action */}
                          <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                            <div>
                              <h5 className="font-syne font-bold text-xs text-white group-hover:text-pink-300 transition-colors">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                                {item.caption}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[10px] font-mono text-zinc-500">
                                {item.date}
                              </span>

                              <label className="text-[10px] font-mono text-pink-400 hover:text-pink-300 cursor-pointer flex items-center gap-1 hover:underline">
                                <span>Preview Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handlePhotoUpload(item.id, e)}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ===================== QA TEST MATRIX WINDOW ===================== */}
              {win.id === 'qa_matrix' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h4 className="font-mono text-xs font-bold text-cyan-400">
                        E2E SENTINEL &amp; REGRESSION MATRIX
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Live assertions checking frontend stability &amp; race conditions
                      </p>
                    </div>
                    <button
                      onClick={handleRunQA}
                      disabled={isRunningTests}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRunningTests ? 'animate-spin' : ''}`} />
                      <span>{isRunningTests ? 'EXECUTING...' : 'RUN TESTS'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {testResults.map((test) => (
                      <div
                        key={test.id}
                        className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between font-mono text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-zinc-200 truncate">{test.name}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-2">
                          <span className="text-zinc-500 text-[10px]">{test.latency}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            {test.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">OVERALL SUITE STABILITY:</span>
                    <span className="text-cyan-400 font-bold">100% (6/6 SUITES PASSED)</span>
                  </div>
                </div>
              )}

              {/* ===================== BUG ASSASSIN BENCHMARK WINDOW ===================== */}
              {win.id === 'bughunt' && (
                <div className="h-full -m-4 md:-m-6">
                  <BugAssassinGame
                    onOpenContact={onOpenContact}
                    onOpenResume={() => openWindow('resume')}
                  />
                </div>
              )}

              {/* ===================== RESUME VIEWER WINDOW ===================== */}
              {win.id === 'resume' && (
                <div className="h-full -m-4 md:-m-6">
                  <ResumeViewer
                    onOpenContact={onOpenContact}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* BOTTOM OS TASKBAR (Hidden on mobile when an app window is open to prevent overlap) */}
      <div className={`hidden sm:flex fixed bottom-0 left-0 right-0 h-12 bg-[#101018]/90 backdrop-blur-xl border-t border-white/10 px-4 items-center justify-between z-30 font-mono text-xs ${
        isMobile && windows.some(w => w.isOpen && !w.isMinimized) ? 'sm:hidden' : ''
      }`}>
        {/* Start / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>TOMMY OS</span>
          </div>

          {/* Running Windows in Taskbar */}
          <div className="hidden sm:flex items-center gap-1.5">
            {windows.map((w) => (
              <button
                key={w.id}
                onClick={() => (w.isOpen && !w.isMinimized ? toggleMinimize(w.id, { stopPropagation: () => {} }) : openWindow(w.id))}
                className={`px-3 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                  w.isOpen && !w.isMinimized
                    ? 'bg-white/15 border-white/20 text-white font-medium shadow-inner'
                    : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <w.icon className="w-3 h-3 text-emerald-400" />
                <span className="truncate max-w-[100px]">{w.title.split('.')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Tray info */}
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden md:inline text-[11px]">LAGOS KERNEL READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
