import React from 'react';
import { Wind, Fan, RotateCw, Cpu, Zap, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Wind Energy',
      desc: 'Kinetic energy from moving air masses',
      icon: Wind,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    },
    {
      step: '02',
      title: 'Blades Spin',
      desc: 'Aerodynamic lift forces rotate rotor blades',
      icon: Fan,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    },
    {
      step: '03',
      title: 'Rotor Shaft',
      desc: 'Low-speed shaft transfers torque to gearbox',
      icon: RotateCw,
      color: 'from-indigo-500/20 to-emerald-500/20 text-indigo-400 border-indigo-500/30',
    },
    {
      step: '04',
      title: 'Generator',
      desc: 'Electromagnetic induction generates electricity',
      icon: Cpu,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      step: '05',
      title: 'Electricity',
      desc: 'Clean electrical energy fed to power grid',
      icon: Zap,
      color: 'from-teal-500/20 to-amber-500/20 text-amber-400 border-amber-500/30',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            Energy Flow Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">How It Works</h2>
          <p className="text-sm text-slate-400">
            A simple breakdown of how atmospheric kinetic energy turns into usable household electricity.
          </p>
        </div>

        {/* Horizontal Flow Diagram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                <div className={`h-full p-4 rounded-2xl bg-gradient-to-b ${item.color} border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between space-y-3`}>
                  {/* Step badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold opacity-60 text-slate-300">{item.step}</span>
                    <div className="p-2 rounded-xl bg-slate-900/80">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Arrow connector between cards on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-800 border border-slate-700 items-center justify-center text-slate-400 shadow-md">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
