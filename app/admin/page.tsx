import { AdminMainComponent } from "@/components/AdminMainComponent";



export default async function AdminDashboard() {

    const resMovie = await fetch("http://localhost:5000/api/movies", {
        cache: "no-store"
    });

    if (!resMovie.ok) {
        throw new Error(` فیلم خطا در دریافت داده: ${resMovie.status}`);
    }
    
    const moviesList = await resMovie.json();



    const resUser = await fetch("http://localhost:5000/api/users", {
        cache: "no-store"
    });

    if (!resUser.ok) {
        throw new Error(`خطا دریوزر  دریافت داده: ${resUser.status}`);
    }

    const userList = await resUser.json();
    return (
        <div>
            <AdminMainComponent
                moviesList={moviesList}
                userList={userList} />
        </div>
    );

}
