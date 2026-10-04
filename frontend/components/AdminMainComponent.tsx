"use client";

import { ManageUser } from "@/components/ManageUser";
import { MangeFilms } from "@/components/MangeFilms";
import { ManageSeries } from "@/components/ManageSeries";
import { ManageRequests } from "@/components/ManageRequests";
import { useEffect, useState } from "react";

import type { User } from "@/types/user";
import type { Movie } from "@/types/movies";
import type { Series } from "@/types/Series";
import type { UserRequest } from "@/types/request";

type StorageMovie = {
    filename: string;
    imported: boolean;
};

type ActiveTab =
    | "dashboard"
    | "users"
    | "movies"
    | "series"
    | "requests";

type StatCardProps = {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
    progress?: number;
};

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    progress,
}: StatCardProps) => {
    return (
        <div className="bg-card border border-gray-800 rounded-2xl p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-400">{title}</p>

                    <h3 className="text-2xl font-bold text-white mt-2">
                        {value}
                    </h3>

                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                    {icon}
                </div>
            </div>

            {typeof progress === "number" && (
                <div className="mt-5">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                            }}
                        />
                    </div>

                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>مصرف</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

type ServerCardProps = {
    title: string;
    value: string;
    subtitle: string;
    progress?: number;
};

const ServerCard = ({
    title,
    value,
    subtitle,
    progress,
}: ServerCardProps) => {
    return (
        <div className="bg-card border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">{title}</p>

                    <h3 className="text-2xl font-bold text-white mt-2">
                        {value}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                        {subtitle}
                    </p>
                </div>

                <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/40" />
            </div>

            {typeof progress === "number" && (
                <div className="mt-5">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export const AdminMainComponent = ({
    moviesList = [],
    userList = [],
    requestsList = [],
    storageMovies = [],
    seriesList = [],
}: {
    moviesList?: Movie[];
    userList?: User[];
    requestsList?: UserRequest[];
    storageMovies?: StorageMovie[];
    seriesList?: Series[];
}) => {
    const [activeTab, setActiveTab] =
        useState<ActiveTab>("dashboard");

    /*
     * فعلاً Mock
     * بعداً این اطلاعات از API مانیتورینگ می‌آید.
     */

    const [monitoring, setMonitoring] = useState<any>(null);
    const [monitoringLoading, setMonitoringLoading] = useState(true);
    const [monitoringError, setMonitoringError] = useState<string | null>(null);
    useEffect(() => {
        if (activeTab !== "dashboard") return;

        const fetchMonitoring = async () => {
            try {
                setMonitoringError(null);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/monitoring/server`,
                    {
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("خطا در دریافت اطلاعات سرور");
                }

                const data = await response.json();

                setMonitoring(data.server);
            } catch (error) {
                console.error(error);
                setMonitoringError("دریافت اطلاعات مانیتورینگ ناموفق بود");
            } finally {
                setMonitoringLoading(false);
            }
        };

        fetchMonitoring();

        const interval = setInterval(fetchMonitoring, 5000);

        return () => clearInterval(interval);
    }, [activeTab]);
    const tabs = [
        {
            id: "dashboard",
            label: "داشبورد",
            icon: "📊",
        },
        {
            id: "movies",
            label: "فیلم‌ها",
            icon: "🎬",
        },
        {
            id: "series",
            label: "سریال‌ها",
            icon: "📺",
        },
        {
            id: "users",
            label: "کاربران",
            icon: "👥",
        },
        {
            id: "requests",
            label: "درخواست‌ها",
            icon: "📨",
        },
    ] as const;

    return (
        <div className="min-h-screen bg-dark text-gray-200 flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-card border-l border-gray-800 flex flex-col">

                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-primary">
                        الان بین
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        پنل مدیریت
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-2">

                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 text-right px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                                ? "bg-primary text-dark font-bold shadow-lg shadow-green-900/20"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">
                                {tab.icon}
                            </span>

                            <span>{tab.label}</span>
                        </button>
                    ))}

                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button className="w-full text-right px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition">
                        خروج از حساب
                    </button>
                </div>

            </aside>

            {/* Main */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">

                <header className="mb-8 flex justify-between items-center">

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {
                                tabs.find(
                                    (tab) =>
                                        tab.id === activeTab
                                )?.label
                            }
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            وضعیت فعلی AlanBin
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <span className="text-gray-400 text-sm">
                            خوش آمدید، ادمین
                        </span>

                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-dark font-bold">
                            A
                        </div>

                    </div>

                </header>

                <div className="animate-fade-in">

                    {/* ================= DASHBOARD ================= */}

                    {activeTab === "dashboard" && (
                        <div className="space-y-8">

                            {/* Users */}

                            <section>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            کاربران و اشتراک‌ها
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            وضعیت کاربران و درآمد
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                                    <StatCard
                                        title="کل کاربران"
                                        value={monitoring.users.total}
                                        subtitle={`+${monitoring.users.newToday} کاربر امروز`}
                                        icon="👥"
                                    />

                                    <StatCard
                                        title="کاربران آنلاین"
                                        value={monitoring.users.online}
                                        subtitle="در حال استفاده"
                                        icon="🟢"
                                    />

                                    <StatCard
                                        title="اشتراک فعال"
                                        value={monitoring.users.subscribed}
                                        subtitle={`${monitoring.subscription.expiringSoon} اشتراک نزدیک به انقضا`}
                                        icon="💳"
                                    />

                                    <StatCard
                                        title="درآمد"
                                        value={monitoring.subscription.revenue}
                                        subtitle="درآمد اشتراک‌ها"
                                        icon="💰"
                                    />

                                </div>

                            </section>

                            {/* Server */}

                            <section>

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white">
                                        وضعیت سرور
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        منابع اصلی سرور آلمان
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                                    <ServerCard
                                        title="CPU"
                                        value={`${monitoring.server.cpu}%`}
                                        subtitle="استفاده فعلی"
                                        progress={
                                            monitoring.server.cpu
                                        }
                                    />

                                    <ServerCard
                                        title="RAM"
                                        value={`${monitoring.server.ram}%`}
                                        subtitle="استفاده فعلی"
                                        progress={
                                            monitoring.server.ram
                                        }
                                    />

                                    <ServerCard
                                        title="Disk"
                                        value={`${monitoring.server.disk}%`}
                                        subtitle="دیسک سیستم"
                                        progress={
                                            monitoring.server.disk
                                        }
                                    />

                                    <ServerCard
                                        title="Storage"
                                        value={`${monitoring.server.storage}%`}
                                        subtitle="StorageBox"
                                        progress={
                                            monitoring.server.storage
                                        }
                                    />

                                </div>

                            </section>

                            {/* Network */}

                            <section>

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white">
                                        شبکه و ترافیک
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        مصرف لحظه‌ای و ترافیک سرور
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                                    <StatCard
                                        title="Download"
                                        value={
                                            monitoring.server.download
                                        }
                                        subtitle="سرعت دریافت"
                                        icon="⬇️"
                                    />

                                    <StatCard
                                        title="Upload"
                                        value={
                                            monitoring.server.upload
                                        }
                                        subtitle="سرعت ارسال"
                                        icon="⬆️"
                                    />

                                    <StatCard
                                        title="ترافیک امروز"
                                        value={
                                            monitoring.server.trafficToday
                                        }
                                        subtitle="Total Traffic"
                                        icon="📊"
                                    />

                                    <StatCard
                                        title="ترافیک ماه"
                                        value={
                                            monitoring.server.trafficMonth
                                        }
                                        subtitle="Total Traffic"
                                        icon="🌐"
                                    />

                                </div>

                            </section>

                            {/* Live */}

                            <section>

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white">
                                        Live Streaming
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                                    <StatCard
                                        title="کل Streamها"
                                        value={
                                            monitoring.live.total
                                        }
                                        icon="📡"
                                    />

                                    <StatCard
                                        title="Stream فعال"
                                        value={
                                            monitoring.live.online
                                        }
                                        subtitle="در حال پخش"
                                        icon="🟢"
                                    />

                                    <StatCard
                                        title="Viewer"
                                        value={
                                            monitoring.live.viewers
                                        }
                                        subtitle="کاربر در حال تماشا"
                                        icon="👁️"
                                    />

                                    <StatCard
                                        title="Bandwidth"
                                        value={
                                            monitoring.live.bandwidth
                                        }
                                        subtitle="مصرف Live"
                                        icon="🚀"
                                    />

                                </div>

                            </section>

                            {/* Subscription status */}

                            <section className="bg-card border border-gray-800 rounded-2xl p-6">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            وضعیت اشتراک‌ها
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            خلاصه وضعیت کاربران
                                        </p>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            فعال
                                        </p>

                                        <p className="text-2xl font-bold text-primary mt-2">
                                            {
                                                monitoring.subscription
                                                    .active
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            نزدیک انقضا
                                        </p>

                                        <p className="text-2xl font-bold text-yellow-400 mt-2">
                                            {
                                                monitoring.subscription
                                                    .expiringSoon
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            منقضی شده
                                        </p>

                                        <p className="text-2xl font-bold text-red-400 mt-2">
                                            {
                                                monitoring.users.expired
                                            }
                                        </p>
                                    </div>

                                </div>

                            </section>

                        </div>
                    )}

                    {/* Movies */}

                    {activeTab === "movies" && (
                        <MangeFilms
                            moviesList={moviesList}
                            storageMovies={storageMovies}
                        />
                    )}

                    {/* Series */}

                    {activeTab === "series" && (
                        <ManageSeries
                            seriesList={seriesList}
                        />
                    )}

                    {/* Users */}

                    {activeTab === "users" && (
                        <ManageUser
                            userList={userList}
                        />
                    )}

                    {/* Requests */}

                    {activeTab === "requests" && (
                        <ManageRequests
                            requestsList={requestsList}
                        />
                    )}

                </div>

            </main>
        </div>
    );
};