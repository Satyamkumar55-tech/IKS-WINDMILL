import React from 'react';
import { Wind, ShieldAlert, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function ControlPanel({
  windSpeed,
  setWindSpeed,
  isBraked,
  setIsBraked,
  isTurbulence,
  setIsTurbulence,
  isAutoSweep,
  setIsAutoSweep
}) {
  const presets = [
    { label: 'Calm', speed: 0, desc: '0 km/h' },
    { label: 'Breeze', speed: 20, desc: '20 km/h' },
    { label: 'Moderate', speed: 50, desc: '50 km/h' },
    { label: 'Strong', speed: 80, desc: '80 km/h' },
    { label: 'Gale', speed: 100, desc: '100 km/h' },
  ];

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 shadow-xl flex flex-col justify-between gap-5">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-base text-slate-100">Interactive Controls</h2>
        </div>
        <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-1 rounded-md">
          {windSpeed} km/h
        </span>
      </div>

      {/* Main Slider Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300">
          <span className="flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-cyan-400" />
            Wind Speed Controller
          </span>
          <span className="font-mono text-slate-400">0 - 100 km/h</span>
        </div>

        <div className="relative py-1">
          <input
            type="range"
            min="0"
            max="100"
            value={windSpeed}
            onChange={(e) => {
              setWindSpeed(Number(e.target.value));
              if (isAutoSweep) setIsAutoSweep(false);
            }}
            disabled={isBraked}
            className={`w-full cursor-pointer ${isBraked ? 'opacity-40 pointer-events-none' : ''}`}
          />
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {presets.map((preset) => {
            const isActive = windSpeed === preset.speed;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  setWindSpeed(preset.speed);
                  if (isAutoSweep) setIsAutoSweep(false);
                }}
                disabled={isBraked}
                className={`py-1.5 px-1 rounded-lg text-xs font-medium transition-all text-center border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-slate-500 hover:bg-slate-700/50'
                } ${isBraked ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div>{preset.label}</div>
                <div className="text-[10px] opacity-75 font-mono">{preset.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles & Polish Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-700/60">
        {/* Emergency Brake Toggle */}
        <button
          onClick={() => setIsBraked(!isBraked)}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
            isBraked
              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${isBraked ? 'text-amber-400 animate-bounce' : ''}`} />
          {isBraked ? 'Brake Engaged' : 'Lock Brake'}
        </button>

        {/* Gust / Turbulence Mode Toggle */}
        <button
          onClick={() => setIsTurbulence(!isTurbulence)}
          disabled={isBraked}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
            isTurbulence
              ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
              : 'bg-slate-900/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          } ${isBraked ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          {isTurbulence ? 'Gusts Active' : 'Wind Gusts'}
        </button>

        {/* Auto Sweep Demo Toggle */}
        <button
          onClick={() => setIsAutoSweep(!isAutoSweep)}
          disabled={isBraked}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
            isAutoSweep
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
              : 'bg-slate-900/40 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          } ${isBraked ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <RefreshCw className={`w-4 h-4 ${isAutoSweep ? 'animate-spin text-emerald-400' : ''}`} />
          {isAutoSweep ? 'Auto Sweeping' : 'Auto Sweep'}
        </button>
      </div>
    </div>
  );
}
