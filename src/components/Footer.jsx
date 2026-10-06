import React from 'react';
import { Wind, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-800/80 bg-slate-950/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">Virtual Windmill Simulation</span>
          <span>• Interactive Web Prototype</span>
        </div>
        
        <div className="flex items-center gap-1 text-slate-400">
          <span>Engineered for Science & Education</span>
        </div>
      </div>
    </footer>
  );
}
