import React from 'react';
import { ShieldCheck, Sparkles, Orbit, Sun } from 'lucide-react';

export default function AboutSection() {
  const points = [
    {
      icon: Orbit,
      title: 'Kinetic Conversion',
      desc: 'Wind turbines convert atmospheric kinetic energy into mechanical rotational energy.',
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80',
    },
    {
      icon: Sparkles,
      title: 'Generator Drive',
      desc: 'The rotor spins a high-efficiency electromagnetic generator inside the nacelle.',
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
    },
    {
      icon: ShieldCheck,
      title: 'Clean Electricity',
      desc: 'The generator produces clean electrical energy with zero carbon emissions.',
      color: 'text-blue-400 bg-blue-950/60 border-blue-800/80',
    },
  ];

  return (
    <section id="about" className="py-12 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
            Core Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">About Wind Energy</h2>
          <p className="text-sm text-slate-400">Essential fundamentals of wind energy harvesting.</p>
        </div>

        {/* 3 Short Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="p-5 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-700/60 hover:border-slate-600 transition-all flex flex-col gap-3 shadow-lg"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pt.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-100">{pt.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{pt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
