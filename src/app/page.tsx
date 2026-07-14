import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Depoimento } from "@/components/depoimento";
import { CarrosselLogos } from "@/components/carrossel-logos";
import {
  HomeModulos,
  JourneyHero,
  JourneyOutro,
  JourneyProgressNav,
  JourneyScripts,
} from "@/components/jornada";
import "./jornada.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nukibr.com"),
  title: "Nuki — Personalização de acabamentos, do custo à entrega",
  description:
    "A plataforma que organiza a personalização de acabamentos de ponta a ponta para construtoras e incorporadoras — do memorial de custo à vistoria de entrega. Planner, Personaliza e Inspetor, num sistema só.",
  openGraph: {
    type: "website",
    siteName: "Nuki",
    locale: "pt_BR",
    title: "Nuki — Personalização de acabamentos, do custo à entrega",
    description:
      "Planeje, personalize e entregue. Sem planilha no meio: Planner, Personaliza e Inspetor num sistema só, para construtoras e incorporadoras.",
    images: [
      {
        url: "/jornada/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Nuki — A jornada, do custo à entrega",
      },
    ],
  },
};

export default function JornadaPage() {
  return (
    <div className="jornada flex min-h-screen flex-col">
      <Topbar />
      <JourneyProgressNav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <JourneyHero />
        <HomeModulos />
        <CarrosselLogos backgroundClassName="bg-nuki-preto py-8" />
        <JourneyOutro />
        {/* <Depoimento /> */}
      </main>
      <Footer />
      <JourneyScripts />
    </div>
  );
}
