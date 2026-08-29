"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <div className="max-w-md">
        <p className="text-7xl font-bold mb-4">404</p>

        <h1 className="text-2xl font-semibold mb-3">
          صفحه پیدا نشد
        </h1>

        <p className="text-gray-400 mb-8">
          صفحه‌ای که دنبالش هستی وجود نداره یا ممکنه حذف شده باشه.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200"
        >
          برگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}

