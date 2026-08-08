"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STORY_ITEMS = [
  {
    title: "Precision Dial",
    desc: "A stunning edge-to-edge display with deep blacks and vibrant colors.",
    image: "/images/story/precision-dial.jpg",
  },
  {
    title: "Aerospace Titanium",
    desc: "Forged for extreme durability while remaining impossibly light.",
    image: "/images/story/aerospace-titanium.jpg",
  },
  {
    title: "Advanced Sensors",
    desc: "Real-time health tracking with medical-grade precision on your wrist.",
    image: "/images/story/advanced-sensors.jpg",
  },
];

export default function ScrollStory() {
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // We pin the container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${STORY_ITEMS.length * 100}%`,
      pin: true,
      animation: buildTimeline(),
      scrub: 1,
    });

    function buildTimeline() {
      const tl = gsap.timeline();

      STORY_ITEMS.forEach((_, i) => {
        if (i === 0) return; // First item is already visible

        // Hide previous text, show new text
        tl.to(
          textsRef.current[i - 1],
          { opacity: 0, y: -20, duration: 1 },
          `step${i}`,
        ).fromTo(
          textsRef.current[i],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          `step${i}`,
        );

        // Transition images (fade/scale crossfade)
        tl.to(
          imagesRef.current[i - 1],
          { opacity: 0, scale: 1.1, duration: 1 },
          `step${i}`,
        ).fromTo(
          imagesRef.current[i],
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1 },
          `step${i}`,
        );
      });

      return tl;
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        {STORY_ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              imagesRef.current[i] = el;
            }}
            className="absolute inset-0 h-full w-full opacity-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover opacity-50"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {STORY_ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              textsRef.current[i] = el;
            }}
            className="absolute flex max-w-2xl flex-col items-center justify-center text-center px-4"
            style={{
              opacity: i === 0 ? 1 : 0,
              pointerEvents: i === 0 ? "auto" : "none",
            }}
          >
            <h2 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              {item.title}
            </h2>
            <p className="mt-6 text-xl text-gray-300 md:text-2xl">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
