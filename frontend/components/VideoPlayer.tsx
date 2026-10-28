import { useEffect, useState } from "react";

export const VideoPlayer = ({ video }: any) => {
    const movie = video;
    const [videoSrc, setVideoSrc] = useState("");
    useEffect(() => {
        if (!movie?.videoUrl) {
            setVideoSrc("");
            return;
        }

        let cancelled = false;

        const loadStreamUrl = async () => {
            try {
                setVideoSrc("");

                const apiUrl = process.env.NEXT_PUBLIC_API_URL;

                const response = await fetch(
                    `${apiUrl}/api/stream-token?path=${encodeURIComponent(
                        movie.videoUrl
                    )}`,
                    {
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `خطای دریافت آدرس ویدئو: ${response.status}`
                    );
                }

                const data: { url: string } = await response.json();

                if (!cancelled) {
                    setVideoSrc(`${apiUrl}${data.url}`);
                }
            } catch (error) {
                console.error("MOVIE STREAM URL ERROR:", error);

                if (!cancelled) {
                    setVideoSrc("");
                }
            }
        };

        void loadStreamUrl();

        return () => {
            cancelled = true;
        };
    }, [movie?.videoUrl]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#090909] via-[#111315] to-[#0b0b0b] text-white">
            <div className="max-w-7xl mx-auto px-5 py-8">

                {/* Video */}

                <div className="overflow-hidden rounded-3xl border border-[#14c78b]/20 shadow-[0_0_45px_rgba(20,199,139,.15)]">
                    {videoSrc ? (
                        <video
                            controlsList="nodownload"
                            controls
                            playsInline
                            className="w-full"
                            src={videoSrc}
                        />
                    ) : (
                        <div className="flex aspect-video w-full items-center justify-center bg-black text-white">
                            در حال آماده‌سازی ویدئو...
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="mt-10 grid lg:grid-cols-[280px_1fr] gap-10">

                    {/* Poster */}
                    <div className="group">
                        <img
                            src={`https://alanbin.com${movie.poster}`}
                            alt={movie.title}
                            width={280}
                            height={420}
                            className="
                            rounded-2xl
                            border
                            border-[#14c78b]/20
                            object-cover
                            transition-all
                            duration-500
                            group-hover:scale-[1.02]
                            group-hover:shadow-[0_0_35px_rgba(20,199,139,.25)]
                            "
                        />
                    </div>

                    {/* Info */}
                    <div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
                            {movie.title}
                        </h1>

                        <div className="mt-3 h-1 w-24 rounded-full bg-[#14c78b]" />

                        {/* Badges */}
                        <div className="mt-6 flex flex-wrap gap-3">

                            <span className="rounded-full border border-[#14c78b]/30 bg-[#14c78b]/10 px-4 py-2 text-[#14c78b] font-semibold">
                                ⭐ {movie.rating}/10
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-zinc-300">
                                🎬 {movie.year}
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-zinc-300">
                                ⏱ {movie.duration} دقیقه
                            </span>

                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-zinc-300">
                                🌍 {movie.product}
                            </span>

                            {movie.topWeek && (
                                <span className="rounded-full bg-[#14c78b] px-4 py-2 font-semibold text-black shadow-[0_0_20px_rgba(20,199,139,.45)]">
                                    🔥 ترند هفته
                                </span>
                            )}

                        </div>

                        {/* Genres */}
                        <div className="mt-8 flex flex-wrap gap-3">

                            {movie.genre.map((item: string) => (
                                <span
                                    key={item}
                                    className="
                                    rounded-full
                                    border
                                    border-[#14c78b]/25
                                    bg-[#14c78b]/10
                                    px-4
                                    py-1.5
                                    text-sm
                                    text-[#14c78b]
                                    "
                                >
                                    {item}
                                </span>
                            ))}

                        </div>

                        {/* Description */}
                        <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.03] p-6">

                            <h2 className="mb-4 text-2xl font-semibold">
                                خلاصه داستان
                            </h2>

                            <p className="leading-9 text-zinc-300">
                                {movie.description}
                            </p>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};