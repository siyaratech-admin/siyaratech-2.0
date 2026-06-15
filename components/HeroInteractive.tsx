// components/industries/HeroInteractive.tsx
"use client";

import React, { useRef, useCallback } from "react";

export default function HeroInteractive({ accentColor }: { accentColor: string }) {
    const spotRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const posRef = useRef({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        posRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(() => {
                if (spotRef.current) {
                    spotRef.current.style.background = `radial-gradient(circle 350px at ${posRef.current.x}px ${posRef.current.y}px, ${accentColor}1A 0%, transparent 70%)`;
                }
                rafRef.current = null;
            });
        }
    }, [accentColor]);

    const handleMouseLeave = useCallback(() => {
        if (spotRef.current) {
            spotRef.current.style.background = "transparent";
        }
    }, []);

    return (
        <div
            className="absolute inset-0 z-[5]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={spotRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{ background: "transparent" }}
            />
        </div>
    );
}