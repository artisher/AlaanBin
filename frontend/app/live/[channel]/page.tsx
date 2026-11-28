import { notFound } from "next/navigation";
import LivePlayer from "@/components/LivePlayer";
import Link from "next/link";
import TvNav from "../../../components/TvNav";

const CHANNELS = {
    tv1: { title: "شبکه ۱", streamUrl: "https://alanbin.com/live/tv1/index.m3u8", comingSoon: false },
    "tv1-backup": { title: "شبکه ۱ (پشتیبان)", streamUrl: "https://alanbin.com/live/tv1-backup/index.m3u8", comingSoon: false },
    tv2: { title: "شبکه ۲", streamUrl: "https://alanbin.com/live/tv2/index.m3u8", comingSoon: false },
    "tv2-backup": { title: "شبکه ۲ (پشتیبان)", streamUrl: "https://alanbin.com/live/tv2-backup/index.m3u8", comingSoon: false },
    tv3: { title: "شبکه ۳", streamUrl: "https://alanbin.com/live/tv3/index.m3u8", comingSoon: false },
    "tv3-backup": { title: "شبکه ۳ (پشتیبان)", streamUrl: "https://alanbin.com/live/tv3-backup/index.m3u8", comingSoon: false },
    varzesh: { title: "شبکه ورزش", streamUrl: "https://alanbin.com/live/varzesh/index.m3u8", comingSoon: false },
    irinn: { title: "شبکه خبر", streamUrl: "https://alanbin.com/live/irinn/index.m3u8", comingSoon: false },
    "irinn-backup": { title: "شبکه خبر (پشتیبان)", streamUrl: "https://alanbin.com/live/irinn-backup/index.m3u8", comingSoon: false },
    fifa: { title: "FIFA+", streamUrl: "https://alanbin.com/api/live/fifa/index.m3u8", comingSoon: false },
    euronews: { title: "Euronews", streamUrl: "https://alanbin.com/api/live/euronews/index.m3u8", comingSoon: false },
    "persiana-music": { title: "Persiana Music", streamUrl: "https://alanbin.com/api/live/persiana-music/index.m3u8", comingSoon: false },
    "redbull-tv": { title: "Red Bull TV", streamUrl: "https://alanbin.com/api/live/redbull-tv/index.m3u8", comingSoon: false },
    fars: { title: "استان فارس", streamUrl: "https://alanbin.com/api/live/fars/index.m3u8", comingSoon: false },
    "super-tennis": { title: "سوپر تنیس", streamUrl: "https://alanbin.com/api/live/super-tennis/index.m3u8", comingSoon: false },
    gem: { title: "GEM", streamUrl: "https://alanbin.com/api/live/gem/index.m3u8", comingSoon: false },
    "bbc-persian": { title: "BBC فارسی", streamUrl: "https://alanbin.com/api/live/bbc-persian/index.m3u8", comingSoon: false },
    "project-leon": { title: "Project Leon", streamUrl: "https://alanbin.com/api/live/project-leon/index.m3u8", comingSoon: false },
    voa: { title: "صدای آمریکا", streamUrl: "https://alanbin.com/api/live/voa/index.m3u8", comingSoon: false },
    "iran-international": { title: "ایران اینترنشنال", streamUrl: "https://alanbin.com/api/live/iran-international/index.m3u8", comingSoon: false },
    nasim: { title: "شبکه نسیم", comingSoon: true },
    ifilm: { title: "شبکه آی فیلم", comingSoon: true },
    namayesh: { title: "شبکه نمایش", comingSoon: true },
    pooya: { title: "شبکه پویا", comingSoon: true },
} as const;

type ChannelId = keyof typeof CHANNELS;
type PageProps = { params: Promise<{ channel: string }> };

const BACKUP_OF: Record<string, string> = {
    "tv1-backup": "tv1",
    "tv2-backup": "tv2",
    "tv3-backup": "tv3",
    "irinn-backup": "irinn",
};

const SESSION_CHANNELS = ["tv1", "tv2", "tv3", "varzesh", "irinn"] as const;

export default async function LiveChannelPage({ params }: PageProps) {
    const { channel } = await params;
    if (!Object.hasOwn(CHANNELS, channel)) notFound();

    const selected = CHANNELS[channel as ChannelId];

    if (selected.comingSoon) {
        return (
            <main dir="rtl" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090D] px-5">
                <TvNav />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "radial-gradient(circle at 50% 40%, rgba(20,199,139,0.14), transparent 60%)" }}
                />
                <div className="relative w-full max-w-lg text-center">
                    <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/[0.06] ring-1 ring-white/10">
                        <span className="text-5xl">📡</span>
                    </div>
                    <span className="inline-flex rounded-full bg-[#14c78b]/15 px-4 py-1.5 text-xs font-black tracking-widest text-[#14c78b]">
                        به‌زودی
                    </span>
                    <h1 className="mt-5 text-4xl font-black text-white tv:text-5xl">{selected.title}</h1>
                    <p className="mt-4 text-base leading-8 text-gray-400">
                        پخش زنده این شبکه هنوز راه‌اندازی نشده است.
                        <br />
                        به‌زودی می‌توانید آن را در الان‌بین تماشا کنید.
                    </p>
                    <Link
                        href="/live"
                        data-tv-focus
                        autoFocus
                        className="tv-focus mt-10 inline-flex items-center gap-2 rounded-2xl bg-[#14c78b] px-8 py-4 text-lg font-bold text-[#07090D] transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
                    >
                        → بازگشت به شبکه‌ها
                    </Link>
                </div>
            </main>
        );
    }

    if (!("streamUrl" in selected)) notFound();

    const sessionType = (SESSION_CHANNELS as readonly string[]).includes((BACKUP_OF[channel] ?? channel))
        ? (((BACKUP_OF[channel] ?? channel)) as (typeof SESSION_CHANNELS)[number])
        : undefined;

    const playable = (Object.keys(CHANNELS) as ChannelId[]).filter((id) => !CHANNELS[id].comingSoon);
    const idx = playable.indexOf(channel as ChannelId);
    const prev = playable[(idx - 1 + playable.length) % playable.length];
    const next = playable[(idx + 1) % playable.length];

    return (
        <main dir="rtl" className="min-h-screen bg-[#07090D] text-white">
            <TvNav />
            <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10 tv:max-w-none tv:px-[4vw] tv:py-[3vh]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/live"
                            data-tv-focus
                            aria-label="بازگشت"
                            className="tv-focus flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-xl text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            →
                        </Link>
                        <div>
                            <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-black tracking-wider text-[#14c78b]">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#14c78b]" />
                                LIVE
                            </div>
                            <h1 className="text-2xl font-black md:text-3xl tv:text-4xl">{selected.title}</h1>
                        </div>
                    </div>

                    <Link
                        href="/live"
                        data-tv-focus
                        className="tv-focus hidden rounded-2xl bg-white/[0.06] px-5 py-3 text-sm font-bold text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
                    >
                        همه شبکه‌ها
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 tv:rounded-xl">
                    <LivePlayer streamUrl={selected.streamUrl} sessionType={sessionType} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
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
            className={`tv-focus flex items-center gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.09] ${alignEnd ? "flex-row-reverse" : ""
                }`}
        >
            <span className="text-xl text-[#14c78b]">{arrow}</span>
            <div className={alignEnd ? "text-left" : ""}>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="font-bold">{CHANNELS[id].title}</div>
            </div>
        </Link>
    );
}