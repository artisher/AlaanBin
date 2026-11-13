
"use client";

import { useAuth } from "@/app/providers/AuthProvider";

import {
    Home,
    Film,
    Tv,
    Search,
    CreditCard,
    UserCircle,
    LogOut,
    Menu,
    X,
    TvMinimalPlay,
    Heart,
    Clapperboard,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HamburgerMenuProps {
    isLoggedIn: boolean;
    onSearch: () => void;
}

export const HamburgerMenu = ({
    isLoggedIn,
    onSearch,
}: HamburgerMenuProps) => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const closeMenu = () => setIsOpen(false);

    const logoutHandler = async () => {
        await logout();

        closeMenu();
        router.push("/login");
        router.refresh();
    };

    const loginHandler = () => {
        closeMenu();
        router.push("/login");
        router.refresh();
    };

    const accountHandler = () => {
        closeMenu();
        router.push("/account");
    };

    const linkClass = `
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-gray-300
        hover:bg-[#14c78b]/10
        hover:text-[#14c78b]
        transition-all
        duration-200
        w-full
    `;

    const sectionTitleClass = `
        px-4
        mb-2
        text-xs
        font-semibold
        text-[#14c78b]
    `;

    return (
        <>
            {/* Mobile Menu Button */}

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="md:hidden"
                aria-label="باز کردن منو"
            >
                <Menu size={30} className="text-white" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[9999]">

                    {/* Overlay */}

                    <div
                        onClick={closeMenu}
                        className="
                            absolute inset-0
                            bg-black/85
                            backdrop-blur-sm
                        "
                    />

                    {/* Sidebar */}

                    <div
                        className="
                            absolute right-0 top-0
                            h-[100dvh]
                            w-[300px]
                            max-w-[85vw]
                            bg-[#0B0F14]
                            border-l border-white/10
                            shadow-2xl
                            flex flex-col
                            overflow-hidden
                            animate-in slide-in-from-right
                            duration-300
                        "
                    >

                        {/* Header */}

                        <div className="
                            flex items-center justify-between
                            p-6
                            border-b border-white/10
                            shrink-0
                        ">

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Alan
                                    <span className="text-[#14c78b]">
                                        Bin
                                    </span>
                                </h2>

                                <p className="text-xs text-gray-400 mt-1">
                                    فیلم و سریال بدون محدودیت
                                </p>
                            </div>

                            <button
                                onClick={closeMenu}
                                aria-label="بستن منو"
                            >
                                <X className="text-white" />
                            </button>

                        </div>

                        {/* Navigation */}

                        <nav className="
                            flex-1
                            overflow-y-auto
                            p-5
                            space-y-5
                        ">

                            {/* Quick Access */}

                            <section>
                                <div className="flex flex-col gap-1">

                                    <button
                                        onClick={() => {
                                            onSearch();
                                            closeMenu();
                                        }}
                                        className={linkClass}
                                    >
                                        <Search size={20} />
                                        جستجو
                                    </button>

                                    <Link
                                        href="/"
                                        onClick={closeMenu}
                                        className={linkClass}
                                    >
                                        <Home size={20} />
                                        صفحه اصلی
                                    </Link>

                                </div>
                            </section>

                            {/* Content Library */}

                            <section>
                                <h3 className={sectionTitleClass}>
                                    کتابخانه محتوا
                                </h3>

                                <div className="flex flex-col gap-1">

                                    <Link
                                        href="/movies"
                                        onClick={closeMenu}
                                        className={linkClass}
                                    >
                                        <Film size={20} />
                                        فیلم‌ها
                                    </Link>

                                    <Link
                                        href="/series"
                                        onClick={closeMenu}
                                        className={linkClass}
                                    >
                                        <Tv size={20} />
                                        سریال‌ها
                                    </Link>

                                    <Link
                                        href="/favorites"
                                        onClick={closeMenu}
                                        className={linkClass}
                                    >
                                        <Heart size={20} />
                                        مورد علاقه‌های من
                                    </Link>

                                </div>
                            </section>

                            {/* Live TV */}

                            <section>
                                <h3 className={sectionTitleClass}>
                                    تلویزیون
                                </h3>

                                <Link
                                    href="/live"
                                    onClick={closeMenu}
                                    className={`
                                        ${linkClass}
                                        hover:bg-[#14c78b]/10
                                    `}
                                >
                                    <TvMinimalPlay size={20} />
                                    پخش زنده شبکه‌ها

                                    <span className="
                                        mr-auto
                                        w-2 h-2
                                        rounded-full
                                        bg-[#14c78b]
                                        shadow-[0_0_8px_#14c78b]
                                    " />
                                </Link>
                            </section>

                            {/* Subscription */}

                            <section>
                                <h3 className={sectionTitleClass}>
                                    اشتراک و خدمات
                                </h3>

                                <Link
                                    href="/subscription"
                                    onClick={closeMenu}
                                    className={linkClass}
                                >
                                    <CreditCard size={20} />
                                    اشتراک من
                                </Link>
                            </section>

                        </nav>

                        {/* Bottom Actions */}

                        <div className="
                            border-t border-white/10
                            p-5
                            shrink-0
                            bg-[#0B0F14]
                        ">

                            {isLoggedIn ? (

                                <div className="flex flex-col gap-3">

                                    <button
                                        onClick={accountHandler}
                                        className="
                                            flex items-center justify-center
                                            gap-2 h-11 rounded-xl
                                            bg-[#14c78b]/10
                                            border border-[#14c78b]/20
                                            text-[#14c78b]
                                            hover:bg-[#14c78b]
                                            hover:text-black
                                            transition cursor-pointer
                                        "
                                    >
                                        <UserCircle size={18} />
                                        حساب کاربری
                                    </button>

                                    <button
                                        onClick={logoutHandler}
                                        className="
                                            flex items-center justify-center
                                            gap-2 h-11 rounded-xl
                                            border border-red-500/20
                                            bg-red-500/10
                                            text-red-400
                                            hover:bg-red-500
                                            hover:text-white
                                            transition cursor-pointer
                                        "
                                    >
                                        <LogOut size={18} />
                                        خروج
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={loginHandler}
                                    className="
                                        w-full h-11 rounded-xl
                                        bg-[#14c78b]
                                        text-black font-bold
                                        hover:scale-[1.02]
                                        transition cursor-pointer
                                    "
                                >
                                    ورود به حساب
                                </button>

                            )}

                            <div className="
                                mt-5 text-center
                                text-xs text-gray-500
                            ">
                                AlanBin © 2026
                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* Desktop Account */}

            <div className="hidden md:flex items-center gap-4">

                {isLoggedIn ? (

                    <button
                        onClick={accountHandler}
                        className="
                            flex items-center gap-3
                            h-11 px-5 rounded-xl
                            bg-white/5 border border-white/10
                            hover:border-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition cursor-pointer
                        "
                    >
                        <UserCircle className="text-[#14c78b]" />
                        <span className="text-white">
                            حساب کاربری
                        </span>
                    </button>

                ) : (

                    <button
                        onClick={loginHandler}
                        className="
                            h-11 px-6 rounded-xl
                            bg-[#14c78b]
                            text-black font-bold
                            hover:scale-105
                            transition cursor-pointer
                        "
                    >
                        ورود
                    </button>

                )}

            </div>
        </>
    );
};
