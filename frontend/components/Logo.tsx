import Link from "next/link";
import { Film } from "lucide-react";

export const Logo = () => {
    return (
        <Link
            href="/"
            className="
flex
items-center
gap-3
group
"
        >
            <div
                className="
h-10
w-10
rounded-xl
bg-[#14c78b]/15
border
border-[#14c78b]/20
flex
items-center
justify-center
group-hover:rotate-12
transition
"
            >
                <Film
                    size={20}
                    className="text-[#14c78b]"
                />
            </div>

            <div>

                <h1 className="text-2xl font-black text-white">
                    Alan
                    <span className="text-[#14c78b]">
                        Bin
                    </span>
                </h1>

            </div>

        </Link>
    );
};