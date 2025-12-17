import { cn } from "@/lib/utils";
import React from "react";

export interface CpuArchitectureSvgProps {
  className?: string;
  width?: string;
  height?: string;
  text?: string;
  showCpuConnections?: boolean;
  lineMarkerSize?: number;
  animateText?: boolean;
  animateLines?: boolean;
  animateMarkers?: boolean;
}

const paths = [
  { d: "M 10 20 h 79.5 q 5 0 5 5 v 30", color: "url(#cpu-brand-blue)" },       // 1
  { d: "M 180 10 h -69.7 q -5 0 -5 5 v 30", color: "url(#cpu-brand-orange)" },   // 2
  { d: "M 130 20 v 21.8 q 0 5 -5 5 h -10", color: "url(#cpu-brand-purple)" },    // 3
  { d: "M 170 80 v -21.8 q 0 -5 -5 -5 h -50", color: "url(#cpu-brand-cyan)" },   // 4
  { d: "M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20", color: "url(#cpu-brand-amber)" }, // 5
  { d: "M 94.8 95 v -36", color: "url(#cpu-brand-rose)" },                       // 6
  { d: "M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14", color: "url(#cpu-brand-green)" }, // 7
  { d: "M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20", color: "url(#cpu-brand-indigo)" }, // 8
];

const CpuArchitecture = ({
  className,
  width = "100%",
  height = "100%",
  text = "AI AGENT",
  showCpuConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
}: CpuArchitectureSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      <defs>
        {/* === BRAND GRADIENTS === */}
        <radialGradient id="cpu-brand-blue" fx="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-orange" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-purple" fx="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-cyan" fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-amber" fx="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-rose" fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-green" fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-brand-indigo" fx="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <linearGradient id="cpu-connection-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>

        {/* Text Gradient */}
        <linearGradient id="cpu-text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        <filter id="cpu-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <marker
          id="cpu-circle-marker"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle cx="5" cy="5" r="2" fill="currentColor" stroke="none">
            {animateMarkers && <animate attributeName="r" values="1; 3; 1" dur="2s" repeatCount="indefinite" />}
          </circle>
        </marker>

        <filter id="cpu-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <pattern id="cpu-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
        </pattern>

      </defs>

      {/* === BACKGROUND GRID & NOISE === */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#cpu-grid)" />
      <rect x="0" y="0" width="100%" height="100%" filter="url(#cpu-noise)" opacity="0.15" fill="transparent" />

      {/* === BACKGROUND TRACKS === */}
      <g stroke="currentColor" fill="none" strokeWidth="1" strokeOpacity="0.15">
        {paths.map((p, i) => (
          <path key={`track-${i}`} d={p.d} />
        ))}
      </g>

      {/* === ANIMATED BEAMS === */}
      {animateLines && (
        <g stroke="url(#cpu-text-gradient)" fill="none" strokeWidth="1.5" strokeLinecap="round" filter="url(#cpu-glow)">
          {paths.map((p, i) => (
            <path key={`beam-${i}`} d={p.d} strokeDasharray="20 180" strokeDashoffset="200">
              <animate
                attributeName="stroke-dashoffset"
                from="200"
                to="0"
                dur={`${2.5 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </g>
      )}

      {/* === NODES (Start Points) === */}
      {paths.map((p, i) => {
        const flow = p.d.split(" ");
        const startX = parseFloat(flow[1]);
        const startY = parseFloat(flow[2]);

        return (
          <g key={`node-${i}`} transform={`translate(${startX}, ${startY})`}>
            {/* Glass/Glow Background */}
            <circle r="6" fill={p.color} opacity="0.1" className="animate-pulse" />

            {/* Outer Ring */}
            <circle r="3.5" stroke={p.color} strokeWidth="1" fill="none" opacity="0.8">
              <animate attributeName="opacity" values="0.8; 0.4; 0.8" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Inner Core */}
            <circle r="1.5" fill={p.color} filter="url(#cpu-glow)" />
          </g>
        );
      })}

      {/* === CENTRAL CPU BOX === */}
      <g filter="url(#cpu-light-shadow)">
        {/* Cpu connections */}
        {showCpuConnections && (
          <g fill="url(#cpu-connection-gradient)">
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="116.3" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="122.8" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)" />
            <rect x="104" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="114.5" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)" />
            <rect x="80" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
            <rect x="87" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)" />
          </g>
        )}

        {/* Main Box */}
        <rect
          x="85"
          y="40"
          width="40"
          height="20"
          rx="4"
          fill="#0a0a0a" // Dark background for the chip
          stroke="url(#cpu-text-gradient)"
          strokeWidth="1.2"
        />

        {/* Inner Border for detail */}
        <rect
          x="87"
          y="42"
          width="36"
          height="16"
          rx="2"
          fill="none"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="0.5"
        />

        {/* Centered Text */}
        <text
          x="105" // Center of box (85 + 15)
          y="50"  // Center of box (40 + 10)
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="6"
          fill={animateText ? "url(#cpu-text-gradient)" : "white"}
          fontWeight="800"
          letterSpacing="0.05em"
          className="select-none px-2 font-mono"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

export { CpuArchitecture };
