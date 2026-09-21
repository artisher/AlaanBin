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
                        <div className="relative h-[650px] w-full md:h-[750px] lg:h-[850px]">

                            <img
                                src={movie.heroImage || movie.poster}
                                alt={movie.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            {/* Button */}
                            <div className="absolute bottom-16 right-8 z-10 md:right-16">
                                <button
                                    onClick={() => onMovieClick(movie)}
                                    className="
                                        rounded-lg
                                        bg-[#14C78B]
                                        px-6
                                        py-3
                                        text-sm
                                        font-bold
                                        text-black
                                        transition
                                        hover:scale-105
                                        hover:bg-[#18d995]
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