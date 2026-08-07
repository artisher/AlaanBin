"use client";

import Image from "next/image";
import { Play, Star, X } from "lucide-react";
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
    return (

        <div
            onClick={onClick}
            className="
            group
            relative

            w-[155px]
            h-[250px]

            sm:w-[170px]
            sm:h-[275px]

            md:w-[185px]
            md:h-[300px]

            lg:w-[205px]
            lg:h-[330px]

            xl:w-[215px]
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

            <Image
                src={movie.poster}
                alt={movie.title}
                fill
                sizes="(max-width:768px) 155px, 215px"
                className="
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
                bg-black/10
                group-hover:bg-black/35
                transition-all
                duration-500
                "
            />

            {/* Rating */}

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

            {/* Play Button */}

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
                        className="border-white ml-1"
                    />

                </div>

            </div>
            {/* Bottom */}

            <div
                className="
                absolute
                bottom-0
                left-0
                right-0

                p-4

                bg-gradient-to-t
                from-[#05070a]
                via-[#05070ad9]
                to-transparent
                "
            >

                {/* Title */}

                <h2
                    className="
                    text-white
                    font-bold

                    text-sm
                    sm:text-base

                    line-clamp-1
                    "
                >
                    {movie.title}
                </h2>

                {/* Year */}

                <p
                    className="
                    mt-1
                    text-xs
                    text-gray-400
                    "
                >
                    {movie.year}
                </p>

                {/* Genres */}

                <div
                    className="
                    mt-3

                    flex
                    flex-wrap

                    gap-2
                    "
                >

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

            </div>

        </div>

    );

}
