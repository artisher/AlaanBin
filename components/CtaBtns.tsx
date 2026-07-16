"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const CtaBtns = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/login")}
            className="
                group
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-[#14c78b]
                px-8
                py-4
                text-lg
                font-bold
                text-black
                shadow-[0_0_35px_rgba(20,199,139,.35)]
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#19d898]
                hover:shadow-[0_0_45px_rgba(20,199,139,.6)]
                active:scale-95
                cursor-pointer
            "
        >
            شروع تماشا

            <ArrowLeft
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
            />
        </button>
    );
};