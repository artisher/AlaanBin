import type { Metadata } from "next";
import { Suspense } from "react";
import MoviesPage from "./MoviesPage";

export const metadata: Metadata = {
    title: "فیلم‌ها",
    description: "فیلم‌ها را در پلتفرم الان بین کشف و دنبال کنید.",
    alternates: {
        canonical: "/movies",
    },
};

export default function Page() {
    return (
        <Suspense
            fallback={
                <main
                    dir="rtl"
                    className="min-h-screen bg-[#0B0F14]"
                />
            }
        >
            <MoviesPage />
        </Suspense>
    );
}