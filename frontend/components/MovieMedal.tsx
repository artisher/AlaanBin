"use client";

import type { Movie } from "@/types/movies";
import { DetailModal } from "./DetailModal";

type MovieModalProps = {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
    favoriteHandler?: (id: string) => void;
    isFavorite?: boolean;
};

export const MovieModal = ({ movie, isOpen, onClose, favoriteHandler, isFavorite }: MovieModalProps) => {
    if (!isOpen || !movie) return null;

    return (
        <DetailModal
            title={movie.title}
            poster={movie.poster}
            year={movie.year}
            rating={movie.rating}
            duration={movie.duration}
            genre={movie.genre}
            description={movie.description}
            watchHref={`/movies/${movie._id}`}
            watchLabel="مشاهده فیلم"
            isFavorite={isFavorite}
            onFavorite={favoriteHandler ? () => favoriteHandler(movie._id) : undefined}
            onClose={onClose}
        />
    );
};