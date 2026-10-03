
"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type LivePlayerProps = {
    streamUrl: string;
    sessionType?: "tv1" | "varzesh";
};

export default function LivePlayer({
    streamUrl,
    sessionType,
}: LivePlayerProps) {

    const videoRef =
        useRef<HTMLVideoElement>(null);

    useEffect(() => {

        const video =
            videoRef.current;

        if (!video) return;

        let hls: Hls | null = null;

        let cancelled = false;

        let sessionId: string | null = null;

        let recovering = false;

        let recoveryCount = 0;

        const MAX_RECOVERIES = 5;


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

                /*
                 * ============================
                 * شبکه‌های بدون session
                 * ============================
                 *
                 * هر کانالی که sessionType نداشته
                 * باشد مستقیماً با HLS پخش می‌شود.
                 */
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


                /*
                 * ============================
                 * TV1
                 * ============================
                 *
                 * TV1 session دارد، ولی recovery
                 * مخصوص Varzesh ندارد.
                 */
                if (sessionType === "tv1") {

                    const response =
                        await fetch(
                            streamUrl,
                            {
                                cache: "no-store",
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            `TV1 playlist request failed: ${response.status}`
                        );
                    }


                    sessionId =
                        response.headers.get(
                            "X-TV1-Session"
                        );


                    if (!sessionId) {

                        throw new Error(
                            "TV1 session ID not received"
                        );
                    }


                    console.log(
                        "🎬 TV1 session:",
                        sessionId
                    );


                    if (cancelled) return;


                    const sessionStreamUrl =
                        `${streamUrl}?session=${encodeURIComponent(
                            sessionId
                        )}&t=${Date.now()}`;


                    if (Hls.isSupported()) {

                        await createPlayer(
                            sessionStreamUrl
                        );

                    } else if (
                        video.canPlayType(
                            "application/vnd.apple.mpegurl"
                        )
                    ) {

                        video.src =
                            sessionStreamUrl;

                    } else {

                        console.error(
                            "HLS is not supported in this browser"
                        );
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

                    const response =
                        await fetch(
                            streamUrl,
                            {
                                cache: "no-store",
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            `Playlist request failed: ${response.status}`
                        );
                    }


                    sessionId =
                        response.headers.get(
                            "X-Varzesh-Session"
                        );


                    if (!sessionId) {

                        throw new Error(
                            "Varzesh session ID not received"
                        );
                    }


                    console.log(
                        "🎬 Varzesh session:",
                        sessionId
                    );


                    if (cancelled) return;


                    const sessionStreamUrl =
                        `${streamUrl}?session=${encodeURIComponent(
                            sessionId
                        )}&t=${Date.now()}`;


                    if (Hls.isSupported()) {

                        await createPlayer(
                            sessionStreamUrl
                        );

                    } else if (
                        video.canPlayType(
                            "application/vnd.apple.mpegurl"
                        )
                    ) {

                        video.src =
                            sessionStreamUrl;

                    } else {

                        console.error(
                            "HLS is not supported in this browser"
                        );
                    }

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
        <video
            ref={videoRef}
            controls
            playsInline
            className="aspect-video w-full rounded-xl bg-black"
        />
    );
}

