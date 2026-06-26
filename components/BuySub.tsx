"use client"
import { useRouter } from "next/navigation"

export const BuySub = () => {
    const router = useRouter()
    const homeHandler = () => router.push("/subscription")

    return <button
        onClick={homeHandler}
        className="bg-[#10B981] py-2 px-4 text-white rounded-lg w-50
    font-bold text-lg shadow-lg cursor-pointer
     hover:bg-[#059669] hover:text-white"> خرید اشتراک</button>
}
