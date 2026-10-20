
import type { Metadata } from "next";
import { preload } from "react-dom";

import { Cta } from "@/components/Cta";
import { LandingHero } from "@/components/LandingHero";
import Step from "@/components/Step";
import { WhyAlanbin } from "@/components/WhyAlanbin";
import type { Movie } from "@/types/movies";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://alanbin.com";

async function getTopWeekMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/movies?page=1&limit=8&topWeek=true&sort=highRating`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch homepage movies:",
        response.status
      );
      return [];
    }

    const data = await response.json();

    return Array.isArray(data.movies) ? data.movies : [];
  } catch (error) {
    console.error("Homepage movies error:", error);
    return [];
  }
}

export default async function Home() {
  const movies = await getTopWeekMovies();

  const firstMovie = movies[0];

  if (firstMovie) {
    const imageUrl = firstMovie.heroImage || firstMovie.poster;

    if (imageUrl) {
      try {
        preload(new URL(imageUrl, API_URL).toString(), {
          as: "image",
          fetchPriority: "high",
        });
      } catch (error) {
        console.error("Hero image preload error:", error);
      }
    }
  }

  return (
    <div className="overflow-x-hidden">
      <LandingHero initialMovies={movies} />
      <WhyAlanbin />
      <Step />
      <Cta />
    </div>
  );
}
