import { VideoPlayer } from "@/components/VideoPlayer";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";


type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { id } = await params;

    return {
        alternates: {
            canonical: `/movies/${id}`,
        },
    };
}
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
    console.log(data);
    console.log(data?.code);


    if (!res.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">

                <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F14] px-5 text-center">
                    <div className="max-w-md">

                        <div className="mb-4 text-4xl">
                            {data?.code === "PLAYBACK_ERROR" ? "⚠️" : "🔒"}
                        </div>

                        <h2 className="mb-3 text-xl font-bold text-white">
                            {data?.code === "ابتدا وارد حساب شوید"
                                ? "برای تماشای فیلم وارد حساب شوید"
                                : data?.code === "اشتراک شما منقضی شده است"
                                    ? "حساب شما اشتراک ندارد"
                                    : "مشکلی در پخش فیلم به وجود آمده است"}
                        </h2>

                        <p className="mb-5 text-sm leading-7 text-gray-400">
                            {data?.code === "ابتدا وارد حساب شوید"
                                ? "برای تماشای این فیلم ابتدا وارد حساب کاربری خود شوید."
                                : data?.code === "اشتراک شما منقضی شده است"
                                    ? "برای تماشای سریال، ابتدا اشتراک AlanBin تهیه کنید."
                                    : "لطفاً چند لحظه دیگر دوباره تلاش کنید."}
                        </p>

                        {data?.code === "اشتراک شما منقضی شده است" && (
                            <a
                                href="/"
                                className="inline-flex rounded-lg bg-[#14c78b] px-6 py-3 font-bold text-[#0B0F14] transition hover:bg-[#10b981]"
                            >
                                تهیه اشتراک
                            </a>
                        )}

                        {data?.code === "ابتدا وارد حساب شوید" && (
                            <a
                                href="/login"
                                className="inline-flex rounded-lg bg-[#14c78b] px-6 py-3 font-bold text-[#0B0F14] transition hover:bg-[#10b981]"
                            >
                                ورود به حساب
                            </a>
                        )}

                    </div>
                </div>
            </div>
        );
    }

    return <VideoPlayer video={data} />;
}