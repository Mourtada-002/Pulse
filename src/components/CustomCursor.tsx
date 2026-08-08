"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

const emptySubscribe = () => () => {};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isFinePointer = isClient ? window.matchMedia("(pointer: fine)").matches : false;

  useEffect(() => {
    if (!isClient || !isFinePointer || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='view']");

      if (isInteractive) {
        // Dot disappears, ring snaps to border
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
        gsap.to(ring, { 
          scale: 0.8, 
          backgroundColor: "rgba(255,255,255,0.1)", 
          borderColor: "rgba(255,255,255,1)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        resetCursor();
        return;
      }
      
      const related = e.relatedTarget as HTMLElement;
      if (!related.closest("a, button, [role='button'], input, select, textarea, [data-cursor='view']")) {
        resetCursor();
      }
    };

    const resetCursor = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(ring, { 
        scale: 1, 
        backgroundColor: "transparent",
        borderColor: "rgba(255,255,255,0.5)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isClient, isFinePointer]);

  if (!isClient || !isFinePointer) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-100 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 transition-colors"
        style={{ willChange: "transform" }}
      />
      
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-101 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
