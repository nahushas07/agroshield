import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { DEMO_WATERSHEDS } from '../../data/demoData';
import { GisMap } from '../gis/GisMap';
import {
  Waves,
  ShieldAlert,
  Compass,
  ArrowRight,
  TrendingUp,
  MapPin,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const WatershedCommandView: React.FC = () => {
  const { selectedField } = useApp();
  const [selectedWsId, setSelectedWsId] = useState<string>('WS-MDY-04');
  const activeWs = DEMO_WATERSHEDS.find(w => w.id === selectedWsId) || DEMO_WATERSHEDS[0];

  return (
    <div className="space-y-6">
      {/* Watershed Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-sky-950/60 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Watershed Command Intelligence
              </span>
              <span className="text-xs text-stone-400">Cauvery Basin River Authority</span>
            </div>
            <h2 className="text-2xl font-black text-stone-100 mt-1">
              Macro-Catchment & Reservoir Sluice Vulnerability
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Multi-scale aggregation: <strong className="text-stone-200">FIELD → VILLAGE → WATERSHED → DISTRICT</strong>
            </p>
          </div>

          {/* Scale Switcher Pill */}
          <div className="flex items-center gap-1.5 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 text-xs">
            <span className="px-3 py-1 rounded-xl bg-sky-950 text-sky-300 font-bold border border-sky-800">
              Micro-Watershed Level
            </span>
            <span className="px-3 py-1 text-stone-500 font-semibold">
              District Level
            </span>
          </div>
        </div>
      </div>

      {/* Watershed Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMO_WATERSHEDS.map(ws => (
          <div
            key={ws.id}
            onClick={() => setSelectedWsId(ws.id)}
            className={`p-5 rounded-2xl border transition cursor-pointer ${
              selectedWsId === ws.id
                ? 'bg-stone-800 border-sky-500 shadow-xl ring-1 ring-sky-500/30'
                : 'bg-stone-900/80 border-stone-800 hover:bg-stone-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                {ws.code} • {ws.subBasin}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                Vulnerability: {ws.vulnerabilityIndex}/100
              </span>
            </div>

            <h3 className="text-lg font-bold text-stone-100 mt-1.5">
              {ws.name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Outflow to: {ws.receivingWaterBody}
            </p>

            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-stone-800 text-center text-xs">
              <div>
                <span className="text-[10px] text-stone-500 block">Total Fields</span>
                <span className="font-bold text-stone-200">{ws.totalMonitoredFields}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-500 block">Low Risk</span>
                <span className="font-bold text-emerald-400">{ws.lowRiskCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-amber-500 block">Moderate</span>
                <span className="font-bold text-amber-400">{ws.moderateRiskCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-rose-500 block">High/V.High</span>
                <span className="font-bold text-rose-400">{ws.highRiskCount + ws.veryHighRiskCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Watershed Map Visualization */}
      <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h4 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-400" />
              <span>Catchment Runoff Vector Topology ({activeWs.code})</span>
            </h4>
            <p className="text-xs text-stone-400">
              Drainage connectivity and concentration time for Mandya agricultural cluster.
            </p>
          </div>

          <span className="px-3 py-1 rounded-xl bg-stone-950 border border-stone-700 text-sky-400 text-xs font-mono">
            Sub-basin: {activeWs.subBasin}
          </span>
        </div>

        <div className="my-5">
          <GisMap field={selectedField} mode="watershed" heightClass="h-80 sm:h-96" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-500 font-semibold block text-[10px] uppercase">Receiving Sluice Node</span>
            <strong className="text-stone-100 block mt-0.5">{activeWs.receivingWaterBody}</strong>
            <span className="text-sky-400 text-[11px] block mt-1">Direct gravity inflow</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-500 font-semibold block text-[10px] uppercase">Recent Precipitation Volume</span>
            <strong className="text-stone-100 block mt-0.5">{activeWs.recentRainfallMm} mm average basin depth</strong>
            <span className="text-amber-400 text-[11px] block mt-1">Convective cell moving East</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-500 font-semibold block text-[10px] uppercase">Buffer Strip Coverage</span>
            <strong className="text-stone-100 block mt-0.5">62% Bund Vegetative Cover</strong>
            <span className="text-emerald-400 text-[11px] block mt-1">Target: &gt; 80% to filter surface flow</span>
          </div>
        </div>
      </div>
    </div>
  );
};
