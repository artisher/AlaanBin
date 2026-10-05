
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
                modules={[Autoplay, EffectFade, Pagination]}
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
                {movies.slice(0, 8).map((movie) => (
                    <SwiperSlide key={movie._id}>
                        <div
                            className="
                                relative
                                h-[540px]
                                w-full
                                sm:h-[620px]
                                md:h-[750px]
                                lg:h-[850px]
                            "
                        >
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
                                    object-center
                                    sm:object-center
                                    md:object-center
                                "
                            />

                            {/* Main Gradient */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#0B0F14]
                                    via-[#0B0F14]/25
                                    to-transparent
                                "
                            />

                            {/* Extra Mobile Gradient */}
                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    h-[55%]
                                    bg-gradient-to-t
                                    from-[#0B0F14]
                                    via-[#0B0F14]/70
                                    to-transparent
                                    md:hidden
                                "
                            />

                            {/* Movie Content */}
                            <div
                                className="
                                    absolute
                                    bottom-10
                                    left-5
                                    right-5
                                    z-10
                                    flex
                                    flex-col
                                    items-end
                                    gap-3
                                    sm:bottom-12
                                    sm:left-8
                                    sm:right-8
                                    md:bottom-20
                                    md:left-auto
                                    md:right-16
                                    md:gap-5
                                    lg:right-24
                                "
                            >
                                {/* Title */}
                                <h1
                                    className="
                                        w-full
                                        max-w-[700px]
                                        text-right
                                        text-3xl
                                        font-black
                                        leading-[1.15]
                                        tracking-tight
                                        text-white
                                        drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]
                                        sm:text-4xl
                                        md:text-6xl
                                        lg:text-7xl
                                    "
                                >
                                    {movie.title}
                                </h1>

                                {/* Metadata */}
                                <div
                                    className="
                                        flex
                                        w-full
                                        flex-wrap
                                        items-center
                                        justify-end
                                        gap-x-3
                                        gap-y-1.5
                                        text-sm
                                        font-medium
                                        text-gray-200
                                        drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]
                                        sm:text-base
                                        md:w-auto
                                        md:gap-4
                                        md:text-lg
                                    "
                                >
                                    <span>
                                        {movie.year}
                                    </span>

                                    <span className="text-white/40">
                                        •
                                    </span>

                                    <span className="max-w-[180px] truncate">
                                        {movie.genre
                                            ?.slice(0, 2)
                                            .join("، ")}
                                    </span>

                                    <span className="text-white/40">
                                        •
                                    </span>

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
                                            size={17}
                                            fill="currentColor"
                                            className="sm:h-[19px] sm:w-[19px]"
                                        />

                                        {movie.rating}
                                    </span>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() =>
                                        onMovieClick(movie)
                                    }
                                    className="
                                        mt-1
                                        w-full
                                        rounded-xl
                                        bg-[#14C78B]
                                        px-6
                                        py-3
                                        text-sm
                                        font-bold
                                        text-black
                                        shadow-[0_8px_30px_rgba(20,199,139,0.25)]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:bg-[#18d995]
                                        hover:shadow-[0_12px_35px_rgba(20,199,139,0.4)]
                                        active:scale-[0.98]
                                        sm:w-auto
                                        sm:px-7
                                        sm:py-3.5
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
