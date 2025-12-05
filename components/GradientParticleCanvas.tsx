"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GradientParticle, initGradientParticlesFromImage } from '../utils/gradientParticleSystem';
import { ParticleConfig } from '../types/particle';

interface GradientParticleCanvasProps {
    imageSrc: string;
    config: ParticleConfig;
    className?: string;
}

const GradientParticleCanvas: React.FC<GradientParticleCanvasProps> = ({ imageSrc, config, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<GradientParticle[]>([]);
    const animationFrameRef = useRef<number>();
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            particlesRef.current = initGradientParticlesFromImage(
                ctx,
                canvas.width,
                canvas.height,
                img,
                config
            );
            setIsLoaded(true);
        };
    }, [imageSrc, config.gap]);

    const currentEase = useRef(0.01);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Enable additive blending for glowing overlap effect
        ctx.globalCompositeOperation = 'lighter';

        // Smoothly transition ease from slow (formation) to config value (interaction)
        currentEase.current += (config.ease - currentEase.current) * 0.015;

        const time = performance.now();
        particlesRef.current.forEach((particle) => {
            particle.update(mouseRef.current, { ...config, ease: currentEase.current }, time);
            particle.draw(ctx);
        });

        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [config]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -9999, y: -9999 };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [init]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        if (isLoaded) {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            animate();
        }
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isLoaded, animate]);

    return (
        <div className={className}>
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
