"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import type { Movie } from "@/types/movies";
import type { Series } from "@/types/Series";
import { ContentRow, rowItemClass, wideItemClass } from "./ContentRow";
import { LandscapeCard } from "./LandscapeCard";
import { MovieCard } from "./MovieCard";
import { SeriesCard } from "./SeriesCard";
import { MovieModal } from "./MovieMedal";
import { SeriesModal } from "./SeriesModal";
import { HeroSlider } from "./HeroSlider";
import { useTvNavigation } from "@/components/useTvNavigation";

type ContentItem = Movie | Series;

const API = process.env.NEXT_PUBLIC_API_URL;
const HERO_KEY = "alanbin_hero_movies";
const HERO_TTL = 6 * 60 * 60 * 1000;

async function getList<T>(path: string, key: "movies" | "series"): Promise<T[]> {
    try {
        const res = await fetch(`${API}${path}`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data[key]) ? data[key] : [];
    } catch {
        return [];
    }
}

function pickRandom(movies: Movie[], count = 8) {
    const list = movies.filter((m) => typeof m.heroImage === "string" && m.heroImage.trim());
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list.slice(0, count);
}

const isMovie = (item: ContentItem): item is Movie => "videoUrl" in item;

export const HomeContent = () => {
    useTvNavigation();

    const [loading, setLoading] = useState(true);
    const [newMovies, setNewMovies] = useState<Movie[]>([]);
    const [newSeries, setNewSeries] = useState<Series[]>([]);
    const [topWeekMovies, setTopWeekMovies] = useState<Movie[]>([]);
    const [topWeekSeries, setTopWeekSeries] = useState<Series[]>([]);
    const [genres, setGenres] = useState<{ title: string; href: string; items: Movie[] }[]>([]);
    const [heroMovies, setHeroMovies] = useState<Movie[]>([]);

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    /* ---------- Content ---------- */
    useEffect(() => {
        (async () => {
            const [nm, ns, tm, ts, comedy, drama, romance, action] = await Promise.all([
                getList<Movie>("/api/movies?page=1&limit=12&sort=newest", "movies"),
                getList<Series>("/api/series?page=1&limit=12&sort=newest", "series"),
                getList<Movie>("/api/movies?page=1&limit=50&topWeek=true&sort=highRating", "movies"),
                getList<Series>("/api/series?page=1&limit=8&topWeek=true&sort=highRating", "series"),
                getList<Movie>("/api/movies?page=1&limit=12&genre=Comedy", "movies"),
                getList<Movie>("/api/movies?page=1&limit=12&genre=Drama", "movies"),
                getList<Movie>("/api/movies?page=1&limit=12&genre=Romance", "movies"),
                getList<Movie>("/api/movies?page=1&limit=12&genre=Action", "movies"),
            ]);

            setNewMovies(nm);
            setNewSeries(ns);
            setTopWeekMovies(tm);
            setTopWeekSeries(ts);
            setGenres([
                { title: "کمدی", href: "/movies?genre=Comedy", items: comedy },
                { title: "درام", href: "/movies?genre=Drama", items: drama },
                { title: "عاشقانه", href: "/movies?genre=Romance", items: romance },
                { title: "اکشن", href: "/movies?genre=Action", items: action },
            ]);
            setLoading(false);
        })();
    }, []);

    /* ---------- Favorites (was never loaded before) ---------- */
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API}/api/favorites`, { credentials: "include" });
                if (!res.ok) return;
                const data = await res.json();
                const ids = [
                    ...(Array.isArray(data.favoriteMovies) ? data.favoriteMovies : []),
                    ...(Array.isArray(data.favoriteSeries) ? data.favoriteSeries : []),
                ].map((x: { _id: string }) => x._id);
                setFavoriteIds(ids);
            } catch (error) {
                console.error("FETCH FAVORITES ERROR:", error);
            }
        })();
    }, []);

    /* ---------- Hero (cached 6h) ---------- */
    useEffect(() => {
        if (topWeekMovies.length === 0) return;

        try {
            const saved = localStorage.getItem(HERO_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.timestamp && Date.now() - parsed.timestamp < HERO_TTL && Array.isArray(parsed.ids)) {
                    const selected = parsed.ids
                        .map((id: string) => topWeekMovies.find((m) => m._id === id))
                        .filter(Boolean) as Movie[];
                    if (selected.length > 0 && selected.every((m) => m.heroImage?.trim())) {
                        setHeroMovies(selected);
                        return;
                    }
                }
            }
        } catch {
            /* ignore */
        }

        const selected = pickRandom(topWeekMovies, 8);
        setHeroMovies(selected);
        try {
            localStorage.setItem(HERO_KEY, JSON.stringify({ ids: selected.map((m) => m._id), timestamp: Date.now() }));
        } catch {
            /* storage unavailable */
        }
    }, [topWeekMovies]);

    /* ---------- Top week: movies + series interleaved ---------- */
    const topWeekMixed = useMemo(() => {
        const out: ContentItem[] = [];
        const max = Math.max(topWeekMovies.length, topWeekSeries.length);
        for (let i = 0; i < max && out.length < 16; i++) {
            if (topWeekMovies[i]) out.push(topWeekMovies[i]);
            if (topWeekSeries[i]) out.push(topWeekSeries[i]);
        }
        return out;
    }, [topWeekMovies, topWeekSeries]);

    const favoriteHandler = async (id: string, contentType: "movie" | "series") => {
        try {
            const res = await fetch(`${API}/api/favorites/${contentType}/${id}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "خطا در تغییر وضعیت علاقه‌مندی.");
            }
            setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
            toast.success("وضعیت علاقه‌مندی تغییر کرد.");
        } catch (error) {
            console.error("FAVORITE ERROR:", error);
            toast.error(error instanceof Error ? error.message : "خطا در تغییر علاقه‌مندی.");
        }
    };

    const renderItem = (item: ContentItem) => (
        <div key={item._id} className={rowItemClass}>
            {isMovie(item) ? (
                <MovieCard movie={item} onClick={() => setSelectedMovie(item)} />
            ) : (
                <SeriesCard series={item} onClick={() => setSelectedSeries(item)} />
            )}
        </div>
    );
    const renderWide = (item: ContentItem) => (
        <div key={item._id} className={wideItemClass}>
            <LandscapeCard
                title={item.title}
                image={"heroImage" in item ? item.heroImage : undefined}
                fallback={item.poster}
                year={item.year}
                rating={item.rating}
                badge={isMovie(item) ? undefined : "سریال"}
                onClick={() => (isMovie(item) ? setSelectedMovie(item) : setSelectedSeries(item))}
            />
        </div>
    );
    /* ---------- Loading ---------- */
    if (loading) {
        return (
            <div>
                <div className="-mt-16 h-[100svh] min-h-[560px] max-h-[1100px] w-full animate-pulse bg-white/[0.03]" />
                <div className="space-y-10 px-4 pt-8 sm:px-6 md:px-8 lg:px-10">
                    {[1, 2, 3].map((row) => (
                        <div key={row}>
                            <div className="mb-4 h-5 w-32 animate-pulse rounded bg-white/[0.06]" />
                            <div className="flex gap-4 overflow-hidden">
                                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                    <div key={i} className={`${rowItemClass} aspect-[2/3] animate-pulse rounded-xl bg-white/[0.04]`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* ---------- Page ---------- */
    return (
        <>
            <HeroSlider movies={heroMovies} onMovieClick={setSelectedMovie} />

            <div className="relative z-10 mx-auto max-w-[1800px] space-y-8 px-4 pb-16 sm:space-y-10 sm:px-8 lg:px-14 xl:px-20 tv:max-w-none tv:px-[5vw]">
                {topWeekMixed.length > 0 && (
                    <div className="relative z-20 -mt-[30svh] sm:-mt-[28svh]">
                        <ContentRow bare title="برتر هفته" href="/movies?topWeek=true">
                            {topWeekMixed.map(renderWide)}
                        </ContentRow>
                    </div>
                )}

                {newMovies.length > 0 && (
                    <ContentRow title="جدیدترین فیلم‌ها" href="/movies?sort=newest">
                        {newMovies.map(renderItem)}
                    </ContentRow>
                )}

                {newSeries.length > 0 && (
                    <ContentRow title="سریال‌های جدید" href="/series?sort=newest">
                        {newSeries.map(renderItem)}
                    </ContentRow>
                )}

                {genres.map((g) =>
                    g.items.length > 0 ? (
                        <ContentRow key={g.href} title={g.title} href={g.href}>
                            {g.items.map(renderItem)}
                        </ContentRow>
                    ) : null
                )}

                {/* Archive */}
                <section className="border-t border-white/[0.06] pt-12 text-center">
                    <h2 className="text-2xl font-semibold text-white">دنبال چیز دیگه‌ای هستی؟</h2>
                    <p className="mt-2 text-sm text-white/40">آرشیو کامل فیلم‌ها و سریال‌های الان‌بین</p>
                    <div className="mt-6 flex justify-center gap-3">
                        <Link
                            href="/movies"
                            data-tv-focus
                            className="tv-focus rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03]"
                        >
                            همه فیلم‌ها
                        </Link>
                        <Link
                            href="/series"
                            data-tv-focus
                            className="tv-focus rounded-full px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/[0.06]"
                        >
                            همه سریال‌ها
                        </Link>
                    </div>
                </section>
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen
                    onClose={() => setSelectedMovie(null)}
                    favoriteHandler={(id) => favoriteHandler(id, "movie")}
                    isFavorite={favoriteIds.includes(selectedMovie._id)}
                />
            )}
            {selectedSeries && (
                <SeriesModal
                    series={selectedSeries}
                    isOpen
                    onClose={() => setSelectedSeries(null)}
                    favoriteHandler={(id) => favoriteHandler(id, "series")}
                    isFavorite={favoriteIds.includes(selectedSeries._id)}
                />
            )}
        </>
    );
};