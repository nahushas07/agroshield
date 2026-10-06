import React from 'react';
import { useApp } from '../../services/store';
import {
  ShieldCheck,
  Compass,
  ArrowRight,
  CloudRain,
  Droplets,
  Sprout,
  Activity,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface LandingHeroProps {
  onExploreDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onExploreDemo }) => {
  const { setGuidedTourOpen } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-10 mb-8 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Watershed-Aware Agricultural Decision Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-stone-100 tracking-tight leading-tight">
          AGROSHIELD
          <span className="block text-xl sm:text-2xl font-normal text-emerald-400 mt-2">
            “From the field to the watershed.”
          </span>
        </h1>

        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Field-specific agricultural intelligence for timely, preventive and sustainable decisions. Connecting registered field boundaries, soil chemistry, Doppler rainfall forecasts, and topographic slope into predictive runoff decision support.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreDemo}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black text-sm shadow-xl shadow-emerald-950/40 transition active:scale-95 flex items-center gap-2"
          >
            <span>Explore Farmer Intelligence</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setGuidedTourOpen(true)}
            className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm border border-stone-700 transition active:scale-95 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>2-Min Judge Demo Tour</span>
          </button>
        </div>

        {/* Multi-Component Connected Architecture Hero Visual */}
        <div className="mt-8 pt-8 border-t border-stone-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
            Core 4-Pillar Decision Intelligence Engine
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left text-xs">
            {/* Pillar 1: Field Map */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <Layers className="w-4 h-4" />
                <span>1. Field Digital Twin</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Sy. 142/3A Mandya • 2.4 ac • Loamy pH 6.8 • 3.8% slope vector
              </p>
            </div>

            {/* Pillar 2: Weather Radar */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <div className="flex items-center gap-2 text-sky-400 font-bold mb-1">
                <CloudRain className="w-4 h-4" />
                <span>2. Doppler Rainfall</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                16.4 mm/hr convective storm incoming • 76% antecedent soil moisture
              </p>
            </div>

            {/* Pillar 3: Runoff Risk Estimation */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-amber-800/70">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                <Activity className="w-4 h-4" />
                <span>3. Runoff Risk Model</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Score: <strong>78/100 (HIGH)</strong> • Potential furrow transport to canal
              </p>
            </div>

            {/* Pillar 4: Farmer Decision */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-emerald-800/70">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>4. Preventive Decision</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                <strong>High Caution:</strong> Pause 2:00 PM fertilizer; apply tomorrow 8:00 AM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
