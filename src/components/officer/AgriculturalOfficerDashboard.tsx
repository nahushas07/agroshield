import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { GisMap } from '../gis/GisMap';
import { FieldRecord } from '../../types';
import {
  ShieldAlert,
  Users,
  Layers,
  FileCheck2,
  Filter,
  Send,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Activity,
  Compass,
  ArrowRight
} from 'lucide-react';

export const AgriculturalOfficerDashboard: React.FC = () => {
  const { fields, soilTests } = useApp();

  // Filters
  const [selectedTaluk, setSelectedTaluk] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('All');
  const [inspectedField, setInspectedField] = useState<FieldRecord>(fields[0]);
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false);

  const filteredFields = fields.filter(f => {
    if (selectedTaluk !== 'All' && f.location.taluk !== selectedTaluk) return false;
    if (selectedCrop !== 'All' && !f.currentCrop.toLowerCase().includes(selectedCrop.toLowerCase())) return false;
    return true;
  });

  const handleBroadcastAdvisory = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/50 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Department of Agriculture — Mandya District
            </span>
            <h2 className="text-2xl font-black text-stone-100 mt-1">
              Watershed Command & Agricultural Officer Portal
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Supervising: Mandya, Maddur & Pandavapura Taluks • Shimsha Basin WS-04
            </p>
          </div>

          <button
            onClick={handleBroadcastAdvisory}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-lg transition active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Runoff Caution Advisory to Taluk Farmers</span>
          </button>
        </div>
      </div>

      {broadcastSent && (
        <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-500 text-amber-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>Taluk-wide broadcast dispatched: "Heavy convective showers approaching. Pause fertilizer broadcast until tomorrow morning."</span>
        </div>
      )}

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">Monitored Fields</span>
          <span className="text-2xl font-black text-stone-100 mt-1 block">128</span>
          <span className="text-[11px] text-stone-400 block mt-0.5">3 Micro-Watersheds</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-800/80 ring-1 ring-amber-500/20">
          <span className="text-[10px] text-amber-300 uppercase font-semibold block">High-Risk Fields</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">19</span>
          <span className="text-[11px] text-amber-300/80 block mt-0.5">Surface runoff imminent</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-rose-900/60">
          <span className="text-[10px] text-rose-400 uppercase font-semibold block">Very High Surge</span>
          <span className="text-2xl font-black text-rose-400 mt-1 block">6 Fields</span>
          <span className="text-[11px] text-stone-400 block mt-0.5">Steep &gt; 5% slope corners</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">Active Farmers</span>
          <span className="text-2xl font-black text-stone-100 mt-1 block">94</span>
          <span className="text-[11px] text-emerald-400 block mt-0.5">Registered in AgroShield</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">Soil Tests Pending</span>
          <span className="text-2xl font-black text-sky-400 mt-1 block">{soilTests.length}</span>
          <span className="text-[11px] text-stone-400 block mt-0.5">In lab & verification</span>
        </div>
      </div>

      {/* Main Grid: Filters + Field Registry + Map Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter Controls and Fields List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-wrap gap-2 text-xs">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">Taluk</label>
              <select
                value={selectedTaluk}
                onChange={e => setSelectedTaluk(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-2.5 py-1.5 text-stone-200"
              >
                <option value="All">All Taluks</option>
                <option value="Mandya">Mandya</option>
                <option value="Maddur">Maddur</option>
                <option value="Pandavapura">Pandavapura</option>
              </select>
            </div>

            <div className="flex-1 min-w-[120px]">
              <label className="block text-[10px] font-semibold text-stone-500 uppercase mb-1">Crop</label>
              <select
                value={selectedCrop}
                onChange={e => setSelectedCrop(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-2.5 py-1.5 text-stone-200"
              >
                <option value="All">All Crops</option>
                <option value="Paddy">Paddy</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Ragi">Ragi</option>
              </select>
            </div>
          </div>

          {/* Fields Registry Cards */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Registered Field Registry ({filteredFields.length} Shown):
            </h4>

            {filteredFields.map(f => (
              <div
                key={f.id}
                onClick={() => setInspectedField(f)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  inspectedField.id === f.id
                    ? 'bg-stone-800 border-amber-500 shadow-lg'
                    : 'bg-stone-900/80 border-stone-800 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-100 text-sm">{f.fieldCode}</span>
                    <span className="text-xs text-stone-400">• {f.areaAcres} ac</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    f.id === 'field-001'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}>
                    {f.id === 'field-001' ? 'HIGH RUNOFF (78)' : 'MODERATE (34)'}
                  </span>
                </div>

                <div className="text-xs text-stone-300 mt-1">
                  Farmer: {f.farmerName} • Crop: <strong>{f.currentCrop}</strong>
                </div>
                <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
                  <span>{f.location.village}, {f.location.taluk}</span>
                  <span className="text-amber-400">{f.location.averageSlopePercent}% Slope</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deep Inspection Drawer */}
        <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400">
                FIELD TELEMETRY & WATERSHED PROVENANCE
              </span>
              <h3 className="text-xl font-bold text-stone-100 mt-0.5">
                {inspectedField.fieldCode} — {inspectedField.farmerName}
              </h3>
            </div>

            <span className="px-3 py-1 rounded-xl bg-stone-950 border border-stone-700 text-stone-300 text-xs font-mono">
              Sy. No. {inspectedField.surveyNumber}
            </span>
          </div>

          {/* Interactive GIS Boundary & Watershed */}
          <div>
            <GisMap field={inspectedField} mode="field" heightClass="h-64 sm:h-72" />
          </div>

          {/* Detailed Inspector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-[10px] text-stone-500 block uppercase">Soil & pH</span>
              <strong className="text-stone-200 block mt-0.5">{inspectedField.soil.soilType}</strong>
              <span className="text-emerald-400 font-bold text-[11px]">pH {inspectedField.soil.ph}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-[10px] text-stone-500 block uppercase">N-P-K Status</span>
              <strong className="text-stone-200 block mt-0.5">N: {inspectedField.soil.nitrogenStatus} • P: {inspectedField.soil.phosphorusStatus}</strong>
              <span className="text-amber-400 font-bold text-[11px]">K: {inspectedField.soil.potassiumStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-[10px] text-stone-500 block uppercase">Watershed Connectivity</span>
              <strong className="text-stone-200 block mt-0.5">{inspectedField.watershedId}</strong>
              <span className="text-sky-400 font-bold text-[11px] truncate block">{inspectedField.location.distanceToWaterBodyMeters}m to canal</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300">
            <strong className="text-amber-300 block mb-1">Officer Agronomic Evaluation:</strong>
            Field KA-MDY-001 has direct overland hydrological connection into the Shimsha branch canal feeder. The current 3.8% gradient combined with incoming convective rainfall creates elevated surface shear stress. Recommended action is advising farmer to maintain bund height and delay scheduled fertilization.
          </div>
        </div>
      </div>
    </div>
  );
};
