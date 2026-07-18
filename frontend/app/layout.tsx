import { Menu } from "@/components/Menu";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { vazirmatn, outfit } from "./fonts";


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
        <Menu />
        {children}
        <Footer />


      </body>
    </html>
  );
}
