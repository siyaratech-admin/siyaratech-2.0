"use client";
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import BlurText from '@/components/TextAnimations/BlurText/BlurText';
import { motion } from 'framer-motion';
import GradientParticleCanvas from './GradientParticleCanvas';
import ThemeAwareBeams from './ThemeAwareBeams';

interface HeroSectionProps {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: string;
    secondaryCTA?: string;
    onPrimaryCTA: () => void;
    onSecondaryCTA?: () => void;
    showStats?: boolean;
}

export default function HeroSectionGradient({
    title,
    subtitle,
    description,
    primaryCTA,
    secondaryCTA,
    onPrimaryCTA,
    onSecondaryCTA,
}: HeroSectionProps) {
    return (
        <section className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden bg-none">
            <div className="absolute inset-0 w-full h-full z-0">
                <ThemeAwareBeams />
            </div>

            <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text */}
                <div className="flex flex-col items-start text-left">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 inline-flex items-center px-4 py-2 rounded-full border border-primary/20 "
                    >
                        <span className="flex h-2 w-2 rounded-full bg-brand-orange mr-2 animate-pulse"></span>
                        <span className="text-sm font-medium text-primary tracking-wide uppercase">{subtitle}</span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="max-w-2xl mb-8">
                        <BlurText
                            text={title}
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide uppercase text-foreground leading-[1.1]"
                        />
                    </h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
                    >
                        {description}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Button
                            size="lg"
                            onClick={onPrimaryCTA}
                            className="h-14 px-8 text-lg rounded-full bg-brand-gradient hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                        >
                            {primaryCTA}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        {secondaryCTA && onSecondaryCTA && (
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={onSecondaryCTA}
                                className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 transition-colors"
                            >
                                <Play className="mr-2 h-5 w-5 fill-current" />
                                {secondaryCTA}
                            </Button>
                        )}
                    </motion.div>
                </div>

                {/* Right Column: Particles */}
                <div className="w-full h-[500px] relative flex items-center justify-center">
                    <GradientParticleCanvas
                        imageSrc="/static_images/logo.png"
                        config={{
                            gap: 10,
                            sizeBase: 4,
                            sizeVariation: 4,
                            mouseRadius: 500,
                            friction: 0.92,
                            ease: 0.2,
                            glow: false,
                            bgOpacity: 0
                        }}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section >
    );
}
