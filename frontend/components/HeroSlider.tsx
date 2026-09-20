"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import type { Movie } from "@/types/movies";

interface HeroSliderProps {
    movies: Movie[];
    onMovieClick: (movie: Movie) => void;
}

export const HeroSlider = ({
    movies,
    onMovieClick,
}: HeroSliderProps) => {
    if (!movies.length) return null;

    return (
        <section className="relative w-full overflow-hidden">
            <Swiper
                modules={[
                    Autoplay,
                    EffectFade,
                    Pagination,
                ]}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={movies.length > 1}
                className="hero-swiper"
            >
                {movies.slice(0, 5).map((movie) => (
                    <SwiperSlide key={movie._id}>
                        <div className="relative h-[560px] w-full md:h-[620px] lg:h-[680px]">

                            {/* Background */}
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                    object-center
                                    scale-105
                                "
                            />

                            {/* Dark overlays */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-black/35
                                "
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-r
                                    from-[#0B0F14]
                                    via-[#0B0F14]/80
                                    to-transparent
                                "
                            />

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#0B0F14]
                                    via-[#0B0F14]/20
                                    to-transparent
                                "
                            />

                            {/* Content */}
                            <div
                                className="
                                    relative
                                    z-10
                                    mx-auto
                                    flex
                                    h-full
                                    w-full
                                    max-w-[1650px]
                                    items-center
                                    px-6
                                    lg:px-10
                                "
                            >
                                <div className="max-w-xl pt-10">

                                    {/* Title */}
                                    <h1
                                        className="
                                            text-4xl
                                            font-black
                                            leading-tight
                                            text-white
                                            md:text-5xl
                                            lg:text-6xl
                                        "
                                    >
                                        {movie.title}
                                    </h1>

                                    {/* Description */}
                                    {movie.description && (
                                        <p
                                            className="
                                                mt-5
                                                line-clamp-3
                                                text-sm
                                                leading-7
                                                text-gray-300
                                                md:text-base
                                            "
                                        >
                                            {movie.description}
                                        </p>
                                    )}

                                    {/* Meta */}
                                    <div
                                        className="
                                            mt-5
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-3
                                            text-sm
                                            text-gray-300
                                        "
                                    >
                                        {movie.rating > 0 && (
                                            <span>
                                                ⭐ {movie.rating}
                                            </span>
                                        )}

                                        {movie.year && (
                                            <span>
                                                {movie.year}
                                            </span>
                                        )}

                                        {movie.duration && (
                                            <span>
                                                {movie.duration} دقیقه
                                            </span>
                                        )}

                                        {movie.genre?.length > 0 && (
                                            <span>
                                                {movie.genre
                                                    .slice(0, 2)
                                                    .join("، ")}
                                            </span>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-7 flex flex-wrap gap-3">

                                        <button
                                            onClick={() =>
                                                onMovieClick(movie)
                                            }
                                            className="
                                                rounded-xl
                                                bg-[#14c78b]
                                                px-6
                                                py-3
                                                font-bold
                                                text-black
                                                transition
                                                hover:bg-[#19dc9b]
                                                active:scale-95
                                            "
                                        >
                                            ▶ تماشا
                                        </button>

                                        <button
                                            onClick={() =>
                                                onMovieClick(movie)
                                            }
                                            className="
                                                rounded-xl
                                                bg-white/10
                                                px-6
                                                py-3
                                                font-semibold
                                                text-white
                                                backdrop-blur-md
                                                transition
                                                hover:bg-white/20
                                                active:scale-95
                                            "
                                        >
                                            جزئیات
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};