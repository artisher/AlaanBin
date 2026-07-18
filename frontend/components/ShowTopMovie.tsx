"use client"
import Image from "next/image";
import { useState } from "react";
import type { Movie } from "@/types/movies";
import Link from "next/link";
import { MovieCard } from "./MovieCard";
import { MovieModal } from "./MovieMedal";
type Props = {
    movies: Movie[];
};


export const ShowTopMovie = ({ movies }: Props) => {

  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex text-white flex-wrap gap-6 justify-center mt-10">
      {movies
        .filter((movie: Movie) => movie.topWeek)
        .map((movie: Movie, index: number) => (
          <div key={index}>
            <MovieCard

              movie={movie}
              onClick={() => {
                setSelectedMovie(movie);
                setIsModalOpen(true);
              }}
            /></div>

        ))}

      {isModalOpen && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}

        />
      )}
    </div>
  );
}