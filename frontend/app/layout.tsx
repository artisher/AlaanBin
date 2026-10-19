import { Menu } from "@/components/Menu";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { vazirmatn, outfit } from "./fonts";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://alanbin.com"),

  title: {
    default: "الان بین | پلتفرم فیلم و سریال",
    template: "%s | الان بین",
  },

  description:
    "الان بین، پلتفرم معرفی و تماشای فیلم‌ها و سریال‌های ایرانی و خارجی؛ اطلاعات آثار، داستان سریال‌ها و جدیدترین محتوا را در الان بین دنبال کنید.",

  alternates: {
    canonical: "https://alanbin.com/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://alanbin.com/",
    siteName: "الان بین",
    title: "الان بین | پلتفرم فیلم و سریال",
    description:
      "فیلم‌ها و سریال‌های ایرانی و خارجی را در پلتفرم الان بین کشف کنید.",
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "الان بین",
              alternateName: "AlanBin",
              url: "https://alanbin.com/",
            }),
          }}
        />
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
