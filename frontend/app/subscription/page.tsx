import Head from "next/head";
import Link from "next/link";
import { Check, MessageCircle, Star } from "lucide-react";

const plans = [
    {
        id: 1,
        title: "اشتراک ۱ ماهه",
        price: "5",
        desc: "دسترسی کامل به تمام فیلم‌ها و سریال‌ها به مدت یک ماه",
        popular: false,
    },
    {
        id: 2,
        title: "اشتراک ۳ ماهه",
        price: "14",
        desc: "به‌صرفه‌ترین انتخاب برای اکثر کاربران",
        popular: true,
    },
    {
        id: 3,
        title: "اشتراک ۶ ماهه",
        price: "27",
        desc: "کمترین هزینه ماهانه و بهترین ارزش خرید",
        popular: false,
    },
];

const whatsappLink = "https://wa.me/436764479470";

export default function SubscriptionPage() {
    return (
        <>
            <Head>
                <title>اشتراک AlanBin</title>
            </Head>

            <main className="min-h-screen bg-[#0B0F14] text-white">

                {/* Header */}

                <section className="max-w-6xl mx-auto px-6 pt-16 text-center">

                    <h1 className="text-4xl md:text-5xl font-black mb-5">
                        خرید اشتراک
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto leading-8">
                        با خرید اشتراک، بدون تبلیغات و بدون محدودیت به تمام آرشیو فیلم‌ها و
                        سریال‌های ایرانی دسترسی خواهید داشت.
                    </p>

                </section>

                {/* Plans */}

                <section className="max-w-6xl mx-auto px-6 py-14">

                    <div className="grid md:grid-cols-3 gap-8">

                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative rounded-3xl border p-8 transition-all duration-300
                hover:-translate-y-2 hover:border-[#14c78b]
                hover:shadow-[0_0_35px_rgba(20,199,139,.2)]

                ${plan.popular
                                        ? "border-[#14c78b] bg-[#111827]"
                                        : "border-white/10 bg-[#111827]"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#14c78b] text-black px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                        <Star size={16} fill="black" />
                                        محبوب‌ترین
                                    </div>
                                )}

                                <h2 className="text-2xl font-bold text-center">
                                    {plan.title}
                                </h2>

                                <div className="my-8 text-center">

                                    <span className="text-6xl font-black text-[#14c78b]">
                                        {plan.price}
                                    </span>

                                    <span className="mr-2 text-2xl">
                                        یورو
                                    </span>

                                </div>

                                <p className="text-gray-400 text-center mb-8 leading-7">
                                    {plan.desc}
                                </p>

                                <div className="space-y-4 mb-10">

                                    <div className="flex items-center gap-3">
                                        <Check size={18} color="#14c78b" />
                                        <span>دسترسی کامل به آرشیو</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Check size={18} color="#14c78b" />
                                        <span>کیفیت Full HD</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Check size={18} color="#14c78b" />
                                        <span>بدون تبلیغات</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Check size={18} color="#14c78b" />
                                        <span>پشتیبانی واتساپ</span>
                                    </div>

                                </div>

                                <Link
                                    href={whatsappLink}
                                    target="_blank"
                                    className="flex items-center justify-center gap-3 w-full rounded-xl bg-[#14c78b] py-4 text-black font-bold hover:bg-[#11b07a] transition"
                                >
                                    <MessageCircle size={20} />
                                    خرید این اشتراک
                                </Link>

                            </div>
                        ))}

                    </div>

                </section>

                {/* Guide */}

                <section className="max-w-4xl mx-auto px-6">

                    <div className="rounded-3xl border border-[#14c78b]/20 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold mb-8 text-center">
                            نحوه خرید اشتراک
                        </h2>

                        <div className="space-y-5 text-gray-300">

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#14c78b] text-black font-bold flex items-center justify-center shrink-0">
                                    1
                                </div>

                                <p>
                                    پلن موردنظر خود را انتخاب کنید و روی دکمه
                                    <span className="text-[#14c78b] font-bold">
                                        {" "}خرید این اشتراک
                                    </span>
                                    کلیک کنید.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#14c78b] text-black font-bold flex items-center justify-center shrink-0">
                                    2
                                </div>

                                <p>
                                    در واتساپ پیام دهید تا اطلاعات پرداخت برای شما ارسال شود.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#14c78b] text-black font-bold flex items-center justify-center shrink-0">
                                    3
                                </div>

                                <p>
                                    بعد از تأیید پرداخت، اشتراک شما در کوتاه‌ترین زمان فعال خواهد شد.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

                {/* Phone */}

                <section className="max-w-4xl mx-auto px-6 py-14">

                    <div className="bg-[#111827] rounded-3xl border border-[#14c78b]/20 p-8 text-center">

                        <h2 className="text-2xl font-bold mb-4">
                            خرید از طریق واتساپ
                        </h2>

                        <p className="text-gray-400 leading-8 max-w-xl mx-auto">
                            اگر با تلویزیون یا کامپیوتر وارد سایت شده‌اید و امکان باز کردن
                            واتساپ را ندارید، شماره زیر را در تلفن همراه خود جستجو یا ذخیره
                            کنید.
                        </p>

                        <div className="my-8">

                            <span
                                dir="ltr"
                                className="inline-block text-3xl md:text-4xl font-black tracking-widest text-[#14c78b]"
                            >
                                +43 676 4479470
                            </span>

                        </div>

                        <Link
                            href={whatsappLink}
                            target="_blank"
                            className="inline-flex items-center gap-3 rounded-xl bg-[#14c78b] px-8 py-4 text-black font-bold hover:bg-[#11b07a] transition"
                        >
                            <MessageCircle />
                            باز کردن واتساپ
                        </Link>

                    </div>

                </section>

            </main>
        </>
    );
}