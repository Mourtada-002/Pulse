import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SpotlightHero from "@/components/carousel/SpotlightHero";
import Marquee from "@/components/Marquee";
import ScrollStory from "@/components/ScrollStory";
import HorizontalGallery from "@/components/HorizontalGallery";
import MagneticCards from "@/components/MagneticCards";
import ScrollVideo from "@/components/ScrollVideo";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import ColorwayTeaser from "@/components/ColorwayTeaser";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Preloader />
      <Navbar />
      <SpotlightHero />
      <Marquee />
      
      <div id="innovation">
        <ScrollStory />
      </div>

      <div id="design">
        <HorizontalGallery />
      </div>

      <div id="watches">
        <MagneticCards />
      </div>

      <ScrollVideo />
      <Stats />

      <div id="support">
        <Testimonials />
      </div>

      <ColorwayTeaser />
      
      <div id="cta">
        <CTA />
      </div>

      <Footer />
    </main>
  );
}
