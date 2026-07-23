export default function TermsPage() {
    return (
        <div className="bg-[#0B0F14] text-white min-h-screen">

            <div className="max-w-6xl mx-auto px-6 py-20">

                {/* Header */}

                <div className="text-center max-w-3xl mx-auto">

                    <span className="inline-block px-5 py-2 rounded-full bg-[#14c78b]/10 border border-[#14c78b]/20 text-[#14c78b] font-semibold">
                        قوانین استفاده
                    </span>

                    <h1 className="mt-7 text-5xl font-extrabold">
                        قوانین و مقررات
                    </h1>

                    <p className="mt-6 text-gray-400 leading-8">
                        هدف این قوانین ایجاد تجربه‌ای امن، منظم و باکیفیت برای
                        تمام کاربران AlanBin است. استفاده از سرویس به منزله
                        پذیرش موارد زیر خواهد بود.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid lg:grid-cols-2 gap-8 mt-20">

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            استفاده از حساب کاربری
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>
                                • هر حساب کاربری فقط برای استفاده شخصی ایجاد می‌شود.
                            </li>

                            <li>
                                • اشتراک‌گذاری اطلاعات ورود با دیگران مجاز نیست.
                            </li>

                            <li>
                                • در صورت مشاهده استفاده غیرعادی، حساب ممکن است
                                به صورت موقت بررسی یا مسدود شود.
                            </li>

                        </ul>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            اشتراک و پرداخت
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>
                                • دسترسی به محتوای سایت تنها با اشتراک فعال امکان‌پذیر است.
                            </li>

                            <li>
                                • با پایان اعتبار اشتراک، دسترسی به فیلم‌ها متوقف خواهد شد.
                            </li>

                            <li>
                                • برای تمدید کافی است دوباره اشتراک تهیه کنید.
                            </li>

                        </ul>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            حفظ حقوق محتوا
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>
                                • دانلود، ضبط یا انتشار مجدد محتوای سایت بدون مجوز مجاز نیست.
                            </li>

                            <li>
                                • تمامی فیلم‌ها و سریال‌ها صرفاً برای تماشای آنلاین ارائه می‌شوند.
                            </li>

                        </ul>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            مسئولیت سرویس
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>
                                • ما همواره تلاش می‌کنیم سرویس بدون قطعی و با بهترین کیفیت در دسترس باشد.
                            </li>

                            <li>
                                • در صورت بروز اختلال‌های خارج از کنترل مانند مشکلات اینترنت یا زیرساخت،
                                تیم AlanBin در سریع‌ترین زمان ممکن مشکل را برطرف خواهد کرد.
                            </li>

                        </ul>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-20 rounded-3xl border border-[#14c78b]/20 bg-[#111827] p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        هدف ما تجربه‌ای ساده و مطمئن است
                    </h2>

                    <p className="mt-5 text-gray-400 leading-9 max-w-3xl mx-auto">
                        قوانین بالا تنها برای حفظ کیفیت سرویس و احترام به حقوق
                        تمام کاربران تدوین شده‌اند. در صورت داشتن هرگونه سؤال،
                        می‌توانید از طریق صفحه تماس با ما با تیم AlanBin در ارتباط باشید.
                    </p>

                </div>

            </div>

        </div>
    );
}