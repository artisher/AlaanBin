"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ChevronLeft, ChevronRight, ChevronDown, Film, SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";

import type { Movie } from "@/types/movies";
import { MovieCard } from "@/components/MovieCard";
import { MovieModal } from "@/components/MovieMedal";
import { useTvNavigation } from "@/components/useTvNavigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_SIZE = 24;

const GENRES = [
    { label: "همه", value: "" },
    { label: "اکشن", value: "Action" },
    { label: "کمدی", value: "Comedy" },
    { label: "درام", value: "Drama" },
    { label: "عاشقانه", value: "Romance" },
    { label: "ترسناک", value: "Horror" },
    { label: "جنایی", value: "Crime" },
    { label: "هیجان‌انگیز", value: "Thriller" },
    { label: "معمایی", value: "Mystery" },
    { label: "اجتماعی", value: "Social" },
    { label: "روان‌شناختی", value: "Psychological" },
    { label: "علمی تخیلی", value: "Sci-Fi" },
    { label: "ماجراجویی", value: "Adventure" },
    { label: "فانتزی", value: "Fantasy" },
    { label: "تاریخی", value: "Historical" },
    { label: "جنگی", value: "War" },
    { label: "خانوادگی", value: "Family" },
    { label: "کودک و نوجوان", value: "Kids" },
    { label: "انیمیشن", value: "Animation" },
    { label: "مستند", value: "Documentary" },
    { label: "موزیکال", value: "Musical" },
    { label: "ورزشی", value: "Sport" },
    { label: "سیاسی", value: "Political" },
    { label: "زندگی‌نامه‌ای", value: "Biography" },
    { label: "فاجعه", value: "Disaster" },
    { label: "ملودرام", value: "Melodrama" },
];

const PRODUCTS = [
    { label: "همه", value: "" },
    { label: "ایرانی", value: "ایرانی" },
    { label: "خارجی", value: "خارجی" },
];

const RATINGS = [
    { label: "همه امتیازها", value: "" },
    { label: "۷ به بالا", value: "7" },
    { label: "۸ به بالا", value: "8" },
    { label: "۹ به بالا", value: "9" },
];

const SORT_OPTIONS = [
    { label: "جدیدترین", value: "newest" },
    { label: "قدیمی‌ترین", value: "oldest" },
    { label: "بیشترین امتیاز", value: "highRating" },
    { label: "کمترین امتیاز", value: "lowRating" },
];

const fa = (n: number) => n.toLocaleString("fa-IR");

/** 1 … 4 5 6 … 20 */
function pageList(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) pages.push("…");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push("…");
    pages.push(total);
    return pages;
}

