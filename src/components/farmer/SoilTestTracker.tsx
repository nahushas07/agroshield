import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { SoilTestRequest, SoilTestStatus } from '../../types';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Plus,
  ArrowRight,
  Printer,
  FileText,
  User,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const SoilTestTracker: React.FC = () => {
  const { soilTests, soilReports, selectedField, requestSoilTest, fields } = useApp();
  const [selectedReqId, setSelectedReqId] = useState<string>(soilTests[0]?.id || '');
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [showFullReportModal, setShowFullReportModal] = useState<boolean>(false);

  // New Request Form State
  const [reqFieldId, setReqFieldId] = useState<string>(selectedField.id);
  const [testPackage, setTestPackage] = useState<'Standard Soil Test' | 'Comprehensive Micronutrient'>('Standard Soil Test');
  const [paymentMethod, setPaymentMethod] = useState<'Online' | 'Cash on Collection'>('Online');

  const activeRequest = soilTests.find(r => r.id === selectedReqId) || soilTests[0];
  const activeReport = activeRequest?.reportId ? soilReports[activeRequest.reportId] : null;

  const STATUS_STEPS: { status: SoilTestStatus; label: string; desc: string }[] = [
    { status: 'REQUESTED', label: 'Requested', desc: 'Request logged in Mandya Agri Portal' },
    { status: 'ASSIGNED', label: 'Visitor Assigned', desc: 'Field Visitor scheduled for sample collection' },
    { status: 'SAMPLE_COLLECTED', label: 'Sample Collected', desc: 'Core composite sample tagged with GPS' },
    { status: 'IN_LAB', label: 'Received in Lab', desc: 'Logged at Mandya Diagnostic Facility' },
    { status: 'TESTING', label: 'Testing / Distillation', desc: 'pH, N-P-K & EC spectrometry underway' },
    { status: 'VERIFIED', label: 'Verified by Scientist', desc: 'Quality audit by Dr. Savitha Murthy' },
    { status: 'REPORT_READY', label: 'Report Ready', desc: 'Digital Soil Health Certificate issued' },
  ];

  const getStepIndex = (status: SoilTestStatus) => {
    return STATUS_STEPS.findIndex(s => s.status === status);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = requestSoilTest(reqFieldId, testPackage, paymentMethod);
    setSelectedReqId(newReq.id);
    setShowRequestModal(false);
  };

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileCheck2 className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              SOIL TESTING WORKFLOW & HEALTH CARDS
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              End-to-End Traceability
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Track certified soil sampling from field GPS coordinates to accredited laboratory verification.
          </p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-stone-950 shadow-lg transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Soil Test</span>
        </button>
      </div>

      {/* Requests Tabs Selector */}
      <div className="flex items-center gap-2 my-5 overflow-x-auto pb-1">
        {soilTests.map(req => (
          <button
            key={req.id}
            onClick={() => setSelectedReqId(req.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition ${
              selectedReqId === req.id
                ? 'bg-stone-800 text-emerald-400 border-emerald-600/80 shadow-md'
                : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <span>{req.sampleCode}</span>
            <span className="ml-2 text-[10px] opacity-70">({req.status.replace('_', ' ')})</span>
          </button>
        ))}
      </div>

      {/* Active Request Details & Timeline Tracker */}
      {activeRequest && (
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-stone-100">
                  Sample {activeRequest.sampleCode}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-stone-300 border border-stone-700">
                  {activeRequest.testPackage}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Field: {activeRequest.fieldName} • ₹{activeRequest.costRupees} ({activeRequest.paymentStatus})
              </p>
            </div>

            {activeRequest.status === 'REPORT_READY' && (
              <button
                onClick={() => setShowFullReportModal(true)}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 text-xs font-bold transition shadow"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Verified Soil Health Card</span>
              </button>
            )}
          </div>

          {/* 7-Step Vertical/Horizontal Stepper */}
          <div className="my-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Diagnostic Status Progression:
            </h4>
            <div className="relative">
              {/* Stepper Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-2.5">
                {STATUS_STEPS.map((step, idx) => {
                  const currentIdx = getStepIndex(activeRequest.status);
                  const isCompleted = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div
                      key={step.status}
                      className={`p-3 rounded-xl border flex flex-col justify-between text-xs transition-all ${
                        isCurrent
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                          : isCompleted
                          ? 'bg-stone-900/90 border-emerald-900/60 text-stone-300'
                          : 'bg-stone-950/50 border-stone-800/80 text-stone-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-stone-500">
                          Step 0{idx + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-stone-600" />
                        )}
                      </div>
                      <div>
                        <strong className={`block text-[11px] leading-tight ${isCurrent ? 'text-emerald-300' : 'text-stone-200'}`}>
                          {step.label}
                        </strong>
                        <p className="text-[9.5px] text-stone-400 mt-1 line-clamp-2">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/80 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">Farmer Name</span>
              <span className="text-stone-200 font-bold">{activeRequest.farmerName}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">Field Visitor</span>
              <span className="text-stone-200 font-bold">{activeRequest.assignedVisitorName || 'Pending assignment'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">GPS Verification</span>
              <span className="text-emerald-400 font-bold">
                {activeRequest.gpsCoordinates ? `${activeRequest.gpsCoordinates.lat.toFixed(4)}° N, ${activeRequest.gpsCoordinates.lng.toFixed(4)}° E` : 'Pending field visit'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">Report Verification</span>
              <span className="text-stone-200 font-bold">{activeRequest.status === 'REPORT_READY' ? 'Verified by Chief Scientist' : 'In process'}</span>
            </div>
          </div>
        </div>
      )}

      {/* New Soil Test Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                <span>Request Certified Soil Test</span>
              </h4>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-stone-400 hover:text-stone-200 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 my-4 text-xs">
              <div>
                <label className="block text-stone-400 font-semibold mb-1">Select Field</label>
                <select
                  value={reqFieldId}
                  onChange={e => setReqFieldId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-emerald-500"
                >
                  {fields.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.fieldCode} — {f.location.village} ({f.areaAcres} ac, {f.currentCrop})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-400 font-semibold mb-1">Diagnostic Package</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:border-emerald-500/60">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="package"
                        checked={testPackage === 'Standard Soil Test'}
                        onChange={() => setTestPackage('Standard Soil Test')}
                        className="text-emerald-500"
                      />
                      <div>
                        <span className="font-bold text-stone-200 block">Standard Soil Test</span>
                        <span className="text-[10px] text-stone-400">pH, EC, Organic Carbon, Available N-P-K</span>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">₹299</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer hover:border-emerald-500/60">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="package"
                        checked={testPackage === 'Comprehensive Micronutrient'}
                        onChange={() => setTestPackage('Comprehensive Micronutrient')}
                        className="text-emerald-500"
                      />
                      <div>
                        <span className="font-bold text-stone-200 block">Comprehensive Micronutrient</span>
                        <span className="text-[10px] text-stone-400">Standard + Zinc, Boron, Iron, Manganese & Infiltration</span>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">₹499</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 font-semibold mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Online')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                      paymentMethod === 'Online'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Online UPI / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Collection')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                      paymentMethod === 'Cash on Collection'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                        : 'bg-stone-950 text-stone-400 border-stone-800'
                    }`}
                  >
                    Cash on Collection
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
                A certified Field Visitor will be dispatched within 48 hours with GPS tagging kit and sterile composite augers.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold shadow-lg"
                >
                  Confirm & Register Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Verified Soil Health Card Modal */}
      {showFullReportModal && activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-stone-200">
            {/* Certificate Header */}
            <div className="text-center pb-4 border-b border-stone-700">
              <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-400">
                GOVERNMENT RECOGNIZED AGRICULTURAL DIAGNOSTIC FACILITY
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-100 mt-1">
                SOIL HEALTH CERTIFICATE
              </h3>
              <p className="text-xs text-stone-400">
                {activeReport.labName} • Reg #{activeReport.labRegistrationNumber}
              </p>
              <div className="flex items-center justify-center gap-3 mt-2 text-[11px] text-stone-300">
                <span>Sample Code: <strong>{activeReport.sampleCode}</strong></span>
                <span>•</span>
                <span>Issue Date: <strong>{activeReport.issueDate}</strong></span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Grade: {activeReport.soilHealthGrade}</span>
              </div>
            </div>

            {/* Test Results Table */}
            <div className="my-5 overflow-hidden rounded-xl border border-stone-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-950 text-stone-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Parameter</th>
                    <th className="p-2.5">Found Value</th>
                    <th className="p-2.5">Rating Bracket</th>
                    <th className="p-2.5">Optimal Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 bg-stone-900/60 font-medium">
                  <tr>
                    <td className="p-2.5">pH (1:2.5 soil-water)</td>
                    <td className="p-2.5 font-bold text-emerald-400">{activeReport.ph}</td>
                    <td className="p-2.5">Near Neutral</td>
                    <td className="p-2.5 text-stone-400">6.5 - 7.5</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Electrical Conductivity (EC)</td>
                    <td className="p-2.5 font-bold text-stone-200">{activeReport.ec} dS/m</td>
                    <td className="p-2.5 text-emerald-400">Non-saline</td>
                    <td className="p-2.5 text-stone-400">&lt; 1.0 dS/m</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Organic Carbon (OC)</td>
                    <td className="p-2.5 font-bold text-amber-300">{activeReport.organicCarbon}%</td>
                    <td className="p-2.5">Sufficient</td>
                    <td className="p-2.5 text-stone-400">&gt; 0.50%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Available Nitrogen (N)</td>
                    <td className="p-2.5 font-bold text-stone-200">{activeReport.availableN} kg/ha</td>
                    <td className="p-2.5 text-emerald-400">Medium</td>
                    <td className="p-2.5 text-stone-400">280 - 560 kg/ha</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Available Phosphorus (P)</td>
                    <td className="p-2.5 font-bold text-amber-400">{activeReport.availableP} kg/ha</td>
                    <td className="p-2.5 text-amber-400">High (Excess)</td>
                    <td className="p-2.5 text-stone-400">10 - 25 kg/ha</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Available Potassium (K)</td>
                    <td className="p-2.5 font-bold text-stone-200">{activeReport.availableK} kg/ha</td>
                    <td className="p-2.5 text-emerald-400">Medium</td>
                    <td className="p-2.5 text-stone-400">140 - 280 kg/ha</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Available Zinc (Zn)</td>
                    <td className="p-2.5 font-bold text-stone-200">{activeReport.zinc} ppm</td>
                    <td className="p-2.5 text-stone-300">Marginal</td>
                    <td className="p-2.5 text-stone-400">&gt; 0.60 ppm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scientific Advice */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs">
              <span className="font-bold text-emerald-400 block mb-1">Chief Scientist Summary Advice:</span>
              <p className="text-stone-300 leading-relaxed mb-3">{activeReport.summaryAdvice}</p>

              <span className="font-bold text-stone-300 block mb-1">Recommended Adjustments:</span>
              <ul className="space-y-1">
                {activeReport.recommendedAdjustments.map((adj, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{adj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signatures Row */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              <div>
                <span className="block text-stone-500">Tested by:</span>
                <span className="font-bold text-stone-200">{activeReport.testedByTechnician}</span>
              </div>
              <div className="text-right">
                <span className="block text-stone-500">Verified & Approved by:</span>
                <span className="font-bold text-emerald-400">{activeReport.verifiedByScientist}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowFullReportModal(false)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
