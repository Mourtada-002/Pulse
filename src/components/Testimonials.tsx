"use client";

import { useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Alex Rivera",
    role: "Marathon Runner",
    text: "The tracking accuracy is unmatched. PULSE completely changed how I train for my marathons.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Product Designer",
    text: "Visually stunning. It's the first smartwatch that actually looks like a premium timepiece.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Tech Reviewer",
    text: "Battery life that defies logic and a display that ruins all other screens for you. Incredible.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    animateChange((activeIndex + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    animateChange((activeIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const animateChange = (newIndex: number) => {
    const tl = gsap.timeline();
    
    tl.to([textRef.current, authorRef.current], {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.fromTo(
          [textRef.current, authorRef.current],
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
      },
    });
  };

  return (
    <section className="bg-black py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-16 text-3xl font-bold text-white md:text-5xl">
          Don&apos;t just take our word for it.
        </h2>

        <div className="relative min-h-75 flex flex-col items-center justify-center">
          <div className="mb-8 flex space-x-2 text-yellow-500">
            {[...Array(REVIEWS[activeIndex].rating)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          
          <p
            ref={textRef}
            className="text-2xl md:text-4xl font-medium leading-relaxed text-white"
          >
            &quot;{REVIEWS[activeIndex].text}&quot;
          </p>
          
          <div ref={authorRef} className="mt-8">
            <h4 className="text-xl font-bold text-white">
              {REVIEWS[activeIndex].name}
            </h4>
            <p className="text-gray-400">{REVIEWS[activeIndex].role}</p>
          </div>

          <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="p-3 text-white/50 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2">
            <button
              onClick={handleNext}
              className="p-3 text-white/50 transition-colors hover:text-white"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
