import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import {
  JourneyHero,
  JourneyModule,
  JourneyOutro,
  JourneyProgressNav,
  JourneyScripts,
  journeyModules,
} from "@/components/jornada";
import "./jornada.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nukibr.com"),
  title: "Nuki — A jornada, do custo à entrega",
  description:
    "Software de personalização para construtoras e incorporadoras: do memorial de incorporação à vistoria de entrega, num só fluxo — Planner, Personaliza e Inspetor.",
  openGraph: {
    type: "website",
    siteName: "Nuki",
    locale: "pt_BR",
    title: "Nuki — A jornada, do custo à entrega",
    description:
      "Do memorial de incorporação à vistoria de entrega, num só fluxo: Planner, Personaliza e Inspetor.",
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
        <JourneyHero />
        {journeyModules.map((data) => (
          <JourneyModule key={data.id} data={data} />
        ))}
        <JourneyOutro />
      </main>
      <Footer />
      <JourneyScripts />
    </div>
  );
}
