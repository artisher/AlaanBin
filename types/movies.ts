export interface Movie {
    _id: string;
    title: string;
    description: string;
    poster: string;
    videoUrl: string,
    rating: number;
    duration: number;
    topWeek: boolean;
    genre: string[];
    year: number;
    product: string;
}