"use client";

import { useState } from "react";
import { UserPlus, CreditCard, PlayCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Step() {
    const router = useRouter();

    const [step, setStep] = useState(0);

    const steps = [
        {
            icon: <UserPlus size={42} />,
            badge: "گام اول",
            title: "حساب کاربری بسازید",
            description:
                "در کمتر از یک دقیقه ثبت‌نام کنید و حساب شخصی خودتان را در AlanBin ایجاد کنید.",
            button: "ثبت‌نام",
            href: "/register",
        },
        {
            icon: <CreditCard size={42} />,
            badge: "گام دوم",
            title: "اشتراک خود را فعال کنید",
            description:
                "پلن مناسب خود را انتخاب کنید تا به آرشیو کامل فیلم‌ها و سریال‌ها دسترسی داشته باشید.",
            button: "مشاهده اشتراک‌ها",
            href: "/subscription",
        },
        {
            icon: <PlayCircle size={42} />,
            badge: "گام سوم",
            title: "از تماشا لذت ببرید",
            description:
                "همه چیز آماده است؛ بدون تبلیغات، با کیفیت بالا و بدون محدودیت فیلم ببینید.",
            button: "مشاهده فیلم‌ها",
            href: "/home",
        },
    ];

    return (
        <section className="py-14 px-5">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="text-center mb-14">

                    <span className="text-[#14c78b] font-semibold">
                        شروع استفاده از AlanBin
                    </span>

                    <h2 className="mt-3 text-4xl font-bold text-white">
                        فقط در سه مرحله
                    </h2>

                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto leading-8">
                        کمتر از دو دقیقه زمان نیاز دارید تا ثبت‌نام کنید،
                        اشتراک بگیرید و تماشای فیلم‌ها را شروع کنید.
                    </p>

                </div>

                {/* Progress */}

                <div className="flex justify-center items-center gap-4 mb-8">

                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center"
                        >
                            <div
                                className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                    transition-all
                    duration-300
                    ${index <= step
                                        ? "bg-[#14c78b] text-black"
                                        : "bg-[#1a1f27] border border-gray-700 text-gray-400"
                                    }
                `}
                            >
                                {index + 1}
                            </div>

                            {index !== steps.length - 1 && (
                                <div
                                    className={`
                        w-14
                        h-[2px]
                        ${index < step
                                            ? "bg-[#14c78b]"
                                            : "bg-gray-700"
                                        }
                    `}
                                />
                            )}
                        </div>
                    ))}

                </div>

                {/* Card */}

                <div
                    className="
                    rounded-3xl
                    border
                    border-[#14c78b]/20
                    bg-[#111827]
                    p-7
                    shadow-[0_0_40px_rgba(20,199,139,.08)]
                    text-center
                "
                >

                    <div
                        className="
                      w-16 h-16
                        rounded-full
                        bg-[#14c78b]/10
                        border
                        border-[#14c78b]/30
                        flex
                        items-center
                        justify-center
                        text-[#14c78b]
                        mx-auto
                        mb-6
                    "
                    >
                        {steps[step].icon}
                    </div>

                    <span className="text-[#14c78b] font-semibold">
                        {steps[step].badge}
                    </span>

                    <h3 className="mt-3 text-2xl font-bold text-white">
                        {steps[step].title}
                    </h3>

                    <p className="mt-5 text-gray-400 leading-8 max-w-xl mx-auto">
                        {steps[step].description}
                    </p>

                    <button
                        onClick={() => router.push(steps[step].href)}
                        className="
                       mt-6
                        bg-[#14c78b]
                        hover:bg-[#11b07a]
                        text-black
                        font-bold
                        px-8
                        py-3
                        rounded-xl
                        transition
                        cursor-pointer
                    "
                    >
                        {steps[step].button}
                    </button>

                    {/* Navigation */}

                    <div className="flex justify-between mt-10">

                        <button
                            disabled={step === 0}
                            onClick={() => setStep(step - 1)}
                            className="
                            flex
                            items-center
                            gap-2
                            text-gray-400
                            hover:text-white
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition
                            cursor-pointer
                        "
                        >
                            <ArrowRight size={18} />
                            مرحله قبل
                        </button>

                        <button
                            disabled={step === steps.length - 1}
                            onClick={() => setStep(step + 1)}
                            className="
                            flex
                            items-center
                            gap-2
                            text-[#14c78b]
                            hover:text-white
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition
                            cursor-pointer"
                        >
                            مرحله بعد
                            <ArrowLeft size={18} />
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}