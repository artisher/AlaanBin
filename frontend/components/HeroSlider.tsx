"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Star, Flame } from "lucide-react";
import type { Movie } from "@/types/movies";
import { resolvePoster } from "./PosterCard";

interface HeroSliderProps {
    movies: Movie[];
    onMovieClick: (movie: Movie) => void;
}

const INTERVAL = 5000;

export const HeroSlider = ({ movies, onMovieClick }: HeroSliderProps) => {
    const slides = movies.slice(0, 8);
    const count = slides.length;
    const [index, setIndex] = useState(0);
    const [focused, setFocused] = useState(false);
    const touchX = useRef<number | null>(null);

    const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

    useEffect(() => {
        if (count < 2 || focused) return;
        const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
        return () => clearTimeout(t);
    }, [index, count, focused]);

    if (!count) return null;

    const movie = slides[index] ?? slides[0];
    const nextIndex = (index + 1) % count;
    const prevIndex = (index - 1 + count) % count;

    return (
        <section
            className="relative -mt-16 h-[100svh] min-h-[560px] max-h-[1100px] w-full overflow-hidden bg-[#0B0F14] tv:max-h-none"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) < 50) return;
                go(dx < 0 ? 1 : -1);
            }}
        >
            {/* Images: only current, next, previous */}
            {slides.map((m, i) =>
                i === index || i === nextIndex || i === prevIndex ? (
                    <img
                        key={m._id}
                        src={resolvePoster(m.heroImage || m.poster)}
                        alt=""
                        decoding="async"
                        fetchPriority={i === 0 ? "high" : "auto"}
                        className={`absolute inset-0 h-full w-full object-cover object-[30%_center] transition-opacity duration-700 lg:object-center ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ) : null
            )}

            {/* Gradients: top (for navbar), bottom (for overlapping row), side (for text) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B0F14]/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/70 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#0B0F14]/70 via-transparent to-transparent" />

            {/* Content — bottom right */}
            <div className="absolute bottom-[34%] right-5 left-5 z-10 max-w-xl sm:right-10 sm:left-auto lg:right-16 xl:right-20 tv:right-[5vw] tv:max-w-3xl">
                <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-white/80 sm:text-sm">
                    <Flame size={15} className="text-[#14c78b]" />
                    برتر هفته
                </div>

                <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl tv:text-8xl [overflow-wrap:anywhere]">
                    {movie.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70 sm:text-base">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.genre?.length ? (
                        <>
                            <span className="text-white/25">|</span>
                            <span>{movie.genre.slice(0, 2).join("، ")}</span>
                        </>
                    ) : null}
                    {movie.rating ? (
                        <>
                            <span className="text-white/25">|</span>
                            <span className="flex items-center gap-1.5 text-white">
                                <Star size={15} className="fill-[#14c78b] text-[#14c78b]" />
                                {movie.rating}
                            </span>
                        </>
                    ) : null}
                </div>

                {movie.description && (
                    <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-7 text-white/60 sm:text-base tv:text-lg">
                        {movie.description}
                    </p>
                )}

                <button
                    type="button"
                    data-tv-focus
                    onClick={() => onMovieClick(movie)}
                    className="tv-focus mt-6 inline-flex items-center gap-2.5 rounded-lg bg-[#14c78b] px-7 py-3 text-sm font-bold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.05] sm:text-base tv:px-10 tv:py-4 tv:text-lg"
                >
                    <Play size={18} fill="currentColor" />
                    تماشا و اطلاعات بیشتر
                </button>
            </div>

            {/* Arrows — bottom left, like Filimo */}
            {count > 1 && (
                <div className="absolute bottom-[34%] left-5 z-20 hidden gap-2 sm:left-10 md:flex lg:left-16 xl:left-20">
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="اسلاید قبلی"
                        onClick={() => go(-1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/15 transition-colors hover:bg-white hover:text-black"
                    >
                        <ChevronRight size={22} />
                    </button>
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="اسلاید بعدی"
                        onClick={() => go(1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/15 transition-colors hover:bg-white hover:text-black"
                    >
                        <ChevronLeft size={22} />
                    </button>
                </div>
            )}
        </section>
    );
};