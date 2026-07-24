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
    MapPin,
} from "lucide-react";

export default function BugReport() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [movie, setMovie] = useState("");
    const [device, setDevice] = useState("");
    const [browser, setBrowser] = useState("");

    const [status, setStatus] = useState<
        "idle" | "loading" | "success"
    >("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus("loading");

        await new Promise((resolve) => setTimeout(resolve, 1800));

        setStatus("success");

        setTitle("");
        setDescription("");
        setMovie("");
        setDevice("");
        setBrowser("");
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

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Left */}

                    <div className="space-y-6">

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

                        <div className="rounded-3xl border border-[#14c78b]/20 bg-[#14c78b]/10 p-7">

                            <h4 className="text-xl font-bold text-[#14c78b]">
                                زمان پاسخگویی
                            </h4>

                            <p className="mt-4 leading-8 text-gray-300">

                                گزارش‌های فنی معمولاً طی
                                <span className="font-bold text-white"> 6 ساعت </span>
                                بررسی می‌شوند.

                            </p>

                        </div>

                    </div>

                    {/* Form */}

                    <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#111827] p-8">

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
                                        onChange={(e) => setTitle(e.target.value)}
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
                    "
                                    />

                                </div>

                            </div>

                            {/* Movie */}

                            <div>

                                <label className="mb-3 block text-white">
                                    فیلم یا سریال (اختیاری)
                                </label>

                                <div className="relative">

                                    <Film
                                        size={20}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                    />

                                    <input
                                        value={movie}
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
                    "
                                    />

                                </div>

                            </div>

                            <div className="grid md:grid-cols-2 gap-6">                    {/* Contact Info */}

                                <div className="space-y-6">


                                    <div
                                        className="
                            rounded-3xl
                            bg-[#111827]
                            border
                            border-white/10
                            p-7
                            space-y-6
                            "
                                    >

                                        <div className="flex items-center gap-5">

                                            <div
                                                className="
                                    w-14
                                    h-14
                                    rounded-2xl
                                    bg-[#14c78b]/10
                                    flex
                                    items-center
                                    justify-center
                                    "
                                            >

                                                <Mail className="text-[#14c78b]" />

                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-500">
                                                    ایمیل پشتیبانی
                                                </p>

                                                <p className="text-white font-semibold">
                                                    support@alanbin.com
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center gap-5">

                                            

                                            

                                        </div>

                                        <div className="flex items-center gap-5">

                                            <div
                                                className="
                                    w-14
                                    h-14
                                    rounded-2xl
                                    bg-[#14c78b]/10
                                    flex
                                    items-center
                                    justify-center
                                    "
                                            >

                                                <Clock3 className="text-[#14c78b]" />

                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-500">
                                                    زمان پاسخگویی
                                                </p>

                                                <p className="text-white font-semibold">
                                                    معمولاً کمتر از 6 ساعت
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                  

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}