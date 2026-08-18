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
      {/* <Suspense fallback={<TopMovieSkeleton />}>
        <TopMovies />
      </Suspense> */}
      <WhyAlanbin />
      <Step />
      <Cta />
      <div style={{
        backgroundColor: "red",
        color: "white",
        fontSize: "60px",
        padding: "40px"
      }}>
        TEST TV
      </div>
      <div className="bg-red-500 text-white text-6xl p-10">
        TEST TAILWIND
      </div>
      <div className="test-tv">
        TEST CSS
      </div>
      <div className="test-tv-var">
        TEST VAR
      </div>
    </div>
  );
}
