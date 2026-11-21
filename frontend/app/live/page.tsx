
"use client";

import { useState } from "react";
import Link from "next/link";

const CHANNELS = [
    {
        id: "tv1",
        category: "iran",
        title: "شبکه ۱",
        description: "پخش زنده شبکه یک سیما",
        icon: "/logos/1.png",
    },
    {
        id: "tv3",
        category: "iran",
        title: "شبکه ۳",
        description: "پخش زنده شبکه سه سیما",
        icon: "/logos/3.png",
    },
    {
        id: "varzesh",
        category: "sports",
        title: "شبکه ورزش",
        description: "پخش زنده شبکه ورزش",
        icon: "/logos/varzesh.png",
    },
    {
        id: "irinn",
        category: "iran",
        title: "شبکه خبر",
        description: "پخش زنده شبکه خبر",
        icon: "/logos/khabar.png",
    },
    {
        id: "fifa",
        category: "sports",
        title: "FIFA+",
        description: "پخش زنده شبکه FIFA",
    },
    {
        id: "euronews",
        category: "news",
        title: "Euronews",
        description: "پخش زنده شبکه یورونیوز",
    },
    {
        id: "persiana-music",
        category: "music",
        title: "Persiana Music",
        description: "پخش زنده شبکه پرشیانا موزیک",
    },
    {
        id: "redbull-tv",
        category: "sports",
        title: "Red Bull TV",
        description: "پخش زنده شبکه Red Bull TV",
    },
    {
        id: "fars",
        category: "iran",
        title: "استان فارس",
        description: "پخش زنده شبکه استانی فارس",
    },
    {
        id: "super-tennis",
        category: "sports",
        title: "سوپر تنیس",
        description: "پخش زنده شبکه سوپر تنیس",
    },
    {
        id: "gem",
        category: "entertainment",
        title: "GEM",
        description: "پخش زنده شبکه GEM",
    },
    {
        id: "bbc-persian",
        category: "news",
        title: "BBC فارسی",
        description: "پخش زنده بی‌بی‌سی فارسی",
    },
    {
        id: "project-leon",
        category: "news",
        title: "Project Leon",
        description: "پخش زنده Project Leon",
    },
    {
        id: "voa",
        category: "news",
        title: "صدای آمریکا",
        description: "پخش زنده صدای آمریکا فارسی",
    },
    {
        id: "iran-international",
        category: "news",
        title: "ایران اینترنشنال",
        description: "پخش زنده ایران اینترنشنال",
    },
    {
        id: "nasim",
        category: "iran",
        title: "شبکه نسیم",
        description: "پخش زنده شبکه نسیم",
        icon: "/logos/nasim.png",
        comingSoon: true,
    },
    {
        id: "ifilm",
        category: "iran",
        title: "شبکه آی فیلم",
        description: "پخش زنده شبکه آی فیلم",
        icon: "/logos/ifilm.png",
        comingSoon: true,
    },
    {
        id: "namayesh",
        category: "iran",
        title: "شبکه نمایش",
        description: "پخش زنده شبکه نمایش",
        icon: "/logos/namayesh.png",
        comingSoon: true,
    },
    {
        id: "pooya",
        category: "iran",
        title: "شبکه پویا",
        description: "پخش زنده شبکه پویا",
        icon: "/logos/pooya1.png",
        comingSoon: true,
    },
];


const CATEGORIES = [
    { id: "all", label: "همه شبکه‌ها" },
    { id: "iran", label: "داخلی ایران" },
    { id: "sports", label: "ورزشی" },
    { id: "news", label: "خبری و بین‌المللی" },
    { id: "music", label: "موسیقی" },
    { id: "entertainment", label: "سرگرمی" },
];

export default function LivePage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const visibleCategories = CATEGORIES.filter(
        (category) =>
            category.id !== "all" &&
            (activeCategory === "all" || category.id === activeCategory)
    );

    return (
        <main className="min-h-screen bg-[#0B0F14] px-4 py-8 md:px-8 md:py-12">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-10">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14c78b] opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#14c78b]" />
                        </span>

                        <span className="text-sm font-medium text-[#14c78b]">
                            پخش زنده
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white md:text-4xl">
                        شبکه‌های تلویزیونی
                    </h1>

                    <p className="mt-3 text-sm text-gray-400 md:text-base">
                        شبکه موردنظر خود را انتخاب کنید و پخش زنده را تماشا کنید.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="mb-8 flex flex-wrap gap-3">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                activeCategory === category.id
                                    ? "border-[#14c78b] bg-[#14c78b] text-[#0B0F14]"
                                    : "border-white/10 bg-[#111827] text-gray-300 hover:border-[#14c78b]/50 hover:text-white"
                            }`}
                        >
                            {category.label}
                            <span className="mr-2 opacity-70">
                                {category.id === "all"
                                    ? CHANNELS.length
                                    : CHANNELS.filter(
                                          (channel) => channel.category === category.id
                                      ).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Channels grouped by category */}
                <div className="space-y-10">
                    {visibleCategories.map((category) => {
                        const categoryChannels = CHANNELS.filter(
                            (channel) => channel.category === category.id
                        );

                        if (categoryChannels.length === 0) return null;

                        return (
                            <section key={category.id}>
                                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
                                    <h2 className="text-xl font-bold text-white md:text-2xl">
                                        {category.label}
                                    </h2>
                                    <span className="rounded-full bg-[#14c78b]/10 px-3 py-1 text-xs font-medium text-[#14c78b]">
                                        {categoryChannels.length} شبکه
                                    </span>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    {categoryChannels.map((channel) => (
                        <Link
                            key={channel.id}
                            href={
                                channel.comingSoon
                                    ? `/live/${channel.id}?comingSoon=true`
                                    : `/live/${channel.id}`
                            }
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#111827]
                                p-6
                                text-right
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#14c78b]/50
                                hover:shadow-[0_10px_40px_rgba(20,199,139,0.10)]
                            "
                        >
                            {/* Glow */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-16
                                    -top-16
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-[#14c78b]/10
                                    blur-3xl
                                    transition-all
                                    duration-300
                                    group-hover:bg-[#14c78b]/20
                                "
                            />

                            <div className="relative z-10">

                                {/* Icon */}

                                <div
                                    className="
                                              mb-6
                                              flex
                                              h-14
                                              w-14
                                              items-center
                                              justify-center
                                              rounded-xl
                                              bg-[#14c78b]/10
                                              transition-colors
                                              group-hover:bg-[#14c78b]/20
                                                "
                                >
                                    {channel.icon ? (
                                        <img
                                            src={channel.icon}
                                            alt={channel.title}
                                            className="h-11 w-11 object-contain"
                                        />
                                    ) : (
                                        <span className="text-2xl font-black text-[#14c78b]">
                                            TV
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-white">
                                    {channel.title}
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    {channel.description}
                                </p>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="rounded-full bg-[#14c78b]/10 px-3 py-1 text-xs font-medium text-[#14c78b]">
                                        LIVE
                                    </span>

                                    <span className="text-sm text-gray-500 transition-colors group-hover:text-[#14c78b]">
                                        تماشا کنید ←
                                    </span>
                                </div>
                            </div>
                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

