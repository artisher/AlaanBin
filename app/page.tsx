import { Cta } from "@/components/Cta";
import { HeroSection } from "@/components/HeroSection";
import Step from "@/components/Step";
import { TopMovies } from "@/components/TopMovies";
import { TopMovieSkeleton } from "@/components/TopMovieSkeleton";
import { WhyAlanbin } from "@/components/WhyAlanbin";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <Suspense fallback={<TopMovieSkeleton />}>
        <TopMovies />
      </Suspense>
      <WhyAlanbin />
      <Step />
      <Cta />
    </div>
  );
}
