
import { notFound } from "next/navigation";
import LivePlayer from "@/components/LivePlayer";
import Link from "next/link";

const CHANNELS = {
    tv3: {
        title: "شبکه ۳",
        streamUrl: "https://alanbin.com/live/tv3/index.m3u8",
    },
    varzesh: {
        title: "شبکه ورزش",
        streamUrl: "https://alanbin.com/live/varzesh/index.m3u8",
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

    if (!(channel in CHANNELS)) {
        notFound();
    }

    const selectedChannel = CHANNELS[channel as ChannelId];

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
                        className="
                            rounded-lg
                            border
                            border-white/10
                            bg-[#111827]
                            px-4
                            py-2
                            text-sm
                            text-gray-300
                            transition
                            hover:border-[#14c78b]/40
                            hover:text-[#14c78b]
                        "
                    >
                        انتخاب شبکه
                    </Link>
                </div>

                {/* Player */}
                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black
                        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                    "
                >
                    <LivePlayer
                        streamUrl={selectedChannel.streamUrl}
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

