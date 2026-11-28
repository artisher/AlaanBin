
"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type LivePlayerProps = {
    streamUrl: string;
    sessionType?: "tv1" | "tv2" | "varzesh" | "tv3" | "irinn";
};
type PlayerError =
    | "AUTH_REQUIRED"
    | "SUBSCRIPTION_REQUIRED"
    | "PLAYBACK_ERROR";



export default function LivePlayer({
    streamUrl,
    sessionType,
}: LivePlayerProps) {

    const videoRef =
        useRef<HTMLVideoElement>(null);

    const [playerError, setPlayerError] =
        useState<PlayerError | null>(null);


    useEffect(() => {

        const video =
            videoRef.current;

        if (!video) return;

        setPlayerError(null);

        let hls: Hls | null = null;

        let cancelled = false;

        let sessionId: string | null = null;

        let recovering = false;

        let recoveryCount = 0;

        const MAX_RECOVERIES = 5;


        const checkAccess = async (): Promise<PlayerError | null> => {
            try {
                const r = await fetch("/api/live/access", { credentials: "include", cache: "no-store" });
                if (r.status === 401) return "AUTH_REQUIRED";
                if (r.status === 403) return "SUBSCRIPTION_REQUIRED";
                return null;
            } catch {
                return null;
            }
        };

        const createPlayer = async (
            playlistUrl: string
        ) => {

            if (cancelled) return;


            if (hls) {

                console.log(
                    "🧹 Destroying old HLS player..."
                );

                hls.destroy();

                hls = null;
            }


            if (cancelled) return;


            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });


            const player = hls;


            player.attachMedia(video);

            player.on(Hls.Events.ERROR, (_, data) => {
                if (!data.fatal) return;
                const code = data.response?.code;
                if (sessionType === "varzesh" && code === 451) return;
                setPlayerError(
                    code === 401 ? "AUTH_REQUIRED"
                    : code === 403 ? "SUBSCRIPTION_REQUIRED"
                    : "PLAYBACK_ERROR"
                );
                if (hls) {
                    hls.destroy();
                    hls = null;
                }
            });


            /*
             * فقط شبکه ورزش recovery مربوط به
             * session و خطای 451 را فعال می‌کند.
             *
             * TV1 فقط session دارد و وارد recovery
             * مربوط به ورزش نمی‌شود.
             */
            if (sessionType === "varzesh") {

                player.on(
                    Hls.Events.ERROR,
                    async (_, data) => {

                        console.error(
                            "HLS FULL ERROR:",
                            JSON.stringify(
                                data,
                                null,
                                2
                            )
                        );


                        const is451 =
                            data.response?.code === 451;

                        const isFragmentError =
                            data.details ===
                            Hls.ErrorDetails.FRAG_LOAD_ERROR;


                        if (
                            !data.fatal ||
                            !is451 ||
                            !isFragmentError ||
                            recovering
                        ) {
                            return;
                        }


                        if (
                            recoveryCount >=
                            MAX_RECOVERIES
                        ) {

                            console.error(
                                "❌ Maximum Varzesh recoveries reached."
                            );

                            return;
                        }


                        recovering = true;

                        recoveryCount += 1;


                        console.log(
                            `🔄 451 detected → full HLS recovery #${recoveryCount}`
                        );


                        try {

                            const refreshUrl =
                                `${streamUrl}?session=${encodeURIComponent(
                                    sessionId ?? ""
                                )}&refresh=${Date.now()}`;


                            console.log(
                                "🔄 Requesting fresh playlist..."
                            );


                            const response =
                                await fetch(
                                    refreshUrl,
                                    {
                                        cache: "no-store",
                                    }
                                );


                            if (!response.ok) {

                                throw new Error(
                                    `Refresh playlist failed: ${response.status}`
                                );
                            }


                            const newSessionId =
                                response.headers.get(
                                    "X-Varzesh-Session"
                                );


                            if (newSessionId) {

                                sessionId =
                                    newSessionId;
                            }


                            if (cancelled) return;


                            if (hls) {

                                console.log(
                                    "🧹 Destroying failed HLS instance..."
                                );

                                hls.destroy();

                                hls = null;
                            }


                            await new Promise(
                                resolve =>
                                    setTimeout(
                                        resolve,
                                        200
                                    )
                            );


                            if (cancelled) return;


                            const newPlaylistUrl =
                                `${streamUrl}?session=${encodeURIComponent(
                                    sessionId ?? ""
                                )}&t=${Date.now()}`;


                            console.log(
                                "▶️ Starting fresh HLS player..."
                            );


                            recovering = false;


                            await createPlayer(
                                newPlaylistUrl
                            );


                        } catch (error) {

                            console.error(
                                "❌ Varzesh recovery failed:",
                                error
                            );

                            recovering = false;
                        }
                    }
                );
            }


            player.loadSource(
                playlistUrl
            );
        };


        const startPlayer = async () => {

            try {

                const accessError = await checkAccess();
                if (cancelled) return;
                if (accessError) {
                    setPlayerError(accessError);
                    return;
                }

                /*
                 * ============================
                 * شبکه‌های بدون session
                 * ============================
                 *
                 * هر کانالی که sessionType نداشته
                 * باشد مستقیماً با HLS پخش می‌شود.
                 */

                /*
                 * External direct HLS sources:
                 * TV1, TV2, TV3 and IRINN
                 */
                if (
                    sessionType === "tv1" ||
                    sessionType === "tv2" ||
                    sessionType === "tv3" ||
                    sessionType === "irinn"
                ) {
                    if (cancelled) return;

                    if (Hls.isSupported()) {
                        await createPlayer(streamUrl);
                    } else if (
                        video.canPlayType("application/vnd.apple.mpegurl")
                    ) {
                        video.src = streamUrl;
                    } else {
                        console.error("HLS is not supported in this browser");
                    }

                    return;
                }

                /*
                 * ============================
                 * شبکه ورزش
                 * ============================
                 *
                 * منطق قبلی ورزش بدون تغییر.
                 */
                if (sessionType === "varzesh") {

                    if (cancelled) return;

                    if (Hls.isSupported()) {

                        await createPlayer(streamUrl);

                    } else if (
                        video.canPlayType("application/vnd.apple.mpegurl")
                    ) {

                        video.src = streamUrl;

                    } else {

                        console.error("HLS is not supported in this browser");
                    }

                    return;
                }
                if (!sessionType) {

                    if (cancelled) return;


                    if (Hls.isSupported()) {

                        await createPlayer(
                            streamUrl
                        );

                    } else if (
                        video.canPlayType(
                            "application/vnd.apple.mpegurl"
                        )
                    ) {

                        video.src =
                            streamUrl;

                    } else {

                        console.error(
                            "HLS is not supported in this browser"
                        );
                    }

                    return;
                }
            } catch (error) {

                console.error(
                    sessionType === "varzesh"
                        ? "❌ VARZESH PLAYER ERROR:"
                        : sessionType === "tv1"
                            ? "❌ TV1 PLAYER ERROR:"
                            : "❌ LIVE PLAYER ERROR:",
                    error
                );
            }
        };


        startPlayer();


        return () => {

            cancelled = true;

            if (hls) {

                hls.destroy();

                hls = null;
            }

        };

    }, [streamUrl, sessionType]);


    return (
        <div className="relative w-full aspect-video rounded-xl bg-black overflow-hidden">

            {playerError ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0B0F14] px-5 text-center">
                    <div className="max-w-md">

                        <div className="mb-4 text-4xl">
                            {playerError === "PLAYBACK_ERROR" ? "⚠️" : "🔒"}
                        </div>

                        <h2 className="mb-3 text-xl font-bold text-white">
                            {playerError === "AUTH_REQUIRED"
                                ? "برای تماشای پخش زنده وارد حساب شوید"
                                : playerError === "SUBSCRIPTION_REQUIRED"
                                    ? "اشتراک فعال ندارید"
                                    : "مشکلی در پخش شبکه به وجود آمده است"}
                        </h2>

                        <p className="mb-5 text-sm leading-7 text-gray-400">
                            {playerError === "AUTH_REQUIRED"
                                ? "برای تماشای این شبکه ابتدا وارد حساب کاربری خود شوید."
                                : playerError === "SUBSCRIPTION_REQUIRED"
                                    ? "برای تماشای شبکه‌های زنده، ابتدا اشتراک AlanBin تهیه کنید."
                                    : "لطفاً چند لحظه دیگر دوباره تلاش کنید."}
                        </p>

                        {playerError === "SUBSCRIPTION_REQUIRED" && (
                            <a
                                href="/subscription"
                                className="inline-flex rounded-lg bg-[#14c78b] px-6 py-3 font-bold text-[#0B0F14] transition hover:bg-[#10b981]"
                            >
                                تهیه اشتراک
                            </a>
                        )}

                        {playerError === "AUTH_REQUIRED" && (
                            <a
                                href="/login"
                                className="inline-flex rounded-lg bg-[#14c78b] px-6 py-3 font-bold text-[#0B0F14] transition hover:bg-[#10b981]"
                            >
                                ورود به حساب
                            </a>
                        )}

                    </div>
                </div>
            ) : null}
            {(
                <video
                    ref={videoRef}
                    controls
                    playsInline
                    className="aspect-video w-full rounded-xl bg-black"
                />
            )}

        </div>
    );
}

