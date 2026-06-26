"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export const RegisterComponent = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [role, setRole] = useState("user")

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    phoneNumber,
                    email,
                    password,
                    country,
                    city,
                    role
                }),
            }
            );
            const data = await res.json();

            if (!res.ok) {
                alert(data.message)

            } else {
                alert("ثبت نام انجام شد , وارد شوید")
                router.push("/home");
            }


        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
            <div className="w-full  max-w-xl bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-xl">

                {/* Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-white mb-2">
                        ثبت‌نام
                    </h1>
                    <p className="text-gray-400 text-sm">
                        برای دسترسی بیشتر ثبت نام کنید
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5  flex flex-wrap gap-x-3 justify-center">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            نام
                        </label>
                        <input
                            type="name"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#0B0F14] border  border-white/10 rounded-lg px-4 py-2
                             text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981]
                              transition placeholder:text-left"
                            placeholder="Jamshid"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            شماره
                        </label>
                        <input
                            type="number"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2
                             text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981]
                              transition placeholder:text-left"
                            placeholder="+43..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            ایمیل
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2
                             text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981] 
                             transition placeholder:text-left"
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
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2
                             text-white placeholder-gray-500 focus:outline-none focus:border-[#10B981] 
                             transition  placeholder:text-left"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            کشور
                        </label>
                        <input
                            type="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2 text-white
                             placeholder-gray-500 focus:outline-none focus:border-[#10B981]
                              transition placeholder:text-left"
                            placeholder="Iran..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            شهر
                        </label>
                        <input
                            type="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-2 text-white
                             placeholder-gray-500 focus:outline-none focus:border-[#10B981]
                              transition placeholder:text-left"
                            placeholder="Tehran..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#10B981] hover:bg-[#0ea371] text-black font-medium py-2.5 rounded-lg transition"
                    >
                        ثبت نام
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    حساب کاربری دارید؟{" "}
                    <a
                        href="/login"
                        className="text-[#10B981] hover:underline"
                    >
                        وارد شوید
                    </a>
                </div>
            </div>
        </div>
    )
}
