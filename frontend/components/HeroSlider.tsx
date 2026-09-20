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
                        <div className="relative h-[660px] w-full md:h-[720px] lg:h-[800px]">
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
                "
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};