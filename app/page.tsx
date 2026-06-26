import { Cta } from "@/components/Cta";
import { HeroSection } from "@/components/HeroSection";
import Step from "@/components/Step";
import { TopMovies } from "@/components/TopMovies";
import { WhyAlanbin } from "@/components/WhyAlanbin";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TopMovies />
      <WhyAlanbin />
      <Step />
      <Cta />
    </div>
  );
}
