
"use client";

import { useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const VIDEO_URL = API_URL
    ? `${API_URL}/videos/tangsir.mp4`
    : "";

export default function CustomTestPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState("");
    const [seekTime, setSeekTime] = useState<number | null>(null);


    const togglePlayback = async () => {
        const video = videoRef.current;

        if (!video) return;

        setError("");

        if (video.paused) {
            try {
                await video.play();
            } catch (err) {
                setError(
                    err instanceof Error
                        ? `${err.name}: ${err.message}`
                        : "پخش ویدئو ناموفق بود."
                );
            }
        } else {
            video.pause();
        }
    };

    const toggleFullscreen = async () => {
        const video = videoRef.current;

        if (!video) return;

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (video.requestFullscreen) {
                await video.requestFullscreen();
            } else {
                setError("این مرورگر Fullscreen API را پشتیبانی نمی‌کند.");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? `${err.name}: ${err.message}`
                    : "رفتن به حالت تمام‌صفحه ناموفق بود."
            );
        }
    };

    const formatTime = (seconds: number) => {
        if (!Number.isFinite(seconds)) return "00:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
                    Custom Player Test
                </h1>

                <p className="mt-3 text-sm text-gray-400">
                    تست کنترل‌های سفارشی با ویدئوی اصلی آزمایشی
                </p>

                <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <video
                        ref={videoRef}
                        src={VIDEO_URL}
                        playsInline
                        preload="metadata"
                        className="aspect-video w-full"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(event) =>
                            setCurrentTime(event.currentTarget.currentTime)
                        }
                        onLoadedMetadata={(event) =>
                            setDuration(event.currentTarget.duration)
                        }
                        onSeeking={() => setError("")}
                        onError={() =>
                            setError(
                                `خطای رسانه: ${videoRef.current?.error?.code ?? "نامشخص"}`
                            )
                        }
                    />
                </section>

                <section className="mt-4 rounded-2xl border border-white/10 bg-[#111827] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={togglePlayback}
                            className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-400"
                        >
                            {isPlaying ? "توقف" : "پخش"}
                        </button>

                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10"
                        >
                            تمام‌صفحه
                        </button>

                        <span className="text-sm text-gray-300">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <input
                        aria-label="موقعیت پخش ویدئو"
                        type="range"
                        min={0}
                        max={duration}
                        step={1}
                        value={seekTime ?? currentTime}
                        onChange={(event) => {
                            setSeekTime(Number(event.currentTarget.value));
                        }}
                        onPointerUp={(event) => {
                            const video = videoRef.current;

                            if (video) {
                                video.currentTime = Number(event.currentTarget.value);
                            }

                            setSeekTime(null);
                        }}
                        onKeyUp={(event) => {
                            const video = videoRef.current;

                            if (video) {
                                video.currentTime = Number(event.currentTarget.value);
                            }

                            setSeekTime(null);
                        }}
                        disabled={!Number.isFinite(duration) || duration <= 0}
                        className="mt-5 w-full cursor-pointer accent-emerald-400"
                    />

                    {error && (
                        <p
                            role="alert"
                            className="mt-4 break-words rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
                        >
                            {error}
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}
