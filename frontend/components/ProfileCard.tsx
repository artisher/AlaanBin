
"use client";

import { useRouter } from "next/navigation";
import { House, LogOut } from "lucide-react";
import type { Movie } from "@/types/movies";
import ProfileRow from "./ProfileRow";
import { MovieModal } from "./MovieMedal";
import { MovieCard } from "./MovieCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Profile {
    _id: string;
    fullName: string;
    phoneNumber: number;
    email: string;
    country: string;
    city: string;
    subscriptionExpireDate: string;
    hasActiveSubscription: boolean;
}

interface UserFavorites {
    favoriteMovies?: Movie[];
}

export const ProfileCard = ({
    userProfile,
    userFavorites,
}: {
    userProfile: Profile;
    userFavorites: UserFavorites;
}) => {
    const profile = userProfile;
    const favoritesMovie = userFavorites?.favoriteMovies ?? [];

    const router = useRouter();

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [loadingFavorites, setLoadingFavorites] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const fetchFavorites = async () => {
        try {
            setLoadingFavorites(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`,
                {
                    credentials: "include",
                }
            );

            let data: { message?: string; favoriteMovies?: Movie[] } = {};

            try {
                data = await res.json();
            } catch {
                // پاسخ API JSON نبود.
            }

            if (!res.ok) {
                throw new Error(
                    data.message ||
                        "خطا در دریافت فیلم‌های مورد علاقه."
                );
            }

            const movies = Array.isArray(data.favoriteMovies)
                ? data.favoriteMovies
                : [];

            setFavoriteIds(
                movies.map((movie: Movie) => movie._id)
            );
        } catch (error) {
            console.error("FETCH FAVORITES ERROR:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خطا در دریافت فیلم‌های مورد علاقه."
            );
        } finally {
            setLoadingFavorites(false);
        }
    };

    const favoriteHandler = async (id: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${id}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            let data: { message?: string } = {};

            try {
                data = await res.json();
            } catch {
                // پاسخ API JSON نبود.
            }

            if (!res.ok) {
                throw new Error(
                    data.message ||
                        "خطا در تغییر وضعیت علاقه‌مندی."
                );
            }

            setFavoriteIds((prev) =>
                prev.includes(id)
                    ? prev.filter((x) => x !== id)
                    : [...prev, id]
            );

            toast.success(
                favoriteIds.includes(id)
                    ? "از علاقه‌مندی‌ها حذف شد."
                    : "به علاقه‌مندی‌ها اضافه شد."
            );
        } catch (error) {
            console.error("FAVORITE ERROR:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خطا در تغییر علاقه‌مندی."
            );
        }
    };

    const homeHandler = () => {
        router.push("/home");
    };

    const logoutHandler = async () => {
        try {
            setLoggingOut(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            let data: { message?: string } = {};

            try {
                data = await res.json();
            } catch {
                // پاسخ API JSON نبود.
            }

            if (!res.ok) {
                throw new Error(
                    data.message ||
                        "خطا در خروج از حساب."
                );
            }

            toast.success("با موفقیت از حساب خارج شدید.");

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("LOGOUT ERROR:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خروج از حساب با خطا مواجه شد."
            );
        } finally {
            setLoggingOut(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#090909] via-[#111315] to-[#0b0b0b] py-10 px-5">
            <div
                className="
                max-w-5xl
                mx-auto
                rounded-3xl
                border
                border-[#14c78b]/20
                bg-white/[0.03]
                backdrop-blur-xl
                shadow-[0_0_40px_rgba(20,199,139,.12)]
                overflow-hidden
                "
            >
                {/* Header */}

                <div className="flex flex-col md:flex-row items-center justify-between gap-5 p-8 border-b border-[#14c78b]/10">
                    <button
                        onClick={homeHandler}
                        className="
                        flex items-center gap-2
                        rounded-xl
                        border border-[#14c78b]/30
                        bg-[#14c78b]/10
                        px-5 py-3
                        text-[#14c78b]
                        transition-all
                        duration-300
                        hover:bg-[#14c78b]
                        hover:text-black
                        hover:shadow-[0_0_20px_rgba(20,199,139,.35)]
                        cursor-pointer
                        "
                    >
                        <House size={18} />
                        خانه
                    </button>

                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">
                            {profile.fullName}
                        </h1>

                        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#14c78b]" />
                    </div>

                    <button
                        onClick={logoutHandler}
                        disabled={loggingOut}
                        className="
                        flex items-center gap-2
                        rounded-xl
                        border border-red-500/30
                        bg-red-500/10
                        px-5 py-3
                        text-red-400
                        transition-all
                        duration-300
                        hover:bg-red-500
                        hover:text-white
                        cursor-pointer
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        "
                    >
                        <LogOut size={18} />

                        {loggingOut ? "در حال خروج..." : "خروج"}
                    </button>
                </div>

                {/* Body */}

                <div className="p-8 space-y-4">
                    <ProfileRow
                        label="نام و نام خانوادگی"
                        value={profile.fullName}
                    />

                    <ProfileRow
                        label="ایمیل"
                        value={profile.email}
                    />

                    <ProfileRow
                        label="شماره موبایل"
                        value={profile.phoneNumber}
                    />

                    <ProfileRow
                        label="کشور"
                        value={profile.country}
                    />

                    <ProfileRow
                        label="شهر"
                        value={profile.city}
                    />

                    {/* Subscription */}

                    <div
                        className="
                        rounded-2xl
                        border
                        border-white/5
                        bg-white/[0.03]
                        p-5
                        "
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400">
                                وضعیت اشتراک
                            </span>

                            {profile.hasActiveSubscription ? (
                                <span className="rounded-full bg-[#14c78b]/10 border border-[#14c78b]/30 px-4 py-1 text-[#14c78b] font-semibold">
                                    فعال
                                </span>
                            ) : (
                                <span className="rounded-full bg-red-500/10 border border-red-500/30 px-4 py-1 text-red-400 font-semibold">
                                    منقضی شده
                                </span>
                            )}
                        </div>

                        <div className="text-gray-300">
                            {profile.hasActiveSubscription
                                ? `تاریخ پایان اشتراک : ${
                                      profile.subscriptionExpireDate
                                          ? profile.subscriptionExpireDate.split("T")[0]
                                          : "نامشخص"
                                  }`
                                : "اشتراک شما به پایان رسیده است."}
                        </div>
                    </div>

                    {/* Favorites */}

                    <div
                        className="
                        rounded-2xl
                        border
                        border-white/5
                        bg-white/[0.03]
                        p-5
                        "
                    >
                        <h3 className="text-lg font-semibold text-white mb-5">
                            فیلم‌های مورد علاقه
                        </h3>

                        {loadingFavorites ? (
                            <div className="text-center py-8 text-gray-500">
                                در حال دریافت فیلم‌های مورد علاقه...
                            </div>
                        ) : favoritesMovie.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favoritesMovie.map(
                                    (movie: Movie) => (
                                        <MovieCard
                                            key={movie._id}
                                            movie={movie}
                                            onClick={() => {
                                                setSelectedMovie(movie);
                                                setIsModalOpen(true);
                                            }}
                                            favoriteHandler={
                                                favoriteHandler
                                            }
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <span className="text-gray-500">
                                هنوز فیلمی به علاقه‌مندی‌ها اضافه نشده.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isFavorite={favoriteIds.includes(
                        selectedMovie._id
                    )}
                    favoriteHandler={favoriteHandler}
                />
            )}
        </div>
    );
};

export default ProfileCard;

