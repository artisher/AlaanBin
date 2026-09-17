"use client";

import { useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(false);

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
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title.trim()) {
            toast.error("عنوان سریال را وارد کنید");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/series`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: form.title.trim(),

                        aliases: form.aliases
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),

                        description: form.description,

                        poster: form.poster,

                        rating: form.rating
                            ? Number(form.rating)
                            : undefined,

                        topWeek: form.topWeek,

                        genre: form.genre
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),

                        year: form.year
                            ? Number(form.year)
                            : undefined,

                        product: form.product,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "خطا در ثبت سریال"
                );
            }

            toast.success("سریال با موفقیت اضافه شد");

            onSave(data.series);
            onClose();
        } catch (error: any) {
            console.error("CREATE SERIES ERROR:", error);

            toast.error(
                error.message || "خطا در ثبت سریال"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-2xl rounded-xl bg-[#111827] p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        افزودن سریال
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                        placeholder="عنوان سریال"
                        className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                    />

                    <input
                        value={form.aliases}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                aliases: e.target.value,
                            })
                        }
                        placeholder="Aliasها با کاما جدا شوند"
                        className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                    />

                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                        placeholder="توضیحات"
                        rows={4}
                        className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                    />

                    <input
                        value={form.poster}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                poster: e.target.value,
                            })
                        }
                        placeholder="آدرس پوستر"
                        className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                    />

                    <div className="grid grid-cols-2 gap-4">
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
                            placeholder="امتیاز"
                            className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                        />

                        <input
                            type="number"
                            value={form.year}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    year: e.target.value,
                                })
                            }
                            placeholder="سال"
                            className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                        />
                    </div>

                    <input
                        value={form.genre}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                genre: e.target.value,
                            })
                        }
                        placeholder="ژانرها، مثال: درام, جنایی"
                        className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                    />

                    <input
                        value={form.product}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                product: e.target.value,
                            })
                        }
                        placeholder="محصول"
                        className="w-full rounded-lg bg-gray-900 p-3 text-white outline-none"
                    />

                    <label className="flex items-center gap-2 text-white">
                        <input
                            type="checkbox"
                            checked={form.topWeek}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    topWeek: e.target.checked,
                                })
                            }
                        />

                        برترین‌های هفته
                    </label>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-gray-700 px-5 py-2 text-white"
                        >
                            انصراف
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-[#14c78b] px-5 py-2 font-bold text-black disabled:opacity-50"
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