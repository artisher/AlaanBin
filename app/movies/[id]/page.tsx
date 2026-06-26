import { VideoPlayer } from "@/components/VideoPlayer";

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await fetch(
        `http://localhost:5000/api/movies/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return <div>خطا در دریافت فیلم</div>;
    }

    const movie = await res.json();

    return (
        <VideoPlayer video={movie} />
    );
}