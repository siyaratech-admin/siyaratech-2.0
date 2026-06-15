"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode, useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/* ─────────────────────────── Types ─────────────────────────── */

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}

/* ─────────────────────── BentoGrid ────────────────────────── */

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => (
  <div
    className={cn(
      "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

/* ─────────────────────── BentoCard ────────────────────────── */

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const GRADIENT = ["#833AB4", "#FD1D1D", "#FCB045"] as const;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        /* Layout — flex column, content pinned to bottom */
        "relative col-span-3 flex flex-col justify-end overflow-hidden rounded-2xl",
        "bg-black/50 backdrop-blur-2xl",
        "transition-transform duration-500 ease-out",
        className,
      )}
      style={{
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 0 0 1.5px rgba(131,58,180,0.85), 0 12px 48px rgba(0,0,0,0.7), 0 0 60px rgba(131,58,180,0.18)"
          : "0 0 0 1px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)",
      }}
      {...props}
    >
      {/* ── Gradient border ring ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[17px] z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 400ms ease",
          background: `linear-gradient(135deg, ${GRADIENT[0]}, ${GRADIENT[1]}, ${GRADIENT[2]})`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
      />

      {/* ── Mouse-tracking spotlight ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 300ms ease",
          background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%,
            rgba(131,58,180,0.16),
            rgba(253,29,29,0.09) 40%,
            rgba(252,176,69,0.05) 65%,
            transparent 80%)`,
        }}
      />

      {/* ── Full-card link (below CTA in z so CTA stays clickable) ── */}
      <Link href={href} className="absolute inset-0 z-20" aria-label={name} />

      {/* ── Background image ── */}
      <div
        className="absolute inset-0 h-full w-full mix-blend-luminosity opacity-40 transition-transform duration-700 ease-out"
        style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      >
        {background}
      </div>

      {/* ── Vignette — stronger at bottom to ensure text legibility ── */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* ── Grain texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Top-edge shimmer ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-20 overflow-hidden rounded-t-2xl"
      >
        <div
          className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-in-out"
          style={{
            background: `linear-gradient(90deg, transparent, ${GRADIENT[0]}, ${GRADIENT[1]}, ${GRADIENT[2]}, transparent)`,
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          CONTENT — pinned to bottom, static position, no movement.
          The CTA row is always in the DOM but fades + slides in
          on hover, fully within the card bounds.
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-30 flex flex-col gap-2 p-5 pointer-events-none">

        {/* Icon */}
        <div className="relative w-fit mb-1">
          <div
            aria-hidden
            className="absolute inset-0 rounded-xl blur-md scale-125 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `linear-gradient(135deg, ${GRADIENT[0]}55, ${GRADIENT[1]}44, ${GRADIENT[2]}33)`,
            }}
          />
          <div
            className="relative flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur-sm transition-all duration-500"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${GRADIENT[0]}22, ${GRADIENT[1]}18, ${GRADIENT[2]}12)`
                : "rgba(255,255,255,0.06)",
              border: isHovered
                ? `1px solid ${GRADIENT[0]}55`
                : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <Icon className="h-5 w-5 text-neutral-100" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold tracking-tight text-neutral-100 drop-shadow-sm leading-snug">
          {name}
        </h3>

        {/* Description — clamped so it never overflows */}
        <p
          className="text-xs leading-relaxed transition-colors duration-300 line-clamp-3"
          style={{ color: isHovered ? "rgb(212,212,212)" : "rgb(163,163,163)" }}
        >
          {description}
        </p>

        {/* ── CTA — fades + rises in from below, stays inside card ── */}
        <div
          className="pointer-events-auto transition-all duration-500 ease-out overflow-hidden"
          style={{
            maxHeight: isHovered ? "36px" : "0px",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(6px)",
            marginTop: isHovered ? "6px" : "0px",
          }}
        >
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 group/cta"
            tabIndex={isHovered ? 0 : -1}
          >
            <span
              className="text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${GRADIENT[0]}, ${GRADIENT[1]}, ${GRADIENT[2]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {cta}
            </span>
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
              style={{ color: GRADIENT[1] }}
            />
          </Link>
        </div>

      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };