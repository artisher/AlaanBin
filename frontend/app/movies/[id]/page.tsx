import { VideoPlayer } from "@/components/VideoPlayer";
import { cookies } from "next/headers";

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const cookieStore = await cookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    const movie = await res.json();
    console.log(movie, "test");

    return <VideoPlayer video={movie} />;
}