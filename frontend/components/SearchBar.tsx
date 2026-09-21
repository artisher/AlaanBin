
"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Star } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Movie } from "@/types/movies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchBar = ({
    isOpen,
    onClose,
}: SearchBarProps) => {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    // --------------------------------
    // Search
    // --------------------------------

    useEffect(() => {
        if (!isOpen || !search.trim()) {
            setMovies([]);
            return;
        }

        const controller = new AbortController();

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams({
                    search: search.trim(),
                    limit: "6",
                    page: "1",
                });

                const res = await fetch(
                    `${ API_URL } /api/movies ? ${ params.toString() } `,
                    {
                        credentials: "include",
                        signal: controller.signal,
                    }
                );

                if (!res.ok) {
                    throw new Error("Search failed");
                }

                const data = await res.json();

                setMovies(data.movies || []);

            } catch (error: any) {
                if (error?.name !== "AbortError") {
                    console.error("Search error:", error);
                    setMovies([]);
                }
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [search, isOpen]);

    // --------------------------------
    // Close when clicking outside
    // --------------------------------

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                closeSearch();
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [isOpen]);

    // --------------------------------
    // Close
    // --------------------------------

    const closeSearch = () => {
        setSearch("");
        setMovies([]);
        onClose();
    };

    // --------------------------------
    // Movie click
    // --------------------------------

    const movieHandler = (id: string) => {
        closeSearch();

        router.push(`/ movies / ${ id } `);
    };

    // --------------------------------
    // View all
    // --------------------------------

    const viewAllHandler = () => {
        const query = search.trim();

        if (!query) return;

        closeSearch();

        router.push(
            `/ movies ? search = ${ encodeURIComponent(query) } `
        );
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={searchRef}
            className="relative"
        >

            {/* Search box */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    w-[320px]
                    h-11
                    px-3
                    rounded-xl
                    bg-[#111820]
                    border
                    border-white/10
                    focus-within:border-[#14c78b]/50
                "
            >

                <Search
                    size={19}
                    className="text-gray-400 shrink-0"
                />

                <input
                    autoFocus
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="جستجوی فیلم..."
                    className="
                        w-full
                        bg-transparent
                        outline-none
                        text-white
                        text-sm
                        placeholder:text-gray-500
                    "
                />

                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="
                            text-gray-500
                            hover:text-white
                            transition
                            cursor-pointer
                        "
                        aria-label="پاک کردن"
                    >
                        <X size={17} />
                    </button>
                )}

                <button
                    onClick={closeSearch}
                    className="
                        text-gray-500
                        hover:text-white
                        transition
                        cursor-pointer
                    "
                    aria-label="بستن جستجو"
                >
                    <X size={18} />
                </button>

            </div>

            {/* Results */}

            {search.trim() && (
                <div
                    className="
                        absolute
                        top-[52px]
                        right-0
                        w-[360px]
                        overflow-hidden
                        rounded-2xl
                        bg-[#111820]
                        border
                        border-white/10
                        shadow-2xl
                        z-[9999]
                    "
                >

                    {loading ? (

                        <div
                            className="
                                px-5
                                py-6
                                text-center
                                text-sm
                                text-gray-400
                            "
                        >
                            در حال جستجو...
                        </div>

                    ) : movies.length === 0 ? (

                        <div
                            className="
                                px-5
                                py-6
                                text-center
                                text-sm
                                text-gray-400
                            "
                        >
                            فیلمی پیدا نشد
                        </div>

                    ) : (

                        <div>

                            {/* Movies */}

                            <div className="p-2">

                                {movies.map((movie) => {

                                    const posterUrl =
                                        movie.poster?.startsWith("http")
                                            ? movie.poster
                                            : `${ API_URL }${ movie.poster } `;

                                    return (
                                        <button
                                            key={movie._id}
                                            onClick={() =>
                                                movieHandler(movie._id)
                                            }
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                p-2
                                                rounded-xl
                                                text-right
                                                hover:bg-white/5
                                                transition
                                                cursor-pointer
                                            "
                                        >

                                            {/* Poster */}

                                            <img
                                                src={posterUrl}
                                                alt={movie.title}
                                                className="
                                                    w-11
                                                    h-14
                                                    rounded-lg
                                                    object-cover
                                                    shrink-0
                                                "
                                            />

                                            {/* Info */}

                                            <div className="min-w-0 flex-1">

                                                <p
                                                    className="
                                                        text-sm
                                                        font-medium
                                                        text-white
                                                        truncate
                                                    "
                                                >
                                                    {movie.title}
                                                </p>

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        mt-1
                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >

                                                    {movie.year && (
                                                        <span>
                                                            {movie.year}
                                                        </span>
                                                    )}

                                                    {movie.rating != null && (
                                                        <>
                                                            <span>
                                                                •
                                                            </span>

                                                            <span
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-1
                                                                "
                                                            >
                                                                <Star
                                                                    size={12}
                                                                    className="text-yellow-400"
                                                                />

                                                                {movie.rating}
                                                            </span>
                                                        </>
                                                    )}

                                                </div>

                                            </div>

                                        </button>
                                    );
                                })}

                            </div>

                            {/* View all */}

                            <button
                                onClick={viewAllHandler}
                                className="
                                    w-full
                                    border-t
                                    border-white/10
                                    px-4
                                    py-3
                                    text-sm
                                    text-[#14c78b]
                                    hover:bg-[#14c78b]/10
                                    transition
                                    cursor-pointer
                                "
                            >
                                مشاهده همه نتایج
                            </button>

                        </div>

                    )}

                </div>
            )}

        </div>
    );
};

