import { Menu } from "@/components/Menu";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { vazirmatn, outfit } from "./fonts";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.alanbin.com"),

    title: {
        default: "الان بین | تماشای فیلم و سریال",
        template: "%s | الان بین",
    },

    description:
        "در الان بین، اطلاعات فیلم‌ها و سریال‌های ایرانی و خارجی را پیدا کنید و با آثار جدید آشنا شوید.",

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        type: "website",
        locale: "fa_IR",
        url: "https://www.alanbin.com/",
        siteName: "الان بین",
        title: "الان بین | تماشای فیلم و سریال",
        description:
            "فیلم‌ها و سریال‌های ایرانی و خارجی را در الان بین کشف کنید.",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} ${outfit.variable} ${vazirmatn.className} 
bg-[#0B0F14] overflow-x-hidden`}
      >
        <AuthProvider>

          <Menu />

          {children}

          <Footer />

          <Toaster
            position="top-center"
            reverseOrder={false}
          />

        </AuthProvider>
      </body>
    </html>
  );
}
