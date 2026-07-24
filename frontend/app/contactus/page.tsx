"use client";

import { useState } from "react";
import {
    Mail,
    MessageSquare,
    User,
    Send,
    CheckCircle2,
    Phone,
    MapPin
} from "lucide-react";

export default function ContactUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus("loading");

        await new Promise(resolve => setTimeout(resolve, 1800));

        setStatus("success");

        setName("");
        setEmail("");
        setMessage("");
    };

    return (

        <section className="bg-[#0B0F14] min-h-screen py-24">

            <div className="max-w-7xl mx-auto px-6">

                {/* Hero */}

                <div className="text-center mb-20">

                    <span className="text-[#14c78b] tracking-[5px] uppercase font-semibold">
                        CONTACT US
                    </span>

                    <h1 className="text-5xl font-extrabold mt-5 text-white">
                        با ما در ارتباط باش
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto mt-6 leading-9 text-lg">
                        اگر سوال، پیشنهاد یا مشکلی داری خوشحال می‌شیم ازت بشنویم.
                        تیم الان بین همیشه آماده پاسخگویی به کاربران خودشه.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Form */}

                    <div
                        className="
                        rounded-3xl
                        bg-[#111827]
                        border
                        border-white/10
                        p-8
                        "
                    >

                        <h2 className="text-2xl font-bold mb-8  text-white">
                            ارسال پیام
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            <div>

                                <label className="block mb-3  text-white placeholder:text-white">
                                    نام
                                </label>

                                <div className="relative">

                                    <User
                                        size={20}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                    />

                                    <input
                                        type="text"
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="نام شما"

                                        className="
                                        w-full
                                        h-14
                                        text-white
                                        rounded-xl
                                        bg-[#0B0F14]
                                        border
                                        border-white/10
                                        pr-12
                                        pl-4
                                        outline-none
                                        transition
                                        focus:border-[#14c78b]
                                        placeholder:text-white
                                        "
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block mb-3  text-white">
                                    ایمیل
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={20}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14c78b]"
                                    />

                                    <input

                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@email.com"

                                        className="
                                        w-full
                                        h-14
                                        rounded-xl
                                        bg-[#0B0F14]
                                        border
                                          placeholder:text-white
                                        border-white/10
                                        pr-12
                                        pl-4
                                        outline-none
                                        transition
                                        text-white
                                        focus:border-[#14c78b]
                                        "
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block mb-3 text-gray-300">
                                    پیام
                                </label>

                                <div className="relative">

                                    <MessageSquare
                                        size={20}
                                        className="absolute right-4 top-5 text-[#14c78b]"
                                    />

                                    <textarea
                                        rows={6}
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="پیام خود را بنویسید..."

                                        className="
                                        w-full
                                        text-white
                                        rounded-xl
                                        bg-[#0B0F14]
                                        border
                                        border-white/10
                                        pr-12
                                        pl-4
                                        pt-4
                                        outline-none
                                        resize-none
                                        transition
                                        focus:border-[#14c78b]
                                          placeholder:text-white
                                        "
                                    />

                                </div>

                            </div>

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
                                transition
                                hover:scale-[1.02]
                                hover:shadow-[0_0_30px_rgba(20,199,139,.4)]
                                cursor-pointer
                                "
                            >

                                <Send size={20} />

                                ارسال پیام

                            </button>

                            {status === "loading" && (

                                <div className="text-center text-gray-400">
                                    در حال ارسال پیام...
                                </div>

                            )}

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

                                    پیام شما با موفقیت ارسال شد.

                                </div>

                            )}

                        </form>

                    </div>
                    {/* Contact Info */}

                    <div className="space-y-8">

                        <div
                            className="
                            rounded-3xl
                            bg-[#111827]
                            border
                            border-white/10
                            p-8
                            "
                        >

                            <h2 className="text-2xl font-bold mb-8  text-white">
                                اطلاعات تماس
                            </h2>

                            <div className="space-y-6">

                                <div className="flex items-start gap-5">

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

                                        <h3 className="font-bold text-lg  text-white">
                                            ایمیل
                                        </h3>

                                        <p className="text-gray-400 mt-2">
                                            support@alanbin.com
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-5">

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
                                        <Phone className="text-[#14c78b]" />
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg  text-white" >
                                            پشتیبانی
                                        </h3>

                                        <p className="text-gray-400 mt-2 leading-8">
                                            پاسخگویی از طریق ایمیل و واتساپ
                                            <br />
                                            همه روزه از ساعت ۹ تا ۲۳
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-5">

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
                                        <MapPin className="text-[#14c78b]" />
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg  text-white">
                                            محل فعالیت
                                        </h3>

                                        <p className="text-gray-400 mt-2 leading-8">
                                            خدمات <span className="font-bold text-white">الان بین</span> برای کاربران
                                            فارسی‌زبان مقیم اروپا ارائه می‌شود.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div
                            className="
                            rounded-3xl
                            border
                            border-[#14c78b]/20
                            bg-gradient-to-br
                            from-[#14c78b]/10
                            to-[#111827]
                            p-8
                            "
                        >

                            <h3 className="text-2xl font-bold  text-white">
                                همیشه کنار شما هستیم
                            </h3>

                            <p className="mt-5 text-gray-300 leading-9">
                                اگر درباره اشتراک، پخش فیلم‌ها، مشکلات حساب کاربری
                                یا هر موضوع دیگری سوالی دارید، تیم پشتیبانی الان بین
                                در کوتاه‌ترین زمان ممکن پاسخگوی شما خواهد بود.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}