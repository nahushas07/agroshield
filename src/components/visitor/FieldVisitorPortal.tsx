import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { SoilTestRequest } from '../../types';
import {
  MapPin,
  Camera,
  Navigation,
  CheckCircle2,
  Clock,
  Barcode,
  Upload,
  ShieldAlert,
  ArrowRight,
  Layers,
  Phone
} from 'lucide-react';

export const FieldVisitorPortal: React.FC = () => {
  const { soilTests, updateSoilTestStatus } = useApp();

  // Find requests assigned to field visitor or in requested/assigned state
  const assignedList = soilTests.filter(
    r => r.status === 'ASSIGNED' || r.status === 'REQUESTED' || r.status === 'SAMPLE_COLLECTED'
  );

  const [activeReqId, setActiveReqId] = useState<string>(assignedList[0]?.id || soilTests[0]?.id || '');
  const activeReq = soilTests.find(r => r.id === activeReqId) || soilTests[0];

  // Visit collection workflow states
  const [isNavigating, setIsNavigating] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(activeReq?.gpsCoordinates ? true : false);
  const [sampleBarcode, setSampleBarcode] = useState(activeReq?.sampleCode || 'ST-2026-00428');
  const [sampleDepth, setSampleDepth] = useState<number>(15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitCompleted, setVisitCompleted] = useState(activeReq?.status === 'SAMPLE_COLLECTED');

  const handleVerifyGps = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
      setGpsVerified(true);
    }, 600);
  };

  const handleCompleteVisit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      updateSoilTestStatus(activeReq.id, 'SAMPLE_COLLECTED', {
        sampleCode: sampleBarcode,
        sampleDepthCm: sampleDepth,
        gpsCoordinates: { lat: 12.5842, lng: 77.0421 },
        collectedAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setVisitCompleted(true);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Visitor Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950/60 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Field Visitor Portal
            </span>
            <h2 className="text-2xl font-black text-stone-100 mt-1">
              Field Sample Collection Operations
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Logged in as: Ramesh Kumar (Field Visitor #4, Mandya Taluk)
            </p>
          </div>

          <div className="text-xs text-stone-300 bg-stone-950 p-3 rounded-2xl border border-stone-800 flex items-center gap-3">
            <div>
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Active Queue</span>
              <span className="text-lg font-black text-emerald-400">{assignedList.length} Tasks</span>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div>
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Completed Today</span>
              <span className="text-lg font-black text-stone-200">2 Samples</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Queue List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Assigned Field Soil Sampling Requests:
          </h3>

          {assignedList.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveReqId(item.id);
                setVisitCompleted(item.status === 'SAMPLE_COLLECTED');
              }}
              className={`p-4 rounded-2xl border transition cursor-pointer ${
                activeReqId === item.id
                  ? 'bg-stone-800 border-emerald-500 shadow-lg'
                  : 'bg-stone-900/80 border-stone-800 hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-100 text-sm">
                  {item.sampleCode}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'SAMPLE_COLLECTED'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-amber-950 text-amber-300 border border-amber-700'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>

              <div className="text-xs text-stone-300 mt-1">
                Farmer: <strong>{item.farmerName}</strong> ({item.village}, {item.taluk})
              </div>
              <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
                <span>Field: {item.fieldName}</span>
                <span className="text-emerald-400 font-semibold">₹{item.costRupees}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Active Field Visit Execution Form */}
        {activeReq && (
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h4 className="text-lg font-bold text-stone-100">
                  Execution Checklist: {activeReq.sampleCode}
                </h4>
                <p className="text-xs text-stone-400">
                  Target: {activeReq.fieldName} • {activeReq.farmerName}
                </p>
              </div>
              <a
                href={`tel:${activeReq.farmerPhone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Farmer</span>
              </a>
            </div>

            {/* Step 1: GPS Verification */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <span className="font-bold text-stone-200 text-xs">
                    GPS Coordinates & Boundary Verification
                  </span>
                </div>
                {gpsVerified && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified In-Field
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 bg-stone-900 p-2.5 rounded-xl">
                <span>Device Satellite Fix:</span>
                <span className="font-mono text-emerald-400">
                  {gpsVerified ? '12.5842° N, 77.0421° E (±2.1m accuracy)' : 'Awaiting lock'}
                </span>
              </div>

              {!gpsVerified ? (
                <button
                  onClick={handleVerifyGps}
                  disabled={isNavigating}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{isNavigating ? 'Locking GPS...' : 'Verify In-Field GPS Coordinates'}</span>
                </button>
              ) : null}
            </div>

            {/* Step 2: Traceability Photo Capture */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <span className="font-bold text-stone-200 text-xs">
                    Traceability Sample Photograph
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 italic">Traceability only</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800">
                <div className="w-16 h-16 rounded-xl bg-stone-950 border border-stone-700 flex items-center justify-center text-stone-500 shrink-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=200&q=80"
                    alt="Sample preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-stone-400">
                  <div className="font-bold text-stone-200">Soil Core Sample Composite #04</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Air dried in muslin pouch with QR tag.</div>
                  <div className="text-[10px] text-amber-400 mt-1 italic">
                    * The photograph is only for traceability and must NOT be presented as a replacement for laboratory testing.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Sample Barcode & Soil Depth */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <span className="font-bold text-stone-200 text-xs">
                  Barcode Scan & Agronomic Sampling Depth
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Barcode Sample ID</label>
                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2">
                    <Barcode className="w-4 h-4 text-emerald-400" />
                    <input
                      type="text"
                      value={sampleBarcode}
                      onChange={e => setSampleBarcode(e.target.value)}
                      className="bg-transparent text-stone-200 w-full font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Core Depth (cm)</label>
                  <select
                    value={sampleDepth}
                    onChange={e => setSampleDepth(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 focus:outline-none"
                  >
                    <option value={15}>0 - 15 cm (Topsoil plough layer)</option>
                    <option value={30}>0 - 30 cm (Deep root zone)</option>
                    <option value={60}>0 - 60 cm (Sugarcane subsoil profile)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit / Complete Action */}
            <div className="pt-2">
              {visitCompleted ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Sample Collected & Logged. In transit to Mandya Lab facility.</span>
                </div>
              ) : (
                <button
                  onClick={handleCompleteVisit}
                  disabled={isSubmitting || !gpsVerified}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-stone-950 font-bold text-sm shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Sample Chain-of-Custody...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Field Visit & Submit Sample</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
