"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Tv, Trophy, Globe, Music, Clapperboard, LayoutGrid, Server, type LucideIcon } from "lucide-react";
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
    { id: "tv1-backup", category: "backup", title: "شبکه ۱ (پشتیبان)", description: "پخش زنده شبکه یک سیما - سرور پشتیبان", icon: "/logos/1.png" },
    { id: "tv2", category: "iran", title: "شبکه ۲", description: "پخش زنده شبکه دو سیما", icon: "/logos/2.png" },
    { id: "tv2-backup", category: "backup", title: "شبکه ۲ (پشتیبان)", description: "پخش زنده شبکه دو سیما - سرور پشتیبان", icon: "/logos/2.png" },
    { id: "tv3", category: "iran", title: "شبکه ۳", description: "پخش زنده شبکه سه سیما", icon: "/logos/3.png" },
    { id: "tv3-backup", category: "backup", title: "شبکه ۳ (پشتیبان)", description: "پخش زنده شبکه سه سیما - سرور پشتیبان", icon: "/logos/3.png" },
    { id: "varzesh", category: "sports", title: "شبکه ورزش", description: "پخش زنده شبکه ورزش", icon: "/logos/varzesh.png" },
    { id: "varzesh-backup", category: "backup", title: "شبکه ورزش (پشتیبان)", description: "پخش زنده شبکه ورزش - سرور پشتیبان", icon: "/logos/varzesh.png" },
    { id: "irinn", category: "iran", title: "شبکه خبر", description: "پخش زنده شبکه خبر", icon: "/logos/khabar.png" },
    { id: "irinn-backup", category: "backup", title: "شبکه خبر (پشتیبان)", description: "پخش زنده شبکه خبر - سرور پشتیبان", icon: "/logos/khabar.png" },
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

/* Muted accent per category — used only for small details */
const CATEGORIES: { id: string; label: string; icon: LucideIcon; accent: string }[] = [
    { id: "all", label: "همه", icon: LayoutGrid, accent: "#14c78b" },
    { id: "iran", label: "داخلی ایران", icon: Tv, accent: "#14c78b" },
    { id: "sports", label: "ورزشی", icon: Trophy, accent: "#e3a64a" },
    { id: "news", label: "خبری و بین‌المللی", icon: Globe, accent: "#5fa8e8" },
    { id: "music", label: "موسیقی", icon: Music, accent: "#a98bf5" },
    { id: "entertainment", label: "سرگرمی", icon: Clapperboard, accent: "#e879a6" },
    { id: "backup", label: "سرورهای پشتیبان", icon: Server, accent: "#8b9bb0" },
];

const ACCENT: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.accent]));

/* Main channels (without backups) — used for numbering and counts */
const MAIN_CHANNELS = CHANNELS.filter((c) => c.category !== "backup");
const mainIdOf = (id: string) => id.replace(/-backup$/, "");
const channelNumber = (id: string) => MAIN_CHANNELS.findIndex((c) => c.id === mainIdOf(id)) + 1;

const fa = (n: number) => n.toLocaleString("fa-IR");

