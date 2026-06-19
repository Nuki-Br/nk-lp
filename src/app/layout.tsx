import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { DemoModalProvider } from "@/components/demo-modal";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nuki — Visualize, personalize e realize",
  description:
    "A Nuki oferece uma jornada de personalização que transforma a experiência do seu cliente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-nuki-cinza-claro text-nuki-preto">
        <DemoModalProvider>
          {children}
        </DemoModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
