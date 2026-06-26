"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export const LoginComponent = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/auth/login", {
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

        router.refresh();
        router.push("/");

    };

    return (
        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-xl">

                {/* Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-white mb-2">
                        ورود به حساب کاربری
                    </h1>
                    <p className="text-gray-400 text-sm">
                        برای دسترسی به داشبورد وارد شوید
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            ایمیل
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981] transition"
                            placeholder="example@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            رمز عبور
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981] transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"

                        className="w-full bg-[#10B981] cursor-pointer hover:bg-[#0ea371] text-black font-medium py-2.5 rounded-lg transition"
                    >
                        ورود
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    حساب کاربری ندارید؟{" "}
                    <a
                        href="/register"
                        className="text-[#10B981] hover:underline"
                    >
                        ثبت‌نام کنید
                    </a>
                </div>
            </div>
        </div>
    )
}
