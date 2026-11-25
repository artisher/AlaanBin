"use client";

import type { Movie } from "@/types/movies";
import { PosterCard } from "./PosterCard";

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
    favoriteHandler?: (id: string) => void;
};

export function MovieCard({ movie, onClick }: MovieCardProps) {
    return (
        <PosterCard
            title={movie.title}
            poster={movie.poster}
            year={movie.year}
            rating={movie.rating}
            genre={movie.genre}
            onClick={onClick}
        />
    );
}