"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, Play, Star, X } from "lucide-react";
import { resolvePoster } from "./PosterCard";

type DetailModalProps = {
    title: string;
    poster?: string;
    year?: number | string;
    rating?: number | string;
    duration?: number | string;
    genre?: string[];
    description?: string;
    watchHref: string;
    watchLabel: string;
    badge?: string;
    isFavorite?: boolean;
    onFavorite?: () => void;
    onClose: () => void;
};

// Back keys: Escape, Backspace, Tizen (10009), webOS (461)
const BACK_KEYS = ["Escape", "Backspace", "GoBack", "BrowserBack"];
const BACK_CODES = [10009, 461];

export function DetailModal({
    title,
    poster,
    year,
    rating,
    duration,
    genre = [],
    description,
    watchHref,
    watchLabel,
    badge,
    isFavorite,
    onFavorite,
    onClose,
}: DetailModalProps) {
    const watchRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const prevFocus = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        watchRef.current?.focus({ preventScroll: true });

        const onKey = (e: KeyboardEvent) => {
            if (BACK_KEYS.includes(e.key) || BACK_CODES.includes(e.keyCode)) {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            prevFocus?.focus?.({ preventScroll: true });
        };
    }, [onClose]);

    const meta = [
        year,
        duration ? `${duration} دقیقه` : null,
    ].filter(Boolean);

    return (
        <div
            data-tv-modal
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={onClose}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-3 sm:p-6 md:flex md:items-center md:justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-[#11151b] ring-1 ring-white/[0.06] md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] tv:max-w-6xl tv:grid-cols-[420px_1fr]"
            >
                {/* Poster — desktop / TV */}
                <div className="relative hidden md:block">
                    <img
                        src={resolvePoster(poster)}
                        alt={title}
                        decoding="async"
                        className="h-full max-h-[620px] w-full object-cover tv:max-h-[760px]"
                    />
                </div>

                {/* Content */}
                <div className="relative min-w-0 p-5 sm:p-8 lg:p-10">
                    <button
                        type="button"
                        onClick={onClose}
                        data-tv-focus
                        aria-label="بستن"
                        className="tv-focus absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white sm:left-6 sm:top-6"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4 pl-12">
                        {/* Poster — mobile thumbnail */}
                        <img
                            src={resolvePoster(poster)}
                            alt=""
                            decoding="async"
                            className="aspect-[2/3] w-24 shrink-0 rounded-lg object-cover ring-1 ring-white/10 md:hidden"
                        />

                        <div className="min-w-0">
                            {badge && (
                                <span className="mb-2 inline-block text-xs font-medium text-white/40">{badge}</span>
                            )}
                            <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl tv:text-5xl">
                                {title}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/50 tv:text-base">
                                {rating ? (
                                    <span className="flex items-center gap-1.5 font-medium text-white/85">
                                        <Star size={14} className="fill-[#14c78b] text-[#14c78b]" />
                                        {rating}
                                        <span className="text-white/30">/10</span>
                                    </span>
                                ) : null}
                                {meta.map((m, i) => (
                                    <span key={i} className="flex items-center gap-3">
                                        <span className="text-white/20">|</span>
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex items-center gap-3">
                        <Link
                            ref={watchRef}
                            href={watchHref}
                            onClick={onClose}
                            data-tv-focus
                            className="tv-focus flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#14c78b] text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.02] focus-visible:scale-[1.03] sm:flex-none sm:px-10 sm:text-base tv:h-14 tv:px-14 tv:text-lg"
                        >
                            <Play size={18} fill="currentColor" />
                            {watchLabel}
                        </Link>

                        {onFavorite && (
                            <button
                                type="button"
                                onClick={onFavorite}
                                data-tv-focus
                                aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                                aria-pressed={isFavorite}
                                className="tv-focus flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-white/[0.06] tv:h-14 tv:w-14"
                            >
                                <Heart
                                    size={20}
                                    className={isFavorite ? "fill-[#14c78b] text-[#14c78b]" : "text-white/80"}
                                />
                            </button>
                        )}
                    </div>

                    {/* Description */}
                    {description && (
                        <p className="mt-8 break-words text-sm leading-8 text-white/60 sm:text-base sm:leading-9 tv:text-lg tv:leading-10">
                            {description}
                        </p>
                    )}

                    {/* Genres */}
                    {genre.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-2">
                            {genre.map((g, i) => (
                                <span
                                    key={`${g}-${i}`}
                                    className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-xs text-white/70 sm:text-sm"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}