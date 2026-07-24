"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export const LoginComponent = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }
        console.log("Login success");
        router.refresh();
        router.push("/");
        console.log("Push done");
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
            <div
                className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-[#14c78b]/20
                bg-[#111827]
                p-8
                shadow-[0_0_40px_rgba(20,199,139,.12)]
            "
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div
                        className="
                        mx-auto
                        mb-5
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#14c78b]/30
                        bg-[#14c78b]/10
                    "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-[#14c78b]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10l4.553-4.553a2 2 0 10-2.828-2.828L12.172 7.172M15 10l-6.586 6.586a2 2 0 102.828 2.828L17.828 12.828M15 10L9 4"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        ورود به حساب
                    </h1>

                    <p className="mt-3 text-gray-400 leading-7">
                        برای دسترسی به حساب کاربری خود وارد شوید.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            ایمیل
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="
                            w-full
                            rounded-xl
                            border
                            border-[#14c78b]/20
                            bg-[#0B0F14]
                            px-4
                            py-3
                            text-white
                            placeholder:text-gray-500
                            outline-none
                            transition
                            focus:border-[#14c78b]
                            focus:shadow-[0_0_20px_rgba(20,199,139,.2)]
                        "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            رمز عبور
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="
                            w-full
                            rounded-xl
                            border
                            border-[#14c78b]/20
                            bg-[#0B0F14]
                            px-4
                            py-3
                            text-white
                            placeholder:text-gray-500
                            outline-none
                            transition
                            focus:border-[#14c78b]
                            focus:shadow-[0_0_20px_rgba(20,199,139,.2)]
                        "
                        />
                    </div>

                    <div className="text-center">
                        <a
                            href="/login/forget-password"
                            className="
                            text-sm
                            text-[#14c78b]
                            
                            transition
                            hover:text-[#33dca0]
                        "
                        >
                            رمز عبور را فراموش کرده‌اید؟
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="
                        w-full
                        rounded-xl
                        bg-[#14c78b]
                        py-3
                        font-semibold
                        text-black
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        hover:shadow-[0_0_30px_rgba(20,199,139,.45)]
                        cursor-pointer
                    "
                    >
                        ورود
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
                    حساب کاربری ندارید؟{" "}
                    <a
                        href="/register"
                        className="font-medium text-[#14c78b] hover:underline"
                    >
                        ثبت‌نام کنید
                    </a>
                </div>
            </div>
        </div>
    );
}
