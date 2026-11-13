
import { notFound } from "next/navigation";
import LivePlayer from "@/components/LivePlayer";
import Link from "next/link";

const CHANNELS = {
    tv1: {
        title: "شبکه ۱",
        streamUrl: "https://alanbin.com/api/live/tv1/index.m3u8",
        comingSoon: false,
    },
    tv3: {
        title: "شبکه ۳",
        streamUrl: "https://alanbin.com/live/tv3/index.m3u8",
        comingSoon: false,
    },
    varzesh: {
        title: "شبکه ورزش",
        streamUrl: "https://alanbin.com/api/live/varzesh/index.m3u8",
        comingSoon: false,
    },
    irinn: {
        title: "شبکه خبر",
        streamUrl: "https://alanbin.com/live/irinn/index.m3u8",
        comingSoon: false,
    },
    nasim: {
        title: "شبکه نسیم",
        comingSoon: true,
    },
    ifilm: {
        title: "شبکه آی فیلم",
        comingSoon: true,
    },
    namayesh: {
        title: "شبکه نمایش",
        comingSoon: true,
    },
    pooya: {
        title: "شبکه پویا",
        comingSoon: true,
    },
} as const;

type ChannelId = keyof typeof CHANNELS;

type PageProps = {
    params: Promise<{
        channel: string;
    }>;
};

export default async function LiveChannelPage({
    params,
}: PageProps) {
    const { channel } = await params;

    if (!Object.hasOwn(CHANNELS, channel)) {
        notFound();
    }

    const selectedChannel = CHANNELS[channel as ChannelId];

    // Coming Soon
    if (selectedChannel.comingSoon) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-4 py-8">
                <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111827] p-8 text-center shadow-2xl">

                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#14c78b]/10">
                        <span className="text-4xl">📡</span>
                    </div>

                    <span className="mb-4 inline-flex rounded-full bg-[#14c78b]/10 px-4 py-2 text-xs font-bold text-[#14c78b]">
                        COMING SOON
                    </span>

                    <h1 className="mt-4 text-2xl font-bold text-white">
                        {selectedChannel.title}
                    </h1>

                    <p className="mt-4 text-sm leading-8 text-gray-400">
                        پخش زنده این شبکه هنوز راه‌اندازی نشده است.
                        <br />
                        به‌زودی می‌توانید این شبکه را در الان‌بین تماشا کنید.
                    </p>

                    <Link
                        href="/live"
                        className="mt-8 inline-flex rounded-xl bg-[#14c78b] px-6 py-3 font-bold text-[#0B0F14] transition hover:bg-[#10ad78]"
                    >
                        بازگشت به شبکه‌ها
                    </Link>
                </div>
            </main>
        );
    }

    // Active Player
    if (!("streamUrl" in selectedChannel)) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0B0F14] px-4 py-8 md:px-8 md:py-12">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14c78b] opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#14c78b]" />
                            </span>

                            <span className="text-sm font-medium text-[#14c78b]">
                                پخش زنده
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold text-white md:text-3xl">
                            {selectedChannel.title}
                        </h1>
                    </div>

                    <Link
                        href="/live"
                        className="rounded-lg border border-white/10 bg-[#111827] px-4 py-2 text-sm text-gray-300 transition hover:border-[#14c78b]/40 hover:text-[#14c78b]"
                    >
                        انتخاب شبکه
                    </Link>
                </div>

                {/* Player */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <LivePlayer
                        streamUrl={selectedChannel.streamUrl}
                        sessionType={
                            channel === "tv1" ||
                                channel === "tv3" ||
                                channel === "varzesh" ||
                                channel === "irinn"
                                ? channel
                                : undefined
                        }
                    />
                </div>

                {/* Channel info */}
                <div className="mt-5 rounded-xl border border-white/10 bg-[#111827] p-4">
                    <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#14c78b]" />
                        <span className="text-sm text-gray-300">
                            در حال پخش زنده {selectedChannel.title}
                        </span>
                    </div>
                </div>

            </div>
        </main>
    );
}
