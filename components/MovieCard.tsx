"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
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
                h-64
                w-44
                overflow-hidden
                rounded-xl
                cursor-pointer
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(20,199,139,0.25)]
            "
        >
            {/* Poster */}
            <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                "
            />

            {/* Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-black/0
                    transition-all
                    duration-300
                    group-hover:bg-black/50
                "
            >
                <button
                    className="
                        opacity-0
                        group-hover:opacity-100
                        translate-y-5
                        group-hover:translate-y-0
                        transition-all
                        duration-300
                        bg-[#14c78b]
                        hover:bg-[#10b37c]
                        text-black
                        font-semibold
                        px-5
                        py-2
                        rounded-lg
                        flex
                        items-center
                        gap-2
                        shadow-lg
                        cursor-pointer
                    "
                >
                    <Play size={18} color='white' fill='white' />
                    Watch
                </button>
            </div>

            {/* Rating */}
            <div
                className="
                    absolute
                    top-3
                    right-3
                    bg-black/70
                    backdrop-blur-md
                    px-3
                    py-1
                    rounded-full
                    text-[#14c78b]
                    text-sm
                    font-semibold
                "
            >
                ⭐ {movie.rating}
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
                    from-black
                    via-black/80
                    to-transparent
                "
            >
                <h2 className="text-white font-bold truncate">
                    {movie.title}
                </h2>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-300 text-sm">
                        {movie.year}
                    </span>

                    <div className="flex gap-1">
                        {movie.genre.slice(0, 2).map((genre, index) => (
                            <span
                                key={index}
                                className="
                                    bg-[#14c78b]/20
                                    border
                                    border-[#14c78b]/40
                                    text-[#14c78b]
                                    text-[10px]
                                    px-2
                                    py-1
                                    rounded-full
                                "
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};