export default function ProfileRow({ label, value }) {

    return (

        <div
            className="
            flex
            items-center
            justify-between
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

            <span className="text-gray-400">
                {label}
            </span>

            <span className="font-semibold text-white">
                {value}
            </span>

        </div>

    );

}