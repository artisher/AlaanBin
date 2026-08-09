import { Ban, Database, ServerCog } from "lucide-react";

const features = [
    {
        icon: Database,
        title: "آرشیو کامل ایرانی",
        description:
            "به مجموعه‌ای گسترده از فیلم‌ها و سریال‌های ایرانی دسترسی داشته باشید؛ آرشیوی که به‌صورت مداوم با محتوای جدید به‌روزرسانی می‌شود.",
    },
    {
        icon: ServerCog,
        title: "پخش سریع و پایدار",
        description:
            "زیرساخت بهینه‌شده برای کاربران اروپا، تجربه‌ای روان و پایدار برای تماشای فیلم و سریال بدون دردسر فراهم می‌کند.",
    },
    {
        icon: Ban,
        title: "تماشا بدون تبلیغات",
        description:
            "بدون تبلیغات مزاحم و بدون وقفه، مستقیماً وارد داستان شوید و از تماشای محتوای مورد علاقه‌تان لذت ببرید.",
    },
];

export const WhyAlanbin = () => {
    return (
        <section className="relative overflow-hidden bg-[#0B0F14] py-24">

            {/* Background */}

            <div className="pointer-events-none absolute inset-0">

                {/* Soft green glow - center */}
                <div
                    className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[500px]
                    w-[700px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#14c78b]/5
                    blur-[120px]
                    "
                />

                {/* Top left glow */}
                <div
                    className="
                    absolute
                    -left-40
                    -top-40
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-[#14c78b]/7
                    blur-[100px]
                    "
                />

                {/* Bottom right glow */}
                <div
                    className="
                    absolute
                    -bottom-40
                    -right-40
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-[#14c78b]/5
                    blur-[100px]
                    "
                />

                {/* Subtle grid */}
                <div
                    className="
                    absolute
                    inset-0
                    opacity-[0.035]
                    "
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                        `,
                        backgroundSize: "55px 55px",
                    }}
                />

                {/* Top fade */}
                <div
                    className="
                    absolute
                    inset-x-0
                    top-0
                    h-32
                    bg-gradient-to-b
                    from-[#0B0F14]
                    to-transparent
                    "
                />

                {/* Bottom fade */}
                <div
                    className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-32
                    bg-gradient-to-t
                    from-[#0B0F14]
                    to-transparent
                    "
                />

            </div>


            {/* Content */}

            <div className="relative mx-auto max-w-7xl px-5">

                {/* Heading */}

                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <div
                        className="
                        mx-auto
                        mb-5
                        flex
                        w-fit
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-[#14c78b]/20
                        bg-[#14c78b]/5
                        px-4
                        py-2
                        "
                    >
                        <span className="h-2 w-2 rounded-full bg-[#14c78b] shadow-[0_0_10px_#14c78b]" />

                        <span className="text-sm font-medium text-[#14c78b]">
                            تجربه بهتر با AlanBin
                        </span>
                    </div>


                    <h2
                        className="
                        text-4xl
                        font-extrabold
                        tracking-tight
                        text-white
                        md:text-5xl
                        "
                    >
                        چرا AlanBin؟
                    </h2>


                    <div
                        className="
                        mx-auto
                        mt-5
                        h-1
                        w-20
                        rounded-full
                        bg-[#14c78b]
                        shadow-[0_0_15px_rgba(20,199,139,.5)]
                        "
                    />


                    <p
                        className="
                        mx-auto
                        mt-6
                        max-w-2xl
                        text-base
                        leading-8
                        text-gray-400
                        md:text-lg
                        "
                    >
                        همه‌چیز را برای یک تجربه ساده، سریع و لذت‌بخش
                        از تماشای فیلم و سریال ایرانی فراهم کرده‌ایم.
                    </p>

                </div>


                {/* Cards */}

                <div className="grid gap-6 md:grid-cols-3">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/[0.08]
                                bg-[#111827]/80
                                p-8
                                text-center
                                backdrop-blur-xl
                                transition-all
                                duration-500

                                hover:-translate-y-2
                                hover:border-[#14c78b]/40
                                hover:bg-[#111827]
                                hover:shadow-[0_20px_50px_rgba(0,0,0,.35)]
                                "
                            >

                                {/* Card glow */}

                                <div
                                    className="
                                    pointer-events-none
                                    absolute
                                    -right-20
                                    -top-20
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-[#14c78b]/10
                                    blur-[60px]
                                    opacity-0
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-100
                                    "
                                />


                                {/* Top line */}

                                <div
                                    className="
                                    absolute
                                    left-1/2
                                    top-0
                                    h-[2px]
                                    w-0
                                    -translate-x-1/2
                                    bg-[#14c78b]
                                    shadow-[0_0_15px_#14c78b]
                                    transition-all
                                    duration-500
                                    group-hover:w-1/2
                                    "
                                />


                                {/* Icon */}

                                <div
                                    className="
                                    relative
                                    mx-auto
                                    mb-7
                                    flex
                                    h-20
                                    w-20
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-[#14c78b]/20
                                    bg-[#14c78b]/5
                                    transition-all
                                    duration-500

                                    group-hover:scale-110
                                    group-hover:border-[#14c78b]/50
                                    group-hover:bg-[#14c78b]/10
                                    group-hover:shadow-[0_0_30px_rgba(20,199,139,.15)]
                                    "
                                >

                                    <Icon
                                        size={38}
                                        strokeWidth={1.8}
                                        className="
                                        text-[#14c78b]
                                        transition-transform
                                        duration-500
                                        group-hover:scale-110
                                        "
                                    />

                                </div>


                                {/* Title */}

                                <h3
                                    className="
                                    text-xl
                                    font-bold
                                    text-white
                                    transition-colors
                                    duration-300
                                    group-hover:text-[#14c78b]
                                    "
                                >
                                    {feature.title}
                                </h3>


                                {/* Divider */}

                                <div
                                    className="
                                    mx-auto
                                    mt-4
                                    h-[2px]
                                    w-10
                                    rounded-full
                                    bg-[#14c78b]/50
                                    transition-all
                                    duration-500
                                    group-hover:w-16
                                    group-hover:bg-[#14c78b]
                                    "
                                />


                                {/* Description */}

                                <p
                                    className="
                                    mt-5
                                    text-sm
                                    leading-8
                                    text-gray-400
                                    "
                                >
                                    {feature.description}
                                </p>

                            </div>
                        );
                    })}

                </div>


                {/* Bottom accent */}

                <div className="mt-16 flex items-center justify-center gap-3">

                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#14c78b]/30" />

                    <div
                        className="
                        h-2
                        w-2
                        rounded-full
                        bg-[#14c78b]
                        shadow-[0_0_12px_#14c78b]
                        "
                    />

                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#14c78b]/30" />

                </div>

            </div>

        </section>
    );
};