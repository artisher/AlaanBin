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
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HamburgerMenu = ({
    isLoggedIn,
}: {
    isLoggedIn: boolean;
}) => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const closeMenu = () => setIsOpen(false);

    const logoutHandler = async () => {
        await logout();

        setIsOpen(false);
        router.push("/");
    };

    const loginHandler = () => {
        router.push("/login");
        router.refresh();
    };

    const accountHandler = () => {
        router.push("/account");
        setIsOpen(false);
    };

    const menuItems = [
        {
            href: "/",
            label: "صفحه اصلی",
            icon: Home,
        },
        {
            href: "/movies",
            label: "فیلم‌ها",
            icon: Film,
        },
        {
            href: "/series",
            label: "سریال‌ها",
            icon: Tv,
        },
        {
            href: "/search",
            label: "جستجو",
            icon: Search,
        },
        {
            href: "/subscription",
            label: "اشتراک",
            icon: CreditCard,
        },
    ];

    return (
        <>
            {/* Mobile */}

            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden"
            >
                <Menu
                    size={30}
                    className="text-white"
                />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[9999]">

                    {/* Overlay */}

                    <div
                        onClick={closeMenu}
                        className="
                            absolute
                            inset-0
                            bg-black/85
                            backdrop-blur-sm
                        "
                    />

                    {/* Panel */}

                    <div
                        className="
                            absolute
                            right-0
                            top-0
                            h-screen
                            w-[300px]
                            bg-[#0B0F14]
                            border-l
                            border-white/10
                            shadow-2xl
                            flex
                            flex-col
                            overflow-y-auto
                        "
                    >

                        {/* Header */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            p-6
                            border-b
                            border-white/10
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

                            <button onClick={closeMenu}>
                                <X className="text-white" />
                            </button>

                        </div>

                        {/* Links */}

                        <nav className="flex flex-col p-5 gap-2">

                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-gray-300
                                            hover:bg-[#14c78b]/10
                                            hover:text-[#14c78b]
                                            transition
                                        "
                                    >
                                        <Icon size={20} />

                                        {item.label}
                                    </Link>
                                );
                            })}

                        </nav>

                        <div className="flex-1" />

                        {/* Bottom */}

                        <div className="
                            border-t
                            border-white/10
                            p-5
                        ">

                            {isLoggedIn ? (

                                <div className="flex flex-col gap-3">

                                    <button
                                        onClick={accountHandler}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            h-11
                                            rounded-xl
                                            bg-[#14c78b]/10
                                            border
                                            border-[#14c78b]/20
                                            text-[#14c78b]
                                            hover:bg-[#14c78b]
                                            hover:text-black
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        <UserCircle size={18} />

                                        حساب کاربری
                                    </button>

                                    <button
                                        onClick={logoutHandler}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            h-11
                                            rounded-xl
                                            border
                                            border-red-500/20
                                            bg-red-500/10
                                            text-red-400
                                            hover:bg-red-500
                                            hover:text-white
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        <LogOut size={18} />

                                        خروج
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() => {
                                        loginHandler();
                                        closeMenu();
                                    }}
                                    className="
                                        w-full
                                        h-11
                                        rounded-xl
                                        bg-[#14c78b]
                                        text-black
                                        font-bold
                                        hover:scale-[1.02]
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    ورود به حساب
                                </button>

                            )}

                            <div className="
                                mt-6
                                text-center
                                text-xs
                                text-gray-500
                            ">
                                AlanBin © 2026
                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* Desktop */}

            <div className="hidden md:flex items-center gap-4">

                {isLoggedIn ? (

                    <button
                        onClick={accountHandler}
                        className="
                            flex
                            items-center
                            gap-3
                            h-11
                            px-5
                            rounded-xl
                            bg-white/5
                            border
                            border-white/10
                            hover:border-[#14c78b]
                            hover:bg-[#14c78b]/10
                            transition
                            cursor-pointer
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
                            h-11
                            px-6
                            rounded-xl
                            bg-[#14c78b]
                            text-black
                            font-bold
                            hover:scale-105
                            transition
                            cursor-pointer
                        "
                    >
                        ورود
                    </button>

                )}

            </div>
        </>
    );
};