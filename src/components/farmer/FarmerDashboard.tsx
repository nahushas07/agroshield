import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import { RunoffRiskHero } from './RunoffRiskHero';
import { RunoffRiskClock } from './RunoffRiskClock';
import { BeforeYouApply } from './BeforeYouApply';
import { FieldDigitalTwin } from './FieldDigitalTwin';
import { WatershedImpactView } from './WatershedImpactView';
import { SoilTestTracker } from './SoilTestTracker';
import { CropAdvisor } from './CropAdvisor';
import { NutrientIntelligence } from './NutrientIntelligence';
import { WeatherCenter } from './WeatherCenter';
import { SeasonMemory } from './SeasonMemory';
import { SmartAlertsList } from './SmartAlertsList';
import { FarmerEasyMode } from './FarmerEasyMode';
import {
  Compass,
  MapPin,
  Clock,
  Sprout,
  Waves,
  FileText,
  CloudRain,
  History,
  Scale,
  Bell,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface FarmerDashboardProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  activeTab,
  onNavigateTab,
}) => {
  const { selectedField, language, isEasyMode, toggleEasyMode } = useApp();
  const t = TRANSLATIONS[language];

  // Navigation Items for Farmer Desktop & Mobile Tabs
  const navTabs = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'risk-clock', label: 'Risk Clock', icon: Clock },
    { id: 'before-apply', label: 'Before-You-Apply', icon: Sprout },
    { id: 'field', label: t.navField, icon: MapPin },
    { id: 'watershed-view', label: t.navWatershed, icon: Waves },
    { id: 'weather', label: t.navWeather, icon: CloudRain },
    { id: 'soil', label: t.navSoil, icon: FileText },
    { id: 'crop-advisor', label: t.navAdvisory, icon: Sparkles },
    { id: 'nutrients', label: 'Nutrients', icon: Scale },
    { id: 'seasons', label: 'History', icon: History },
    { id: 'alerts', label: t.navAlerts, icon: Bell },
  ];

  if (isEasyMode) {
    return <FarmerEasyMode onNavigateTab={onNavigateTab} />;
  }

  return (
    <div className="space-y-6">
      {/* Farmer Greeting & Field Context Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            {t.greetingFarmer}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <h2 className="text-lg sm:text-xl font-black text-stone-100">
              {t.selectedFieldLabel}: <span className="text-emerald-400">{selectedField.fieldCode}</span>
            </h2>
            <span className="text-stone-500">•</span>
            <span className="text-xs text-stone-300">
              {selectedField.location.village}, {selectedField.location.district}
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-xs font-bold text-stone-300">
              {selectedField.areaAcres} Acres ({selectedField.currentCrop})
            </span>
          </div>
        </div>

        {/* Quick Easy Mode Switch */}
        <button
          onClick={toggleEasyMode}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 transition"
        >
          <ToggleLeft className="w-4 h-4 text-amber-400" />
          <span>Switch to Easy Mode</span>
        </button>
      </div>

      {/* Sub-Navigation Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {navTabs.map(tab => {
          const IconC = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigateTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-stone-950 font-bold shadow-md shadow-emerald-950/40'
                  : 'bg-stone-900/80 text-stone-400 border border-stone-800/80 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <IconC className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* View Content Switching */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          {/* Main Hero: Current Runoff Risk Indicator */}
          <RunoffRiskHero />

          {/* Signature Feature 1: Dynamic Runoff Risk Clock */}
          <RunoffRiskClock />

          {/* Signature Feature 2: Before-You-Apply Check */}
          <BeforeYouApply />

          {/* Field Digital Twin Preview */}
          <FieldDigitalTwin />

          {/* Watershed Impact Preview */}
          <WatershedImpactView />
        </div>
      )}

      {activeTab === 'risk-clock' && <RunoffRiskClock />}
      {activeTab === 'before-apply' && <BeforeYouApply />}
      {activeTab === 'field' && <FieldDigitalTwin />}
      {activeTab === 'watershed-view' && <WatershedImpactView />}
      {activeTab === 'weather' && <WeatherCenter />}
      {activeTab === 'soil' && <SoilTestTracker />}
      {activeTab === 'crop-advisor' && <CropAdvisor />}
      {activeTab === 'nutrients' && <NutrientIntelligence />}
      {activeTab === 'seasons' && <SeasonMemory />}
      {activeTab === 'alerts' && <SmartAlertsList onNavigateTab={onNavigateTab} />}
    </div>
  );
};
