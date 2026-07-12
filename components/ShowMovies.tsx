"use client";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useMemo, useState } from 'react';

import type { Movie } from "@/types/movies";
import { Film, Heart, Play } from 'lucide-react';
import { MovieModal } from './MovieMedal';
import { MovieCard } from './MovieCard';

export const ShowMovies = () => {

    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
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
        const res = await fetch("http://localhost:5000/api/favorites", {
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
                `http://localhost:5000/api/favorites/${id}`,
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
                `http://localhost:5000/api/movies?${params.toString()}`
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
        <div className="overflow-x-hidden bg-linear-to-br from-[#11171f] bg-[#05070a] flex flex-col min-h-screen  text-gray-200">

            <h1 className="text-4xl font-bold mb-8 text-primary text-center">
                الان‌بین 🎬
            </h1>

            {/* Sidebar */}
            <aside className="flex flex-wrap justify-evenly items-center gap-2 p-3 rounded-xl z-0 
             bg-white/5 backdrop-blur-sm ">
                {/* فیلتر محصول */}
                <select
                    className="p-2 rounded-md border border-white/10 bg-white/5 text-sm
                     text-gray-200 hover:bg-white/10 focus:outline-none
                      focus:border-white/20 transition-all duration-200"
                    value={product}
                    onChange={(e) => {
                        setProduct(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">محصول :</option>
                    <option value="IR">ایرانی</option>
                    <option value="IN">خارجی</option>
                </select>

                {/* ژانر */}
                <select
                    className="p-2 rounded-md border border-white/10 bg-white/5 text-sm text-gray-200 hover:bg-white/10 focus:outline-none focus:border-white/20 transition-all duration-200"
                    value={genre}
                    onChange={(e) => {
                        setGenre(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">ژانر :</option>
                    <option value="Drama">درام</option>
                    <option value="social">اجتماعی</option>
                    <option value="Comedy">کمدی</option>
                    <option value="Action">اکشن</option>
                    <option value="Romance">عاشقانه</option>
                    <option value="Adventure">ماجراجویی</option>
                    <option value="Music">موسیقی</option>
                    <option value="Biography">زندگینامه</option>
                    <option value="Fantasy">فانتزی</option>
                    <option value="Sci-Fi">علمی-تخیلی</option>
                    <option value="Thriller">هیجان‌انگیز</option>
                </select>

                {/* سورت */}
                <select
                    className="p-2 rounded-md border border-white/10 bg-white/5 text-sm text-gray-200 hover:bg-white/10 focus:outline-none focus:border-white/20 transition-all duration-200"
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">مرتب سازی :</option>
                    <option value="newest">جدیدترین</option>
                    <option value="oldest">قدیمی‌ترین</option>
                    <option value="lowRating">کمترین امتیاز</option>
                    <option value="highRating">بیشترین امتیاز</option>
                </select>

                {/* امتیاز */}
                <div className="flex flex-col items-center">
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={rating}
                        onChange={(e) => {
                            setRating(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="accent-yellow-500 cursor-pointer w-32"
                    />
                    <div className="text-xs text-gray-400 mt-1">{rating}+</div>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="جستجوی فیلم..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="
        w-56
        rounded-xl
        border
        border-[#14c78b]/20
        bg-[#14c78b]/10
        py-2
        pr-10
        pl-4
        text-sm
        text-white
        placeholder:text-gray-400
        outline-none
        transition-all
        duration-300
        focus:border-[#14c78b]
        focus:shadow-[0_0_20px_rgba(20,199,139,.25)]
        "
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14c78b]"
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
            </aside>


            {/* Main content */}
            <main className="flex-1 p-8">


                {/* Movies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {movies.map((movie: Movie) => (

                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onClick={() => {
                                setSelectedMovie(movie);
                                setIsModalOpen(true);
                            }}
                            favoriteHandler={favoriteHandler}
                        />
                    ))}
                    {/* modal */}
                    {isModalOpen && selectedMovie && (
                        <MovieModal
                            movie={selectedMovie}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            isFavorite={favoriteIds.includes(selectedMovie._id)}
                            favoriteHandler={favoriteHandler}
                        />
                    )}

                </div>
                <div className="mt-12 flex items-center justify-center gap-6">
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="
        rounded-xl
        border
        border-[#14c78b]/30
        bg-[#14c78b]/10
        px-5
        py-2.5
        font-semibold
        text-[#14c78b]
        transition-all
        duration-300
        hover:bg-[#14c78b]
        hover:text-black
        hover:shadow-[0_0_20px_rgba(20,199,139,.4)]
        disabled:cursor-not-allowed
        disabled:border-zinc-700
        disabled:bg-zinc-900
        disabled:text-zinc-600
        disabled:shadow-none
        "
                    >
                        بعدی →
                    </button>
                    <div
                        className="
        flex
        h-12
        min-w-12
        items-center
        justify-center
        rounded-xl
        border
        border-[#14c78b]/30
        bg-[#14c78b]/10
        px-5
        font-bold
        text-[#14c78b]
        shadow-[0_0_15px_rgba(20,199,139,.15)]
        "
                    >
                        {currentPage} / {totalPages}
                    </div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="
        rounded-xl
        border
        border-[#14c78b]/30
        bg-[#14c78b]/10
        px-5
        py-2.5
        font-semibold
        text-[#14c78b]
        transition-all
        duration-300
        hover:bg-[#14c78b]
        hover:text-black
        hover:shadow-[0_0_20px_rgba(20,199,139,.4)]
        disabled:cursor-not-allowed
        disabled:border-zinc-700
        disabled:bg-zinc-900
        disabled:text-zinc-600
        disabled:shadow-none
        "
                    >
                        ← قبلی
                    </button>





                </div>
            </main>
        </div>
    );
}
