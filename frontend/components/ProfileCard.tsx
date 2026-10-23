
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { House, LogOut, Heart } from "lucide-react";
import toast from "react-hot-toast";

import type { Movie } from "@/types/movies";
import type { Series } from "@/types/Series";

import ProfileRow from "./ProfileRow";
import { MovieModal } from "./MovieMedal";
import { MovieCard } from "./MovieCard";
import { SeriesCard } from "./SeriesCard";
import { SeriesModal } from "./SeriesModal";

import { useAuth } from "@/app/providers/AuthProvider";

interface Profile {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    country: string;
    city: string;
    subscriptionExpireDate: string;
    hasActiveSubscription: boolean;
}

type FavoriteMovie = Movie & {
    contentType: "movie";
};

type FavoriteSeries = Series & {
    contentType: "series";
};

type FavoriteItem = FavoriteMovie | FavoriteSeries;

interface UserFavorites {
    favorites: FavoriteItem[];
}

export const ProfileCard = ({
    userProfile,
    userFavorites,
}: {
    userProfile: Profile;
    userFavorites: UserFavorites;
}) => {
    const router = useRouter();
    const { logout } = useAuth();

    const [favorites, setFavorites] = useState<FavoriteItem[]>(
        userFavorites?.favorites ?? []
    );

    const [selectedMovie, setSelectedMovie] =
        useState<Movie | null>(null);

    const [selectedSeries, setSelectedSeries] =
        useState<Series | null>(null);

    const [isMovieModalOpen, setIsMovieModalOpen] =
        useState(false);

    const [isSeriesModalOpen, setIsSeriesModalOpen] =
        useState(false);

    const [loadingFavorites, setLoadingFavorites] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [pendingFavorite, setPendingFavorite] = useState<string | null>(null);

    useEffect(() => {
        setFavorites(userFavorites?.favorites ?? []);
    }, [userFavorites]);

    const fetchFavorites = async () => {
        try {
            setLoadingFavorites(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`,
                {
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در دریافت علاقه‌مندی‌ها"
                );
            }

            if (!Array.isArray(data.favorites)) {
                throw new Error("ساختار پاسخ علاقه‌مندی‌ها نامعتبر است");
            }

            setFavorites(data.favorites);
        } catch (error) {
            console.error("FETCH FAVORITES ERROR:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خطا در دریافت علاقه‌مندی‌ها"
            );
        } finally {
            setLoadingFavorites(false);
        }
    };

    const favoriteHandler = async (
        id: string,
        contentType: "movie" | "series"
    ) => {
        const key = `${contentType}:${id}`;

        if (pendingFavorite === key) return;

        try {
            setPendingFavorite(key);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${contentType}/${id}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در تغییر علاقه‌مندی"
                );
            }

            await fetchFavorites();
            router.refresh();

            toast.success("علاقه‌مندی به‌روزرسانی شد");
        } catch (error) {
            console.error("FAVORITE ERROR:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خطا در تغییر علاقه‌مندی"
            );
        } finally {
            setPendingFavorite(null);
        }
    };

    const logoutHandler = async () => {
        try {
            setLoggingOut(true);
            await logout();
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("LOGOUT ERROR:", error);
            toast.error("خروج انجام نشد");
        } finally {
            setLoggingOut(false);
        }
    };

    const closeModals = () => {
        setIsMovieModalOpen(false);
        setIsSeriesModalOpen(false);
        setSelectedMovie(null);
        setSelectedSeries(null);
    };

    const isFavorite = (
        id: string,
        contentType: "movie" | "series"
    ) =>
        favorites.some(
            (item) =>
                item._id === id &&
                item.contentType === contentType
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#090909] via-[#111315] to-[#0b0b0b] px-5 py-10">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#14c78b]/20 bg-white/[0.03] shadow-[0_0_40px_rgba(20,199,139,.12)] backdrop-blur-xl">

                {/* Header */}
                <div className="flex flex-col items-center justify-between gap-5 border-b border-[#14c78b]/10 p-8 md:flex-row">
                    <button
                        onClick={() => router.push("/home")}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#14c78b]/30 bg-[#14c78b]/10 px-5 py-3 text-[#14c78b] transition hover:bg-[#14c78b] hover:text-black"
                    >
                        <House size={18} />
                        خانه
                    </button>

                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">
                            {userProfile.fullName}
                        </h1>
                        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#14c78b]" />
                    </div>

                    <button
                        onClick={logoutHandler}
                        disabled={loggingOut}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                    >
                        <LogOut size={18} />
                        {loggingOut ? "در حال خروج..." : "خروج"}
                    </button>
                </div>

                {/* Profile */}
                <div className="space-y-4 p-8">
                    <ProfileRow
                        label="نام و نام خانوادگی"
                        value={userProfile.fullName}
                    />

                    <ProfileRow
                        label="ایمیل"
                        value={userProfile.email}
                    />

                    <ProfileRow
                        label="شماره موبایل"
                        value={userProfile.phoneNumber}
                    />

                    <ProfileRow
                        label="کشور"
                        value={userProfile.country}
                    />

                    <ProfileRow
                        label="شهر"
                        value={userProfile.city}
                    />

                    {/* Subscription */}
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-gray-400">
                                وضعیت اشتراک
                            </span>

                            <span
                                className={
                                    userProfile.hasActiveSubscription
                                        ? "rounded-full border border-[#14c78b]/30 bg-[#14c78b]/10 px-4 py-1 font-semibold text-[#14c78b]"
                                        : "rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 font-semibold text-red-400"
                                }
                            >
                                {userProfile.hasActiveSubscription
                                    ? "فعال"
                                    : "منقضی شده"}
                            </span>
                        </div>

                        <div className="text-gray-300">
                            {userProfile.hasActiveSubscription
                                ? `تاریخ پایان اشتراک: ${userProfile.subscriptionExpireDate
                                    ? userProfile.subscriptionExpireDate.split("T")[0]
                                    : "نامشخص"
                                }`
                                : "اشتراک شما به پایان رسیده است."}
                        </div>
                    </div>

                    {/* Unified Favorites */}
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                        <div className="mb-5 flex items-center gap-2">
                            <Heart
                                className="text-[#14c78b]"
                                size={22}
                            />
                            <h3 className="text-lg font-semibold text-white">
                                علاقه‌مندی‌های من
                            </h3>
                            <span className="rounded-full bg-[#14c78b]/10 px-2.5 py-1 text-sm text-[#14c78b]">
                                {favorites.length}
                            </span>
                        </div>

                        {loadingFavorites ? (
                            <div className="py-8 text-center text-gray-500">
                                در حال دریافت علاقه‌مندی‌ها...
                            </div>
                        ) : favorites.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
                                {favorites.map((item) => (
                                    <div
                                        key={`${item.contentType}:${item._id}`}
                                        className="relative"
                                    >
                                        {item.contentType === "movie" ? (
                                            <MovieCard
                                                movie={item}
                                                onClick={() => {
                                                    setSelectedMovie(item);
                                                    setIsMovieModalOpen(true);
                                                }}
                                                favoriteHandler={() =>
                                                    favoriteHandler(item._id, "movie")
                                                }
                                            />
                                        ) : (
                                            <SeriesCard
                                                series={item}
                                                onClick={() => {
                                                    setSelectedSeries(item);
                                                    setIsSeriesModalOpen(true);
                                                }}
                                            />
                                        )}

                                        <button
                                            type="button"
                                            title="حذف از علاقه‌مندی‌ها"
                                            aria-label="حذف از علاقه‌مندی‌ها"
                                            disabled={
                                                pendingFavorite ===
                                                `${item.contentType}:${item._id}`
                                            }
                                            onClick={() =>
                                                favoriteHandler(
                                                    item._id,
                                                    item.contentType
                                                )
                                            }
                                            className="absolute right-2 top-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/80 text-[#14c78b] transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                                        >
                                            <Heart
                                                size={18}
                                                fill="currentColor"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="py-5 text-gray-500">
                                هنوز فیلم یا سریالی به علاقه‌مندی‌ها اضافه نکرده‌ای.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Movie Modal */}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen={isMovieModalOpen}
                    onClose={closeModals}
                    isFavorite={isFavorite(selectedMovie._id, "movie")}
                    favoriteHandler={(id) =>
                        favoriteHandler(id, "movie")
                    }
                />
            )}

            {/* Series Modal */}
            {selectedSeries && (
                <SeriesModal
                    series={selectedSeries}
                    isOpen={isSeriesModalOpen}
                    onClose={closeModals}
                    isFavorite={isFavorite(selectedSeries._id, "series")}
                    favoriteHandler={(id) =>
                        favoriteHandler(id, "series")
                    }
                />
            )}
        </div>
    );
};

export default ProfileCard;
