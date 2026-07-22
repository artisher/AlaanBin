"use client";

import { Ban, LockKeyholeOpen, Tv } from "lucide-react";

const features = [
    {
        icon: Tv,
        title: "کیفیت سینمایی",
        description:
            "تمام فیلم‌ها و سریال‌ها با بالاترین کیفیت تصویر و صدا در اختیار شما قرار می‌گیرند تا تجربه‌ای نزدیک به سینما داشته باشید.",
    },
    {
        icon: Ban,
        title: "بدون تبلیغات",
        description:
            "هیچ تبلیغ مزاحمی وسط فیلم نمایش داده نمی‌شود. فقط فیلم ببین و از تماشا لذت ببر.",
    },
    {
        icon: LockKeyholeOpen,
        title: "دسترسی نامحدود",
        description:
            "با یک اشتراک به کل آرشیو فیلم و سریال‌های ایرانی دسترسی داری؛ بدون محدودیت و بدون دردسر.",
    },
];

export const WhyUsCards = () => {
    return (
        <section className="relative overflow-hidden bg-[#0B0F14] py-24">

            <div className="absolute inset-0 bg-[url('/Images/bgWhyUs.png')] bg-cover bg-center opacity-10" />

            <div className="relative max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">

                    <span className="text-[#14c78b] font-semibold tracking-widest uppercase">
                        WHY ALANBIN
                    </span>

                    <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white">
                        چرا الان بین؟
                    </h2>

                    <p className="mt-5 text-gray-400 max-w-2xl mx-auto leading-8">
                        تجربه‌ای متفاوت از تماشای فیلم و سریال ایرانی؛ سریع، بدون تبلیغات
                        و با کیفیتی که شایسته‌ی شماست.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-3">

                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="
                group
                rounded-3xl
                bg-[#111827]
                border
                border-white/10
                p-8
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-[#14c78b]
                hover:shadow-[0_0_35px_rgba(20,199,139,.25)]
                "
                            >

                                <div
                                    className="
                  w-20
                  h-20
                  rounded-2xl
                  bg-[#14c78b]/10
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  group-hover:bg-[#14c78b]
                  "
                                >

                                    <Icon
                                        size={38}
                                        className="text-[#14c78b] group-hover:text-black transition-all duration-500"
                                    />

                                </div>

                                <h3 className="mt-8 text-2xl font-bold text-white">
                                    {item.title}
                                </h3>

                                <div className="w-16 h-1 bg-[#14c78b] rounded-full mt-4 mb-6 group-hover:w-24 transition-all duration-500" />

                                <p className="text-gray-400 leading-8">
                                    {item.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
};