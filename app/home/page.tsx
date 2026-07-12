
import { ShowMovies } from "@/components/ShowMovies";
export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    
    return <ShowMovies/>;
}