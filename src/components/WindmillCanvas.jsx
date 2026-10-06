import React, { useRef, useEffect } from 'react';

export default function WindmillCanvas({ windSpeed, isBraked }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let bladeAngle = 0;

    // Wind particles state
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 450,
      length: 15 + Math.random() * 25,
      speedMultiplier: 0.7 + Math.random() * 0.6,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    // Cloud objects
    const clouds = [
      { x: 50, y: 60, scale: 0.8, speed: 0.15 },
      { x: 300, y: 90, scale: 1.1, speed: 0.25 },
      { x: 620, y: 50, scale: 0.9, speed: 0.18 },
    ];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      // Update rotation angle
      if (!isBraked && windSpeed > 0) {
        // Rotation speed scales smoothly with wind speed
        const speedFactor = (windSpeed / 100) * 0.14 + (windSpeed > 0 ? 0.005 : 0);
        bladeAngle += speedFactor;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. SKY GRADIENT
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#0b132b');
      skyGradient.addColorStop(0.5, '#1c2541');
      skyGradient.addColorStop(0.85, '#1e3a8a');
      skyGradient.addColorStop(1, '#0284c7');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. SUN GLOW
      const sunX = width * 0.82;
      const sunY = height * 0.18;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
      sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
      sunGlow.addColorStop(0.3, 'rgba(253, 224, 71, 0.3)');
      sunGlow.addColorStop(1, 'rgba(253, 224, 71, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
      ctx.fill();

      // Sun Core
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
      ctx.fill();

      // 3. CLOUDS
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed * (1 + (windSpeed / 50));
        if (cloud.x > width + 100) cloud.x = -100;

        ctx.save();
        ctx.fillStyle = 'rgba(248, 250, 252, 0.18)';
        ctx.beginPath();
        const cx = cloud.x;
        const cy = cloud.y;
        const s = cloud.scale;
        ctx.arc(cx, cy, 25 * s, 0, Math.PI * 2);
        ctx.arc(cx + 20 * s, cy - 10 * s, 20 * s, 0, Math.PI * 2);
        ctx.arc(cx + 40 * s, cy, 22 * s, 0, Math.PI * 2);
        ctx.arc(cx + 15 * s, cy + 8 * s, 18 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. WIND PARTICLES (Visual direction indicator)
      if (windSpeed > 0) {
        ctx.save();
        particles.forEach((p) => {
          const currentSpeed = (windSpeed / 100) * 12 * p.speedMultiplier + 0.5;
          p.x += currentSpeed;
          if (p.x > width + 50) {
            p.x = -50;
            p.y = Math.random() * (height * 0.75);
          }

          // Draw wind streamline particle
          const lineGrad = ctx.createLinearGradient(p.x, p.y, p.x + p.length, p.y);
          lineGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          lineGrad.addColorStop(0.5, `rgba(56, 189, 248, ${p.opacity * Math.min(1, windSpeed / 20)})`);
          lineGrad.addColorStop(1, 'rgba(186, 230, 253, 0)');

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length * (1 + windSpeed / 60), p.y);
          ctx.stroke();
        });
        ctx.restore();
      }

      // 5. ROLLING HILLS / GROUND
      const groundY = height * 0.72;

      // Far Hill
      ctx.fillStyle = '#065f46';
      ctx.beginPath();
      ctx.moveTo(0, groundY + 20);
      ctx.bezierCurveTo(width * 0.25, groundY - 35, width * 0.65, groundY + 15, width, groundY - 15);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();

      // Near Hill
      const hillGrad = ctx.createLinearGradient(0, groundY, 0, height);
      hillGrad.addColorStop(0, '#047857');
      hillGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = hillGrad;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 10);
      ctx.bezierCurveTo(width * 0.35, groundY + 30, width * 0.7, groundY - 25, width, groundY + 5);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();

      // Grass tufts / Details
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      for (let i = 20; i < width; i += 70) {
        const gh = groundY + Math.sin(i) * 15 + 15;
        ctx.beginPath();
        ctx.moveTo(i, gh);
        ctx.lineTo(i - 4, gh - 8);
        ctx.moveTo(i, gh);
        ctx.lineTo(i + 4, gh - 10);
        ctx.stroke();
      }

      // 6. WINDMILL TURBINE PARAMETERS
      const towerCenterX = width * 0.5;
      const towerTopY = height * 0.32;
      const towerBottomY = height * 0.78;
      const towerTopWidth = 16;
      const towerBottomWidth = 38;

      // A) GROUND SHADOWS
      ctx.save();
      ctx.fillStyle = 'rgba(2, 44, 34, 0.45)';
      ctx.beginPath();
      ctx.moveTo(towerCenterX - towerBottomWidth / 2, towerBottomY);
      ctx.lineTo(towerCenterX + towerBottomWidth / 2, towerBottomY);
      ctx.lineTo(towerCenterX + 160, towerBottomY + 35);
      ctx.lineTo(towerCenterX + 120, towerBottomY + 35);
      ctx.closePath();
      ctx.fill();

      // Blade Shadow on Ground
      const shadowRotorY = towerBottomY + 25;
      const shadowRotorX = towerCenterX + 140;
      ctx.fillStyle = 'rgba(2, 44, 34, 0.25)';
      for (let i = 0; i < 3; i++) {
        const shadowAngle = bladeAngle + (i * Math.PI * 2) / 3;
        ctx.beginPath();
        ctx.arc(
          shadowRotorX + Math.cos(shadowAngle) * 45,
          shadowRotorY + Math.sin(shadowAngle) * 15,
          8,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.restore();

      // B) TOWER STRUCTURE
      const towerGrad = ctx.createLinearGradient(
        towerCenterX - towerBottomWidth / 2,
        0,
        towerCenterX + towerBottomWidth / 2,
        0
      );
      towerGrad.addColorStop(0, '#f8fafc');
      towerGrad.addColorStop(0.3, '#cbd5e1');
      towerGrad.addColorStop(0.75, '#64748b');
      towerGrad.addColorStop(1, '#334155');

      ctx.fillStyle = towerGrad;
      ctx.beginPath();
      ctx.moveTo(towerCenterX - towerTopWidth / 2, towerTopY);
      ctx.lineTo(towerCenterX + towerTopWidth / 2, towerTopY);
      ctx.lineTo(towerCenterX + towerBottomWidth / 2, towerBottomY);
      ctx.lineTo(towerCenterX - towerBottomWidth / 2, towerBottomY);
      ctx.closePath();
      ctx.fill();

      // Tower Details: Door at Base
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(towerCenterX - 5, towerBottomY - 18, 10, 18);
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(towerCenterX - 5 + 10, towerBottomY - 18, 5, Math.PI, 0);
      ctx.fill();

      // Tower Seam Lines
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
      ctx.lineWidth = 1;
      const towerHeight = towerBottomY - towerTopY;
      for (let y = towerTopY + 30; y < towerBottomY - 10; y += 40) {
        const ratio = (y - towerTopY) / towerHeight;
        const currentW = towerTopWidth + (towerBottomWidth - towerTopWidth) * ratio;
        ctx.beginPath();
        ctx.moveTo(towerCenterX - currentW / 2, y);
        ctx.lineTo(towerCenterX + currentW / 2, y);
        ctx.stroke();
      }

      // C) NACELLE & RED WARNING LIGHT
      const nacelleWidth = 36;
      const nacelleHeight = 22;
      const nacelleX = towerCenterX - 14;
      const nacelleY = towerTopY - 12;

      // Red Strobe Warning Light
      const isRedLightOn = Math.floor(Date.now() / 600) % 2 === 0;
      if (isRedLightOn) {
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(towerCenterX, nacelleY - 2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Nacelle Body Gradient
      const nacelleGrad = ctx.createLinearGradient(nacelleX, nacelleY, nacelleX + nacelleWidth, nacelleY + nacelleHeight);
      nacelleGrad.addColorStop(0, '#ffffff');
      nacelleGrad.addColorStop(0.5, '#cbd5e1');
      nacelleGrad.addColorStop(1, '#475569');

      ctx.fillStyle = nacelleGrad;
      ctx.beginPath();
      ctx.roundRect(nacelleX, nacelleY, nacelleWidth, nacelleHeight, 6);
      ctx.fill();

      // Nacelle Back Cap
      ctx.fillStyle = '#334155';
      ctx.fillRect(nacelleX - 4, nacelleY + 4, 4, nacelleHeight - 8);

      // D) ROTOR BLADES & HUB
      const hubX = towerCenterX;
      const hubY = towerTopY;
      const bladeLength = Math.min(width, height) * 0.32; // Responsive blade size

      // Motion Blur Disc at High RPM
      if (windSpeed > 35 && !isBraked) {
        ctx.save();
        const blurAlpha = Math.min(0.22, ((windSpeed - 35) / 65) * 0.22);
        const blurGrad = ctx.createRadialGradient(hubX, hubY, 15, hubX, hubY, bladeLength);
        blurGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        blurGrad.addColorStop(0.7, `rgba(226, 232, 240, ${blurAlpha})`);
        blurGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = blurGrad;
        ctx.beginPath();
        ctx.arc(hubX, hubY, bladeLength, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw 3 Aerodynamic Blades
      for (let i = 0; i < 3; i++) {
        const currentAngle = bladeAngle + (i * Math.PI * 2) / 3;

        ctx.save();
        ctx.translate(hubX, hubY);
        ctx.rotate(currentAngle);

        // Blade Aerodynamic Geometry
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.quadraticCurveTo(bladeLength * 0.35, -14, bladeLength, -2); // Curved upper edge
        ctx.lineTo(bladeLength + 2, 0);
        ctx.quadraticCurveTo(bladeLength * 0.45, 10, 0, 6); // Lower trailing edge
        ctx.closePath();

        // Blade Shading (Light source top-right)
        const bladeGrad = ctx.createLinearGradient(0, -10, bladeLength, 10);
        bladeGrad.addColorStop(0, '#ffffff');
        bladeGrad.addColorStop(0.4, '#f1f5f9');
        bladeGrad.addColorStop(0.8, '#cbd5e1');
        bladeGrad.addColorStop(1, '#94a3b8');

        ctx.fillStyle = bladeGrad;
        ctx.fill();

        // Blade Edge Highlight
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Blade Center Ridge Line
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(bladeLength * 0.9, 0);
        ctx.stroke();

        ctx.restore();
      }

      // E) HUB CAP (NOSE CONE)
      ctx.save();
      const hubGrad = ctx.createRadialGradient(hubX - 3, hubY - 3, 2, hubX, hubY, 14);
      hubGrad.addColorStop(0, '#ffffff');
      hubGrad.addColorStop(0.5, '#e2e8f0');
      hubGrad.addColorStop(1, '#475569');

      ctx.fillStyle = hubGrad;
      ctx.beginPath();
      ctx.arc(hubX, hubY, 13, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center Pin
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(hubX, hubY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [windSpeed, isBraked]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 canvas-shadow">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
      {/* Visual Overlay Status Tag */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-200 shadow-md">
        <span className={`w-2.5 h-2.5 rounded-full ${isBraked ? 'bg-amber-500 animate-pulse' : windSpeed > 0 ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
        <span>Rotor: {isBraked ? 'Locked (Brake Engaged)' : windSpeed === 0 ? 'Stationary (0 km/h)' : 'Spinning Live'}</span>
      </div>
    </div>
  );
}
