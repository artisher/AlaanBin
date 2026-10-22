
import { Suspense } from "react";


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
            <favoritesPage />
        </Suspense>
    );
}