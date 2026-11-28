"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, Clock3, Heart, Play, Star, X } from "lucide-react";

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
    kind: "MOVIE" | "SERIES";
    isFavorite?: boolean;
    onFavorite?: () => void;
    onClose: () => void;
};

// Escape / Backspace, Tizen (10009), webOS (461)
const BACK_KEYS = ["Escape", "Backspace", "GoBack", "BrowserBack"];
const BACK_CODES = [10009, 461];

const posterSrc = (p?: string) =>
    !p ? "/Images/placeholder-poster.png" : p.startsWith("http") ? p : `https://alanbin.com${p}`;

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
    kind,
    isFavorite,
    onFavorite,
    onClose,
}: DetailModalProps) {
    const watchRef = useRef<HTMLAnchorElement>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    /* Runs once on open: focus, scroll-lock, back key */
    useEffect(() => {
        const prevFocus = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        watchRef.current?.focus({ preventScroll: true });

        const onKey = (e: KeyboardEvent) => {
            const el = document.activeElement;
            const typing = el?.tagName === "INPUT" || el?.tagName === "TEXTAREA";
            if (typing && e.key === "Backspace") return;
            if (BACK_KEYS.includes(e.key) || BACK_CODES.includes(e.keyCode)) {
                e.preventDefault();
                onCloseRef.current();
            }
        };
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            prevFocus?.focus?.({ preventScroll: true });
        };
    }, []);

    const src = posterSrc(poster);

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
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
                className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-white/[0.08] bg-[#11151c] text-white md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] tv:max-w-6xl tv:grid-cols-[420px_1fr]"
            >
                <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-[2px] bg-[#14c78b] opacity-70" />

                {/* Poster — desktop / TV */}
                <div className="relative hidden bg-black md:block">
                    <img
                        src={src}
                        alt={title}
                        decoding="async"
                        className="h-full max-h-[640px] w-full object-cover tv:max-h-[780px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#11151c]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative min-w-0 p-5 sm:p-8 lg:p-10">
                    <button
                        type="button"
                        onClick={onClose}
                        data-tv-focus
                        aria-label="بستن"
                        className="tv-focus absolute left-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/[0.08] text-white/50 transition-colors hover:border-white/25 hover:text-white sm:left-6 sm:top-6"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-start gap-4 pl-12">
                        {/* Mobile thumbnail */}
                        <img
                            src={src}
                            alt=""
                            decoding="async"
                            className="aspect-[2/3] w-24 shrink-0 rounded-md border border-white/10 object-cover md:hidden"
                        />

                        <div className="min-w-0">
                            <span className="mb-3 inline-flex rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold tracking-[0.15em] text-white/50">
                                {kind}
                            </span>
                            <h1 className="break-words text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl tv:text-5xl">
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-5 flex flex-wrap gap-2 text-sm">
                        {rating ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] px-2.5 py-1 font-medium text-white/85">
                                <Star size={13} className="fill-[#14c78b] text-[#14c78b]" />
                                {rating}
                                <span className="text-white/30">/10</span>
                            </span>
                        ) : null}
                        {year ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] px-2.5 py-1 text-white/60">
                                <Calendar size={13} className="text-white/35" />
                                {year}
                            </span>
                        ) : null}
                        {duration ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] px-2.5 py-1 text-white/60">
                                <Clock3 size={13} className="text-white/35" />
                                {duration} دقیقه
                            </span>
                        ) : null}
                    </div>

                    {/* Actions */}
                    <div className="mt-7 flex items-center gap-2.5">
                        <Link
                            ref={watchRef}
                            href={watchHref}
                            onClick={onClose}
                            data-tv-focus
                            className="tv-focus flex h-12 flex-1 items-center justify-center gap-2.5 rounded-md bg-[#14c78b] text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.02] focus-visible:scale-[1.02] sm:flex-none sm:px-10 sm:text-base tv:h-14 tv:px-14 tv:text-lg"
                        >
                            <Play size={17} fill="currentColor" />
                            {watchLabel}
                        </Link>

                        {onFavorite && (
                            <button
                                type="button"
                                onClick={onFavorite}
                                data-tv-focus
                                aria-pressed={isFavorite}
                                className={`tv-focus flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm transition-colors tv:h-14 ${isFavorite
                                        ? "border-[#14c78b]/40 bg-[#14c78b]/10 text-[#14c78b]"
                                        : "border-white/[0.1] text-white/70 hover:border-white/25 hover:text-white"
                                    }`}
                            >
                                <Heart size={18} className={isFavorite ? "fill-[#14c78b]" : ""} />
                                <span className="hidden sm:inline">
                                    {isFavorite ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی"}
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Description */}
                    {description && (
                        <div className="mt-8 border-t border-white/[0.06] pt-6">
                            <h3 className="mb-3 text-[11px] font-semibold tracking-[0.15em] text-white/35">STORY</h3>
                            <p className="break-words text-sm leading-8 text-white/65 sm:text-base sm:leading-9 tv:text-lg tv:leading-10">
                                {description}
                            </p>
                        </div>
                    )}

                    {/* Genres */}
                    {genre.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-1.5">
                            {genre.map((g, i) => (
                                <span
                                    key={`${g}-${i}`}
                                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-white/65 sm:text-sm"
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