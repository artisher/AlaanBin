import { Film, Heart, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MovieModalProps = {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
    favoriteHandler?: (id: string) => void;
    isFavorite?: boolean;
}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-5"
            onClick={() => onClose()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
            relative
            overflow-hidden
            rounded-3xl
            border border-[#14c78b]/20
            bg-gradient-to-br from-[#0f1115] via-[#16181d] to-[#111315]
            shadow-[0_0_50px_rgba(20,199,139,0.15)]
            w-[90vw]
            max-w-6xl
            max-h-[90vh]
            flex flex-col-reverse md:flex-row
            "
            >
                {/* اطلاعات فیلم */}
                <div className="w-full md:w-1/2 p-8 flex flex-col gap-8">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#14c78b]/20 pb-5">
                        <div>
                            <h2 className="text-3xl font-bold tracking-wide text-primary">
                                {movie.title}
                            </h2>

                            <div className="mt-2 h-1 w-20 rounded-full bg-[#14c78b]" />
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={() => favoriteHandler(movie._id)}>
                                <Heart
                                    className="
            w-10
            h-10
            p-2
            rounded-full
            transition-all
            duration-300
            cursor-pointer
            hover:scale-110
            hover:bg-[#14c78b]
            hover:text-black
            text-gray-400
        "
                                    fill={isFavorite ? "currentColor" : "none"}
                                />
                            </button>
                            <button
                                onClick={() => onClose()}
                                className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white/5
                        text-2xl
                        text-gray-400
                        transition-all
                        duration-300
                        hover:bg-[#14c78b]
                        hover:text-black
                        hover:rotate-90
                        cursor-pointer
                        "
                            >
                                ×
                            </button>
                        </div>

                    </div>

                    {/* توضیحات */}
                    <p className="text-[15px] leading-8 text-gray-300">
                        {movie.description}
                    </p>

                    {/* امتیاز و سال */}
                    <div className="flex items-center justify-between border-t border-[#14c78b]/10 pt-5">
                        <span
                            className="
                        rounded-full
                        border
                        border-[#14c78b]/30
                        bg-[#14c78b]/10
                        px-4
                        py-2
                        font-semibold
                        text-[#14c78b]
                        "
                        >
                            ⭐ {movie.rating} / 10
                        </span>

                        <span className="text-gray-400">
                            {movie.year}
                        </span>
                    </div>

                    {/* ژانر */}
                    <div className="flex flex-wrap gap-3">
                        {movie.genre.map((g, i) => (
                            <span
                                key={i}
                                className="
                            rounded-full
                            border
                            border-[#14c78b]/25
                            bg-[#14c78b]/10
                            px-3
                            py-1
                            text-sm
                            text-[#14c78b]
                            "
                            >
                                {g}
                            </span>
                        ))}
                    </div>

                    {/* مدت زمان */}
                    <div className="border-t border-[#14c78b]/10 pt-5 text-gray-300">
                        ⏳ مدت زمان: {movie.duration} دقیقه
                    </div>

                    {/* دکمه مشاهده */}
                    <Link
                        href={`/movies/${movie._id}`}
                        className="
                    group
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#14c78b]
                    px-6
                    py-3
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:shadow-[0_0_30px_rgba(20,199,139,0.45)]
                    "
                    >
                        <Film size={20} />
                        مشاهده فیلم
                    </Link>
                </div>

                {/* پوستر */}
                <div className="relative group w-full md:w-1/2 h-[260px] md:h-auto overflow-hidden">
                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-105
                    "
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Overlay */}
                    <Link href={`/movies/${movie._id}`}>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">

                            <div
                                className="
                            flex
                            h-20
                            w-20
                            scale-75
                            items-center
                            justify-center
                            rounded-full
                            bg-[#14c78b]
                            text-black
                            opacity-0
                            shadow-[0_0_35px_rgba(20,199,139,0.55)]
                            transition-all
                            duration-300
                            group-hover:scale-100
                            group-hover:opacity-100
                            "
                            >
                                <Play size={34} fill="currentColor" />
                            </div>

                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}