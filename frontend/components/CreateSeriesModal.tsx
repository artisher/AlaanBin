"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { Series } from "@/types/Series";

interface CreateSeriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (series: Series) => void;
}

export const CreateSeriesModal = ({
    isOpen,
    onClose,
    onSave,
}: CreateSeriesModalProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState(false);
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const [posterPreview, setPosterPreview] = useState("");

    const [form, setForm] = useState({
        title: "",
        aliases: "",
        description: "",
        poster: "",
        rating: "",
        topWeek: false,
        genre: "",
        year: "",
        product: "ایرانی",
    });

    useEffect(() => {
        if (!isOpen) {
            setForm({
                title: "",
                aliases: "",
                description: "",
                poster: "",
                rating: "",
                topWeek: false,
                genre: "",
                year: "",
                product: "ایرانی",
            });

            setPosterFile(null);
            setPosterPreview("");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            if (posterPreview) {
                URL.revokeObjectURL(posterPreview);
            }
        };
    }, [posterPreview]);

    if (!isOpen) return null;

    const handlePosterChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "فقط فایل JPG، PNG یا WebP مجاز است"
            );

            e.target.value = "";
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error(
                "حجم پوستر نباید بیشتر از 10 مگابایت باشد"
            );

            e.target.value = "";
            return;
        }

        if (posterPreview) {
            URL.revokeObjectURL(posterPreview);
        }

        setPosterFile(file);
        setPosterPreview(URL.createObjectURL(file));
    };

    const handleRemovePoster = () => {
        if (posterPreview) {
            URL.revokeObjectURL(posterPreview);
        }

        setPosterFile(null);
        setPosterPreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!form.title.trim()) {
            toast.error("عنوان سریال را وارد کنید");
            return;
        }

        try {
            setLoading(true);

            let posterUrl = "";

            // =========================
            // Upload Poster
            // =========================
            if (posterFile) {
                const posterFormData = new FormData();

                posterFormData.append(
                    "poster",
                    posterFile
                );

                const uploadRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/storage/upload-poster`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: posterFormData,
                    }
                );

                const uploadData =
                    await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(
                        uploadData.message ||
                            "خطا در آپلود پوستر"
                    );
                }

                posterUrl =
                    uploadData.posterUrl || "";
            }

            // =========================
            // Create Series
            // =========================
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/series`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        title: form.title.trim(),

                        aliases: form.aliases
                            .split(",")
                            .map((item) =>
                                item.trim()
                            )
                            .filter(Boolean),

                        description:
                            form.description.trim(),

                        poster: posterUrl,

                        rating: form.rating
                            ? Number(form.rating)
                            : undefined,

                        topWeek: form.topWeek,

                        genre: form.genre
                            .split(",")
                            .map((item) =>
                                item.trim()
                            )
                            .filter(Boolean),

                        year: form.year
                            ? Number(form.year)
                            : undefined,

                        product: form.product.trim(),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message ||
                        "خطا در ثبت سریال"
                );
            }

            toast.success(
                "سریال با موفقیت اضافه شد"
            );

            onSave(data.series);
            onClose();
        } catch (error: any) {
            console.error(
                "CREATE SERIES ERROR:",
                error
            );

            toast.error(
                error.message ||
                    "خطا در ثبت سریال"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111827]/95 px-6 py-5 backdrop-blur">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            افزودن سریال
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            اطلاعات سریال را وارد کنید
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >
                    {/* Poster + Basic Info */}
                    <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                        {/* Poster */}
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-300">
                                پوستر سریال
                            </p>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handlePosterChange}
                                className="hidden"
                            />

                            {posterPreview ? (
                                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
                                    <img
                                        src={posterPreview}
                                        alt="پیش‌نمایش پوستر"
                                        className="aspect-[2/3] w-full object-cover"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-gradient-to-t from-black/90 to-transparent p-3 pt-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="flex-1 rounded-lg bg-white/15 px-2 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/25"
                                        >
                                            تغییر
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleRemovePoster}
                                            className="rounded-lg bg-red-500/80 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="group flex aspect-[2/3] w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#0B0F14] transition hover:border-[#14c78b]/60 hover:bg-[#14c78b]/5"
                                >
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#14c78b]/10 text-2xl transition group-hover:scale-110">
                                        🖼️
                                    </div>

                                    <span className="text-sm font-semibold text-white">
                                        انتخاب پوستر
                                    </span>

                                    <span className="mt-1 px-3 text-center text-xs text-gray-500">
                                        JPG, PNG یا WebP
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    عنوان سریال
                                </label>

                                <input
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="مثلاً یاغی"
                                    className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Aliasها
                                </label>

                                <input
                                    value={form.aliases}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            aliases: e.target.value,
                                        })
                                    }
                                    placeholder="yaghi, yaghi series"
                                    className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                                />

                                <p className="mt-1.5 text-xs text-gray-500">
                                    برای جستجو و تطبیق Storage، با کاما جدا کنید.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        سال
                                    </label>

                                    <input
                                        type="number"
                                        value={form.year}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                year: e.target.value,
                                            })
                                        }
                                        placeholder="1402"
                                        className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        امتیاز
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={form.rating}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                rating: e.target.value,
                                            })
                                        }
                                        placeholder="8.5"
                                        className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            توضیحات
                        </label>

                        <textarea
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            placeholder="توضیح کوتاهی درباره سریال..."
                            rows={4}
                            className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                        />
                    </div>

                    {/* Genre + Product */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                ژانر
                            </label>

                            <input
                                value={form.genre}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        genre: e.target.value,
                                    })
                                }
                                placeholder="درام, جنایی"
                                className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                محصول
                            </label>

                            <input
                                value={form.product}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        product: e.target.value,
                                    })
                                }
                                placeholder="ایرانی"
                                className="w-full rounded-xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-[#14c78b]"
                            />
                        </div>
                    </div>

                    {/* Top Week */}
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0B0F14] p-4 transition hover:border-[#14c78b]/30">
                        <input
                            type="checkbox"
                            checked={form.topWeek}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    topWeek: e.target.checked,
                                })
                            }
                            className="h-4 w-4 accent-[#14c78b]"
                        />

                        <div>
                            <p className="text-sm font-semibold text-white">
                                برترین‌های هفته
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                                سریال در بخش برترین‌های هفته نمایش داده شود
                            </p>
                        </div>
                    </label>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl bg-white/5 px-5 py-2.5 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                        >
                            انصراف
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-[#14c78b] px-6 py-2.5 font-bold text-black transition hover:bg-[#10b77d] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "در حال ثبت..."
                                : "ثبت سریال"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};