// app/terms/page.tsx



export default function TermsPage() {
    return (


        <div className="bg-linear-to-br from-[#11171f] bg-[#05070a]">


            <div className="container mx-auto px-4 py-12 text-gray-200 " >

                <h1 className="text-3xl font-extrabold mb-8 ">
                    قوانین و مقررات استفاده از سرویس <span className="text-primary text-3xl font-extrabold">الان بین</span>
                </h1>


                <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded-lg mb-10">
                    استفاده از سرویس به معنای پذیرش تمام قوانین زیر است. مطالعه کامل این صفحه
                    قبل از ایجاد حساب توصیه می‌شود.
                </div>

                {/* Use Legally */}
                <section className="mb-14">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">قوانین استفاده صحیح</h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                            <h3 className="font-semibold text-[#14c78b] mb-2">محل مجاز استفاده</h3>
                            <p className="text-sm leading-6">
                                استفاده از سرویس تنها برای کاربران مقیم **اروپا** مجاز است.
                                استفاده از VPN یا هر ابزار تغییر IP برای دور زدن محدودیت‌ها تخلف محسوب می‌شود.
                            </p>
                        </div>

                        <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                            <h3 className="font-semibold text-[#14c78b] mb-2">ممنوعیت‌های کپی‌رایت</h3>
                            <p className="text-sm leading-6">
                                ضبط، دانلود، اشتراک‌گذاری و پخش غیرقانونی محتوا به هر شکل ممنوع است
                                و violator ممکن است طبق قانون با محدودیت‌های شدید روبه‌رو شود.
                            </p>
                        </div>

                        <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                            <h3 className="font-semibold text-[#14c78b] mb-2">قوانین حساب کاربری</h3>
                            <ul className="list-disc pr-4 text-sm space-y-2">
                                <li>هر حساب فقط برای **استفاده شخصی** است.</li>
                                <li>اشتراک‌گذاری رمز عبور ممنوع است.</li>
                                <li>در صورت تخلف، حساب مسدود می‌شود.</li>
                            </ul>
                        </div>

                        <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                            <h3 className="font-semibold text-[#14c78b] mb-2">پرداخت و اشتراک</h3>
                            <ul className="list-disc pr-4 text-sm space-y-2">
                                <li>اشتراک به‌صورت ماهانه تمدید می‌شود.</li>
                                <li>در صورت کنسل‌کردن، دوره فعلی فعال می‌ماند.</li>
                                <li>ریفاند فقط در موارد خاص ارائه می‌شود.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Liability */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">محدودیت مسئولیت</h2>

                    <p className="leading-7 mb-4">
                        در صورتی که سرویس به دلیل مشکلات اینترنتی، قطعی سرور، مشکلات شبکه و یا
                        محدودیت‌های فنی دچار اختلال شود، Bein تلاش خود را برای رفع سریع مشکل
                        انجام می‌دهد اما مسئولیت حقوقی کامل بر عهده سرویس نخواهد بود.
                    </p>

                    <p className="leading-7">
                        همچنین در برابر محتوای شخص ثالث (فیلم‌ها، سریال‌ها، تریلرها) مسئولیتی
                        ندارد و مسئولیت کپی‌رایت متعلق به صاحبان اثر است.
                    </p>
                </section>

                {/* Termination */}
                <section className="mb-20">
                    <h2 className="text-xl font-bold mb-4 text-[#14c78b]">لغو حساب و تعلیق</h2>

                    <ul className="list-disc pr-4 space-y-3">
                        <li>سوءاستفاده از سرویس → مسدودسازی بدون هشدار</li>
                        <li>نقض قوانین کپی‌رایت → حذف دائمی حساب</li>
                        <li>ورود مشکوک یا چند حساب همزمان → تعلیق تا بررسی امنیتی</li>
                    </ul>
                </section>
            </div >
        </div>

    );
}
