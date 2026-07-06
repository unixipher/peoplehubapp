'use client';

import React from 'react';
import { Home, CalendarRange, Palmtree, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', name: 'Home', icon: Home },
    { id: 'attendance', name: 'Attendance', icon: CalendarRange },
    { id: 'holidays', name: 'Holidays', icon: Palmtree },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  // If activeTab is 'leaves' or 'expenses', highlight the Home tab on BottomNav
  const getActiveTabId = () => {
    if (activeTab === 'leaves' || activeTab === 'expenses') {
      return 'dashboard';
    }
    return activeTab;
  };

  const activeTabId = getActiveTabId();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800/80 px-4 pt-3 pb-[calc(14px+env(safe-area-inset-bottom,0px))] flex justify-around items-center z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center gap-1.5 py-1 px-3 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative"
          >

            <Icon className={`w-5.5 h-5.5 transition-transform duration-200 ${
              isActive ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-500'
            }`} />
            <span className={`text-[10px] font-semibold tracking-wide ${
              isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
            }`}>
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
