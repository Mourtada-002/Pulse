"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATS = [
  { value: 10, suffix: "K+", label: "Watches Sold" },
  { value: 50, suffix: "+", label: "Interchangeable Bands" },
  { value: 4.9, suffix: "/5", label: "Customer Satisfaction", decimals: 1 },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        countersRef.current.forEach((el, index) => {
          if (!el) return;
          const targetObj = STATS[index];
          const startValue = { val: 0 };
          
          gsap.to(startValue, {
            val: targetObj.value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.innerText = startValue.val.toFixed(targetObj.decimals || 0) + targetObj.suffix;
            },
          });
        });
      },
      once: true,
    });
    
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-zinc-950 py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <span
                ref={(el) => {
                  countersRef.current[idx] = el;
                }}
                className="text-6xl md:text-8xl font-black text-white tracking-tighter"
              >
                0{stat.suffix}
              </span>
              <span className="mt-4 text-xl font-medium text-gray-400 uppercase tracking-widest text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
