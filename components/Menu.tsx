import { BuySub } from "./BuySub";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";
import { cookies } from "next/headers";


export const Menu = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    const res = await fetch(
        "http://localhost:5000/api/auth/me",
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );
    const data = await res.json();
    console.log(data); // delete this line

    const hasActiveSubscription = data.user?.hasActiveSubscription
    const isLoggedIn = data.isAuthenticated

    return (
        <div className="bg-[#0B0F14] p-3  w-full mx-auto flex justify-between backdrop-blur border-b border-white/10 md:px-10 md:py-5">
            <Logo />

            {hasActiveSubscription ? null : <BuySub />}

            <HamburgerMenu isLoggedIn={isLoggedIn} />
        </div>
    )
}
