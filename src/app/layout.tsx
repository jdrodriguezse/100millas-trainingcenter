import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "100 Millas Training Center",
  description:
    "Sistema web de gestión para la academia de béisbol 100 Millas Training Center",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#04060e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
