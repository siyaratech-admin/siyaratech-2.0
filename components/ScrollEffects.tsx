// components/ScrollEffects.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollEffectsProps {
  children: React.ReactNode;
}

export default function ScrollEffects({ children }: ScrollEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll setup
      let currentY = 0;
      let targetY = 0;
      let ease = 0.08;

      const updateScroll = () => {
        targetY = window.scrollY;
        currentY += (targetY - currentY) * ease;
        
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            y: -currentY
          });
        }
        
        requestAnimationFrame(updateScroll);
      };

      // Start smooth scroll
      updateScroll();

      // Disable default scroll behavior
      document.body.style.height = contentRef.current?.scrollHeight + 'px';
      document.body.style.overflow = 'hidden';

      // Create scroll-triggered animations
      const sections = gsap.utils.toArray('.scroll-section');
      
      sections.forEach((section: any, index) => {
        // Section reveal animation
        gsap.fromTo(section, 
          {
            opacity: 0,
            y: 100,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Parallax elements within sections
        const parallaxElements = section.querySelectorAll('.parallax-element');
        parallaxElements.forEach((element: any, i: number) => {
          gsap.to(element, {
            yPercent: -50 * (i + 1) * 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        });

        // Text reveal animations
        const textElements = section.querySelectorAll('.text-reveal');
        textElements.forEach((text: any) => {
          const chars = text.textContent.split('');
          text.innerHTML = chars.map((char: string) => 
            `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
          ).join('');

          gsap.to(text.querySelectorAll('.char'), {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      });

      // Magnetic cursor effect
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((element: any) => {
        element.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(element, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });

      return () => {
        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}