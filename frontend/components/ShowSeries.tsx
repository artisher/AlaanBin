
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Series } from "@/types/Series";
import { SeriesCard } from "./SeriesCard";

export const ShowSeries = () => {
    const router = useRouter();

    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await fetch(
                    `${ process.env.NEXT_PUBLIC_API_URL } /api/series`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "خطا در دریافت سریال‌ها"
                    );
                }

                setSeries(data.series ?? []);
            } catch (error) {
                console.error("FETCH SERIES ERROR:", error);
                setSeries([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, []);

    return (
        <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-white">
                سریال‌ها
            </h2>

            {loading ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl bg-[#111827] animate-pulse"
                        >
                            <div className="aspect-[2/3] bg-white/5" />

                            <div className="p-3">
                                <div className="h-4 w-3/4 rounded bg-white/10" />
                                <div className="mt-2 h-3 w-1/2 rounded bg-white/5" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : series.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {series.map((item) => (
                        <SeriesCard
                            key={item._id}
                            series={item}
                            onClick={() =>
                                router.push(`/ series / ${ item._id } `)
                            }
                        />
                    ))}
                </div>
            ) : null}
        </section>
    );
};

