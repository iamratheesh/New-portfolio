'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import style from './home.style.module.scss';

gsap.registerPlugin(ScrollTrigger);

const IMAGE_SIZE = 400;

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const beforeWrapperRef = useRef<HTMLDivElement>(null);
  const baseAvatarRef = useRef<HTMLDivElement>(null);
  const changeAvatarRef = useRef<HTMLDivElement>(null);
  const afterWrapperRef = useRef<HTMLDivElement>(null);
  // ✅ Wrap the after-image in a div so we can ref it safely with Next.js <Image>
  const afterImageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const leftPanel = leftPanelRef.current;
      const beforeWrapper = beforeWrapperRef.current;
      const baseAvatar = baseAvatarRef.current;
      const changeAvatar = changeAvatarRef.current;
      const afterWrapper = afterWrapperRef.current;
      const afterImageWrap = afterImageWrapRef.current;

      if (
        !container ||
        !leftPanel ||
        !beforeWrapper ||
        !baseAvatar ||
        !changeAvatar ||
        !afterWrapper ||
        !afterImageWrap
      ) return;

      const vh = window.innerHeight;

      // ─── Initial states ───────────────────────────────────────────────────────
      // changeAvatar: hidden, slightly scaled-down and nudged down
      gsap.set(changeAvatar, { opacity: 0, scale: 0.88, y: 24 });

      // afterWrapper clips from below; inner wrap counter-translates so the image
      // appears to "slide up into view" rather than stretching.
      gsap.set(afterWrapper, { yPercent: 100 });
      gsap.set(afterImageWrap, { yPercent: -100 });

      // ─── Pin left panel while right panel scrolls ─────────────────────────────
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftPanel,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // ─── Phase 1 — base avatar zooms from extreme to resting position ─────────
      gsap.fromTo(
        baseAvatar,
        { scale: 4.5, x: '-100%', y: '100%' },
        {
          scale: 1,           // ✅ land at natural scale (was 0.8 — caused size mismatch)
          x: '0%',
          y: '0%',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `top+=${vh}`,
            scrub: 1,
          },
        }
      );

      // ─── Phase 2 — changeAvatar fades / scales in ────────────────────────────
      gsap.to(changeAvatar, {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: `top+=${vh}`,
          end: `top+=${vh * 1.5}`,
          scrub: 1.2,
        },
      });

      // ─── Phase 3 — after image reveals with clip-slide effect ─────────────────
      // ✅ Both tweens share the SAME duration so they stay perfectly in sync when
      //    scrubbing forward OR backward.
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top+=${vh * 1.5}`,   // ✅ start after phase 2 finishes
          end: 'bottom bottom',
          scrub: true,
          // ✅ onLeaveBack / onEnter snapbacks handled automatically by scrub:true
        },
      });

      revealTimeline
        .to(afterWrapper, {
          yPercent: 0,
          ease: 'power2.inOut',
          duration: 1,
        })
        .to(
          afterImageWrap,
          {
            yPercent: 0,
            ease: 'power2.inOut',
            duration: 1,   // ✅ identical duration to wrapper tween
          },
          '<'              // start at the same time — keeps both in lock-step
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={style.hero_main_container}>
      <div className={style.hero_main_container_content}>

        {/* ── LEFT (pinned) ────────────────────────────────────────────── */}
        <div ref={leftPanelRef} className={style.hero_main_container_content_left}>
          <div className={style.hero_main_container_content_left_content}>

            <div className={style.animation_stage}>

              {/* BEFORE layer */}
              <div ref={beforeWrapperRef} className={style.before_wrapper}>

                <div ref={baseAvatarRef} className={style.base_avatar_container}>
                  <Image
                    src="/assets/images/base_avatar.png"
                    alt="Base Avatar"
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    priority
                  />
                </div>

                <div ref={changeAvatarRef} className={style.change_avatar_container}>
                  <Image
                    src="/assets/images/avatar_bg.svg"
                    alt="Avatar Background"
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    priority
                  />
                </div>

              </div>

              {/* AFTER layer — wrapper clips; inner div counter-translates */}
              <div ref={afterWrapperRef} className={style.after_wrapper}>
                {/* ✅ div wrapper so GSAP can move it independently of the Next.js Image */}
                <div ref={afterImageWrapRef} className={style.after_image_wrap}>
                  <Image
                    src="/assets/images/orgnal_avatat.png"
                    alt="Original Real Person Avatar"
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    className={style.after_image}
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── RIGHT (scrolls normally) ──────────────────────────────────── */}
        <div className={style.hero_main_container_content_right}>
          <div className={style.hero_main_container_content_right_screen1} />
          <div className={style.hero_main_container_content_right_screen2} />
          <div className={style.hero_main_container_content_right_screen3} />
        </div>

      </div>
    </section>
  );
};
