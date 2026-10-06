import React from 'react';
import { useApp } from '../../services/store';
import { ShieldCheck, Heart, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setLegalModalOpen, setGuidedTourOpen } = useApp();

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs py-8 px-4 sm:px-6 mt-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-200 font-bold">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>AGROSHIELD • Watershed-Aware Agricultural Decision Intelligence</span>
          </div>
          <p className="text-[11px] text-stone-400">
            A hackathon prototype for preventive agricultural decision support in the Cauvery Basin / Mandya, Karnataka.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <button
            onClick={() => setGuidedTourOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            2-Min Guided Tour
          </button>
          <button
            onClick={() => setLegalModalOpen(true)}
            className="hover:text-stone-200 transition"
          >
            Privacy Policy & Data Use
          </button>
          <button
            onClick={() => setLegalModalOpen(true)}
            className="hover:text-stone-200 transition"
          >
            Terms & Disclaimers
          </button>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400" /> Mandya, Karnataka
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-stone-900 text-center text-[10px] text-stone-400">
        AgroShield provides decision-support information and does not replace professional agricultural, environmental or regulatory advice. Always follow product labels and local agricultural guidance.
      </div>
    </footer>
  );
};
