import React from 'react';
import { useApp } from '../../services/store';
import { GisMap } from '../gis/GisMap';
import { TRANSLATIONS } from '../../translations';
import {
  Waves,
  ShieldAlert,
  Compass,
  ArrowDownRight,
  Info,
  MapPin,
  TrendingDown,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

export const WatershedImpactView: React.FC = () => {
  const { selectedField, language, openExplainModal } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Title & Analytical Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Waves className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.watershedImpactViewTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Hydrological Connectivity
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Simulated landscape drainage trajectory connecting registered farm boundary to regional water resources.
          </p>
        </div>

        <button
          onClick={() =>
            openExplainModal(
              'Watershed Connectivity vs Chemical Transport',
              [
                'This model visualizes POTENTIAL RUNOFF CONNECTIVITY based on gravity slope and elevation contours.',
                'AgroShield does NOT claim direct measurement of pesticide concentration, groundwater contamination, or exact chemical mass transport.',
                'The purpose is preventive: helping farmers protect downstream canals and streams from accidental surface sheet wash.',
                'Connectivity indicates where excess surface water will naturally navigate if infiltration capacity is overwhelmed.'
              ],
              'Hydrological routing based on 30-meter SRTM digital elevation model (DEM) and local irrigation canal survey records.'
            )
          }
          className="self-start sm:self-center text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
          <span>About Modelled Connectivity</span>
        </button>
      </div>

      {/* Interactive GIS Watershed View */}
      <div className="my-6">
        <GisMap field={selectedField} mode="watershed" heightClass="h-80 sm:h-96" />
      </div>

      {/* 5-Step Connectivity Trajectory Diagram */}
      <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4 flex items-center gap-2">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>Modelled Surface Flow Trajectory</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative text-xs">
          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Stage 1: Farm Boundary</span>
              <strong className="text-stone-100 block text-xs mt-1">{selectedField.fieldCode}</strong>
              <span className="text-stone-400 text-[11px] block mt-0.5">2.4 ac • 678m Elev</span>
            </div>
            <div className="mt-2 text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <span>Overland Generation</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Stage 2: Slope Velocity</span>
              <strong className="text-amber-300 block text-xs mt-1">{selectedField.location.averageSlopePercent}% South-East</strong>
              <span className="text-stone-400 text-[11px] block mt-0.5">Gravity-assisted sheet flow</span>
            </div>
            <div className="mt-2 text-[10px] text-amber-400 font-medium">
              <span>0.18 m/s Est. Velocity</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Stage 3: Field Furrow</span>
              <strong className="text-stone-100 block text-xs mt-1">Unlined Furrow Outlet</strong>
              <span className="text-stone-400 text-[11px] block mt-0.5">Channelizes surface wash</span>
            </div>
            <div className="mt-2 text-[10px] text-cyan-400 font-medium">
              <span>Furrow Culvert Node</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Stage 4: Receiving Water</span>
              <strong className="text-sky-300 block text-xs mt-1">{selectedField.location.distanceToWaterBodyMeters}m to Canal</strong>
              <span className="text-stone-400 text-[11px] block mt-0.5 line-clamp-1">{selectedField.location.nearbyWaterBodyName}</span>
            </div>
            <div className="mt-2 text-[10px] text-sky-400 font-medium">
              <span>Direct Connectivity</span>
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-bold uppercase block">Stage 5: Catchment Basin</span>
              <strong className="text-stone-100 block text-xs mt-1">{selectedField.location.drainageBasin}</strong>
              <span className="text-stone-400 text-[11px] block mt-0.5">Cauvery River Basin</span>
            </div>
            <div className="mt-2 text-[10px] text-blue-400 font-medium">
              <span>Micro-WS WS-MDY-04</span>
            </div>
          </div>
        </div>

        {/* Analytical Connectivity Disclaimer Callout */}
        <div className="mt-5 p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 flex items-start gap-2.5 text-xs text-stone-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-stone-200">Analytical Note: </strong>
            This map highlights <span className="text-amber-300 font-semibold">potential runoff connectivity</span>. AgroShield does NOT claim actual pesticide concentration or chemical transport. By managing field bunds, planting vegetative buffer strips, and timing applications outside high-risk hours, farmers preserve both input investment and watershed health.
          </p>
        </div>
      </div>
    </div>
  );
};
