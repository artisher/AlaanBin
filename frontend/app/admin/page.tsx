import { AdminMainComponent } from "@/components/AdminMainComponent";
import { cookies } from "next/headers";



export default async function AdminDashboard() {
    const cookieStore = await cookies();


    const resMovie = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/movies`, {
        cache: "no-store",
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    if (!resMovie.ok) {
        throw new Error(` فیلم خطا در دریافت داده: ${resMovie.status}`);
    }

    const moviesList = await resMovie.json();




    const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
        cache: "no-store",
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    if (!resUser.ok) {
        throw new Error(`خطا دریوزر  دریافت داده: ${resUser.status}`);
    }

    const userList = await resUser.json();
    
    return (
        <div>
            <AdminMainComponent
                moviesList={moviesList.movies}
                userList={userList} />
        </div>
    );

}
