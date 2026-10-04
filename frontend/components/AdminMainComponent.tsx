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

type MonitoringServer = {
    hostname: string;
    uptime: number;

    cpu: {
        usage: number;
        cores: number;
    };

    memory: {
        total: number;
        used: number;
        free: number;
        usage: number;
        totalGB: number;
        usedGB: number;
        freeGB: number;
    };

    disk: {
        root: {
            total: number;
            used: number;
            available: number;
            usage: number;
            totalGB: number;
            usedGB: number;
            availableGB: number;
        };

        storage: {
            total: number;
            used: number;
            available: number;
            usage: number;
            totalGB: number;
            usedGB: number;
            availableGB: number;
        };
    };

    network: {
        rxBytes: number;
        txBytes: number;
        rxGB: number;
        txGB: number;
        downloadMbps: number;
        uploadMbps: number;
    };

    timestamp: string;
};

type MonitoringData = {
    server: MonitoringServer;

    users: {
        total: number;
        online: number;
        subscribed: number;
        expired: number;
        newToday: number;
    };

    subscription: {
        revenue: string;
        active: number;
        expiringSoon: number;
    };

    live: {
        total: number;
        online: number;
        viewers: number;
        bandwidth: string;
    };
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
                    <p className="text-sm text-gray-400">
                        {title}
                    </p>

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
                                width: `${Math.min(
                                    Math.max(progress, 0),
                                    100
                                )}%`,
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
                    <p className="text-sm text-gray-400">
                        {title}
                    </p>

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
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{
                                width: `${Math.min(
                                    Math.max(progress, 0),
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const formatUptime = (seconds: number) => {
    if (!Number.isFinite(seconds)) {
        return "-";
    }

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(
        (seconds % 86400) / 3600
    );
    const minutes = Math.floor(
        (seconds % 3600) / 60
    );

    if (days > 0) {
        return `${days} روز ${hours} ساعت`;
    }

    if (hours > 0) {
        return `${hours} ساعت ${minutes} دقیقه`;
    }

    return `${minutes} دقیقه`;
};

const createEmptyMonitoring = (
    userCount: number
): MonitoringData => ({
    server: {
        hostname: "-",
        uptime: 0,

        cpu: {
            usage: 0,
            cores: 0,
        },

        memory: {
            total: 0,
            used: 0,
            free: 0,
            usage: 0,
            totalGB: 0,
            usedGB: 0,
            freeGB: 0,
        },

        disk: {
            root: {
                total: 0,
                used: 0,
                available: 0,
                usage: 0,
                totalGB: 0,
                usedGB: 0,
                availableGB: 0,
            },

            storage: {
                total: 0,
                used: 0,
                available: 0,
                usage: 0,
                totalGB: 0,
                usedGB: 0,
                availableGB: 0,
            },
        },

        network: {
            rxBytes: 0,
            txBytes: 0,
            rxGB: 0,
            txGB: 0,
            downloadMbps: 0,
            uploadMbps: 0,
        },

        timestamp: "",
    },

    // فعلاً Mock
    // بعداً API واقعی کاربران را وصل می‌کنیم.
    users: {
        total: userCount,
        online: 0,
        subscribed: 0,
        expired: 0,
        newToday: 0,
    },

    // فعلاً Mock
    subscription: {
        revenue: "€0",
        active: 0,
        expiringSoon: 0,
    },

    // فعلاً Mock
    live: {
        total: 0,
        online: 0,
        viewers: 0,
        bandwidth: "0 Mbps",
    },
});

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

    const [monitoring, setMonitoring] =
        useState<MonitoringData | null>(null);

    const [monitoringLoading, setMonitoringLoading] =
        useState(false);

    const [monitoringError, setMonitoringError] =
        useState<string | null>(null);

    /*
     * ============================
     * MONITORING API
     * ============================
     */

    const fetchMonitoring = async () => {
        try {
            setMonitoringLoading(true);
            setMonitoringError(null);

            const response = await fetch(
                "/api/admin/monitoring/server",
                {
                    method: "GET",

                    // خیلی مهم:
                    // Cookie لاگین همراه Request ارسال می‌شود.
                    credentials: "include",

                    cache: "no-store",
                }
            );

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(
                        "احراز هویت انجام نشده یا Cookie لاگین وجود ندارد."
                    );
                }

                if (response.status === 403) {
                    throw new Error(
                        "شما دسترسی ادمین ندارید."
                    );
                }

                throw new Error(
                    `Monitoring API Error: ${response.status}`
                );
            }

            const data = await response.json();

            if (!data?.success || !data?.server) {
                throw new Error(
                    "پاسخ نامعتبر از API مانیتورینگ"
                );
            }

            setMonitoring((previous) => {
                const empty =
                    createEmptyMonitoring(
                        userList.length
                    );

                return {
                    ...empty,

                    server: data.server,

                    /*
                     * فعلاً اطلاعاتی که API سرور ندارد
                     * از state قبلی حفظ می‌شوند.
                     */
                    users:
                        previous?.users ??
                        empty.users,

                    subscription:
                        previous?.subscription ??
                        empty.subscription,

                    live:
                        previous?.live ??
                        empty.live,
                };
            });
        } catch (error) {
            console.error(
                "MONITORING FETCH ERROR:",
                error
            );

            setMonitoringError(
                error instanceof Error
                    ? error.message
                    : "خطا در دریافت اطلاعات مانیتورینگ"
            );
        } finally {
            setMonitoringLoading(false);
        }
    };

    /*
     * اولین Load + Refresh هر 5 ثانیه
     */

    useEffect(() => {
        fetchMonitoring();

        const interval = setInterval(() => {
            fetchMonitoring();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    /*
     * اگر API هنوز جواب نداده باشد،
     * از این مقدار استفاده می‌کنیم تا JSX
     * هیچ وقت روی null کرش نکند.
     */



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

    const currentMonitoring =
        monitoring ?? createEmptyMonitoring(userList.length);
    console.log("MONITORING:", monitoring);
    console.log("currentMonitoring:", currentMonitoring);
    console.log("currentMonitoring.users:", currentMonitoring?.users);


    const server =
        currentMonitoring?.server ??
        createEmptyMonitoring(userList.length).server;

    const users =
        currentMonitoring?.users ??
        createEmptyMonitoring(userList.length).users;

    const subscription =
        currentMonitoring?.subscription ??
        createEmptyMonitoring(userList.length).subscription;

    const live =
        currentMonitoring?.live ??
        createEmptyMonitoring(userList.length).live;

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
                            onClick={() =>
                                setActiveTab(tab.id)
                            }
                            className={`w-full flex items-center gap-3 text-right px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                                ? "bg-primary text-dark font-bold shadow-lg shadow-green-900/20"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">
                                {tab.icon}
                            </span>

                            <span>
                                {tab.label}
                            </span>
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

                        {activeTab === "dashboard" && (
                            <div className="flex items-center gap-2 text-xs">

                                <span
                                    className={`w-2 h-2 rounded-full ${monitoringError
                                        ? "bg-red-500"
                                        : monitoringLoading
                                            ? "bg-yellow-400"
                                            : "bg-green-500"
                                        }`}
                                />

                                <span className="text-gray-500">
                                    {monitoringError
                                        ? "خطای مانیتورینگ"
                                        : monitoringLoading
                                            ? "در حال دریافت..."
                                            : "Live"}
                                </span>

                            </div>
                        )}

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

                            {/* Error */}

                            {monitoringError && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">

                                    <div className="flex items-center justify-between gap-4">

                                        <div>
                                            <p className="text-red-400 font-semibold">
                                                خطا در دریافت مانیتورینگ
                                            </p>

                                            <p className="text-sm text-red-400/70 mt-1">
                                                {monitoringError}
                                            </p>
                                        </div>

                                        <button
                                            onClick={fetchMonitoring}
                                            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                                        >
                                            تلاش مجدد
                                        </button>

                                    </div>

                                </div>
                            )}

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
                                        value={users.total}
                                        subtitle={`+${users.newToday} کاربر امروز`}
                                        icon="👥"
                                    />

                                    <StatCard
                                        title="کاربران آنلاین"
                                        value={users.online}
                                        subtitle="در حال استفاده"
                                        icon="🟢"
                                    />

                                    <StatCard
                                        title="اشتراک فعال"
                                        value={users.subscribed}
                                        subtitle={`${subscription.expiringSoon} اشتراک نزدیک به انقضا`}
                                        icon="💳"
                                    />

                                    <StatCard
                                        title="درآمد"
                                        value={subscription.revenue}
                                        subtitle="درآمد اشتراک‌ها"
                                        icon="💰"
                                    />

                                </div>

                            </section>

                            {/* Server */}

                            <section>

                                <div className="mb-4">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <h3 className="text-lg font-bold text-white">
                                                وضعیت سرور
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {server.hostname !== "-"
                                                    ? server.hostname
                                                    : "سرور آلمان"}
                                            </p>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            {server.cpu.cores > 0
                                                ? `${server.cpu.cores} Cores`
                                                : ""}
                                        </div>

                                    </div>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                                    <ServerCard
                                        title="CPU"
                                        value={`${server.cpu.usage}%`}
                                        subtitle="استفاده فعلی"
                                        progress={
                                            server.cpu.usage
                                        }
                                    />

                                    <ServerCard
                                        title="RAM"
                                        value={`${server.memory.usage}%`}
                                        subtitle={`${server.memory.usedGB} / ${server.memory.totalGB} GB`}
                                        progress={
                                            server.memory.usage
                                        }
                                    />

                                    <ServerCard
                                        title="Disk"
                                        value={`${server.disk.root.usage}%`}
                                        subtitle={`${server.disk.root.usedGB} / ${server.disk.root.totalGB} GB`}
                                        progress={
                                            server.disk.root.usage
                                        }
                                    />

                                    <ServerCard
                                        title="Storage"
                                        value={`${server.disk.storage.usage}%`}
                                        subtitle={`${server.disk.storage.usedGB} / ${server.disk.storage.totalGB} GB`}
                                        progress={
                                            server.disk.storage.usage
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
                                        value={`${server.network.downloadMbps} Mbps`}
                                        subtitle="سرعت دریافت"
                                        icon="⬇️"
                                    />

                                    <StatCard
                                        title="Upload"
                                        value={`${server.network.uploadMbps} Mbps`}
                                        subtitle="سرعت ارسال"
                                        icon="⬆️"
                                    />

                                    <StatCard
                                        title="دریافت کل"
                                        value={`${server.network.rxGB} GB`}
                                        subtitle="از زمان اجرای Backend"
                                        icon="📊"
                                    />

                                    <StatCard
                                        title="ارسال کل"
                                        value={`${server.network.txGB} GB`}
                                        subtitle="از زمان اجرای Backend"
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

                                    <p className="text-sm text-gray-500">
                                        وضعیت پخش زنده
                                    </p>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                                    <StatCard
                                        title="کل Streamها"
                                        value={live.total}
                                        icon="📡"
                                    />

                                    <StatCard
                                        title="Stream فعال"
                                        value={live.online}
                                        subtitle="در حال پخش"
                                        icon="🟢"
                                    />

                                    <StatCard
                                        title="Viewer"
                                        value={live.viewers}
                                        subtitle="کاربر در حال تماشا"
                                        icon="👁️"
                                    />

                                    <StatCard
                                        title="Bandwidth"
                                        value={live.bandwidth}
                                        subtitle="مصرف Live"
                                        icon="🚀"
                                    />

                                </div>

                            </section>

                            {/* Server Information */}

                            <section className="bg-card border border-gray-800 rounded-2xl p-6">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            اطلاعات سرور
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            وضعیت کلی سرور
                                        </p>
                                    </div>

                                    <button
                                        onClick={fetchMonitoring}
                                        disabled={monitoringLoading}
                                        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition disabled:opacity-50"
                                    >
                                        {monitoringLoading
                                            ? "در حال بروزرسانی..."
                                            : "بروزرسانی"}
                                    </button>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Hostname
                                        </p>

                                        <p className="text-lg font-bold text-white mt-2">
                                            {server.hostname}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Uptime
                                        </p>

                                        <p className="text-lg font-bold text-primary mt-2">
                                            {formatUptime(
                                                server.uptime
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            آخرین بروزرسانی
                                        </p>

                                        <p className="text-lg font-bold text-white mt-2">
                                            {server.timestamp
                                                ? new Date(
                                                    server.timestamp
                                                ).toLocaleTimeString(
                                                    "fa-IR"
                                                )
                                                : "-"}
                                        </p>
                                    </div>

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
                                            {subscription.active}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            نزدیک انقضا
                                        </p>

                                        <p className="text-2xl font-bold text-yellow-400 mt-2">
                                            {subscription.expiringSoon}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            منقضی شده
                                        </p>

                                        <p className="text-2xl font-bold text-red-400 mt-2">
                                            {users.expired}
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