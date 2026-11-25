"use client";

import { Star } from "lucide-react";

export function resolvePoster(src?: string) {
    if (!src) return "/Images/placeholder-poster.png";
    return src.startsWith("http") ? src : `https://alanbin.com${src}`;
}

type PosterCardProps = {
    title: string;
    poster?: string;
    year?: number | string;
    rating?: number | string;
    genre?: string[];
    badge?: string;
    onClick: () => void;
};

export function PosterCard({ title, poster, year, rating, genre, badge, onClick }: PosterCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            data-tv-focus
            className="tv-focus group block w-full rounded-xl text-right"
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06] transition-transform duration-200 will-change-transform group-hover:scale-[1.04] group-focus-visible:scale-[1.06]">
                <img
                    src={resolvePoster(poster)}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {badge && (
                    <span className="absolute right-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white/90">
                        {badge}
                    </span>
                )}

                {genre && genre.length > 0 && (
                    <>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
                        <div className="absolute inset-x-2.5 bottom-2.5 truncate text-[11px] text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                            {genre.slice(0, 2).join(" · ")}
                        </div>
                    </>
                )}
            </div>

            <div className="mt-2.5 px-0.5">
                <h3 className="truncate text-sm font-medium text-white/90 sm:text-[15px] tv:text-lg">
                    {title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/40 tv:text-sm">
                    {year && <span>{year}</span>}
                    {year && rating ? <span>·</span> : null}
                    {rating ? (
                        <span className="flex items-center gap-1">
                            <Star size={11} className="fill-[#14c78b] text-[#14c78b]" />
                            {rating}
                        </span>
                    ) : null}
                </div>
            </div>
        </button>
    );
}