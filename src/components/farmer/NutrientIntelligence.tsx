import React from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import {
  FileText,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Droplet,
  Info,
  Scale
} from 'lucide-react';

export const NutrientIntelligence: React.FC = () => {
  const { selectedField, language, openExplainModal } = useApp();
  const t = TRANSLATIONS[language];
  const soil = selectedField.soil;

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scale className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.nutrientIntelligenceTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Balancing & Runoff Safeguard
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Targeted macro & micronutrient balancing aligned with current crop stage ({selectedField.cropStage}) and soil tests.
          </p>
        </div>

        <button
          onClick={() =>
            openExplainModal(
              'Nutrient Balancing & Environmental Safety',
              [
                'Excess applied chemical phosphorus does not leach easily; it binds to soil particles and washes into waterways during heavy runoff, triggering algal blooms.',
                'Because this field has HIGH available phosphorus (28.4 kg/ha), phosphatic fertilization should be reduced by 20% to save costs and protect the watershed.',
                'Nitrogen is in the MEDIUM bracket: split applications prevent sudden leaching and surface wash-off.',
                'Always follow the approved product label and local agricultural guidance.'
              ],
              'Derived from the ICAR Nutrient Management Handbook for Mandya District.'
            )
          }
          className="self-start sm:self-center text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 transition"
        >
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Why this balance?</span>
        </button>
      </div>

      {/* Visual N-P-K Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {/* Nitrogen Card */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Nitrogen (N)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              {soil.nitrogenStatus} (242 kg/ha)
            </span>
          </div>
          <div className="my-3">
            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-800">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '55%' }} />
            </div>
          </div>
          <p className="text-[11px] text-stone-400 leading-snug">
            Sufficient for vegetative tillering. Avoid single heavy broadcast. Prefer 3 equal splits to curb nitrogen washing during rains.
          </p>
        </div>

        {/* Phosphorus Card (Highlighting High Status) */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-amber-800/60 ring-1 ring-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Phosphorus (P)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700">
              HIGH (28.4 kg/ha)
            </span>
          </div>
          <div className="my-3">
            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-800">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
          <p className="text-[11px] text-amber-200/80 leading-snug">
            <strong>Caution: </strong>Field has surplus phosphorus. Reduce basal DAP/SSP by 20%. Prevents accumulation and runoff into Visvesvaraya canal.
          </p>
        </div>

        {/* Potassium Card */}
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Potassium (K)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              {soil.potassiumStatus} (185 kg/ha)
            </span>
          </div>
          <div className="my-3">
            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden border border-stone-800">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          <p className="text-[11px] text-stone-400 leading-snug">
            Balanced potassium supports cell wall strength and lodging resistance during high-wind rainfall events.
          </p>
        </div>
      </div>

      {/* Crop Nutrient Considerations */}
      <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Crop Nutrient Considerations for {selectedField.currentCrop}</span>
        </h4>

        <div className="space-y-2 text-xs text-stone-300">
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-stone-100">Tillering Stage Protocol: </strong>
              Apply 35 kg Urea per acre only when topsoil is moist but without standing flood water flowing over perimeter bunds.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-stone-100">Phosphorus Rationalization: </strong>
              Given 28.4 kg/ha available P, forgo secondary DAP top-dressing to save ~₹650/acre with zero yield penalty.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-stone-100">Micronutrient Foliar Application: </strong>
              If young leaves show chlorosis, consider 0.5% Zinc Sulphate spray strictly during calm morning hours with &lt; 10 km/h wind.
            </div>
          </div>
        </div>

        {/* Safety & Compliance Disclaimer */}
        <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            AgroShield does not determine a universally safest chemical brand. Always follow product labels, dilution proportions, protective gear guidelines, and local agricultural officer advisories.
          </p>
        </div>
      </div>
    </div>
  );
};
