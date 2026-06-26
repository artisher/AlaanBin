"use client";
import Image from 'next/image';
import Link from "next/link";
import { useMemo, useState } from 'react';

import type { Movie } from "@/types/movies";

export const ShowMovies = ({ movies }: Movie) => {

    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [sort, setSort] = useState("newest");
    const [product, setProduct] = useState("")
    const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const moviesList = movies;


    // فیلتر + سورت
    const filteredMovies = useMemo(() => {
        let list = [...moviesList];

        if (genre) list = list.filter((m) => m.genre?.includes(genre));
        if (rating > 0) list = list.filter((m) => m.rating >= Number(rating));
        if (product) list = list.filter((m) => m.product?.includes(product));

        switch (sort) {
            case "newest":
                list.sort((a, b) => b.year - a.year);
                break;
            case "oldest":
                list.sort((a, b) => a.year - b.year);
                break;
            case "lowRating":
                list.sort((a, b) => a.rating - b.rating);
                break;
            case "highRating":
                list.sort((a, b) => b.rating - a.rating);
                break;
        }

        return list;
    }, [moviesList, genre, rating, sort, product]);


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
                    onChange={(e) => setProduct(e.target.value)}
                >
                    <option value="">محصول :</option>
                    <option value="IR">ایرانی</option>
                    <option value="IN">خارجی</option>
                </select>

                {/* ژانر */}
                <select
                    className="p-2 rounded-md border border-white/10 bg-white/5 text-sm text-gray-200 hover:bg-white/10 focus:outline-none focus:border-white/20 transition-all duration-200"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
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
                    onChange={(e) => setSort(e.target.value)}
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
                        onChange={(e) => setRating(e.target.value)}
                        className="accent-yellow-500 cursor-pointer w-32"
                    />
                    <div className="text-xs text-gray-400 mt-1">{rating}+</div>
                </div>
            </aside>


            {/* Main content */}
            <main className="flex-1 p-8">


                {/* Movies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filteredMovies.map((movie: Movie) => {

                        const isHovered = hoveredMovieId === movie.id;

                        return (
                            <div key={movie.id}>
                                <div
                                    onClick={() => {
                                        setSelectedMovie(movie);
                                        setIsModalOpen(true)
                                    }}
                                    onMouseEnter={() => setHoveredMovieId(movie.id)}
                                    onMouseLeave={() => setHoveredMovieId(null)}
                                    className="rounded-xl h-75 cursor-pointer w-53 shadow-lg lg:w-45 hover:scale-105
                                                   transition duration-300 bg-cover
                                                    bg-center flex items-end relative"

                                >
                                    <Image
                                        src={movie.poster}
                                        alt={movie.title}
                                        fill
                                        className="object-cover rounded-xl"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t
                                                   from-black/70 to-transparent rounded-xl flex justify-center bg-"
                                    >
                                        <h1 className="text-white font-bold text-lg">
                                            {movie.title}
                                        </h1>
                                    </div>
                                    {/* باکس توضیحات */}
                                    <div
                                        className={`
                      mt-15
                      bg-[#0f0f0f]
                      w-full h-75
                      p-2
                      items-start 
                      transition-all duration-500 ease-out
                      absolute bottom-0 left-0 right-0
                      
                      flex flex-col justify-between 
                      ${isHovered ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
                    `}
                                    >
                                        {/* متن توضیحات بالا */}
                                        <p className="text-gray-300 text-center text-sm my-3 item">
                                            {movie.description}
                                        </p>


                                        {/* بلاک امتیاز، سال، ژانر */}
                                        <div className="w-full flex flex-col items-center gap-3">
                                            <p className="text-yellow-400 mt-1 text-centerw-full ">
                                                {movie.rating} / 10 ⭐
                                            </p>
                                            <div className="flex flex-col border-t w-full border-gray-500 p-2">

                                                <div className="flex justify-between">
                                                    <p className="text-white text-right w-full ">
                                                        {movie.year}
                                                    </p>
                                                    <div className="flex  gap-1  mt-1">
                                                        {movie.genre.map((genre, i) => (
                                                            <p key={i} className="text-white text-xs text-right">
                                                                {genre}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>


                                                {/* بخش ژانرها */}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );

                    })}
                    {isModalOpen && selectedMovie && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                            onClick={() => setIsModalOpen(false)} // کلیک روی بک‌دراپ → بستن
                        >
                            {/* خود باکس مودال */}
                            <div
                                className="bg-[#0f0f0f] text-white rounded-2xl shadow-2xl 
                                  w-[90vw] max-w-5xl max-h-[90vh] 
                                 flex flex-col md:flex-row overflow-hidden p-10"
                                onClick={(e) => e.stopPropagation()}
                            >

                                <Link href={`/movies/${selectedMovie.id}`}>
                                    مشاهده فیلم
                                </Link>
                                {/* ستون چپ: پوستر */}

                                {/* ستون راست: اطلاعات فیلم */}
                                <div className="w-full md:w-1/2 p-5 flex flex-col gap-20">
                                    {/* دکمه بستن */}
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-gray-300  text-2xl leading-none cursor-pointer
                                             hover:text-[#14c78b] hover:scale-105 "
                                        >
                                            ×
                                        </button>
                                    </div>


                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {selectedMovie.description}
                                    </p>

                                    {/* امتیاز، سال، ژانرها */}
                                    <div className="flex flex-col border-t border-gray-700 pt-3  gap-10">
                                        <div className="flex items-center justify-between">
                                            <span className="text-yellow-400 font-semibold">
                                                {selectedMovie.rating} / 10 ⭐
                                            </span>
                                            <span className="text-gray-300">{selectedMovie.year}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {selectedMovie.genre.map((g, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-gray-800 px-2 py-1 rounded-full"
                                                >
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 border-t border-gray-700 pt-3">
                                        <p>مدت زمان: {selectedMovie.duration} دقیقه</p>
                                    </div>
                                    {/* هر دیتای اضافه‌ای که دوست داری */}
                                    {/* مثال: طول فیلم، کارگردان، ... اگه توی Movie داری */}
                                    {/* 
                                      <div className="text-sm text-gray-400">
                                      <p>مدت زمان: {selectedMovie.runtime} دقیقه</p>
                                      <p>کارگردان: {selectedMovie.director}</p>
                                      </div>
                                      */}
                                </div>

                                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                    <Image
                                        src={selectedMovie.poster}
                                        alt={selectedMovie.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>


                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
