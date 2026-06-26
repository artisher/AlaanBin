"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const urlHandler = () => {
        if (step === 1) {
            router.push("/register")
        }
        if (step === 2) {
            router.push("/subscription")
        }
        if (step === 3) {
            router.push("/home")
        }
    }
    const steps = [
        {
            title: "گام اول: ثبت نام",
            desc: "برای شروع، از طریق دکمه زیر در سایت ثبت‌نام کنید تا حساب کاربری بسازید.",
            action: "ثبت‌نام",
        },
        {
            title: "گام دوم: خرید اشتراک",
            desc: "بعد از ثبت‌نام، از بخش اشتراک‌ها وارد شوید و پلن موردنظرتان را انتخاب کنید.",
            action: "رفتن به اشتراک‌ها",
        },
        {
            title: "گام سوم: شروع تماشا!",
            desc: "تبریک! حالا می‌تونی همه‌ی فیلم‌ها و سریال‌ها رو بدون محدودیت تماشا کنی.",
            action: "مشاهده فیلم‌ها",
        },
    ];

    return (
        <div className="my-7 flex flex-col gap-4">

            <h1 className="text-white text-3xl text-center font-bold mb-10 md:mb-15">از کجا شروع کنیم ؟</h1>
            <div className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-linear-to-br from-[#11171f] bg-[#05070a] text-white shadow-lg border border-gray-800">
                <div className="flex justify-between mb-6">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 h-2 mx-1 rounded-full transition-all ${step === i + 1
                                ? "bg-[#14c78b]"
                                : "bg-gray-700"
                                }`}
                        />
                    ))}
                </div>

                <h2 className="text-2xl font-bold mb-4">{steps[step - 1].title}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    {steps[step - 1].desc}
                </p>

                <button
                    className="w-full py-3 cursor-pointer rounded-lg text-black font-semibold bg-[#14c78b] hover:bg-[#11b07a] transition"
                    onClick={() => {
                        if (step < 3) setStep(step + 1);
                    }}
                >
                    مرحله بعد
                </button>
                <button
                    className="w-full py-3 rounded-lg text-primary font-semibold cursor-pointer"
                    onClick={urlHandler}
                >
                    {steps[step - 1].action}
                </button>
                {step > 1 && (
                    <button
                        className="w-full py-2 mt-4 text-gray-300 hover:text-white text-sm cursor-pointer"
                        onClick={() => setStep(step - 1)}
                    >
                        برگشت به مرحله قبل
                    </button>
                )}
            </div>
        </div>
    );
}
