
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronLeft,
    ChevronRight,
    Film,
} from "lucide-react";

import type { Movie } from "@/types/movies";
import { MovieCard } from "@/components/MovieCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GENRES = [
    { label: "همه", value: "" },
    { label: "اکشن", value: "Action" },
    { label: "کمدی", value: "Comedy" },
    { label: "درام", value: "Drama" },
    { label: "عاشقانه", value: "Romance" },
    { label: "ترسناک", value: "Horror" },
    { label: "اجتماعی", value: "Social" },
    { label: "ماجراجویی", value: "Adventure" },
    { label: "تاریخی", value: "Historical" },
];

const PRODUCTS = [
    { label: "همه", value: "" },
    { label: "ایرانی", value: "ایرانی" },
    { label: "خارجی", value: "خارجی" },
];

const RATINGS = [
    { label: "همه امتیازها", value: "" },
    { label: "7 به بالا", value: "7" },
    { label: "8 به بالا", value: "8" },
    { label: "9 به بالا", value: "9" },
];

const SORT_OPTIONS = [
    { label: "جدیدترین", value: "newest" },
    { label: "قدیمی‌ترین", value: "oldest" },
    { label: "بیشترین امتیاز", value: "highRating" },
    { label: "کمترین امتیاز", value: "lowRating" },
];

