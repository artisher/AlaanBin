import type { Series } from "@/types/Series";

interface SeriesCardProps {
  series: Series;
  onClick: () => void;
}

export const SeriesCard = ({
  series,
  onClick,
}: SeriesCardProps) => {
  const posterUrl = series.poster
    ? series.poster.startsWith("http")
      ? series.poster
      : `${process.env.NEXT_PUBLIC_API_URL}${series.poster}`
    : "/Images/placeholder-poster.png";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full text-right"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#111827]">
        <img
          src={posterUrl}
          alt={series.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-2 line-clamp-1 text-sm font-medium text-white">
        {series.title}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {series.year} • ⭐ {series.rating}
      </p>
    </button>
  );
};