"use client"
import Image from "next/image";
import { useState } from "react";
import type { Movie } from "@/types/movies";
import Link from "next/link";

export const ShowTopMovie = ({ movies }: Movie) => {

  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-10">
      {movies
        .filter((movie: Movie) => movie.topWeek)
        .map((movie: Movie) => (
          <div key={movie.id}>
            <div
              onClick={() => {
                setSelectedMovie(movie);
                setIsModalOpen(true);
              }}
              onMouseEnter={() => setHoveredMovieId(movie.id)}
              onMouseLeave={() => setHoveredMovieId(null)}
              className="rounded-xl h-75 cursor-pointer w-53 shadow-lg lg:w-45 hover:scale-105 transition duration-300 bg-cover bg-center flex items-end relative"
            >
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover rounded-xl"
              />

              <div
                className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent rounded-xl flex justify-center"
              >
                <h1 className="text-white font-bold text-lg">
                  {movie.title}
                </h1>
              </div>

              <div
                className={`
                mt-15
                bg-[#0f0f0f]
                w-full
                h-75
                p-2
                items-start
                transition-all
                duration-500
                ease-out
                absolute
                bottom-0
                left-0
                right-0
                flex
                flex-col
                justify-between
                ${hoveredMovieId === movie.id
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                  }
              `}
              >
                <p className="text-gray-300 text-center text-sm my-3">
                  {movie.description}
                </p>

                <div className="w-full flex flex-col items-center gap-3">
                  <p className="text-yellow-400 mt-1 text-center w-full">
                    {movie.rating} / 10 ⭐
                  </p>

                  <div className="flex flex-col border-t w-full border-gray-500 p-2">
                    <div className="flex justify-between">
                      <p className="text-white text-right w-full">
                        {movie.year}
                      </p>

                      <div className="flex gap-1 mt-1">
                        {movie.genre.map((genre, i) => (
                          <p
                            key={i}
                            className="text-white text-xs text-right"
                          >
                            {genre}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      {isModalOpen && selectedMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#0f0f0f] text-white rounded-2xl shadow-2xl
          w-[90vw] max-w-5xl max-h-[90vh]
          flex flex-col md:flex-row overflow-hidden p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 p-5 flex flex-col gap-20">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {selectedMovie.title}
                </h2>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-300 text-2xl leading-none cursor-pointer hover:text-[#14c78b] hover:scale-105"
                >
                  ×
                </button>
              </div>

              <Link href={`/movies/${selectedMovie.id}`}>
                مشاهده فیلم
              </Link>

              <p className="text-sm text-gray-300 leading-relaxed">
                {selectedMovie.description}
              </p>

              <div className="flex flex-col border-t border-gray-700 pt-3 gap-10">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-semibold">
                    {selectedMovie.rating} / 10 ⭐
                  </span>

                  <span className="text-gray-300">
                    {selectedMovie.year}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  {selectedMovie.genre.map((g, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-800 px-2 py-1 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-gray-700 pt-3">
                <p>
                  مدت زمان: {selectedMovie.duration} دقیقه
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}