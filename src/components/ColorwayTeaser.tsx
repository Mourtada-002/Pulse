"use client";

import { useState } from "react";
import Image from "next/image";

const COLORWAYS = [
  { name: "Obsidian", color: "bg-zinc-900", image: "/images/watches/watch-black-transparent.png" },
  { name: "Titanium", color: "bg-zinc-400", image: "/images/watches/watch-silver-transparent.png" },
  { name: "Crimson", color: "bg-red-800", image: "/images/watches/watch-red-transparent.png" },
  { name: "Alpine", color: "bg-zinc-100", image: "/images/watches/watch-white-transparent.png" },
];

export default function ColorwayTeaser() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-zinc-950 py-32 px-6">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <h2 className="mb-12 text-center text-4xl font-bold text-white md:text-6xl tracking-tight">
          Make it yours.
        </h2>
        
        <div className="relative h-100 w-full max-w-2xl overflow-hidden rounded-3xl bg-black">
          {COLORWAYS.map((c, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeIdx === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex space-x-6">
          {COLORWAYS.map((c, i) => (
            <button
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              className={`h-12 w-12 rounded-full border-2 transition-transform hover:scale-110 ${
                activeIdx === i ? "border-white scale-110" : "border-transparent"
              } ${c.color}`}
              aria-label={c.name}
            />
          ))}
        </div>
        <p className="mt-6 text-xl font-medium text-white">
          {COLORWAYS[activeIdx].name}
        </p>
      </div>
    </section>
  );
}
