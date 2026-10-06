import React, { useState } from 'react';
import { useApp } from '../../services/store';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  Sprout,
  Waves,
  FileText,
  Bell,
  ShieldCheck
} from 'lucide-react';

interface GuidedTourModalProps {
  onNavigateTab: (tab: string) => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({ onNavigateTab }) => {
  const { guidedTourOpen, setGuidedTourOpen, setRole } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!guidedTourOpen) return null;

  const steps = [
    {
      title: '1. Farmer & Field Identity',
      icon: MapPin,
      tab: 'home',
      role: 'FARMER' as const,
      text: 'AgroShield opens for Ningappa Gowda on registered Field KA-MDY-001 (2.4 acres, Mandya North). Notice how registered survey bounds and soil loamy baseline anchor all intelligence.',
    },
    {
      title: '2. Current Runoff Risk Estimation',
      icon: ShieldAlert,
      tab: 'home',
      role: 'FARMER' as const,
      text: 'Visual Hero card estimates HIGH Runoff Risk (78/100). AgroShield uses a prototype model combining Doppler radar rain rate, antecedent saturation (76%), and 3.8% field slope.',
    },
    {
      title: '3. Dynamic Runoff Risk Clock',
      icon: Clock,
      tab: 'risk-clock',
      role: 'FARMER' as const,
      text: 'Signature Feature 1: Horizontal timeline tracking risk from 10 AM to 8 PM. Tap each hour to see why 2:00 PM and 4:00 PM hit peak danger as convective storms overwhelm soil infiltration.',
    },
    {
      title: '4. Before-You-Apply Check',
      icon: Sprout,
      tab: 'before-apply',
      role: 'FARMER' as const,
      text: 'Signature Feature 2: Plan an activity (e.g., Fertilizer today at 2:00 PM). AgroShield issues HIGH CAUTION with the exact reason (heavy rain expected) and suggests tomorrow morning instead.',
    },
    {
      title: '5. Field Digital Twin & Soil Profile',
      icon: FileText,
      tab: 'field',
      role: 'FARMER' as const,
      text: 'Signature Feature 5: Vector GIS map with survey bounds + verified laboratory soil report (pH 6.8, OC 0.72%, N Medium, P High).',
    },
    {
      title: '6. Watershed Impact & Connectivity',
      icon: Waves,
      tab: 'watershed-view',
      role: 'FARMER' as const,
      text: 'Signature Feature 3: Dedicated Watershed View. Models potential runoff connectivity: Field -> Furrow -> Feeder Canal -> Shimsha Sub-Basin without claiming chemical transport.',
    },
    {
      title: '7. Crop & Intercropping Advisor',
      icon: Sparkles,
      tab: 'crop-advisor',
      role: 'FARMER' as const,
      text: 'Evaluates seasonal crop fit (Paddy & Ragi High Suitability) and pairs crops with companion legumes (Sesbania) to reduce surface soil erosion by 35%.',
    },
    {
      title: '8. Soil Health & Testing Workflow',
      icon: FileText,
      tab: 'soil',
      role: 'FARMER' as const,
      text: 'Complete 7-step traceable soil diagnostic lifecycle from farmer ₹299 request to Field Visitor GPS sampling to accredited Lab Verification.',
    },
    {
      title: '9. Multi-Role Perspectives',
      icon: Compass,
      tab: 'home',
      role: 'AGRICULTURAL_OFFICER' as const,
      text: 'Switch roles anytime: Agricultural Officer monitors 128 fields across Mandya Taluk, while the Field Visitor and Lab Portals handle in-field sample logistics.',
    },
  ];

  const active = steps[currentStep];
  const IconComp = active.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onNavigateTab(steps[nextStep].tab);
      if (steps[nextStep].role) setRole(steps[nextStep].role);
    } else {
      setGuidedTourOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onNavigateTab(steps[prevStep].tab);
      if (steps[prevStep].role) setRole(steps[prevStep].role);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                2-MINUTE JUDGE TOUR ({currentStep + 1} of {steps.length})
              </span>
              <h3 className="text-base font-bold text-stone-100 mt-0.5">
                {active.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setGuidedTourOpen(false)}
            className="text-stone-400 hover:text-stone-200 text-lg leading-none p-1"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden my-4 border border-stone-800">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="my-5 p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-stone-900 text-emerald-400 border border-stone-800 shrink-0 mt-0.5">
            <IconComp className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
            {active.text}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-800">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition shadow-lg active:scale-95"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

function ShieldAlert(props: any) {
  return <Sparkles {...props} />;
}
