import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import { HourlyRiskPoint } from '../../types';
import {
  Clock,
  CloudRain,
  Droplets,
  Mountain,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Activity
} from 'lucide-react';

export const RunoffRiskClock: React.FC = () => {
  const { currentRiskAssessment, language, openExplainModal } = useApp();
  const t = TRANSLATIONS[language];
  const timeline = currentRiskAssessment.hourlyTimeline;

  // Selected hour index (defaults to index 2: 2:00 PM peak)
  const [selectedIndex, setSelectedIndex] = useState<number>(2);
  const activePoint: HourlyRiskPoint = timeline[selectedIndex] || timeline[0];

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'VERY_HIGH':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'MODERATE':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'LOW':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    }
  };

  const getBarColor = (score: number) => {
    if (score >= 76) return 'from-rose-600 to-rose-400';
    if (score >= 51) return 'from-amber-600 to-amber-400';
    if (score >= 26) return 'from-yellow-600 to-yellow-400';
    return 'from-emerald-600 to-emerald-400';
  };

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl backdrop-blur-sm">
      {/* Title & Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.dynamicRiskClockTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Interactive Scrubber
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            {t.dynamicRiskClockSubtitle} Tap any time interval to inspect conditions and application viability.
          </p>
        </div>

        <button
          onClick={() =>
            openExplainModal(
              'Dynamic Runoff Risk Clock Mechanics',
              [
                'The clock models continuous hour-by-hour infiltration dynamics based on radar rainfall progression.',
                'Antecedent moisture builds with every millimeter of rain, decreasing the soils remaining infiltration capacity.',
                'Field slope accelerates surface runoff velocity once infiltration rate is exceeded.',
                'Use favorable green windows (Low to Moderate) for fertilizer or pest management application.'
              ],
              'Prototype Runoff Risk Model. Validated against synthetic Doppler radar intervals for Mandya district.'
            )
          }
          className="self-start sm:self-center text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
          <span>How is this calculated?</span>
        </button>
      </div>

      {/* Horizontal Interactive Timeline Strip */}
      <div className="relative pt-3 pb-6 border-b border-stone-800/80">
        <div className="grid grid-cols-6 gap-2 sm:gap-3">
          {timeline.map((point, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={point.timeLabel}
                onClick={() => setSelectedIndex(idx)}
                className={`relative flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition-all text-center group cursor-pointer ${
                  isSelected
                    ? 'bg-stone-800 border-amber-500/80 shadow-lg shadow-stone-950 scale-[1.03] z-10'
                    : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-800/60 hover:border-stone-700'
                }`}
              >
                {/* Active Indicator Arrow */}
                {isSelected && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-400 rotate-45 rounded-xs" />
                )}

                {/* Time Label */}
                <span className={`text-[11px] sm:text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-stone-300'}`}>
                  {point.timeLabel}
                </span>

                {/* Risk Score Visual Bar */}
                <div className="w-full bg-stone-900 rounded-full h-2 my-2 overflow-hidden border border-stone-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getBarColor(point.riskScore)} transition-all duration-500`}
                    style={{ width: `${Math.max(10, point.riskScore)}%` }}
                  />
                </div>

                {/* Risk Level Chip */}
                <span className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold border tracking-wider uppercase ${getRiskBadge(point.riskLevel)}`}>
                  {point.riskLevel === 'VERY_HIGH' ? 'V. HIGH' : point.riskLevel}
                </span>

                {/* Rain forecast preview */}
                <div className="flex items-center gap-0.5 mt-1.5 text-[10px] text-stone-400">
                  <CloudRain className="w-3 h-3 text-sky-400" />
                  <span>{point.rainForecastMm} mm</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Time Deep Dive Card */}
      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-stone-950/80 border border-stone-800/90 shadow-inner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-700/80 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Inspected Time Window
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-100 flex items-center gap-2">
                <span>{activePoint.timeLabel}</span>
                <span className="text-stone-500">•</span>
                <span className={`text-base sm:text-lg font-bold px-2.5 py-0.5 rounded-lg border ${getRiskBadge(activePoint.riskLevel)}`}>
                  RUNOFF RISK: {activePoint.riskLevel} ({activePoint.riskScore}/100)
                </span>
              </div>
            </div>
          </div>

          {/* Operational Feasibility Stamp */}
          <div className="flex items-center gap-2">
            {activePoint.isFavorableForApplication ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/70 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Application Window Feasible</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-700/70 text-rose-300 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Caution: Pausing Recommended</span>
              </div>
            )}
          </div>
        </div>

        {/* Reasons & Factors Contributing to this hour */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Driving Conditions at {activePoint.timeLabel}:
            </h4>
            <ul className="space-y-2">
              {activePoint.primaryDrivers.map((driver, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{driver}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-stone-400">
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="block text-stone-500">Hourly Rain</span>
                <span className="font-bold text-sky-400">{activePoint.rainForecastMm} mm</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="block text-stone-500">Est. Topsoil Saturation</span>
                <span className="font-bold text-cyan-400">{activePoint.soilMoistureEstPercent}%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2.5 flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              Field Operational Recommendation:
            </h4>
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs text-stone-200 leading-relaxed">
              {activePoint.recommendation}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
              <span className="font-semibold text-stone-300">Runoff Protection Rule: </span>
              “Risk is an estimate based on available weather, field and terrain information. Always follow local agricultural guidance.”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
