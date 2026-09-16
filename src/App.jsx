import React, { useState } from 'react';
import CinematicIntro from './components/intro/CinematicIntro';
import WorldMapHub from './components/map/WorldMapHub';
import TeleporterDock from './components/common/TeleporterDock';
import ContactModal from './components/common/ContactModal';
import TommyOS from './components/os/TommyOS';
import TheZine from './components/zine/TheZine';
import TheTerminal from './components/terminal/TheTerminal';
import TheVoid from './components/void/TheVoid';
import { Analytics } from "@vercel/analytics/next";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeZone, setActiveZone] = useState('hub');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans relative selection:bg-[#00ff88] selection:text-black">
      {showIntro ? (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          {/* Global Teleporter Dock and Telemetry Bar */}
          <TeleporterDock
            activeZone={activeZone}
            setActiveZone={setActiveZone}
            onOpenContact={() => setIsContactOpen(true)}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
          />

          {/* Active Zone Display */}
          <main>
            {activeZone === 'hub' && (
              <WorldMapHub onSelectZone={(zoneId) => setActiveZone(zoneId)} />
            )}
            {activeZone === 'os' && (
              <TommyOS onOpenContact={() => setIsContactOpen(true)} />
            )}
            {activeZone === 'zine' && <TheZine />}
            {activeZone === 'terminal' && (
              <TheTerminal
                onNavigateZone={(zoneId) => setActiveZone(zoneId)}
                onOpenContact={() => setIsContactOpen(true)}
              />
            )}
            {activeZone === 'void' && <TheVoid />}
          </main>

          {/* Contact & Transmission Modal */}
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </>
      )}
    </div>
  );
}