export default function MoviesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [genre, setGenre] = useState(
        searchParams.get("genre") || ""
    );

    const [product, setProduct] = useState(
        searchParams.get("product") || ""
    );

    const [rating, setRating] = useState(
        searchParams.get("rating") || ""
    );

    const [sort, setSort] = useState(
        searchParams.get("sort") || "newest"
    );

    const [filtersOpen, setFiltersOpen] = useState(false);

    // =========================
    // Sync state with URL
    // =========================

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setGenre(searchParams.get("genre") || "");
        setProduct(searchParams.get("product") || "");
        setRating(searchParams.get("rating") || "");
        setSort(searchParams.get("sort") || "newest");
        setPage(1);
    }, [searchParams]);

    // =========================
    // Update URL
    // =========================

    const updateUrl = (
        nextSearch: string,
        nextGenre: string,
        nextProduct: string,
        nextRating: string,
        nextSort: string
    ) => {
        const params = new URLSearchParams();

        if (nextSearch.trim()) {
            params.set("search", nextSearch.trim());
        }

        if (nextGenre) {
            params.set("genre", nextGenre);
        }

        if (nextProduct) {
            params.set("product", nextProduct);
        }

        if (nextRating) {
            params.set("rating", nextRating);
        }

        if (nextSort !== "newest") {
            params.set("sort", nextSort);
        }

        const query = params.toString();

        router.replace(
            query ? `/ movies ? ${ query } ` : "/movies",
            { scroll: false }
        );
    };

    // =========================
    // Fetch Movies
    // =========================

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams({
                    page: String(page),
                    limit: "24",
                    sort,
                });

                if (search.trim()) {
                    params.set("search", search.trim());
                }

                if (genre) {
                    params.set("genre", genre);
                }

                if (product) {
                    params.set("product", product);
                }

                if (rating) {
                    params.set("rating", rating);
                }

                const res = await fetch(
                    `${ API_URL } /api/movies ? ${ params.toString() } `,
                    {
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch movies");
                }

                const data = await res.json();

                setMovies(data.movies || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error("Error fetching movies:", error);

                setMovies([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [
        page,
        search,
        genre,
        product,
        rating,
        sort,
    ]);

    // =========================
    // Filter Handlers
    // =========================

    const handleSearchChange = (
        value: string
    ) => {
        setSearch(value);
        setPage(1);

        updateUrl(
            value,
            genre,
            product,
            rating,
            sort
        );
    };

    const handleGenreChange = (
        value: string
    ) => {
        setGenre(value);
        setPage(1);

        updateUrl(
            search,
            value,
            product,
            rating,
            sort
        );
    };

    const handleProductChange = (
        value: string
    ) => {
        setProduct(value);
        setPage(1);

        updateUrl(
            search,
            genre,
            value,
            rating,
            sort
        );
    };

    const handleRatingChange = (
        value: string
    ) => {
        setRating(value);
        setPage(1);

        updateUrl(
            search,
            genre,
            product,
            value,
            sort
        );
    };

    const handleSortChange = (
        value: string
    ) => {
        setSort(value);
        setPage(1);

        updateUrl(
            search,
            genre,
            product,
            rating,
            value
        );
    };

    const clearFilters = () => {
        setSearch("");
        setGenre("");
        setProduct("");
        setRating("");
        setSort("newest");
        setPage(1);

        router.replace("/movies", {
            scroll: false,
        });
    };

    const hasFilters =
        search.trim() ||
        genre ||
        product ||
        rating ||
        sort !== "newest";

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
                            فیلم‌ها
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

            {/* ================= Filters ================= */}

            <section
                className="
                    relative
                    mx-auto
                    max-w-[1650px]
                    px-5
                    pb-10
                "
            >
                <div
                    className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-[#111820]/80
                        p-3
                        shadow-[0_20px_60px_rgba(0,0,0,0.2)]
                        backdrop-blur-xl
                        md:p-4
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            md:flex-row
                        "
                    >
                        {/* Search */}

                        <div
                            className="
                                group
                                flex
                                h-12
                                flex-1
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#0B0F14]/70
                                px-4
                                transition-all
                                duration-300
                                focus-within:border-[#14c78b]/40
                                focus-within:shadow-[0_0_25px_rgba(20,199,139,0.06)]
                            "
                        >
                            <Search
                                size={19}
                                className="
                                    shrink-0
                                    text-gray-500
                                    transition
                                    group-focus-within:text-[#14c78b]
                                "
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    handleSearchChange(
                                        e.target.value
                                    )
                                }
                                placeholder="جستجوی فیلم..."
                                className="
                                    w-full
                                    bg-transparent
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-gray-600
                                "
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSearchChange("")
                                    }
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-gray-500
                                        transition
                                        hover:bg-white/5
                                        hover:text-white
                                    "
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Mobile filter button */}

                        <button
                            type="button"
                            onClick={() =>
                                setFiltersOpen(
                                    (prev) => !prev
                                )
                            }
                            className="
                                flex
                                h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#0B0F14]/70
                                px-5
                                text-sm
                                font-medium
                                text-gray-300
                                transition-all
                                hover:border-[#14c78b]/30
                                hover:text-[#14c78b]
                                md:hidden
                            "
                        >
                            <SlidersHorizontal size={18} />

                            فیلترها

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-[#14c78b]
                                "
                            />
                        </button>
                    </div>

                    {/* Filters */}

                    <div
                        className={`
mt - 3
flex - wrap
gap - 2.5
border - t
border - white / [0.05]
pt - 3
                            ${
    filtersOpen
        ? "flex"
        : "hidden md:flex"
}
`}
                    >
                        {/* Genre */}

                        <select
                            value={genre}
                            onChange={(e) =>
                                handleGenreChange(
                                    e.target.value
                                )
                            }
                            className="
                                h-10
                                min-w-[125px]
                                cursor-pointer
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#0B0F14]
                                px-3
                                text-sm
                                text-gray-300
                                outline-none
                                transition
                                hover:border-white/15
                                focus:border-[#14c78b]/40
                            "
                        >
                            {GENRES.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                    className="bg-[#111820]"
                                >
                                    {item.label === "همه"
                                        ? "همه ژانرها"
                                        : item.label}
                                </option>
                            ))}
                        </select>

                        {/* Product */}

                        <select
                            value={product}
                            onChange={(e) =>
                                handleProductChange(
                                    e.target.value
                                )
                            }
                            className="
                                h-10
                                min-w-[110px]
                                cursor-pointer
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#0B0F14]
                                px-3
                                text-sm
                                text-gray-300
                                outline-none
                                transition
                                hover:border-white/15
                                focus:border-[#14c78b]/40
                            "
                        >
                            {PRODUCTS.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                    className="bg-[#111820]"
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>

                        {/* Rating */}

                        <select
                            value={rating}
                            onChange={(e) =>
                                handleRatingChange(
                                    e.target.value
                                )
                            }
                            className="
                                h-10
                                min-w-[125px]
                                cursor-pointer
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#0B0F14]
                                px-3
                                text-sm
                                text-gray-300
                                outline-none
                                transition
                                hover:border-white/15
                                focus:border-[#14c78b]/40
                            "
                        >
                            {RATINGS.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                    className="bg-[#111820]"
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}

                        <select
                            value={sort}
                            onChange={(e) =>
                                handleSortChange(
                                    e.target.value
                                )
                            }
                            className="
                                h-10
                                min-w-[130px]
                                cursor-pointer
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-[#0B0F14]
                                px-3
                                text-sm
                                text-gray-300
                                outline-none
                                transition
                                hover:border-white/15
                                focus:border-[#14c78b]/40
                            "
                        >
                            {SORT_OPTIONS.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                    className="bg-[#111820]"
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>

                        {/* Clear */}

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    flex
                                    h-10
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-red-400/10
                                    px-4
                                    text-sm
                                    text-gray-500
                                    transition-all
                                    hover:border-red-400/25
                                    hover:bg-red-400/[0.04]
                                    hover:text-red-400
                                "
                            >
                                <X size={15} />
                                پاک کردن
                            </button>
                        )}
                    </div>
                </div>
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
                ) : movies.length === 0 ? (
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

                        <p className="mt-2 text-sm text-gray-600">
                            فیلترها یا عبارت جستجو را تغییر بده.
                        </p>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    mt-6
                                    rounded-xl
                                    bg-[#14c78b]
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-bold
                                    text-[#06110d]
                                    transition
                                    hover:bg-[#18d995]
                                "
                            >
                                حذف فیلترها
                            </button>
                        )}
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
                        {movies.map((movie) => (
                            <div
                                key={movie._id}
                                className="
                                    w-full
                                    max-w-[215px]
                                "
                            >
                                <MovieCard
                                    movie={movie}
                                    onClick={() =>
                                        router.push(
                                            `/ movies / ${ movie._id } `
                                        )
                                    }
                                />
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

