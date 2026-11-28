"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Lock, Play, RotateCw, Star, TriangleAlert, Tv } from "lucide-react";

import type { Episode, Series } from "@/types/Series";
import { useTvNavigation } from "@/components/useTvNavigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fa = (n: number) => n.toLocaleString("fa-IR");

const cleanTitle = (ep: Episode) =>
    ep.title && !ep.title.trim().match(/^(قسمت|episode)\s*\d+$/i) ? ep.title : "";

export default function SeriesClient() {
    useTvNavigation();
    const params = useParams();
    const id = String(params.id);
    const playerRef = useRef<HTMLDivElement>(null);

    const [series, setSeries] = useState<Series | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [videoSrc, setVideoSrc] = useState("");
    const [videoError, setVideoError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    /* ---------- Series + episodes ---------- */
    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`${API_URL}/api/series/${id}`, { credentials: "include", cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "خطا در دریافت سریال");

                setSeries(data.series);
                const eps: Episode[] = data.episodes || [];
                setEpisodes(eps);
                if (eps.length > 0) setSelectedEpisode(eps[0]);
            } catch (err) {
                console.error("FETCH SERIES ERROR:", err);
                setError(err instanceof Error ? err.message : "خطا در دریافت سریال");
            } finally {
                setLoading(false);
            }
        })();
    }, [id, reloadKey]);

    /* ---------- Stream URL for selected episode ---------- */
    useEffect(() => {
        if (!selectedEpisode?.videoUrl) {
            setVideoSrc("");
            return;
        }
        let cancelled = false;

        (async () => {
            try {
                setVideoSrc("");
                setVideoError(false);
                const res = await fetch(
                    `${API_URL}/api/stream-token?path=${encodeURIComponent(selectedEpisode.videoUrl)}`,
                    { credentials: "include", cache: "no-store" }
                );
                if (!res.ok) throw new Error(`خطای دریافت آدرس ویدئو: ${res.status}`);
                const data: { url: string } = await res.json();
                if (!cancelled) setVideoSrc(`${API_URL}${data.url}`);
            } catch (err) {
                console.error("STREAM URL ERROR:", err);
                if (!cancelled) setVideoError(true);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [selectedEpisode?._id, selectedEpisode?.videoUrl]);

    const index = selectedEpisode ? episodes.findIndex((e) => e._id === selectedEpisode._id) : -1;
    const prevEp = index > 0 ? episodes[index - 1] : null;
    const nextEp = index >= 0 && index < episodes.length - 1 ? episodes[index + 1] : null;

    const playEpisode = (ep: Episode) => {
        setSelectedEpisode(ep);
        playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    /* ---------- Loading ---------- */
    if (loading) {
        return (
            <main dir="rtl" className="min-h-screen bg-[#0B0F14] px-5 py-10 text-white sm:px-8">
                <div className="mx-auto max-w-6xl animate-pulse">
                    <div className="flex gap-6">
                        <div className="hidden aspect-[2/3] w-40 rounded-md bg-white/[0.05] sm:block" />
                        <div className="flex-1">
                            <div className="h-4 w-24 rounded-sm bg-white/[0.06]" />
                            <div className="mt-4 h-9 w-72 max-w-full rounded-sm bg-white/[0.07]" />
                            <div className="mt-5 h-3.5 w-full max-w-xl rounded-sm bg-white/[0.05]" />
                            <div className="mt-2 h-3.5 w-2/3 max-w-md rounded-sm bg-white/[0.05]" />
                        </div>
                    </div>
                    <div className="mt-10 aspect-video rounded-lg bg-white/[0.04]" />
                </div>
            </main>
        );
    }

    /* ---------- Error ---------- */
    if (error) {
        const needsLogin = error === "ابتدا وارد حساب شوید";
        const needsSub = error === "اشتراک شما منقضی شده است";
        const Icon = needsLogin || needsSub ? Lock : TriangleAlert;

        return (
            <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-5 text-white">
                <div className="w-full max-w-md rounded-lg border border-white/[0.07] bg-[#11151c] p-8 text-center">
                    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03]">
                        <Icon size={20} className="text-white/50" />
                    </div>
                    <h2 className="text-xl font-bold">
                        {needsLogin
                            ? "برای تماشا وارد حساب شوید"
                            : needsSub
                                ? "اشتراک شما به پایان رسیده"
                                : "مشکلی در دریافت سریال پیش آمد"}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/45">
                        {needsLogin
                            ? "برای تماشای این سریال ابتدا وارد حساب کاربری خود شوید."
                            : needsSub
                                ? "برای تماشای سریال‌ها، اشتراک الان‌بین تهیه کنید."
                                : "لطفاً چند لحظه دیگر دوباره تلاش کنید."}
                    </p>

                    <div className="mt-7 flex justify-center gap-2.5">
                        {needsLogin && (
                            <Link href="/login" data-tv-focus autoFocus className="tv-focus rounded-md bg-[#14c78b] px-6 py-2.5 text-sm font-semibold text-[#0B0F14]">
                                ورود به حساب
                            </Link>
                        )}
                        {needsSub && (
                            <Link href="/subscription" data-tv-focus autoFocus className="tv-focus rounded-md bg-[#14c78b] px-6 py-2.5 text-sm font-semibold text-[#0B0F14]">
                                تهیه اشتراک
                            </Link>
                        )}
                        {!needsLogin && !needsSub && (
                            <button
                                type="button"
                                data-tv-focus
                                autoFocus
                                onClick={() => setReloadKey((k) => k + 1)}
                                className="tv-focus flex cursor-pointer items-center gap-2 rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[#0B0F14]"
                            >
                                <RotateCw size={15} />
                                تلاش دوباره
                            </button>
                        )}
                        <Link href="/series" data-tv-focus className="tv-focus rounded-md border border-white/[0.1] px-5 py-2.5 text-sm text-white/65 hover:text-white">
                            همه سریال‌ها
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!series) return null;

    const posterUrl = series.poster
        ? series.poster.startsWith("http")
            ? series.poster
            : `${API_URL}${series.poster}`
        : "";

    return (
        <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-white">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[460px]"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
                style={{ background: "radial-gradient(ellipse 55% 100% at 85% 0%, rgba(20,199,139,0.12), transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 md:py-12 tv:max-w-[1500px]">
                {/* Breadcrumb */}
                <Link
                    href="/series"
                    data-tv-focus
                    className="tv-focus mb-8 inline-flex items-center gap-1.5 rounded-md text-sm text-white/45 transition-colors hover:text-white"
                >
                    <ChevronRight size={16} />
                    همه سریال‌ها
                </Link>

                {/* Info */}
                <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
                    {posterUrl && (
                        <div className="hidden w-40 shrink-0 overflow-hidden rounded-md border border-white/[0.08] bg-[#11151c] sm:block md:w-48 tv:w-60">
                            <img src={posterUrl} alt={series.title} className="aspect-[2/3] w-full object-cover" />
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-semibold tracking-[0.12em] text-white/60">
                                <Tv size={12} className="text-[#14c78b]" />
                                SERIES
                            </span>
                            {series.rating !== undefined && (
                                <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] px-2.5 py-1 text-white/80">
                                    <Star size={12} className="fill-[#14c78b] text-[#14c78b]" />
                                    {series.rating}
                                </span>
                            )}
                            {series.year && (
                                <span className="rounded-md border border-white/[0.08] px-2.5 py-1 text-white/55">{series.year}</span>
                            )}
                            <span className="rounded-md border border-white/[0.08] px-2.5 py-1 text-white/55">
                                {fa(episodes.length)} قسمت
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl tv:text-5xl">{series.title}</h1>

                        {series.genre?.length ? (
                            <p className="mt-2 text-sm text-white/45">{series.genre.join(" · ")}</p>
                        ) : null}

                        {series.description && (
                            <p className="mt-5 max-w-3xl text-sm leading-8 text-white/60 sm:text-base tv:text-lg">
                                {series.description}
                            </p>
                        )}

                        {episodes.length > 0 && (
                            <button
                                type="button"
                                data-tv-focus
                                onClick={() => playEpisode(selectedEpisode ?? episodes[0])}
                                className="tv-focus mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#14c78b] px-6 py-3 text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03]"
                            >
                                <Play size={16} fill="currentColor" />
                                {index > 0 ? `ادامه از قسمت ${fa(selectedEpisode!.episodeNumber)}` : "شروع تماشا"}
                            </button>
                        )}
                    </div>
                </section>

                {/* Player */}
                {selectedEpisode && (
                    <section ref={playerRef} className="mb-12 scroll-mt-6">
                        <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-black">
                            <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-[2px] bg-[#14c78b] opacity-70" />
                            {videoSrc ? (
                                <video
                                    key={selectedEpisode._id}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="aspect-video w-full"
                                    src={videoSrc}
                                    onEnded={() => nextEp && setSelectedEpisode(nextEp)}
                                    onError={() => setVideoError(true)}
                                />
                            ) : (
                                <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 text-sm text-white/50">
                                    {videoError ? (
                                        <>
                                            <TriangleAlert size={22} className="text-white/40" />
                                            پخش این قسمت با مشکل مواجه شد.
                                        </>
                                    ) : (
                                        <>
                                            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-[#14c78b]" />
                                            در حال آماده‌سازی ویدئو...
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Now playing + prev/next */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#14c78b] font-bold tabular-nums text-[#0B0F14]">
                                    {fa(selectedEpisode.episodeNumber)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-semibold tracking-[0.12em] text-white/40">NOW PLAYING</p>
                                    <h2 className="truncate text-base font-semibold sm:text-lg">
                                        قسمت {fa(selectedEpisode.episodeNumber)}
                                        {cleanTitle(selectedEpisode) ? ` — ${cleanTitle(selectedEpisode)}` : ""}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    data-tv-focus
                                    disabled={!prevEp}
                                    onClick={() => prevEp && setSelectedEpisode(prevEp)}
                                    className="tv-focus flex cursor-pointer items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#11151c] px-3.5 py-2 text-sm text-white/65 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    <ChevronRight size={16} />
                                    قسمت قبلی
                                </button>
                                <button
                                    type="button"
                                    data-tv-focus
                                    disabled={!nextEp}
                                    onClick={() => nextEp && setSelectedEpisode(nextEp)}
                                    className="tv-focus flex cursor-pointer items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#11151c] px-3.5 py-2 text-sm text-white/65 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    قسمت بعدی
                                    <ChevronLeft size={16} />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Episodes */}
                <section>
                    <div className="mb-4 flex items-center gap-3">
                        <h2 className="text-lg font-semibold md:text-xl">قسمت‌ها</h2>
                        <span className="text-xs tabular-nums text-white/30">{fa(episodes.length)}</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-white/[0.08] to-transparent" />
                    </div>

                    {episodes.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-white/[0.1] py-12 text-center text-sm text-white/40">
                            هنوز قسمتی برای این سریال منتشر نشده است.
                        </div>
                    ) : (
                        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 tv:grid-cols-4">
                            {episodes.map((episode) => {
                                const isSelected = selectedEpisode?._id === episode._id;
                                const title = cleanTitle(episode);

                                return (
                                    <button
                                        key={episode._id}
                                        type="button"
                                        data-tv-focus
                                        onClick={() => playEpisode(episode)}
                                        className={`tv-focus group relative flex cursor-pointer items-center gap-3.5 overflow-hidden rounded-lg border p-3.5 text-right transition-[border-color,background-color] duration-150 ${isSelected
                                                ? "border-[#14c78b]/50 bg-[#14c78b]/[0.07]"
                                                : "border-white/[0.07] bg-[#11151c] hover:border-white/20"
                                            }`}
                                    >
                                        {isSelected && <span className="absolute inset-y-0 right-0 w-[2px] bg-[#14c78b]" />}

                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md font-mono text-sm font-bold tabular-nums ${isSelected ? "bg-[#14c78b] text-[#0B0F14]" : "bg-white/[0.05] text-white/60"
                                                }`}
                                            dir="ltr"
                                        >
                                            {String(episode.episodeNumber).padStart(2, "0")}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="text-[11px] text-white/35">
                                                {isSelected ? "در حال پخش" : `قسمت ${fa(episode.episodeNumber)}`}
                                            </div>
                                            <div className={`mt-0.5 truncate text-sm font-medium ${isSelected ? "text-[#14c78b]" : "text-white/90"}`}>
                                                {title || `قسمت ${fa(episode.episodeNumber)}`}
                                            </div>
                                        </div>

                                        <Play
                                            size={15}
                                            className={`shrink-0 transition-colors ${isSelected ? "fill-[#14c78b] text-[#14c78b]" : "text-white/25 group-hover:text-white/70"
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}