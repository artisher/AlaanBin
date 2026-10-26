
"use client";

import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
const VIDEO_URL = API_URL ? `${API_URL}/videos/tangsir.mp4` : "";

type DiagnosticEvent = {
    time: string;
    name: string;
    details: string;
};

export default function DiagnosticsPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [events, setEvents] = useState<DiagnosticEvent[]>([]);
    const [browserInfo, setBrowserInfo] = useState("در حال بررسی...");
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        setBrowserInfo(
            [
                `User Agent: ${navigator.userAgent}`,
                `Platform: ${navigator.platform}`,
                `Online: ${navigator.onLine}`,
                `Screen: ${screen.width} × ${screen.height}`,
                `Viewport: ${window.innerWidth} × ${window.innerHeight}`,
                `Video support: ${document.createElement("video").canPlayType("video/mp4") || "unknown"}`,
            ].join("\n")
        );

        const updateFullscreen = () => {
            const video = videoRef.current as
                | (HTMLVideoElement & { webkitDisplayingFullscreen?: boolean })
                | null;

            setIsFullscreen(
                Boolean(document.fullscreenElement) ||
                Boolean(video?.webkitDisplayingFullscreen)
            );
        };

        document.addEventListener("fullscreenchange", updateFullscreen);
        videoRef.current?.addEventListener(
            "webkitbeginfullscreen",
            updateFullscreen
        );
        videoRef.current?.addEventListener(
            "webkitendfullscreen",
            updateFullscreen
        );

        return () => {
            document.removeEventListener("fullscreenchange", updateFullscreen);
            videoRef.current?.removeEventListener(
                "webkitbeginfullscreen",
                updateFullscreen
            );
            videoRef.current?.removeEventListener(
                "webkitendfullscreen",
                updateFullscreen
            );
        };
    }, []);

    const logEvent = (name: string) => {
        const video = videoRef.current;

        const details = video
            ? [
                `currentTime=${video.currentTime.toFixed(2)}`,
                `duration=${Number.isFinite(video.duration) ? video.duration.toFixed(2) : "unknown"}`,
                `readyState=${video.readyState}`,
                `networkState=${video.networkState}`,
                `paused=${video.paused}`,
                `error=${video.error?.code ?? "none"}`,
            ].join(" | ")
            : "Video element unavailable";

        setEvents((previous) =>
            [
                {
                    time: new Date().toLocaleTimeString(),
                    name,
                    details,
                },
                ...previous,
            ].slice(0, 100)
        );
    };

    const copyReport = async () => {
        const report = [
            "AlanBin Player Diagnostics",
            new Date().toISOString(),
            browserInfo,
            `Fullscreen: ${isFullscreen}`,
            `Video URL configured: ${Boolean(VIDEO_URL)}`,
            "",
            ...events.map(
                (event) =>
                    `[${event.time}] ${event.name}: ${event.details}`
            ),
        ].join("\n");

        try {
            await navigator.clipboard.writeText(report);
            alert("گزارش کپی شد.");
        } catch {
            window.prompt("گزارش را کپی کنید:", report);
        }
    };

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[#0B0F14] px-4 py-8 text-white"
        >
            <div className="mx-auto max-w-5xl">
                <p className="text-sm font-semibold text-emerald-400">
                    AlanBin · Player Lab
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                    Player Diagnostics
                </h1>

                <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <video
                        ref={videoRef}
                        src={VIDEO_URL}
                        controls
                        playsInline
                        preload="metadata"
                        className="aspect-video w-full"
                        onLoadStart={() => logEvent("loadstart")}
                        onLoadedMetadata={() => logEvent("loadedmetadata")}
                        onLoadedData={() => logEvent("loadeddata")}
                        onCanPlay={() => logEvent("canplay")}
                        onPlay={() => logEvent("play")}
                        onPlaying={() => logEvent("playing")}
                        onPause={() => logEvent("pause")}
                        onWaiting={() => logEvent("waiting")}
                        onStalled={() => logEvent("stalled")}
                        onSeeking={() => logEvent("seeking")}
                        onSeeked={() => logEvent("seeked")}
                        onEnded={() => logEvent("ended")}
                        onError={() => logEvent("error")}
                    />
                </section>

                <section className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                    <h2 className="text-lg font-bold">اطلاعات دستگاه</h2>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs text-gray-300">
                        {browserInfo}
                    </pre>

                    <p className="mt-3 text-sm text-emerald-400">
                        Fullscreen: {isFullscreen ? "Yes" : "No"}
                    </p>

                    <button
                        type="button"
                        onClick={copyReport}
                        className="mt-4 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-black hover:bg-emerald-400"
                    >
                        کپی گزارش
                    </button>
                </section>

                <section className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold">
                            گزارش رویدادها
                        </h2>

                        <button
                            type="button"
                            onClick={() => setEvents([])}
                            className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
                        >
                            پاک کردن
                        </button>
                    </div>

                    <div className="mt-4 max-h-96 space-y-2 overflow-auto">
                        {events.length === 0 ? (
                            <p className="text-sm text-gray-400">
                                هنوز رویدادی ثبت نشده است.
                            </p>
                        ) : (
                            events.map((event, index) => (
                                <article
                                    key={`${event.time}-${event.name}-${index}`}
                                    className="rounded-lg bg-black/30 p-3"
                                >
                                    <p className="font-semibold text-emerald-400">
                                        {event.name}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {event.time}
                                    </p>
                                    <p className="mt-2 break-words text-xs text-gray-300">
                                        {event.details}
                                    </p>
                                </article>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
