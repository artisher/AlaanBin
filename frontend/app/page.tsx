import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { LandingHero } from "@/components/LandingHero";
import Step from "@/components/Step";
import { WhyAlanbin } from "@/components/WhyAlanbin";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

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