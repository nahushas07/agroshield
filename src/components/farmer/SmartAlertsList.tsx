import React from 'react';
import { useApp } from '../../services/store';
import { SmartAlert } from '../../types';
import {
  Bell,
  AlertTriangle,
  FileCheck2,
  UserCheck,
  CloudLightning,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface SmartAlertsListProps {
  onNavigateTab: (tab: string) => void;
}

export const SmartAlertsList: React.FC<SmartAlertsListProps> = ({ onNavigateTab }) => {
  const { alerts, markAlertAsRead, clearUnreadAlerts } = useApp();

  const getPriorityStyle = (priority: SmartAlert['priority']) => {
    switch (priority) {
      case 'CRITICAL':
        return {
          border: 'border-rose-800/80',
          bg: 'bg-rose-950/30',
          badge: 'bg-rose-900 text-rose-200 border-rose-700',
          icon: AlertTriangle,
          iconColor: 'text-rose-400',
        };
      case 'HIGH':
        return {
          border: 'border-amber-800/80',
          bg: 'bg-amber-950/30',
          badge: 'bg-amber-900 text-amber-200 border-amber-700',
          icon: FileCheck2,
          iconColor: 'text-amber-400',
        };
      case 'NORMAL':
        return {
          border: 'border-stone-800',
          bg: 'bg-stone-900/60',
          badge: 'bg-stone-800 text-stone-300 border-stone-700',
          icon: Bell,
          iconColor: 'text-sky-400',
        };
      case 'INFO':
      default:
        return {
          border: 'border-stone-800',
          bg: 'bg-stone-900/40',
          badge: 'bg-stone-800 text-stone-400 border-stone-700',
          icon: Info,
          iconColor: 'text-stone-400',
        };
    }
  };

  return (
    <div className="bg-stone-900/90 rounded-3xl border border-stone-800 p-6 sm:p-7 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bell className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-stone-100 tracking-tight">
              SMART AGRICULTURAL ALERTS & NOTIFICATIONS
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Dynamic notifications triggered by Doppler rainfall surges, sample collection milestones, and soil reports.
          </p>
        </div>

        <button
          onClick={clearUnreadAlerts}
          className="self-start sm:self-auto text-xs text-stone-400 hover:text-stone-200 font-semibold px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 transition"
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-stone-800/80 my-4">
        {alerts.map(alert => {
          const style = getPriorityStyle(alert.priority);
          const IconComp = style.icon;

          return (
            <div
              key={alert.id}
              className={`p-4 sm:p-5 rounded-2xl my-2 border transition ${style.border} ${style.bg} ${
                !alert.read ? 'ring-1 ring-amber-500/30' : 'opacity-85'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl bg-stone-950 border border-stone-800 shrink-0 mt-0.5`}>
                    <IconComp className={`w-5 h-5 ${style.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${style.badge}`}>
                        {alert.priority}
                      </span>
                      <h4 className="text-sm font-bold text-stone-100">
                        {alert.title}
                      </h4>
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                      {alert.message}
                    </p>
                    <span className="text-[10px] text-stone-500 block mt-2">
                      {alert.timestamp}
                    </span>
                  </div>
                </div>

                {alert.actionRoute && (
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      onClick={() => {
                        markAlertAsRead(alert.id);
                        if (alert.actionRoute) onNavigateTab(alert.actionRoute);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition border border-stone-700 active:scale-95 shadow"
                    >
                      <span>{alert.actionLabel || 'Inspect'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
