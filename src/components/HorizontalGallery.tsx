"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const GALLERY_IMAGES = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/macro.png",
  "/images/gallery/gym.png",
  "/images/gallery/rock.png",
  "/images/story/aerospace-titanium.jpg",
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinWrap = scrollRef.current;
    if (!pinWrap) return;

    const pinWrapWidth = pinWrap.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${pinWrapWidth}`,
      pin: true,
      animation: gsap.to(pinWrap, {
        x: -pinWrapWidth,
        ease: "none",
      }),
      scrub: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {/* Header text - positioned absolutely and won't interfere with images */}
      <div className="absolute left-6 top-8 z-10 md:left-24 md:top-12 text-white">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl drop-shadow-lg">
          Designed for Motion.
        </h2>
        <p className="mt-2 text-base text-gray-300 drop-shadow-md md:text-lg">
          Scroll to explore the collection.
        </p>
      </div>

      {/* Gallery - padded down on mobile to clear the header text */}
      <div className="flex h-full items-center pt-20 md:pt-0">
        <div ref={scrollRef} className="flex gap-8 px-6 md:px-24">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative h-[55vh] w-[70vw] shrink-0 overflow-hidden rounded-3xl md:h-[60vh] md:w-[40vw]"
              data-cursor="view"
            >
              <Image
                src={src}
                alt={`Gallery lifestyle image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 70vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
