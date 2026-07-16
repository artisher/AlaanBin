import { MovieCardSkeleton } from "./MovieCardSkeleton";

export const TopMovieSkeleton = () => {
    return (
        <div className="mt-10 flex flex-wrap justify-center gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
            ))}
        </div>
    );
};