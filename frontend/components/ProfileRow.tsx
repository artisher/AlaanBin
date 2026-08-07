export default function ProfileRow({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div
            className="
            flex
            items-start
            justify-between
            gap-4

            rounded-2xl
            border
            border-white/5

            bg-white/[0.03]

            px-6
            py-4

            transition-all
            duration-300

            hover:border-[#14c78b]/20
            hover:bg-white/[0.05]
            "
        >

            <span className="text-gray-400 shrink-0">
                {label}
            </span>

            <span
                className="
                text-white
                font-semibold

                text-left

               


break-all
                whitespace-normal

                max-w-[65%]
                "
            >
                {value}
            </span>

        </div>
    );
}