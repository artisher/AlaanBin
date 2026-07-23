"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, CreditCard, Tv2, UserPlus } from "lucide-react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqItems = [
        {
            icon: <ShieldCheck size={22} />,
            question: "الان بین در چه کشورهایی قابل استفاده است؟",
            answer:
                "الان بین برای کاربران سراسر دنیا در دسترس است، اما به دلیل قرار گرفتن سرورها در اروپا، کاربران این منطقه بهترین کیفیت و سرعت پخش را تجربه خواهند کرد.",
        },
        {
            icon: <UserPlus size={22} />,
            question: "برای استفاده از سایت باید ثبت‌نام کنم؟",
            answer:
                "بله. برای تماشای فیلم‌ها، مدیریت اشتراک و استفاده از امکانات سایت، ایجاد حساب کاربری الزامی است. ثبت‌نام فقط چند دقیقه زمان می‌برد.",
        },
        {
            icon: <CreditCard size={22} />,
            question: "چطور اشتراک تهیه کنم؟",
            answer:
                "از طریق صفحه خرید اشتراک می‌توانید مستقیماً با پشتیبانی واتساپ ارتباط بگیرید تا اشتراک شما در کوتاه‌ترین زمان فعال شود.",
        },
        {
            icon: <CreditCard size={22} />,
            question: "چه روش‌های پرداختی پشتیبانی می‌شود؟",
            answer:
                "در حال حاضر پرداخت از طریق PayPal و کارت‌های بانکی بین‌المللی امکان‌پذیر است. پشتیبانی از ارزهای دیجیتال نیز به‌زودی اضافه خواهد شد.",
        },
        {
            icon: <Tv2 size={22} />,
            question: "آیا روی تلویزیون هوشمند هم کار می‌کند؟",
            answer:
                "بله. الان بین روی موبایل، تبلت، لپ‌تاپ، تلویزیون‌های هوشمند و Chromecast بدون نیاز به نصب نرم‌افزار قابل استفاده است.",
        },
    ];

    return (
        <section className="min-h-screen bg-[#0B0F14] py-24">

            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}

                <div className="text-center mb-16">

                    <div className="flex justify-center mb-5">

                        <div className="w-18 h-18 rounded-3xl bg-[#14c78b]/10 flex items-center justify-center">

                            <HelpCircle
                                size={36}
                                className="text-[#14c78b]"
                            />

                        </div>

                    </div>

                    <span className="tracking-[6px] text-[#14c78b] font-semibold uppercase">
                        FAQ
                    </span>

                    <h1 className="text-5xl font-extrabold mt-5 text-white">
                        سوالات متداول
                    </h1>

                    <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-8">
                        پاسخ سوالاتی که بیشتر کاربران قبل از خرید اشتراک یا استفاده
                        از الان بین از ما می‌پرسند.
                    </p>

                </div>

                {/* FAQ */}

                <div className="space-y-5">

                    {faqItems.map((item, index) => {

                        const isOpen = openIndex === index;

                        return (

                            <div
                                key={index}
                                className="
                                rounded-3xl
                                bg-[#111827]
                                border
                                border-white/10
                                overflow-hidden
                                transition-all
                                duration-300
                                hover:border-[#14c78b]/40
                                "
                            >

                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    gap-5
                                    px-7
                                    py-6
                                    cursor-pointer
                                    "
                                >

                                    <div className="flex items-center gap-4">

                                        <div
                                            className="
                                            w-12
                                            h-12
                                            rounded-2xl
                                            bg-[#14c78b]/10
                                            flex
                                            items-center
                                            justify-center
                                            text-[#14c78b]
                                            "
                                        >
                                            {item.icon}
                                        </div>

                                        <h2 className="text-lg font-bold text-right text-white">
                                            {item.question}
                                        </h2>

                                    </div>

                                    <ChevronDown
                                        className={`text-[#14c78b] transition-all duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />

                                </button>

                                <div
                                    className={`
                                    transition-all
                                    duration-300
                                    overflow-hidden
                                    ${isOpen
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                        }
                                    `}
                                >

                                    <div
                                        className="
                                        border-t
                                        border-white/10
                                        px-7
                                        py-6
                                        text-gray-400
                                        leading-8
                                        "
                                    >
                                        {item.answer}
                                    </div>

                                </div>

                            </div>

                        );
                    })}

                </div>

                {/* Bottom Section */}

                <div
                    className="
    mt-24
    rounded-[32px]
    border
    border-[#14c78b]/20
    bg-gradient-to-br
    from-[#111827]
    to-[#0F172A]
    p-10
    overflow-hidden
    relative
    "
                >

                    {/* Glow */}

                    <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#14c78b]/10 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-[#14c78b]/5 blur-3xl" />

                    <div className="relative">

                        <h2 className="text-3xl font-bold text-center text-white">
                            پاسخ سؤال خودت رو پیدا نکردی؟
                        </h2>

                        <p
                            className="
            mt-5
            text-gray-400
            leading-8
            text-center
            max-w-2xl
            mx-auto
            "
                        >
                            تیم پشتیبانی الان بین آماده است تا در سریع‌ترین زمان ممکن
                            به تمام سوالات مربوط به اشتراک، پرداخت، حساب کاربری و مشکلات
                            فنی پاسخ دهد.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">

                            <div
                                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-center
                hover:border-[#14c78b]
                transition
                "
                            >

                                <h3 className="text-xl font-bold text-white">
                                    پاسخ سریع
                                </h3>

                                <p className="text-gray-400 mt-3 leading-7">
                                    معمولاً کمتر از چند ساعت پاسخگوی شما هستیم.
                                </p>

                            </div>

                            <div
                                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-center
                hover:border-[#14c78b]
                transition
                "
                            >

                                <h3 className="text-xl font-bold text-white">
                                    پشتیبانی واقعی
                                </h3>

                                <p className="text-gray-400 mt-3 leading-7">
                                    با یک انسان صحبت می‌کنید، نه ربات.
                                </p>

                            </div>

                            <div
                                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-center
                hover:border-[#14c78b]
                transition
                "
                            >

                                <h3 className="text-xl font-bold text-white">
                                    همه روزه
                                </h3>

                                <p className="text-gray-400 mt-3 leading-7">
                                    آماده پاسخگویی به سوالات کاربران هستیم.
                                </p>

                            </div>

                        </div>

                        <div className="flex justify-center mt-12">

                            <a
                                href="https://wa.me/436764479470"
                                className="
                rounded-2xl
                bg-[#14c78b]
                text-black
                font-bold
                px-10
                py-4
                hover:scale-105
                transition-all
                duration-300
                hover:shadow-[0_0_35px_rgba(20,199,139,.45)]
                "
                            >
                                ارتباط با پشتیبانی
                            </a>

                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
}