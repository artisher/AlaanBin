
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

    if (!res.ok) {
        throw new Error("Failed to fetch movie");
    }

    const movie = await res.json();

    return <VideoPlayer video={movie} />;
}
