// components/SplashScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle absolute w-1 h-1 bg-primary rounded-full opacity-0';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesRef.current?.appendChild(particle);
      }

      // Initial setup
      gsap.set([logoRef.current, textRef.current, progressRef.current], {
        opacity: 0,
        y: 50
      });

      // Particles animation
      gsap.to('.particle', {
        opacity: 0.6,
        scale: Math.random() * 2 + 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: 'random'
        },
        ease: 'power2.inOut'
      });

      // Main animation sequence
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(logoRef.current, {
        rotationY: 360,
        duration: 1.5,
        ease: 'power2.inOut'
      }, '-=0.5')
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=1')
      .to(progressRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5');

      // Progress animation
      const progressTl = gsap.timeline({ delay: 1.5 });
      progressTl.to({}, {
        duration: 3,
        ease: 'power2.out',
        onUpdate: function() {
          const prog = Math.round(this.progress() * 100);
          setProgress(prog);
          gsap.to('.progress-bar', {
            width: prog + '%',
            duration: 0.1
          });
        },
        onComplete: () => {
          setTimeout(() => setShowEnter(true), 500);
        }
      });

      // Typing effect for loading text
      gsap.to('.loading-text', {
        duration: 2,
        text: 'Initializing Experience...',
        ease: 'none',
        delay: 2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: onComplete
      });
    }, containerRef);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-background via-primary/5 to-chart-1/10 flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,58,170,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(138,58,170,0.05)_50%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-chart-1 rounded-3xl flex items-center justify-center shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-1 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <Zap className="w-12 h-12 text-white relative z-10" />
          </div>
        </div>

        {/* Brand Name */}
        <div ref={textRef} className="mb-12">
          <h1 className="text-4xl font-bold text-brand-gradient mb-2">
            YourBrand
          </h1>
          <p className="text-muted-foreground loading-text">Loading...</p>
        </div>

        {/* Progress */}
        <div ref={progressRef} className="mb-8">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div className="progress-bar h-full bg-brand-gradient rounded-full transition-all duration-300 ease-out" style={{ width: '0%' }}></div>
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>

        {/* Enter Button */}
        {showEnter && (
          <button
            onClick={handleEnter}
            className="group bg-brand-gradient hover:bg-brand-gradient-hover text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 animate-fade-in"
          >
            <span className="flex items-center">
              Enter Experience
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-chart-1/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
}