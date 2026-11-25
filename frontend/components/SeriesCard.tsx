"use client";

import type { Series } from "@/types/Series";
import { PosterCard } from "./PosterCard";

interface SeriesCardProps {
  series: Series;
  onClick: () => void;
}

export const SeriesCard = ({ series, onClick }: SeriesCardProps) => {
  return (
    <PosterCard
      title={series.title}
      poster={series.poster}
      year={series.year}
      rating={series.rating}
      genre={series.genre}
      badge="سریال"
      onClick={onClick}
    />
  );
};