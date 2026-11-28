"use client";

import type { Series } from "@/types/Series";
import { DetailModal } from "./DetailModal";

type SeriesModalProps = {
    series: Series | null;
    isOpen: boolean;
    onClose: () => void;
    favoriteHandler?: (id: string) => void;
    isFavorite?: boolean;
};

export const SeriesModal = ({ series, isOpen, onClose, favoriteHandler, isFavorite }: SeriesModalProps) => {
    if (!isOpen || !series) return null;

    return (
        <DetailModal
            kind="SERIES"
            title={series.title}
            poster={series.poster}
            year={series.year}
            rating={series.rating}
            genre={series.genre}
            description={series.description}
            watchHref={`/series/${series._id}`}
            watchLabel="تماشای سریال"
            isFavorite={isFavorite}
            onFavorite={favoriteHandler ? () => favoriteHandler(series._id) : undefined}
            onClose={onClose}
        />
    );
};