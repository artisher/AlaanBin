import { Ban, LockKeyholeOpen, Tv } from "lucide-react"

export const WhyAlanbin = () => {
    return (
        // این div والد اصلی است و موقعیت آن relative است تا div داخلی absolute نسبت به آن کار کند
        <div className="relative w-full py-15 md:py-20 border-b border-gray-800">

            {/* این div پس زمینه است */}
            <div className="absolute inset-0 -z-10 bg-[url('/Images/arrow.png')] bg-cover bg-center "></div>

            <h1 className="text-white text-3xl text-center font-bold mb-10 md:mb-15">چرا الان بین ؟</h1>
            <div className="flex flex-col gap-10 justify-center items-center my-15 md:flex-row">

                <div className="bg-[#111827] flex gap-4 flex-col items-center justify-center
                 w-60 rounded-xl p-3 border border-[#14c78b] transition-all duration-700 ease-out cursor-pointer  hover:scale-110
                 ">
                    <Tv color="white" size={52} />
                    <h1 className="text-white text-xl font-bold text-center w-full border-t border-white/50 py-2">کیفیت بالا</h1>
                </div>

                <div className="bg-[#111827] flex gap-4 flex-col items-center justify-center w-60 rounded-xl p-3 
                border border-[#14c78b] transition-all duration-700 ease-out cursor-pointer  hover:scale-110
                ">
                    <Ban color="white" size={52} />
                    <h1 className="text-white text-xl font-bold text-center w-full border-t border-white/50 py-2"> بدون تبلیغات مزاحم </h1>
                </div>

                <div className="bg-[#111827] flex gap-6 flex-col items-center justify-center w-60 rounded-xl p-3
                border border-[#14c78b] transition-all duration-700 ease-out cursor-pointer  hover:scale-110
                ">
                    <LockKeyholeOpen color="white" size={52} />
                    <h1 className="text-white text-xl font-bold text-center w-full border-t border-white/50 py-2"> دسترسی نامحدود </h1>
                </div>
            </div>
        </div>
    )
}
