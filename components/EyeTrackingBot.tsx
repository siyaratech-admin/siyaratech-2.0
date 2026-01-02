"use client";
import React, { useEffect, useRef, useState } from 'react';

// Linear interpolation
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

type Expression = 'neutral' | 'happy' | 'excited' | 'surprised' | 'angry' | 'love' | 'dead' | 'wink' | 'sad';

export default function EyeTrackingBot() {
  const [expression, setExpression] = useState<Expression>('neutral');

  // Refs for direct DOM manipulation to avoid React re-renders
  const eyesGroupRef = useRef<SVGGElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Random Behavior Loop
  useEffect(() => {
    const triggerRandomAction = () => {
      const roll = Math.random();

      // 20% chance to Wave (removed) -> 20% to Happy
      if (roll < 0.2) {
        setExpression('happy');
        setTimeout(() => setExpression('neutral'), 2000);
      }
      // 20% chance to get Excited
      else if (roll < 0.6) {
        setExpression('excited');
        setTimeout(() => setExpression('neutral'), 2000);
      }
      // 10% chance to get Surprised
      else if (roll < 0.65) {
        setExpression('surprised');
        setTimeout(() => setExpression('neutral'), 2000);
      }
      // 10% chance to get Love (Heart eyes)
      else if (roll < 0.75) {
        setExpression('love');
        setTimeout(() => setExpression('neutral'), 2500);
      }
      // 10% chance to get Dead (X eyes)
      else if (roll < 0.85) {
        setExpression('dead');
        setTimeout(() => setExpression('neutral'), 2000);
      }
      // 5% chance to Wink
      else if (roll < 0.9) {
        setExpression('wink');
        setTimeout(() => setExpression('neutral'), 1500);
      }
      // 10% do nothing (neutral)
    };

    const interval = setInterval(triggerRandomAction, 5000);
    return () => clearInterval(interval);
  }, []);

  // Eye Tracking Logic (Optimized)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const maxRange = 10; // Slightly larger range
      const distance = Math.min(Math.hypot(dx, dy) / 10, maxRange);
      const angle = Math.atan2(dy, dx);

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      targetPos.current = { x: px, y: py };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      const smoothness = 0.1;

      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, smoothness);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, smoothness);

      if (eyesGroupRef.current) {
        // Apply transform to the whole eyes group
        eyesGroupRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#4dd0e1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4dd0e1" stopOpacity="0" />
          </radialGradient>

          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#e0e0e0" />
          </linearGradient>

          <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34495e" />
            <stop offset="100%" stopColor="#2c3e50" />
          </linearGradient>
        </defs>

        {/* Glow effect */}
        <circle cx="200" cy="200" r="150" fill="url(#glow)" />

        {/* Shadow */}
        <ellipse cx="200" cy="420" rx="80" ry="15" fill="#000" opacity="0.15" />

        {/* Main body */}
        <g filter="url(#shadow)">
          {/* Lower body (rounded base) */}
          <path d="M 140 280 Q 140 360 160 390 Q 200 410 240 390 Q 260 360 260 280 L 260 220 Q 260 200 200 200 Q 140 200 140 220 Z"
            fill="url(#bodyGradient)" stroke="#d0d0d0" strokeWidth="2" />

          {/* Body panel lines */}
          <line x1="160" y1="240" x2="240" y2="240" stroke="#d0d0d0" strokeWidth="1" opacity="0.5" />
          <line x1="160" y1="320" x2="240" y2="320" stroke="#d0d0d0" strokeWidth="1" opacity="0.5" />

          {/* Chest circle (main) */}
          <circle cx="200" cy="280" r="25" fill="#4dd0e1" opacity="0.2" />
          <circle cx="200" cy="280" r="20" fill="#4dd0e1" />

          {/* Animated pulse ring */}
          <circle cx="200" cy="280" r="20" fill="none" stroke="#4dd0e1" strokeWidth="2" opacity="0.6">
            <animate attributeName="r" from="20" to="30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Chest chevron pattern */}
          <path d="M 190 275 L 200 282 L 210 275" stroke="#fff" strokeWidth="3" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 190 285 L 200 292 L 210 285" stroke="#fff" strokeWidth="2" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

          {/* Side detail panels */}
          <rect x="145" y="260" width="8" height="40" rx="2" fill="#b0bec5" opacity="0.5" />
          <rect x="247" y="260" width="8" height="40" rx="2" fill="#b0bec5" opacity="0.5" />

          {/* Head - MAX SIZE (R=70) */}
          <circle cx="200" cy="160" r="70" fill="url(#headGradient)" stroke="#1a252f" strokeWidth="2" />

          {/* Headphone band - Adjusted for wider head */}
          <path d="M 125 145 Q 125 85 200 85 Q 275 85 275 145"
            stroke="#1a252f" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 125 145 Q 125 87 200 87 Q 275 87 275 145"
            stroke="#2c3e50" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* Headphone cups - Adjusted Outward for R=70 */}
          <g>
            <ellipse cx="122" cy="155" rx="15" ry="20" fill="#1a252f" />
            <ellipse cx="122" cy="155" rx="12" ry="17" fill="#2c3e50" />
            <ellipse cx="122" cy="155" rx="8" ry="13" fill="#34495e" />
            <circle cx="122" cy="155" r="4" fill="#4dd0e1" opacity="0.5" />
          </g>
          <g>
            <ellipse cx="278" cy="155" rx="15" ry="20" fill="#1a252f" />
            <ellipse cx="278" cy="155" rx="12" ry="17" fill="#2c3e50" />
            <ellipse cx="278" cy="155" rx="8" ry="13" fill="#34495e" />
            <circle cx="278" cy="155" r="4" fill="#4dd0e1" opacity="0.5" />
          </g>

          {/* Antenna */}
          <line x1="200" y1="85" x2="200" y2="60" stroke="#4dd0e1" strokeWidth="3" strokeLinecap="round" />
          <circle cx="200" cy="55" r="6" fill="#4dd0e1">
            <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Face visor effect - Larger again */}
          <ellipse cx="200" cy="160" rx="60" ry="50" fill="#1a252f" opacity="0.3" />

          {/* EYES GROUP (For Tracking) - WIDER SPACING (180/220) */}
          <g ref={eyesGroupRef}>

            {/* NEUTRAL / SAD / SURPRISED / EXCITED Eyes (Circles) */}
            {['neutral', 'sad', 'surprised', 'excited'].includes(expression) && (
              <>
                {/* Left Eye - Shifted Left (185 -> 180) */}
                <circle cx="180" cy="160" r={expression === 'excited' ? "10" : "8"} fill="#4dd0e1">
                  <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Right Eye - Shifted Right (215 -> 220) */}
                <circle cx="220" cy="160" r={expression === 'excited' ? "10" : "8"} fill="#4dd0e1">
                  <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Highlights */}
                <circle cx="178" cy="158" r="3" fill="#fff" opacity="0.8" />
                <circle cx="218" cy="158" r="3" fill="#fff" opacity="0.8" />
              </>
            )}

            {/* HAPPY Eyes (Squint/Arc) - Widened Spacing */}
            {expression === 'happy' && (
              <g fill="none" stroke="#4dd0e1" strokeWidth="4" strokeLinecap="round">
                <path d="M 170 165 Q 180 155 190 165" /> {/* Left */}
                <path d="M 210 165 Q 220 155 230 165" /> {/* Right */}
              </g>
            )}

            {/* ANGRY Eyes (Slanted) - Widened Spacing */}
            {expression === 'angry' && (
              <g>
                <ellipse cx="180" cy="160" rx="9" ry="6" fill="#4dd0e1" transform="rotate(15 180 160)" />
                <ellipse cx="220" cy="160" rx="9" ry="6" fill="#4dd0e1" transform="rotate(-15 220 160)" />
                <circle cx="180" cy="160" r="2" fill="#fff" />
                <circle cx="220" cy="160" r="2" fill="#fff" />
              </g>
            )}

            {/* LOVE Eyes (Hearts) - Widened Spacing */}
            {expression === 'love' && (
              <g fill="#ec4899">
                <path d="M 180 170 q -5 -8 -10 0 t 10 10 t 10 -10 t -10 0" transform="scale(1.2) translate(-30, -25)" />
                <path d="M 220 170 q -5 -8 -10 0 t 10 10 t 10 -10 t -10 0" transform="scale(1.2) translate(5, -25)" />
              </g>
            )}

            {/* WINK Eyes - Widened Spacing */}
            {expression === 'wink' && (
              <>
                {/* Left: Open */}
                <circle cx="180" cy="160" r="8" fill="#4dd0e1" />
                <circle cx="178" cy="158" r="3" fill="#fff" opacity="0.8" />
                {/* Right: Closed (Line) */}
                <path d="M 210 160 Q 220 170 230 160" fill="none" stroke="#4dd0e1" strokeWidth="4" strokeLinecap="round" />
              </>
            )}

            {/* DEAD Eyes (X) - Widened Spacing */}
            {expression === 'dead' && (
              <g stroke="#4dd0e1" strokeWidth="4" strokeLinecap="round">
                <path d="M 173 153 L 187 167 M 187 153 L 173 167" />
                <path d="M 213 153 L 227 167 M 227 153 L 213 167" />
              </g>
            )}

          </g>

          {/* Smile - MOVED DOWN FURTHER (Vertical Space) */}
          <path
            d={
              expression === 'happy' ? "M 180 185 Q 200 205 220 185" : // Big smile
                expression === 'excited' ? "M 180 190 Q 200 215 220 190" : // Open mouth-ish
                  expression === 'sad' || expression === 'angry' ? "M 180 200 Q 200 190 220 200" : // Frown
                    expression === 'surprised' ? "M 195 195 A 5 5 0 1 1 205 195 A 5 5 0 1 1 195 195" : // O mouth
                      expression === 'dead' ? "M 185 195 L 215 195" : // Straight line
                        "M 180 185 Q 200 193 220 185" // Default smile (Started at 180, eyes at 160 -> 20px gap)
            }
            stroke={expression === 'love' ? "#ec4899" : "#4dd0e1"}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-300"
          >
            {expression === 'neutral' && (
              <animate attributeName="d"
                values="M 180 185 Q 200 193 220 185;M 180 185 Q 200 195 220 185;M 180 185 Q 200 193 220 185"
                dur="4s" repeatCount="indefinite" />
            )}
          </path>

          {/* Chat bubble */}
          <g opacity="0.9">
            <rect x="260" y="120" width="90" height="60" rx="10" fill="#4dd0e1" />
            <polygon points="260,150 245,155 260,160" fill="#4dd0e1" />

            {/* Typing dots */}
            <circle cx="280" cy="145" r="5" fill="#fff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0s" repeatCount="indefinite" />
            </circle>
            <circle cx="305" cy="145" r="5" fill="#fff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="330" cy="145" r="5" fill="#fff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>

        {/* Floating particles */}
        <circle cx="100" cy="200" r="3" fill="#4dd0e1" opacity="0.6">
          <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="250" r="2" fill="#4dd0e1" opacity="0.4">
          <animate attributeName="cy" values="250;230;250" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="320" r="2.5" fill="#4dd0e1" opacity="0.5">
          <animate attributeName="cy" values="320;300;320" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
