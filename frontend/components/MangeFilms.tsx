'use client';
import { useState } from "react";
import { EditMovieModal } from "./EditMovieModal";
import { CreateMovieModal } from "./CreateMovieModal";
import type { Movie } from "@/types/movies";

interface ManageMovieProps {
    moviesList: Movie[];
}
export const MangeFilms = ({ moviesList }: ManageMovieProps) => {

    const [movies, setMovies] = useState<Movie[]>(moviesList ?? []);

    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [addMovie, setAddMovie] = useState<boolean | null>(false);

    const handleCloseModal = () => {
        setEditingMovie(null);
    };
    const handleCloseUserModal = () => {
        setAddMovie(null);
    };
    const handleSaveEdit = (updatedMovie: Movie) => {
        setMovies(movies.map(movie => (movie._id === updatedMovie._id ? updatedMovie : movie)));
        alert('تغییرات کاربر با موفقیت ذخیره شد (فقط در نمایش محلی).');
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
                        alert('خطا در حذف فیلم');
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert('مشکلی پیش آمد.');
                });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">مدیریت فیلم‌ها</h2>
                <button
                    onClick={() => setAddMovie(true)}

                    className="bg-primary text-dark px-4 py-2 rounded font-bold hover:bg-green-400 transition"
                >
                    + افزودن فیلم
                </button>
            </div>

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
                onSave={handleSaveEdit} />
        </div>
    )
}
