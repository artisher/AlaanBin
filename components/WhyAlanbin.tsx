import { Ban, Database, ServerCog } from "lucide-react";

const features = [
    {
        icon: Database,
        title: "آرشیو کامل ایرانی",
        description:
            "دسترسی به مجموعه‌ای از فیلم‌ها و سریال‌های ایرانی با بروزرسانی مداوم.",
    },
    {
        icon: ServerCog,
        title: "سرورهای پرسرعت اروپا",
        description:
            "استریم روان و بدون قطعی برای کاربران آلمان، اتریش و سایر کشورهای اروپا.",
    },
    {
        icon: Ban,
        title: "بدون تبلیغات مزاحم",
        description:
            "فیلم و سریال‌ها را بدون وقفه و بدون نمایش تبلیغات تماشا کنید.",
    },
];

export const WhyAlanbin = () => {
    return (
        <section className="relative overflow-hidden py-20 border-b border-white/10">

            <div className="absolute inset-0 -z-10 bg-[url('/Images/arrow.png')] bg-cover bg-center opacity-20" />

            <div className="max-w-7xl mx-auto px-5">

                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-white">
                        چرا AlanBin؟
                    </h2>

                    <div className="w-24 h-1 rounded-full bg-[#14c78b] mx-auto mt-4" />

                    <p className="text-gray-400 mt-5">
                        تجربه‌ای متفاوت برای تماشای فیلم و سریال ایرانی
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="
                                    group
                                    rounded-2xl
                                    border
                                    border-[#14c78b]/20
                                    bg-[#111827]/80
                                    backdrop-blur-xl
                                    p-8
                                    text-center
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:border-[#14c78b]
                                    hover:shadow-[0_0_35px_rgba(20,199,139,.25)]
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        mb-6
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#14c78b]/10
                                        border
                                        border-[#14c78b]/20
                                        transition-all
                                        duration-300
                                        group-hover:scale-110
                                        group-hover:bg-[#14c78b]/20
                                    "
                                >
                                    <Icon
                                        size={42}
                                        className="text-[#14c78b]"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-gray-400 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};