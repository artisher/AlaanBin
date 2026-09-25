"use client";

import Link from "next/link";
import {
    Home,
    Film,
    Tv,
    Search,
} from "lucide-react";

import { useState } from "react";

import { BuySub } from "./BuySub";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";

import { useAuth } from "@/app/providers/AuthProvider";

export const Menu = () => {
    const { user } = useAuth();

    const [searchOpen, setSearchOpen] = useState(false);

    const hasActiveSubscription = user?.hasActiveSubscription;
    const isLoggedIn = !!user;

    return (
        <div
            className="
                sticky
                top-0
                z-50
                w-full
                border-b
                border-white/10
                bg-[#0B0F14]/90
                backdrop-blur-xl
            "
        >
            <div
                className="
                    max-w-[1650px]
                    mx-auto
                    h-16
                    px-5
                    flex
                    items-center
                    gap-8
                "
            >

                {/* Logo */}

                <Logo />

                {/* Desktop Navigation */}

                <nav className="hidden md:flex items-center gap-1">

                    <Link
                        href="/"
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            text-gray-300
                            hover:text-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition
                        "
                    >
                        <Home size={18} />
                        صفحه اصلی
                    </Link>

                    <Link
                        href="/movies"
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            text-gray-300
                            hover:text-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition
                        "
                    >
                        <Film size={18} />
                        فیلم‌ها
                    </Link>

                    <Link
                        href="/series"
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            text-gray-300
                            hover:text-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition
                        "
                    >
                        <Tv size={18} />
                        سریال‌ها
                    </Link>

                    {/* Search */}
                    <Link
                        href="/live"
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            text-gray-300
                            hover:text-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition
                        "
                    >
                        <Film size={18} />
                        پخش زنده
                    </Link>
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            text-gray-300
                            hover:text-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition
                            cursor-pointer
                        "
                    >
                        <Search size={18} />
                        جستجو
                    </button>

                </nav>

                {/* Push right side */}

                <div className="flex-1" />

                {/* Subscription */}

                {!hasActiveSubscription && (
                    <div className="hidden md:block">
                        <BuySub />
                    </div>
                )}

                {/* Account / Login + Mobile Menu */}

                <HamburgerMenu
                    isLoggedIn={isLoggedIn}
                />

            </div>

            {/* Search */}

            {searchOpen && (
                <div className="absolute top-16 right-0 left-0 flex justify-center px-5">
                    <SearchBar
                        isOpen={searchOpen}
                        onClose={() => setSearchOpen(false)}
                    />
                </div>
            )}

        </div>
    );
};