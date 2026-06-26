
import { ShowTopMovie } from "./ShowTopMovie";


export const TopMovies = async () => {
    const res = await fetch("http://localhost:3000/api/TopMovies", {
        cache: "no-store"
    })
    const movies = await res.json()

    return (
        <div className="border-y border-white/10 pt-3 py-10">
            <h1 className="text-white text-xl text-center font-bold" id="whyUs">محبوب ترین های این هفته</h1>

            <ShowTopMovie movies={movies} />
        </div>
    )
}
