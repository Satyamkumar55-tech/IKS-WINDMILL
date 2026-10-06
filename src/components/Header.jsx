import React from 'react';
import { Wind, Activity, Info, Gauge } from 'lucide-react';

export default function Header({ isRunning, windSpeed }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold">
            <Wind className={`w-6 h-6 text-white ${windSpeed > 0 && isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: `${Math.max(0.6, 3 - windSpeed / 35)}s` }} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              Virtual Windmill
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50 font-mono font-normal">
                v1.0 Prototype
              </span>
            </span>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">Interactive Energy Simulation</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => scrollToSection('simulation')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <Gauge className="w-4 h-4 text-cyan-400" />
            Simulation
          </button>
          
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            How It Works
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <Info className="w-4 h-4 text-blue-400" />
            About
          </button>
        </nav>
      </div>
    </header>
  );
}
