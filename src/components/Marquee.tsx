"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let xPercent = 0;
    let direction = -1;
    let speed = 0.05;
    
    // Le ScrollTrigger qui modifie la vitesse de l'animation selon le scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          // La vitesse augmente temporairement lorsqu'on scroll
          speed = 0.05 + Math.abs(self.getVelocity() / 10000);
          direction = -1; 
        }
      }
    });

    const animation = () => {
      if (!text1Ref.current || !text2Ref.current) return;
      
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }
      
      gsap.set(text1Ref.current, { xPercent });
      gsap.set(text2Ref.current, { xPercent });
      
      // La vitesse redescend doucement vers sa valeur de base (0.05)
      speed = gsap.utils.interpolate(speed, 0.05, 0.1);
      xPercent += speed * direction;
      
      requestAnimationFrame(animation);
    };
    
    const req = requestAnimationFrame(animation);
    
    return () => {
      cancelAnimationFrame(req);
      tl.kill();
    };
  }, []);

  // Le texte qui va défiler
  const marqueeText = "PERFORMANCE • STYLE • INNOVATION • ";

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-12 md:py-24 bg-[#f5f5f5] overflow-hidden flex items-center"
    >
      <div className="relative flex whitespace-nowrap text-black font-black text-6xl md:text-9xl tracking-tighter uppercase">
        <div ref={text1Ref} className="flex px-4">
          {marqueeText.repeat(3)}
        </div>
        <div ref={text2Ref} className="flex px-4 absolute left-[100%]">
          {marqueeText.repeat(3)}
        </div>
      </div>
    </section>
  );
}
