"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    ParticleBuffers,
    initParticlesFromImage,
    updateParticles,
    drawParticles,
} from '../utils/gradientParticleSystem';
import { ParticleConfig } from '../types/particle';

interface GradientParticleCanvasProps {
    imageSrc: string;
    config: ParticleConfig;
    className?: string;
}

const GradientParticleCanvas: React.FC<GradientParticleCanvasProps> = ({
    imageSrc,
    config,
    className,
}) => {
    // Two canvases:
    //   readCtx  — off-screen, willReadFrequently:true, only used during init for getImageData
    //   drawCtx  — visible canvas, NO willReadFrequently so the browser can GPU-accelerate it
    const canvasRef      = useRef<HTMLCanvasElement>(null);
    const offscreenRef   = useRef<HTMLCanvasElement | null>(null);
    const drawCtxRef     = useRef<CanvasRenderingContext2D | null>(null);
    const readCtxRef     = useRef<CanvasRenderingContext2D | null>(null);

    const buffersRef     = useRef<ParticleBuffers | null>(null);
    const rafRef         = useRef<number>(0);
    const mouseRef       = useRef({ x: -9999, y: -9999 });
    const easeRef        = useRef(0.01);
    const configRef      = useRef(config);
    const radiusSqRef    = useRef(config.mouseRadius * config.mouseRadius);
    const visibleRef     = useRef(true);   // pause when tab/element hidden

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        configRef.current = config;
        radiusSqRef.current = config.mouseRadius * config.mouseRadius;
    }, [config]);

    // ── Init ──────────────────────────────────────────────────────────────────
    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Visible canvas — no willReadFrequently → GPU path stays active
        if (!drawCtxRef.current) {
            drawCtxRef.current = canvas.getContext('2d') ?? null;
        }

        // Off-screen scratch canvas — only used to read pixel data from the image
        if (!offscreenRef.current) {
            offscreenRef.current = document.createElement('canvas');
        }
        const offscreen = offscreenRef.current;

        const parent       = canvas.parentElement;
        const cw           = parent ? parent.clientWidth  : window.innerWidth;
        const ch           = parent ? parent.clientHeight : window.innerHeight;
        canvas.width       = cw;
        canvas.height      = ch;
        offscreen.width    = cw;
        offscreen.height   = ch;

        if (!readCtxRef.current) {
            readCtxRef.current = offscreen.getContext('2d', { willReadFrequently: true }) ?? null;
        }

        const readCtx = readCtxRef.current;
        if (!readCtx) return;

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageSrc;
        img.onload = () => {
            buffersRef.current = initParticlesFromImage(
                readCtx, cw, ch, img, configRef.current, cw, ch
            );
            easeRef.current = 0.01; // reset ease ramp on every init
            setIsLoaded(true);
        };
    }, [imageSrc]);

    // ── Animation loop ────────────────────────────────────────────────────────
    const animate = useCallback(() => {
        if (!visibleRef.current) {
            rafRef.current = requestAnimationFrame(animate);
            return;
        }

        const canvas = canvasRef.current;
        const ctx    = drawCtxRef.current;
        const b      = buffersRef.current;
        if (!canvas || !ctx || !b) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ramp ease
        const cfg = configRef.current;
        easeRef.current += (cfg.ease - easeRef.current) * 0.015;

        updateParticles(
            b,
            mouseRef.current.x,
            mouseRef.current.y,
            radiusSqRef.current,
            cfg.friction,
            easeRef.current,
            performance.now(),
        );

        // lighter composite only for the draw call, then reset
        ctx.globalCompositeOperation = 'lighter';
        drawParticles(ctx, b);
        ctx.globalCompositeOperation = 'source-over';

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    // ── Visibility — pause RAF when tab/element hidden ────────────────────────
    useEffect(() => {
        const onVisibility = () => { visibleRef.current = !document.hidden; };
        document.addEventListener('visibilitychange', onVisibility);

        // IntersectionObserver: pause when canvas scrolls off screen
        const observer = new IntersectionObserver(
            ([entry]) => { visibleRef.current = entry.isIntersecting && !document.hidden; },
            { threshold: 0 }
        );
        if (canvasRef.current) observer.observe(canvasRef.current);

        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
            observer.disconnect();
        };
    }, []);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -9999, y: -9999 };
    }, []);

    // ── Resize debounced ──────────────────────────────────────────────────────
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const onResize = () => { clearTimeout(timer); timer = setTimeout(init, 250); };
        window.addEventListener('resize', onResize);
        return () => { clearTimeout(timer); window.removeEventListener('resize', onResize); };
    }, [init]);

    // ── Mount ─────────────────────────────────────────────────────────────────
    useEffect(() => { init(); }, [init]);

    // ── Start RAF ─────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isLoaded) return;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isLoaded, animate]);

    return (
        <div className={className} style={{ position: 'relative' }}>
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50 animate-pulse">
                    <span className="text-xl font-light tracking-widest">LOADING...</span>
                </div>
            )}
        </div>
    );
};

export default GradientParticleCanvas;