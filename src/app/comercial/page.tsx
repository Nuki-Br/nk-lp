import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import {
  Capa,
  Problema,
  OQueEANuki,
  Modulos,
  Diferenciais,
  PublicoAlvo,
  Cases,
  Calculadora,
  CTA,
  CalculadoraProvider,
  ComercialProgressNav,
  ComercialScripts,
} from "@/components/comercial";
import "../jornada.css";
import "./comercial.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nukibr.com"),
  title: "Nuki — Apresentação comercial",
  description:
    "Do planejamento do memorial à validação em obra — como a Nuki organiza, profissionaliza e centraliza o ciclo completo de personalização de acabamentos em uma plataforma só.",
  openGraph: {
    type: "website",
    siteName: "Nuki",
    locale: "pt_BR",
    title: "Nuki — Apresentação comercial",
    description:
      "Do planejamento do memorial à validação em obra — como a Nuki organiza o ciclo completo de personalização em uma plataforma só.",
    images: [
      {
        url: "/jornada/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Nuki — Apresentação comercial",
      },
    ],
  },
};

export default function ComercialPage() {
  return (
    <div className="jornada comercial flex min-h-screen flex-col">
      {/* Prefetch da demo do Planner — baixa em background enquanto o user rola
          pelas primeiras seções. Quando chega em #planner-demo, o iframe já
          carrega quase instantâneo. */}
      <link rel="prefetch" href="/demos/planner/index.html" as="document" />
      <ComercialProgressNav />
      <main className="flex flex-1 flex-col">
        <Capa />
        <Problema />
        <OQueEANuki />
        <Modulos />
        <Diferenciais />
        <PublicoAlvo />
        <Cases />
        {/* Provider engloba Calculadora + CTA — permite ao CTA ler o total
            de imagens/custo publicado pela Calculadora e compor o "Total
            consolidado" sem prop drilling entre seções irmãs. */}
        <CalculadoraProvider>
          <CTA />
          <Calculadora />
        </CalculadoraProvider>
      </main>
      <Footer />
      <ComercialScripts />
      <div className="cm-hint" aria-hidden="true">
        Use <kbd>←</kbd> <kbd>→</kbd> para navegar
      </div>
    </div>
  );
}
