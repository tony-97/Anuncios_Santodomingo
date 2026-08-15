import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { AdsProvider } from "@/context/AdsContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modals from "@/components/Modals";
import Toast from "@/components/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuncios Santo Domingo - Clasificados Comunales de Huánuco",
  description:
    "Plataforma de anuncios clasificados de empleos y alquileres para Santo Domingo y Huánuco. Publica gratis y encuentra lo que necesitas fácilmente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${oswald.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <AdsProvider>
          <Navbar />
          <div className="flex-grow flex flex-col">{children}</div>
          <Footer />
          <Modals />
          <Toast />
        </AdsProvider>
      </body>
    </html>
  );
}
