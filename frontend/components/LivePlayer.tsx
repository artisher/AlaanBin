"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type LivePlayerProps = {
    streamUrl: string;
};

export default function LivePlayer({
    streamUrl,
}: LivePlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(streamUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.ERROR, (_, data) => {
                console.error(
                    "HLS FULL ERROR:",
                    JSON.stringify(data, null, 2)
                );
            });
        } else if (
            video.canPlayType("application/vnd.apple.mpegurl")
        ) {
            video.src = streamUrl;
        } else {
            console.error(
                "HLS is not supported in this browser"
            );
        }

        return () => {
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