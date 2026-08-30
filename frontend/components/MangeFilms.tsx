'use client';
import { useState } from "react";
import { EditMovieModal } from "./EditMovieModal";
import { CreateMovieModal } from "./CreateMovieModal";
import type { Movie } from "@/types/movies";
import toast from "react-hot-toast";

interface ManageMovieProps {
    moviesList: Movie[];
}
export const MangeFilms = ({ moviesList }: ManageMovieProps) => {

    const [movies, setMovies] = useState<Movie[]>(moviesList ?? []);

    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [addMovie, setAddMovie] = useState<boolean | null>(false);
    const [storageMovies, setStorageMovies] = useState<
        { filename: string; imported: boolean }[]
    >([]);

    const [isScanningStorage, setIsScanningStorage] = useState(false);
    const [storageFilename, setStorageFilename] = useState<string | null>(null);


    const handleScanStorage = async () => {
        try {
            setIsScanningStorage(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/storage/movies`,
                {
                    credentials: "include",
                    cache: "no-store",
                }
            );

            if (!res.ok) {
                throw new Error("خطا در بررسی Storage");
            }

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || "خطا در بررسی Storage");
            }

            setStorageMovies(
                data.movies.filter(
                    (movie: { filename: string; imported: boolean }) =>
                        !movie.imported
                )
            );

            toast.success(
                `${data.newFiles} فیلم جدید در Storage پیدا شد`
            );

        } catch (error) {
            console.error("Storage scan error:", error);
            toast.error("خطا در بررسی Storage");
        } finally {
            setIsScanningStorage(false);
        }
    };
    const handleCloseModal = () => {
        setEditingMovie(null);
    };
    const handleCloseUserModal = () => {
        setAddMovie(null);
        setStorageFilename(null);
    };
    const handleSaveEdit = (updatedMovie: Movie) => {
        setMovies(movies.map(movie => (movie._id === updatedMovie._id ? updatedMovie : movie)));
        toast.success("Successfully Edited.");
        setEditingMovie(null);
    };


    const handleEdit = (id: string) => {

        const movieToEdit = movies.find(m => m._id === id);

        if (movieToEdit) {

            setEditingMovie(movieToEdit);
        } else {
            console.error('فیلم با این ID پیدا نشد!');
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('آیا از حذف این فیلم مطمئن هستید؟')) {

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/movies/${id}`, {
                credentials: "include",
                method: 'DELETE',
            })
                .then(res => {
                    if (res.ok) {
                        setMovies(prev => prev.filter(movie => movie._id !== id));
                    } else {

                        toast.error("An error occurred while deleting the Film.");
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    toast.error("An error occurred. Check the console.");
                });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                    مدیریت فیلم‌ها
                </h2>

                <div className="flex gap-3">
                    <button
                        onClick={handleScanStorage}
                        disabled={isScanningStorage}
                        className="bg-gray-700 text-white px-4 py-2 rounded font-bold hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isScanningStorage ? "در حال بررسی..." : "🔄 بررسی Storage"}
                    </button>

                    <button
                        onClick={() => setAddMovie(true)}
                        className="bg-primary text-dark px-4 py-2 rounded font-bold hover:bg-green-400 transition"
                    >
                        + افزودن فیلم
                    </button>
                </div>
            </div>
            {storageMovies.length > 0 && (
                <div className="bg-card border border-yellow-600/30 rounded-lg p-5 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">
                            🆕 فیلم‌های موجود در Storage
                        </h3>

                        <span className="text-sm text-yellow-400">
                            {storageMovies.length} فیلم جدید
                        </span>
                    </div>

                    <div className="space-y-3">
                        {storageMovies.map((movie) => (
                            <div
                                key={movie.filename}
                                className="flex items-center justify-between bg-gray-900/50 border border-gray-700 rounded-lg p-3"
                            >
                                <div>
                                    <p className="text-white font-semibold">
                                        {movie.filename}
                                    </p>

                                    <p className="text-gray-400 text-sm">
                                        هنوز وارد سایت نشده
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setStorageFilename(movie.filename);
                                        setAddMovie(true);
                                    }}
                                    className="bg-primary text-dark px-4 py-2 rounded font-bold hover:bg-green-400 transition"
                                >
                                    وارد کردن
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <div key={movie._id} className="bg-card p-4 rounded-lg shadow border border-gray-700">
                        <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-gray-400 hover:text-white text-sm"
                                onClick={() => handleEdit(movie._id)}
                            >ویرایش</button>

                            <button
                                onClick={() => handleDelete(movie._id)}
                                className="text-red-400 cursor-pointer hover:text-red-300 text-sm font-semibold transition duration-150 ease-in-out"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <EditMovieModal
                isOpen={!!editingMovie}
                movie={editingMovie}
                onClose={handleCloseModal}
                onSave={handleSaveEdit}
            />
            <CreateMovieModal
                isOpen={!!addMovie}
                onClose={handleCloseUserModal}
                movie={null}
                onSave={handleSaveEdit}
                storageFilename={storageFilename}
            />
        </div>
    )
}
