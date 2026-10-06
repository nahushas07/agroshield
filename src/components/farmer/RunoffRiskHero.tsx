import React from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import {
  AlertTriangle,
  Info,
  CloudRain,
  Droplets,
  Mountain,
  Waves,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

export const RunoffRiskHero: React.FC = () => {
  const { currentRiskAssessment, selectedField, language, openExplainModal } = useApp();
  const t = TRANSLATIONS[language];

  const score = currentRiskAssessment.overallScore;
  const level = currentRiskAssessment.level;

  const getLevelColor = () => {
    switch (level) {
      case 'VERY_HIGH':
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-800/80',
          text: 'text-rose-400',
          badge: 'bg-rose-900/60 text-rose-200 border-rose-700',
          glow: 'shadow-rose-950/50',
          bar: 'bg-rose-500',
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-950/40',
          border: 'border-amber-700/80',
          text: 'text-amber-400',
          badge: 'bg-amber-900/60 text-amber-200 border-amber-600',
          glow: 'shadow-amber-950/50',
          bar: 'bg-amber-500',
        };
      case 'MODERATE':
        return {
          bg: 'bg-yellow-950/40',
          border: 'border-yellow-700/70',
          text: 'text-yellow-400',
          badge: 'bg-yellow-900/60 text-yellow-200 border-yellow-600',
          glow: 'shadow-yellow-950/40',
          bar: 'bg-yellow-500',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-700/70',
          text: 'text-emerald-400',
          badge: 'bg-emerald-900/60 text-emerald-200 border-emerald-600',
          glow: 'shadow-emerald-950/40',
          bar: 'bg-emerald-500',
        };
    }
  };

  const colors = getLevelColor();

  const handleExplainClick = () => {
    openExplainModal(
      `CURRENT RUNOFF RISK: ${level} (${score}/100)`,
      currentRiskAssessment.whyExplanation,
      'Runoff potential is calculated using the AgroShield Prototype Risk Model combining incoming Doppler rainfall rate (35%), antecedent soil moisture deficit (25%), topographic slope acceleration (20%), and downstream watershed drainage proximity (12%).'
    );
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border ${colors.border} ${colors.bg} p-6 sm:p-7 shadow-xl ${colors.glow} backdrop-blur-sm transition-all duration-300`}>
      {/* Background Topographic Water Ripple Effect */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-amber-500/30 bg-amber-500/10 text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              {t.currentRunoffRisk}
            </span>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Updated 8 mins ago • Doppler Synced
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight mt-1.5 flex items-baseline gap-3">
            <span>{level}</span>
            <span className="text-lg sm:text-xl font-normal text-stone-400">
              Score <strong className="text-stone-100 font-bold">{score}</strong>/100
            </span>
          </h2>
        </div>

        <button
          onClick={handleExplainClick}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 hover:border-amber-500/50 transition-all shadow-md active:scale-95 group"
        >
          <Info className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>{t.explainWhyBtn}</span>
        </button>
      </div>

      {/* Central Visual: Field & Watershed Hydro-Terrain Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
        {/* Left: Custom Watershed Terrain Risk Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-stone-950/60 rounded-2xl border border-stone-800/60">
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* Concentric Watershed Infiltration Contours */}
            <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
              {/* Outer boundary circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#292524"
                strokeWidth="8"
              />
              {/* Active risk arc */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={score >= 75 ? '#f43f5e' : score >= 50 ? '#f59e0b' : '#10b981'}
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 440} 440`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />

              {/* Inner soil moisture contour */}
              <circle
                cx="80"
                cy="80"
                r="54"
                fill="none"
                stroke="#1c1917"
                strokeWidth="5"
              />
              <circle
                cx="80"
                cy="80"
                r="54"
                fill="none"
                stroke="#0284c7"
                strokeWidth="5"
                strokeDasharray={`${(0.76) * 339} 339`}
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Terrain slope indicator arc */}
              <circle
                cx="80"
                cy="80"
                r="40"
                fill="none"
                stroke="#d97706"
                strokeWidth="4"
                strokeDasharray="60 250"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>

            {/* Central Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-400">
                Runoff Index
              </span>
              <span className={`text-4xl font-black ${colors.text} tracking-tight`}>
                {score}
              </span>
              <span className="text-[11px] font-medium text-stone-300">
                {level}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-[10px] text-stone-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Runoff: {score}%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" /> Saturation: 76%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-600" /> Slope: 3.8%
            </span>
          </div>
        </div>

        {/* Right: Key Contributing Terrain & Weather Drivers */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-sm font-semibold text-stone-200">
            Primary Factors Influencing Field Runoff Potential:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Factor 1: Rain */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
              <div className="flex items-center justify-between text-stone-300 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <CloudRain className="w-3.5 h-3.5" />
                  Rain Intensity
                </span>
                <span className="text-amber-400 font-bold">16.4 mm/hr</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Convective cell approaching Mandya North with high drop-kinetic energy.
              </p>
            </div>

            {/* Factor 2: Soil Moisture */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
              <div className="flex items-center justify-between text-stone-300 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Droplets className="w-3.5 h-3.5" />
                  Topsoil Moisture
                </span>
                <span className="text-amber-400 font-bold">76% Saturated</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Recent 24h rainfall filled pore space; water infiltration headroom is depleted.
              </p>
            </div>

            {/* Factor 3: Slope */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
              <div className="flex items-center justify-between text-stone-300 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Mountain className="w-3.5 h-3.5" />
                  Field Gradient
                </span>
                <span className="text-amber-300 font-bold">3.8% (SE Aspect)</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Gravity accelerates surface flow velocity toward the lowest corner bund.
              </p>
            </div>

            {/* Factor 4: Catchment Proximity */}
            <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
              <div className="flex items-center justify-between text-stone-300 font-medium mb-1">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Waves className="w-3.5 h-3.5" />
                  Drainage Link
                </span>
                <span className="text-stone-300 font-bold">180m to Canal</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Connected via natural agricultural furrow to Visvesvaraya feeder system.
              </p>
            </div>
          </div>

          {/* Actionable Bottom Callout */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-amber-200">Decision Advisory: </span>
              <span className="text-stone-300">
                Postpone foliar sprays and broadcast fertilizer. Surface sheet flow could wash inputs before root uptake. Check the
              </span>{' '}
              <strong className="text-amber-300 underline cursor-pointer" onClick={handleExplainClick}>
                Runoff Risk Clock
              </strong>{' '}
              <span className="text-stone-300">for safe windows.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Disclaimer Footer */}
      <div className="pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-stone-400 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
          <span>
            {t.riskStatusHeadline}
          </span>
        </div>
        <span className="italic text-[10px] text-stone-400">
          * Prototype Runoff Risk Model. Decision support only. Does not measure exact chemical transport.
        </span>
      </div>
    </div>
  );
};
