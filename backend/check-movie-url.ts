import "dotenv/config";
import mongoose from "mongoose";
import { Movie } from "./src/models/Movie";

async function main() {
    await mongoose.connect(process.env.MONGODB_URI!);

    const movies = await Movie.find({
        videoUrl: /^\/videos\//i,
    }).select("title videoUrl");

    console.log(JSON.stringify(movies, null, 2));
    console.log("Total:", movies.length);

    await mongoose.disconnect();
}

main().catch(async (error) => {
    console.error(error);
    await mongoose.disconnect();
    process.exit(1);
});
