'use client';
import { useRouter } from "next/navigation"
import { House, LogOut, UserCircle } from "lucide-react"

import ProfileRow from './ProfileRow';
interface Profile {
    _id: string;
    fullName: string;
    phoneNumber: number;
    email: string;
    country: string;
    city: string;
}
const ProfileCard = ({ userProfile }: Profile) => {
    const profile = userProfile.user;
    const router = useRouter()

    const homeHandler = () => router.push("/home")
    const logoutHandler = async () => {


        await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        router.refresh()
        router.push("/")
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    <div className="flex justify-between">




                        <button
                            onClick={() => {

                                homeHandler()
                            }}
                            className="flex items-center justify-center gap-2 bg-primary text-white px-3 rounded-lg font-medium"
                        >
                            <House size={15}/>
                            خانه
                        </button>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            {profile.fullName}
                        </h2>
                        <button
                            onClick={() => {

                                logoutHandler()
                            }}
                            className="flex items-center justify-center gap-2 bg-red-500 text-white px-2  rounded-lg font-medium"
                        >
                            <LogOut size={15} />
                            خروج
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        <div>
                            <ProfileRow label="نام و نام خانوادگی" value={profile.fullName} />
                            <ProfileRow label="  فیلم های مورد علاقه" value={profile.favoriteTitle} />
                            <ProfileRow label="ایمیل" value={profile.email} />
                            <ProfileRow label="شماره موبایل" value={profile.phoneNumber} />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <ProfileRow label="کشور" value={profile.country} />
                        <ProfileRow label="شهر" value={profile.city} />

                    </div>
                </div>


            </div>
        </div>
    );
};

export default ProfileCard;
