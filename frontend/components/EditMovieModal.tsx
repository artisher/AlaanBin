import type { Movie } from "@/types/movies";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EditMovieModalProps {
    isOpen: boolean;
    movie: Movie | null;
    onClose: () => void;
    onSave: (updatedMovie: Movie) => void;
}

const GENRE_OPTIONS = [
    "اکشن",
    "کمدی",
    "درام",
    "عاشقانه",
    "ترسناک",
    "جنایی",
    "هیجان‌انگیز",
    "علمی تخیلی",
    "ماجراجویی",
    "فانتزی",
    "تاریخی",
    "خانوادگی",
    "مستند",
    "موزیکال",
    "ورزشی",
];

const updateMovieOnServer = async (
    movieId: string,
    movieData: Movie
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/movies/${movieId}`,
        {
            credentials: "include",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            errorData.message || "خطا در بروزرسانی اطلاعات"
        );
    }

    return await response.json();
};

export const EditMovieModal: React.FC<EditMovieModalProps> = ({
    isOpen,
    movie,
    onClose,
    onSave,
}) => {
    const [editedMovie, setEditedMovie] = useState<Movie | null>(movie);

    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        if (movie) {
            setEditedMovie({
                ...movie,
                genre: Array.isArray(movie.genre)
                    ? movie.genre
                    : [],
            });
        }
    }, [movie]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setEditedMovie((prev) => {
            if (!prev) return prev;

            let newValue: string | number | boolean = value;

            if (name === "topWeek") {
                newValue = value === "true";
            }

            if (name === "rating") {
                newValue = Number(value);
            }

            if (name === "duration") {
                newValue = Number(value);
            }

            if (name === "year") {
                newValue = Number(value);
            }

            return {
                ...prev,
                [name]: newValue,
            };
        });
    };

    const addGenre = () => {
        if (!selectedGenre) return;

        setEditedMovie((prev) => {
            if (!prev) return prev;

            if (prev.genre.includes(selectedGenre)) {
                return prev;
            }

            return {
                ...prev,
                genre: [...prev.genre, selectedGenre],
            };
        });

        setSelectedGenre("");
    };

    const removeGenre = (genreToRemove: string) => {
        setEditedMovie((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                genre: prev.genre.filter(
                    (genre) => genre !== genreToRemove
                ),
            };
        });
    };

    const handleSave = async () => {
        if (!editedMovie) {
            toast.error("فیلم پیدا نشد.");
            return;
        }

        try {
            const updatedData = await updateMovieOnServer(
                editedMovie._id,
                editedMovie
            );

            onSave(updatedData);
            toast.success("اطلاعات فیلم با موفقیت بروزرسانی شد.");
            onClose();

        } catch (error) {
            console.error("Update movie error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خطا در بروزرسانی فیلم"
            );
        }
    };

    if (!isOpen || !editedMovie) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 p-8 rounded-lg w-[90%] max-w-3xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-6 text-white">
                    ویرایش فیلم: {editedMovie.title}
                </h2>

                <div className="space-y-5 flex flex-wrap gap-6 justify-center">

                    {/* نام فیلم */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            نام فیلم
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedMovie.title}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />
                    </div>

                    {/* توضیحات */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            توضیحات
                        </label>

                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={editedMovie.description}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />
                    </div>

                    {/* امتیاز */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            امتیاز
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            id="rating"
                            name="rating"
                            value={editedMovie.rating}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />
                    </div>

                    {/* مدت فیلم */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            مدت فیلم
                        </label>

                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                min="1"
                                value={editedMovie.duration}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                            />

                            <span className="text-gray-400 whitespace-nowrap">
                                دقیقه
                            </span>
                        </div>
                    </div>

                    {/* عکس */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="poster"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            عکس
                        </label>

                        <input
                            type="text"
                            id="poster"
                            name="poster"
                            value={editedMovie.poster}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />
                    </div>

                    {/* Video URL */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="videoUrl"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            آدرس ویدیو
                        </label>

                        <input
                            type="text"
                            id="videoUrl"
                            name="videoUrl"
                            value={editedMovie.videoUrl}
                            onChange={handleChange}
                            placeholder="/videos/movie.mp4"
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />
                    </div>

                    {/* ژانر */}
                    <div className="w-full sm:w-75">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            ژانر
                        </label>

                        {/* ژانرهای انتخاب شده */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {editedMovie.genre.map((genre) => (
                                <span
                                    key={genre}
                                    className="flex items-center gap-2 bg-[#14c78b]/20 text-[#14c78b] border border-[#14c78b]/40 px-3 py-1 rounded-full text-sm"
                                >
                                    {genre}

                                    <button
                                        type="button"
                                        onClick={() => removeGenre(genre)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* انتخاب ژانر */}
                        <div className="flex gap-2">
                            <select
                                value={selectedGenre}
                                onChange={(e) =>
                                    setSelectedGenre(e.target.value)
                                }
                                className="flex-1 rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                            >
                                <option value="">
                                    انتخاب ژانر
                                </option>

                                {GENRE_OPTIONS
                                    .filter(
                                        (genre) =>
                                            !editedMovie.genre.includes(
                                                genre
                                            )
                                    )
                                    .map((genre) => (
                                        <option
                                            key={genre}
                                            value={genre}
                                        >
                                            {genre}
                                        </option>
                                    ))}
                            </select>

                            <button
                                type="button"
                                onClick={addGenre}
                                disabled={!selectedGenre}
                                className="px-4 py-2 bg-[#14c78b] text-dark rounded-md font-bold disabled:opacity-40"
                            >
                                افزودن
                            </button>
                        </div>
                    </div>

                    {/* محصول */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="product"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            محصول
                        </label>

                        <select
                            id="product"
                            name="product"
                            value={editedMovie.product}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        >
                            <option value="ایرانی">ایرانی</option>
                            <option value="خارجی">خارجی</option>
                        </select>
                    </div>

                    {/* برتر هفته */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="topWeek"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            برتر هفته
                        </label>

                        <select
                            id="topWeek"
                            name="topWeek"
                            value={editedMovie.topWeek ? "true" : "false"}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        >
                            <option value="true">هست</option>
                            <option value="false">نیست</option>
                        </select>
                    </div>

                    {/* سال ساخت */}
                    <div className="w-full sm:w-75">
                        <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            سال ساخت
                        </label>

                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={editedMovie.year}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 text-white p-2"
                        />
                    </div>
                </div>

                {/* دکمه‌ها */}
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        لغو
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#14c78b] rounded-md text-sm font-medium text-white hover:bg-[#12b07a]"
                    >
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
        </div>
    );
};

