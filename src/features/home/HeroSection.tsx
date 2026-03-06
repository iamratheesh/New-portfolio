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

      gsap.set(changeAvatar, { opacity: 0, scale: 0.88, y: 24 });

      gsap.set(afterWrapper, { yPercent: 100 });
      gsap.set(afterImageWrap, { yPercent: -100 });

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftPanel,
        pinSpacing: false,
        anticipatePin: 1,
      });

      gsap.fromTo(
        baseAvatar,
        { scale: 6, x: '-350px', y: '600px' },
        {
          scale: 1,
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

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top+=${vh * 1.5}`,
          end: 'bottom bottom',
          scrub: true,
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
            duration: 1,
          },
          '<'
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={style.hero_main_container}>
      <div className={style.hero_main_container_content}>

        <div ref={leftPanelRef} className={style.hero_main_container_content_left}>
          <div className={style.hero_main_container_content_left_content}>

            <div className={style.animation_stage}>

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

              <div ref={afterWrapperRef} className={style.after_wrapper}>
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

        <div className={style.hero_main_container_content_right}>
          <div className={style.hero_main_container_content_right_screen1} >
            <div className={style.phase_one_content}>
              <h2>HI, I’M Ratheesh, I develop</h2>
              <h1>The Perfect <br /> Website</h1>
              <h2>For Your Business </h2>
            </div>
          </div>
          <div className={style.hero_main_container_content_right_screen2} >
            <div className={style.phase_two_content}>
              <div className={style.phase_two_content_top}>
                <h2>I’m a certified</h2>
                <h1>Web Developer</h1>
                <h2>by Days</h2>

              </div>
              <div className={style.phase_two_content_bottom}>
                <p>{`As your savior, I'm happy to show you what it's like to have a website that serves you and does the job it's supposed to.

                  Every website deserves a unique solution, whether it's advanced custom functionalities, a need for adequately set design systems for the simple creation of landing pages, or special custom animated projects`}</p>
              </div>

            </div>

          </div>
          <div className={style.hero_main_container_content_right_screen3} >
            <div className={style.phase_three_content}>
              <h2>and your</h2>
              <h1>Website <br /> Saviour</h1>
              <h2>By Night</h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
