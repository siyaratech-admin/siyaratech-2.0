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

        <filter id="cpu-light-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#9333ea" floodOpacity="0.3" />
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

        {/* Masks for Nodes */}
        {paths.map((_, i) => (
          <mask id={`cpu-mask-${i}`} key={`mask-${i}`}>
            <circle cx="0" cy="0" r="8" fill="white" />
          </mask>
        ))}

      </defs>

      {/* === BACKGROUND TRACKS === */}
      <g stroke="currentColor" fill="none" strokeWidth="0.5" strokeOpacity="0.2">
        {paths.map((p, i) => (
          <path key={`track-${i}`} d={p.d} />
        ))}
      </g>

      {/* === ANIMATED BEAMS === */}
      {animateLines && (
        <g stroke="url(#cpu-text-gradient)" fill="none" strokeWidth="1" strokeLinecap="round">
          {paths.map((p, i) => (
            <path key={`beam-${i}`} d={p.d} strokeDasharray="10 150" strokeDashoffset="160">
              <animate
                attributeName="stroke-dashoffset"
                from="160"
                to="0"
                dur={`${2 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </g>
      )}

      {/* === NODES (Start Points) === */}
      {paths.map((p, i) => {
        // Parse start point roughly or use a group transform
        // Actually, the original used masks causing circles to appear at 0,0 of user space?
        // No, the original had paths and then separate groups with masks and circles.
        // Let's position circles at the start of paths.

        // Extract M coordinates
        const flow = p.d.split(" ");
        const startX = parseFloat(flow[1]);
        const startY = parseFloat(flow[2]);

        return (
          <g key={`node-${i}`} transform={`translate(${startX}, ${startY})`}>
            <circle r="4" fill={p.color} className="animate-pulse">
              <animate attributeName="r" values="3; 5; 3" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Glow */}
            <circle r="8" fill={p.color} opacity="0.3" />
          </g>
        );
      })}


      {/* === CENTRAL CPU BOX === */}
      <g>
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
          fill="#0a0a0a"
          stroke="url(#cpu-text-gradient)"
          strokeWidth="0.5"
          filter="url(#cpu-light-shadow)"
        />

        {/* Centered Text */}
        <text
          x="105" // Center of box (85 + 15)
          y="50"  // Center of box (40 + 10)
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="6"
          fill={animateText ? "url(#cpu-text-gradient)" : "white"}
          fontWeight="700"
          letterSpacing="0.05em"
          className="select-none px-2"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

export { CpuArchitecture };
