"use client";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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

    if (fullName.trim().length < 2) {
        toast.error("نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        toast.error("لطفاً یک ایمیل معتبر وارد کنید.");
        return;
    }

    if (password.length < 8) {
        toast.error("رمز عبور باید حداقل ۸ کاراکتر باشد.");
        return;
    }

    const phoneRegex = /^\+?[0-9]{8,15}$/;

    if (!phoneRegex.test(phoneNumber.trim())) {
        toast.error("لطفاً یک شماره موبایل معتبر وارد کنید.");
        return;
    }

    try {
        const res = await fetch(
            `${ process.env.NEXT_PUBLIC_API_URL }/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: fullName.trim(),
                    phoneNumber: phoneNumber.trim(),
                    email: email.trim(),
                    password,
                    country: country.trim(),
                    city: city.trim(),
                }),
            }
        );

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
            const text = await res.text();

          

            toast.error("سرور پاسخ نامعتبر ارسال کرد.");
            return;
        }

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || "ثبت‌نام انجام نشد.");
            console.error("REGISTER ERROR:", data);
            return;
        }

        toast.success("حساب کاربری با موفقیت ساخته شد.");
        router.push("/home");

    } catch (err) {
        console.error("REGISTER ERROR:", err);
        toast.error("خطایی در اتصال به سرور رخ داد.");
    }
};



    return (
        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4 py-10">
            <div
                className="
                w-full
                max-w-3xl
                rounded-3xl
                border
                border-[#14c78b]/20
                bg-[#111827]
                p-8
                shadow-[0_0_40px_rgba(20,199,139,.12)]
            "
            >
                {/* Header */}
                <div className="text-center mb-10">
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
                        <UserPlus
                            size={38}
                            className="text-[#14c78b]"
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        ثبت‌نام
                    </h1>

                    <p className="mt-3 text-gray-400">
                        حساب کاربری خود را ایجاد کنید.
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            نام و نام خانوادگی
                        </label>

                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Jamshid Ahmadi"
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
                        <label className="block mb-2 text-sm text-gray-300">
                            شماره موبایل
                        </label>

                        <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+43..."
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
                        <label className="block mb-2 text-sm text-gray-300">
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
                        <label className="block mb-2 text-sm text-gray-300">
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

                    <div>
                        <label className="block mb-2 text-sm text-gray-300">
                            کشور
                        </label>

                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Austria"
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
                        <label className="block mb-2 text-sm text-gray-300">
                            شهر
                        </label>

                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Vienna"
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

                    <div className="md:col-span-2 mt-2">
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
                            hover:scale-[1.01]
                            hover:shadow-[0_0_30px_rgba(20,199,139,.45)]
                            cursor-pointer
                        "
                        >
                            ثبت‌نام
                        </button>
                    </div>
                </form>

                <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
                    قبلاً ثبت‌نام کرده‌اید؟{" "}
                    <a
                        href="/login"
                        className="text-[#14c78b] font-medium hover:underline"
                    >
                        وارد شوید
                    </a>
                </div>
            </div>
        </div>
    );
}
