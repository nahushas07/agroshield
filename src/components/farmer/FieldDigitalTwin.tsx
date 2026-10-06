import React from 'react';
import { useApp } from '../../services/store';
import { GisMap } from '../gis/GisMap';
import { TRANSLATIONS } from '../../translations';
import {
  Layers,
  MapPin,
  Calendar,
  FileCheck2,
  Droplets,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const FieldDigitalTwin: React.FC = () => {
  const { selectedField, language, setSelectedFieldId, fields } = useApp();
  const t = TRANSLATIONS[language];
  const soil = selectedField.soil;

  const getStatusColor = (status: string) => {
    if (status === 'High') return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
    if (status === 'Medium') return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
    return 'text-rose-400 bg-rose-950/60 border-rose-800/80';
  };

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Header and Field Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.fieldDigitalTwinTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-stone-300 border border-stone-700">
              Field ID: {selectedField.fieldCode}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Registered boundary, micro-elevation contours, and chemical soil health benchmarks.
          </p>
        </div>

        {/* Switch field dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 hidden sm:inline">Switch Field:</span>
          <select
            value={selectedField.id}
            onChange={e => setSelectedFieldId(e.target.value)}
            className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-semibold"
          >
            {fields.map(f => (
              <option key={f.id} value={f.id}>
                {f.fieldCode} — {f.location.village} ({f.areaAcres} ac, {f.currentCrop})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Field Map Box */}
      <div className="my-6">
        <GisMap field={selectedField} mode="field" heightClass="h-72 sm:h-80" />
      </div>

      {/* Key Field Metadata Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
          <span className="text-stone-500 text-[10px] block uppercase font-semibold">Survey & Area</span>
          <span className="text-stone-200 font-bold">{selectedField.surveyNumber}</span>
          <span className="text-emerald-400 block font-semibold text-[11px]">{selectedField.areaAcres} Acres</span>
        </div>

        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
          <span className="text-stone-500 text-[10px] block uppercase font-semibold">Location & Taluk</span>
          <span className="text-stone-200 font-bold">{selectedField.location.village}</span>
          <span className="text-stone-400 block text-[11px]">{selectedField.location.taluk}, {selectedField.location.district}</span>
        </div>

        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
          <span className="text-stone-500 text-[10px] block uppercase font-semibold">Topography / Slope</span>
          <span className="text-amber-300 font-bold">{selectedField.location.averageSlopePercent}% Slope</span>
          <span className="text-stone-400 block text-[11px]">Aspect: {selectedField.location.slopeAspect}</span>
        </div>

        <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
          <span className="text-stone-500 text-[10px] block uppercase font-semibold">Watershed & Stream</span>
          <span className="text-sky-300 font-bold">{selectedField.watershedId}</span>
          <span className="text-stone-400 block text-[11px] truncate">{selectedField.location.nearbyWaterBodyName}</span>
        </div>
      </div>

      {/* FIELD PROFILE (Soil Intelligence) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/90 border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-100">
                FIELD PROFILE & SOIL TEST BENCHMARK
              </h4>
              <span className="text-xs text-stone-400">
                Verified by {soil.testingLabName} • Report #{soil.testReportId}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-800/60 font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Last Soil Test: {soil.lastTestDate}</span>
          </div>
        </div>

        {/* Essential Soil Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
          {/* Soil Type */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Soil Texture</span>
            <span className="text-sm font-bold text-stone-200 mt-1 block">{soil.texture}</span>
            <span className="text-[10px] text-stone-400 block">{soil.soilType}</span>
          </div>

          {/* pH */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Soil Reaction (pH)</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">{soil.ph}</span>
            <span className="text-[10px] text-emerald-300 font-medium block">Near Neutral (Optimal)</span>
          </div>

          {/* Organic Carbon */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Organic Carbon</span>
            <span className="text-xl font-black text-amber-300 mt-0.5 block">{soil.organicCarbonPercent}%</span>
            <span className="text-[10px] text-stone-400 block">Sufficient (&gt; 0.50%)</span>
          </div>

          {/* Nitrogen N */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Available N</span>
            <span className="text-sm font-bold text-stone-200 mt-0.5 block">{soil.nitrogenKgPerHa} kg/ha</span>
            <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold border ${getStatusColor(soil.nitrogenStatus)}`}>
              N: {soil.nitrogenStatus}
            </span>
          </div>

          {/* Phosphorus P */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Available P</span>
            <span className="text-sm font-bold text-stone-200 mt-0.5 block">{soil.phosphorusKgPerHa} kg/ha</span>
            <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold border ${getStatusColor(soil.phosphorusStatus)}`}>
              P: {soil.phosphorusStatus}
            </span>
          </div>

          {/* Potassium K */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Available K</span>
            <span className="text-sm font-bold text-stone-200 mt-0.5 block">{soil.potassiumKgPerHa} kg/ha</span>
            <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold border ${getStatusColor(soil.potassiumStatus)}`}>
              K: {soil.potassiumStatus}
            </span>
          </div>
        </div>

        {/* Micronutrients and Infiltration details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800 text-xs">
          <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300">
            <span className="text-stone-500 font-semibold block text-[10px]">Micronutrients</span>
            <span>Zinc: <strong>{soil.zincPpm} ppm</strong> • Boron: <strong>{soil.boronPpm} ppm</strong> • Fe: <strong>{soil.ironPpm} ppm</strong></span>
          </div>

          <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300">
            <span className="text-stone-500 font-semibold block text-[10px]">Electrical Conductivity (EC)</span>
            <span><strong>{soil.electricalConductivity} dS/m</strong> (Non-saline, ideal for root osmotic potential)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300">
            <span className="text-stone-500 font-semibold block text-[10px]">Saturated Infiltration Rate</span>
            <span><strong>{soil.infiltrationRateMmPerHour} mm/hr</strong> (Steady state absorption)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
