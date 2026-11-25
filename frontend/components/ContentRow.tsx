"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode, useRef } from "react";

/** Width of one item inside a row — use on the wrapper of each card */
export const rowItemClass =
    "w-[150px] shrink-0 snap-start sm:w-[175px] md:w-[195px] lg:w-[215px] xl:w-[235px] tv:w-[280px]";

interface ContentRowProps {
    title: string;
    href?: string;
    children: ReactNode;
}

export const ContentRow = ({ title, href, children }: ContentRowProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // RTL: "next" goes to the left
    const scroll = (dir: 1 | -1) => {
        const el = ref.current;
        if (!el) return;
        el.scrollBy({ left: -dir * el.clientWidth * 0.8, behavior: "smooth" });
    };

    return (
        <section className="group/row relative rounded-2xl bg-white/[0.035] p-4 ring-1 ring-white/[0.06] sm:p-5 lg:p-6 tv:p-8">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between gap-4 px-1">
                <div className="flex items-center gap-2.5">
                    <span className="h-4 w-[3px] rounded-full bg-[#14c78b]" />
                    <h2 className="text-lg font-semibold text-white sm:text-xl tv:text-2xl">{title}</h2>
                </div>

                {href && (
                    <Link
                        href={href}
                        data-tv-focus
                        className="tv-focus flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-white/45 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                        همه
                        <ChevronLeft size={16} />
                    </Link>
                )}
            </div>

            {/* Items */}
            <div className="relative">
                <div
                    ref={ref}
                    className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth px-1 py-3 sm:gap-4 tv:gap-6"
                >
                    {children}
                </div>

                {/* Arrows — mouse only, remote skips them */}
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="قبلی"
                    onClick={() => scroll(-1)}
                    className="absolute -right-3 top-[40%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B0F14] text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-200 hover:bg-white hover:text-black group-hover/row:opacity-100 md:flex"
                >
                    <ChevronRight size={20} />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="بعدی"
                    onClick={() => scroll(1)}
                    className="absolute -left-3 top-[40%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B0F14] text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-200 hover:bg-white hover:text-black group-hover/row:opacity-100 md:flex"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>
        </section>
    );
};