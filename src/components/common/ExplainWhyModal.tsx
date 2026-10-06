import React from 'react';
import { useApp } from '../../services/store';
import { Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ExplainWhyModal: React.FC = () => {
  const { explainModal, closeExplainModal } = useApp();

  if (!explainModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl text-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                EXPLAIN-WHY SYSTEM
              </span>
              <h3 className="text-base font-bold text-stone-100 mt-0.5">
                {explainModal.title}
              </h3>
            </div>
          </div>

          <button
            onClick={closeExplainModal}
            className="text-stone-400 hover:text-stone-200 text-lg leading-none p-1"
          >
            ✕
          </button>
        </div>

        <div className="my-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Contributing Agronomic & Environmental Factors:
          </h4>
          <ul className="space-y-2.5">
            {explainModal.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-stone-950 border border-stone-700 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  {i + 1}
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {explainModal.technicalContext && (
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
            <strong className="text-stone-300 block mb-0.5">Model Specification:</strong>
            {explainModal.technicalContext}
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between">
          <span className="text-[10px] text-stone-500 italic">
            * Decision-support explanation.
          </span>
          <button
            onClick={closeExplainModal}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
