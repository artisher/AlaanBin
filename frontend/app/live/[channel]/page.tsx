import { notFound } from "next/navigation";
import LivePlayer from "@/components/LivePlayer";
import Link from "next/link";
import TvNav from "../../../components/TvNav";

const CHANNELS = {
    tv1: { title: "شبکه ۱", streamUrl: "/live/tv1/index.m3u8", comingSoon: false },
    "tv1-backup": { title: "شبکه ۱ (پشتیبان)", streamUrl: "/live/tv1-backup/index.m3u8", comingSoon: false },
    tv2: { title: "شبکه ۲", streamUrl: "/live/tv2/index.m3u8", comingSoon: false },
    "tv2-backup": { title: "شبکه ۲ (پشتیبان)", streamUrl: "/live/tv2-backup/index.m3u8", comingSoon: false },
    tv3: { title: "شبکه ۳", streamUrl: "/live/tv3/index.m3u8", comingSoon: false },
    "tv3-backup": { title: "شبکه ۳ (پشتیبان)", streamUrl: "/live/tv3-backup/index.m3u8", comingSoon: false },
    varzesh: { title: "شبکه ورزش", streamUrl: "/live/varzesh/index.m3u8", comingSoon: false },
    "varzesh-backup": { title: "شبکه ورزش (پشتیبان)", streamUrl: "/live/varzesh-backup/index.m3u8", comingSoon: false },
    irinn: { title: "شبکه خبر", streamUrl: "/live/irinn/index.m3u8", comingSoon: false },
    "irinn-backup": { title: "شبکه خبر (پشتیبان)", streamUrl: "/live/irinn-backup/index.m3u8", comingSoon: false },
    fifa: { title: "FIFA+", streamUrl: "/api/live/fifa/index.m3u8", comingSoon: false },
    euronews: { title: "Euronews", streamUrl: "/api/live/euronews/index.m3u8", comingSoon: false },
    "persiana-music": { title: "Persiana Music", streamUrl: "/api/live/persiana-music/index.m3u8", comingSoon: false },
    "redbull-tv": { title: "Red Bull TV", streamUrl: "/api/live/redbull-tv/index.m3u8", comingSoon: false },
    fars: { title: "استان فارس", streamUrl: "/api/live/fars/index.m3u8", comingSoon: false },
    "super-tennis": { title: "سوپر تنیس", streamUrl: "/api/live/super-tennis/index.m3u8", comingSoon: false },
    gem: { title: "GEM", streamUrl: "/api/live/gem/index.m3u8", comingSoon: false },
    "bbc-persian": { title: "BBC فارسی", streamUrl: "/api/live/bbc-persian/index.m3u8", comingSoon: false },
    "project-leon": { title: "Project Leon", streamUrl: "/api/live/project-leon/index.m3u8", comingSoon: false },
    voa: { title: "صدای آمریکا", streamUrl: "/api/live/voa/index.m3u8", comingSoon: false },
    "iran-international": { title: "ایران اینترنشنال", streamUrl: "/api/live/iran-international/index.m3u8", comingSoon: false },
    nasim: { title: "شبکه نسیم", streamUrl: "/live/nasim/index.m3u8", comingSoon: false },
    "nasim-backup": { title: "شبکه نسیم (پشتیبان)", streamUrl: "/live/nasim-backup/index.m3u8", comingSoon: false },
    ifilm: { title: "شبکه آی فیلم", streamUrl: "/live/ifilm/index.m3u8", comingSoon: false },
    "ifilm-backup": { title: "شبکه آی فیلم (پشتیبان)", streamUrl: "/live/ifilm-backup/index.m3u8", comingSoon: false },
    namayesh: { title: "شبکه نمایش", streamUrl: "/live/namayesh/index.m3u8", comingSoon: false },
    "namayesh-backup": { title: "شبکه نمایش (پشتیبان)", streamUrl: "/live/namayesh-backup/index.m3u8", comingSoon: false },
    pooya: { title: "شبکه پویا", streamUrl: "/live/pooya/index.m3u8", comingSoon: false },
    "pooya-backup": { title: "شبکه پویا (پشتیبان)", streamUrl: "/live/pooya-backup/index.m3u8", comingSoon: false },
    tehran: { title: "شبکه تهران", streamUrl: "/live/tehran/index.m3u8", comingSoon: false },
} as const;

type ChannelId = keyof typeof CHANNELS;
type PageProps = { params: Promise<{ channel: string }> };

const BACKUP_OF: Record<string, string> = {
    "tv1-backup": "tv1",
    "tv2-backup": "tv2",
    "tv3-backup": "tv3",
    "irinn-backup": "irinn",
    "varzesh-backup": "varzesh",
    "pooya-backup": "pooya",
    "nasim-backup": "nasim",
    "ifilm-backup": "ifilm",
    "namayesh-backup": "namayesh",
};

const SESSION_CHANNELS = ["tv1", "tv2", "tv3", "varzesh", "irinn"] as const;

/* Muted category accent (same palette as the list page) */
const ACCENT: Record<string, string> = {
    varzesh: "#e3a64a",
    fifa: "#e3a64a",
    "redbull-tv": "#e3a64a",
    "super-tennis": "#e3a64a",
    euronews: "#5fa8e8",
    "bbc-persian": "#5fa8e8",
    "project-leon": "#5fa8e8",
    voa: "#5fa8e8",
    "iran-international": "#5fa8e8",
    "persiana-music": "#a98bf5",
    gem: "#e879a6",
};

