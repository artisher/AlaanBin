
import { Suspense } from "react";
import FavoritesPage from "./FavoritesPage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getUserFavorites() {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    if (res.status === 401) {
        redirect("/login");
    }

    if (!res.ok) {
        throw new Error(
            `Failed to fetch favorites: ${res.status}`
        );
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.favorites)) {
        throw new Error("Invalid favorites response");
    }

    return data;
}
export default async function Page() {
    const data = await getUserFavorites();

    return (
        <Suspense
            fallback={
                <main
                    dir="rtl"
                    className="min-h-screen bg-[#0B0F14]"
                />
            }
        >
            <FavoritesPage
                userFavorites={data.favorites}
            />
        </Suspense>
    );
}