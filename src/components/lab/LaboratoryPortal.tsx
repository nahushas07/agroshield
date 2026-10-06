import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { SoilReportRecord } from '../../types';
import {
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Save,
  Send,
  Sparkles,
  ClipboardList,
  Layers,
  ShieldCheck,
  Check
} from 'lucide-react';

export const LaboratoryPortal: React.FC = () => {
  const { soilTests, publishLabReport, soilReports } = useApp();

  const testingQueue = soilTests.filter(
    r => r.status === 'SAMPLE_COLLECTED' || r.status === 'TESTING' || r.status === 'IN_LAB'
  );

  const [activeReqId, setActiveReqId] = useState<string>(
    testingQueue[0]?.id || soilTests[2]?.id || soilTests[0]?.id
  );
  const activeReq = soilTests.find(r => r.id === activeReqId) || soilTests[0];

  // Lab Result Form States
  const [ph, setPh] = useState<number>(6.9);
  const [ec, setEc] = useState<number>(0.48);
  const [oc, setOc] = useState<number>(0.74);
  const [nVal, setNVal] = useState<number>(255);
  const [pVal, setPVal] = useState<number>(26.8);
  const [kVal, setKVal] = useState<number>(195);
  const [znVal, setZnVal] = useState<number>(0.92);
  const [bVal, setBVal] = useState<number>(0.58);
  const [summaryAdvice, setSummaryAdvice] = useState<string>(
    'Optimal soil acidity and active organic carbon. High available phosphorus suggests decreasing DAP/SSP by 20% to prevent unabsorbed surface runoff.'
  );

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const reportId = `rep-${Date.now()}`;
    const newReport: SoilReportRecord = {
      id: reportId,
      testRequestId: activeReq.id,
      sampleCode: activeReq.sampleCode,
      fieldId: activeReq.fieldId,
      farmerName: activeReq.farmerName,
      labName: 'Mandya Agricultural Soil & Water Quality Laboratory',
      labRegistrationNumber: 'KA-AGRI-LAB-2024-042',
      testedByTechnician: 'Anand Kumar, M.Sc (Agri Chemistry)',
      verifiedByScientist: 'Dr. Savitha Murthy, Chief Soil Scientist',
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      ph,
      ec,
      organicCarbon: oc,
      availableN: nVal,
      availableP: pVal,
      availableK: kVal,
      zinc: znVal,
      boron: bVal,
      soilHealthGrade: 'A (Optimal)',
      summaryAdvice,
      recommendedAdjustments: [
        `Maintain organic carbon via farmyard manure (FYM) or green manuring with Sunn hemp.`,
        `Available P is elevated (${pVal} kg/ha): Reduce basal phosphate to save input costs and minimize drainage runoff.`,
        `Apply Nitrogen (${nVal} kg/ha) in 3 splits corresponding to tillering stages.`
      ]
    };

    publishLabReport(newReport);
    setStatusMessage(`Verified Soil Report published successfully for ${activeReq.sampleCode}! Notification dispatched to farmer.`);
  };

  return (
    <div className="space-y-6">
      {/* Lab Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-purple-950/60 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Soil Testing Laboratory Portal
            </span>
            <h2 className="text-2xl font-black text-stone-100 mt-1">
              Diagnostic Spectrometry & Report Verification
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Facility: Mandya Agricultural Soil & Water Quality Lab (Reg #KA-AGRI-LAB-2024-042)
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Received</span>
              <span className="text-base font-black text-stone-100">{soilTests.length} Samples</span>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Testing</span>
              <span className="text-base font-black text-amber-400">1 In Process</span>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Verification</span>
              <span className="text-base font-black text-sky-400">1 Pending</span>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase block">Published</span>
              <span className="text-base font-black text-emerald-400">{Object.keys(soilReports).length} Reports</span>
            </div>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Testing Queue */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Laboratory Analytical Queue:
          </h3>

          {soilTests.map(t => (
            <div
              key={t.id}
              onClick={() => setActiveReqId(t.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer ${
                activeReqId === t.id
                  ? 'bg-stone-800 border-purple-500 shadow-lg'
                  : 'bg-stone-900/80 border-stone-800 hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-100 text-sm font-mono">
                  {t.sampleCode}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  t.status === 'REPORT_READY'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-amber-950 text-amber-300 border border-amber-700'
                }`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>
              <div className="text-xs text-stone-300 mt-1">
                {t.farmerName} • {t.fieldName}
              </div>
              <div className="text-[10px] text-stone-400 mt-1">
                Depth: {t.sampleDepthCm || 15}cm • {t.testPackage}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Analytical Input Workbench */}
        {activeReq && (
          <div className="lg:col-span-8 bg-stone-900/90 rounded-3xl border border-stone-800 p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <h4 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-purple-400" />
                  <span>Analytical Workbench: {activeReq.sampleCode}</span>
                </h4>
                <p className="text-xs text-stone-400">
                  Farmer: {activeReq.farmerName} • Field: {activeReq.fieldName}
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-purple-950/70 border border-purple-800 text-purple-300 text-xs font-bold font-mono">
                Batch #{activeReq.sampleCode}
              </span>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 my-5 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* pH */}
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Soil pH (1:2.5)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={ph}
                    onChange={e => setPh(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100 font-bold"
                  />
                  <span className="text-[10px] text-emerald-400 mt-1 block">Optimal: 6.5 - 7.5</span>
                </div>

                {/* EC */}
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">EC (dS/m)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={ec}
                    onChange={e => setEc(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100 font-bold"
                  />
                  <span className="text-[10px] text-emerald-400 mt-1 block">&lt; 1.0 Non-saline</span>
                </div>

                {/* OC */}
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Organic Carbon (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={oc}
                    onChange={e => setOc(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100 font-bold"
                  />
                  <span className="text-[10px] text-amber-400 mt-1 block">&gt; 0.50% Sufficient</span>
                </div>

                {/* Available N */}
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Available N (kg/ha)</label>
                  <input
                    type="number"
                    value={nVal}
                    onChange={e => setNVal(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100 font-bold"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Medium: 280 - 560</span>
                </div>

                {/* Available P */}
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Available P (kg/ha)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={pVal}
                    onChange={e => setPVal(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100 font-bold"
                  />
                  <span className="text-[10px] text-amber-400 mt-1 block">&gt; 25 is High</span>
                </div>

                {/* Available K */}
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Available K (kg/ha)</label>
                  <input
                    type="number"
                    value={kVal}
                    onChange={e => setKVal(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100 font-bold"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">Medium: 140 - 280</span>
                </div>
              </div>

              {/* Micronutrients */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Zinc Zn (ppm)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={znVal}
                    onChange={e => setZnVal(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <label className="block text-stone-400 font-semibold mb-1">Boron B (ppm)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={bVal}
                    onChange={e => setBVal(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100"
                  />
                </div>
              </div>

              {/* Chief Scientist Summary Advice */}
              <div>
                <label className="block text-stone-400 font-semibold mb-1">
                  Agronomic Advisory & Environmental Protection Note
                </label>
                <textarea
                  rows={2}
                  value={summaryAdvice}
                  onChange={e => setSummaryAdvice(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setStatusMessage('Draft laboratory values cached locally.')}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold transition"
                >
                  Save Lab Draft
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg transition active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Verify & Publish Official Soil Health Report</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
