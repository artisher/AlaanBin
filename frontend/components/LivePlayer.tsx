"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type LivePlayerProps = {
    streamUrl: string;
    requiresSession?: boolean;
};

export default function LivePlayer({
    streamUrl,
    requiresSession = false,
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
             * فقط شبکه ورزش recovery مربوط به session
             * و خطای 451 را فعال می‌کند.
             *
             * TV1 / TV3 اصلاً وارد این منطق نمی‌شوند.
             */
            if (requiresSession) {

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

                            /*
                             * از Backend playlist جدید می‌گیریم.
                             */
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


                            /*
                             * HLS قبلی را کاملاً نابود می‌کنیم.
                             */
                            if (hls) {

                                console.log(
                                    "🧹 Destroying failed HLS instance..."
                                );

                                hls.destroy();

                                hls = null;
                            }


                            /*
                             * کمی صبر می‌کنیم.
                             */
                            await new Promise(
                                resolve =>
                                    setTimeout(
                                        resolve,
                                        200
                                    )
                            );


                            if (cancelled) return;


                            /*
                             * HLS جدید با session جدید.
                             */
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
                 * شبکه‌هایی که session ندارند
                 * ============================
                 *
                 * TV1 / TV3 مستقیماً با HLS
                 * playlist خودشان را پخش می‌کنند.
                 */
                if (!requiresSession) {

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
                 * شبکه ورزش
                 * ============================
                 *
                 * این قسمت همان منطق قبلی ورزش است.
                 */
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


            } catch (error) {

                console.error(
                    requiresSession
                        ? "❌ VARZESH PLAYER ERROR:"
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

    }, [streamUrl, requiresSession]);


    return (
        <video
            ref={videoRef}
            controls
            playsInline
            className="aspect-video w-full rounded-xl bg-black"
        />
    );
}