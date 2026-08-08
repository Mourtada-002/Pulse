"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Reveal navbar after preloader
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 2.8 }
    );
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 top-0 z-40 flex w-full items-center justify-between px-6 py-4 transition-colors duration-500 md:px-12 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="text-2xl font-black tracking-tighter text-white">
        PULSE
      </div>
      
      <div className="hidden items-center space-x-8 md:flex">
        {["Watches", "Innovation", "Design", "Support"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => scrollTo(e, `#${item.toLowerCase()}`)}
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            {item}
          </a>
        ))}
      </div>

      <a
        href="#cta"
        onClick={(e) => scrollTo(e, "#cta")}
        className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
      >
        Pre-order
      </a>
    </nav>
  );
}
