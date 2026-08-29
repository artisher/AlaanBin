"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application Error:", error);
    }, [error]);

    return (
        <main
            dir="rtl"
            className="min-h-screen flex items-center justify-center bg-black px-6 text-white"
        >
            <div className="w-full max-w-md text-center">
                <div className="mb-6 text-6xl">
                    😵
                </div>

                <h1 className="mb-4 text-3xl font-bold">
                    یه مشکلی پیش اومد
                </h1>

                <p className="mb-8 text-gray-400">
                    متأسفانه مشکلی در پردازش درخواست به وجود اومد.
                    لطفاً دوباره تلاش کن.
                </p>

                <button
                    onClick={() => reset()}
                    className="rounded-xl bg-[#14c78b] px-6 py-3 font-semibold text-black transition hover:opacity-90"
                >
                    تلاش دوباره
                </button>
            </div>
        </main>
    );
}

