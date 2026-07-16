"use client"

import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";

export const BuySub = () => {

    const router = useRouter();

    return (

        <button
            onClick={() => router.push("/subscription")}
            className="
hidden
md:flex
items-center
gap-2
rounded-xl
bg-[#14c78b]
px-5
h-11
font-bold
text-black
transition
hover:scale-105
hover:shadow-[0_0_25px_rgba(20,199,139,.4)]
cursor-pointer
"
        >

            <Crown size={18} />

            خرید اشتراک

        </button>

    );

};