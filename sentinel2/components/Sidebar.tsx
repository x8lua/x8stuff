import React from 'react';
import { Shield, Users, Settings, BarChart3, Activity, LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-950 h-screen fixed left-0 top-0 z-10 border-r border-slate-900/50">
      <div className="p-6 flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">SENTINEL</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-900 text-white shadow-sm ring-1 ring-inset ring-white/5">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-sm">Registry</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors">
          <BarChart3 className="w-4 h-4" />
          <span className="font-medium text-sm">Analytics</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors">
          <Activity className="w-4 h-4" />
          <span className="font-medium text-sm">Activity</span>
        </a>
        <div className="h-px bg-slate-900 my-4 mx-2"></div>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors">
          <Settings className="w-4 h-4" />
          <span className="font-medium text-sm">Settings</span>
        </a>
      </nav>

      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-900">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-500"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-500">Online</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};