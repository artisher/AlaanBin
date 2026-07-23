
import { ShowTopMovie } from "./ShowTopMovie";


export const TopMovies = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/top`, {

        cache: "no-store"
    })


    console.log("status:", res.status);
    console.log("ok:", res.ok);

    const data = await res.json();

    console.log("data:", data);
    console.log("isArray:", Array.isArray(data));


    return (
        <div className="border-y border-white/10 py-16">
            <div className="text-center mb-10">



                <h2 className="mt-3 text-4xl font-bold text-white">
                    محبوب‌ترین‌های این هفته
                </h2>

                <div className="w-24 h-1 bg-[#14c78b] rounded-full mx-auto mt-4" />

            </div>
            <ShowTopMovie movies={data} />

        </div>
    )
}
