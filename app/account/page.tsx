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



    return data;


}

export default async function ProfilePage() {
    const userProfile = await getUserProfile();

    return <ProfileCard userProfile={userProfile} />;
}
