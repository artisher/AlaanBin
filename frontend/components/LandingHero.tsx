
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";

import { HeroSlider } from "@/components/HeroSlider";
import { MovieCard } from "@/components/MovieCard";
import type { Movie } from "@/types/movies";
import { TopMovieSkeleton } from "./TopMovieSkeleton";
import { MovieModal } from "./MovieMedal";

interface LandingHeroProps {
    initialMovies: Movie[];
}

export const LandingHero = ({
    initialMovies,
}: LandingHeroProps) => {
    const topWeekMovies = initialMovies;

    const [selectedMovie, setSelectedMovie] =
        useState<Movie | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (topWeekMovies.length === 0) {
        return null;
    }

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <section className="relative pb-5">
            <HeroSlider
                movies={topWeekMovies.slice(0, 8)}
                onMovieClick={handleMovieClick}
            />

            <Suspense fallback={<TopMovieSkeleton />}>
                <div className="relative z-20 -mt-[155px]">
                    <div className="mx-auto max-w-[1650px] px-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">
                                برتر هفته
                            </h2>

                            <Link
                                href="/movies?topWeek=true"
                                className="text-sm text-gray-400 transition hover:text-[#14c78b]"
                            >
                                مشاهده همه
                            </Link>
                        </div>

                        <div className="flex gap-5 overflow-hidden">
                            {topWeekMovies.map((movie) => (
                                <div key={movie._id} className="shrink-0">
                                    <MovieCard
                                        movie={movie}
                                        onClick={() => handleMovieClick(movie)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Suspense>

            <MovieModal
                movie={selectedMovie}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
};
