
import type { Metadata } from "next";
import SeriesClient from "./SeriesClient";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.alanbin.com";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PublicSeries = {
    _id: string;
    title: string;
    description?: string;
    poster?: string;
    year?: number;
};

type PublicSeoResponse = {
    movies?: unknown[];
    series?: PublicSeries[];
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;

    const fallback: Metadata = {
        title: "تماشای سریال",
        description:
            "اطلاعات سریال‌ها و قسمت‌های آن‌ها را در الان بین دنبال کنید.",
        robots: {
            index: false,
            follow: true,
        },
    };

    if (!API_URL) return fallback;

    try {
        const response = await fetch(`${API_URL}/api/public/seo`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) return fallback;

        const data: PublicSeoResponse = await response.json();

        const series = (data.series || []).find(
            (item) => item._id === id
        );

        if (!series) return fallback;

        const title = series.title;

        const description =
            series.description?.trim() ||
            `اطلاعات و قسمت‌های سریال ${series.title} را در الان بین ببینید.`;

        const poster = series.poster
            ? series.poster.startsWith("http")
                ? series.poster
                : `${API_URL.replace(/\/$/, "")}/${series.poster.replace(/^\//, "")}`
            : undefined;

        return {
            title,
            description,
            alternates: {
                canonical: `${SITE_URL}/series/${id}`,
            },
            openGraph: {
                type: "website",
                locale: "fa_IR",
                url: `${SITE_URL}/series/${id}`,
                siteName: "الان بین",
                title,
                description,
                ...(poster ? { images: [{ url: poster }] } : {}),
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        console.error("Failed to generate series metadata:", error);
        return fallback;
    }
}

export default function SeriesPage() {
    return <SeriesClient />;
}
