import ScrollHero from "@/components/ScrollHero";
import MetricsBar from "@/components/MetricsBar";
import CVSection from "@/components/CVSection";
import Terminal from "@/components/Terminal";
import ContactSection from "@/components/ContactSection";
import FloatingPlayer from "@/components/FloatingPlayer";
import Navbar from "@/components/Navbar";
import SoundToggle from "@/components/SoundToggle";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollHero />
      <MetricsBar />
      <CVSection />
      <Terminal />
      <ContactSection />
      <FloatingPlayer />
      <SoundToggle />
    </main>
  );
}
