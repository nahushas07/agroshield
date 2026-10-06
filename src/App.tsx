import React, { useState } from 'react';
import { AppProvider, useApp } from './services/store';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingHero } from './components/landing/LandingHero';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { FieldVisitorPortal } from './components/visitor/FieldVisitorPortal';
import { LaboratoryPortal } from './components/lab/LaboratoryPortal';
import { AgriculturalOfficerDashboard } from './components/officer/AgriculturalOfficerDashboard';
import { AdminPortal } from './components/admin/AdminPortal';
import { ExplainWhyModal } from './components/common/ExplainWhyModal';
import { GuidedTourModal } from './components/common/GuidedTourModal';
import { LegalModal } from './components/common/LegalModal';
import {
  Compass,
  MapPin,
  CloudRain,
  Sprout,
  Mic,
  Bell,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

function AppContent() {
  const { role, toggleEasyMode, isEasyMode, alerts } = useApp();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showLandingBanner, setShowLandingBanner] = useState<boolean>(true);

  const unreadAlerts = alerts.filter(a => !a.read).length;

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950 pb-20 md:pb-0">
      {/* Top Header */}
      <Header onNavigateTab={handleNavigateTab} activeTab={activeTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 pb-8">
        {/* Landing Hero banner for judges */}
        {showLandingBanner && role === 'FARMER' && activeTab === 'home' && (
          <div className="relative">
            <button
              onClick={() => setShowLandingBanner(false)}
              className="absolute top-4 right-4 z-20 px-2 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold border border-stone-700"
              title="Hide introductory banner"
            >
              Dismiss Header Banner ✕
            </button>
            <LandingHero onExploreDemo={() => setShowLandingBanner(false)} />
          </div>
        )}

        {/* Dynamic Role Views */}
        {role === 'FARMER' && (
          <FarmerDashboard activeTab={activeTab} onNavigateTab={handleNavigateTab} />
        )}

        {role === 'FIELD_VISITOR' && <FieldVisitorPortal />}

        {role === 'LAB_TECHNICIAN' && <LaboratoryPortal />}

        {role === 'AGRICULTURAL_OFFICER' && <AgriculturalOfficerDashboard />}

        {role === 'ADMIN' && <AdminPortal />}
      </main>

      {/* Global Modals */}
      <ExplainWhyModal />
      <GuidedTourModal onNavigateTab={handleNavigateTab} />
      <LegalModal />

      {/* Footer */}
      <Footer />

      {/* Farmer Mobile Bottom Navigation Bar (Visible only on mobile for Farmer) */}
      {role === 'FARMER' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 py-1.5 px-3 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => handleNavigateTab('home')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              activeTab === 'home' ? 'text-emerald-400' : 'text-stone-400'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavigateTab('field')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              activeTab === 'field' ? 'text-emerald-400' : 'text-stone-400'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>My Field</span>
          </button>

          {/* Prominent Center Voice Action Button */}
          <button
            onClick={toggleEasyMode}
            className="flex flex-col items-center -mt-4 bg-emerald-600 hover:bg-emerald-500 text-stone-950 p-3 rounded-full shadow-lg shadow-emerald-950/80 border-2 border-stone-950 active:scale-95 transition"
            title="Ask AgroShield"
          >
            <Mic className="w-5 h-5 fill-stone-950" />
          </button>

          <button
            onClick={() => handleNavigateTab('weather')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
              activeTab === 'weather' ? 'text-emerald-400' : 'text-stone-400'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>Weather</span>
          </button>

          <button
            onClick={() => handleNavigateTab('alerts')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold relative transition ${
              activeTab === 'alerts' ? 'text-emerald-400' : 'text-stone-400'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
            {unreadAlerts > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </nav>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
