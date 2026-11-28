import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export default function ProfileRow({
    label,
    value,
    icon: Icon,
    ltr,
}: {
    label: string;
    value: ReactNode;
    icon?: LucideIcon;
    ltr?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.05] px-5 py-4 last:border-b-0">
            <span className="flex shrink-0 items-center gap-2.5 text-sm text-white/45">
                {Icon && <Icon size={16} className="text-white/30" />}
                {label}
            </span>

            <span
                dir={ltr ? "ltr" : "auto"}
                className="min-w-0 max-w-[65%] break-all text-left text-sm font-medium text-white/90 sm:text-base"
            >
                {value || <span className="text-white/25">—</span>}
            </span>
        </div>
    );
}