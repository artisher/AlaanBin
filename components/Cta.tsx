import { Sparkles } from "lucide-react";
import { CtaBtns } from "./CtaBtns";

export const Cta = () => {
    return (
        <section className="relative overflow-hidden border-y border-white/10">

            {/* Background */}
            <div className="absolute inset-0 bg-[url('/Images/CtaImg.png')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/95 via-[#0B0F14]/80 to-[#0B0F14]/95" />

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14c78b]/20 blur-[120px]" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#14c78b]/30 bg-[#14c78b]/10 text-[#14c78b]">
                    <Sparkles size={32} />
                </div>

                <span className="mb-4 rounded-full border border-[#14c78b]/20 bg-[#14c78b]/10 px-4 py-1 text-sm font-medium text-[#14c78b]">
                    تماشا را همین امروز شروع کن
                </span>

                <h2 className="max-w-3xl text-4xl font-extrabold leading-relaxed text-white md:text-5xl">
                    هزاران فیلم و سریال
                    <span className="text-[#14c78b]"> بدون تبلیغات </span>
                    و با بهترین کیفیت
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                    تنها با چند کلیک عضو AlanBin شوید، اشتراک خود را فعال کنید
                    و از آرشیو کامل فیلم‌ها و سریال‌ها لذت ببرید.
                </p>

                <div className="mt-10">
                    <CtaBtns />
                </div>

            </div>

        </section>
    );
};