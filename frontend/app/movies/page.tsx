"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { Movie } from "@/types/movies";
import { MovieCard } from "@/components/MovieCard";

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

export default function MoviesPage() {
    const router = useRouter();

    const [movies, setMovies] = useState<Movie[]>([]);
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
                    `${API_URL}/api/movies?${params.toString()}`,
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

    // وقتی فیلتر تغییر کرد، برگرد صفحه اول
    useEffect(() => {
        setPage(1);
    }, [
        search,
        genre,
        product,
        rating,
        sort,
    ]);

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
        <main className="min-h-screen bg-[#0B0F14] text-white">

            {/* ================= Header ================= */}

            <section className="
                max-w-[1650px]
                mx-auto
                px-5
                pt-10
                pb-6
            ">

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    md:justify-between
                    gap-5
                ">

                    <div>

                        <h1 className="
                            text-3xl
                            md:text-4xl
                            font-bold
                        ">
                            فیلم‌ها
                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            md:text-base
                            text-gray-400
                        ">
                            فیلم مورد علاقه‌ات رو پیدا کن
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= Filters ================= */}

            <section className="
                max-w-[1650px]
                mx-auto
                px-5
                pb-8
            ">

                {/* Search + Mobile Filter Button */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    gap-3
                ">

                    {/* Search */}

                    <div className="
                        flex
                        items-center
                        gap-2
                        flex-1
                        h-11
                        px-4
                        rounded-xl
                        bg-[#111820]
                        border
                        border-white/10
                        focus-within:border-[#14c78b]/50
                    ">

                        <Search
                            size={18}
                            className="text-gray-500 shrink-0"
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="جستجوی فیلم..."
                            className="
                                w-full
                                bg-transparent
                                outline-none
                                text-sm
                                text-white
                                placeholder:text-gray-500
                            "
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="
                                    text-gray-500
                                    hover:text-white
                                    cursor-pointer
                                "
                            >
                                <X size={17} />
                            </button>
                        )}

                    </div>


                    {/* Mobile filter button */}

                    <button
                        onClick={() =>
                            setFiltersOpen((prev) => !prev)
                        }
                        className="
                            md:hidden
                            h-11
                            px-4
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-[#111820]
                            border
                            border-white/10
                            text-gray-300
                            hover:text-[#14c78b]
                            transition
                            cursor-pointer
                        "
                    >
                        <SlidersHorizontal size={18} />
                        فیلترها
                    </button>

                </div>


                {/* Filters */}

                <div className={`
                    mt-4
                    flex
                    flex-wrap
                    gap-3

                    ${filtersOpen ? "flex" : "hidden md:flex"}
                `}>

                    {/* Genre */}

                    <select
                        value={genre}
                        onChange={(e) =>
                            setGenre(e.target.value)
                        }
                        className="
                            h-10
                            px-3
                            rounded-xl
                            bg-[#111820]
                            border
                            border-white/10
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#14c78b]/50
                            cursor-pointer
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


                    {/* Product */}

                    <select
                        value={product}
                        onChange={(e) =>
                            setProduct(e.target.value)
                        }
                        className="
                            h-10
                            px-3
                            rounded-xl
                            bg-[#111820]
                            border
                            border-white/10
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#14c78b]/50
                            cursor-pointer
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
                            setRating(e.target.value)
                        }
                        className="
                            h-10
                            px-3
                            rounded-xl
                            bg-[#111820]
                            border
                            border-white/10
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#14c78b]/50
                            cursor-pointer
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
                            setSort(e.target.value)
                        }
                        className="
                            h-10
                            px-3
                            rounded-xl
                            bg-[#111820]
                            border
                            border-white/10
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#14c78b]/50
                            cursor-pointer
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
                            onClick={clearFilters}
                            className="
                                h-10
                                px-4
                                rounded-xl
                                border
                                border-white/10
                                text-sm
                                text-gray-400
                                hover:text-red-400
                                hover:border-red-400/30
                                transition
                                cursor-pointer
                            "
                        >
                            پاک کردن فیلترها
                        </button>
                    )}

                </div>

            </section>


            {/* ================= Movies ================= */}

            <section className="
                max-w-[1650px]
                mx-auto
                px-5
                pb-16
            ">

                {loading ? (

                    <div className="
                        flex
                        flex-wrap
                        justify-center
                        xl:justify-start
                        gap-x-5
                        gap-y-10
                    ">

                        {Array.from({ length: 12 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="
                                        w-[155px]
                                        sm:w-[170px]
                                        md:w-[185px]
                                        lg:w-[205px]
                                        xl:w-[215px]

                                        h-[250px]
                                        sm:h-[275px]
                                        md:h-[300px]
                                        lg:h-[330px]
                                        xl:h-[345px]

                                        rounded-2xl
                                        bg-[#111820]
                                        animate-pulse
                                    "
                                />
                            )
                        )}

                    </div>

                ) : movies.length === 0 ? (

                    <div className="
                        min-h-[300px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                    ">

                        <p className="text-gray-300">
                            فیلمی پیدا نشد
                        </p>

                        <p className="
                            mt-2
                            text-sm
                            text-gray-500
                        ">
                            فیلترها یا عبارت جستجو را تغییر بده.
                        </p>

                    </div>

                ) : (

                    <div className="
                        flex
                        flex-wrap
                        justify-center
                        xl:justify-start
                        gap-x-5
                        gap-y-10
                    ">

                        {movies.map((movie) => (
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                onClick={() =>
                                    router.push(
                                        `/movies/${movie._id}`
                                    )
                                }
                            />
                        ))}

                    </div>

                )}


                {/* ================= Pagination ================= */}

                {!loading && totalPages > 1 && (
                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        mt-14
                    ">

                        <button
                            disabled={page === 1}
                            onClick={() =>
                                setPage((prev) => prev - 1)
                            }
                            className="
                                px-4
                                py-2
                                rounded-xl
                                bg-[#111820]
                                border
                                border-white/10
                                text-sm
                                text-gray-300
                                hover:border-[#14c78b]/40
                                hover:text-[#14c78b]
                                disabled:opacity-30
                                disabled:cursor-not-allowed
                                transition
                                cursor-pointer
                            "
                        >
                            قبلی
                        </button>

                        <span className="
                            min-w-[70px]
                            text-center
                            text-sm
                            text-gray-400
                        ">
                            {page} / {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage((prev) => prev + 1)
                            }
                            className="
                                px-4
                                py-2
                                rounded-xl
                                bg-[#111820]
                                border
                                border-white/10
                                text-sm
                                text-gray-300
                                hover:border-[#14c78b]/40
                                hover:text-[#14c78b]
                                disabled:opacity-30
                                disabled:cursor-not-allowed
                                transition
                                cursor-pointer
                            "
                        >
                            بعدی
                        </button>

                    </div>
                )}

            </section>

        </main>
    );
}