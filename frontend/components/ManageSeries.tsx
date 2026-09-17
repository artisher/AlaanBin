
"use client";

import type { Series } from "@/types/Series";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateSeriesModal } from "./CreateSeriesModal";

interface StorageSeries {
    name: string;
    path: string;
    files: string[];
}

interface ManageSeriesProps {
    seriesList: Series[];
}

export const ManageSeries = ({
    seriesList,
}: ManageSeriesProps) => {
    const [series, setSeries] = useState<Series[]>(
        seriesList ?? []
    );

    const [addSeries, setAddSeries] = useState(false);

    const [storageSeries, setStorageSeries] = useState<
        StorageSeries[]
    >([]);

    const [isScanningStorage, setIsScanningStorage] =
        useState(false);

    const [importingEpisode, setImportingEpisode] =
        useState<string | null>(null);

    const [importedEpisodes, setImportedEpisodes] =
        useState<Set<string>>(new Set());

    const handleScanStorage = async () => {
        try {
            setIsScanningStorage(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/storage/series`,
                {
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در بررسی Storage"
                );
            }

            setStorageSeries(data.series || []);

            toast.success(
                `${data.series?.length || 0} سریال در Storage پیدا شد`
            );
        } catch (error: any) {
            console.error(
                "SCAN SERIES STORAGE ERROR:",
                error
            );

            toast.error(
                error.message || "خطا در بررسی Storage"
            );
        } finally {
            setIsScanningStorage(false);
        }
    };

    const handleImportEpisode = async (
        seriesItem: Series,
        storageItem: StorageSeries,
        filename: string
    ) => {
        const importKey = `${storageItem.name}/${filename}`;

        try {
            setImportingEpisode(importKey);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/series/${seriesItem._id}/episodes/import`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        seriesName: storageItem.name,
                        filename,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در اضافه کردن قسمت"
                );
            }

            setImportedEpisodes((prev) => {
                const next = new Set(prev);
                next.add(importKey);
                return next;
            });

            toast.success(
                `${filename} با موفقیت اضافه شد`
            );
        } catch (error: any) {
            console.error(
                "IMPORT EPISODE ERROR:",
                error
            );

            toast.error(
                error.message || "خطا در اضافه کردن قسمت"
            );
        } finally {
            setImportingEpisode(null);
        }
    };

    const handleCloseModal = () => {
        setAddSeries(false);
    };

    const handleSaveSeries = (newSeries: Series) => {
        setSeries((prev) => [newSeries, ...prev]);
        setAddSeries(false);
    };

    const handleDelete = async (id: string) => {
        if (
            !confirm(
                "آیا از حذف این سریال مطمئن هستید؟"
            )
        ) {
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/series/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در حذف سریال"
                );
            }

            setSeries((prev) =>
                prev.filter((item) => item._id !== id)
            );

            toast.success("سریال حذف شد");
        } catch (error: any) {
            console.error(
                "DELETE SERIES ERROR:",
                error
            );

            toast.error(
                error.message || "خطا در حذف سریال"
            );
        }
    };

    const findMatchingSeries = (
        storageName: string
    ) => {
        const normalizedStorageName =
            storageName.trim().toLowerCase();

        return series.find((item) => {
            const title =
                item.title?.trim().toLowerCase();

            const aliases =
                item.aliases?.map((alias) =>
                    alias.trim().toLowerCase()
                ) || [];

            return (
                title === normalizedStorageName ||
                aliases.includes(normalizedStorageName)
            );
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-white">
                    مدیریت سریال‌ها
                </h2>

                <div className="flex gap-3">
                    <button
                        onClick={handleScanStorage}
                        disabled={isScanningStorage}
                        className="rounded bg-gray-700 px-4 py-2 font-bold text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isScanningStorage
                            ? "در حال بررسی..."
                            : "🔄 بررسی Storage"}
                    </button>

                    <button
                        onClick={() => setAddSeries(true)}
                        className="rounded bg-primary px-4 py-2 font-bold text-dark transition hover:bg-green-400"
                    >
                        + افزودن سریال
                    </button>
                </div>
            </div>

            {/* Storage Series */}
            {storageSeries.length > 0 && (
                <div className="rounded-lg border border-yellow-600/30 bg-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">
                            🆕 سریال‌های موجود در Storage
                        </h3>

                        <span className="text-sm text-yellow-400">
                            {storageSeries.length} سریال
                        </span>
                    </div>

                    <div className="space-y-3">
                        {storageSeries.map((item) => {
                            const matchedSeries =
                                findMatchingSeries(item.name);

                            return (
                                <div
                                    key={item.path}
                                    className="rounded-lg border border-gray-700 bg-gray-900/50 p-4"
                                >
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-semibold text-white">
                                                {item.name}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {item.files.length} فایل ویدیویی
                                            </p>
                                        </div>

                                        {matchedSeries ? (
                                            <span className="text-sm text-green-400">
                                                ✓ {matchedSeries.title}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-yellow-400">
                                                ⚠ سریال ثبت نشده
                                            </span>
                                        )}
                                    </div>

                                    {item.files.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {item.files.map(
                                                (file) => {
                                                    const importKey =
                                                        `${item.name}/${file}`;

                                                    const isImporting =
                                                        importingEpisode ===
                                                        importKey;

                                                    const isImported =
                                                        importedEpisodes.has(
                                                            importKey
                                                        );

                                                    return (
                                                        <div
                                                            key={file}
                                                            className="flex flex-col gap-2 rounded bg-gray-800 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                                                        >
                                                            <span className="text-sm text-gray-300">
                                                                {file}
                                                            </span>

                                                            {matchedSeries ? (
                                                                <button
                                                                    onClick={() =>
                                                                        handleImportEpisode(
                                                                            matchedSeries,
                                                                            item,
                                                                            file
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        isImporting ||
                                                                        isImported
                                                                    }
                                                                    className="rounded bg-primary px-3 py-1.5 text-sm font-bold text-dark transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    {isImporting
                                                                        ? "در حال افزودن..."
                                                                        : isImported
                                                                          ? "✓ اضافه شده"
                                                                          : "＋ افزودن قسمت"}
                                                                </button>
                                                            ) : (
                                                                <span className="text-xs text-gray-500">
                                                                    ابتدا سریال را ثبت کنید
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Existing Series */}
            {series.length === 0 ? (
                <div className="rounded-lg border border-gray-700 bg-card p-8 text-center">
                    <p className="text-gray-400">
                        هنوز هیچ سریالی ثبت نشده است.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {series.map((item) => (
                        <div
                            key={item._id}
                            className="rounded-lg border border-gray-700 bg-card p-4 shadow"
                        >
                            <h3 className="text-lg font-bold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                {item.year || "سال نامشخص"}
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                ⭐ {item.rating ?? "-"}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <button
                                    className="text-sm text-primary transition hover:text-green-400"
                                    onClick={() => {
                                        toast(
                                            "برای افزودن قسمت‌ها از بخش Storage استفاده کنید"
                                        );
                                    }}
                                >
                                    مدیریت قسمت‌ها
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(item._id)
                                    }
                                    className="text-sm font-semibold text-red-400 transition hover:text-red-300"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateSeriesModal
                isOpen={addSeries}
                onClose={handleCloseModal}
                onSave={handleSaveSeries}
            />
        </div>
    );
};

