
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import type { Episode, Series } from "@/types/Series";

export default function SeriesPage() {
    const params = useParams();
    const id = String(params.id);

    const [series, setSeries] = useState<Series | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [selectedEpisode, setSelectedEpisode] =
        useState<Episode | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/series/${id}`,
                    {
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "خطا در دریافت سریال"
                    );
                }

                setSeries(data.series);
                setEpisodes(data.episodes || []);

                // انتخاب قسمت اول به صورت پیش‌فرض
                if (data.episodes?.length > 0) {
                    setSelectedEpisode(data.episodes[0]);
                }
            } catch (err: any) {
                console.error("FETCH SERIES ERROR:", err);
                setError(err.message || "خطا در دریافت سریال");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSeries();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0B0F14] px-4 py-10 text-white">
                <div className="mx-auto max-w-6xl animate-pulse">
                    <div className="h-8 w-48 rounded bg-white/10" />
                    <div className="mt-4 h-4 w-96 max-w-full rounded bg-white/10" />
                    <div className="mt-8 aspect-video rounded-2xl bg-white/5" />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-4 text-white">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-red-400">
                    {error}
                </div>
            </main>
        );
    }

    if (!series) {
        return null;
    }

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[#0B0F14] px-4 py-8 text-white"
        >
            <div className="mx-auto max-w-6xl">

                {/* ================= سریال ================= */}
                <section className="mb-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

                        {/* Poster */}
                        {series.poster && (
                            <div className="hidden w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl sm:block">
                                <img
                                    src={
                                        series.poster.startsWith("http")
                                            ? series.poster
                                            : `${process.env.NEXT_PUBLIC_API_URL}${series.poster}`
                                    }
                                    alt={series.title}
                                    className="aspect-[2/3] w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[#14c78b]/10 px-3 py-1 text-xs font-medium text-[#14c78b]">
                                    سریال
                                </span>

                                {series.year && (
                                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                                        {series.year}
                                    </span>
                                )}

                                {series.rating !== undefined && (
                                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                                        ⭐ {series.rating}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                {series.title}
                            </h1>

                            {series.description && (
                                <p className="mt-4 max-w-3xl leading-7 text-gray-400">
                                    {series.description}
                                </p>
                            )}

                            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                                <span>{episodes.length} قسمت</span>
                                <span>•</span>
                                <span>برای تماشا یک قسمت را انتخاب کنید</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= Player ================= */}
                {selectedEpisode && (
                    <section className="mb-10">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                            <video
                                key={selectedEpisode._id}
                                controls
                                playsInline
                                className="aspect-video w-full"
                                src={`${process.env.NEXT_PUBLIC_API_URL}${selectedEpisode.videoUrl}`}
                            />
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#14c78b]/10 text-sm font-bold text-[#14c78b]">
                                {selectedEpisode.episodeNumber}
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    در حال پخش
                                </p>

                                <h2 className="text-lg font-bold">
                                    قسمت {selectedEpisode.episodeNumber}
                                    {selectedEpisode.title &&
                                    !selectedEpisode.title
                                        .trim()
                                        .match(
                                            /^(قسمت|episode)\s*\d+$/i
                                        )
                                        ? ` — ${selectedEpisode.title}`
                                        : ""}
                                </h2>
                            </div>
                        </div>
                    </section>
                )}

                {/* ================= Episodes ================= */}
                <section>
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                قسمت‌های سریال
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {episodes.length} قسمت برای تماشا
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {episodes.map((episode) => {
                            const isSelected =
                                selectedEpisode?._id === episode._id;

                            const cleanTitle =
                                episode.title &&
                                !episode.title
                                    .trim()
                                    .match(
                                        /^(قسمت|episode)\s*\d+$/i
                                    )
                                    ? episode.title
                                    : "";

                            return (
                                <button
                                    key={episode._id}
                                    onClick={() =>
                                        setSelectedEpisode(episode)
                                    }
                                    className={`group relative overflow-hidden rounded-2xl border p-4 text-right transition-all duration-200 ${
                                        isSelected
                                            ? "border-[#14c78b]/60 bg-[#14c78b]/10 shadow-[0_0_25px_rgba(20,199,139,0.08)]"
                                            : "border-white/10 bg-[#111827] hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#151e2d]"
                                    }`}
                                >
                                    {/* نوار سبز کنار کارت انتخاب‌شده */}
                                    {isSelected && (
                                        <div className="absolute right-0 top-0 h-full w-1 bg-[#14c78b]" />
                                    )}

                                    <div className="flex items-center gap-4">

                                        {/* Episode Number */}
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                                                isSelected
                                                    ? "bg-[#14c78b] text-[#0B0F14]"
                                                    : "bg-white/5 text-gray-300 group-hover:bg-white/10"
                                            }`}
                                        >
                                            {episode.episodeNumber}
                                        </div>

                                        {/* Text */}
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs text-gray-500">
                                                قسمت
                                            </div>

                                            <div
                                                className={`mt-1 truncate font-semibold ${
                                                    isSelected
                                                        ? "text-[#14c78b]"
                                                        : "text-white"
                                                }`}
                                            >
                                                {cleanTitle ||
                                                    `قسمت ${episode.episodeNumber}`}
                                            </div>
                                        </div>

                                        {/* Play Icon */}
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                                                isSelected
                                                    ? "bg-[#14c78b]/20 text-[#14c78b]"
                                                    : "bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-white"
                                            }`}
                                        >
                                            {isSelected ? "▶" : "▷"}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}

