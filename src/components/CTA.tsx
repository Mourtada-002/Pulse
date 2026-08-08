"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Pulse animation between the two red colors
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        backgroundColor: "#ff2e00",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center px-6 py-32 text-center selection:bg-black selection:text-white"
      style={{ backgroundColor: "#e3000f" }}
    >
      <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full border border-black/20 px-4 py-1 text-sm font-bold uppercase tracking-widest text-black/80">
        Limited Edition Drop
      </div>
      
      <h2 className="mt-8 max-w-4xl text-6xl font-black uppercase tracking-tighter text-black md:text-8xl lg:text-[10rem] leading-none">
        Ready for the Future?
      </h2>
      
      <button className="group relative mt-16 overflow-hidden rounded-full bg-black px-12 py-5 text-xl font-bold text-white transition-transform hover:scale-105 active:scale-95">
        <span className="relative z-10">Secure Yours Now</span>
        <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
        <span className="absolute inset-0 z-10 flex h-full w-full items-center justify-center text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Secure Yours Now
        </span>
      </button>
    </section>
  );
}
