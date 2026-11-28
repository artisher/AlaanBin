"use client";

import { Play, Star } from "lucide-react";
import type { Movie } from "@/types/movies";

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
    favoriteHandler?: (id: string) => void;
};

export function MovieCard({ movie, onClick }: MovieCardProps) {
    const posterUrl = !movie.poster
        ? "/Images/placeholder-poster.png"
        : movie.poster.startsWith("http")
            ? movie.poster
            : `https://alanbin.com${movie.poster}`;

    return (
        <button
            type="button"
            onClick={onClick}
            data-tv-focus
            className="tv-focus group block w-full min-w-0 cursor-pointer rounded-md text-right"
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md border border-white/[0.07] bg-[#11151c] transition-[transform,border-color] duration-200 will-change-transform group-hover:-translate-y-1 group-hover:border-white/25 group-focus-visible:-translate-y-1 group-focus-visible:border-[#14c78b]/60">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Rating — always visible */}
                {movie.rating ? (
                    <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/75 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                        <Star size={11} className="fill-[#14c78b] text-[#14c78b]" />
                        {movie.rating}
                    </span>
                ) : null}

                {/* Hover / focus overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />

                <div className="absolute inset-x-2.5 bottom-2.5 flex items-end justify-between gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="truncate text-[11px] text-white/80">
                        {movie.genre?.slice(0, 2).join(" · ")}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#14c78b] text-[#0B0F14]">
                        <Play size={14} fill="currentColor" />
                    </span>
                </div>
            </div>

            <div className="mt-2.5 px-0.5">
                <h3 className="truncate text-sm font-medium text-white/90 sm:text-[15px] tv:text-lg">
                    {movie.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-white/40 tv:text-sm">
                    {movie.year}
                    {movie.genre?.[0] ? ` · ${movie.genre[0]}` : ""}
                </p>
            </div>
        </button>
    );
}