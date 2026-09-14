
import { LiveBanner } from "@/components/LiveBanner";
import { ShowMovies } from "@/components/ShowMovies";
export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {

    return (<div>

        <LiveBanner />
        <ShowMovies />

    </div>
    )
}