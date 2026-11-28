"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    House,
    LogOut,
    Heart,
    Mail,
    Phone,
    MapPin,
    User,
    CalendarDays,
    ShieldCheck,
    ShieldAlert,
    X,
    Film,
} from "lucide-react";
import toast from "react-hot-toast";

import type { Movie } from "@/types/movies";
import type { Series } from "@/types/Series";

import ProfileRow from "./ProfileRow";
import { MovieModal } from "./MovieMedal";
import { MovieCard } from "./MovieCard";
import { SeriesCard } from "./SeriesCard";
import { SeriesModal } from "./SeriesModal";
import { useTvNavigation } from "./useTvNavigation";

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

type FavoriteMovie = Movie & { contentType: "movie" };
type FavoriteSeries = Series & { contentType: "series" };
type FavoriteItem = FavoriteMovie | FavoriteSeries;

interface UserFavorites {
    favorites: FavoriteItem[];
}

const ACCENT = "#14c78b";
const SUB_PERIOD_DAYS = 30; // used only for the progress bar

const fa = (n: number) => n.toLocaleString("fa-IR");

export const ProfileCard = ({
    userProfile,
    userFavorites,
}: {
    userProfile: Profile;
    userFavorites: UserFavorites;
}) => {
    useTvNavigation();
    const router = useRouter();
    const { logout } = useAuth();

    const [favorites, setFavorites] = useState<FavoriteItem[]>(userFavorites?.favorites ?? []);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
    const [loadingFavorites, setLoadingFavorites] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [pendingFavorite, setPendingFavorite] = useState<string | null>(null);

    useEffect(() => {
        setFavorites(userFavorites?.favorites ?? []);
    }, [userFavorites]);

    /* ---------- Subscription info ---------- */
    const sub = useMemo(() => {
        const expire = userProfile.subscriptionExpireDate ? new Date(userProfile.subscriptionExpireDate) : null;
        const valid = expire && !isNaN(expire.getTime());
        const daysLeft = valid ? Math.max(0, Math.ceil((expire!.getTime() - Date.now()) / 86_400_000)) : 0;
        return {
            active: userProfile.hasActiveSubscription,
            daysLeft,
            expireText: valid ? expire!.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }) : "نامشخص",
            percent: Math.min(100, Math.round((daysLeft / SUB_PERIOD_DAYS) * 100)),
        };
    }, [userProfile]);

    const initial = (userProfile.fullName || "?").trim().charAt(0);
    const location = [userProfile.city, userProfile.country].filter(Boolean).join("، ");

    /* ---------- Favorites ---------- */
    const fetchFavorites = async () => {
        try {
            setLoadingFavorites(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
                credentials: "include",
                cache: "no-store",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "خطا در دریافت علاقه‌مندی‌ها");
            if (!Array.isArray(data.favorites)) throw new Error("ساختار پاسخ علاقه‌مندی‌ها نامعتبر است");
            setFavorites(data.favorites);
        } catch (error) {
            console.error("FETCH FAVORITES ERROR:", error);
            toast.error(error instanceof Error ? error.message : "خطا در دریافت علاقه‌مندی‌ها");
        } finally {
            setLoadingFavorites(false);
        }
    };

    const favoriteHandler = async (id: string, contentType: "movie" | "series") => {
        const key = `${contentType}:${id}`;
        if (pendingFavorite === key) return;

        try {
            setPendingFavorite(key);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${contentType}/${id}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "خطا در تغییر علاقه‌مندی");

            await fetchFavorites();
            router.refresh();
            toast.success("علاقه‌مندی به‌روزرسانی شد");
        } catch (error) {
            console.error("FAVORITE ERROR:", error);
            toast.error(error instanceof Error ? error.message : "خطا در تغییر علاقه‌مندی");
        } finally {
            setPendingFavorite(null);
        }
    };

    const isFavorite = (id: string, contentType: "movie" | "series") =>
        favorites.some((item) => item._id === id && item.contentType === contentType);

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
        setSelectedMovie(null);
        setSelectedSeries(null);
    };

    return (
        <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-white">
            {/* Background: CSS only */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
                style={{ background: "radial-gradient(ellipse 55% 100% at 85% 0%, rgba(20,199,139,0.13), transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 md:py-12 tv:max-w-[1500px]">
                {/* Top bar */}
                <div className="mb-10 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        data-tv-focus
                        onClick={() => router.push("/home")}
                        className="tv-focus flex cursor-pointer items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
                    >
                        <House size={16} />
                        خانه
                    </button>

                    <button
                        type="button"
                        data-tv-focus
                        onClick={logoutHandler}
                        disabled={loggingOut}
                        className="tv-focus flex cursor-pointer items-center gap-2 rounded-md border border-red-500/20 px-4 py-2 text-sm text-red-400/90 transition-colors hover:border-red-500/50 hover:bg-red-500/10 disabled:opacity-50"
                    >
                        <LogOut size={16} />
                        {loggingOut ? "در حال خروج..." : "خروج"}
                    </button>
                </div>

                {/* Identity */}
                <header className="mb-8 flex flex-col gap-6 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-center">
                    <div
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-white/10 text-3xl font-bold text-white tv:h-24 tv:w-24"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}40, ${ACCENT}0d 70%), #11151c` }}
                    >
                        {initial}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="mb-2 text-[11px] font-semibold tracking-[0.15em] text-white/40">MY ACCOUNT</div>
                        <h1 className="truncate text-3xl font-bold tracking-tight md:text-4xl tv:text-5xl">
                            {userProfile.fullName}
                        </h1>
                        <p dir="ltr" className="mt-1.5 truncate text-right text-sm text-white/45">
                            {userProfile.email}
                        </p>
                    </div>

                    <span
                        className={`inline-flex items-center gap-2 self-start rounded-md border px-3 py-1.5 text-sm font-medium sm:self-center ${sub.active
                                ? "border-[#14c78b]/30 bg-[#14c78b]/10 text-[#14c78b]"
                                : "border-red-500/30 bg-red-500/10 text-red-400"
                            }`}
                    >
                        {sub.active ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
                        {sub.active ? "اشتراک فعال" : "اشتراک منقضی شده"}
                    </span>
                </header>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Stat
                        icon={CalendarDays}
                        label="روز باقی‌مانده"
                        value={sub.active ? fa(sub.daysLeft) : "۰"}
                        accent={sub.active ? ACCENT : "#ef4444"}
                    />
                    <Stat icon={Heart} label="علاقه‌مندی‌ها" value={fa(favorites.length)} accent="#e879a6" />
                    <Stat icon={MapPin} label="محل زندگی" value={location || "—"} accent="#5fa8e8" small />
                </div>

                {/* Info + Subscription */}
                <div className="mb-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                    <section className="overflow-hidden rounded-lg border border-white/[0.07] bg-[#11151c]">
                        <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-4">
                            <User size={17} className="text-white/40" />
                            <h2 className="font-semibold">اطلاعات حساب</h2>
                        </div>
                        <ProfileRow icon={User} label="نام و نام خانوادگی" value={userProfile.fullName} />
                        <ProfileRow icon={Mail} label="ایمیل" value={userProfile.email} ltr />
                        <ProfileRow icon={Phone} label="شماره موبایل" value={userProfile.phoneNumber} ltr />
                        <ProfileRow icon={Globe2Fallback} label="کشور" value={userProfile.country} />
                        <ProfileRow icon={MapPin} label="شهر" value={userProfile.city} />
                    </section>

                    <section
                        className="relative flex flex-col overflow-hidden rounded-lg border border-white/[0.07] p-5"
                        style={{
                            background: `linear-gradient(180deg, ${sub.active ? ACCENT : "#ef4444"}12 0%, transparent 60%), #11151c`,
                        }}
                    >
                        <span
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-[2px]"
                            style={{ background: sub.active ? ACCENT : "#ef4444" }}
                        />
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="font-semibold">وضعیت اشتراک</h2>
                            <span className="font-mono text-[11px] tracking-wider text-white/30" dir="ltr">
                                {sub.active ? "ACTIVE" : "EXPIRED"}
                            </span>
                        </div>

                        {sub.active ? (
                            <>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold tabular-nums" suppressHydrationWarning>
                                        {fa(sub.daysLeft)}
                                    </span>
                                    <span className="mb-1.5 text-sm text-white/45">روز باقی‌مانده</span>
                                </div>

                                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-sm bg-white/[0.06]">
                                    <div
                                        className="h-full rounded-sm"
                                        style={{ width: `${sub.percent}%`, background: ACCENT }}
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="text-white/45">تاریخ پایان</span>
                                    <span className="font-medium text-white/85" suppressHydrationWarning>
                                        {sub.expireText}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm leading-7 text-white/55">
                                    اشتراک شما به پایان رسیده است. برای ادامه تماشای فیلم‌ها، سریال‌ها و پخش زنده، اشتراک
                                    خود را تمدید کنید.
                                </p>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="text-white/45">تاریخ پایان</span>
                                    <span className="font-medium text-white/85" suppressHydrationWarning>
                                        {sub.expireText}
                                    </span>
                                </div>
                            </>
                        )}
                    </section>
                </div>

                {/* Favorites */}
                <section>
                    <div className="mb-5 flex items-center gap-3">
                        <Heart size={18} className="text-[#e879a6]" />
                        <h2 className="text-lg font-semibold md:text-xl">علاقه‌مندی‌های من</h2>
                        <span className="text-xs tabular-nums text-white/30">{fa(favorites.length)}</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-white/[0.08] to-transparent" />
                    </div>

                    {loadingFavorites ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-[2/3] animate-pulse rounded-lg bg-white/[0.04]" />
                            ))}
                        </div>
                    ) : favorites.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 sm:gap-5 tv:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
                            {favorites.map((item) => {
                                const key = `${item.contentType}:${item._id}`;
                                return (
                                    <div key={key} className="relative min-w-0 [&>div]:!w-full">
                                        {item.contentType === "movie" ? (
                                            <MovieCard movie={item} onClick={() => setSelectedMovie(item)} />
                                        ) : (
                                            <SeriesCard series={item} onClick={() => setSelectedSeries(item)} />
                                        )}

                                        <button
                                            type="button"
                                            data-tv-focus
                                            title="حذف از علاقه‌مندی‌ها"
                                            aria-label="حذف از علاقه‌مندی‌ها"
                                            disabled={pendingFavorite === key}
                                            onClick={() => favoriteHandler(item._id, item.contentType)}
                                            className="tv-focus absolute left-2 top-2 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/15 bg-black/75 text-white/80 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center rounded-lg border border-dashed border-white/[0.1] px-6 py-14 text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03]">
                                <Film size={20} className="text-white/40" />
                            </div>
                            <p className="font-medium text-white/80">هنوز چیزی به علاقه‌مندی‌ها اضافه نکرده‌ای</p>
                            <p className="mt-1.5 text-sm text-white/40">
                                روی قلب هر فیلم یا سریال بزن تا اینجا ذخیره بشه.
                            </p>
                            <button
                                type="button"
                                data-tv-focus
                                onClick={() => router.push("/home")}
                                className="tv-focus mt-6 cursor-pointer rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03]"
                            >
                                رفتن به صفحه اصلی
                            </button>
                        </div>
                    )}
                </section>
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen
                    onClose={closeModals}
                    isFavorite={isFavorite(selectedMovie._id, "movie")}
                    favoriteHandler={(id) => favoriteHandler(id, "movie")}
                />
            )}

            {selectedSeries && (
                <SeriesModal
                    series={selectedSeries}
                    isOpen
                    onClose={closeModals}
                    isFavorite={isFavorite(selectedSeries._id, "series")}
                    favoriteHandler={(id) => favoriteHandler(id, "series")}
                />
            )}
        </main>
    );
};

/* ---------- Small pieces ---------- */

function Stat({
    icon: Icon,
    label,
    value,
    accent,
    small,
}: {
    icon: typeof Heart;
    label: string;
    value: string;
    accent: string;
    small?: boolean;
}) {
    return (
        <div
            className="relative overflow-hidden rounded-lg border border-white/[0.07] p-4 sm:p-5"
            style={{ background: `linear-gradient(180deg, ${accent}0d 0%, transparent 60%), #11151c` }}
        >
            <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] opacity-60" style={{ background: accent }} />
            <div className="flex items-center justify-between">
                <span className="text-xs text-white/45">{label}</span>
                <Icon size={16} style={{ color: accent }} />
            </div>
            <div
                className={`mt-3 truncate font-bold tabular-nums ${small ? "text-lg sm:text-xl" : "text-3xl"}`}
                suppressHydrationWarning
            >
                {value}
            </div>
        </div>
    );
}

/* lucide "Globe" alias kept separate so it doesn't clash with other imports */
import { Globe as Globe2Fallback } from "lucide-react";

export default ProfileCard;