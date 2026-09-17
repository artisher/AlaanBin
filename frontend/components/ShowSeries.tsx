"use client";

import { useEffect, useState } from "react";

import type { Series } from "@/types/Series";
import { SeriesCard } from "./SeriesCard";

export const ShowSeries = () => {
    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/series`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "خطا در دریافت سریال‌ها");
                }

                setSeries(data.series || []);
            } catch (error) {
                console.error("FETCH SERIES ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, []);

    if (loading) {
        return (
            <section className="mt-10">
                <h2 className="mb-5 text-xl font-bold text-white">
                    سریال‌ها
                </h2>

                <p className="text-gray-400">
                    در حال دریافت سریال‌ها...
                </p>
            </section>
        );
    }

    if (series.length === 0) {
        return null;
    }

    return (
        <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-white">
                سریال‌ها
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {series.map((item) => (
                    <SeriesCard
                        key={item._id}
                        series={item}
                        onClick={() => {
                            window.location.href = `/series/${item._id}`;
                        }}
                    />
                ))}
            </div>
        </section>
    );
};