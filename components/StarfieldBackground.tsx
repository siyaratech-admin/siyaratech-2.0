"use client";
import React, { useEffect, useRef } from "react";

const COLORS = ["#833AB4", "#FD1D1D", "#FCB045"] as const;

interface StarLayer {
    count: number;
    size: number;
    speed: number;
    twinkle: boolean;
    parallaxFactor: number; // how much this layer moves with scroll
}

const LAYERS: StarLayer[] = [
    { count: 130, size: 0.7, speed: 0.10, twinkle: true, parallaxFactor: 0.08 },
    { count: 50, size: 1.3, speed: 0.22, twinkle: true, parallaxFactor: 0.14 },
    { count: 18, size: 2.1, speed: 0.40, twinkle: false, parallaxFactor: 0.22 },
];

interface Star {
    x: number;
    baseY: number; // original Y, used for parallax offset calculation
    y: number;
    size: number;
    speed: number;
    color: string;
    twinklePhase: number;
    twinkleSpeed: number;
    twinkle: boolean;
    alpha: number;
    parallaxFactor: number;
}

function createStars(w: number, h: number): Star[] {
    const stars: Star[] = [];
    for (const layer of LAYERS) {
        for (let i = 0; i < layer.count; i++) {
            const y = Math.random() * h;
            stars.push({
                x: Math.random() * w,
                baseY: y,
                y,
                size: layer.size + Math.random() * layer.size,
                speed: layer.speed + Math.random() * layer.speed * 0.5,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.012 + Math.random() * 0.022,
                twinkle: layer.twinkle,
                alpha: 0.15 + Math.random() * 0.28,
                parallaxFactor: layer.parallaxFactor,
            });
        }
    }
    return stars;
}

export default function StarfieldBackground({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const rafRef = useRef<number>(0);
    const scrollYRef = useRef<number>(0);
    const lastScrollRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            starsRef.current = createStars(canvas.width, canvas.height);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Track scroll
        const onScroll = () => { scrollYRef.current = window.scrollY; };
        window.addEventListener("scroll", onScroll, { passive: true });

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const scrollDelta = scrollYRef.current - lastScrollRef.current;
            lastScrollRef.current = scrollYRef.current;

            for (const s of starsRef.current) {
                // Ambient upward drift
                s.y -= s.speed;

                // Parallax: stars drift downward as user scrolls — different layers move at different rates
                s.y += scrollDelta * s.parallaxFactor;

                // Wrap vertically
                if (s.y < -s.size * 2) s.y = h + s.size;
                if (s.y > h + s.size * 2) s.y = -s.size;

                if (s.twinkle) {
                    s.twinklePhase += s.twinkleSpeed;
                    s.alpha = 0.08 + Math.abs(Math.sin(s.twinklePhase)) * 0.27;
                }

                ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.color;

                if (s.size > 1.8) {
                    ctx.shadowBlur = s.size * 2.5;
                    ctx.shadowColor = s.color;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ display: "block", width: "100%", height: "100%" }}
        />
    );
}