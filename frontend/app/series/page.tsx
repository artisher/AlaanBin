"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    Sparkles,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import type { Series } from "@/types/Series";
import { SeriesCard } from "@/components/SeriesCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GENRES = [
    "همه",
    "اکشن",
    "کمدی",
    "درام",
    "عاشقانه",
    "ترسناک",
    "اجتماعی",
    "ماجراجویی",
    "تاریخی",
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

export default function SeriesPage() {
    const router = useRouter();

    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("همه");
    const [product, setProduct] = useState("");
    const [rating, setRating] = useState("");
    const [sort, setSort] = useState("newest");

    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        const fetchSeries = async () => {
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

                if (genre !== "همه") {
                    params.set("genre", genre);
                }

                if (product) {
                    params.set("product", product);
                }

                if (rating) {
                    params.set("rating", rating);
                }

                const res = await fetch(
                    `${API_URL}/api/series?${params.toString()}`,
                    {
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch series");
                }

                const data = await res.json();

                setSeries(data.series || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error("Error fetching series:", error);

                setSeries([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [page, search, genre, product, rating, sort]);

    // وقتی فیلتر تغییر کرد، برگرد صفحه اول
    useEffect(() => {
        setPage(1);
    }, [search, genre, product, rating, sort]);

    const clearFilters = () => {
        setSearch("");
        setGenre("همه");
        setProduct("");
        setRating("");
        setSort("newest");
        setPage(1);
    };

    const hasFilters =
        search.trim() ||
        genre !== "همه" ||
        product ||
        rating ||
        sort !== "newest";

    return (
        <main className="min-h-screen overflow-hidden bg-[#0B0F14] text-white">
            {/* =====================================================
                Cinematic Background
            ====================================================== */}

            <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
                <div className="absolute right-[-250px] top-[-250px] h-[600px] w-[600px] rounded-full bg-[#14C78B]/[0.055] blur-[140px]" />

                <div className="absolute left-[-300px] top-[550px] h-[600px] w-[600px] rounded-full bg-[#14C78B]/[0.035] blur-[150px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,199,139,0.035),transparent_35%)]" />
            </div>

            {/* =====================================================
                Header
            ====================================================== */}

            <section className="relative z-10">
                <div className="mx-auto max-w-[1650px] px-5 pb-8 pt-12 md:pb-10 md:pt-16">
                    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-[#111820] via-[#0E141B] to-[#0B0F14] px-6 py-8 shadow-2xl shadow-black/20 md:px-10 md:py-10">
                        {/* decorative glow */}
                        <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-[#14C78B]/10 blur-[100px]" />

                        <div className="relative z-10">
                            <div className="mb-4 flex items-center gap-2 text-[#14C78B]">
                                <Sparkles size={17} />
                                <span className="text-xs font-bold tracking-wide">
                                    ALANBIN SERIES
                                </span>
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                                سریال‌ها
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400 md:text-base">
                                سریال مورد علاقه‌ات رو پیدا کن و وارد دنیای
                                داستان‌های AlanBin شو.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                Filters
            ====================================================== */}

            <section className="relative z-10 mx-auto max-w-[1650px] px-5 pb-9">
                <div className="rounded-[24px] border border-white/[0.07] bg-[#0F151C]/80 p-3 shadow-xl shadow-black/10 backdrop-blur-xl md:p-4">
                    {/* Search + mobile filter */}

                    <div className="flex flex-col gap-3 md:flex-row">
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
                                border-white/[0.08]
                                bg-[#111820]
                                px-4
                                transition-all
                                duration-300
                                focus-within:border-[#14C78B]/40
                                focus-within:bg-[#131C24]
                                focus-within:shadow-[0_0_30px_rgba(20,199,139,0.05)]
                            "
                        >
                            <Search
                                size={19}
                                className="shrink-0 text-gray-500 transition-colors group-focus-within:text-[#14C78B]"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="جستجوی سریال..."
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
                                    onClick={() => setSearch("")}
                                    className="cursor-pointer text-gray-500 transition hover:text-white"
                                >
                                    <X size={17} />
                                </button>
                            )}
                        </div>

                        {/* Mobile filters */}

                        <button
                            onClick={() =>
                                setFiltersOpen((prev) => !prev)
                            }
                            className="
                                flex
                                h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-white/[0.08]
                                bg-[#111820]
                                px-5
                                text-sm
                                font-medium
                                text-gray-300
                                transition
                                hover:border-[#14C78B]/30
                                hover:text-[#14C78B]
                                md:hidden
                            "
                        >
                            <SlidersHorizontal size={18} />
                            فیلترها
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${filtersOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Filters */}

                    <div
                        className={`
                            mt-3
                            flex-wrap
                            gap-2
                            ${filtersOpen
                                ? "flex"
                                : "hidden md:flex"
                            }
                        `}
                    >
                        {/* Genre */}

                        <div className="relative">
                            <select
                                value={genre}
                                onChange={(e) =>
                                    setGenre(e.target.value)
                                }
                                className="
                                    h-10
                                    min-w-[130px]
                                    appearance-none
                                    cursor-pointer
                                    rounded-xl
                                    border
                                    border-white/[0.07]
                                    bg-[#111820]
                                    pl-9
                                    pr-3
                                    text-sm
                                    text-gray-300
                                    outline-none
                                    transition
                                    hover:border-white/15
                                    focus:border-[#14C78B]/40
                                "
                            >
                                {GENRES.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                        className="bg-[#111820]"
                                    >
                                        {item === "همه"
                                            ? "همه ژانرها"
                                            : item}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>

                        {/* Product */}

                        <div className="relative">
                            <select
                                value={product}
                                onChange={(e) =>
                                    setProduct(e.target.value)
                                }
                                className="
                                    h-10
                                    min-w-[110px]
                                    appearance-none
                                    cursor-pointer
                                    rounded-xl
                                    border
                                    border-white/[0.07]
                                    bg-[#111820]
                                    pl-9
                                    pr-3
                                    text-sm
                                    text-gray-300
                                    outline-none
                                    transition
                                    hover:border-white/15
                                    focus:border-[#14C78B]/40
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

                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>

                        {/* Rating */}

                        <div className="relative">
                            <select
                                value={rating}
                                onChange={(e) =>
                                    setRating(e.target.value)
                                }
                                className="
                                    h-10
                                    min-w-[125px]
                                    appearance-none
                                    cursor-pointer
                                    rounded-xl
                                    border
                                    border-white/[0.07]
                                    bg-[#111820]
                                    pl-9
                                    pr-3
                                    text-sm
                                    text-gray-300
                                    outline-none
                                    transition
                                    hover:border-white/15
                                    focus:border-[#14C78B]/40
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

                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>

                        {/* Sort */}

                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) =>
                                    setSort(e.target.value)
                                }
                                className="
                                    h-10
                                    min-w-[125px]
                                    appearance-none
                                    cursor-pointer
                                    rounded-xl
                                    border
                                    border-white/[0.07]
                                    bg-[#111820]
                                    pl-9
                                    pr-3
                                    text-sm
                                    text-gray-300
                                    outline-none
                                    transition
                                    hover:border-white/15
                                    focus:border-[#14C78B]/40
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

                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>

                        {/* Clear */}

                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="
                                    h-10
                                    rounded-xl
                                    border
                                    border-red-400/10
                                    bg-red-400/[0.03]
                                    px-4
                                    text-sm
                                    text-gray-400
                                    transition
                                    hover:border-red-400/25
                                    hover:bg-red-400/[0.06]
                                    hover:text-red-400
                                "
                            >
                                پاک کردن فیلترها
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                Content
            ====================================================== */}

            <section className="relative z-10 mx-auto max-w-[1650px] px-5 pb-20">
                {/* Section heading */}

                {!loading && series.length > 0 && (
                    <div className="mb-7 flex items-end justify-between border-b border-white/[0.06] pb-5">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="h-7 w-1 rounded-full bg-[#14C78B]" />

                                <h2 className="text-xl font-bold text-white md:text-2xl">
                                    سریال‌ها
                                </h2>
                            </div>

                            <p className="mt-2 pr-4 text-xs text-gray-500 md:text-sm">
                                مجموعه سریال‌های موجود در AlanBin
                            </p>
                        </div>

                        <div className="hidden rounded-full border border-white/[0.07] bg-[#111820] px-4 py-2 text-xs text-gray-400 sm:block">
                            صفحه{" "}
                            <span className="font-bold text-white">
                                {page}
                            </span>{" "}
                            از{" "}
                            <span className="font-bold text-[#14C78B]">
                                {totalPages}
                            </span>
                        </div>
                    </div>
                )}

                {/* Loading */}

                {loading ? (
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-x-4
                            gap-y-9
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                            xl:grid-cols-6
                        "
                    >
                        {Array.from({ length: 12 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="
                                        mx-auto
                                        w-full
                                        max-w-[215px]
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-white/[0.04]
                                        bg-[#111820]
                                    "
                                >
                                    <div className="aspect-[2/3] animate-pulse bg-white/[0.035]" />

                                    <div className="space-y-2 p-3">
                                        <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.05]" />
                                        <div className="h-2.5 w-1/2 animate-pulse rounded bg-white/[0.04]" />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : series.length === 0 ? (
                    <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#111820] to-[#0D1218]">
                        <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#14C78B]/[0.035] blur-[100px]" />

                        <div className="relative z-10 px-5 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
                                <Search
                                    size={26}
                                    className="text-gray-500"
                                />
                            </div>

                            <p className="text-lg font-bold text-gray-200">
                                سریالی پیدا نشد
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                فیلترها یا عبارت جستجو را تغییر بده.
                            </p>

                            {hasFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="
                                        mt-6
                                        rounded-xl
                                        bg-[#14C78B]
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-black
                                        transition
                                        hover:bg-[#18d995]
                                    "
                                >
                                    پاک کردن فیلترها
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-x-4
                            gap-y-10
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-5
                            xl:grid-cols-6
                            2xl:gap-x-5
                        "
                    >
                        {series.map((item) => (
                            <div
                                key={item._id}
                                className="
                                    min-w-0
                                    transition-transform
                                    duration-300
                                    hover:-translate-y-1
                                "
                            >
                                <SeriesCard
                                    series={item}
                                    onClick={() =>
                                        router.push(
                                            `/series/${item._id}`
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* =====================================================
                    Pagination
                ====================================================== */}

                {!loading && totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center">
                        <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-[#111820]/80 p-2 shadow-xl shadow-black/20 backdrop-blur-xl">
                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((prev) => prev - 1)
                                }
                                className="
                                    flex
                                    h-10
                                    items-center
                                    gap-1.5
                                    rounded-xl
                                    px-3
                                    text-sm
                                    text-gray-400
                                    transition
                                    hover:bg-white/[0.04]
                                    hover:text-[#14C78B]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                "
                            >
                                <ChevronRight size={17} />
                                <span className="hidden sm:inline">
                                    قبلی
                                </span>
                            </button>

                            <div className="flex h-10 min-w-[90px] items-center justify-center rounded-xl bg-white/[0.04] px-4 text-sm">
                                <span className="font-bold text-white">
                                    {page}
                                </span>

                                <span className="mx-2 text-gray-600">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    {totalPages}
                                </span>
                            </div>

                            <button
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((prev) => prev + 1)
                                }
                                className="
                                    flex
                                    h-10
                                    items-center
                                    gap-1.5
                                    rounded-xl
                                    px-3
                                    text-sm
                                    text-gray-400
                                    transition
                                    hover:bg-white/[0.04]
                                    hover:text-[#14C78B]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                "
                            >
                                <span className="hidden sm:inline">
                                    بعدی
                                </span>
                                <ChevronLeft size={17} />
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}