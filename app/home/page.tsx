
import { ShowMovies } from "@/components/ShowMovies";
export default async function Home() {
    const res = await fetch("http://localhost:5000/api/movies", {
        cache: "no-store"
    })
    const movies = await res.json()
    return (
        <ShowMovies movies={movies} />
    )

}
