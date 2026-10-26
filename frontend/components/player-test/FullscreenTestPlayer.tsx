
"use client";

import { useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const VIDEO_URL = API_URL
    ? `${API_URL}/videos/tangsir.mp4`
    : "";

export default function FullscreenTestPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [status, setStatus] = useState("آماده پخش");
    const [error, setError] = useState("");

    const enterFullscreen = async () => {
        const video = videoRef.current;

        if (!video) return;

        setError("");

        try {
            const safariVideo = video as HTMLVideoElement & {
                webkitEnterFullscreen?: () => void;
            };

            if (typeof safariVideo.webkitEnterFullscreen === "function") {
                safariVideo.webkitEnterFullscreen();
                return;
            }

            if (typeof video.requestFullscreen === "function") {
                await video.requestFullscreen();
                return;
            }

            setError(
                "این مرورگر روش تمام‌صفحه پشتیبانی‌شده‌ای ارائه نمی‌دهد."
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? `${err.name}: ${err.message}`
                    : "ورود به حالت تمام‌صفحه ناموفق بود."
            );
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
                    Fullscreen Player Test
                </h1>

                <p className="mt-3 text-sm text-gray-400">
                    تست پخش و ورود به حالت تمام‌صفحه
                </p>

                <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <video
                        ref={videoRef}
                        src={VIDEO_URL}
                        controls
                        playsInline
                        preload="metadata"
                        className="aspect-video w-full"
                        onLoadStart={() => setStatus("در حال بارگذاری")}
                        onLoadedMetadata={() => setStatus("اطلاعات ویدئو دریافت شد")}
                        onPlaying={() => setStatus("در حال پخش")}
                        onWaiting={() => setStatus("در انتظار دریافت داده")}
                        onPause={() => setStatus("متوقف")}
                        onError={() => {
                            setStatus("خطای پخش");
                            setError(
                                `خطای رسانه: ${videoRef.current?.error?.code ?? "نامشخص"}`
                            );
                        }}
                    />
                </section>

                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={enterFullscreen}
                        className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-400"
                    >
                        ورود به تمام‌صفحه
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            const video = videoRef.current;

                            if (!video) return;

                            if (video.paused) {
                                void video.play().catch((err: unknown) => {
                                    setError(
                                        err instanceof Error
                                            ? `${err.name}: ${err.message}`
                                            : "پخش ناموفق بود."
                                    );
                                });
                            } else {
                                video.pause();
                            }
                        }}
                        className="rounded-xl border border-white/20 px-6 py-3 hover:bg-white/10"
                    >
                        پخش / توقف
                    </button>
                </div>

                <section className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-5">
                    <h2 className="text-lg font-bold">وضعیت پلیر</h2>
                    <p className="mt-2 text-emerald-400">{status}</p>

                    {error && (
                        <p
                            role="alert"
                            className="mt-3 break-words text-sm text-red-300"
                        >
                            {error}
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}
