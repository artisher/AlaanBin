"use client";
import Image from 'next/image';
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from 'react';

import type { Movie } from "@/types/movies";
import { Film, Heart, Play } from 'lucide-react';
import { MovieModal } from './MovieMedal';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

export const ShowMovies = () => {

    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState<any>(0);
    const [sort, setSort] = useState("newest");
    const [product, setProduct] = useState("")
    const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState("");

    //pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);


    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const fetchFavorites = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
            credentials: "include",
        });

        const data = await res.json();



        setFavoriteIds(
            data.favoriteMovies.map((movie: Movie) => movie._id)
        );
    };
    const favoriteHandler = async (id: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${id}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await res.json();
            if (!res.ok) return;
            setFavoriteIds(prev =>
                prev.includes(id)
                    ? prev.filter(x => x !== id)
                    : [...prev, id]
            );
        } catch (err) {
            console.error(err);
        }
    };
    const fetchMovies = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: "20",
            });

            if (search) params.append("search", search);

            if (genre) params.append("genre", genre);
            if (product) params.append("product", product);
            if (rating > 0) params.append("rating", rating.toString());
            if (sort) params.append("sort", sort);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/movies?${params.toString()}`
            );

            const data = await res.json();

            setMovies(data.movies);
            setTotalPages(data.totalPages);

        } finally {
            setLoading(false);

        }
    };



    // فیلتر + سورت

    useEffect(() => {
        fetchMovies();
    }, [genre, product, rating, sort, currentPage, search]);
    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen bg-[#0B0F14] text-white">

            <div className="max-w-[1650px] mx-auto px-6 lg:px-10 py-10">

                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold">
                        آرشیو فیلم‌ها
                    </h1>

                    <p className="text-gray-400 mt-2">
                        جدیدترین فیلم‌های ایرانی و خارجی
                    </p>

                </div>

                {/* Search + Filters */}
                <div className="rounded-2xl border border-white/10 bg-[#111827]/70 backdrop-blur-md p-5">

                    <div className="flex flex-wrap items-center gap-4">

                        {/* Search */}
                        <div className="relative flex-1 min-w-[320px]">

                            <input
                                type="text"
                                placeholder="جستجوی فیلم..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="
                        w-full
                        h-11
                        rounded-xl
                        bg-[#0B0F14]
                        border
                        border-white/10
                        pr-11
                        pl-4
                        text-white
                        placeholder:text-gray-500
                        outline-none
                        transition-all
                        duration-300
                        focus:border-[#14c78b]
                        focus:shadow-[0_0_18px_rgba(20,199,139,.25)]
                        "
                            />

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#14c78b]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                        </div>

                        {/* Product */}
                        <select
                            value={product}
                            onChange={(e) => {
                                setProduct(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="
                    h-11
                    min-w-[150px]
                    rounded-xl
                    bg-[#0B0F14]
                    border
                    border-white/10
                    px-4
                    outline-none
                    transition
                    hover:border-[#14c78b]/40
                    focus:border-[#14c78b]
                    "
                        >
                            <option value="">محصول</option>
                            <option value="IR">ایرانی</option>
                            <option value="IN">خارجی</option>
                        </select>

                        {/* Genre */}
                        <select
                            value={genre}
                            onChange={(e) => {
                                setGenre(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="
                    h-11
                    min-w-[170px]
                    rounded-xl
                    bg-[#0B0F14]
                    border
                    border-white/10
                    px-4
                    outline-none
                    transition
                    hover:border-[#14c78b]/40
                    focus:border-[#14c78b]
                    "
                        >
                            <option value="">ژانر</option>
                            <option value="Drama">درام</option>
                            <option value="Comedy">کمدی</option>
                            <option value="Action">اکشن</option>
                            <option value="Romance">عاشقانه</option>
                            <option value="Adventure">ماجراجویی</option>
                            <option value="Fantasy">فانتزی</option>
                            <option value="Sci-Fi">علمی تخیلی</option>
                            <option value="Biography">زندگینامه</option>
                            <option value="Music">موسیقی</option>
                            <option value="Thriller">هیجان‌انگیز</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="
                    h-11
                    min-w-42.5
                    rounded-xl
                    bg-[#0B0F14]
                    border
                    border-white/10
                    px-4
                    outline-none
                    transition
                    hover:border-[#14c78b]/40
                    focus:border-[#14c78b]
                    "
                        >
                            <option value="">مرتب سازی</option>
                            <option value="newest">جدیدترین</option>
                            <option value="oldest">قدیمی‌ترین</option>
                            <option value="highRating">بیشترین امتیاز</option>
                            <option value="lowRating">کمترین امتیاز</option>
                        </select>

                        {/* Rating */}
                        <div
                            className="
                    flex
                    items-center
                    gap-3
                    h-11
                    px-4
                    rounded-xl
                    bg-[#0B0F14]
                    border
                    border-white/10
                    "
                        >
                            <span className="text-sm whitespace-nowrap text-gray-300">
                                ⭐ {rating}+
                            </span>

                            <input
                                type="range"
                                min={0}
                                max={10}
                                value={rating}
                                onChange={(e) => {
                                    setRating(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="accent-[#14c78b] cursor-pointer w-28"
                            />
                        </div>

                        {/* Clear */}
                        <button
                            onClick={() => {
                                setSearch("")
                                setGenre("")
                                setProduct("")
                                setSort("")
                                setRating("0")
                                setCurrentPage(1)
                            }}
                            className="
                    h-11
                    px-6
                    rounded-xl
                    bg-[#14c78b]
                    text-black
                    font-semibold
                    transition
                    hover:scale-105
                    hover:bg-[#11b17a]
                    active:scale-95
                    "
                        >
                            حذف فیلترها
                        </button>

                    </div>

                </div>


                {/* Result */}

                <div className="mt-10 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        فیلم‌ها

                    </h2>

                    <span className="text-gray-400">

                        {loading ? "..." : `${movies.length} فیلم`}

                    </span>

                </div>



                <div className="border-b border-white/10 mt-5"></div>
                <main className="mt-10">

                    {loading ? (

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10">

                            {Array.from({ length: 12 }).map((_, index) => (
                                <MovieCardSkeleton key={index} />
                            ))}

                        </div>

                    ) : movies.length === 0 ? (

                        <div className="py-28 flex flex-col items-center">

                            <div className="text-6xl mb-5">
                                🎬
                            </div>

                            <h2 className="text-3xl font-bold mb-3">
                                فیلمی پیدا نشد
                            </h2>

                            <p className="text-gray-400 text-center max-w-md leading-8">

                                با فیلترهای انتخاب شده فیلمی وجود ندارد.
                                یک ژانر یا عبارت دیگر را امتحان کنید.

                            </p>

                            <button
                                onClick={() => {

                                    setSearch("")
                                    setGenre("")
                                    setProduct("")
                                    setSort("")
                                    setRating("0")
                                    setCurrentPage(1)

                                }}
                                className="
                mt-8
                px-8
                py-3
                rounded-xl
                bg-[#14c78b]
                text-black
                font-bold
                hover:bg-[#10b27b]
                transition
                "
                            >
                                حذف فیلترها
                            </button>

                        </div>

                    ) : (

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                            {movies.map((movie: Movie) => (

                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                    favoriteHandler={favoriteHandler}
                                    onClick={() => {

                                        setSelectedMovie(movie)
                                        setIsModalOpen(true)

                                    }}
                                />

                            ))}

                        </div>

                    )}

                </main>
                {
                    isModalOpen &&
                    selectedMovie && (

                        <MovieModal
                            movie={selectedMovie}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            favoriteHandler={favoriteHandler}
                            isFavorite={favoriteIds.includes(selectedMovie._id)}
                        />

                    )
                }
            </div>

            {/* pagination */}
            <div className="mt-20 flex justify-center items-center gap-3 mb-5">
                <button

                    disabled={currentPage === totalPages}

                    onClick={() => setCurrentPage(prev => prev + 1)}

                    className="
        h-11
        px-5
        rounded-xl
        bg-[#111827]
        border
        border-white/10
        hover:border-[#14c78b]
        transition
        disabled:opacity-40
        "

                >

                    بعدی

                </button>

                <div
                    className="
        h-11
        min-w-[120px]
        rounded-xl
        bg-[#14c78b]
        flex
        justify-center
        items-center
        text-black
        font-bold
        "
                >

                    {currentPage} از {totalPages}

                </div>

                <button

                    disabled={currentPage === 1}

                    onClick={() => setCurrentPage(prev => prev - 1)}

                    className="
        h-11
        px-5
        rounded-xl
        bg-[#111827]
        border
        border-white/10
        hover:border-[#14c78b]
        transition
        disabled:opacity-40
        "

                >

                    قبلی

                </button>


            </div>
        </div>
    );
}
