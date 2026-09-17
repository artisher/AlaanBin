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
                    `${process.env.NEXT_PUBLIC_API_URL}/api/series/${id}`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "خطا در دریافت سریال"
                    );
                }

                setSeries(data.series);
                setEpisodes(data.episodes || []);

              
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
            <main className="min-h-screen bg-[#0B0F14] p-6 text-white">
                در حال دریافت سریال...
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#0B0F14] p-6 text-white">
                {error}
            </main>
        );
    }

    if (!series) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#0B0F14] px-4 py-8 text-white">
            <div className="mx-auto max-w-6xl">

                {/* اطلاعات سریال */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold">
                        {series.title}
                    </h1>

                    <p className="mt-3 max-w-3xl text-gray-400">
                        {series.description}
                    </p>

                    <div className="mt-3 flex gap-4 text-sm text-gray-400">
                        <span>{series.year}</span>
                        <span>⭐ {series.rating}</span>
                    </div>
                </section>

                {/* Player */}
                {selectedEpisode && (
                    <section>
                        <div className="overflow-hidden rounded-xl bg-black">
                            <video
                                key={selectedEpisode._id}
                                controls
                                className="aspect-video w-full"
                                src={selectedEpisode.videoUrl}
                            />
                        </div>

                        <h2 className="mt-4 text-xl font-semibold">
                            قسمت {selectedEpisode.episodeNumber}:{" "}
                            {selectedEpisode.title}
                        </h2>
                    </section>
                )}

                {/* Episodes */}
                <section className="mt-8">
                    <h2 className="mb-4 text-xl font-bold">
                        قسمت‌ها
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {episodes.map((episode) => {
                            const isSelected =
                                selectedEpisode?._id === episode._id;

                            return (
                                <button
                                    key={episode._id}
                                    onClick={() =>
                                        setSelectedEpisode(episode)
                                    }
                                    className={`rounded-xl border p-4 text-right transition ${isSelected
                                            ? "border-[#14c78b] bg-[#14c78b]/10"
                                            : "border-white/10 bg-[#111827] hover:border-white/20"
                                        }`}
                                >
                                    <div className="font-semibold">
                                        قسمت {episode.episodeNumber}
                                    </div>

                                    <div className="mt-1 text-sm text-gray-400">
                                        {episode.title}
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