import React from 'react';
import { Wind, RotateCw, Zap, Activity } from 'lucide-react';

export default function TelemetryCards({ windSpeed, isBraked }) {
  // Telemetry Calculations
  const effectiveWindSpeed = isBraked ? 0 : windSpeed;
  const windMs = (effectiveWindSpeed / 3.6).toFixed(1);

  // Rotor RPM calculation: 0 at 0 km/h, up to ~30 RPM at 100 km/h
  const rpm = effectiveWindSpeed === 0 ? 0 : Math.round((effectiveWindSpeed / 100) * 28 + (effectiveWindSpeed > 0 ? 2 : 0));

  // Simulated Power Output (Watts)
  // Cubic power law formula with cut-in (5 km/h) & rated speed curve:
  let powerWatts = 0;
  if (effectiveWindSpeed >= 5) {
    const norm = (effectiveWindSpeed - 5) / 95; // 0 to 1
    // Power curve P = 1600 * norm^2.4
    powerWatts = Math.round(1600 * Math.pow(norm, 2.3));
  }
  const powerKW = (powerWatts / 1000).toFixed(2);

  // Determine Turbine Status
  let statusText = 'Stopped (0 km/h)';
  let statusColor = 'text-slate-400 bg-slate-800/60 border-slate-700';

  if (isBraked) {
    statusText = 'Brake Engaged (Emergency Stop)';
    statusColor = 'text-amber-400 bg-amber-950/60 border-amber-800/80';
  } else if (effectiveWindSpeed === 0) {
    statusText = 'No Wind (0 W)';
    statusColor = 'text-slate-400 bg-slate-800/60 border-slate-700';
  } else if (effectiveWindSpeed < 10) {
    statusText = 'Below Cut-in Speed';
    statusColor = 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80';
  } else if (effectiveWindSpeed < 45) {
    statusText = 'Low Power Generation';
    statusColor = 'text-cyan-300 bg-cyan-950/60 border-cyan-800';
  } else if (effectiveWindSpeed < 75) {
    statusText = 'Optimal Generation';
    statusColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
  } else {
    statusText = 'Peak Generation Capacity';
    statusColor = 'text-amber-300 bg-amber-950/60 border-amber-800';
  }

  const metrics = [
    {
      label: 'Wind Speed',
      value: `${effectiveWindSpeed} km/h`,
      subtext: `${windMs} m/s`,
      icon: Wind,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Rotor Speed',
      value: `${rpm} RPM`,
      subtext: isBraked ? 'Locked' : rpm > 0 ? `${(rpm / 60).toFixed(2)} rev/sec` : 'Stationary',
      icon: RotateCw,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      spin: rpm > 0 && !isBraked,
      spinDuration: `${Math.max(0.8, 40 / Math.max(1, rpm))}s`,
    },
    {
      label: 'Power Output',
      value: `${powerWatts} W`,
      subtext: `${powerKW} kW`,
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 3 Main Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={`p-4 rounded-2xl border backdrop-blur-md ${metric.bg} transition-all duration-300 flex items-center gap-3.5 shadow-lg`}
            >
              <div className={`p-2.5 rounded-xl bg-slate-900/80 ${metric.color}`}>
                <Icon
                  className={`w-5 h-5 ${metric.spin ? 'animate-spin' : ''}`}
                  style={metric.spin ? { animationDuration: metric.spinDuration } : {}}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-400">{metric.label}</div>
                <div className="text-xl font-bold font-mono text-slate-100 tracking-tight truncate">
                  {metric.value}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">{metric.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Turbine Status Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold ${statusColor} transition-all`}>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <span>Status: {statusText}</span>
        </div>
        <div className="font-mono text-[11px] opacity-80">
          Efficiency: {effectiveWindSpeed > 0 ? `${Math.min(100, Math.round((powerWatts / 1600) * 100))}%` : '0%'}
        </div>
      </div>
    </div>
  );
}
