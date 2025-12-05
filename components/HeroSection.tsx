"use client";
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { GridBeams } from './magicui/grid-beams';
import ColorBends from './ColorBends';
import BlurText from '@/components/TextAnimations/BlurText/BlurText';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import Beams from './Beams';

// ... existing imports

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

export default function HeroSection({
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
        <Beams
          beamWidth={4}
          beamHeight={30}
          beamNumber={24}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.1}
          rotation={30}
          colors={['#833AB4', '#FD1D1D', '#FCB045']}
        />
      </div>

      <div className="relative z-40 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Title */}
        <div className="mb-8 w-full flex justify-center">
          <BlurText
            text={title}
            delay={50}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] text-center"
            as="h1"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button
            size="lg"
            onClick={onPrimaryCTA}
            className="h-14 px-8 text-md font-semibold rounded-full bg-brand-gradient hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            {primaryCTA}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {secondaryCTA && onSecondaryCTA && (
            <Button
              size="lg"
              variant="outline"
              onClick={onSecondaryCTA}
              className="h-14 px-8 text-md font-semibold rounded-full border-2 hover:bg-secondary/50 transition-colors"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              {secondaryCTA}
            </Button>
          )}
        </motion.div>
      </div>
    </section >
  );
}