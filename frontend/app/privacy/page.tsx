export const dynamic = "force-dynamic";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0B0F14] text-white">

            <div className="max-w-6xl mx-auto px-6 py-20">

                {/* Header */}

                <div className="text-center max-w-3xl mx-auto">

                    <span className="inline-block px-5 py-2 rounded-full bg-[#14c78b]/10 border border-[#14c78b]/20 text-[#14c78b] font-semibold">
                        Privacy Policy
                    </span>

                    <h1 className="mt-7 text-5xl font-extrabold">
                        حریم خصوصی کاربران
                    </h1>

                    <p className="mt-6 text-gray-400 leading-8">
                        حفظ اطلاعات شخصی کاربران یکی از مهم‌ترین اولویت‌های
                        AlanBin است. اطلاعات شما فقط برای ارائه بهتر خدمات
                        استفاده می‌شود و بدون رضایت شما در اختیار شخص یا سازمان
                        دیگری قرار نخواهد گرفت.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid lg:grid-cols-2 gap-8 mt-20">

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            اطلاعاتی که ذخیره می‌کنیم
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>• ایمیل حساب کاربری</li>

                            <li>• رمز عبور به صورت رمزنگاری‌شده (Hash)</li>

                            <li>• وضعیت اشتراک شما</li>

                            <li>• اطلاعات موردنیاز برای ورود امن به حساب</li>

                        </ul>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            دلیل جمع‌آوری اطلاعات
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>• ایجاد و مدیریت حساب کاربری</li>

                            <li>• فعال‌سازی و مدیریت اشتراک</li>

                            <li>• افزایش امنیت حساب کاربران</li>

                            <li>• بهبود کیفیت خدمات سایت</li>

                        </ul>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            امنیت اطلاعات
                        </h2>

                        <p className="text-gray-300 leading-8">

                            ما از روش‌های استاندارد امنیتی برای محافظت از
                            اطلاعات کاربران استفاده می‌کنیم تا از دسترسی
                            غیرمجاز، سوءاستفاده یا افشای اطلاعات جلوگیری شود.

                        </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

                        <h2 className="text-2xl font-bold text-[#14c78b] mb-6">
                            حقوق کاربران
                        </h2>

                        <ul className="space-y-5 text-gray-300 leading-8">

                            <li>• ویرایش اطلاعات حساب کاربری</li>

                            <li>• حذف حساب کاربری در صورت درخواست</li>

                            <li>• ارتباط با تیم پشتیبانی در صورت وجود سؤال یا مشکل</li>

                        </ul>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-20 rounded-3xl border border-[#14c78b]/20 bg-[#111827] p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        احترام به حریم خصوصی شما
                    </h2>

                    <p className="mt-5 text-gray-400 leading-9 max-w-3xl mx-auto">

                        اطلاعات کاربران تنها برای ارائه خدمات AlanBin استفاده
                        می‌شود و بدون رضایت شما در اختیار شخص یا مجموعه دیگری
                        قرار نخواهد گرفت، مگر در مواردی که قانون الزام کرده باشد.

                    </p>

                    <div className="mt-8">

                        <span className="text-[#14c78b] font-bold text-lg">
                            support@alanbin.com
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}