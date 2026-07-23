import Link from "next/link";
import {
    Film,
    Rocket,
    Sparkles,
    Tv,
    ArrowRight
} from "lucide-react";

export default function AboutUs() {
    return (
        <section className="bg-[#0B0F14] text-white py-24">

            <div className="max-w-7xl mx-auto px-6">

                {/* Hero */}

                <div className="text-center max-w-4xl mx-auto">

                    <span className="inline-block rounded-full border border-[#14c78b]/30 bg-[#14c78b]/10 px-5 py-2 text-sm font-semibold text-[#14c78b]">
                        درباره AlanBin
                    </span>

                    <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight">
                        سینمای ایران،
                        <span className="text-[#14c78b]"> همیشه کنار شما</span>
                    </h1>

                    <p className="mt-8 text-lg leading-9 text-gray-400">
                        الان بین برای ایرانیان مقیم اروپا ساخته شده؛
                        جایی که بتوانید بدون دردسر،
                        فیلم‌ها و سریال‌های ایرانی را
                        با کیفیت بالا، سرعت فوق‌العاده
                        و بدون تبلیغات تماشا کنید.
                    </p>

                </div>

                {/* Features */}

                <div className="grid lg:grid-cols-3 gap-8 mt-24">

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-9 transition duration-300 hover:-translate-y-2 hover:border-[#14c78b] hover:shadow-[0_0_35px_rgba(20,199,139,.15)]">

                        <Rocket
                            size={44}
                            className="text-[#14c78b]"
                        />

                        <h2 className="mt-8 text-2xl font-bold">
                            سرعتی که انتظارش را دارید
                        </h2>

                        <p className="mt-5 leading-8 text-gray-400">
                            سرورهای ما برای کاربران اروپا
                            بهینه شده‌اند تا فیلم‌ها بدون
                            قطعی، بدون افت کیفیت و با
                            بالاترین سرعت اجرا شوند.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-9 transition duration-300 hover:-translate-y-2 hover:border-[#14c78b] hover:shadow-[0_0_35px_rgba(20,199,139,.15)]">

                        <Film
                            size={44}
                            className="text-[#14c78b]"
                        />

                        <h2 className="mt-8 text-2xl font-bold">
                            آرشیو همیشه در حال رشد
                        </h2>

                        <p className="mt-5 leading-8 text-gray-400">
                            از فیلم‌های کلاسیک تا جدیدترین
                            آثار سینمای ایران؛
                            آرشیوی که به صورت مداوم
                            بروزرسانی می‌شود.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-9 transition duration-300 hover:-translate-y-2 hover:border-[#14c78b] hover:shadow-[0_0_35px_rgba(20,199,139,.15)]">

                        <Sparkles
                            size={44}
                            className="text-[#14c78b]"
                        />

                        <h2 className="mt-8 text-2xl font-bold">
                            بدون تبلیغات مزاحم
                        </h2>

                        <p className="mt-5 leading-8 text-gray-400">
                            هیچ تبلیغی هنگام تماشا
                            نمایش داده نمی‌شود؛
                            فقط فیلم،
                            فقط لذت تماشا.
                        </p>

                    </div>

                </div>

                {/* Story */}

                <div className="mt-28 grid lg:grid-cols-2 gap-14 items-center">
                    <div className="rounded-3xl border border-[#14c78b]/20 bg-[#111827] p-10">

                        <Tv
                            size={58}
                            className="text-[#14c78b]"
                        />

                        <h3 className="text-3xl font-bold mt-8">

                            مأموریت ما

                        </h3>

                        <p className="mt-6 leading-9 text-gray-400">

                            ما می‌خواهیم هر ایرانی،
                            فارغ از اینکه در کدام کشور
                            زندگی می‌کند،
                            بتواند تنها با چند کلیک
                            به بهترین فیلم‌ها و سریال‌های
                            ایرانی دسترسی داشته باشد.

                        </p>

                    </div>
                    <div>

                        <span className="text-[#14c78b] font-semibold">
                            داستان ما
                        </span>

                        <h2 className="text-4xl font-bold mt-4 leading-tight">
                            چرا AlanBin ایجاد شد؟
                        </h2>

                        <p className="mt-8 text-gray-400 leading-9">

                            بسیاری از ایرانیان خارج از کشور برای
                            تماشای فیلم‌ها و سریال‌های ایرانی
                            با مشکل سرعت پایین، کیفیت نامناسب،
                            تبلیغات آزاردهنده یا نبود آرشیو کامل
                            روبه‌رو هستند.

                        </p>

                        <p className="mt-6 text-gray-400 leading-9">

                            ما AlanBin را ساختیم تا این مشکلات
                            را حذف کنیم و تجربه‌ای ساده،
                            سریع و باکیفیت برای تماشای
                            سینمای ایران فراهم کنیم.

                        </p>

                    </div>



                </div>

                {/* Stats */}

                <div className="grid md:grid-cols-3 gap-6 mt-28">

                    <div className="rounded-2xl bg-[#111827] border border-white/10 py-10 text-center">

                        <h3 className="text-5xl font-black text-[#14c78b]">
                            HD
                        </h3>

                        <p className="mt-4 text-gray-400">
                            کیفیت تصویر بالا
                        </p>

                    </div>

                    <div className="rounded-2xl bg-[#111827] border border-white/10 py-10 text-center">

                        <h3 className="text-5xl font-black text-[#14c78b]">
                            24/7
                        </h3>

                        <p className="mt-4 text-gray-400">
                            دسترسی شبانه‌روزی
                        </p>

                    </div>

                    <div className="rounded-2xl bg-[#111827] border border-white/10 py-10 text-center">

                        <h3 className="text-5xl font-black text-[#14c78b]">
                            ∞
                        </h3>

                        <p className="mt-4 text-gray-400">
                            تماشای بدون محدودیت
                        </p>

                    </div>

                </div>

                {/* CTA */}

                <div className="mt-28 rounded-[34px] border border-[#14c78b]/20 bg-[#111827] p-12 text-center">

                    <h2 className="text-4xl font-bold">
                        آماده شروع هستی؟
                    </h2>

                    <p className="mt-5 text-gray-400 max-w-2xl mx-auto leading-9">

                        همین حالا عضو AlanBin شو
                        و بدون تبلیغات، با سرعت بالا
                        و کیفیت فوق‌العاده
                        فیلم‌های ایرانی را تماشا کن.

                    </p>

                    <Link
                        href="/register"
                        className="
                        inline-flex
                        items-center
                        gap-3
                        mt-10
                        rounded-2xl
                        bg-[#14c78b]
                        px-9
                        py-4
                        text-lg
                        font-bold
                        text-black
                        transition
                        hover:scale-105
                        hover:shadow-[0_0_35px_rgba(20,199,139,.4)]
                        "
                    >
                        ثبت‌نام
                        <ArrowRight size={20} />
                    </Link>

                </div>

            </div>

        </section>
    );
}