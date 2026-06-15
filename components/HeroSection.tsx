"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import BlurText from "@/components/TextAnimations/BlurText/BlurText";
import { motion } from "framer-motion";
import StarfieldBackground from "./StarfieldBackground";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
  onPrimaryCTA: () => void;
  onSecondaryCTA?: () => void;
  showStats?: boolean;
}

// ── Spotlight overlay — drawn on top of the fixed-opacity <Image> ─────────────
// The <Image> tag always shows at opacity 0.22 (CSS, never touched by JS).
// This canvas ONLY adds extra brightness near the cursor — it never dims anything.
// When cursor is outside, canvas is fully transparent (clearRect every frame).
function LogoSpotlightOverlay({
  imgRef,
  sectionRef,
}: {
  imgRef: React.RefObject<HTMLImageElement>;
  sectionRef: React.RefObject<HTMLElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const mouseRef  = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Track mouse only within the section
    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only set if cursor is actually within the section bounds
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = null;
      }
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [sectionRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const fit = () => {
      dpr           = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const mouse = mouseRef.current;
      const img   = imgRef.current;

      // Only draw when cursor is inside the section AND image is loaded
      if (mouse && img && img.complete && img.naturalWidth > 0) {
        const mx     = mouse.x;
        const my     = mouse.y;
        const RADIUS = Math.min(W, H) * 0.44;

        // Logo rect (must match the <Image> sizing below)
        const logoSize = Math.min(W, H) * 0.65;
        const aspect   = img.naturalWidth / img.naturalHeight;
        const logoW    = aspect >= 1 ? logoSize : logoSize * aspect;
        const logoH    = aspect >= 1 ? logoSize / aspect : logoSize;
        const logoX    = W * 0.50 - logoW / 2;
        const logoY    = H * 0.50 - logoH / 2 - H * 0.04;

        // Off-screen: draw logo screened, then mask with spotlight radial
        const tmp   = document.createElement("canvas");
        tmp.width   = W * dpr;
        tmp.height  = H * dpr;
        const t     = tmp.getContext("2d")!;
        t.scale(dpr, dpr);

        // Extra glow pass
        t.save();
        t.globalAlpha              = 0.45;
        t.filter                   = "blur(14px) brightness(1.5)";
        t.globalCompositeOperation = "screen";
        t.drawImage(img, logoX, logoY, logoW, logoH);
        t.restore();

        // Crisp bright pass
        t.save();
        t.globalAlpha              = 0.65;
        t.filter                   = "none";
        t.globalCompositeOperation = "screen";
        t.drawImage(img, logoX, logoY, logoW, logoH);
        t.restore();

        // Spotlight mask — destination-in punches the radial shape
        t.globalCompositeOperation = "destination-in";
        const grad = t.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        grad.addColorStop(0,    "rgba(0,0,0,1)");
        grad.addColorStop(0.35, "rgba(0,0,0,0.90)");
        grad.addColorStop(0.65, "rgba(0,0,0,0.35)");
        grad.addColorStop(1,    "rgba(0,0,0,0)");
        t.fillStyle = grad;
        t.fillRect(0, 0, W, H);

        ctx.drawImage(tmp, 0, 0, W * dpr, H * dpr, 0, 0, W, H);
      }
      // If no mouse → canvas stays clear (base <Image> shows at its fixed opacity)

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [imgRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────────
export default function HeroSection({
  subtitle,
  secondaryCTA,
  onPrimaryCTA,
  onSecondaryCTA,
}: HeroSectionProps) {
  const [mounted, setMounted]   = useState(false);
  const sectionRef              = useRef<HTMLElement>(null);
  const imgRef                  = useRef<HTMLImageElement>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 0 – Starfield */}
      {mounted && (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <StarfieldBackground className="absolute inset-0 w-full h-full" />
        </div>
      )}

      {/* Layer 1a – Logo at FIXED opacity (CSS only, JS never touches this) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
        style={{ paddingBottom: "4%" }}
      >
        <Image
          ref={imgRef}
          src="/static_images/siyaratech_logo_transparent.png"
          alt=""
          width={600}
          height={600}
          className="w-[min(65vw,65vh)] h-auto select-none"
          style={{ opacity: 0.22, mixBlendMode: "screen" }}
          priority
          draggable={false}
        />
      </div>

      {/* Layer 1b – Spotlight overlay (additive, only on hover, transparent otherwise) */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <LogoSpotlightOverlay imgRef={imgRef} sectionRef={sectionRef} />
        </div>
      )}

      {/* Ambient blobs */}
      <div className="absolute pointer-events-none" style={{
        top: "-15%", left: "-8%", width: "55vw", height: "65vh",
        background: "radial-gradient(ellipse, rgba(131,58,180,0.10) 0%, transparent 70%)",
        filter: "blur(60px)", zIndex: 5,
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: "-15%", right: "-8%", width: "50vw", height: "60vh",
        background: "radial-gradient(ellipse, rgba(253,29,29,0.07) 0%, transparent 70%)",
        filter: "blur(60px)", zIndex: 5,
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-40 w-full text-center mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-12">

        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              {subtitle}
            </span>
          </motion.div>
        )}

        <h1 className="sr-only">Run Your Business on One Intelligent Platform</h1>
        <div
          className="mb-8 w-full max-w-full px-2 flex md:justify-center overflow-hidden"
          aria-hidden="true"
        >
          <BlurText
            text="Run Your Business on One Intelligent Platform"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] !text-center break-words max-w-[90vw] mx-auto flex-wrap justify-center"
            as="p"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/80 dark:text-gray-300 mb-12 max-w-2xl leading-relaxed"
        >
          Siyaratech delivers an all-in-one ERP, CRM &amp; AI Agent ecosystem designed to simplify
          operations, eliminate manual work, and unlock real-time business insights.
          <br />
          <span className="block mt-2 font-semibold text-foreground dark:text-white">
            Automate tasks. Predict outcomes. Empower every team.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button size="xl" variant="gradient" onClick={onPrimaryCTA} className="rounded-full">
            Get Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {secondaryCTA && onSecondaryCTA && (
            <Button size="xl" variant="outline" onClick={onSecondaryCTA} className="rounded-full border-2">
              <Play className="mr-2 h-5 w-5 fill-current" />
              Explore Products
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}