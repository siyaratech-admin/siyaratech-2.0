// components/industries/StatCounter.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatCounterProps {
    value: string; // e.g. "40%", "98%", "2.5x", "60+"
    color: string;
}

export default function StatCounter({ value, color }: StatCounterProps) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [display, setDisplay] = useState<string>(value);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const match = value.match(/^([\d.]+)(.*)$/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = match[2] || "";
        const isDecimal = match[1].includes(".");

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        const duration = 1200;
                        const start = performance.now();

                        const step = (now: number) => {
                            const progress = Math.min((now - start) / duration, 1);
                            // ease-out cubic
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const current = target * eased;
                            setDisplay(
                                (isDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix
                            );
                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                setDisplay(value);
                            }
                        };

                        requestAnimationFrame(step);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value]);

    return (
        <p
            ref={ref}
            className="text-5xl md:text-6xl font-extrabold tabular-nums leading-none"
            style={{ color }}
        >
            {display}
        </p>
    );
}