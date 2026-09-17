import Image from "next/image";
import type { Series } from "@/types/Series";

interface SeriesCardProps {
  series: Series;
  onClick: () => void;
}

export const SeriesCard = ({
  series,
  onClick,
}: SeriesCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#111827]">
        <Image
          src={series.poster}
          alt={series.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-2 text-sm font-medium text-white">
        {series.title}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {series.year} • ⭐ {series.rating}
      </p>
    </div>
  );
};