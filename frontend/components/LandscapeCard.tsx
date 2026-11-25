"use client";

import { Star } from "lucide-react";
import { resolvePoster } from "./PosterCard";

type LandscapeCardProps = {
    title: string;
    image?: string;
    fallback?: string;
    year?: number | string;
    rating?: number | string;
    badge?: string;
    onClick: () => void;
};

export function LandscapeCard({ title, image, fallback, year, rating, badge, onClick }: LandscapeCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            data-tv-focus
            className="tv-focus group block w-full rounded-xl text-right"
        >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] transition-transform duration-200 will-change-transform group-hover:scale-[1.03] group-focus-visible:scale-[1.05]">
                <img
                    src={resolvePoster(image || fallback)}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {badge && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-[#14c78b] px-2.5 py-0.5 text-[10px] font-semibold text-[#0B0F14]">
                        {badge}
                    </span>
                )}

                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-3.5">
                    <h3 className="truncate text-sm font-semibold text-white sm:text-base tv:text-xl">{title}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60 tv:text-sm">
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
            </div>
        </button>
    );
}