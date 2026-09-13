import LivePlayer from "@/components/LivePlayer";

export default function LivePage() {
    const STREAM_URL =
        "https://alanbin.com/live/varzesh/index.m3u8";

    return (
        <main className="min-h-screen bg-[#0B0F14] p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-6 text-2xl font-bold text-white">
                    🔴 پخش زنده شبکه ورزش
                </h1>

                <LivePlayer streamUrl={STREAM_URL} />
            </div>
        </main>
    );
}