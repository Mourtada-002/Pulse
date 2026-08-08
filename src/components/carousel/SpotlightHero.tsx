"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { WATCHES } from "@/data/watches";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SpotlightHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const watchesRef = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 }); // After preloader

    // Spotlight fade in
    tl.fromTo(
      spotlightRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );

    // Initial position setup for watches
    updateWatchesPosition(0, false);

    // Main watch slide in from right
    gsap.fromTo(
      watchesRef.current[0],
      { x: 300, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
        delay: 2.5,
      }
    );

    // Text reveal
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3 }
    );
  }, []);

  function updateWatchesPosition(index: number, animate = true) {
    watchesRef.current.forEach((el, i) => {
      if (!el) return;

      const diff = i - index;
      let x = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 10;
      let blur = 0;

      if (diff === 0) {
        x = 0;
        scale = 1;
        opacity = 1;
        zIndex = 20;
        blur = 0;
      } else {
        // Calculate spread
        const absDiff = Math.abs(diff);
        const direction = diff > 0 ? 1 : -1;
        
        x = direction * (200 + absDiff * 100);
        scale = Math.max(0.4, 1 - absDiff * 0.25);
        opacity = Math.max(0, 1 - absDiff * 0.4);
        zIndex = 10 - absDiff;
        blur = absDiff * 2;
      }

      if (animate) {
        gsap.to(el, {
          x,
          scale,
          opacity,
          zIndex,
          filter: `blur(${blur}px)`,
          duration: 1,
          ease: "expo.out",
        });
      } else {
        gsap.set(el, {
          x,
          scale,
          opacity,
          zIndex,
          filter: `blur(${blur}px)`,
        });
      }
    });
  };

  const handleNext = () => {
    if (isAnimating || activeIndex === WATCHES.length - 1) return;
    setIsAnimating(true);
    const newIndex = activeIndex + 1;
    setActiveIndex(newIndex);
    animateTransition(newIndex);
  };

  const handlePrev = () => {
    if (isAnimating || activeIndex === 0) return;
    setIsAnimating(true);
    const newIndex = activeIndex - 1;
    setActiveIndex(newIndex);
    animateTransition(newIndex);
  };

  const animateTransition = (newIndex: number) => {
    // Text out
    gsap.to(textRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Text in
        gsap.fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      },
    });

    updateWatchesPosition(newIndex, true);

    // Reset animation lock
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Background Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 opacity-0 blur-[120px]"
      />

      {/* Watches Container */}
      <div
        ref={containerRef}
        className="relative flex h-[60vh] md:h-[700px] w-full max-w-7xl items-center justify-center"
      >
        {WATCHES.map((watch, index) => (
          <div
            key={watch.id}
            ref={(el) => {
              watchesRef.current[index] = el;
            }}
            className="absolute left-1/2 top-1/2 h-[450px] w-[350px] md:h-[650px] md:w-[500px] -translate-x-1/2 -translate-y-1/2 cursor-none"
            data-cursor="view"
            onClick={() => {
              if (index !== activeIndex && !isAnimating) {
                setIsAnimating(true);
                setActiveIndex(index);
                animateTransition(index);
              }
            }}
          >
            <div className="relative h-full w-full drop-shadow-2xl">
              <Image
                src={watch.image}
                alt={watch.name}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 z-30 -translate-y-1/2 md:left-24">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black disabled:opacity-20 disabled:hover:bg-black/50 disabled:hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 z-30 -translate-y-1/2 md:right-24">
          <button
            onClick={handleNext}
            disabled={activeIndex === WATCHES.length - 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black disabled:opacity-20 disabled:hover:bg-black/50 disabled:hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Dynamic Info */}
      <div
        ref={textRef}
        className="absolute bottom-8 md:bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-center opacity-0"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
          {WATCHES[activeIndex]?.name}
        </h2>
        <h3 className="mt-2 text-4xl font-light text-white md:text-5xl">
          {WATCHES[activeIndex]?.colorway}
        </h3>
        <p className="mt-4 text-xl font-medium text-white/80">
          ${WATCHES[activeIndex]?.price}
        </p>
      </div>
    </section>
  );
}
