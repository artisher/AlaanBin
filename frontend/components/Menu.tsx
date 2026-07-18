import { BuySub } from "./BuySub";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";
import { cookies } from "next/headers";


export const Menu = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
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
        <div className="
sticky
top-0
z-50
w-full
border-b
border-white/10
bg-[#0B0F14]/90
backdrop-blur-xl
">
            <div className="max-w-[1650px] mx-auto h-16 px-5 flex items-center justify-between">

                <Logo />

                {!hasActiveSubscription && <BuySub />}

                <HamburgerMenu isLoggedIn={isLoggedIn} />

            </div>
        </div>
    )
}
