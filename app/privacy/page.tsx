// app/privacy/page.tsx

export const dynamic = "force-dynamic";

export default function PrivacyPage() {
    return (
        <div className="bg-linear-to-br from-[#11171f] bg-[#05070a]">


            <div className="container mx-auto px-4 py-12 text-gray-200 ">
                <h1 className="text-3xl font-extrabold mb-8 text-[#14c78b]">
                    سیاست حفظ حریم خصوصی
                </h1>

                {/* Intro Box */}
                <div className="p-5 rounded-lg bg-gray-900/50 border border-gray-700 mb-10">
                    <p className="leading-7">
                        این سند توضیح می‌دهد که سرویس <span className="text-primary font-bold text-lg">الان بین</span> چگونه داده‌های کاربران را جمع‌آوری،
                        ذخیره و محافظت می‌کند. هدف ما ایجاد تجربه‌ای امن، روان و قابل اعتماد
                        برای شما در هنگام تماشای فیلم و سریال است.
                    </p>
                </div>

                {/* Section: Types of Data */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">چه داده‌هایی جمع‌آوری می‌کنیم؟</h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-lg bg-gray-800/50 border border-gray-700">
                            <h3 className="font-semibold text-[#14c78b] mb-2">۱. داده‌های حساب کاربری</h3>
                            <ul className="space-y-2 text-sm list-disc pr-4">
                                <li>ایمیل و رمز عبور رمزنگاری‌شده</li>
                                <li>مشخصات پروفایل</li>
                                <li>کشور، شهر و اطلاعات منطقه‌ای</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-lg bg-gray-800/50 border border-gray-700">
                            <h3 className="font-semibold text-[#14c78b] mb-2">۲. داده‌های فنی</h3>
                            <ul className="space-y-2 text-sm list-disc pr-4">
                                <li>آدرس IP و Device ID</li>
                                <li>اطلاعات مرورگر و سیستم عامل</li>
                                <li>کوکی‌ها و session tokens</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-lg bg-gray-800/50 border border-gray-700">
                            <h3 className="font-semibold text-[#14c78b] mb-2">۳. تعاملات و رفتار کاربر</h3>
                            <ul className="space-y-2 text-sm list-disc pr-4">
                                <li>تاریخچه تماشا</li>
                                <li>ترجیح ژانرها و بازیگران</li>
                                <li>سرعت اینترنت برای بهینه‌سازی پخش</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-lg bg-gray-800/50 border border-gray-700">
                            <h3 className="font-semibold text-[#14c78b] mb-2">۴. داده‌های پرداخت</h3>
                            <ul className="space-y-2 text-sm list-disc pr-4">
                                <li>تراکنش‌ها و وضعیت اشتراک</li>
                                <li>شناسه پرداخت</li>
                                <li>سابقه خرید</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section: Why */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">چرا این داده‌ها را جمع‌آوری می‌کنیم؟</h2>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-700 bg-gray-900/40 rounded-lg">
                            ارائه تجربه تماشای پایدار، سریع و شخصی‌سازی‌شده.
                        </div>
                        <div className="p-4 border border-gray-700 bg-gray-900/40 rounded-lg">
                            جلوگیری از سوءاستفاده، اشتراک غیرمجاز و جلوگیری از مسدود شدن سرویس.
                        </div>
                        <div className="p-4 border border-gray-700 bg-gray-900/40 rounded-lg">
                            تحلیل کیفیت سرویس و بهبود امکانات آینده.
                        </div>
                    </div>
                </section>

                {/* Rights */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">حقوق کاربران</h2>

                    <ul className="space-y-3 list-disc pr-4">
                        <li>درخواست دریافت اطلاعات ذخیره‌شده</li>
                        <li>حذف حساب و داده‌ها</li>
                        <li>تغییر مشخصات حساب</li>
                    </ul>
                </section>

                {/* Contact */}
                <section className="mb-20">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">راه‌های ارتباط</h2>

                    <p className="leading-7 text-gray-300">
                        برای درخواست‌های حقوقی، گزارش مشکلات و مسائل مربوط به امنیت داده
                        می‌توانید با ایمیل زیر در تماس باشید:
                    </p>

                    <p className="mt-4 text-[#14c78b] font-semibold">support@alanbin.com</p>
                </section>
            </div>
        </div>
    );
}
