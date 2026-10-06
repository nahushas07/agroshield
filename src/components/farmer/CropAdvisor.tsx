import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { DEMO_CROPS } from '../../data/demoData';
import { TRANSLATIONS } from '../../translations';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Droplets,
  Calendar,
  Compass,
  HelpCircle
} from 'lucide-react';

export const CropAdvisor: React.FC = () => {
  const { selectedField, language, openExplainModal } = useApp();
  const t = TRANSLATIONS[language];
  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const activeCrop = DEMO_CROPS[selectedCropIndex];

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sprout className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.cropAdvisorTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Agronomic Modeling
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Indicative crop suitability matrix and companion intercropping planner aligned with field slope and loamy soil characteristics.
          </p>
        </div>

        <button
          onClick={() =>
            openExplainModal(
              'Crop Suitability Assessment Criteria',
              [
                'Suitability is determined from soil pH (6.8), organic carbon (0.72%), infiltration rate (14.5 mm/hr), and terrain slope (3.8%).',
                'Companion combinations favor nitrogen-fixing legumes and erosion-resilient ground covers to protect field topsoil from runoff washing.',
                'AgroShield does NOT guarantee crop yield, profit margins, or market pricing.',
                'Suitability is an indicative decision-support result. Consult local Krishi Vigyan Kendra (KVK) guidance.'
              ],
              'Agro-climatic zone: Southern Dry Zone of Karnataka (Zone 6).'
            )
          }
          className="self-start sm:self-center text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
          <span>Evaluation Criteria</span>
        </button>
      </div>

      {/* Crop Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        {DEMO_CROPS.map((c, idx) => (
          <button
            key={c.cropName}
            onClick={() => setSelectedCropIndex(idx)}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedCropIndex === idx
                ? 'bg-stone-800 border-emerald-500 text-stone-100 shadow-lg ring-1 ring-emerald-500/40'
                : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                {c.suitability} SUITABILITY
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-stone-100 mt-1">
              {c.cropName}
            </h4>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {c.season}
            </span>
          </button>
        ))}
      </div>

      {/* Active Crop Deep Dive Card */}
      <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-stone-100">
                {activeCrop.cropName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                Suitability: {activeCrop.suitability}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Duration: {activeCrop.durationDays} • Water Need: {activeCrop.waterRequirement}
            </p>
          </div>

          <div className="text-xs text-stone-400 italic">
            * Suitability is an indicative decision-support result.
          </div>
        </div>

        {/* Soil Fit Description */}
        <div className="my-4 p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 leading-relaxed">
          <strong className="text-emerald-400 block mb-1">Field Agronomic Compatibility:</strong>
          {activeCrop.soilFitReason}
        </div>

        {/* MIXED / INTERCROPPING COMPANION PLANNER */}
        {activeCrop.companionOption && (
          <div className="mt-5 pt-5 border-t border-stone-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Mixed / Companion Intercropping Planner
              </h5>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 via-stone-900 to-stone-950 border border-amber-800/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="font-bold text-stone-100 text-sm">
                  Recommended Companion: <span className="text-amber-300">{activeCrop.companionOption.companionCrop}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700 self-start sm:self-auto">
                  {activeCrop.companionOption.compatibility}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mt-1">
                {activeCrop.companionOption.ecologicalBenefit}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400">
                <div>
                  <span className="block text-stone-500 font-semibold">Rooting Zone Synergy</span>
                  <span className="text-stone-300">Differential depth avoids nutrient competition</span>
                </div>
                <div>
                  <span className="block text-stone-500 font-semibold">Runoff Velocity Reduction</span>
                  <span className="text-emerald-400 font-bold">~28% - 35% less surface wash</span>
                </div>
                <div>
                  <span className="block text-stone-500 font-semibold">Biological N-Fixation</span>
                  <span className="text-stone-300">Natural soil replenishment</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 text-[10px] text-stone-500 italic">
          AgroShield recommendations are advisory only. Does not guarantee yield or financial returns. Always follow official package of practices published by the Department of Agriculture.
        </div>
      </div>
    </div>
  );
};
