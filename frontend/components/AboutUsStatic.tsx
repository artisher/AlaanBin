"use client";

import {
    BadgeCheck,
    Film,
    Globe,
    MonitorPlay,
} from "lucide-react";

const items = [
    {
        icon: Film,
        title: "آرشیو همیشه در حال رشد",
        text: "فیلم‌ها و سریال‌های جدید به‌صورت مداوم به آرشیو اضافه می‌شوند تا همیشه محتوای تازه برای تماشا داشته باشید.",
    },
    {
        icon: Globe,
        title: "مخصوص ایرانیان اروپا",
        text: "سرورهای بهینه‌شده برای اروپا باعث می‌شوند بدون قطعی و با سرعت بالا فیلم تماشا کنید.",
    },
    {
        icon: MonitorPlay,
        title: "پخش روان",
        text: "بدون تبلیغات، بدون انتظار و با کیفیت پایدار در تمام دستگاه‌ها.",
    },
    {
        icon: BadgeCheck,
        title: "اشتراک ساده",
        text: "تنها با یک اشتراک به تمام محتوای سایت دسترسی خواهید داشت.",
    },
];

export default function StatsSection() {
    return (
        <section className="bg-[#0B0F14] py-24">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <span className="tracking-[5px] text-[#14c78b] font-semibold">
                        EXPERIENCE
                    </span>

                    <h2 className="mt-4 text-4xl font-extrabold text-white">
                        تجربه‌ای که منتظرش بودی
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-gray-400 leading-8">
                        الان بین فقط یک سایت برای تماشای فیلم نیست؛
                        هدف ما ساختن یک تجربه سریع، ساده و لذت‌بخش برای
                        ایرانیان خارج از کشور است.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 gap-7 mt-16">

                    {items.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="
                                group
                                rounded-3xl
                                border
                                border-white/10
                                bg-[#111827]
                                p-8
                                transition-all
                                duration-500
                                hover:border-[#14c78b]
                                hover:-translate-y-2
                                "
                            >

                                <div className="flex gap-5">

                                    <div
                                        className="
                                        w-16
                                        h-16
                                        rounded-2xl
                                        bg-[#14c78b]/10
                                        flex
                                        items-center
                                        justify-center
                                        group-hover:bg-[#14c78b]
                                        transition
                                        "
                                    >

                                        <Icon
                                            size={30}
                                            className="
                                            text-[#14c78b]
                                            group-hover:text-black
                                            transition
                                            "
                                        />

                                    </div>

                                    <div>

                                        <h3 className="text-2xl font-bold text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-4 text-gray-400 leading-8">
                                            {item.text}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        );
                    })}

                </div>

            </div>

        </section>
    );
}