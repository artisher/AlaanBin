import ProfileCard from '@/components/ProfileCard';
import { cookies } from "next/headers";


async function getUserProfile() {

    const cookieStore = await cookies();

    const res = await fetch('http://localhost:5000/api/auth/me',

        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        });


    const data = await res.json();




    console.log(data);




    return data;


}
const getUserFavoritesMovie = async () => {
    const cookieStore = await cookies();

    const resfavorite = await fetch(
        "http://localhost:5000/api/favorites",
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );

    const dataFavorite = await resfavorite.json();

    return dataFavorite;
};
export default async function ProfilePage() {
    const [userProfile, userFavorites] = await Promise.all([
        getUserProfile(),
        getUserFavoritesMovie(),
    ]);
    return <ProfileCard
        userProfile={userProfile}
        userFavorites={userFavorites}
    />;
}
