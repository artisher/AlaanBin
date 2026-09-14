
"use client";

import { useState } from "react";
import LivePlayer from "@/components/LivePlayer";

type Channel = {
    id: "varzesh" | "tv3";
    title: string;
    description: string;
    streamUrl: string;
};

const CHANNELS: Channel[] = [
    {
        id: "varzesh",
        title: "شبکه ورزش",
        description: "پخش زنده شبکه ورزش",
        streamUrl: "https://alanbin.com/live/varzesh/index.m3u8",
    },
    {
        id: "tv3",
        title: "شبکه ۳",
        description: "پخش زنده شبکه سه",
        streamUrl: "https://alanbin.com/live/tv3/index.m3u8",
    },
];

export default function LivePage() {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

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

                {/* Channel Selection */}
                {!selectedChannel && (
                    <div className="grid gap-5 sm:grid-cols-2">

                        {CHANNELS.map((channel) => (
                            <button
                                key={channel.id}
                                onClick={() => setSelectedChannel(channel)}
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
                                    {/* Live icon */}
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
                                            text-[#14c78b]
                                            transition-colors
                                            group-hover:bg-[#14c78b]/20
                                        "
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="h-7 w-7"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 10.5 19.5 7.5v9l-3.75-3M4.5 6.75h8.25a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V9A2.25 2.25 0 0 1 4.5 6.75Z"
                                            />
                                        </svg>
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
                            </button>
                        ))}
                    </div>
                )}

                {/* Player */}
                {selectedChannel && (
                    <section>
                        {/* Back button */}
                        <button
                            onClick={() => setSelectedChannel(null)}
                            className="
                                mb-5
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-gray-400
                                transition-colors
                                hover:text-[#14c78b]
                            "
                        >
                            <span className="text-lg">→</span>
                            بازگشت به انتخاب شبکه
                        </button>

                        {/* Player header */}
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14c78b] opacity-75" />
                                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#14c78b]" />
                                    </span>

                                    <h2 className="text-xl font-bold text-white md:text-2xl">
                                        {selectedChannel.title}
                                    </h2>
                                </div>

                                <p className="mt-2 text-sm text-gray-400">
                                    پخش زنده
                                </p>
                            </div>
                        </div>

                        {/* Player */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                            <LivePlayer
                                streamUrl={selectedChannel.streamUrl}
                            />
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}

