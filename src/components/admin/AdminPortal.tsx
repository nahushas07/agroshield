import React, { useState } from 'react';
import { useApp } from '../../services/store';
import {
  Settings,
  Users,
  ShieldCheck,
  Activity,
  Sliders,
  Database,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { setRole, fields, soilTests } = useApp();

  // Model weights calibrator state
  const [rainWeight, setRainWeight] = useState<number>(35);
  const [moistureWeight, setMoistureWeight] = useState<number>(25);
  const [slopeWeight, setSlopeWeight] = useState<number>(20);
  const [connectivityWeight, setConnectivityWeight] = useState<number>(12);
  const [erodibilityWeight, setErodibilityWeight] = useState<number>(8);
  const [weightsSaved, setWeightsSaved] = useState<boolean>(false);

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setWeightsSaved(true);
    setTimeout(() => setWeightsSaved(false), 3000);
  };

  const auditLogs = [
    { timestamp: 'Today 13:15:00', actor: 'System (Engine)', action: 'Evaluated Runoff Risk Score 78/100 for KA-MDY-001' },
    { timestamp: 'Today 12:45:10', actor: 'Officer Savitha', action: 'Broadcasted Taluk Convective Rain Advisory' },
    { timestamp: 'Yesterday 16:40:22', actor: 'Lab Tech Anand', action: 'Logged Spectrometry Test Results for ST-2026-00421' },
    { timestamp: 'Yesterday 11:15:05', actor: 'Visitor Ramesh', action: 'Uploaded In-Field GPS Coordinates (12.5238, 76.8974)' },
    { timestamp: '08 Sept 09:30:00', actor: 'Farmer Ningappa', action: 'Initiated Standard Soil Test Request #ST-2026-00421' },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-800 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-stone-700 text-stone-200 border border-stone-600">
              System Administration
            </span>
            <h2 className="text-2xl font-black text-stone-100 mt-1">
              AgroShield Platform Architecture & Calibration
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Multi-tenant configuration, prototype risk model weight engine, and security audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Services Online
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prototype Risk Model Weights Calibrator */}
        <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <h4 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Prototype Runoff Risk Model Weight Calibration</span>
              </h4>
              <p className="text-xs text-stone-400">
                Adjust baseline mathematical factor weighting (Total: {rainWeight + moistureWeight + slopeWeight + connectivityWeight + erodibilityWeight}%)
              </p>
            </div>

            <button
              onClick={() => {
                setRainWeight(35);
                setMoistureWeight(25);
                setSlopeWeight(20);
                setConnectivityWeight(12);
                setErodibilityWeight(8);
              }}
              className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <form onSubmit={handleSaveWeights} className="space-y-4 text-xs">
            {/* Factor 1 */}
            <div>
              <div className="flex justify-between font-semibold text-stone-300 mb-1">
                <span>Rainfall Intensity & Forecast (Radar)</span>
                <span className="text-emerald-400 font-bold">{rainWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={rainWeight}
                onChange={e => setRainWeight(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Factor 2 */}
            <div>
              <div className="flex justify-between font-semibold text-stone-300 mb-1">
                <span>Antecedent Soil Saturation & Moisture</span>
                <span className="text-cyan-400 font-bold">{moistureWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={moistureWeight}
                onChange={e => setMoistureWeight(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Factor 3 */}
            <div>
              <div className="flex justify-between font-semibold text-stone-300 mb-1">
                <span>Topographic Terrain Slope Factor</span>
                <span className="text-amber-400 font-bold">{slopeWeight}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={slopeWeight}
                onChange={e => setSlopeWeight(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Factor 4 */}
            <div>
              <div className="flex justify-between font-semibold text-stone-300 mb-1">
                <span>Catchment Drainage Proximity</span>
                <span className="text-sky-400 font-bold">{connectivityWeight}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={connectivityWeight}
                onChange={e => setConnectivityWeight(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Factor 5 */}
            <div>
              <div className="flex justify-between font-semibold text-stone-300 mb-1">
                <span>Soil Erodibility & Texture Permeability</span>
                <span className="text-purple-400 font-bold">{erodibilityWeight}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={erodibilityWeight}
                onChange={e => setErodibilityWeight(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-800">
              <span className="text-[11px] text-stone-400">
                Weights immediately feed into client-side simulation.
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs shadow-lg transition"
              >
                Save Weight Profile
              </button>
            </div>
            {weightsSaved && (
              <div className="text-xs text-emerald-400 font-bold">
                ✓ Weight parameters updated successfully.
              </div>
            )}
          </form>
        </div>

        {/* Right: Security & Audit Logs */}
        <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h4 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Platform Audit & Traceability Log</span>
            </h4>
            <span className="text-[10px] text-stone-500 font-mono">Real-time event stream</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {auditLogs.map((log, i) => (
              <div key={i} className="p-3 rounded-xl bg-stone-950 border border-stone-800/80">
                <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1 font-mono">
                  <span>{log.timestamp}</span>
                  <span className="text-emerald-400">{log.actor}</span>
                </div>
                <p className="text-stone-300 font-medium text-[11px] leading-snug">
                  {log.action}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
            <strong>Security Invariant: </strong>Zero PII exposure on unauthenticated endpoints. Immutable soil test certificate records with digital cryptographic signatures.
          </div>
        </div>
      </div>
    </div>
  );
};
