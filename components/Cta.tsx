import { CtaBtns } from "./CtaBtns"

export const Cta = () => {
    return (
        <div className="relative h-75 border-y border-white/40 py-10">

            {/* بکگراند بلور شده */}
            <div className="absolute inset-0 bg-[url('/Images/CtaImg.png')] bg-cover bg-center blur-sm opacity-60"></div>

            {/* متن */}
            <div className="relative pt-3 flex flex-col text-center  gap-15 justify-center ">
               <h1 className="text-white text-2xl text-center font-bold">همین الان اشتراک بگیر و شروع کن </h1>

                <div className="mt-5">
                    <CtaBtns />
                </div>
            </div>

        </div>
        // <div className="border-y border-white/40 pt-5 flex flex-col gap-10">
        //    
        // </div>
    )
}
