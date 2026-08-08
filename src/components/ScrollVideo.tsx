"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      },
    });

    tl.fromTo(
      watchRef.current,
      { scale: 0.8, rotation: -15, opacity: 0 },
      { scale: 1.5, rotation: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
    )
    .to(
      watchRef.current,
      { scale: 2.5, rotation: 10, opacity: 0, duration: 1, ease: "power1.inOut" }
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.5 
    )
    .to(
      textRef.current,
      { opacity: 0, y: -50, duration: 0.5 },
      1.5
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={watchRef} className="relative h-[80vh] w-[80vw] md:h-screen max-w-full opacity-0" data-cursor="view">
          <Image
            src="/images/watches/watch-black-transparent.png"
            alt="360 View"
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div ref={textRef} className="text-center opacity-0">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            Every detail, <br/> perfect.
          </h2>
        </div>
      </div>
    </section>
  );
}
