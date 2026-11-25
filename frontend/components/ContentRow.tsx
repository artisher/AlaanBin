"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode, useRef } from "react";

/** Width of one item inside a row — use on the wrapper of each card */
export const rowItemClass =
    "w-[128px] shrink-0 snap-start sm:w-[148px] md:w-[165px] lg:w-[180px] tv:w-[230px]";

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
        <section className="group/row relative w-full">
            <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <span className="h-4 w-[3px] rounded-full bg-[#14c78b]" />
                    <h2 className="text-lg font-semibold text-white sm:text-xl tv:text-2xl">{title}</h2>
                </div>

                {href && (
                    <Link
                        href={href}
                        data-tv-focus
                        className="tv-focus flex items-center gap-1 rounded-md px-2 py-1 text-sm text-white/40 transition-colors hover:text-white"
                    >
                        همه
                        <ChevronLeft size={16} />
                    </Link>
                )}
            </div>

            <div className="relative">
                <div
                    ref={ref}
                    className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto scroll-smooth px-4 py-3 sm:-mx-6 sm:gap-4 sm:px-6 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10"
                >
                    {children}
                </div>

                {/* Arrows — mouse only, remote skips them */}
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="قبلی"
                    onClick={() => scroll(-1)}
                    className="absolute -right-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B0F14]/90 text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-200 hover:bg-white hover:text-black group-hover/row:opacity-100 md:flex"
                >
                    <ChevronRight size={20} />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="بعدی"
                    onClick={() => scroll(1)}
                    className="absolute -left-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B0F14]/90 text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-200 hover:bg-white hover:text-black group-hover/row:opacity-100 md:flex"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>
        </section>
    );
};