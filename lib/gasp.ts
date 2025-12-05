// utils/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const initGSAP = () => {
  // Set default ease
  gsap.defaults({ ease: "power2.out" });
  
  // Refresh ScrollTrigger on resize
  ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.refresh());
};

export const createParallaxEffect = (element: string | Element, speed: number = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

export const createRevealAnimation = (element: string | Element, delay: number = 0) => {
  gsap.fromTo(element, 
    {
      y: 100,
      opacity: 0,
      scale: 0.8
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const createStaggerAnimation = (elements: string, delay: number = 0.1) => {
  gsap.fromTo(elements,
    {
      y: 60,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elements,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export { gsap, ScrollTrigger };