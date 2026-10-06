import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import {
  Mic,
  Volume2,
  CloudRain,
  Droplets,
  Layers,
  FileText,
  Sprout,
  Bell,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface FarmerEasyModeProps {
  onNavigateTab: (tab: string) => void;
}

export const FarmerEasyMode: React.FC<FarmerEasyModeProps> = ({ onNavigateTab }) => {
  const { selectedField, currentRiskAssessment, language, alerts, weather } = useApp();
  const t = TRANSLATIONS[language];

  // Voice Interaction State
  const [isListening, setIsListening] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [speechResponse, setSpeechResponse] = useState<string | null>(
    language === 'kn'
      ? 'ಇಂದು ಮಧ್ಯಾಹ್ನ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷೆಯಿದೆ. ರಸಗೊಬ್ಬರ ಅಥವಾ ಔಷಧಿ ಸಿಂಪಡಿಸುವುದನ್ನು ನಾಳೆ ಬೆಳಿಗ್ಗೆಯವರೆಗೆ ಮುಂದೂಡಿ.'
      : language === 'hi'
      ? 'आज दोपहर भारी बारिश की संभावना है। यूरिया या कीटनाशक का छिड़काव कल सुबह तक टाल दें।'
      : 'Heavy rainfall is expected this afternoon in Mandya. Avoid applying fertilizers today as runoff risk is high (78/100). Consider applying tomorrow morning.'
  );

  const sampleQuestions = [
    {
      en: 'Is today a good time to apply fertilizer?',
      kn: 'ಇಂದು ರಸಗೊಬ್ಬರ ಹಾಕಲು ಸರಿಯಾದ ಸಮಯವೇ?',
      hi: 'क्या आज खाद डालने का सही समय है?',
      reply: {
        en: 'Caution! Heavy rain is forecast between 1:30 PM & 5:00 PM. Runoff risk is HIGH (78/100). Water will wash away fertilizers. Wait until tomorrow morning 8:00 AM.',
        kn: 'ಎಚ್ಚರಿಕೆ! ಮಧ್ಯಾಹ್ನ 1:30 ರಿಂದ 5:00 ರವರೆಗೆ ಭಾರಿ ಮಳೆಯಾಗಲಿದೆ. ಹರಿವಿನ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ (78/100). ನಾಳೆ ಬೆಳಿಗ್ಗೆ 8:00 ಗಂಟೆಯ ನಂತರ ಗೊಬ್ಬರ ಹಾಕಿ.',
        hi: 'सावधानी! दोपहर 1:30 से 5:00 के बीच भारी बारिश की संभावना है। अपवाह जोखिम उच्च (78/100) है। कल सुबह 8:00 बजे के बाद खाद डालें।',
      },
    },
    {
      en: 'What is the current runoff risk for my field?',
      kn: 'ನನ್ನ ಹೊಲದಲ್ಲಿ ಇಂದಿನ ನೀರಿನ ಹರಿವಿನ ಅಪಾಯ ಎಷ್ಟು?',
      hi: 'मेरे खेत में आज अपवाह जोखिम कितना है?',
      reply: {
        en: 'Current runoff risk is HIGH at 78/100. Topsoil is 76% wet and your field has a 3.8% slope towards the feeder canal.',
        kn: 'ಪ್ರಸ್ತುತ ಹರಿವಿನ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ (78/100). ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ 76% ಇದ್ದು, 3.8% ಇಳಿಜಾರು ಇರುವುದರಿಂದ ನೀರು ಬೇಗ ಹರಿಯುತ್ತದೆ.',
        hi: 'वर्तमान अपवाह जोखिम उच्च (78/100) है। मिट्टी 76% संतृप्त है और 3.8% ढलान के कारण पानी तेजी से बह सकता है।',
      },
    },
    {
      en: 'What does my soil report say?',
      kn: 'ನನ್ನ ಮಣ್ಣು ಪರೀಕ್ಷೆ ವರದಿ ಏನು ಹೇಳುತ್ತದೆ?',
      hi: 'मेरी मिट्टी की जांच रिपोर्ट क्या कहती है?',
      reply: {
        en: 'Your soil pH is 6.8 (Optimal). Organic carbon is good (0.72%). Phosphorus is HIGH, so reduce DAP dose. Nitrogen is Medium.',
        kn: 'ನಿಮ್ಮ ಮಣ್ಣಿನ pH 6.8 (ಉತ್ತಮ). ರಂಜಕ (Phosphorus) ಹೆಚ್ಚಾಗಿದೆ, ಆದ್ದರಿಂದ ಡಿಎಪಿ ಪ್ರಮಾಣ ಕಡಿಮೆ ಮಾಡಿ. ಸಾರಜನಕ ಮಧ್ಯಮವಾಗಿದೆ.',
        hi: 'आपकी मिट्टी का pH 6.8 (उत्कृष्ट) है। फास्फोरस उच्च है, इसलिए डीएपी की मात्रा कम करें। नाइट्रोजन मध्यम स्तर पर है।',
      },
    },
  ];

  const handleAskQuestion = (q: typeof sampleQuestions[0]) => {
    setIsListening(true);
    setActiveQuestion(q[language]);
    setTimeout(() => {
      setIsListening(false);
      setSpeechResponse(q.reply[language]);
    }, 700);
  };

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setActiveQuestion(sampleQuestions[0][language]);
      setSpeechResponse(sampleQuestions[0].reply[language]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Farmer Greeting Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-950/70 via-stone-900 to-stone-950 border border-emerald-800/60 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {t.easyModeToggle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100 mt-1">
              {t.greetingFarmer}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {selectedField.fieldCode} • {selectedField.location.village} ({selectedField.areaAcres} Acres, {selectedField.currentCrop})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-amber-950/80 border border-amber-600/60 text-amber-200">
              <span className="text-[10px] font-bold uppercase tracking-wider block">
                {t.currentRunoffRisk}
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">
                {currentRiskAssessment.level} ({currentRiskAssessment.overallScore}/100)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Assistant Panel: Ask AgroShield */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <span>{t.voiceAskAgroShield}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Voice Assistant
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Tap the microphone or choose a question below for instant spoken advice.
              </p>
            </div>
          </div>

          {/* Big Mic Button */}
          <button
            onClick={handleMicClick}
            className={`p-4 rounded-2xl flex items-center gap-2 font-bold text-xs shadow-xl transition-all active:scale-95 ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce'
                : 'bg-emerald-600 hover:bg-emerald-500 text-stone-950'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span className="hidden sm:inline">
              {isListening ? 'Listening...' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        {/* Sample Voice Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q)}
              className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-emerald-500/60 text-left text-xs text-stone-300 hover:text-white transition flex items-center justify-between group cursor-pointer"
            >
              <span className="font-medium line-clamp-1">"{q[language]}"</span>
              <Sparkles className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-400 shrink-0 ml-1" />
            </button>
          ))}
        </div>

        {/* Spoken Response Bubble */}
        {speechResponse && (
          <div className="p-4 rounded-2xl bg-stone-950/90 border border-emerald-800/60 flex items-start gap-3 mt-4">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0 mt-0.5">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              {activeQuestion && (
                <div className="text-[11px] font-semibold text-stone-400 mb-1">
                  You asked: "{activeQuestion}"
                </div>
              )}
              <div className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed">
                {speechResponse}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Large Simple Action Cards for Farmers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {/* 1. My Field */}
        <button
          onClick={() => onNavigateTab('field')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 text-left transition hover:scale-[1.02] shadow-lg group cursor-pointer"
        >
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 w-fit mb-3 group-hover:bg-emerald-600 group-hover:text-stone-950 transition">
            <Layers className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-100">🌾 {t.navField}</h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2">
            Survey 142/3A • 2.4 Acres • Loamy Soil
          </p>
        </button>

        {/* 2. Weather */}
        <button
          onClick={() => onNavigateTab('weather')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-sky-500/60 text-left transition hover:scale-[1.02] shadow-lg group cursor-pointer"
        >
          <div className="p-3 rounded-xl bg-sky-950/70 border border-sky-800/80 text-sky-400 w-fit mb-3 group-hover:bg-sky-500 group-hover:text-stone-950 transition">
            <CloudRain className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-100">☁ {t.navWeather}</h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2">
            {weather.currentTempC}°C • Storm Approaching • 16.4 mm/hr
          </p>
        </button>

        {/* 3. Water & Runoff */}
        <button
          onClick={() => onNavigateTab('risk-clock')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/60 text-left transition hover:scale-[1.02] shadow-lg group cursor-pointer"
        >
          <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-800/80 text-amber-400 w-fit mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 transition">
            <Droplets className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-100">💧 Water & Runoff</h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2">
            Risk: HIGH • 10 AM to 6 PM Clock
          </p>
        </button>

        {/* 4. Soil Report */}
        <button
          onClick={() => onNavigateTab('soil')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-purple-500/60 text-left transition hover:scale-[1.02] shadow-lg group cursor-pointer"
        >
          <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-800/80 text-purple-400 w-fit mb-3 group-hover:bg-purple-600 group-hover:text-stone-950 transition">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-100">🧪 Soil Report</h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2">
            pH 6.8 • Organic C 0.72% • P High
          </p>
        </button>

        {/* 5. Crop Advice */}
        <button
          onClick={() => onNavigateTab('crop-advisor')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 text-left transition hover:scale-[1.02] shadow-lg group cursor-pointer"
        >
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 w-fit mb-3 group-hover:bg-emerald-600 group-hover:text-stone-950 transition">
            <Sprout className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-100">🌱 Crop Advice</h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2">
            Paddy (High) • Ragi (High) • Intercropping
          </p>
        </button>

        {/* 6. Alerts */}
        <button
          onClick={() => onNavigateTab('alerts')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/60 text-left transition hover:scale-[1.02] shadow-lg group cursor-pointer relative"
        >
          <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-800/80 text-amber-400 w-fit mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 transition">
            <Bell className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-100">🔔 Alerts</h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2">
            {alerts.filter(a => !a.read).length} Unread Agricultural Notifications
          </p>
        </button>
      </div>
    </div>
  );
};
