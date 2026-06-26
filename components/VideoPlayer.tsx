import Image from "next/image";

export const VideoPlayer = ({ video }) => {
    const movie = video;
    return (
        <div>
            <div className="min-h-screen bg-zinc-950 text-white">
                {/* Player */}
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <video
                        controls
                        className="w-full rounded-2xl shadow-2xl"
                        src={`http://localhost:5000${movie.videoUrl}`}
                    />

                    {/* Movie Info */}
                    <div className="mt-8 flex flex-col lg:flex-row gap-8">
                        {/* Poster */}
                        <div className="shrink-0">
                            <Image
                                src={movie.poster}
                                alt={movie.title}
                                width={240}
                                height={360}
                                className="rounded-xl object-cover"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <span className="bg-zinc-800 px-3 py-1 rounded-full">
                                    ⭐ {movie.rating}
                                </span>

                                <span className="bg-zinc-800 px-3 py-1 rounded-full">
                                    🎬 {movie.year}
                                </span>

                                <span className="bg-zinc-800 px-3 py-1 rounded-full">
                                    ⏱ {movie.duration} دقیقه
                                </span>

                                <span className="bg-zinc-800 px-3 py-1 rounded-full">
                                    🌍 {movie.product}
                                </span>

                                {movie.topWeek && (
                                    <span className="bg-green-600 px-3 py-1 rounded-full">
                                        🔥 ترند هفته
                                    </span>
                                )}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {movie.genre.map((item: string) => (
                                    <span
                                        key={item}
                                        className="bg-red-600/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-full"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-3">
                                    خلاصه داستان
                                </h2>

                                <p className="text-zinc-300 leading-8">
                                    {movie.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
