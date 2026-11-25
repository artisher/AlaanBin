"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Movie } from "@/types/movies";

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

    // restarts every time the slide changes (manual or auto)
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
            className="group/hero relative -mt-16 h-[70svh] min-h-[520px] max-h-[880px] w-full overflow-hidden bg-[#0B0F14]"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) < 50) return;
                // RTL: swipe left → next
                go(dx < 0 ? 1 : -1);
            }}
        >
            {/* Only current, next and previous images are in the DOM */}
            {slides.map((m, i) =>
                i === index || i === nextIndex || i === prevIndex ? (
                    <img
                        key={m._id}
                        src={m.heroImage || m.poster}
                        alt=""
                        decoding="async"
                        fetchPriority={i === 0 ? "high" : "auto"}
                        className={`absolute inset-0 h-full w-full object-cover object-[30%_center] transition-opacity duration-700 lg:object-center ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ) : null
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/30 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#0B0F14]/85 via-[#0B0F14]/20 to-transparent" />

            <div className="absolute bottom-[26%] right-5 left-5 z-10 max-w-xl sm:right-10 sm:left-auto lg:right-16 tv:right-[5vw] tv:max-w-3xl">
                {movie.genre?.length ? (
                    <p className="mb-3 text-xs font-medium tracking-wide text-white/50 sm:text-sm">
                        {movie.genre.slice(0, 3).join(" · ")}
                    </p>
                ) : null}

                <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl tv:text-7xl [overflow-wrap:anywhere]">
                    {movie.title}
                </h1>

                <div className="mt-4 flex items-center gap-3 text-sm text-white/60 sm:text-base">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.rating ? (
                        <>
                            <span className="text-white/20">|</span>
                            <span className="flex items-center gap-1.5 text-white/80">
                                <Star size={15} className="fill-[#14c78b] text-[#14c78b]" />
                                {movie.rating}
                            </span>
                        </>
                    ) : null}
                </div>

                <button
                    type="button"
                    data-tv-focus
                    onClick={() => onMovieClick(movie)}
                    className="tv-focus mt-7 inline-flex items-center rounded-full bg-[#14c78b] px-7 py-3 text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.05] sm:text-base tv:px-10 tv:py-4 tv:text-lg"
                >
                    اطلاعات بیشتر
                </button>
            </div>

            {count > 1 && (
                <>
                    {/* Arrows (mouse) */}
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="اسلاید قبلی"
                        onClick={() => go(-1)}
                        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-200 hover:bg-white hover:text-black group-hover/hero:opacity-100 md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="اسلاید بعدی"
                        onClick={() => go(1)}
                        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-200 hover:bg-white hover:text-black group-hover/hero:opacity-100 md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-[18%] right-5 z-20 flex gap-1.5 sm:right-10 lg:right-16 tv:right-[5vw]">
                        {slides.map((m, i) => (
                            <button
                                key={m._id}
                                type="button"
                                tabIndex={-1}
                                aria-label={`اسلاید ${i + 1}`}
                                onClick={() => setIndex(i)}
                                className="flex h-4 items-center"
                            >
                                <span
                                    className={`block h-1 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-8 bg-white" : "w-4 bg-white/25 hover:bg-white/50"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};