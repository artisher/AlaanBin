
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
        <section className="relative -mt-16 w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop={movies.length > 1}
                className="hero-swiper"
            >
                {movies.slice(0, 8).map((movie) => (
                    <SwiperSlide key={movie._id}>
                        <div
                            className="
                                relative isolate
                                h-[620px]
                                sm:h-[680px]
                                md:h-[min(760px,90svh)]
                                lg:h-[min(820px,92svh)]
                                xl:h-[min(900px,92svh)]
                                2xl:h-[min(1000px,95svh)]
                                min-h-[560px]
                                w-full overflow-hidden
                            "
                        >
                            {/* Hero Image */}
                            <img
                                src={movie.heroImage || movie.poster}
                                alt={movie.title}
                                className="
                                    absolute inset-0
                                    h-full w-full
                                    object-cover
                                    object-[50%_35%]
                                    sm:object-[50%_35%]
                                    lg:object-center
                                "
                            />

                            {/* Main Gradient */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-[#0B0F14]
                                    via-[#0B0F14]/35
                                    to-[#0B0F14]/10
                                "
                            />

                            {/* Side Gradient */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute inset-0
                                    bg-gradient-to-l
                                    from-[#0B0F14]/75
                                    via-transparent
                                    to-transparent
                                "
                            />

                            {/* Extra Mobile Gradient */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute inset-x-0 bottom-0
                                    h-[60%]
                                    bg-gradient-to-t
                                    from-[#0B0F14]
                                    via-[#0B0F14]/65
                                    to-transparent
                                    md:hidden
                                "
                            />

                            {/* Movie Content */}
                            <div
                                className="
                                    absolute z-10
                                    inset-x-5 bottom-36
                                    flex flex-col items-end gap-4
                                    sm:inset-x-8 sm:bottom-36
                                    md:inset-x-auto
                                    md:right-12 md:bottom-44
                                    md:max-w-[48%]
                                    lg:right-16 lg:bottom-44
                                    lg:max-w-[45%]
                                    xl:right-24 xl:max-w-[42%]
                                    2xl:right-32 2xl:max-w-[40%]
                                "
                            >
                                {/* Title */}
                                <h1
                                    className="
                                        w-full
                                        text-right
                                        text-3xl
                                        font-black
                                        leading-tight
                                        tracking-tight
                                        text-white
                                        drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]
                                        sm:text-4xl
                                        md:text-5xl
                                        lg:text-6xl
                                        2xl:text-7xl
                                        [overflow-wrap:anywhere]
                                    "
                                >
                                    {movie.title}
                                </h1>

                                {/* Metadata */}
                                <div
                                    className="
                                        flex w-full flex-wrap
                                        items-center justify-end
                                        gap-x-3 gap-y-2
                                        text-sm font-medium
                                        text-gray-200
                                        drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]
                                        sm:text-base
                                        lg:gap-x-4 lg:text-lg
                                    "
                                >
                                    <span>{movie.year}</span>

                                    <span className="text-white/40">
                                        •
                                    </span>

                                    <span className="max-w-[160px] truncate sm:max-w-[200px]">
                                        {movie.genre?.slice(0, 2).join("، ")}
                                    </span>

                                    <span className="text-white/40">
                                        •
                                    </span>

                                    <span className="flex items-center gap-1.5 font-bold text-yellow-400">
                                        <Star
                                            size={17}
                                            fill="currentColor"
                                            className="sm:h-[19px] sm:w-[19px]"
                                        />
                                        {movie.rating}
                                    </span>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => onMovieClick(movie)}
                                    className="
                                        mt-1 w-full
                                        rounded-xl
                                        bg-[#14C78B]
                                        px-6 py-3
                                        text-sm font-bold text-black
                                        shadow-[0_8px_30px_rgba(20,199,139,0.25)]
                                        transition-all duration-300
                                        hover:-translate-y-1
                                        hover:bg-[#18d995]
                                        hover:shadow-[0_12px_35px_rgba(20,199,139,0.4)]
                                        active:scale-[0.98]
                                        sm:w-auto sm:px-7 sm:py-3.5
                                        md:px-8 md:py-4 md:text-base
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
