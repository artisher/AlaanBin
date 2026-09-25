"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Star } from "lucide-react";

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
                        <div className="relative h-[650px] w-full md:h-[750px] lg:h-[850px]">

                            {/* Hero Image */}
                            <img
                                src={movie.heroImage || movie.poster}
                                alt={movie.title}
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />

                            {/* Bottom Gradient */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#0B0F14]
                                    via-black/20
                                    to-transparent
                                "
                            />

                            {/* Movie Info + Button */}
                            <div
                                className="
        absolute
        bottom-46
        right-8
        z-10
        flex
        flex-col
        items-end
        gap-5
        md:right-16
        lg:right-24
    "
                            >
                                {/* Movie Title */}
                                <h1
                                    className="
            max-w-[700px]
            text-right
            text-4xl
            font-black
            tracking-tight
            text-white
            drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
        "
                                >
                                    {movie.title}
                                </h1>

                                {/* Movie Metadata */}
                                <div
                                    className="
            flex
            items-center
            gap-4
            text-base
            font-medium
            text-gray-200
            drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]
            md:text-lg
        "
                                >
                                    {/* Year */}
                                    <span>
                                        {movie.year}
                                    </span>

                                    <span className="text-white/40">
                                        •
                                    </span>

                                    {/* Genre */}
                                    <span>
                                        {movie.genre?.slice(0, 2).join("، ")}
                                    </span>

                                    <span className="text-white/40">
                                        •
                                    </span>

                                    {/* Rating */}
                                    <span
                                        className="
                flex
                items-center
                gap-1.5
                font-bold
                text-yellow-400
            "
                                    >
                                        <Star
                                            size={19}
                                            fill="currentColor"
                                        />

                                        {movie.rating}
                                    </span>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => onMovieClick(movie)}
                                    className="
            mt-1
            rounded-xl
            bg-[#14C78B]
            px-7
            py-3.5
            text-sm
            font-bold
            text-black
            shadow-[0_8px_30px_rgba(20,199,139,0.25)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#18d995]
            hover:shadow-[0_12px_35px_rgba(20,199,139,0.4)]
            md:px-8
            md:py-4
            md:text-base
        "
                                >
                                    اطلاعات بیشتر
                                </button>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};