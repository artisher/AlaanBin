import { Menu } from "@/components/Menu";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { vazirmatn, outfit } from "./fonts";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";

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
