import { Calendar, Clock3, Film, Heart, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/types/movies";
type MovieModalProps = {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
    favoriteHandler?: (id: string) => void;
    isFavorite?: boolean;
};

export const MovieModal = ({
    movie,
    isOpen,
    onClose,
    favoriteHandler,
    isFavorite,
}: MovieModalProps) => {

    if (!isOpen || !movie) return null;

    return (
        <div
            onClick={onClose}
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/80 backdrop-blur-md
            p-5
            "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                relative
                w-full
                max-w-6xl
                overflow-hidden
                rounded-3xl
                border border-[#14c78b]/20
                bg-[#0f141b]
                shadow-[0_0_60px_rgba(20,199,139,.15)]
                grid
                md:grid-cols-[380px_1fr]
                "
            >

                {/* پوستر */}

                <div className="relative h-[260px] md:h-[650px]">

                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    <Link
                        href={`/movies/${movie._id}`}
                        className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        group
                        "
                    >
                        <div
                            className="
                            h-20
                            w-20
                            rounded-full
                            bg-[#14c78b]
                            text-black
                            flex
                            items-center
                            justify-center
                            scale-90
                            group-hover:scale-100
                            transition
                            shadow-[0_0_30px_rgba(20,199,139,.45)]
                            "
                        >
                            <Play size={34} fill="currentColor" />
                        </div>
                    </Link>

                </div>

                {/* اطلاعات */}

                <div className="p-8 flex flex-col">

                    {/* Header */}

                    <div className="flex justify-between items-start gap-4">

                        <div>

                            <h1 className="text-4xl font-bold text-white">
                                {movie.title}
                            </h1>

                            <div className="mt-3 h-1 w-24 rounded-full bg-[#14c78b]" />

                        </div>

                        <div className="flex gap-2">

                            <button
                                onClick={() => favoriteHandler?.(movie._id)}
                                className="
                                w-11 h-11
                                rounded-xl
                                bg-white/5
                                flex items-center justify-center
                                hover:bg-[#14c78b]
                                hover:text-black
                                transition
                                cursor-pointer
                                "
                            >
                                <Heart
                                    fill={isFavorite ? "currentColor" : "none"}
                                    className="w-5 h-5"
                                />
                            </button>

                            <button
                                onClick={onClose}
                                className="
                                w-11 h-11
                                rounded-xl
                                bg-white/5
                                hover:bg-red-500
                                transition
                                text-xl
                                cursor-pointer
                                "
                            >
                                ×
                            </button>

                        </div>

                    </div>

                    {/* اطلاعات کوتاه */}

                    <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4">

                        <div className="rounded-xl bg-[#111827] border border-white/10 p-4">

                            <Star
                                className="text-yellow-400 mb-2"
                                size={20}
                                fill="currentColor"
                            />

                            <p className="text-sm text-gray-400">
                                امتیاز
                            </p>

                            <h3 className="font-bold text-xl">
                                {movie.rating}/10
                            </h3>

                        </div>

                        <div className="rounded-xl bg-[#111827] border border-white/10 p-4">

                            <Calendar
                                className="text-[#14c78b] mb-2"
                                size={20}
                            />

                            <p className="text-sm text-gray-400">
                                سال ساخت
                            </p>

                            <h3 className="font-bold text-xl">
                                {movie.year}
                            </h3>

                        </div>

                        <div className="rounded-xl bg-[#111827] border border-white/10 p-4">

                            <Clock3
                                className="text-[#14c78b] mb-2"
                                size={20}
                            />

                            <p className="text-sm text-gray-400">
                                مدت زمان
                            </p>

                            <h3 className="font-bold text-xl">
                                {movie.duration} دقیقه
                            </h3>

                        </div>

                        <div className="rounded-xl bg-[#111827] border border-white/10 p-4">

                            <Film
                                className="text-[#14c78b] mb-2"
                                size={20}
                            />

                            <p className="text-sm text-gray-400">
                                ژانر
                            </p>

                            <h3 className="font-bold">
                                {movie.genre[0]}
                            </h3>

                        </div>

                    </div>

                    {/* توضیحات */}

                    <div className="mt-8">

                        <h3 className="text-xl font-semibold mb-4">
                            خلاصه داستان
                        </h3>

                        <p className="text-gray-300 leading-9">
                            {movie.description}
                        </p>

                    </div>

                    {/* ژانرها */}

                    <div className="mt-8">

                        <h3 className="font-semibold mb-4">
                            ژانرها
                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {movie.genre.map((item, index) => (

                                <span
                                    key={index}
                                    className="
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-[#14c78b]/10
                                    border border-[#14c78b]/20
                                    text-[#14c78b]
                                    text-sm
                                    "
                                >
                                    {item}
                                </span>

                            ))}

                        </div>

                    </div>

                    {/* دکمه */}

                    <Link
                        href={`/movies/${movie._id}`}
                        className="
                        mt-10
                        h-14
                        rounded-xl
                        bg-[#14c78b]
                        text-black
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-3
                        hover:scale-[1.02]
                        hover:shadow-[0_0_30px_rgba(20,199,139,.45)]
                        transition
                        "
                    >
                        <Play size={22} fill="currentColor" />
                        مشاهده فیلم
                    </Link>

                </div>

            </div>
        </div>
    );
};