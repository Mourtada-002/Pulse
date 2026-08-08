"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Footer() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Parallax effect
    gsap.to(textRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <footer className="relative flex flex-col items-center justify-between overflow-hidden bg-black pt-32 pb-8 text-white">
      <div className="z-10 flex w-full max-w-7xl flex-col items-center justify-between px-6 md:flex-row md:items-start">
        <div className="mb-12 flex flex-col items-center md:items-start">
          <div className="text-3xl font-black tracking-tighter">PULSE</div>
          <p className="mt-4 max-w-xs text-center text-gray-400 md:text-left">
            Redefining the relationship between you and your time.
          </p>
        </div>
        
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col space-y-4">
            <h4 className="font-bold text-gray-500 uppercase">Products</h4>
            <a href="#" className="hover:text-gray-300">Series 1</a>
            <a href="#" className="hover:text-gray-300">Elite</a>
            <a href="#" className="hover:text-gray-300">Active</a>
            <a href="#" className="hover:text-gray-300">Accessories</a>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-bold text-gray-500 uppercase">Company</h4>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Careers</a>
            <a href="#" className="hover:text-gray-300">Press</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </div>

      <div className="z-10 mt-24 flex w-full max-w-7xl items-center justify-between border-t border-white/10 px-6 pt-8">
        <p className="text-sm text-gray-500">© 2026 PULSE Inc. All rights reserved.</p>
        <div className="flex space-x-6 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </div>

      {/* Giant Background Text */}
      <h1
        ref={textRef}
        className="pointer-events-none absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center text-[15vw] font-black uppercase tracking-tighter text-white/5 opacity-50"
        style={{ lineHeight: 0.8 }}
      >
        PULSE
      </h1>
    </footer>
  );
}
