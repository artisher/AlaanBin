
"use client";

import {
    ChevronLeft,
    ChevronRight,
    Film
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MovieCard } from "@/components/MovieCard";
import { SeriesCard } from "@/components/SeriesCard";
import type { Movie } from "@/types/movies";
import { Series } from "@/types/Series";

type FavoriteMovie = Movie & {
    contentType: "movie";
};

type FavoriteSeries = Series & {
    contentType: "series";
};

type FavoriteItem = FavoriteMovie | FavoriteSeries;

interface FavoritesPageProps {
    userFavorites: FavoriteItem[];
}


export default function FavoritesPage({
    userFavorites,
}: FavoritesPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [favoritesMovies, setFavoritesMovies] =
        useState<FavoriteItem[]>(userFavorites);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );



    const [filtersOpen, setFiltersOpen] = useState(false);

    // =========================
    // Sync state with URL
    // =========================

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setPage(1);
    }, [searchParams]);


    // =========================
    // Filter Handlers
    // =========================








    return (
        <main
            dir="rtl"
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#0B0F14]
                text-white
            "
        >
            {/* ================= Background Glow ================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-40
                    right-1/4
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-[#14c78b]/[0.035]
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    top-[500px]
                    -left-40
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-[#14c78b]/[0.025]
                    blur-[110px]
                "
            />

            {/* ================= Header ================= */}

            <section
                className="
                    relative
                    mx-auto
                    max-w-[1650px]
                    px-5
                    pb-8
                    pt-10
                    md:pb-10
                    md:pt-14
                "
            >
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <div
                            className="
                                mb-4
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-bold
                                tracking-widest
                                text-[#14c78b]
                            "
                        >
                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-[#14c78b]
                                    shadow-[0_0_10px_rgba(20,199,139,0.8)]
                                "
                            />

                            ALANBIN
                        </div>

                        <h1
                            className="
                                text-4xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-5xl
                                md:text-6xl
                            "
                        >
                            فیلم‌های مورد علاقه من
                        </h1>

                        <p
                            className="
                                mt-3
                                max-w-xl
                                text-sm
                                leading-7
                                text-gray-500
                                md:text-base
                            "
                        >
                            فیلم مورد علاقه‌ات رو پیدا کن و
                            آماده تماشا شو.
                        </p>
                    </div>

                    <div
                        className="
                            hidden
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            text-white/20
                            md:flex
                        "
                    >
                        <Film size={28} />
                    </div>
                </div>

                <div
                    className="
                        mt-8
                        h-px
                        w-full
                        bg-gradient-to-l
                        from-[#14c78b]/40
                        via-white/[0.06]
                        to-transparent
                    "
                />
            </section>



            {/* ================= Movies ================= */}

            <section
                className="
                    relative
                    mx-auto
                    max-w-[1650px]
                    px-5
                    pb-20
                "
            >
                {loading ? (
                    <div
                        className="
                            grid
                            grid-cols-2
                            justify-items-center
                            gap-x-4
                            gap-y-10
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                            xl:grid-cols-6
                            2xl:grid-cols-7
                        "
                    >
                        {Array.from({ length: 14 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="
                                        w-full
                                        max-w-[215px]
                                    "
                                >
                                    <div
                                        className="
                                            aspect-[2/3]
                                            w-full
                                            animate-pulse
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-[#151d26]
                                            via-[#111820]
                                            to-[#0d1319]
                                        "
                                    />

                                    <div
                                        className="
                                            mt-3
                                            h-4
                                            w-2/3
                                            animate-pulse
                                            rounded-full
                                            bg-[#111820]
                                        "
                                    />

                                    <div
                                        className="
                                            mt-2
                                            h-3
                                            w-1/3
                                            animate-pulse
                                            rounded-full
                                            bg-[#111820]
                                        "
                                    />
                                </div>
                            )
                        )}
                    </div>
                ) : favoritesMovies.length === 0 ? (
                    <div
                        className="
                            flex
                            min-h-[420px]
                            flex-col
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-white/[0.05]
                            bg-[#111820]/30
                            text-center
                        "
                    >
                        <div
                            className="
                                mb-5
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white/[0.06]
                                bg-white/[0.025]
                                text-gray-600
                            "
                        >
                            <Film size={34} />
                        </div>

                        <p className="text-lg font-bold text-gray-300">
                            فیلمی پیدا نشد
                        </p>




                    </div>
                ) : (
                    <div
                        className="
                            grid
                            grid-cols-2
                            justify-items-center
                            gap-x-4
                            gap-y-10
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                            xl:grid-cols-6
                            2xl:grid-cols-7
                            md:gap-x-5
                            md:gap-y-12
                        "
                    >
                        {favoritesMovies.map((item) => (
                            <div
                                key={`${item.contentType}:${item._id}`}
                                className="w-full max-w-[215px]"
                            >
                                {item.contentType === "movie" ? (
                                    <MovieCard
                                        movie={item}
                                        onClick={() =>
                                            router.push(`/movies/${item._id}`)
                                        }
                                    />
                                ) : (
                                    <SeriesCard
                                        series={item}
                                        onClick={() =>
                                            router.push(`/series/${item._id}`)
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ================= Pagination ================= */}

                {!loading && totalPages > 1 && (
                    <div
                        className="
                            mt-16
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        <button
                            disabled={page === 1}
                            onClick={() =>
                                setPage(
                                    (prev) => prev - 1
                                )
                            }
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#111820]
                                text-gray-400
                                transition-all
                                hover:border-[#14c78b]/30
                                hover:bg-[#14c78b]/[0.05]
                                hover:text-[#14c78b]
                                disabled:cursor-not-allowed
                                disabled:opacity-25
                            "
                            aria-label="صفحه قبلی"
                        >
                            <ChevronRight size={19} />
                        </button>

                        <div
                            className="
                                flex
                                h-11
                                min-w-[100px]
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[#14c78b]/20
                                bg-[#14c78b]/[0.05]
                                px-4
                                text-sm
                                font-bold
                                text-[#14c78b]
                            "
                        >
                            {page}

                            <span className="mx-2 text-gray-600">
                                /
                            </span>

                            <span className="text-gray-400">
                                {totalPages}
                            </span>
                        </div>

                        <button
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage(
                                    (prev) => prev + 1
                                )
                            }
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#111820]
                                text-gray-400
                                transition-all
                                hover:border-[#14c78b]/30
                                hover:bg-[#14c78b]/[0.05]
                                hover:text-[#14c78b]
                                disabled:cursor-not-allowed
                                disabled:opacity-25
                            "
                            aria-label="صفحه بعدی"
                        >
                            <ChevronLeft size={19} />
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

