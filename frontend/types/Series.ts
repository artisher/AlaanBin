export interface Series {
    _id: string;
    title: string;
    aliases: string[];
    description: string;
    poster: string;
    rating: number;
    topWeek: boolean;
    genre: string[];
    year: number;
    product: string;
}
export interface Episode {
    _id: string;
    seriesId: string;
    seasonNumber: number;
    episodeNumber: number;
    title: string;
    videoUrl: string;
    duration?: number;
}