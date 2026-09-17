
import { LiveBanner } from "@/components/LiveBanner";
import { ShowMovies } from "@/components/ShowMovies";
import { ShowSeries } from "@/components/ShowSeries";
export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {

    return (<div>

        <LiveBanner />
        <ShowMovies />
        <ShowSeries />
    </div>
    )
}