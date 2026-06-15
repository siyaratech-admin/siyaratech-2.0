"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  icon?: React.ElementType<{ className?: string }>;
  onClick?: () => void;
  image?: string;
  className?: string;
  accentColor?: string;
}

export interface BentoProps {
  cards?: BentoCardProps[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 16;
const DEFAULT_SPOTLIGHT_RADIUS = 350;
const DEFAULT_GLOW_COLOR = '139, 92, 246';
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  {
    color: '#07000f',
    title: 'Analytics',
    description: 'Track user behavior and surface insights you never knew existed.',
    label: 'Insights',
    accentColor: '139, 92, 246'
  },
  {
    color: '#00080f',
    title: 'Dashboard',
    description: 'One unified view of all your critical data in real time.',
    label: 'Overview',
    accentColor: '34, 211, 238'
  },
  {
    color: '#07000f',
    title: 'Collaboration',
    description: 'Work together seamlessly across teams and timezones.',
    label: 'Teamwork',
    accentColor: '251, 113, 133'
  },
  {
    color: '#000d07',
    title: 'Automation',
    description: 'Streamline your most complex workflows effortlessly.',
    label: 'Efficiency',
    accentColor: '52, 211, 153'
  },
  {
    color: '#07000f',
    title: 'Integration',
    description: 'Connect all your favorite tools in one place.',
    label: 'Connectivity',
    accentColor: '251, 191, 36'
  },
  {
    color: '#07000e',
    title: 'Security',
    description: 'Enterprise-grade protection that never sleeps.',
    label: 'Protection',
    accentColor: '244, 114, 182'
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  const size = Math.random() * 3 + 1.5;
  el.className = 'bento-particle';
  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 ${size * 3}px rgba(${color}, 0.9), 0 0 ${size * 6}px rgba(${color}, 0.4);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.8
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

/* ─── Particle Card ──────────────────────────────────────────── */
const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  onClick?: () => void;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0, opacity: 0, duration: 0.4, ease: 'back.in(2)',
        onComplete: () => particle.parentNode?.removeChild(particle)
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 720,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1, yoyo: true
        });
        gsap.to(clone, {
          opacity: 0.15 + Math.random() * 0.5,
          duration: 1.2 + Math.random(),
          ease: 'power2.inOut',
          repeat: -1, yoyo: true
        });
      }, index * 80) as unknown as number;

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 4, rotateY: 4, duration: 0.4, ease: 'power3.out', transformPerspective: 1200 });
      }
      gsap.to(element, { '--shimmer-opacity': 1, duration: 0.4 } as gsap.TweenVars);
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      }
      gsap.to(element, { '--shimmer-opacity': 0, duration: 0.4 } as gsap.TweenVars);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        gsap.to(element, { rotateX, rotateY, duration: 0.12, ease: 'power2.out', transformPerspective: 1200 });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.06;
        const magnetY = (y - centerY) * 0.06;
        magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.35, ease: 'power2.out' });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y), Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px; height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.5) 0%, rgba(${glowColor}, 0.25) 25%, transparent 65%);
        left: ${x - maxDistance}px; top: ${y - maxDistance}px;
        pointer-events: none; z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, {
        scale: 1, opacity: 0, duration: 0.9, ease: 'power3.out',
        onComplete: () => ripple.remove()
      });
      if (onClick) onClick();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, onClick]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

/* ─── Global Spotlight ───────────────────────────────────────── */
const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'bento-global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 900px; height: 900px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.18) 0%,
        rgba(${glowColor}, 0.10) 12%,
        rgba(${glowColor}, 0.05) 25%,
        rgba(${glowColor}, 0.02) 45%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: none;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect
        && e.clientX >= rect.left && e.clientX <= rect.right
        && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' });
        cards.forEach(card => (card as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance)
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.08, ease: 'power2.out' });

      const targetOpacity = minDistance <= proximity ? 0.9
        : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.9
        : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.15 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.bento-card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current)
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

/* ─── Entrance Animation Hook ────────────────────────────────── */
const useEntranceAnimation = (gridRef: React.RefObject<HTMLDivElement | null>, disabled: boolean) => {
  useEffect(() => {
    if (disabled || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.bento-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.94, rotateX: 8 },
      {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 0.75, ease: 'power3.out',
        stagger: { amount: 0.5, from: 'start' },
        transformPerspective: 1200
      }
    );
  }, [gridRef, disabled]);
};

/* ─── Mobile Detection ───────────────────────────────────────── */
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/* ─── Noise Texture SVG ──────────────────────────────────────── */
const NoiseSVG = () => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035, pointerEvents: 'none', zIndex: 1 }}>
    <filter id="bnoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#bnoise)" />
  </svg>
);

/* ─── Card Label Badge ───────────────────────────────────────── */
const LabelBadge: React.FC<{ label: string; accentColor?: string }> = ({ label, accentColor }) => (
  <span
    className="bento-label"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: '999px',
      background: accentColor ? `rgba(${accentColor}, 0.12)` : 'rgba(255,255,255,0.06)',
      border: `1px solid ${accentColor ? `rgba(${accentColor}, 0.28)` : 'rgba(255,255,255,0.12)'}`,
      color: accentColor ? `rgb(${accentColor})` : 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}
  >
    <span
      style={{
        width: 5, height: 5, borderRadius: '50%',
        background: accentColor ? `rgb(${accentColor})` : 'rgba(255,255,255,0.5)',
        boxShadow: accentColor ? `0 0 6px rgba(${accentColor}, 0.8)` : 'none',
        flexShrink: 0
      }}
    />
    {label}
  </span>
);

