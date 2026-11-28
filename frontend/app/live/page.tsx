"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTvNavigation } from "../../components/useTvNavigation";

type Channel = {
    id: string;
    category: string;
    title: string;
    description: string;
    icon?: string;
    comingSoon?: boolean;
};

const CHANNELS: Channel[] = [
    { id: "tv1", category: "iran", title: "شبکه ۱", description: "پخش زنده شبکه یک سیما", icon: "/logos/1.png" },
    { id: "tv1-backup", category: "iran", title: "شبکه ۱ (پشتیبان)", description: "پخش زنده شبکه یک سیما - سرور پشتیبان", icon: "/logos/1.png" },
    { id: "tv2", category: "iran", title: "شبکه ۲", description: "پخش زنده شبکه دو سیما", icon: "/logos/2.png" },
    { id: "tv2-backup", category: "iran", title: "شبکه ۲ (پشتیبان)", description: "پخش زنده شبکه دو سیما - سرور پشتیبان", icon: "/logos/2.png" },
    { id: "tv3", category: "iran", title: "شبکه ۳", description: "پخش زنده شبکه سه سیما", icon: "/logos/3.png" },
    { id: "tv3-backup", category: "iran", title: "شبکه ۳ (پشتیبان)", description: "پخش زنده شبکه سه سیما - سرور پشتیبان", icon: "/logos/3.png" },
    { id: "varzesh", category: "sports", title: "شبکه ورزش", description: "پخش زنده شبکه ورزش", icon: "/logos/varzesh.png" },
    { id: "varzesh-backup", category: "sports", title: "شبکه ورزش (پشتیبان)", description: "پخش زنده شبکه ورزش - سرور پشتیبان", icon: "/logos/varzesh.png" },
    { id: "irinn", category: "iran", title: "شبکه خبر", description: "پخش زنده شبکه خبر", icon: "/logos/khabar.png" },
    { id: "irinn-backup", category: "iran", title: "شبکه خبر (پشتیبان)", description: "پخش زنده شبکه خبر - سرور پشتیبان", icon: "/logos/khabar.png" },
    { id: "fifa", category: "sports", title: "FIFA+", description: "پخش زنده شبکه FIFA" },
    { id: "euronews", category: "news", title: "Euronews", description: "پخش زنده شبکه یورونیوز" },
    { id: "persiana-music", category: "music", title: "Persiana Music", description: "پخش زنده شبکه پرشیانا موزیک" },
    { id: "redbull-tv", category: "sports", title: "Red Bull TV", description: "پخش زنده شبکه Red Bull TV" },
    { id: "fars", category: "iran", title: "استان فارس", description: "پخش زنده شبکه استانی فارس" },
    { id: "super-tennis", category: "sports", title: "سوپر تنیس", description: "پخش زنده شبکه سوپر تنیس" },
    { id: "gem", category: "entertainment", title: "GEM", description: "پخش زنده شبکه GEM" },
    { id: "bbc-persian", category: "news", title: "BBC فارسی", description: "پخش زنده بی‌بی‌سی فارسی" },
    { id: "project-leon", category: "news", title: "Project Leon", description: "پخش زنده Project Leon" },
    { id: "voa", category: "news", title: "صدای آمریکا", description: "پخش زنده صدای آمریکا فارسی" },
    { id: "iran-international", category: "news", title: "ایران اینترنشنال", description: "پخش زنده ایران اینترنشنال" },
    { id: "nasim", category: "iran", title: "شبکه نسیم", description: "پخش زنده شبکه نسیم", icon: "/logos/nasim.png", comingSoon: true },
    { id: "ifilm", category: "iran", title: "شبکه آی فیلم", description: "پخش زنده شبکه آی فیلم", icon: "/logos/ifilm.png", comingSoon: true },
    { id: "namayesh", category: "iran", title: "شبکه نمایش", description: "پخش زنده شبکه نمایش", icon: "/logos/namayesh.png", comingSoon: true },
    { id: "pooya", category: "iran", title: "شبکه پویا", description: "پخش زنده شبکه پویا", icon: "/logos/pooya1.png", comingSoon: true },
];

