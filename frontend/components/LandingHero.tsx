"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

import { HeroSlider } from "@/components/HeroSlider";
import { MovieCard } from "@/components/MovieCard";

import type { Movie } from "@/types/movies";
import { TopMovieSkeleton } from "./TopMovieSkeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const LandingHero = () => {
    const [topWeekMovies, setTopWeekMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopWeekMovies = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/api/movies?topWeek=true&limit=10`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch top week movies");
                }

                const data = await res.json();

                setTopWeekMovies(data.movies || []);
            } catch (error) {
                console.error(
                    "Error fetching top week movies:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTopWeekMovies();
    }, []);

    if (loading || topWeekMovies.length === 0) {
        return null;
    }

    const handleMovieClick = (movie: Movie) => {
        // کاربر هنوز لاگین نکرده
        // فعلاً می‌تونیم بعداً رفتار کلیک رو مشخص کنیم
        console.log("Movie clicked:", movie);
    };

    return (
        <section className="relative pb-5">

            {/* ================= Hero ================= */}

            <HeroSlider
                movies={topWeekMovies.slice(0, 5)}
                onMovieClick={handleMovieClick}
            />


            {/* ================= برتر هفته ================= */}
            <Suspense fallback={<TopMovieSkeleton />}>


                <div className="relative z-20 -mt-[155px]">

                    <div className="
                    mx-auto
                    max-w-[1650px]
                    px-5
                ">

                        <div className="
                        mb-4
                        flex
                        items-center
                        justify-between
                    ">

                            <h2 className="
                            text-2xl
                            font-bold
                            text-white
                        ">
                                برتر هفته
                            </h2>

                            <Link
                                href="/movies?topWeek=true"
                                className="
                                text-sm
                                text-gray-400
                                transition
                                hover:text-[#14c78b]
                            "
                            >
                                مشاهده همه
                            </Link>

                        </div>


                        <div className="
                        flex
                        gap-5
                        overflow-hidden
                    ">

                            {topWeekMovies.map((movie) => (
                                <div
                                    key={movie._id}
                                    className="shrink-0"
                                >
                                    <MovieCard
                                        movie={movie}
                                        onClick={() =>
                                            handleMovieClick(movie)
                                        }
                                    />
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </Suspense>
        </section>
    );
};