/* ─── Main MagicBento Component ──────────────────────────────── */
const MagicBento: React.FC<BentoProps> = ({
  cards = cardData,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  useEntranceAnimation(gridRef, shouldDisableAnimations);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 260px;
          --glow-color: ${glowColor};
          --card-border: rgba(255,255,255,0.06);
          --card-border-hover: rgba(255,255,255,0.12);
          font-family: 'DM Sans', sans-serif;
        }

        .bento-card {
          transform-style: preserve-3d;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
          will-change: transform;
        }

        .bento-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .bento-card:hover::before {
          opacity: 1;
        }

        .bento-card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.45)) 25%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.15)) 50%,
            transparent 70%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 3;
          transition: opacity 0.3s ease;
        }

        .bento-card:hover {
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 8px 32px rgba(0,0,0,0.5),
            0 0 60px rgba(${glowColor}, 0.08);
          border-color: rgba(255,255,255,0.1) !important;
        }

        .bento-card__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.04) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .bento-card:hover .bento-card__shimmer {
          opacity: 1;
          animation: bentoShimmer 2s ease-in-out infinite;
        }

        @keyframes bentoShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .bento-card__aurora {
          position: absolute;
          inset: -50%;
          opacity: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.6s ease;
          filter: blur(40px);
        }

        .bento-card:hover .bento-card__aurora {
          opacity: 0.12;
          animation: bentoAurora 4s ease-in-out infinite alternate;
        }

        @keyframes bentoAurora {
          0% { transform: translate(-10%, -10%) scale(1); }
          100% { transform: translate(10%, 10%) scale(1.2); }
        }

        .bento-card__title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.95);
          margin: 0 0 0.4rem;
        }

        .bento-card__description {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.8125rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }

        .bento-card:hover .bento-card__description {
          color: rgba(255,255,255,0.6);
          transition: color 0.3s ease;
        }

        .bento-card__icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }

        .bento-card:hover .bento-card__icon-wrap {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
          transform: scale(1.08);
        }

        .bento-card__corner-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .bento-card:hover .bento-card__corner-dot {
          background: rgba(255,255,255,0.4);
          box-shadow: 0 0 6px rgba(255,255,255,0.3);
        }

        .bento-card__line {
          position: absolute;
          background: rgba(255,255,255,0.04);
          transition: background 0.4s ease;
        }

        .bento-card:hover .bento-card__line {
          background: rgba(255,255,255,0.08);
        }

        .text-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .text-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          width: 100%;
        }

        @media (min-width: 600px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 1280px) {
          .bento-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div
        className="bento-section"
        style={{
          width: '100%',
          maxWidth: '72rem',
          padding: '1.5rem',
          boxSizing: 'border-box'
        }}
      >
        <div className="bento-grid" ref={gridRef}>
          {cards.map((card, index) => {
            const accent = card.accentColor || glowColor;

            const baseClassName = `bento-card ${enableBorderGlow ? 'bento-card--border-glow' : ''} ${card.className || ''}`;

            const cardStyle: React.CSSProperties = {
              backgroundColor: card.color || '#07000f',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'white',
              padding: '1.375rem',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxSizing: 'border-box',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '260px',
            } as React.CSSProperties;

            const cardContent = (
              <>
                {/* Aurora blob */}
                <div
                  className="bento-card__aurora"
                  style={{ background: `radial-gradient(circle, rgba(${accent}, 0.7) 0%, transparent 70%)` }}
                />

                {/* Noise texture */}
                <NoiseSVG />

                {/* Decorative corner dots */}
                <div className="bento-card__corner-dot" style={{ top: 12, left: 12 }} />
                <div className="bento-card__corner-dot" style={{ top: 12, right: 12 }} />
                <div className="bento-card__corner-dot" style={{ bottom: 12, left: 12 }} />
                <div className="bento-card__corner-dot" style={{ bottom: 12, right: 12 }} />

                {/* Decorative grid lines */}
                <div className="bento-card__line" style={{ top: 0, left: '33.33%', width: 1, height: '100%' }} />
                <div className="bento-card__line" style={{ top: 0, left: '66.66%', width: 1, height: '100%' }} />
                <div className="bento-card__line" style={{ top: '50%', left: 0, height: 1, width: '100%' }} />

                {/* Shimmer overlay */}
                <div className="bento-card__shimmer" />

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, position: 'relative', zIndex: 10 }}>
                  {card.label && <LabelBadge label={card.label} accentColor={accent} />}
                  {card.icon && (
                    <div className="bento-card__icon-wrap">
                      <card.icon className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Background Image */}
                {card.image && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image
                      src={card.image} alt={card.title || ''}
                      fill sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover', opacity: 0.35 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }} />
                  </div>
                )}

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto' }}>
                  {/* Accent line */}
                  <div style={{
                    width: 28, height: 2, borderRadius: 2,
                    background: `linear-gradient(90deg, rgb(${accent}), transparent)`,
                    marginBottom: '0.6rem',
                    boxShadow: `0 0 8px rgba(${accent}, 0.6)`
                  }} />

                  <h3 className={`bento-card__title ${textAutoHide ? 'text-clamp-1' : ''}`}>
                    {card.title}
                  </h3>
                  <p className={`bento-card__description ${textAutoHide ? 'text-clamp-2' : ''}`}>
                    {card.description}
                  </p>
                </div>
              </>
            );

            if (enableStars) {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={accent}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                  onClick={card.onClick}
                >
                  {cardContent}
                </ParticleCard>
              );
            }

            return (
              <div key={index} className={baseClassName} style={cardStyle} onClick={card.onClick}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MagicBento;