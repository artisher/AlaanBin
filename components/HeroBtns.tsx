"use client"
export const HeroBtns = () => {
    return (
        <div className="flex gap-10 justify-center">
            <button className="bg-[#10B981] py-2 px-4 text-white rounded-lg font-bold text-lg shadow-lg cursor-pointer hover:bg-[#059669] hover:text-white">شروع تماشا</button>
            <button className=" py-3 px-4 text-emerald-400 border-emerald-500 border-2 rounded-lg font-bold text-lg shadow-lg cursor-pointer hover:bg-emerald-500/10 hover:text-emerald-300">لیست تمامی فیلم ها</button>
        </div>
    )
}
