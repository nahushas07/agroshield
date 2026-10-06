import React from 'react';
import { useApp } from '../../services/store';
import { TRANSLATIONS } from '../../translations';
import { UserRole, LanguageCode } from '../../types';
import {
  Shield,
  Compass,
  Globe,
  Bell,
  Sparkles,
  Layers,
  FileCheck2,
  Users,
  Settings,
  HelpCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface HeaderProps {
  onNavigateTab: (tab: string) => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateTab, activeTab }) => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    isEasyMode,
    toggleEasyMode,
    alerts,
    setGuidedTourOpen,
    setLegalModalOpen
  } = useApp();

  const t = TRANSLATIONS[language];
  const unreadAlertCount = alerts.filter(a => !a.read).length;

  const roles: { key: UserRole; label: string; icon: string }[] = [
    { key: 'FARMER', label: t.farmerRole, icon: '🌾' },
    { key: 'FIELD_VISITOR', label: t.visitorRole, icon: '📋' },
    { key: 'LAB_TECHNICIAN', label: t.labRole, icon: '🧪' },
    { key: 'AGRICULTURAL_OFFICER', label: t.officerRole, icon: '🏛️' },
    { key: 'ADMIN', label: t.adminRole, icon: '⚙️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/90 shadow-md">
      {/* Top Demo Bar */}
      <div className="bg-stone-900 border-b border-stone-800/80 px-4 py-1 text-[11px] text-stone-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider">
            DEMO DATA
          </span>
          <span className="text-stone-400 hidden sm:inline">
            Prototype Risk Model • Mandya District, Karnataka (KA-MDY-001)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Guided Tour Button */}
          <button
            onClick={() => setGuidedTourOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 hover:bg-emerald-900 font-bold text-[10px] transition shadow"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>2-Min Judge Tour</span>
          </button>

          {/* Legal & Disclaimers link */}
          <button
            onClick={() => setLegalModalOpen(true)}
            className="text-[10px] text-stone-400 hover:text-stone-200 underline hidden md:inline"
          >
            Disclaimers & Limits
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div
          onClick={() => onNavigateTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-stone-950 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 fill-stone-950 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-stone-100 font-sans">
                AGROSHIELD
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-stone-800 text-stone-300 border border-stone-700 hidden sm:inline">
                v1.0-PROTOTYPE
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium tracking-tight hidden xs:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Center / Right Controls: Role Switcher, Language, Easy Mode, Alerts */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Easy Mode Toggle (For Farmer role) */}
          {role === 'FARMER' && (
            <button
              onClick={toggleEasyMode}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                isEasyMode
                  ? 'bg-amber-950/70 border-amber-600 text-amber-300 shadow'
                  : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200'
              }`}
            >
              {isEasyMode ? <ToggleRight className="w-4 h-4 text-amber-400" /> : <ToggleLeft className="w-4 h-4" />}
              <span>{isEasyMode ? t.easyModeToggle : 'Full Dashboard'}</span>
            </button>
          )}

          {/* Role Switcher Dropdown */}
          <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xl px-2.5 py-1 text-xs">
            <span className="text-stone-400 font-semibold mr-1.5 hidden lg:inline">
              {t.switchRole}
            </span>
            <select
              value={role}
              onChange={e => setRole(e.target.value as UserRole)}
              className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer text-xs"
            >
              {roles.map(r => (
                <option key={r.key} value={r.key} className="bg-stone-900 text-stone-200">
                  {r.icon} {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Multilingual Selector */}
          <div className="flex items-center bg-stone-900 border border-stone-700 rounded-xl px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-stone-400 mr-1 hidden sm:inline" />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-stone-200 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="en" className="bg-stone-900">EN (English)</option>
              <option value="kn" className="bg-stone-900">ಕನ್ನಡ (Kannada)</option>
              <option value="hi" className="bg-stone-900">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => onNavigateTab('alerts')}
            className="relative p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-600 transition"
            title="Agricultural Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                {unreadAlertCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
