import React, { useState } from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import {
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  CloudLightning,
  Clock,
  Compass,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

export const WeatherCenter: React.FC = () => {
  const { weather, language, selectedField } = useApp();
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'6h' | '24h' | '5d'>('6h');

  const hourlyForecast = [
    { time: '1:00 PM', rainMm: 4.2, tempC: 28.5, risk: 'Moderate', icon: CloudRain },
    { time: '2:00 PM', rainMm: 16.4, tempC: 27.2, risk: 'High', icon: CloudLightning },
    { time: '3:00 PM', rainMm: 19.8, tempC: 25.8, risk: 'Very High', icon: CloudLightning },
    { time: '4:00 PM', rainMm: 22.0, tempC: 24.5, risk: 'Very High', icon: CloudRain },
    { time: '5:00 PM', rainMm: 10.5, tempC: 25.0, risk: 'High', icon: CloudRain },
    { time: '6:00 PM', rainMm: 4.8, tempC: 25.6, risk: 'Moderate', icon: CloudRain },
  ];

  const dailyForecast = [
    { day: 'Today', maxC: 29, minC: 22, rainTotalMm: 38.5, riskSum: 'High Risk Event', desc: 'Heavy Convective Showers' },
    { day: 'Tomorrow', maxC: 30, minC: 21, rainTotalMm: 4.2, riskSum: 'Low Risk', desc: 'Mostly Clear Morning' },
    { day: 'Wednesday', maxC: 31, minC: 22, rainTotalMm: 1.5, riskSum: 'Low Risk', desc: 'Scattered Cirrus Clouds' },
    { day: 'Thursday', maxC: 29, minC: 23, rainTotalMm: 12.0, riskSum: 'Moderate Risk', desc: 'Evening Thunderstorms' },
    { day: 'Friday', maxC: 30, minC: 22, rainTotalMm: 8.0, riskSum: 'Moderate Risk', desc: 'Passing Showers' },
  ];

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <CloudRain className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              {t.weatherCenterTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Doppler Radar Synced
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Hyperlocal rainfall intensity, antecedent soil saturation, and correlated runoff surge modeling.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab('6h')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              activeTab === '6h' ? 'bg-sky-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Next 6 Hours
          </button>
          <button
            onClick={() => setActiveTab('24h')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              activeTab === '24h' ? 'bg-sky-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setActiveTab('5d')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              activeTab === '5d' ? 'bg-sky-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            5-Day Outlook
          </button>
        </div>
      </div>

      {/* Current Conditions Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
            <span>Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-stone-100">{weather.currentTempC}°C</span>
          <span className="text-[11px] text-stone-400 block mt-0.5">{weather.condition}</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
            <span>Rainfall Rate</span>
            <CloudRain className="w-4 h-4 text-sky-400" />
          </div>
          <span className="text-2xl font-black text-sky-400">{weather.rainfallRateMmPerHr} <span className="text-xs font-normal text-stone-400">mm/hr</span></span>
          <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">Heavy Intensity</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-stone-100">{weather.humidityPercent}%</span>
          <span className="text-[11px] text-stone-400 block mt-0.5">Dew Point 24.2°C</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
          <div className="flex items-center justify-between text-stone-400 text-xs mb-1">
            <span>Wind & Direction</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <span className="text-2xl font-black text-stone-100">{weather.windSpeedKmh} <span className="text-xs font-normal text-stone-400">km/h</span></span>
          <span className="text-[11px] text-stone-400 block mt-0.5">{weather.windDirection}</span>
        </div>
      </div>

      {/* Rainfall Intensity vs Runoff Risk Visual Correlation Chart */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/80 border border-stone-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-300">
              Rainfall Intensity & Runoff Risk Correlation (Next 6 Hours)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" /> Hourly Rain (mm)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Runoff Potential
            </span>
          </div>
        </div>

        {/* Custom SVG Responsive Chart */}
        <div className="w-full h-44 sm:h-52">
          <svg viewBox="0 0 500 160" className="w-full h-full">
            {/* Grid Lines */}
            <line x1="30" y1="20" x2="480" y2="20" stroke="#292524" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="30" y1="60" x2="480" y2="60" stroke="#292524" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="30" y1="100" x2="480" y2="100" stroke="#292524" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="30" y1="140" x2="480" y2="140" stroke="#44403c" strokeWidth="1" />

            {/* Y axis labels */}
            <text x="5" y="24" fill="#78716c" fontSize="8">25mm</text>
            <text x="5" y="64" fill="#78716c" fontSize="8">15mm</text>
            <text x="5" y="104" fill="#78716c" fontSize="8">5mm</text>
            <text x="10" y="143" fill="#78716c" fontSize="8">0</text>

            {/* Rain Bars */}
            {hourlyForecast.map((item, idx) => {
              const x = 55 + idx * 75;
              const barHeight = (item.rainMm / 25) * 110;
              const y = 140 - barHeight;
              const isHigh = item.rainMm >= 15;

              return (
                <g key={idx}>
                  {/* Bar */}
                  <rect
                    x={x - 14}
                    y={y}
                    width="28"
                    height={barHeight}
                    rx="4"
                    fill={isHigh ? '#0284c7' : '#38bdf8'}
                    opacity={isHigh ? '0.9' : '0.7'}
                  />
                  {/* Rain value label */}
                  <text
                    x={x}
                    y={y - 5}
                    textAnchor="middle"
                    fill="#38bdf8"
                    fontSize="8.5"
                    fontWeight="bold"
                  >
                    {item.rainMm}
                  </text>
                  {/* X Axis Time */}
                  <text
                    x={x}
                    y="154"
                    textAnchor="middle"
                    fill="#a8a29e"
                    fontSize="8"
                    fontWeight="500"
                  >
                    {item.time}
                  </text>
                </g>
              );
            })}

            {/* Runoff Risk Trend Curve */}
            <path
              d="M 55,105 Q 130,55 205,32 T 280,24 T 355,50 T 430,95"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Runoff Points */}
            <circle cx="55" cy="105" r="3.5" fill="#f59e0b" stroke="#0c0a09" strokeWidth="1.5" />
            <circle cx="130" cy="55" r="3.5" fill="#f59e0b" stroke="#0c0a09" strokeWidth="1.5" />
            <circle cx="205" cy="32" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="280" cy="24" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="355" cy="50" r="3.5" fill="#f59e0b" stroke="#0c0a09" strokeWidth="1.5" />
            <circle cx="430" cy="95" r="3.5" fill="#10b981" stroke="#0c0a09" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mt-2 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Notice how runoff risk curve peaks between 2:00 PM & 4:00 PM concurrently with rain cell volume, then stays elevated due to soil pore saturation.
          </span>
        </div>
      </div>

      {/* 5-Day Outlook Table if active */}
      {activeTab === '5d' && (
        <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
            5-Day Mandya Taluk Precipitation & Risk Outlook
          </h4>
          <div className="divide-y divide-stone-800 text-xs">
            {dailyForecast.map((d, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-stone-300">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-stone-100 w-24">{d.day}</span>
                  <span className="text-stone-400 text-[11px]">{d.desc}</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <span className="text-sky-400 font-bold">{d.rainTotalMm} mm</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    d.riskSum.includes('High') ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    d.riskSum.includes('Moderate') ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {d.riskSum}
                  </span>
                  <span className="text-stone-400 text-[11px] hidden sm:inline">{d.maxC}° / {d.minC}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
