
import type { Metadata } from "next";
import SeriesListClient from "./SeriesListClient";

export const metadata: Metadata = {
    title: "سریال‌ها",
    description:
        "سریال‌های ایرانی و خارجی را در الان بین کشف کنید و اطلاعات و جزئیات آن‌ها را ببینید.",
    alternates: {
        canonical: "/series",
    },
    openGraph: {
        title: "سریال‌ها | الان بین",
        description:
            "سریال‌های ایرانی و خارجی را در پلتفرم الان بین کشف کنید.",
        url: "https://alanbin.com/series",
        siteName: "الان بین",
        locale: "fa_IR",
        type: "website",
    },
};

export default function Page() {
    return <SeriesListClient />;
}
