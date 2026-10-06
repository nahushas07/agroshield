import React from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import {
  Calendar,
  History,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign
} from 'lucide-react';

export const SeasonMemory: React.FC = () => {
  const { historicalSeasons, language, selectedField } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <History className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.seasonMemoryTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Field Digital Memory
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Cumulative seasonal profile documenting rainfall events navigated, soil tests logged, and nutrient wash-off prevented.
          </p>
        </div>

        <div className="text-xs text-stone-400 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 font-semibold self-start sm:self-auto">
          Field ID: {selectedField.fieldCode}
        </div>
      </div>

      {/* Aggregate Lifetime Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">Total Monitored Seasons</span>
          <span className="text-2xl font-black text-stone-100 mt-1 block">3 Seasons</span>
          <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">2 Verified Soil Tests</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">High-Risk Events Handled</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">12 Cloudburst Events</span>
          <span className="text-[11px] text-stone-300 block mt-0.5">6 Timely Pause Advisories Taken</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">Est. Fertilizer Input Protected</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">₹6,800 Saved</span>
          <span className="text-[11px] text-stone-400 block mt-0.5">Prevented Nutrient Wash-off</span>
        </div>
      </div>

      {/* Seasonal Timeline Cards */}
      <div className="space-y-4">
        {historicalSeasons.map((season, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-stone-700 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-stone-100">
                  {season.seasonCode}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {season.crop}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-300">
                <span>Rainfall: <strong>{season.rainfallTotalMm} mm</strong></span>
                <span>•</span>
                <span>Yield: <strong>{season.yieldQuintalPerAcre} Q/ac</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3 text-[11px]">
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-500 block">Soil Test Status</span>
                <span className={`font-bold ${season.soilTestCompleted ? 'text-emerald-400' : 'text-stone-500'}`}>
                  {season.soilTestCompleted ? 'Certified & Logged' : 'Not Conducted'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-500 block">High Runoff Days</span>
                <span className="font-bold text-amber-400">{season.highRiskEventsCount} Days</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-500 block">Prevented Applications</span>
                <span className="font-bold text-sky-400">{season.preventedRunoffApplications} Interventions</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-stone-500 block">Erosion Risk</span>
                <span className="font-bold text-stone-200">Controlled (Bunded)</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 italic pt-2 border-t border-stone-900">
              "{season.notes}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
