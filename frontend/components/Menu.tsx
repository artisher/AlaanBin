"use client";
import { BuySub } from "./BuySub";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";
import { useAuth } from "@/app/providers/AuthProvider";


export const Menu = () => {
    const { user, loading } = useAuth();

    const hasActiveSubscription = user?.hasActiveSubscription;
    const isLoggedIn = !!user;
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