export default function LivePage() {
    useTvNavigation();
    const [active, setActive] = useState("all");

    const counts = useMemo(() => {
        const map: Record<string, number> = { all: MAIN_CHANNELS.length };
        for (const c of CHANNELS) map[c.category] = (map[c.category] ?? 0) + 1;
        return map;
    }, []);

    const liveCount = MAIN_CHANNELS.filter((c) => !c.comingSoon).length;

    const sections = CATEGORIES.filter((c) => c.id !== "all" && (active === "all" || c.id === active))
        .map((c) => ({ ...c, channels: CHANNELS.filter((ch) => ch.category === c.id) }))
        .filter((s) => s.channels.length > 0);

    return (
        <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-white">
            {/* Background: CSS only, no images */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
                style={{ background: "radial-gradient(ellipse 55% 100% at 85% 0%, rgba(20,199,139,0.13), transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-[1600px] px-5 py-10 sm:px-8 md:py-14 lg:px-14 tv:max-w-none tv:px-[5vw]">
                {/* Header */}
                <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                            <span className="text-[11px] font-semibold tracking-[0.15em] text-white/60">LIVE TV</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl tv:text-5xl">پخش زنده</h1>
                        <p className="mt-2 text-sm text-white/45 md:text-base">شبکه‌های ایرانی و بین‌المللی، بدون وقفه.</p>
                    </div>

                    <div className="flex gap-8 text-right">
                        <div>
                            <div className="text-2xl font-bold tabular-nums tv:text-3xl">{fa(liveCount)}</div>
                            <div className="mt-0.5 text-xs text-white/40">شبکه فعال</div>
                        </div>
                        <div className="w-px bg-white/[0.08]" />
                        <div>
                            <div className="text-2xl font-bold tabular-nums tv:text-3xl">{fa(counts.backup ?? 0)}</div>
                            <div className="mt-0.5 text-xs text-white/40">سرور پشتیبان</div>
                        </div>
                    </div>
                </header>

                {/* Tabs */}
                <nav className="sticky top-0 z-20 -mx-5 mb-10 bg-[#0B0F14]/95 px-5 py-3 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14">
                    <div className="no-scrollbar flex gap-2 overflow-x-auto">
                        {CATEGORIES.map((cat) => {
                            const isActive = active === cat.id;
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    data-tv-focus
                                    onClick={() => setActive(cat.id)}
                                    className={`tv-focus flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${isActive
                                            ? "border-white bg-white text-[#0B0F14]"
                                            : "border-white/[0.08] bg-white/[0.02] text-white/65 hover:border-white/20 hover:text-white"
                                        }`}
                                >
                                    <Icon size={15} style={{ color: isActive ? undefined : cat.accent }} />
                                    {cat.label}
                                    <span className={`text-xs tabular-nums ${isActive ? "text-black/50" : "text-white/30"}`}>
                                        {fa(counts[cat.id] ?? 0)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <section key={section.id} style={{ contentVisibility: "auto", containIntrinsicSize: "500px" }}>
                                <div className="mb-4 flex items-center gap-3">
                                    <Icon size={18} style={{ color: section.accent }} />
                                    <h2 className="text-lg font-semibold md:text-xl tv:text-2xl">{section.label}</h2>
                                    <span className="text-xs tabular-nums text-white/30">{fa(section.channels.length)}</span>
                                    <span className="h-px flex-1 bg-gradient-to-l from-white/[0.08] to-transparent" />
                                </div>

                                {section.id === "backup" && (
                                    <p className="-mt-2 mb-4 text-xs text-white/35">
                                        اگر پخش اصلی قطع بود یا کند بود، از این سرورها استفاده کنید.
                                    </p>
                                )}

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 tv:gap-5">
                                    {section.channels.map((ch) => (
                                        <ChannelCard key={ch.id} channel={ch} number={channelNumber(ch.id)} />
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

function ChannelCard({ channel, number }: { channel: Channel; number: number }) {
    const accent = ACCENT[channel.category] ?? "#14c78b";
    const isBackup = channel.category === "backup";
    const href = channel.comingSoon ? `/live/${channel.id}?comingSoon=true` : `/live/${channel.id}`;

    return (
        <Link
            href={href}
            data-tv-focus
            style={
                {
                    "--accent-soft": `${accent}66`,
                    background: `linear-gradient(180deg, ${accent}0d 0%, transparent 55%), #11151c`,
                } as CSSProperties
            }
            className={`tv-focus group relative flex flex-col overflow-hidden rounded-lg border border-white/[0.07] p-4 transition-[transform,border-color] duration-200 will-change-transform hover:-translate-y-0.5 hover:border-[var(--accent-soft)] focus-visible:-translate-y-0.5 focus-visible:border-[var(--accent-soft)] md:p-5 ${channel.comingSoon ? "opacity-55" : ""
                }`}
        >
            {/* Accent line */}
            <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] opacity-50 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ background: accent }}
            />

            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.04] tv:h-14 tv:w-14">
                    {channel.icon ? (
                        <img
                            src={channel.icon}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-9 w-9 object-contain tv:h-11 tv:w-11"
                        />
                    ) : (
                        <span className="text-sm font-bold text-white/85" dir="ltr">
                            {channel.title.replace(/[^A-Za-z0-9+]/g, "").slice(0, 3) || channel.title.slice(0, 2)}
                        </span>
                    )}
                </div>

                <span className="font-mono text-[11px] tabular-nums text-white/25" dir="ltr">
                    CH {String(number).padStart(2, "0")}
                    {isBackup && <span className="text-white/40"> · B</span>}
                </span>
            </div>

            <h3 className="mt-5 truncate text-base font-semibold md:text-lg tv:text-xl">{channel.title}</h3>
            <p className="mt-1 truncate text-xs text-white/40 md:text-sm">{channel.description}</p>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
                {channel.comingSoon ? (
                    <span className="text-[11px] font-medium text-white/50">به‌زودی</span>
                ) : (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        {isBackup ? "BACKUP" : "LIVE"}
                    </span>
                )}

                {!channel.comingSoon && (
                    <span
                        className="translate-x-1 text-xs font-medium opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        style={{ color: accent }}
                    >
                        ← تماشا
                    </span>
                )}
            </div>
        </Link>
    );
}