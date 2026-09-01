
import { AdminMainComponent } from "@/components/AdminMainComponent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const cookieStore = await cookies();

    const resMovie = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/movies`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    // ادمین لاگین نیست یا توکن معتبر نیست
    if (resMovie.status === 401) {
        redirect("/login");
    }

    if (!resMovie.ok) {
        throw new Error(
            `خطا در دریافت فیلم‌ها: ${resMovie.status}`
        );
    }

    const moviesList = await resMovie.json();

    if (!moviesList || !Array.isArray(moviesList.movies)) {
        throw new Error("Invalid movies response");
    }

    const resRequests = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/requests`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    if (resRequests.status === 401) {
        redirect("/login");
    }

    if (!resRequests.ok) {
        throw new Error(
            `خطا در دریافت درخواست‌ها: ${resRequests.status}`
        );
    }

    const resStorage = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/storage/movies`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    if (resStorage.status === 401) {
        redirect("/login");
    }

    if (!resStorage.ok) {
        throw new Error(
            `خطا در دریافت فایل‌های Storage: ${resStorage.status}`
        );
    }

    const storageList = await resStorage.json();


    const requestsList = await resRequests.json();

    if (!requestsList || !Array.isArray(requestsList.requests)) {
        throw new Error("Invalid requests response");
    }

    const resUser = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    if (resUser.status === 401) {
        redirect("/login");
    }

    if (!resUser.ok) {
        throw new Error(
            `خطا در دریافت کاربران: ${resUser.status}`
        );
    }

    const userList = await resUser.json();

    if (!Array.isArray(userList)) {
        throw new Error("Invalid users response");
    }

    return (
        <div>
            <AdminMainComponent
                moviesList={moviesList.movies}
                userList={userList}
                requestsList={requestsList.requests}
                storageMovies={storageList.movies}
            />
        </div>
    );
}

