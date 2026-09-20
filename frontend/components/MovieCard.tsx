"use client";

import { Play, Star } from "lucide-react";
import type { Movie } from "@/types/movies";

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
    favoriteHandler?: (id: string) => void;
};

export function MovieCard({
    movie,
    onClick,
    favoriteHandler,
}: MovieCardProps) {

    const posterUrl = movie.poster.startsWith("http")
        ? movie.poster
        : `https://alanbin.com${movie.poster}`;

    return (
        <div className="group w-[155px] sm:w-[170px] md:w-[185px] lg:w-[205px] xl:w-[215px]">

            {/* ================= Poster Card ================= */}

            <div
                onClick={onClick}
                className="
                    relative

                    w-full
                    h-[250px]

                    sm:h-[275px]
                    md:h-[300px]
                    lg:h-[330px]
                    xl:h-[345px]

                    overflow-hidden
                    rounded-2xl

                    bg-[#191d24]
                    border
                    border-white/10

                    cursor-pointer

                    transition-all
                    duration-500

                    hover:-translate-y-2
                    hover:border-[#14c78b]
                    hover:shadow-[0_0_35px_rgba(20,199,139,.18)]
                "
            >

                {/* Poster */}

                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="
                        absolute
                        inset-0

                        w-full
                        h-full

                        object-cover

                        transition-transform
                        duration-700

                        group-hover:scale-110
                    "
                />

                {/* Dark Overlay */}

                <div
                    className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-black/95
                        via-black/35
                        to-transparent

                        opacity-0
                        group-hover:opacity-100

                        transition-opacity
                        duration-500
                    "
                />

                {/* ================= Rating ================= */}

                <div
                    className="
                        absolute

                        top-3
                        right-3

                        flex
                        items-center
                        gap-1

                        rounded-full

                        bg-[#07130f]/90
                        backdrop-blur-xl

                        border
                        border-[#14c78b]/25

                        px-3
                        py-1

                        opacity-0
                        translate-y-2

                        group-hover:opacity-100
                        group-hover:translate-y-0

                        transition-all
                        duration-500
                    "
                >

                    <span
                        className="
                            text-[#14c78b]
                            font-bold
                            text-sm
                        "
                    >
                        {movie.rating}
                    </span>

                    <Star
                        size={14}
                        fill="#14c78b"
                        className="text-[#14c78b]"
                    />

                </div>

                {/* ================= Play Button ================= */}

                <div
                    className="
                        absolute
                        inset-0

                        flex
                        items-center
                        justify-center

                        opacity-0
                        group-hover:opacity-100

                        transition-all
                        duration-500
                    "
                >

                    <div
                        className="
                            w-16
                            h-16

                            rounded-full

                            bg-[#14c78b]

                            flex
                            items-center
                            justify-center

                            shadow-[0_0_30px_rgba(20,199,139,.45)]

                            scale-75
                            group-hover:scale-100

                            transition-all
                            duration-500
                        "
                    >

                        <Play
                            size={26}
                            fill="white"
                            className="text-white ml-1"
                        />

                    </div>

                </div>

                {/* ================= Genres ================= */}

                {/* ================= Genres + Release Year ================= */}

                <div
                    className="
        absolute
        bottom-4
        left-4
        right-4

        flex
        items-center
        justify-between
        gap-2

        opacity-0
        translate-y-3

        group-hover:opacity-100
        group-hover:translate-y-0

        transition-all
        duration-500
    "
                >

                    {/* Genres */}

                    <div className="flex flex-wrap gap-2">

                        {movie.genre
                            .slice(0, 2)
                            .map((genre, index) => (
                                <span
                                    key={index}
                                    className="
                        rounded-full

                        border
                        border-[#14c78b]/30

                        bg-[#14c78b]/10

                        px-2.5
                        py-1

                        text-[10px]
                        font-medium

                        text-[#14c78b]

                        whitespace-nowrap
                    "
                                >
                                    {genre}
                                </span>
                            ))}

                    </div>

                    {/* Release Year */}

                    <span
                        className="
            rounded-full

            border
            border-white/15

            bg-black/50
            backdrop-blur-md

            px-2.5
            py-1

            text-[10px]
            font-medium

            text-gray-300

            whitespace-nowrap
        "
                    >
                        {movie.year}
                    </span>

                </div>

            </div>

            {/* ================= Outside Card Info ================= */}

            <div className="mt-3 px-1">

                <h2
                    className="
                        text-white
                        font-bold

                        text-sm
                        sm:text-base

                        truncate
                    "
                >
                    {movie.title}
                </h2>



            </div>

        </div>
    );
}