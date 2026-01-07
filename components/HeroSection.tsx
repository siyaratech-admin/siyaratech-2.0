"use client";
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import BlurText from '@/components/TextAnimations/BlurText/BlurText';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const LightPillar = dynamic(() => import('./LightPillar'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background/5" />
});

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
  onPrimaryCTA: () => void;
  onSecondaryCTA?: () => void;
  showStats?: boolean;
}

export default function HeroSection({
  subtitle,
  secondaryCTA,
  onPrimaryCTA,
  onSecondaryCTA,
}: HeroSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden ">
      <div className="absolute inset-0 w-full h-full z-0">
        <LightPillar
          topColor={isLight ? "#9333ea" : "#3b0764"} // Vibrant Purple for light mode
          bottomColor={isLight ? "#fbbf24" : "#f97316"} // Orange instead of Amber to reduce yellow
          middleColor={isLight ? "#f97316" : "#db2777"} // Pink instead of Orange for smoother gradient
          intensity={isLight ? 0.6 : 1.0} // Soft intensity
          rotationSpeed={0.8}
          glowAmount={isLight ? 0.005 : 0.007}
          pillarWidth={3.0}
          pillarHeight={0.3}
          noiseIntensity={isLight ? 3.0 : 2.0} // No noise for clean look
          pillarRotation={70}
          helixEnabled={true}
          helixSpeed={2}
          helixTightness={8.0}
          helixOpacity={1}
          interactive={false}
          mixBlendMode={isLight ? "normal" : "screen"}
        />
      </div>

      {/* Bottom Blur Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

      <div className="relative z-40 w-full text-center mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12 md:mb-0">
        {/* Subtitle Badge */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-primary tracking-wide uppercase">{subtitle}</span>
          </motion.div>
        )}

        {/* Title */}
        <h1 className="sr-only">Run Your Business on One Intelligent Platform</h1>
        <div className="mb-8 w-full max-w-full px-2 flex md:justify-center overflow-hidden" aria-hidden="true">
          <BlurText
            text="Run Your Business on One Intelligent Platform"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] !text-center break-words max-w-[90vw] mx-auto flex-wrap justify-center"
            as="p"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/80 dark:text-gray-300 mb-12 max-w-2xl leading-relaxed"
        >
          Siyaratech delivers an all-in-one ERP, CRM & AI Agent ecosystem designed to simplify operations, eliminate manual work, and unlock real-time business insights.
          <br /><span className="block mt-2 font-medium text-foreground dark:text-white font-semibold">Automate tasks. Predict outcomes. Empower every team.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button
            size="xl"
            variant="gradient"
            onClick={onPrimaryCTA}
            className="rounded-full"
          >
            Get Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {secondaryCTA && onSecondaryCTA && (
            <Button
              size="xl"
              variant="outline"
              onClick={onSecondaryCTA}
              className="rounded-full border-2"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Explore Products
            </Button>
          )}
        </motion.div>
      </div>
    </section >
  );
}