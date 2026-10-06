import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import { evaluateBeforeYouApply } from '../../services/riskEngine';
import { BeforeYouApplyResult } from '../../types';
import {
  ShieldAlert,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  ArrowRight,
  Sprout,
  HelpCircle,
  CalendarCheck,
  Droplet
} from 'lucide-react';

export const BeforeYouApply: React.FC = () => {
  const { selectedField, language, openExplainModal } = useApp();
  const t = TRANSLATIONS[language];

  // Form selections
  const [crop, setCrop] = useState<string>('Paddy');
  const [activity, setActivity] = useState<string>('Fertilizer application');
  const [plannedTime, setPlannedTime] = useState<string>('Today, 2:00 PM');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Initial evaluation
  const [result, setResult] = useState<BeforeYouApplyResult>(() =>
    evaluateBeforeYouApply(selectedField, crop, activity, plannedTime)
  );

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const res = evaluateBeforeYouApply(selectedField, crop, activity, plannedTime);
      setResult(res);
      setIsEvaluating(false);
      setHasEvaluated(true);
    }, 450);
  };

  const getStatusBanner = () => {
    if (result.decision === 'CAUTION_HIGH') {
      return {
        bg: 'bg-rose-950/40 border-rose-800/80',
        badge: 'bg-rose-900/60 text-rose-200 border-rose-700',
        text: 'text-rose-400',
        icon: AlertOctagon,
      };
    }
    if (result.decision === 'CAUTION_MODERATE') {
      return {
        bg: 'bg-amber-950/40 border-amber-800/80',
        badge: 'bg-amber-900/60 text-amber-200 border-amber-700',
        text: 'text-amber-400',
        icon: ShieldAlert,
      };
    }
    return {
      bg: 'bg-emerald-950/40 border-emerald-800/80',
      badge: 'bg-emerald-900/60 text-emerald-200 border-emerald-700',
      text: 'text-emerald-400',
      icon: CheckCircle2,
    };
  };

  const banner = getStatusBanner();
  const IconComponent = banner.icon;

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sprout className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.beforeYouApplyTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Decision Support
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            {t.beforeYouApplySubtitle}
          </p>
        </div>

        <button
          onClick={() =>
            openExplainModal(
              'Before-You-Apply Decision Support Rules',
              [
                'AgroShield checks whether incoming rainfall could exceed soil infiltration before nutrients or sprays stabilize.',
                'Prevents wasteful chemical runoff into water bodies and saves farmer expenditure.',
                'Evaluates 5 physical parameters: Rainfall forecast, soil saturation, slope aspect, drainage connection, and product contact requirements.',
                'Decision support only. Always inspect crop state, local conditions, and official label guidelines.'
              ],
              'Precipitation intensity thresholds calibrated for Mandya red loam and black soil profiles.'
            )
          }
          className="self-start sm:self-center text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
          <span>Decision Logic</span>
        </button>
      </div>

      {/* Input Selection Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
        {/* Crop Selection */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Crop
          </label>
          <select
            value={crop}
            onChange={e => setCrop(e.target.value)}
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="Paddy">Paddy (Wetland Rice)</option>
            <option value="Sugarcane">Sugarcane (Ratoon / Planted)</option>
            <option value="Finger Millet">Finger Millet (Ragi)</option>
            <option value="Maize">Maize (Hybrid)</option>
            <option value="Pulses">Pulses (Red gram / Black gram)</option>
          </select>
        </div>

        {/* Activity Selection */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Planned Activity
          </label>
          <select
            value={activity}
            onChange={e => setActivity(e.target.value)}
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="Fertilizer application">Fertilizer application (Urea / DAP broadcast)</option>
            <option value="Foliar spray">Foliar micronutrient / Bio-stimulant spray</option>
            <option value="Herbicide application">Pre/Post-emergence Herbicide</option>
            <option value="Pesticide spray">Approved Pesticide / Fungicide spray</option>
            <option value="Inter-cultivation tillage">Inter-cultivation weeding / tillage</option>
            <option value="Canal irrigation">Canal Sluice Flood Irrigation</option>
          </select>
        </div>

        {/* Planned Time */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Planned Time Window
          </label>
          <select
            value={plannedTime}
            onChange={e => setPlannedTime(e.target.value)}
            className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="Today, 2:00 PM">Today, 2:00 PM (Incoming storm forecast)</option>
            <option value="Today, 5:00 PM">Today, 5:00 PM (Post-shower window)</option>
            <option value="Tomorrow, 8:00 AM">Tomorrow, 8:00 AM (Clear morning forecast)</option>
            <option value="Tomorrow, 2:00 PM">Tomorrow, 2:00 PM (Partly cloudy)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleRunEvaluation}
          disabled={isEvaluating}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs shadow-lg transition active:scale-95 disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Hydrology & Radar...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{t.checkActivityBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Decision Results Box */}
      {hasEvaluated && (
        <div className={`p-6 rounded-2xl border ${banner.bg} shadow-lg transition-all`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${banner.badge} border`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${banner.badge}`}>
                  {result.decisionTitle}
                </span>
                <h4 className="text-xl font-black text-stone-100 tracking-tight mt-1">
                  {result.summaryMessage}
                </h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                Activity Risk Index
              </span>
              <span className={`text-2xl font-black ${banner.text}`}>
                {result.riskScore}/100
              </span>
            </div>
          </div>

          {/* Evaluated Conditions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4 text-[11px]">
            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="block text-stone-500">Forecast Rain (Next 6h)</span>
              <span className="font-semibold text-stone-200">{result.evaluatedConditions.forecastRainNext6h}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="block text-stone-500">Soil Saturation</span>
              <span className="font-semibold text-stone-200">{result.evaluatedConditions.soilSaturationEstimate}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="block text-stone-500">Field Slope Factor</span>
              <span className="font-semibold text-stone-200">{result.evaluatedConditions.fieldSlopeRisk}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800">
              <span className="block text-stone-500">Watershed Transport</span>
              <span className="font-semibold text-stone-200">{result.evaluatedConditions.runoffPotential}</span>
            </div>
          </div>

          {/* WHY? Breakdown */}
          <div className="mt-4 pt-4 border-t border-stone-800/80">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>WHY? Detailed Environmental Reasons:</span>
            </h5>
            <ul className="space-y-1.5 pl-1">
              {result.whyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Alternative Recommendation */}
          <div className="mt-5 p-4 rounded-xl bg-stone-900 border border-emerald-800/50 flex items-start gap-3">
            <CalendarCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                Suggested Alternative Window:
              </span>
              <p className="text-xs text-stone-200 mt-0.5 leading-relaxed">
                {result.safeAlternativeWindow}
              </p>
            </div>
          </div>

          {/* Mandatory Disclaimer Callout */}
          <div className="mt-4 text-[10px] text-stone-400 flex items-start gap-1.5 italic">
            <ShieldAlert className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span>{result.advisoryNote}</span>
          </div>
        </div>
      )}
    </div>
  );
};