export default async function LiveChannelPage({ params }: PageProps) {
    const { channel } = await params;
    if (!Object.hasOwn(CHANNELS, channel)) notFound();

    const selected = CHANNELS[channel as ChannelId];
    const mainId = BACKUP_OF[channel] ?? channel;
    const accent = ACCENT[mainId] ?? "#14c78b";

    /* ---------- Coming soon ---------- */
    if (selected.comingSoon) {
        return (
            <main dir="rtl" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F14] px-5">
                <TvNav />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage: "radial-gradient(circle at 50% 45%, #000 0%, transparent 60%)",
                        WebkitMaskImage: "radial-gradient(circle at 50% 45%, #000 0%, transparent 60%)",
                    }}
                />
                <div className="relative w-full max-w-md rounded-lg border border-white/[0.07] bg-[#11151c] p-8 text-center sm:p-10">
                    <span className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] px-2.5 py-1 text-[11px] font-semibold tracking-[0.15em] text-white/50">
                        COMING SOON
                    </span>
                    <h1 className="mt-5 text-3xl font-bold tracking-tight text-white tv:text-4xl">{selected.title}</h1>
                    <p className="mt-3 text-sm leading-7 text-white/45 sm:text-base">
                        پخش زنده این شبکه هنوز راه‌اندازی نشده است.
                        <br />
                        به‌زودی می‌توانید آن را در الان‌بین تماشا کنید.
                    </p>
                    <Link
                        href="/live"
                        data-tv-focus
                        autoFocus
                        className="tv-focus mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#0B0F14] transition-transform duration-200 hover:scale-[1.03] focus-visible:scale-[1.03] tv:text-base"
                    >
                        → بازگشت به شبکه‌ها
                    </Link>
                </div>
            </main>
        );
    }

    if (!("streamUrl" in selected)) notFound();

    const sessionType = (SESSION_CHANNELS as readonly string[]).includes(mainId)
        ? (mainId as (typeof SESSION_CHANNELS)[number])
        : undefined;

    // Prev/next skip backups and coming-soon channels
    const playable = (Object.keys(CHANNELS) as ChannelId[]).filter(
        (id) => !CHANNELS[id].comingSoon && !BACKUP_OF[id]
    );
    const idx = playable.indexOf(mainId as ChannelId);
    const prev = playable[(idx - 1 + playable.length) % playable.length];
    const next = playable[(idx + 1) % playable.length];

    const backupId = `${mainId}-backup`;
    const hasBackup = Object.hasOwn(CHANNELS, backupId);
    const isOnBackup = channel !== mainId;
    const mainTitle = CHANNELS[mainId as ChannelId].title;

    return (
        <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#0B0F14] text-white">
            <TvNav />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
                style={{ background: `radial-gradient(ellipse 55% 100% at 85% 0%, ${accent}1f, transparent 70%)` }}
            />

            <div className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-8 md:py-10 tv:max-w-none tv:px-[4vw] tv:py-[3vh]">
                {/* Top bar */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/live"
                            data-tv-focus
                            aria-label="بازگشت"
                            className="tv-focus flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-lg text-white/60 transition-colors hover:border-white/20 hover:text-white"
                        >
                            →
                        </Link>
                        <div>
                            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-white/50">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                                LIVE
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl tv:text-4xl">{mainTitle}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Server switch */}
                        {hasBackup && (
                            <div className="flex rounded-md border border-white/[0.08] bg-white/[0.02] p-1">
                                <Link
                                    href={`/live/${mainId}`}
                                    data-tv-focus
                                    className={`tv-focus rounded px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${!isOnBackup ? "bg-white text-[#0B0F14]" : "text-white/55 hover:text-white"
                                        }`}
                                >
                                    سرور اصلی
                                </Link>
                                <Link
                                    href={`/live/${backupId}`}
                                    data-tv-focus
                                    className={`tv-focus rounded px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${isOnBackup ? "bg-white text-[#0B0F14]" : "text-white/55 hover:text-white"
                                        }`}
                                >
                                    پشتیبان
                                </Link>
                            </div>
                        )}

                        <Link
                            href="/live"
                            data-tv-focus
                            className="tv-focus hidden rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white sm:inline-flex"
                        >
                            همه شبکه‌ها
                        </Link>
                    </div>
                </div>

                {/* Player */}
                <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-black">
                    <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-[2px] opacity-70" style={{ background: accent }} />
                    <LivePlayer streamUrl={selected.streamUrl} sessionType={sessionType} />
                </div>

                {isOnBackup && (
                    <p className="mt-3 text-xs text-white/40">در حال پخش از سرور پشتیبان</p>
                )}

                {/* Zapping */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <ZapButton id={next} label="شبکه بعدی" arrow="←" />
                    <ZapButton id={prev} label="شبکه قبلی" arrow="→" alignEnd />
                </div>
            </div>
        </main>
    );
}

function ZapButton({ id, label, arrow, alignEnd }: { id: ChannelId; label: string; arrow: string; alignEnd?: boolean }) {
    return (
        <Link
            href={`/live/${id}`}
            data-tv-focus
            className={`tv-focus group flex items-center gap-3 rounded-lg border border-white/[0.07] bg-[#11151c] p-4 transition-colors hover:border-white/20 ${alignEnd ? "flex-row-reverse" : ""
                }`}
        >
            <span className="text-lg text-white/40 transition-colors group-hover:text-white">{arrow}</span>
            <div className={alignEnd ? "text-left" : ""}>
                <div className="text-[11px] text-white/35">{label}</div>
                <div className="mt-0.5 font-semibold">{CHANNELS[id].title}</div>
            </div>
        </Link>
    );
}