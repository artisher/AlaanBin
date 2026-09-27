import { Cta } from "@/components/Cta";
import { HeroSection } from "@/components/HeroSection";
import { LandingHero } from "@/components/LandingHero";
import Step from "@/components/Step";
import { TopMovies } from "@/components/TopMovies";
import { TopMovieSkeleton } from "@/components/TopMovieSkeleton";
import { WhyAlanbin } from "@/components/WhyAlanbin";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      <LandingHero />
    
      <WhyAlanbin />
      <Step />
      <Cta />

    </div>
  );
}
