"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { Movie } from "@/types/movies";
import type { Series } from "@/types/Series";

import { ContentRow } from "./ContentRow";
import { MovieCard } from "./MovieCard";
import { SeriesCard } from "./SeriesCard";

type ContentItem = Movie | Series;

export const HomeContent = () => {
    const router = useRouter();

    const [newMovies, setNewMovies] = useState<Movie[]>([]);
    const [newSeries, setNewSeries] = useState<Series[]>([]);
    const [topWeekMovies, setTopWeekMovies] = useState<Movie[]>([]);
    const [topWeekSeries, setTopWeekSeries] = useState<Series[]>([]);

    const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
    const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
    const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
    const [actionMovies, setActionMovies] = useState<Movie[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const [
                    newMoviesRes,
                    newSeriesRes,
                    topMoviesRes,
                    topSeriesRes,
                    comedyRes,
                    dramaRes,
                    romanceRes,
                    actionRes,
                ] = await Promise.all([
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&sort=newest`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/series?page=1&limit=8&sort=newest`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&topWeek=true&sort=highRating`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/series?page=1&limit=8&topWeek=true&sort=highRating`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&genre=Comedy`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&genre=Drama`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&genre=Romance`
                    ),

                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/movies?page=1&limit=8&genre=Action`
                    ),
                ]);

                const [
                    newMoviesData,
                    newSeriesData,
                    topMoviesData,
                    topSeriesData,
                    comedyData,
                    dramaData,
                    romanceData,
                    actionData,
                ] = await Promise.all([
                    newMoviesRes.json(),
                    newSeriesRes.json(),
                    topMoviesRes.json(),
                    topSeriesRes.json(),
                    comedyRes.json(),
                    dramaRes.json(),
                    romanceRes.json(),
                    actionRes.json(),
                ]);

                if (newMoviesRes.ok) {
                    setNewMovies(newMoviesData.movies ?? []);
                }

                if (newSeriesRes.ok) {
                    setNewSeries(newSeriesData.series ?? []);
                }

                if (topMoviesRes.ok) {
                    setTopWeekMovies(topMoviesData.movies ?? []);
                }

                if (topSeriesRes.ok) {
                    setTopWeekSeries(topSeriesData.series ?? []);
                }

                if (comedyRes.ok) {
                    setComedyMovies(comedyData.movies ?? []);
                }

                if (dramaRes.ok) {
                    setDramaMovies(dramaData.movies ?? []);
                }

                if (romanceRes.ok) {
                    setRomanceMovies(romanceData.movies ?? []);
                }

                if (actionRes.ok) {
                    setActionMovies(actionData.movies ?? []);
                }
            } catch (error) {
                console.error("HOME CONTENT ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeContent();
    }, []);

    const renderMovieRow = (
        movies: Movie[],
        href: string
    ) => {
        return movies.map((movie) => (
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
        ));
    };

    const renderSeriesRow = (
        series: Series[]
    ) => {
        return series.map((item) => (
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
        ));
    };

    const renderMixedTopWeek = () => {
        const mixed: ContentItem[] = [
            ...topWeekMovies,
            ...topWeekSeries,
        ];

        return mixed.slice(0, 8).map((item) => {
            const isMovie = "videoUrl" in item;

            return (
                <div
                    key={item._id}
                    className="shrink-0 snap-start"
                >
                    {isMovie ? (
                        <MovieCard
                            movie={item as Movie}
                            onClick={() =>
                                router.push(
                                    `/movies/${item._id}`
                                )
                            }
                        />
                    ) : (
                        <SeriesCard
                            series={item as Series}
                            onClick={() =>
                                router.push(
                                    `/series/${item._id}`
                                )
                            }
                        />
                    )}
                </div>
            );
        });
    };

    if (loading) {
        return (
            <div className="space-y-14">
                {[1, 2, 3].map((row) => (
                    <section key={row}>
                        <div className="mb-5 h-7 w-40 animate-pulse rounded bg-white/10" />

                        <div className="flex gap-5 overflow-hidden">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="h-[330px] w-[205px] shrink-0 animate-pulse rounded-2xl bg-white/5"
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-14">

            {/* جدیدترین فیلم‌ها */}
            {newMovies.length > 0 && (
                <ContentRow
                    title="جدیدترین فیلم‌ها"
                    href="/movies?sort=newest"
                >
                    {renderMovieRow(
                        newMovies,
                        "/movies?sort=newest"
                    )}
                </ContentRow>
            )}

            {/* سریال‌های جدید */}
            {newSeries.length > 0 && (
                <ContentRow
                    title="سریال‌های جدید"
                    href="/series?sort=newest"
                >
                    {renderSeriesRow(newSeries)}
                </ContentRow>
            )}

            {/* برتر هفته */}
            {(topWeekMovies.length > 0 ||
                topWeekSeries.length > 0) && (
                    <ContentRow
                        title="برتر هفته"
                        href="/movies?topWeek=true"
                    >
                        {renderMixedTopWeek()}
                    </ContentRow>
                )}

            {/* کمدی */}
            {comedyMovies.length > 0 && (
                <ContentRow
                    title="کمدی"
                    href="/movies?genre=Comedy"
                >
                    {renderMovieRow(
                        comedyMovies,
                        "/movies?genre=Comedy"
                    )}
                </ContentRow>
            )}

            {/* درام */}
            {dramaMovies.length > 0 && (
                <ContentRow
                    title="درام"
                    href="/movies?genre=Drama"
                >
                    {renderMovieRow(
                        dramaMovies,
                        "/movies?genre=Drama"
                    )}
                </ContentRow>
            )}

            {/* عاشقانه */}
            {romanceMovies.length > 0 && (
                <ContentRow
                    title="عاشقانه"
                    href="/movies?genre=Romance"
                >
                    {renderMovieRow(
                        romanceMovies,
                        "/movies?genre=Romance"
                    )}
                </ContentRow>
            )}

            {/* اکشن */}
            {actionMovies.length > 0 && (
                <ContentRow
                    title="اکشن"
                    href="/movies?genre=Action"
                >
                    {renderMovieRow(
                        actionMovies,
                        "/movies?genre=Action"
                    )}
                </ContentRow>
            )}

            {/* آرشیو کامل */}
            <section className="pt-2">
                <div className="rounded-3xl border border-white/10 bg-[#111827] px-6 py-10 text-center md:px-10">
                    <h2 className="text-2xl font-bold text-white">
                        همه فیلم‌ها
                    </h2>

                    <p className="mt-3 text-sm text-gray-400">
                        آرشیو کامل فیلم‌های الان بین
                    </p>

                    <Link
                        href="/movies"
                        className="
                            mt-6 inline-flex
                            items-center justify-center
                            rounded-xl
                            bg-[#14c78b]
                            px-6 py-3
                            font-semibold
                            text-black
                            transition
                            hover:bg-[#19dc9b]
                        "
                    >
                        مشاهده همه فیلم‌ها
                    </Link>
                </div>
            </section>
        </div>
    );
};