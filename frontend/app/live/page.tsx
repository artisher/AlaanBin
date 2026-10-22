
import Link from "next/link";

const CHANNELS = [
    {
        id: "tv1",
        title: "شبکه ۱",
        description: "پخش زنده شبکه یک سیما",
        icon: "/logos/1.png",
    },
    {
        id: "tv3",
        title: "شبکه ۳",
        description: "پخش زنده شبکه سه سیما",
        icon: "/logos/3.png",
    },
    {
        id: "varzesh",
        title: "شبکه ورزش",
        description: "پخش زنده شبکه ورزش",
        icon: "/logos/varzesh.png",
    },
    {
        id: "irinn",
        title: "شبکه خبر",
        description: "پخش زنده شبکه خبر",
        icon: "/logos/khabar.png",
    },
];

export default function LivePage() {
    return (
        <main className="min-h-screen bg-[#0B0F14] px-4 py-8 md:px-8 md:py-12">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-10">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14c78b] opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#14c78b]" />
                        </span>

                        <span className="text-sm font-medium text-[#14c78b]">
                            پخش زنده
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white md:text-4xl">
                        شبکه‌های تلویزیونی
                    </h1>

                    <p className="mt-3 text-sm text-gray-400 md:text-base">
                        شبکه موردنظر خود را انتخاب کنید و پخش زنده را تماشا کنید.
                    </p>
                </div>

                {/* Channels */}
                <div className="grid gap-5 sm:grid-cols-2">
                    {CHANNELS.map((channel) => (
                        <Link
                            key={channel.id}
                            href={`/live/${channel.id}`}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-[#111827]
                                p-6
                                text-right
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#14c78b]/50
                                hover:shadow-[0_10px_40px_rgba(20,199,139,0.10)]
                            "
                        >
                            {/* Glow */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-16
                                    -top-16
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-[#14c78b]/10
                                    blur-3xl
                                    transition-all
                                    duration-300
                                    group-hover:bg-[#14c78b]/20
                                "
                            />

                            <div className="relative z-10">

                                {/* Icon */}

                                <div
                                    className="
                                              mb-6
                                              flex
                                              h-14
                                              w-14
                                              items-center
                                              justify-center
                                              rounded-xl
                                              bg-[#14c78b]/10
                                              transition-colors
                                              group-hover:bg-[#14c78b]/20
                                                "
                                >
                                    <img
                                        src={channel.icon}
                                        alt={channel.title}
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>

                                <h2 className="text-xl font-bold text-white">
                                    {channel.title}
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    {channel.description}
                                </p>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="rounded-full bg-[#14c78b]/10 px-3 py-1 text-xs font-medium text-[#14c78b]">
                                        LIVE
                                    </span>

                                    <span className="text-sm text-gray-500 transition-colors group-hover:text-[#14c78b]">
                                        تماشا کنید ←
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

