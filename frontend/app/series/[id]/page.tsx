import type { Metadata } from "next";
import SeriesClient from "./SeriesClient";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id } = await params;

    return {
        alternates: {
            canonical: `/series/${id}`,
        },
    };
}

export default function SeriesPage() {
    return <SeriesClient />;
}