
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { Swiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

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
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="relative w-full">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    {/* Accent */}
                    <div className="h-7 w-1 shrink-0 rounded-full bg-[#14c78b] shadow-[0_0_12px_rgba(20,199,139,0.35)]" />

                    <h2 className="truncate text-lg font-bold text-white sm:text-xl md:text-2xl">
                        {title}
                    </h2>
                </div>

                <Link
                    href={href}
                    className="
                        group
                        flex shrink-0 items-center gap-1.5
                        rounded-full
                        border border-white/10
                        bg-white/[0.04]
                        px-3 py-1.5
                        text-xs font-medium
                        text-gray-300
                        backdrop-blur-sm
                        transition-all duration-200

                        hover:border-[#14c78b]/30
                        hover:bg-[#14c78b]/10
                        hover:text-[#14c78b]

                        sm:px-4 sm:py-2
                        sm:text-sm
                    "
                >
                    <span>مشاهده همه</span>

                    <ChevronLeft
                        size={16}
                        className="
                            transition-transform duration-200
                            group-hover:-translate-x-1
                            sm:h-[18px] sm:w-[18px]
                        "
                    />
                </Link>
            </div>

            {/* Content */}
            <div
                className="
                    relative
                    rounded-2xl
                    border border-white/[0.045]
                    bg-white/[0.015]
                    px-2 py-4
                    sm:px-3 sm:py-5
                    md:px-4
                "
            >
                <Swiper
                    onSwiper={(swiper: SwiperType) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={10}
                    slidesPerView={2.15}
                    breakpoints={{
                        480: {
                            slidesPerView: 2.5,
                            spaceBetween: 12,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 14,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 18,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                        1536: {
                            slidesPerView: 7,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {children}
                </Swiper>

                {/* Previous */}
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="
                        absolute right-1 top-1/2 z-20
                        flex h-9 w-9 -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        border border-white/10
                        bg-black/75
                        text-white
                        shadow-lg
                        backdrop-blur-md
                        transition-all duration-200

                        hover:border-[#14c78b]/40
                        hover:bg-[#14c78b]
                        hover:text-black

                        sm:right-2 sm:h-10 sm:w-10
                        md:h-11 md:w-11
                    "
                    aria-label="قبلی"
                >
                    <ChevronRight size={18} className="sm:h-5 sm:w-5" />
                </button>

                {/* Next */}
                <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    className="
                        absolute left-1 top-1/2 z-20
                        flex h-9 w-9 -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        border border-white/10
                        bg-black/75
                        text-white
                        shadow-lg
                        backdrop-blur-md
                        transition-all duration-200

                        hover:border-[#14c78b]/40
                        hover:bg-[#14c78b]
                        hover:text-black

                        sm:left-2 sm:h-10 sm:w-10
                        md:h-11 md:w-11
                    "
                    aria-label="بعدی"
                >
                    <ChevronLeft size={18} className="sm:h-5 sm:w-5" />
                </button>
            </div>
        </section>
    );
};

