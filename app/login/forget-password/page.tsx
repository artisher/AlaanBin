import Link from "next/link";
import { MessageCircle, ArrowLeft } from "lucide-react";

export default function ForgetPasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#05070a] via-[#0b0f14] to-[#11171f] flex items-center justify-center px-6">

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-[#14c78b]/20
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-10
                    text-center
                    shadow-[0_0_40px_rgba(20,199,139,.15)]
                "
            >
                <div
                    className="
                        mx-auto
                        mb-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-[#14c78b]/10
                        border
                        border-[#14c78b]/30
                    "
                >
                    <MessageCircle
                        size={38}
                        className="text-[#14c78b]"
                    />
                </div>

                <h1 className="text-3xl font-bold text-white">
                    بازیابی رمز عبور
                </h1>

                <p className="mt-5 text-gray-400 leading-8">
                    برای بازیابی رمز عبور لطفاً از طریق واتساپ به شماره زیر پیام ارسال کنید.
                    <br />
                    پس از تأیید هویت، رمز عبور حساب شما تغییر داده خواهد شد.
                </p>

                <div
                    className="
                        mt-8
                        rounded-2xl
                        border
                        border-[#14c78b]/25
                        bg-[#14c78b]/10
                        py-5
                    "
                >
                    <p className="text-sm text-gray-400 mb-2">
                        شماره واتساپ
                    </p>

                        <a
                            href="https://wa.me/436764479470"
                            target="_blank"
                            rel="noopener noreferrer"
                            dir="ltr"
                            className="block text-center text-3xl font-bold text-[#14c78b]"
                        >
                            +43 676 4479470
                        </a>
                </div>

                <a
                    href="https://wa.me/436764479470"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        mt-8
                        flex
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        bg-[#14c78b]
                        py-4
                        font-bold
                        text-black
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        hover:shadow-[0_0_30px_rgba(20,199,139,.4)]
                    "
                >
                    <MessageCircle size={22} />
                    ارسال پیام در واتساپ
                </a>

                <Link
                    href="/login"
                    className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        text-gray-400
                        transition
                        hover:text-[#14c78b]
                    "
                >
                    <ArrowLeft size={18} />
                    بازگشت به صفحه ورود
                </Link>
            </div>
        </div>
    );
}