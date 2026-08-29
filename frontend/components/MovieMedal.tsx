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
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-md
            p-3
            sm:p-5
        "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                relative
                flex
                w-full
                max-w-6xl
                max-h-[94vh]
                flex-col
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                border
                border-[#14c78b]/20
                bg-[#0f141b]
                shadow-[0_0_60px_rgba(20,199,139,.15)]
                md:grid
                md:grid-cols-[320px_1fr]
                lg:grid-cols-[380px_1fr]
            "
            >

                {/* =========================
                Poster
            ========================= */}

                <div
                    className="
                    relative
                    h-[220px]
                    shrink-0
                    sm:h-[280px]
                    md:h-[650px]
                    lg:h-[680px]
                "
                >

                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 768px) 100vw,
                        380px
                    "
                    />

                    {/* Poster overlay */}

                    <div
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-black/10
                        to-transparent
                    "
                    />

                    {/* Play */}

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
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-[#14c78b]
                            text-black
                            shadow-[0_0_30px_rgba(20,199,139,.45)]
                            transition
                            duration-300
                            group-hover:scale-110
                            sm:h-20
                            sm:w-20
                        "
                        >
                            <Play
                                size={28}
                                fill="currentColor"
                                className="sm:h-[34px] sm:w-[34px]"
                            />
                        </div>
                    </Link>

                </div>


                {/* =========================
                Information
            ========================= */}

                <div
                    className="
                    min-h-0
                    overflow-y-auto
                    p-5
                    sm:p-7
                    lg:p-8
                "
                >

                    {/* Header */}

                    <div
                        className="
                        flex
                        items-start
                        justify-between
                        gap-3
                    "
                    >

                        <div className="min-w-0 flex-1">

                            <h1
                                className="
                                text-2xl
                                font-bold
                                leading-tight
                                text-white
                                break-words
                                sm:text-3xl
                                lg:text-4xl
                            "
                            >
                                {movie.title}
                            </h1>

                            <div
                                className="
                                mt-3
                                h-1
                                w-20
                                rounded-full
                                bg-[#14c78b]
                                sm:w-24
                            "
                            />

                        </div>


                        {/* Buttons */}

                        <div
                            className="
                            flex
                            shrink-0
                            gap-2
                        "
                        >

                            <button
                                onClick={() => favoriteHandler?.(movie._id)}
                                aria-label="افزودن به علاقه‌مندی‌ها"
                                className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-white/5
                                text-white
                                transition
                                hover:bg-[#14c78b]
                                hover:text-black
                                cursor-pointer
                                sm:h-11
                                sm:w-11
                            "
                            >
                                <Heart
                                    fill={isFavorite ? "currentColor" : "none"}
                                    className="h-5 w-5"
                                />
                            </button>


                            <button
                                onClick={onClose}
                                aria-label="بستن"
                                className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-white/5
                                text-lg
                                text-white
                                transition
                                hover:bg-red-500
                                cursor-pointer
                                sm:h-11
                                sm:w-11
                            "
                            >
                                ×
                            </button>

                        </div>

                    </div>


                    {/* =========================
                    Short Information
                ========================= */}

                    <div
                        className="
                        mt-6
                        grid
                        grid-cols-2
                        gap-3
                        sm:gap-4
                        md:grid-cols-2
                        lg:grid-cols-4
                    "
                    >

                        {/* Rating */}

                        <div
                            className="
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111827]
                            p-3
                            sm:p-4
                        "
                        >

                            <Star
                                className="mb-2 h-5 w-5 text-yellow-400"
                                fill="currentColor"
                            />

                            <p className="text-xs text-gray-400 sm:text-sm">
                                امتیاز
                            </p>

                            <h3 className="mt-1 text-lg font-bold sm:text-xl">
                                {movie.rating}/10
                            </h3>

                        </div>


                        {/* Year */}

                        <div
                            className="
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111827]
                            p-3
                            sm:p-4
                        "
                        >

                            <Calendar
                                className="mb-2 h-5 w-5 text-[#14c78b]"
                            />

                            <p className="text-xs text-gray-400 sm:text-sm">
                                سال ساخت
                            </p>

                            <h3 className="mt-1 text-lg font-bold sm:text-xl">
                                {movie.year}
                            </h3>

                        </div>


                        {/* Duration */}

                        <div
                            className="
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111827]
                            p-3
                            sm:p-4
                        "
                        >

                            <Clock3
                                className="mb-2 h-5 w-5 text-[#14c78b]"
                            />

                            <p className="text-xs text-gray-400 sm:text-sm">
                                مدت زمان
                            </p>

                            <h3
                                className="
                                mt-1
                                text-base
                                font-bold
                                sm:text-xl
                            "
                            >
                                {movie.duration} دقیقه
                            </h3>

                        </div>


                        {/* Genre */}

                        <div
                            className="
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111827]
                            p-3
                            sm:p-4
                        "
                        >

                            <Film
                                className="mb-2 h-5 w-5 text-[#14c78b]"
                            />

                            <p className="text-xs text-gray-400 sm:text-sm">
                                ژانر
                            </p>

                            <h3
                                className="
                                mt-1
                                truncate
                                text-base
                                font-bold
                                sm:text-xl
                            "
                            >
                                {movie.genre[0]}
                            </h3>

                        </div>

                    </div>


                    {/* =========================
                    Description
                ========================= */}

                    <div className="mt-7 sm:mt-8">

                        <h3
                            className="
                            text-lg
                            font-semibold
                            text-white
                            sm:text-xl
                        "
                        >
                            خلاصه داستان
                        </h3>

                        <div
                            className="
                            mt-3
                            h-1
                            w-14
                            rounded-full
                            bg-[#14c78b]
                        "
                        />

                        <p
                            className="
                            mt-4
                            text-sm
                            leading-8
                            text-gray-300
                            sm:text-base
                            sm:leading-9
                        "
                        >
                            {movie.description}
                        </p>

                    </div>


                    {/* =========================
                    Genres
                ========================= */}

                    <div className="mt-7 sm:mt-8">

                        <h3 className="font-semibold text-white">
                            ژانرها
                        </h3>

                        <div
                            className="
                            mt-3
                            h-1
                            w-14
                            rounded-full
                            bg-[#14c78b]
                        "
                        />

                        <div
                            className="
                            mt-4
                            flex
                            flex-wrap
                            gap-2
                            sm:gap-3
                        "
                        >

                            {movie.genre.map((item, index) => (

                                <span
                                    key={index}
                                    className="
                                    rounded-full
                                    border
                                    border-[#14c78b]/20
                                    bg-[#14c78b]/10
                                    px-3
                                    py-1.5
                                    text-xs
                                    text-[#14c78b]
                                    sm:px-4
                                    sm:py-2
                                    sm:text-sm
                                "
                                >
                                    {item}
                                </span>

                            ))}

                        </div>

                    </div>


                    {/* =========================
                    Watch Button
                ========================= */}

                    <Link
                        href={`/movies/${movie._id}`}
                        className="
                        mt-8
                        flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        bg-[#14c78b]
                        text-sm
                        font-bold
                        text-black
                        transition
                        hover:scale-[1.01]
                        hover:shadow-[0_0_30px_rgba(20,199,139,.45)]
                        sm:mt-10
                        sm:h-14
                        sm:text-base
                    "
                    >
                        <Play
                            size={20}
                            fill="currentColor"
                        />

                        مشاهده فیلم

                    </Link>

                </div>

            </div>
        </div>
    );
};