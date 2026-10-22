import { Suspense } from "react";
import FavoritesPage from "./FavoritesPage";


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
            <FavoritesPage />
        </Suspense>
    );
}