"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

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

            <div className="relative">
                <Swiper
                    onSwiper={(swiper: SwiperType) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 18,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {children}
                </Swiper>

                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="
                        absolute right-2 top-1/2 z-20
                        flex h-11 w-11 -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        border border-white/10
                        bg-black/70
                        text-white
                        backdrop-blur-md
                        transition
                        hover:bg-[#14c78b]
                        hover:text-black
                    "
                    aria-label="قبلی"
                >
                    <ChevronRight size={22} />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="
                        absolute left-2 top-1/2 z-20
                        flex h-11 w-11 -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        border border-white/10
                        bg-black/70
                        text-white
                        backdrop-blur-md
                        transition
                        hover:bg-[#14c78b]
                        hover:text-black
                    "
                    aria-label="بعدی"
                >
                    <ChevronLeft size={22} />
                </button>
            </div>
        </section>
    );
};