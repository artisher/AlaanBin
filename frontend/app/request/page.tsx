"use client";

import { useState } from "react";
import {
    Film,
    Tv,
    Clapperboard,
    Send,
    MessageSquare,
    CheckCircle2,
} from "lucide-react";

export default function Request() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus("loading");

        await new Promise((r) => setTimeout(r, 1800));

        setStatus("success");
    };

    return (
        <section className="min-h-screen bg-[#0B0F14] py-20 px-6">

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="text-center mb-14">

                    <span className="tracking-[5px] text-[#14c78b] font-semibold">
                        REQUEST CONTENT
                    </span>

                    <h1 className="mt-4 text-5xl font-extrabold text-white">
                        درخواست فیلم یا سریال
                    </h1>

                    <p className="mt-5 text-gray-400 leading-8 max-w-2xl mx-auto">
                        اگر محتوای مورد نظر شما در آرشیو الان بین وجود ندارد،
                        درخواست خود را ثبت کنید. تیم ما پس از بررسی، در صورت
                        امکان آن را به آرشیو اضافه خواهد کرد.
                    </p>

                </div>

                {/* Card */}

                <div
                    className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-8
                    shadow-[0_0_40px_rgba(20,199,139,.08)]
                    "
                >

                    <form
                        onSubmit={submitHandler}
                        className="space-y-7"
                    >

                        {/* Type */}

                        <div>

                            <label className="block mb-3 text-white font-medium">
                                نوع درخواست
                            </label>

                            <div className="relative">

                                <Clapperboard
                                    size={20}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                />

                                <select
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
                                    outline-none
                                    focus:border-[#14c78b]
                                    cursor-pointer
                                    "
                                >
                                    <option>انتخاب کنید</option>
                                    <option>فیلم</option>
                                    <option>سریال</option>
                                    <option>فصل جدید سریال</option>
                                    <option>انیمیشن</option>
                                </select>

                            </div>

                        </div>

                        {/* Title */}

                        <div>

                            <label className="block mb-3 text-white font-medium">
                                نام فیلم یا سریال
                            </label>

                            <div className="relative">

                                <Film
                                    size={20}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                />

                                <input
                                    type="text"
                                    placeholder="مثلاً: The Last of Us"
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
                                    focus:border-[#14c78b]
                                    "
                                />

                            </div>

                        </div>

                        {/* Details */}

                        <div>

                            <label className="block mb-3 text-white font-medium">
                                توضیحات (اختیاری)
                            </label>

                            <div className="relative">

                                <MessageSquare
                                    size={20}
                                    className="absolute right-4 top-5 text-[#14c78b]"
                                />

                                <textarea
                                    rows={5}
                                    placeholder="اگر نسخه خاص، دوبله، زیرنویس یا فصل مشخصی مدنظر دارید بنویسید..."
                                    className="
                                    w-full
                                    rounded-xl
                                    bg-[#0B0F14]
                                    border
                                    border-white/10
                                    pr-12
                                    pl-4
                                    pt-4
                                    resize-none
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    focus:border-[#14c78b]
                                    "
                                />

                            </div>

                        </div>

                        {/* Button */}

                        <button
                            type="submit"
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
                            cursor-pointer
                            transition
                            hover:scale-[1.02]
                            hover:shadow-[0_0_30px_rgba(20,199,139,.35)]
                            "
                        >

                            <Send size={20} />

                            ثبت درخواست

                        </button>

                        {status === "loading" && (
                            <p className="text-center text-gray-400">
                                در حال ثبت درخواست...
                            </p>
                        )}

                        {status === "success" && (
                            <div
                                className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-[#14c78b]/30
                                bg-[#14c78b]/10
                                py-4
                                text-[#14c78b]
                                "
                            >

                                <CheckCircle2 size={20} />

                                درخواست شما با موفقیت ثبت شد.

                            </div>
                        )}

                    </form>

                </div>

            </div>

        </section>
    );
}