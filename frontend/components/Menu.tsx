
"use client";

import Link from "next/link";
import {
    Home,
    Film,
    Tv,
    Search,
} from "lucide-react";

import { useState, useEffect } from "react";

import { BuySub } from "./BuySub";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";

import { useAuth } from "@/app/providers/AuthProvider";

export const Menu = () => {
    const { user } = useAuth();

    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const hasActiveSubscription = user?.hasActiveSubscription;
    const isLoggedIn = !!user;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 150);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinkClass = `
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        text-white
        border
        border-white/25
        bg-slate-950/15
        backdrop-blur-sm
        shadow-sm
        shadow-black/10
        hover:text-[#14c78b]
        hover:border-[#14c78b]/50
        hover:bg-[#14c78b]/10
        transition-all
        duration-200
        whitespace-nowrap
    `;

    return (
        <div
            className={`
                fixed
                top-0
                left-0
                right-0
                z-50
                w-full
                border-b
                transition-all
                duration-300
                ease-in-out
                ${scrolled
                    ? "bg-[#0B0F14]/95 border-white/10 backdrop-blur-xl shadow-lg"
                    : "bg-transparent border-transparent"
                }
            `}
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

                <nav className="hidden md:flex items-center gap-2">
                    <Link href="/" className={navLinkClass}>
                        <Home size={18} />
                        صفحه اصلی
                    </Link>

                    <Link href="/movies" className={navLinkClass}>
                        <Film size={18} />
                        فیلم‌ها
                    </Link>

                    <Link href="/series" className={navLinkClass}>
                        <Tv size={18} />
                        سریال‌ها
                    </Link>

                    <Link href="/live" className={navLinkClass}>
                        <Film size={18} />
                        پخش زنده
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSearchOpen(true)}
                        className={`${navLinkClass} cursor-pointer`}
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
                    onSearch={() => setSearchOpen(true)}
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
