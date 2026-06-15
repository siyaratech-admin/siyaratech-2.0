"use client";
import React, { useEffect, useRef, useState } from "react";

interface SectionLightRayProps {
  segmentStart: number;
  segmentEnd: number;
  className?: string;
}

// Returns absolute page-space coordinates
function getSCurvePoint(t: number, pageW: number, pageH: number) {
  // P0 = top center
  const p0  = { x: pageW * 0.5,   y: 0 };
  // CP1 = WAY off the left edge (negative x), 1/3 down
  const cp1 = { x: -pageW * 1.2,  y: pageH * 0.33 };
  // CP2 = WAY off the right edge, 2/3 down
  const cp2 = { x: pageW * 2.2,   y: pageH * 0.66 };
  // P3 = bottom center
  const p3  = { x: pageW * 0.5,   y: pageH };

  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*cp1.x + 3*u*t*t*cp2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*cp1.y + 3*u*t*t*cp2.y + t*t*t*p3.y,
  };
}

export function SectionLightRay({ segmentStart, segmentEnd, className = "" }: SectionLightRayProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef(0);
  const targetRef    = useRef(0);
  const rafRef       = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const draw = (sy: number) => {
      const W           = canvas.width;
      const H           = canvas.height;
      const pageW       = window.innerWidth;
      const pageH       = document.body.scrollHeight;
      const viewH       = window.innerHeight;
      const scrollableH = Math.max(pageH - viewH, 1);

      // Section's absolute top position in page space
      const rect       = container.getBoundingClientRect();
      const sectionTop = rect.top + sy;

      const globalProgress = Math.min(sy / scrollableH, 1);
      ctx.clearRect(0, 0, W, H);

      // 0→1 progress of the tip within this section's slice
      const tipT = Math.min(
        Math.max((globalProgress - segmentStart) / (segmentEnd - segmentStart), 0),
        1
      );

      // Convert full-page point → local canvas coords
      // x: page point can go off-screen left/right, clamp drawing but keep coords
      // y: subtract sectionTop so y=0 is the top of this section's canvas
      const toLocal = (px: number, py: number) => ({
        lx: px,              // keep real x — canvas clips naturally
        ly: py - sectionTop,
      });

      // Sample the full segment into local points
      const steps = 150;
      const allPoints: { lx: number; ly: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const t  = segmentStart + (i / steps) * (segmentEnd - segmentStart);
        const pt = getSCurvePoint(t, pageW, pageH);
        allPoints.push(toLocal(pt.x, pt.y));
      }

      const tipIndex     = Math.floor(tipT * steps);
      const activePoints = allPoints.slice(0, Math.max(tipIndex + 1, 2));

      const strokeCurve = (pts: { lx: number; ly: number }[]) => {
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].lx, pts[0].ly);
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i - 1];
          const c = pts[i];
          ctx.quadraticCurveTo(p.lx, p.ly, (p.lx + c.lx) / 2, (p.ly + c.ly) / 2);
        }
        ctx.stroke();
      };

      // ── Faint full-segment ghost (shows where ray will go) ──────────
      ctx.save();
      ctx.strokeStyle = "rgba(120, 50, 255, 0.04)";
      ctx.lineWidth   = 2;
      ctx.lineCap     = "round";
      strokeCurve(allPoints);
      ctx.restore();

      if (activePoints.length < 2) return;

      // ── Wide soft bloom ─────────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(140, 60, 255, 0.08)";
      ctx.lineWidth   = 40;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.filter      = "blur(14px)";
      strokeCurve(activePoints);
      ctx.filter      = "none";
      ctx.restore();

      // ── Medium glow ─────────────────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(170, 90, 255, 0.20)";
      ctx.lineWidth   = 14;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      strokeCurve(activePoints);
      ctx.restore();

      // ── Sharp core line ──────────────────────────────────────────────
      ctx.save();
      const f = activePoints[0];
      const l = activePoints[activePoints.length - 1];
      const g = ctx.createLinearGradient(f.lx, f.ly, l.lx, l.ly);
      g.addColorStop(0,    "rgba(100,  40, 255, 0.0)");
      g.addColorStop(0.35, "rgba(160,  90, 255, 0.65)");
      g.addColorStop(0.75, "rgba(210, 150, 255, 0.92)");
      g.addColorStop(1,    "rgba(245, 210, 255, 1.0)");
      ctx.strokeStyle = g;
      ctx.lineWidth   = 1.8;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      strokeCurve(activePoints);
      ctx.restore();

      // ── Tip flare ────────────────────────────────────────────────────
      if (tipT > 0 && tipT < 1) {
        const tip   = activePoints[activePoints.length - 1];
        const pulse = 0.85 + Math.sin(Date.now() * 0.004) * 0.15;
        const R     = 44 * pulse;

        // Outer halo
        const halo = ctx.createRadialGradient(tip.lx, tip.ly, 0, tip.lx, tip.ly, R * 3);
        halo.addColorStop(0,   "rgba(190, 120, 255, 0.30)");
        halo.addColorStop(0.5, "rgba(150,  70, 255, 0.08)");
        halo.addColorStop(1,   "rgba(120,  40, 255, 0)");
        ctx.beginPath();
        ctx.arc(tip.lx, tip.ly, R * 3, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Bright core flare
        const flare = ctx.createRadialGradient(tip.lx, tip.ly, 0, tip.lx, tip.ly, R);
        flare.addColorStop(0,    "rgba(255, 240, 255, 1)");
        flare.addColorStop(0.18, "rgba(225, 165, 255, 0.95)");
        flare.addColorStop(0.55, "rgba(165,  80, 255, 0.35)");
        flare.addColorStop(1,    "rgba(120,  40, 255, 0)");
        ctx.beginPath();
        ctx.arc(tip.lx, tip.ly, R, 0, Math.PI * 2);
        ctx.fillStyle = flare;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(tip.lx, tip.ly, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 250, 255, 1)";
        ctx.fill();

        // Trailing particles
        const now = Date.now();
        for (let i = 0; i < 8; i++) {
          const age      = ((now * 0.0006 + i * 0.14) % 1);
          const trailIdx = Math.max(0, activePoints.length - 1 - Math.floor(age * 25));
          const pt       = activePoints[trailIdx];
          if (!pt) continue;
          ctx.beginPath();
          ctx.arc(
            pt.lx + (Math.random() - 0.5) * 7,
            pt.ly + (Math.random() - 0.5) * 7,
            (1 - age) * 3.5, 0, Math.PI * 2
          );
          ctx.fillStyle = `rgba(215, 170, 255, ${(1 - age) * 0.72})`;
          ctx.fill();
        }
      }
    };

    const animate = () => {
      scrollRef.current += (targetRef.current - scrollRef.current) * 0.07;
      draw(scrollRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const onScroll = () => { targetRef.current = window.scrollY; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, segmentStart, segmentEnd]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}