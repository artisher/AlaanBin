
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type NativeTestPlayerProps = {
    inline?: boolean;
};

type PlayerEvent = {
    time: string;
    event: string;
    currentTime: number;
    readyState: number;
    networkState: number;
    message?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const VIDEO_URL = API_URL
    ? `${API_URL.replace(/\/+$/, "")}/videos/tangsir.mp4`
    : "";

const EVENTS = [
    "loadstart",
    "loadedmetadata",
    "loadeddata",
    "canplay",
    "playing",
    "pause",
    "waiting",
    "stalled",
    "suspend",
    "seeking",
    "seeked",
    "ended",
    "error",
] as const;

export default function NativeTestPlayer({
    inline = false,
}: NativeTestPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [status, setStatus] = useState("در انتظار شروع");
    const [events, setEvents] = useState<PlayerEvent[]>([]);

    const recordEvent = useCallback(
        (event: string, message?: string) => {
            const video = videoRef.current;

            const entry: PlayerEvent = {
                time: new Date().toLocaleTimeString(),
                event,
                currentTime: video?.currentTime ?? 0,
                readyState: video?.readyState ?? 0,
                networkState: video?.networkState ?? 0,
                ...(message ? { message } : {}),
            };

            setEvents((previous) => [entry, ...previous].slice(0, 100));

            if (event === "error") {
                const error = video?.error;
                setStatus(
                    error
                        ? `خطای رسانه: ${error.code}`
                        : "خطای رسانه"
                );
            } else if (event === "playing") {
                setStatus("در حال پخش");
            } else if (event === "waiting" || event === "stalled") {
                setStatus("انتظار برای دریافت داده");
            } else if (event === "pause") {
                setStatus("متوقف");
            } else if (event === "ended") {
                setStatus("پایان ویدئو");
            } else if (event === "loadedmetadata") {
                setStatus("اطلاعات ویدئو دریافت شد");
            }
        },
        []
    );

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const listeners = EVENTS.map((event) => {
            const listener = () => recordEvent(event);
            video.addEventListener(event, listener);
            return { event, listener };
        });

        return () => {
            listeners.forEach(({ event, listener }) => {
                video.removeEventListener(event, listener);
            });
        };
    }, [recordEvent]);

    const video = videoRef.current;

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[#0B0F14] px-4 py-8 text-white sm:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <header className="mb-6">
                    <p className="text-sm text-[#14c78b]">
                        AlanBin · Player Lab
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        {inline ? "Inline Player" : "Native HTML5 Player"}
                    </h1>

                    <p className="mt-3 break-all text-sm text-gray-400">
                        فایل آزمایشی: tangsir.mp4
                    </p>
                </header>

                <section className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <video
                        ref={videoRef}
                        controls
                        {...(inline ? { playsInline: true } : {})}
                        {...(inline ? { preload: "metadata" as const } : {})}
                        className="aspect-video w-full"
                        src={VIDEO_URL}
                        onPlay={() => setStatus("درخواست پخش")}
                    />
                </section>

                <section className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                    <h2 className="text-xl font-bold">وضعیت پلیر</h2>

                    <p className="mt-3 text-lg text-[#14c78b]">
                        {status}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <Info
                            label="Ready State"
                            value={video?.readyState ?? 0}
                        />
                        <Info
                            label="Network State"
                            value={video?.networkState ?? 0}
                        />
                        <Info
                            label="Current Time"
                            value={(video?.currentTime ?? 0).toFixed(2)}
                        />
                        <Info
                            label="Duration"
                            value={
                                Number.isFinite(video?.duration)
                                    ? (video?.duration ?? 0).toFixed(2)
                                    : "نامشخص"
                            }
                        />
                    </div>
                </section>

                <section className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold">
                            رویدادهای اخیر
                        </h2>

                        <button
                            type="button"
                            onClick={() => setEvents([])}
                            className="rounded-xl border border-white/15 px-4 py-3 text-sm hover:bg-white/10"
                        >
                            پاک کردن گزارش
                        </button>
                    </div>

                    <div className="max-h-80 space-y-2 overflow-auto">
                        {events.length === 0 ? (
                            <p className="text-gray-400">
                                هنوز رویدادی ثبت نشده است.
                            </p>
                        ) : (
                            events.map((entry, index) => (
                                <div
                                    key={`${entry.time}-${entry.event}-${index}`}
                                    className="rounded-lg bg-black/30 p-3 text-sm"
                                >
                                    <div className="flex flex-wrap justify-between gap-2">
                                        <span className="font-semibold text-[#14c78b]">
                                            {entry.event}
                                        </span>
                                        <span className="text-gray-400">
                                            {entry.time}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-gray-300">
                                        زمان: {entry.currentTime.toFixed(2)}s
                                        {" · "}
                                        Ready: {entry.readyState}
                                        {" · "}
                                        Network: {entry.networkState}
                                    </p>

                                    {entry.message && (
                                        <p className="mt-1 break-words text-red-400">
                                            {entry.message}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl bg-black/30 p-3">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="mt-2 break-words text-lg font-semibold">
                {value}
            </p>
        </div>
    );
}
