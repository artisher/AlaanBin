"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface ContentRowProps {
    title: string;
    href: string;
    children: ReactNode;
}

export const ContentRow = ({
    title,
    href,
    children,
}: ContentRowProps) => {
    return (
        <section className="w-full">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white md:text-2xl">
                    {title}
                </h2>

                <Link
                    href={href}
                    className="group flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-[#14c78b]"
                >
                    <span>مشاهده همه</span>

                    <ChevronLeft
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                </Link>
            </div>

            <div
                className="
                    flex gap-5
                    overflow-x-auto
                    overflow-y-hidden
                    pb-4
                    snap-x
                    snap-mandatory
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {children}
            </div>
        </section>
    );
};