import { HeroSection } from "@/components/home/HeroSection";
import { ImpactCounters } from "@/components/home/ImpactCounters";
import { MissionStatement } from "@/components/home/MissionStatement";
import { PortalCards } from "@/components/home/PortalCards";
import { WhyONE } from "@/components/home/WhyONE";

export function Home() {
  return (
    <main>
      <HeroSection />
      <ImpactCounters />
      <MissionStatement />
      <PortalCards />
      <WhyONE />
    </main>
  );
}