export default function MoviesPage() {
    useTvNavigation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const topRef = useRef<HTMLDivElement>(null);

    /* Filters come from the URL — single source of truth */
    const search = searchParams.get("search") || "";
    const genre = searchParams.get("genre") || "";
    const product = searchParams.get("product") || "";
    const rating = searchParams.get("rating") || "";
    const sort = searchParams.get("sort") || "newest";

    const [searchInput, setSearchInput] = useState(search);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    /* ---------- URL helpers ---------- */
    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && !(key === "sort" && value === "newest")) params.set(key, value);
        else params.delete(key);
        const q = params.toString();
        router.replace(q ? `/movies?${q}` : "/movies", { scroll: false });
    };

    const clearFilters = () => {
        setSearchInput("");
        router.replace("/movies", { scroll: false });
    };

    /* Keep input in sync if URL changes from outside (back button, links) */
    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    /* Debounced search → URL */
    useEffect(() => {
        if (searchInput.trim() === search) return;
        const t = setTimeout(() => setParam("search", searchInput.trim()), 400);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    /* Reset to page 1 whenever filters change */
    useEffect(() => {
        setPage(1);
    }, [search, genre, product, rating, sort]);

    /* ---------- Fetch movies ---------- */
    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE), sort });
                if (search) params.set("search", search);
                if (genre) params.set("genre", genre);
                if (product) params.set("product", product);
                if (rating) params.set("rating", rating);

                const res = await fetch(`${API_URL}/api/movies?${params}`, {
                    credentials: "include",
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error("Failed to fetch movies");

                const data = await res.json();
                setMovies(Array.isArray(data.movies) ? data.movies : []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                if ((error as Error).name === "AbortError") return;
                console.error("Error fetching movies:", error);
                setMovies([]);
                setTotalPages(1);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [page, search, genre, product, rating, sort]);

    /* ---------- Favorites ---------- */
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/favorites`, { credentials: "include", cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                const list: { _id: string; contentType?: string }[] = Array.isArray(data.favorites)
                    ? data.favorites
                    : Array.isArray(data.favoriteMovies)
                        ? data.favoriteMovies
                        : [];
                setFavoriteIds(list.filter((x) => !x.contentType || x.contentType === "movie").map((x) => x._id));
            } catch {
                /* not logged in or network error — ignore */
            }
        })();
    }, []);

    const favoriteHandler = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/api/favorites/movie/${id}`, {
                method: "POST",
                credentials: "include",
            });
            const data: { message?: string; success?: boolean; isFavorite?: boolean } = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "خطا در تغییر وضعیت علاقه‌مندی.");

            const nowFavorite = data.isFavorite ?? !favoriteIds.includes(id);
            setFavoriteIds((prev) => (nowFavorite ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)));
            toast.success(nowFavorite ? "به علاقه‌مندی‌ها اضافه شد." : "از علاقه‌مندی‌ها حذف شد.");
        } catch (error) {
            console.error("FAVORITE ERROR:", error);
            toast.error(error instanceof Error ? error.message : "خطا در تغییر علاقه‌مندی.");
        }
    };

    const goToPage = (p: number) => {
        setPage(p);
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const activeFilterCount = [search, genre, product, rating, sort !== "newest" ? sort : ""].filter(Boolean).length;
    const pages = useMemo(() => pageList(page, totalPages), [page, totalPages]);

    return (
        <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-white">
            {/* Background: CSS only */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
                style={{ background: "radial-gradient(ellipse 55% 100% at 85% 0%, rgba(20,199,139,0.12), transparent 70%)" }}
            />

            {/* ---------- Header ---------- */}
            <header className="relative mx-auto max-w-[1650px] px-5 pb-8 pt-10 sm:px-8 md:pt-14 lg:px-14 tv:max-w-none tv:px-[5vw]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
                    <Film size={13} className="text-[#14c78b]" />
                    <span className="text-[11px] font-semibold tracking-[0.15em] text-white/60">MOVIES</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl tv:text-5xl">فیلم‌ها</h1>
                <p className="mt-2 text-sm text-white/45 md:text-base">فیلم مورد علاقه‌ات رو پیدا کن و آماده تماشا شو.</p>
            </header>

            {/* ---------- Filters (sticky) ---------- */}
            <div ref={topRef} className="scroll-mt-4" />
            <section className="sticky top-0 z-30 border-y border-white/[0.06] bg-[#0B0F14]/95">
                <div className="mx-auto max-w-[1650px] px-5 py-3 sm:px-8 lg:px-14 tv:max-w-none tv:px-[5vw]">
                    {/* Row 1: search + product + selects */}
                    <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
                        <div className="flex h-11 flex-1 items-center gap-2.5 rounded-md border border-white/[0.08] bg-[#11151c] px-3.5 transition-colors focus-within:border-[#14c78b]/50">
                            <Search size={17} className="shrink-0 text-white/35" />
                            <input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="جستجوی فیلم..."
                                data-tv-focus
                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    aria-label="پاک کردن جستجو"
                                    onClick={() => setSearchInput("")}
                                    className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2.5">
                            <button
                                type="button"
                                onClick={() => setFiltersOpen((v) => !v)}
                                className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-white/[0.08] bg-[#11151c] px-4 text-sm text-white/70 md:hidden"
                            >
                                <SlidersHorizontal size={16} />
                                فیلترها
                                {activeFilterCount > 0 && (
                                    <span className="rounded bg-[#14c78b] px-1.5 text-[11px] font-bold text-[#0B0F14]">
                                        {fa(activeFilterCount)}
                                    </span>
                                )}
                            </button>

                            <div className={`${filtersOpen ? "flex" : "hidden"} gap-2.5 md:flex`}>
                                {/* Product segmented */}
                                <div className="flex h-11 rounded-md border border-white/[0.08] bg-[#11151c] p-1">
                                    {PRODUCTS.map((p) => (
                                        <button
                                            key={p.value}
                                            type="button"
                                            data-tv-focus
                                            onClick={() => setParam("product", p.value)}
                                            className={`tv-focus cursor-pointer rounded px-3 text-sm transition-colors ${product === p.value ? "bg-white text-[#0B0F14]" : "text-white/55 hover:text-white"
                                                }`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`${filtersOpen ? "grid" : "hidden"} grid-cols-2 gap-2.5 md:flex`}>
                            <Select value={rating} onChange={(v) => setParam("rating", v)} options={RATINGS} />
                            <Select value={sort} onChange={(v) => setParam("sort", v)} options={SORT_OPTIONS} />
                        </div>

                        {activeFilterCount > 0 && (
                            <button
                                type="button"
                                data-tv-focus
                                onClick={clearFilters}
                                className={`tv-focus ${filtersOpen ? "flex" : "hidden"} h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-white/[0.08] px-3.5 text-sm text-white/50 transition-colors hover:border-red-400/40 hover:text-red-400 md:flex`}
                            >
                                <X size={15} />
                                پاک کردن
                            </button>
                        )}
                    </div>

                    {/* Row 2: genre chips */}
                    <div className={`${filtersOpen ? "flex" : "hidden"} no-scrollbar -mx-1 mt-2.5 gap-1.5 overflow-x-auto px-1 md:flex`}>
                        {GENRES.map((g) => {
                            const active = genre === g.value;
                            return (
                                <button
                                    key={g.value || "all"}
                                    type="button"
                                    data-tv-focus
                                    onClick={() => setParam("genre", g.value)}
                                    className={`tv-focus shrink-0 cursor-pointer rounded-md border px-3 py-1.5 text-[13px] transition-colors ${active
                                            ? "border-[#14c78b]/50 bg-[#14c78b]/10 text-[#14c78b]"
                                            : "border-white/[0.06] text-white/55 hover:border-white/20 hover:text-white"
                                        }`}
                                >
                                    {g.value === "" ? "همه ژانرها" : g.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------- Grid ---------- */}
            <section className="relative mx-auto max-w-[1650px] px-5 pb-20 pt-8 sm:px-8 lg:px-14 tv:max-w-none tv:px-[5vw]">
                {!loading && movies.length > 0 && (
                    <div className="mb-5 flex items-center justify-between text-xs text-white/40">
                        <span>
                            صفحه {fa(page)} از {fa(totalPages)}
                        </span>
                        {search && (
                            <span>
                                نتایج برای «<span className="text-white/80">{search}</span>»
                            </span>
                        )}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                        {Array.from({ length: 14 }).map((_, i) => (
                            <div key={i}>
                                <div className="aspect-[2/3] w-full animate-pulse rounded-md bg-white/[0.04]" />
                                <div className="mt-2.5 h-3.5 w-2/3 animate-pulse rounded-sm bg-white/[0.05]" />
                                <div className="mt-1.5 h-3 w-1/3 animate-pulse rounded-sm bg-white/[0.04]" />
                            </div>
                        ))}
                    </div>
                ) : movies.length === 0 ? (
                    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.1] text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03]">
                            <Film size={20} className="text-white/40" />
                        </div>
                        <p className="font-medium text-white/80">فیلمی پیدا نشد</p>
                        <p className="mt-1.5 text-sm text-white/40">فیلترها یا عبارت جستجو رو تغییر بده.</p>
                        {activeFilterCount > 0 && (
                            <button
                                type="button"
                                data-tv-focus
                                onClick={clearFilters}
                                className="tv-focus mt-6 cursor-pointer rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03]"
                            >
                                حذف فیلترها
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 tv:gap-x-7 tv:gap-y-10">
                        {movies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
                        ))}
                    </div>
                )}

                {/* ---------- Pagination ---------- */}
                {!loading && totalPages > 1 && (
                    <nav className="mt-14 flex items-center justify-center gap-1.5" aria-label="صفحه‌بندی">
                        <PageButton disabled={page === 1} onClick={() => goToPage(page - 1)} label="صفحه قبلی">
                            <ChevronRight size={17} />
                        </PageButton>

                        {pages.map((p, i) =>
                            p === "…" ? (
                                <span key={`gap-${i}`} className="px-1.5 text-sm text-white/30">
                                    …
                                </span>
                            ) : (
                                <PageButton key={p} active={p === page} onClick={() => goToPage(p)} label={`صفحه ${p}`}>
                                    {fa(p)}
                                </PageButton>
                            )
                        )}

                        <PageButton disabled={page === totalPages} onClick={() => goToPage(page + 1)} label="صفحه بعدی">
                            <ChevronLeft size={17} />
                        </PageButton>
                    </nav>
                )}
            </section>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen
                    onClose={() => setSelectedMovie(null)}
                    favoriteHandler={(id) => favoriteHandler(id)}
                    isFavorite={favoriteIds.includes(selectedMovie._id)}
                />
            )}
        </main>
    );
}

/* ---------- Small pieces ---------- */

function Select({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: { label: string; value: string }[];
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                data-tv-focus
                className="tv-focus h-11 w-full min-w-[140px] cursor-pointer appearance-none rounded-md border border-white/[0.08] bg-[#11151c] pl-9 pr-3.5 text-sm text-white/80 outline-none transition-colors hover:border-white/20 focus:border-[#14c78b]/50"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value} className="bg-[#11151c]">
                        {o.label}
                    </option>
                ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
        </div>
    );
}

function PageButton({
    children,
    onClick,
    disabled,
    active,
    label,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
    label: string;
}) {
    return (
        <button
            type="button"
            data-tv-focus
            aria-label={label}
            aria-current={active ? "page" : undefined}
            disabled={disabled}
            onClick={onClick}
            className={`tv-focus flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border px-2 text-sm tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-25 ${active
                    ? "border-white bg-white font-semibold text-[#0B0F14]"
                    : "border-white/[0.08] bg-[#11151c] text-white/60 hover:border-white/25 hover:text-white"
                }`}
        >
            {children}
        </button>
    );
}