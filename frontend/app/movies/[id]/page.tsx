import { VideoPlayer } from "@/components/VideoPlayer";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`,
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    if (res.status === 404) {
        notFound();
    }

    const data = await res.json();

    if (!res.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-3">
                        {data?.message || "خطایی رخ داد"}
                    </h1>

                    <p className="text-gray-400">
                        {data?.code === "SUBSCRIPTION_REQUIRED"
                            ? "برای تماشای این فیلم باید اشتراک فعال داشته باشید."
                            : "متأسفانه در دریافت اطلاعات فیلم مشکلی پیش آمد."}
                    </p>
                </div>
            </div>
        );
    }

    return <VideoPlayer video={data} />;
}