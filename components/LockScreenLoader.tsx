"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import { ParticleConfig } from '../utils/particleSystem';



export default function LockScreenLoader() {
    const [logoSrc, setLogoSrc] = useState("/static_images/logo.png");
    const [config, setConfig] = useState<ParticleConfig>({
        gap: 6,
        sizeBase: 2,
        sizeVariation: 2,
        mouseRadius: 500,
        friction: 0.92,
        ease: 0.2,
        glow: false,
        bgOpacity: 0
    });

    useEffect(() => {
        // Force scroll to top on load
        window.scrollTo(0, 0);

        // Handle responsive logo and config
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setLogoSrc("/static_images/mob_logo.png");
                // Optimize for mobile: larger gap (fewer particles), no glow
                setConfig((prev: ParticleConfig) => ({ ...prev, gap: 12, glow: false }));
            } else {
                setLogoSrc("/static_images/logo.png");
                // Desktop settings
                setConfig((prev: ParticleConfig) => ({ ...prev, gap: 6, glow: false }));
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);

        const smoothScrollTo = (targetY: number, duration: number) => {
            const startY = window.scrollY;
            const diff = targetY - startY;
            let startTime: number | null = null;

            const animation = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing function (easeInOutCubic)
                const ease = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startY + diff * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        };

        const timer = setTimeout(() => {
            smoothScrollTo(window.innerHeight, 2500); // 2.5 seconds duration
        }, 5000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden snap-start">
            <div className="w-full h-full relative">
                <ParticleCanvas
                    imageSrc={logoSrc}
                    config={config}
                    className="w-full h-full"
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-10 font-semibold text-white text-sm tracking-widest font-light"
            >
                INITIALIZING INTELLIGENCE...
            </motion.div>
        </div>
    );
}
