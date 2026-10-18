import type { MetadataRoute } from "next";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.alanbin.com";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PublicItem = {
    _id: string;
    title: string;
    description?: string;
    poster?: string;
    year?: number;
};

type PublicSeoResponse = {
    movies: PublicItem[];
    series: PublicItem[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}/`,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/movies`,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/series`,
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    if (!API_URL) {
        return staticPages;
    }

    try {
        const response = await fetch(`${API_URL}/api/public/seo`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            console.error("SEO API returned:", response.status);
            return staticPages;
        }

        const data: PublicSeoResponse = await response.json();

        const moviePages: MetadataRoute.Sitemap = (data.movies || []).map(
            (movie) => ({
                url: `${SITE_URL}/movies/${movie._id}`,
                changeFrequency: "monthly",
                priority: 0.7,
            })
        );

        const seriesPages: MetadataRoute.Sitemap = (data.series || []).map(
            (series) => ({
                url: `${SITE_URL}/series/${series._id}`,
                changeFrequency: "monthly",
                priority: 0.7,
            })
        );

        return [...staticPages, ...moviePages, ...seriesPages];
    } catch (error) {
        console.error("Failed to generate sitemap:", error);
        return staticPages;
    }
}