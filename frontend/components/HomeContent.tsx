"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Movie } from "@/types/movies";
import type { Series } from "@/types/Series";

import { ContentRow } from "./ContentRow";
import { MovieCard } from "./MovieCard";
import { SeriesCard } from "./SeriesCard";

export const HomeContent = () => {
    const router = useRouter();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [series, setSeries] = useState<Series[]>([]);

    const [loadingMovies, setLoadingMovies] = useState(true);
    const [loadingSeries, setLoadingSeries] = useState(true);

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const [moviesRes, seriesRes] = await Promise.all([
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&sort=newest`
                    ),
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/series?page=1&limit=8&sort=newest`
                    ),
                ]);

                const moviesData = await moviesRes.json();
                const seriesData = await seriesRes.json();

                if (moviesRes.ok) {
                    setMovies(moviesData.movies ?? []);
                }

                if (seriesRes.ok) {
                    setSeries(seriesData.series ?? []);
                }
            } catch (error) {
                console.error("HOME CONTENT ERROR:", error);
            } finally {
                setLoadingMovies(false);
                setLoadingSeries(false);
            }
        };

        fetchHomeContent();
    }, []);

    return (
        <div className="space-y-14">

            {/* جدیدترین فیلم‌ها */}
            {!loadingMovies && movies.length > 0 && (
                <ContentRow
                    title="جدیدترین فیلم‌ها"
                    href="/movies?sort=newest"
                >
                    {movies.map((movie) => (
                        <div
                            key={movie._id}
                            className="shrink-0 snap-start"
                        >
                            <MovieCard
                                movie={movie}
                                onClick={() =>
                                    router.push(`/movies/${movie._id}`)
                                }
                            />
                        </div>
                    ))}
                </ContentRow>
            )}

            {/* سریال‌های جدید */}
            {!loadingSeries && series.length > 0 && (
                <ContentRow
                    title="سریال‌های جدید"
                    href="/series"
                >
                    {series.map((item) => (
                        <div
                            key={item._id}
                            className="shrink-0 snap-start"
                        >
                            <SeriesCard
                                series={item}
                                onClick={() =>
                                    router.push(`/series/${item._id}`)
                                }
                            />
                        </div>
                    ))}
                </ContentRow>
            )}

        </div>
    );
};