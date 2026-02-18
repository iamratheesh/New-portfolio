"use client";

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import React, { useRef } from 'react';
import styles from './Background_base.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Background_base: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lenis = new Lenis({
        duration: 1.4,

        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        touchMultiplier: 2,
        wheelMultiplier: 1,
      });

      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);

      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        lenisRef.current = null;
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={styles.background_base_main_container}>
      <div className={styles.background_base_image} />
      <div className={styles.background_base_texture} />
      <div className={styles.background_base_content}>
        {children}
      </div>

    </div>
  );
};

export default Background_base;
