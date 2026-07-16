export const MovieCardSkeleton = () => {
    return (
        <div className="w-54 overflow-hidden rounded-2xl border border-[#14c78b]/15 bg-[#111827] shadow-[0_0_20px_rgba(20,199,139,.08)]">

            <div className="relative h-66 shimmer bg-[#18212e]" />

            <div className="space-y-4 p-4">

                <div className="relative h-5 w-4/5 rounded-full shimmer bg-[#18212e]" />

                <div className="flex justify-between">

                    <div className="relative h-4 w-14 rounded-full shimmer bg-[#18212e]" />

                    <div className="relative h-4 w-10 rounded-full shimmer bg-[#18212e]" />

                </div>

                <div className="relative h-10 rounded-xl shimmer bg-[#18212e]" />

            </div>

        </div>
    );
};