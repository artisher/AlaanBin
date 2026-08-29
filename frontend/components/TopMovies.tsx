import { ShowTopMovie } from "./ShowTopMovie";

export const TopMovies = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/movies/top`,
            {
                cache: "no-store",
            }
        );

        // فیلمی پیدا نشده
        if (res.status === 404) {
            return (
                <div className="py-16 text-center text-gray-400">
                    فیلمی برای نمایش وجود ندارد.
                </div>
            );
        }

        // خطای سرور یا API
        if (!res.ok) {
            throw new Error(`Top movies API error: ${res.status}`);
        }

        const data = await res.json();

        // پاسخ API چیزی نیست که انتظار داریم
        if (!Array.isArray(data) || data.length === 0) {
            return (
                <div className="py-16 text-center text-gray-400">
                    فیلمی برای نمایش وجود ندارد.
                </div>
            );
        }
        if (data.length === 0) {
            return (
                <div className="py-16 text-center text-gray-400">
                    فیلمی برای نمایش وجود ندارد.
                </div>
            );
        }
        return (
            <div className="border-y border-white/10 py-16">
                <div className="text-center mb-10">
                    <h2 className="mt-3 text-4xl font-bold text-white">
                        محبوب‌ترین‌های این هفته
                    </h2>

                    <div className="w-24 h-1 bg-[#14c78b] rounded-full mx-auto mt-4" />
                </div>

                <ShowTopMovie movies={data} />
            </div>
        );
    } catch (error) {
        console.error("TopMovies Error:", error);

        throw error;
    }
};

