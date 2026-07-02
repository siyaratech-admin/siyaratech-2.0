"use client";

import React, { useMemo } from "react";

interface MandalaPatternProps {
    className?: string;
    rotate?: boolean;
}

interface RingConfig {
    radius: number;
    petalCount: number;
    petalSize: number;
    colorStart: string;
    colorEnd: string;
    opacity: number;
}

const RINGS: RingConfig[] = [
    { radius: 60, petalCount: 10, petalSize: 34, colorStart: "#FD1D1D", colorEnd: "#FCB045", opacity: 0.95 },
    { radius: 95, petalCount: 12, petalSize: 42, colorStart: "#E0224B", colorEnd: "#FD1D1D", opacity: 0.88 },
    { radius: 132, petalCount: 12, petalSize: 50, colorStart: "#B72A85", colorEnd: "#FD1D1D", opacity: 0.8 },
    { radius: 172, petalCount: 14, petalSize: 58, colorStart: "#8E30A8", colorEnd: "#E0224B", opacity: 0.7 },
    { radius: 215, petalCount: 16, petalSize: 66, colorStart: "#833AB4", colorEnd: "#B72A85", opacity: 0.6 },
];

function buildPetalPath(size: number): string {
    const w = size * 0.62;
    return `M 0 0 C ${-w} ${-size * 0.4}, ${-w} ${-size * 0.85}, 0 ${-size} C ${w} ${-size * 0.85}, ${w} ${-size * 0.4}, 0 0 Z`;
}

function buildRing(ring: RingConfig, gradientId: string) {
    const petalPath = buildPetalPath(ring.petalSize);
    const petals = Array.from({ length: ring.petalCount }, (_, i) => {
        const angle = (360 / ring.petalCount) * i;
        return (
            <path
                key={i}
                d={petalPath}
                fill={`url(#${gradientId})`}
                opacity={ring.opacity}
                transform={`rotate(${angle}) translate(0, ${-ring.radius})`}
            />
        );
    });
    return petals;
}

export default function MandalaPattern({ className = "", rotate = true }: MandalaPatternProps) {
    const gradientIds = useMemo(
        () => RINGS.map((_, i) => `mandala-ring-gradient-${i}`),
        []
    );

    return (
        <svg
            viewBox="-260 -260 520 520"
            className={className}
            style={{
                animation: rotate ? "mandala-spin 140s linear infinite" : undefined,
            }}
            aria-hidden="true"
        >
            <defs>
                {RINGS.map((ring, i) => (
                    <radialGradient key={gradientIds[i]} id={gradientIds[i]} cx="50%" cy="0%" r="100%">
                        <stop offset="0%" stopColor={ring.colorEnd} />
                        <stop offset="100%" stopColor={ring.colorStart} />
                    </radialGradient>
                ))}
            </defs>

            {RINGS.map((ring, i) => (
                <g key={i}>{buildRing(ring, gradientIds[i])}</g>
            ))}

            <style>{`
                @keyframes mandala-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </svg>
    );
}