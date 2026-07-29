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
  TotalEstimado,
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
      <ComercialProgressNav />
      <main className="flex flex-1 flex-col">
        <Capa />
        <Problema />
        <OQueEANuki />
        <Modulos />
        <Diferenciais />
        <PublicoAlvo />
        <Cases />
        {/* Provider engloba CTA + Calculadora + TotalEstimado — o CTA edita os
            meses/ciclo, a Calculadora publica imagens/custo, e o TotalEstimado
            (frame de fechamento) só lê os dois. Sem prop drilling entre
            seções irmãs. */}
        <CalculadoraProvider>
          <CTA />
          <Calculadora />
          <TotalEstimado />
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
