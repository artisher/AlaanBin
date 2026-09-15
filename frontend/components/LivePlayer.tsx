"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type LivePlayerProps = {
    streamUrl: string;
};

export default function LivePlayer({
    streamUrl,
}: LivePlayerProps) {

    const videoRef =
        useRef<HTMLVideoElement>(null);

    useEffect(() => {

        const video =
            videoRef.current;

        if (!video) return;

        let hls: Hls | null = null;

        let cancelled = false;


        const startPlayer = async () => {

            try {

                /*
                 * First request:
                 * Backend creates the session
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


                const sessionId =
                    response.headers.get(
                        "X-Varzesh-Session"
                    );


                if (!sessionId) {

                    throw new Error(
                        "Varzesh session ID not received"
                    );
                }


                if (cancelled) return;


                /*
                 * From now on HLS.js keeps using
                 * the same session.
                 */
                const sessionStreamUrl =
                    `${streamUrl}?session=${encodeURIComponent(sessionId)}`;


                console.log(
                    "🎬 Varzesh session:",
                    sessionId
                );


                if (Hls.isSupported()) {

                    hls = new Hls({
                        enableWorker: true,
                        lowLatencyMode: true,
                    });

                    const player = hls;

                    player.loadSource(
                        sessionStreamUrl
                    );

                    player.attachMedia(
                        video
                    );

                    let recovering = false;

                    player.on(
                        Hls.Events.ERROR,
                        (_, data) => {

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
                                data.fatal &&
                                is451 &&
                                isFragmentError &&
                                !recovering
                            ) {

                                recovering = true;

                                console.log(
                                    "🔄 451 detected → refreshing Varzesh playlist..."
                                );

                                player.stopLoad();

                                const refreshUrl =
                                    `${streamUrl}?session=${encodeURIComponent(
                                        sessionId
                                    )}&refresh=${Date.now()}`;

                                player.loadSource(
                                    refreshUrl
                                );

                                player.startLoad();

                                setTimeout(() => {
                                    recovering = false;
                                }, 3000);
                            }
                        }
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
                    "❌ VARZESH PLAYER ERROR:",
                    error
                );
            }
        };


        startPlayer();


        return () => {

            cancelled = true;

            hls?.destroy();

        };

    }, [streamUrl]);


    return (
        <video
            ref={videoRef}
            controls
            playsInline
            className="aspect-video w-full rounded-xl bg-black"
        />
    );
}