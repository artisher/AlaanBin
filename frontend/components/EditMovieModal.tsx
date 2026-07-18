import type { Movie } from "@/types/movies";
import { useEffect, useState } from "react";

interface EditMovieModalProps {
    isOpen: boolean;
    movie: Movie | null;
    onClose: () => void;
    onSave: (updatedUser: Movie) => void;
}
const updateMovieOnServer = async (movieId: string, movieData: Movie) => {
    try {
        const response = await fetch(`http://localhost:5000/api/admin/movies/${movieId}`, {
            credentials: "include",
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(movieData)
        })
        console.log(response.status);
        console.log(await response.clone().text());
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "خطا در بروزرسانی اطلاعات ")
        }
        return await response.json()
    } catch (error) {
        console.error(`Error updating user :`, error)
    }
}
export const EditMovieModal: React.FC<EditMovieModalProps> = ({ isOpen, movie, onClose, onSave }) => {
    const [editedMovie, setEditedMovie] = useState<Movie | null>(movie);


    useEffect(() => {
        if (movie) {
            setEditedMovie(movie)
        }
    }, [movie])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;


        setEditedMovie((prev) => {
            if (!prev) return prev;
            return { ...prev, [name]: value }
        })
    };
    const handleSave = async () => {
        if (!editedMovie) {
            alert("اطلاعات فیلم یافت نشد");
            return;
        }

        try {
            const updatedData = await updateMovieOnServer(
                editedMovie._id,
                editedMovie
            );

            console.log("اطلاعات ذخیره شد:", updatedData);
            onSave(updatedData);
            onClose();
        } catch (error: any) {
            alert(error.message || "خطای ناشناخته");
        }
    };
    if (!isOpen || !editedMovie) return null
    return (
        <div className="fixed inset-0 bg-blacke/60 flex justify-center items-center z-50 "
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 p-8 rounded-lg w-[90%] max-w-3xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">
                    ×
                </button>
                <h2 className="text-xl font-bold mb-6 text-white">
                    ویرایش فیلم: {editedMovie.title}
                </h2>
                <div className="space-y-5 flex flex-wrap gap-6 justify-center">
                    {/* نام کامل */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">نام فیلم</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedMovie.title}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    {/* توضیحات */}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">توضیحات</label>
                        <input
                            type="description"
                            id="description"
                            name="description"
                            value={editedMovie.description}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    {/* امتیاز*/}
                    <div className='w-full sm:w-75'>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">امتیاز</label>
                        <input
                            type="text"
                            id="rating"
                            name="rating"
                            value={editedMovie.rating}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>


                    <div className='w-full sm:w-75'>
                        <label htmlFor="poster" className="block text-sm font-medium text-gray-300 mb-1">عکس</label>
                        <input
                            type="text"
                            id="poster"
                            name="poster"
                            value={editedMovie.poster}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>


                    <div className='w-full sm:w-75'>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">ژانز</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={editedMovie.genre}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>

                    <div className='w-full sm:w-75'>
                        <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-1">محصول</label>
                        <select
                            id="product"
                            name="product"
                            value={editedMovie.product}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="ایرانی">ایرانی</option>
                            <option value="خارجی">خارجی</option>
                        </select>
                    </div>


                    <div className='w-full sm:w-75'>
                        <label className="block text-sm font-medium text-gray-300 mb-1">برتر هفته</label>
                        <select
                            id="topWeek"
                            name="topWeek"
                            value={editedMovie.topWeek ? "true" : "false"}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        >
                            <option value="true">هست</option>
                            <option value="false">نیست</option>
                        </select>
                    </div>


                    <div className='w-full sm:w-75'>
                        <label className="block text-sm font-medium text-gray-300 mb-1">سال ساخت</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={editedMovie.year}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#14c78b] focus:ring-[#14c78b] sm:text-sm p-2"
                        />
                    </div>
                </div>
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        لغو
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#14c78b] rounded-md text-sm font-medium text-white hover:bg-[#12b07a] focus:outline-none focus:ring-2 focus:ring-[#14c78b] focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
        </div>
    )
}
