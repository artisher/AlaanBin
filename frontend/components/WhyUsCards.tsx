"use client"
import { useState } from "react";
import { Ban, LockKeyholeOpen, Tv } from "lucide-react"
export const WhyUsCards = () => {
    const [hoveredFirst, setHoveredFirst] = useState(false);
    const [hoveredSec, setHoveredSec] = useState(false);
    const [hoveredThird, setHoveredThird] = useState(false);
    return (
        <div className=" bg-[#0f0f0f] relative  ">
            {/* <div className="absolute "></div> */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#14c78b] text-center pt-7">چرا الان بین</h1>
            <div className="bg-[url('/Images/bgWhyUs.png')] bg-cover bg-center flex flex-col gap-10 justify-center overflow-hidden  font-sans py-10 px-10 ">
                {/* کارت اصلی */}
                <div
                    onMouseEnter={() => setHoveredFirst(true)}
                    onMouseLeave={() => setHoveredFirst(false)}
                    className={` transition-all duration-700 ease-out    text-center bg-[#141414] text-white rounded-xl shadow-2xl p-8 
                        w-95 cursor-pointer flex flex-col items-center gap-4  justify-center
                        hover:scale-115
                        `}
                    style={{ border: `2px solid #14c78b` }}
                >
                    <Tv color="white" size={52} />
                    <h1 className="text-white text-xl font-bold text-center w-full border-t border-white/50 py-2">کیفیت بالا</h1>

                </div>
                {/* نوشته‌های بیشتر - وسط صفحه */}
                <div
                    className={` w-full border-y-3 border-[#14c78b] p-3  bg-gray-500 rounded-lg  absolute  top-[14%] transition-all duration-1000 ease-out right-[10%] sm:right-[15%] md:right-[23%] lg:right-[38%]
                        ${hoveredFirst
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-65 pointer-events-none"
                        } text-center max-w-lg`}
                >
                    <h3 className="text-3xl font-bold text-[#14c78b] mb-4">
                        کیفیت سینمایی در دستان شما
                    </h3>
                    <p className="text-white text-lg">
                        با الان بین، غرق دنیای سینمای
                        ایران شوید! ما بالاترین کیفیت تصویر و صدا را برای شما فراهم کرده‌ایم تا جزئیات هر صحنه را با وضوح کامل لمس کنید، درست انگار که در قلب داستان هستید. از تماشای فیلم و سریال‌های ایرانی با کیفیتی فراتر از انتظار لذت ببرید. </p>
                </div>
                {/* نوشته‌های بیشتر - وسط صفحه */}
                <div
                    className={` w-full border-y-3 border-[#14c78b] p-3  bg-gray-500 rounded-lg  absolute right-[10%] sm:right-[15%] md:right-[23%] lg:right-[38%] top-[43%] transition-all duration-1000 ease-out ${hoveredSec
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-65 pointer-events-none"
                        } text-center max-w-lg`}
                >
                    <h3 className="text-3xl font-bold text-[#14c78b] mb-4">
                        غرق تماشای بی‌وقفه
                    </h3>
                    <p className="text-white text-lg">
                        خسته از تبلیغات آزاردهنده که لذت تماشای فیلم و سریال را خراب می‌کنند؟ در الان بین، ما این مشکل را برای همیشه حل کرده‌ایم. با اشتراک خود، تجربه‌ای کاملاً بدون تبلیغات داشته باشید و تمام تمرکزتان را روی داستان بگذارید. </p>
                </div>
                {/* کارت اصلی */}
                <div
                    onMouseEnter={() => setHoveredSec(true)}
                    onMouseLeave={() => setHoveredSec(false)}
                    className={` transition-all duration-700 ease-out  bg-[#141414] text-white rounded-xl
                         shadow-2xl p-8 w-95 cursor-pointer flex flex-col items-center gap-4  justify-center
                         hover:scale-115
                         `}
                    style={{ border: `2px solid #14c78b` }}
                >
                    <Ban color="white" size={52} />
                    <h1 className="text-white text-xl font-bold text-center w-full border-t border-white/50 py-2"> بدون تبلیغات مزاحم </h1>

                </div>
                {/* نوشته‌های بیشتر - وسط صفحه */}
                <div
                    className={` w-full border-y-3 border-[#14c78b] bg-gray-500 rounded-lg  p-3  absolute right-[10%] sm:right-[15%] md:right-[23%] lg:right-[38%] top-[72%] transition-all duration-1000 ease-out ${hoveredThird
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-65 pointer-events-none"
                        } text-center max-w-lg`}
                >
                    <h3 className="text-3xl font-bold text-[#14c78b] mb-4">
                        دنیایی از هنر ایرانی، همیشه در دسترس
                    </h3>
                    <p className="text-white text-lg">
                        هیچ محدودیتی برای علاقه‌تان به سینمای ایران وجود ندارد! با الان بین، به مجموعه‌ای بی‌نظیر از فیلم‌ها و سریال‌های ایرانی، از آثار کلاسیک تا جدیدترین تولیدات، دسترسی نامحدود خواهید داشت. هر زمان و هر کجا که باشید، دنیای هنر ایران در کنار شماست.  </p>
                </div>
                {/* کارت اصلی */}
                <div
                    onMouseEnter={() => setHoveredThird(true)}
                    onMouseLeave={() => setHoveredThird(false)}
                    className={` transition-all duration-700 ease-out  bg-[#141414] text-white rounded-xl 
                        shadow-2xl p-8 w-95 cursor-pointer flex flex-col items-center gap-4  justify-center
                        hover:scale-115
                    `}
                    style={{ border: `2px solid #14c78b` }}
                >
                    <LockKeyholeOpen color="white" size={52} />
                    <h1 className="text-white text-xl font-bold text-center w-full border-t border-white/50 py-2"> دسترسی نامحدود </h1>

                </div>

            </div>

        </div>
    )
}