const CATEGORIES = [
    { id: "all", label: "همه", emoji: "✦" },
    { id: "iran", label: "داخلی ایران", emoji: "📺" },
    { id: "sports", label: "ورزشی", emoji: "⚽" },
    { id: "news", label: "خبری و بین‌المللی", emoji: "🌍" },
    { id: "music", label: "موسیقی", emoji: "🎵" },
    { id: "entertainment", label: "سرگرمی", emoji: "🎬" },
];

const CATEGORY_STYLE: Record<string, { from: string; to: string; tag: string }> = {
    iran: { from: "#161b22", to: "#0f1318", tag: "#14c78b" },
    sports: { from: "#161b22", to: "#0f1318", tag: "#14c78b" },
    news: { from: "#161b22", to: "#0f1318", tag: "#14c78b" },
    music: { from: "#161b22", to: "#0f1318", tag: "#14c78b" },
    entertainment: { from: "#161b22", to: "#0f1318", tag: "#14c78b" },
};

const FEATURED_IDS = ["tv3", "varzesh", "irinn"];

export default function LivePage() {
    useTvNavigation();
    const [activeCategory, setActiveCategory] = useState("all");

    const counts = useMemo(() => {
        const map: Record<string, number> = { all: CHANNELS.length };
        for (const c of CHANNELS) map[c.category] = (map[c.category] ?? 0) + 1;
        return map;
    }, []);

    const sections = CATEGORIES.filter(
        (c) => c.id !== "all" && (activeCategory === "all" || c.id === activeCategory)
    )
        .map((c) => ({ ...c, channels: CHANNELS.filter((ch) => ch.category === c.id) }))
        .filter((s) => s.channels.length > 0);

    const featured = CHANNELS.filter((c) => FEATURED_IDS.includes(c.id));

    return (
        <main dir="rtl" className="min-h-screen bg-[#07090D] text-white">
            <div
                aria-hidden
                className="pointer-events-none fixed inset-x-0 top-0 h-[420px]"
                style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(20,199,139,0.16), transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-[1600px] px-5 py-8 md:px-10 md:py-12 tv:px-[5vw] tv:py-[4vh]">
                <header className="mb-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#14c78b]/15 px-3 py-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#14c78b]" />
                        <span className="text-xs font-bold tracking-wider text-[#14c78b]">LIVE · پخش زنده</span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight md:text-5xl tv:text-6xl">
                        شبکه‌های <span className="text-[#14c78b]">تلویزیونی</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-400 md:text-lg">
                        {counts.all} شبکه، بدون وقفه، هر جا که هستید.
                    </p>
                </header>

                {activeCategory === "all" && (
                    <section className="mb-12">
                        <h2 className="mb-4 text-lg font-bold text-gray-300">پربیننده‌ها</h2>
                        <div className="grid gap-5 md:grid-cols-3">
                            {featured.map((ch) => (
                                <FeaturedCard key={ch.id} channel={ch} />
                            ))}
                        </div>
                    </section>
                )}

                <nav className="sticky top-0 z-20 -mx-5 mb-10 bg-[#07090D] px-5 py-3 md:-mx-10 md:px-10">
                    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                        {CATEGORIES.map((cat) => {
                            const active = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    data-tv-focus
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`tv-focus flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-[background-color,color] duration-200 md:text-base ${active
                                        ? "bg-[#14c78b] text-[#07090D]"
                                        : "bg-white/[0.06] text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <span>{cat.emoji}</span>
                                    {cat.label}
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-black/15" : "bg-white/10"}`}>
                                        {counts[cat.id] ?? 0}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <div className="space-y-14">
                    {sections.map((section) => (
                        <section key={section.id} style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}>
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-6 w-1.5 rounded-full" style={{ background: CATEGORY_STYLE[section.id]?.tag }} />
                                <h2 className="text-2xl font-bold tv:text-3xl">{section.label}</h2>
                                <span className="text-sm text-gray-500">{section.channels.length} شبکه</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 tv:gap-6">
                                {section.channels.map((ch) => (
                                    <ChannelCard key={ch.id} channel={ch} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}

function channelHref(ch: Channel) {
    return ch.comingSoon ? `/live/${ch.id}?comingSoon=true` : `/live/${ch.id}`;
}

function Logo({ channel, size }: { channel: Channel; size: "md" | "lg" }) {
    const box = size === "lg" ? "h-20 w-20" : "h-16 w-16";
    const img = size === "lg" ? "h-14 w-14" : "h-11 w-11";
    return (
        <div className={`${box} flex items-center justify-center rounded-2xl bg-white/[0.07] ring-1 ring-white/10`}>
            {channel.icon ? (
                <img src={channel.icon} alt={channel.title} loading="lazy" decoding="async" className={`${img} object-contain`} />
            ) : (
                <span className="text-lg font-black text-white/90" dir="ltr">
                    {channel.title.replace(/[^A-Za-z0-9+]/g, "").slice(0, 3) || channel.title.slice(0, 2)}
                </span>
            )}
        </div>
    );
}

function ChannelCard({ channel }: { channel: Channel }) {
    const s = CATEGORY_STYLE[channel.category] ?? CATEGORY_STYLE.iran;
    return (
        <Link
            href={channelHref(channel)}
            data-tv-focus
            className="tv-focus group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-4 ring-1 ring-white/[0.08] transition-transform duration-200 will-change-transform hover:scale-[1.04] focus-visible:scale-[1.06] md:p-5"
            style={{ background: `linear-gradient(145deg, ${s.from}, ${s.to})` }}
        >
            <div className="flex items-start justify-between">
                <Logo channel={channel} size="md" />
                {channel.comingSoon ? (
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold text-gray-300">به‌زودی</span>
                ) : (
                    <span className="flex items-center gap-1.5 rounded-md bg-[#14c78b] text-[#07090D] px-2 py-1 text-[10px] font-black tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#07090D]" />
                        LIVE
                    </span>
                )}
            </div>

            <div>
                <h3 className={`text-lg font-bold md:text-xl ${channel.comingSoon ? "text-gray-400" : ""}`}>{channel.title}</h3>
                <p className="mt-1 line-clamp-1 text-xs text-gray-400 md:text-sm">{channel.description}</p>
            </div>

            {!channel.comingSoon && (
                <span
                    className="absolute bottom-4 left-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    style={{ background: s.tag }}
                >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#07090D]"><path d="M8 5v14l11-7z" /></svg>
                </span>
            )}
        </Link>
    );
}

function FeaturedCard({ channel }: { channel: Channel }) {
    const s = CATEGORY_STYLE[channel.category] ?? CATEGORY_STYLE.iran;
    return (
        <Link
            href={channelHref(channel)}
            data-tv-focus
            className="tv-focus group relative flex items-center gap-5 overflow-hidden rounded-3xl p-6 ring-1 ring-white/10 transition-transform duration-200 will-change-transform hover:scale-[1.02] focus-visible:scale-[1.04]"
            style={{ background: `linear-gradient(120deg, ${s.from}, #07090D 85%)` }}
        >
            <Logo channel={channel} size="lg" />
            <div className="min-w-0 flex-1">
                <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#14c78b]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#14c78b]" />
                    در حال پخش
                </span>
                <h3 className="text-2xl font-black">{channel.title}</h3>
                <p className="mt-1 truncate text-sm text-gray-400">{channel.description}</p>
            </div>
            <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
                style={{ background: s.tag }}
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#07090D]"><path d="M8 5v14l11-7z" /></svg>
            </span>
        </Link>
    );
}