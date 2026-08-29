import ProfileCard from "@/components/ProfileCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserProfile() {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    // کاربر لاگین نیست
    if (res.status === 401) {
        redirect("/login");
    }

    // خطای سرور یا API
    if (!res.ok) {
        throw new Error(
            `Failed to fetch user profile: ${res.status}`
        );
    }

    const data = await res.json();

    // ساختار پاسخ API اشتباه است
    if (!data?.user) {
        throw new Error("Invalid user profile response");
    }

    return data;
}

async function getUserFavoritesMovie() {
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

    // کاربر لاگین نیست
    if (res.status === 401) {
        redirect("/login");
    }

    // خطای API
    if (!res.ok) {
        throw new Error(
            `Failed to fetch favorite movies: ${res.status}`
        );
    }

    const data = await res.json();

    // API باید آبجکتی شامل favoriteMovies برگرداند
    if (!data || !Array.isArray(data.favoriteMovies)) {
        throw new Error("Invalid favorites response");
    }

    return data;
}

export default async function ProfilePage() {
    const [userProfile, userFavorites] = await Promise.all([
        getUserProfile(),
        getUserFavoritesMovie(),
    ]);

    return (
        <ProfileCard
            userProfile={userProfile.user}
            userFavorites={userFavorites}
        />
    );
}

