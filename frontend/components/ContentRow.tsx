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

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl md:text-2xl font-bold text-white">
                    {title}
                </h2>

                <Link
                    href={href}
                    className="
                        group
                        flex
                        items-center
                        gap-1
                        text-sm
                        text-gray-400
                        transition-colors
                        hover:text-[#14c78b]
                    "
                >
                    <span>مشاهده همه</span>

                    <ChevronLeft
                        size={18}
                        className="
                            transition-transform
                            group-hover:-translate-x-1
                        "
                    />
                </Link>

            </div>

            {/* Cards */}
            <div
                className="
                    flex
                    gap-5
                    overflow-x-auto
                    overflow-y-hidden
                    pb-4
                    snap-x
                    snap-mandatory
                "
            >
                {children}
            </div>

        </section>
    );
};