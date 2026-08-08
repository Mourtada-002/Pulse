"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useMouse } from "@/hooks/useMouse";
import { gsap } from "@/lib/gsap";

const CARDS = [
  {
    title: "PULSE Series 1",
    desc: "The everyday essential.",
    image: "/images/watches/watch-black-transparent.png",
  },
  {
    title: "PULSE Elite",
    desc: "Crafted for luxury.",
    image: "/images/watches/watch-silver-transparent.png",
  },
  {
    title: "PULSE Active",
    desc: "Your workout companion.",
    image: "/images/watches/watch-volt-transparent.png",
  },
];

function MagneticCard({ card }: { card: typeof CARDS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMouse(cardRef);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      x: x * 0.1,
      y: y * 0.1,
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      duration: 1,
      ease: "power2.out",
    });
  }, [x, y]);

  return (
    <div
      ref={cardRef}
      className="group relative h-100 w-full max-w-sm rounded-3xl bg-zinc-900 p-6 transition-all"
      data-cursor="view"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${x + 150}px ${y + 200}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div
        className="relative h-64 w-full"
        style={{ transform: "translateZ(50px)" }}
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain"
        />
      </div>
      <div
        className="mt-6"
        style={{ transform: "translateZ(30px)" }}
      >
        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
        <p className="text-gray-400">{card.desc}</p>
      </div>
    </div>
  );
}

export default function MagneticCards() {
  return (
    <section className="bg-black pt-32 pb-12 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-white md:text-5xl">
          Discover the Lineup
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 justify-items-center">
          {CARDS.map((card, idx) => (
            <MagneticCard key={idx} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
