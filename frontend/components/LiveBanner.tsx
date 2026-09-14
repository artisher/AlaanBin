
import Link from "next/link";

export const LiveBanner = () => {
    return (
        <section className="mb-10">
            <Link
                href="/live"
                className="
                    group
                    relative
                    block
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#14c78b]/20
                    bg-[#111827]
                    p-6
                    transition-all
                    duration-300
                    hover:border-[#14c78b]/50
                    hover:shadow-[0_10px_40px_rgba(20,199,139,0.10)]
                "
            >
                {/* Glow */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-64
                        w-64
                        rounded-full
                        bg-[#14c78b]/10
                        blur-3xl
                        transition-all
                        duration-500
                        group-hover:bg-[#14c78b]/15
                    "
                />

                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    {/* Info */}
                    <div className="flex items-center gap-4">

                        {/* Live Icon */}
                        <div
                            className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#14c78b]/10
                                text-[#14c78b]
                            "
                        >
                            <div className="relative">
                                <span className="absolute inset-0 animate-ping rounded-full bg-[#14c78b]/40" />
                                <span className="relative block h-3 w-3 rounded-full bg-[#14c78b]" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <span className="text-sm font-medium text-[#14c78b]">
                                    پخش زنده
                                </span>

                                <span className="rounded-full bg-[#14c78b]/10 px-2 py-0.5 text-[10px] font-bold text-[#14c78b]">
                                    LIVE
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-white md:text-2xl">
                                شبکه‌های تلویزیونی ایران
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                شبکه ۳ و شبکه ورزش را به صورت زنده تماشا کنید.
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <div
                        className="
                            flex
                            h-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#14c78b]
                            px-6
                            font-semibold
                            text-black
                            transition-all
                            duration-300
                            group-hover:translate-x-[-4px]
                            group-hover:bg-[#16d895]
                        "
                    >
                        تماشای پخش زنده
                        <span className="mr-2 text-lg">
                            ←
                        </span>
                    </div>

                </div>
            </Link>
        </section>
    );
};

