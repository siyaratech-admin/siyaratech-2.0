"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Particle, initParticlesFromImage } from '../utils/particleSystem';
import { ParticleConfig } from '../types/particle';

interface ParticleCanvasProps {
    imageSrc: string;
    config: ParticleConfig;
    className?: string;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ imageSrc, config, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize Particles
    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        // Set canvas size
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
            particlesRef.current = initParticlesFromImage(
                ctx,
                canvas.width,
                canvas.height,
                img,
                config
            );
            setIsLoaded(true);
        };
    }, [imageSrc, config.gap]); // Re-init when image or density changes

    const currentEase = useRef(0.01);

    // Animation Loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas with slight opacity for trails (optional, configured via config)
        // Use transparent background for integration
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Global effects
        if (config.glow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255,255,255,0.5)';
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for "glowing energy" look
        } else {
            ctx.shadowBlur = 0;
            ctx.globalCompositeOperation = 'source-over';
        }

        // Smoothly transition ease from slow (formation) to config value (interaction)
        currentEase.current += (config.ease - currentEase.current) * 0.001;

        const time = performance.now();
        particlesRef.current.forEach((particle) => {
            particle.update(mouseRef.current, { ...config, ease: currentEase.current }, time);
            particle.draw(ctx);
        });

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [config]);

    // Setup Interaction
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

    // Handle Init
    useEffect(() => {
        init();
    }, [init]);

    // Handle Animation
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

export default ParticleCanvas;
