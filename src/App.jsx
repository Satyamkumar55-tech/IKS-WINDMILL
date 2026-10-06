import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WindmillCanvas from './components/WindmillCanvas';
import ControlPanel from './components/ControlPanel';
import TelemetryCards from './components/TelemetryCards';
import HowItWorks from './components/HowItWorks';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function App() {
  const [windSpeed, setWindSpeed] = useState(35); // Initial speed 35 km/h for good visual presentation
  const [isBraked, setIsBraked] = useState(false);
  const [isTurbulence, setIsTurbulence] = useState(false);
  const [isAutoSweep, setIsAutoSweep] = useState(false);
  const [sweepDirection, setSweepDirection] = useState(1);

  // Turbulence / Gust simulation effect
  useEffect(() => {
    if (!isTurbulence || isBraked) return;

    const interval = setInterval(() => {
      setWindSpeed((prev) => {
        const gust = Math.round((Math.random() - 0.45) * 8);
        const nextSpeed = Math.min(100, Math.max(0, prev + gust));
        return nextSpeed;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isTurbulence, isBraked]);

  // Auto Sweep demonstration mode effect
  useEffect(() => {
    if (!isAutoSweep || isBraked) return;

    const interval = setInterval(() => {
      setWindSpeed((prev) => {
        let nextDirection = sweepDirection;
        if (prev >= 100) nextDirection = -1;
        if (prev <= 0) nextDirection = 1;
        if (nextDirection !== sweepDirection) setSweepDirection(nextDirection);

        const step = nextDirection * 2;
        return Math.min(100, Math.max(0, prev + step));
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isAutoSweep, sweepDirection, isBraked]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 1. Header */}
      <Header isRunning={!isBraked} windSpeed={windSpeed} />

      {/* Main Content Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        
        {/* 2. Hero / Main Windmill Simulation Section */}
        <section id="simulation" className="space-y-6">
          
          {/* Main Visual Grid: Windmill Canvas & Telemetry Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Canvas Windmill Render (Primary Focus) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <WindmillCanvas windSpeed={windSpeed} isBraked={isBraked} />
            </div>

            {/* Sidebar Controls & Telemetry */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              <ControlPanel
                windSpeed={windSpeed}
                setWindSpeed={setWindSpeed}
                isBraked={isBraked}
                setIsBraked={setIsBraked}
                isTurbulence={isTurbulence}
                setIsTurbulence={setIsTurbulence}
                isAutoSweep={isAutoSweep}
                setIsAutoSweep={setIsAutoSweep}
              />

              <TelemetryCards windSpeed={windSpeed} isBraked={isBraked} />
            </div>
          </div>
        </section>

        {/* 3. Small "How It Works" Section */}
        <HowItWorks />

        {/* 4. About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
