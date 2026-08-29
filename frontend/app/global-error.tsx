
"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Application Error:", error);
    }, [error]);

    return (
        <html lang="fa" dir="rtl">
            <body className="min-h-screen bg-black text-white">
                <main className="min-h-screen flex items-center justify-center px-6">
                    <div className="w-full max-w-md text-center">
                        <div className="mb-6 text-6xl">
                            💀
                        </div>

                        <h1 className="mb-4 text-3xl font-bold">
                            یه مشکل جدی پیش اومد
                        </h1>

                        <p className="mb-8 text-gray-400">
                            متأسفانه مشکلی در اجرای سایت به وجود اومده.
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
            </body>
        </html>
    );
}
