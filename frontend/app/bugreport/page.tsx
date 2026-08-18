"use client";

import { useState } from "react";
import {
    Bug,
    Send,
    CheckCircle2,
    Monitor,
    Globe,
    Film,
    FileText,
    Clock3,
    Mail,
} from "lucide-react";

export default function BugReport() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [movie, setMovie] = useState("");
    const [device, setDevice] = useState("");
    const [browser, setBrowser] = useState("");

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setStatus("loading");

            const res = await fetch("/api/requests", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "bug",
                    subject: title.trim(),
                    message: description.trim(),
                    movieTitle: movie.trim(),
                    page: `${device.trim()} - ${browser.trim()}`,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "خطا در ثبت گزارش");
            }

            setStatus("success");

            setTitle("");
            setDescription("");
            setMovie("");
            setDevice("");
            setBrowser("");
        } catch (error) {
            console.error("BUG REPORT ERROR:", error);
            setStatus("error");
        }
    };

    return (
        <section className="min-h-screen bg-[#0B0F14] py-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Hero */}
                <div className="text-center mb-14">

                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#14c78b]/10 border border-[#14c78b]/20">
                        <Bug
                            size={46}
                            className="text-[#14c78b]"
                        />
                    </div>

                    <span className="tracking-[5px] uppercase text-[#14c78b] font-semibold">
                        BUG REPORT
                    </span>

                    <h1 className="mt-5 text-5xl font-extrabold text-white">
                        گزارش مشکل
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto leading-9 text-gray-400">
                        اگر هنگام استفاده از AlanBin با هرگونه مشکل یا خطا
                        روبه‌رو شدید، لطفاً جزئیات آن را برای ما ارسال کنید.
                        گزارش‌های شما مستقیماً توسط تیم فنی بررسی می‌شوند و
                        به بهبود کیفیت سرویس کمک می‌کنند.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Left Side */}
                    <div className="space-y-6">

                        {/* Before Report */}
                        <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">

                            <Film
                                className="text-[#14c78b]"
                                size={34}
                            />

                            <h3 className="mt-6 text-2xl font-bold text-white">
                                قبل از ارسال گزارش
                            </h3>

                            <ul className="mt-6 space-y-4 text-gray-400 leading-8">

                                <li>
                                    • نام فیلم یا سریال را وارد کنید.
                                </li>

                                <li>
                                    • در صورت امکان دستگاه و مرورگر خود را بنویسید.
                                </li>

                                <li>
                                    • مراحل ایجاد مشکل را توضیح دهید.
                                </li>

                                <li>
                                    • هرچه اطلاعات بیشتری بنویسید،
                                    مشکل سریع‌تر بررسی می‌شود.
                                </li>

                            </ul>
                        </div>

                        {/* Response Time */}
                        <div className="rounded-3xl border border-[#14c78b]/20 bg-[#14c78b]/10 p-7">

                            <div className="flex items-center gap-4">

                                <Clock3
                                    size={28}
                                    className="text-[#14c78b]"
                                />

                                <h4 className="text-xl font-bold text-[#14c78b]">
                                    زمان پاسخگویی
                                </h4>

                            </div>

                            <p className="mt-4 leading-8 text-gray-300">
                                گزارش‌های فنی معمولاً طی
                                <span className="font-bold text-white">
                                    {" "}6 ساعت{" "}
                                </span>
                                بررسی می‌شوند.
                            </p>
                        </div>

                        {/* Support */}
                        <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">

                            <div className="flex items-center gap-4">

                                <Mail
                                    size={28}
                                    className="text-[#14c78b]"
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        ایمیل پشتیبانی
                                    </p>

                                    <p className="mt-1 text-white font-semibold">
                                        support@alanbin.com
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">

                        <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                            <h2 className="text-2xl font-bold text-white mb-8">
                                ارسال گزارش
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* Title */}
                                <div>

                                    <label className="mb-3 block text-white">
                                        عنوان مشکل
                                    </label>

                                    <div className="relative">

                                        <Bug
                                            size={20}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                        />

                                        <input
                                            value={title}
                                            required
                                            disabled={status === "loading"}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            placeholder="مثلاً فیلم پخش نمی‌شود"
                                            className="
                                            w-full
                                            h-14
                                            rounded-xl
                                            bg-[#0B0F14]
                                            border
                                            border-white/10
                                            pr-12
                                            pl-4
                                            text-white
                                            placeholder:text-gray-500
                                            outline-none
                                            transition
                                            focus:border-[#14c78b]
                                            disabled:opacity-50
                                            "
                                        />

                                    </div>
                                </div>

                                {/* Description */}
                                <div>

                                    <label className="mb-3 block text-white">
                                        شرح کامل مشکل
                                    </label>

                                    <div className="relative">

                                        <FileText
                                            size={20}
                                            className="absolute right-4 top-5 text-[#14c78b]"
                                        />

                                        <textarea
                                            rows={6}
                                            required
                                            disabled={status === "loading"}
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder="مثلاً بعد از زدن دکمه پخش، صفحه سیاه می‌شود و فیلم اجرا نمی‌شود..."
                                            className="
                                            w-full
                                            resize-none
                                            rounded-xl
                                            bg-[#0B0F14]
                                            border
                                            border-white/10
                                            pr-12
                                            pt-4
                                            pl-4
                                            text-white
                                            placeholder:text-gray-500
                                            outline-none
                                            transition
                                            focus:border-[#14c78b]
                                            disabled:opacity-50
                                            "
                                        />

                                    </div>
                                </div>

                                {/* Movie */}
                                <div>

                                    <label className="mb-3 block text-white">
                                        فیلم یا سریال
                                        <span className="text-gray-500 text-sm mr-2">
                                            (اختیاری)
                                        </span>
                                    </label>

                                    <div className="relative">

                                        <Film
                                            size={20}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                        />

                                        <input
                                            value={movie}
                                            disabled={status === "loading"}
                                            onChange={(e) =>
                                                setMovie(e.target.value)
                                            }
                                            placeholder="مثلاً شهرزاد - قسمت ۳"
                                            className="
                                            w-full
                                            h-14
                                            rounded-xl
                                            bg-[#0B0F14]
                                            border
                                            border-white/10
                                            pr-12
                                            pl-4
                                            text-white
                                            placeholder:text-gray-500
                                            outline-none
                                            transition
                                            focus:border-[#14c78b]
                                            disabled:opacity-50
                                            "
                                        />

                                    </div>
                                </div>

                                {/* Device + Browser */}
                                <div className="grid md:grid-cols-2 gap-6">

                                    {/* Device */}
                                    <div>

                                        <label className="mb-3 block text-white">
                                            دستگاه
                                            <span className="text-gray-500 text-sm mr-2">
                                                (اختیاری)
                                            </span>
                                        </label>

                                        <div className="relative">

                                            <Monitor
                                                size={20}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                            />

                                            <input
                                                value={device}
                                                disabled={status === "loading"}
                                                onChange={(e) =>
                                                    setDevice(e.target.value)
                                                }
                                                placeholder="مثلاً Samsung TV / Windows PC"
                                                className="
                                                w-full
                                                h-14
                                                rounded-xl
                                                bg-[#0B0F14]
                                                border
                                                border-white/10
                                                pr-12
                                                pl-4
                                                text-white
                                                placeholder:text-gray-500
                                                outline-none
                                                transition
                                                focus:border-[#14c78b]
                                                disabled:opacity-50
                                                "
                                            />

                                        </div>
                                    </div>

                                    {/* Browser */}
                                    <div>

                                        <label className="mb-3 block text-white">
                                            مرورگر
                                            <span className="text-gray-500 text-sm mr-2">
                                                (اختیاری)
                                            </span>
                                        </label>

                                        <div className="relative">

                                            <Globe
                                                size={20}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                            />

                                            <input
                                                value={browser}
                                                disabled={status === "loading"}
                                                onChange={(e) =>
                                                    setBrowser(e.target.value)
                                                }
                                                placeholder="مثلاً Chrome / Samsung Browser"
                                                className="
                                                w-full
                                                h-14
                                                rounded-xl
                                                bg-[#0B0F14]
                                                border
                                                border-white/10
                                                pr-12
                                                pl-4
                                                text-white
                                                placeholder:text-gray-500
                                                outline-none
                                                transition
                                                focus:border-[#14c78b]
                                                disabled:opacity-50
                                                "
                                            />

                                        </div>
                                    </div>

                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="
                                    w-full
                                    h-14
                                    rounded-xl
                                    bg-[#14c78b]
                                    text-black
                                    font-bold
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    transition
                                    hover:scale-[1.02]
                                    hover:shadow-[0_0_30px_rgba(20,199,139,.4)]
                                    cursor-pointer
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:hover:scale-100
                                    "
                                >

                                    <Send size={20} />

                                    {status === "loading"
                                        ? "در حال ارسال..."
                                        : "ارسال گزارش"
                                    }

                                </button>

                                {/* Success */}
                                {status === "success" && (
                                    <div
                                        className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-[#14c78b]/10
                                        border
                                        border-[#14c78b]/30
                                        py-4
                                        text-[#14c78b]
                                        "
                                    >

                                        <CheckCircle2 size={20} />

                                        گزارش شما با موفقیت ثبت شد.

                                    </div>
                                )}

                                {/* Error */}
                                {status === "error" && (
                                    <div
                                        className="
                                        rounded-xl
                                        border
                                        border-red-500/20
                                        bg-red-500/10
                                        py-4
                                        text-center
                                        text-red-400
                                        "
                                    >
                                        ثبت گزارش با خطا مواجه شد.
                                        لطفاً دوباره تلاش کنید.
                                    </div>
                                )}

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}