import { Menu } from "@/components/Menu";
import "./globals.css";
import { Footer } from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-[#0B0F14] overflow-x-hidden"
      >
        <Menu />
        {children}
        <Footer />


      </body>
    </html>
  );
}
