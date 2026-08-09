"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    document.body.style.overflow = "hidden";

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.in",
        delay: 0.5,
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          if (containerRef.current) containerRef.current.style.display = "none";
        },
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        ref={textRef}
        className="translate-y-10 text-4xl font-bold tracking-widest text-white opacity-0 md:text-6xl"
      >
        PULSE
      </div>
    </div>
  );
}
