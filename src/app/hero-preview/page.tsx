import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import { HeroCategoria } from "@/components/hero/variants/HeroCategoria";
import { HeroDor } from "@/components/hero/variants/HeroDor";
import { HeroJornada } from "@/components/hero/variants/HeroJornada";

export const metadata: Metadata = {
  title: "Nuki — Preview de heros",
  robots: { index: false, follow: false },
};

const versions = [
  {
    id: "v1",
    label: "Versão 1 — Categoria explícita",
    hint: "Diz de cara o que a Nuki é e para quem. Reaproveita o render imersivo.",
    Component: HeroCategoria,
  },
  {
    id: "v2",
    label: "Versão 2 — Dor / problema",
    hint: "Ataca a dor do processo espalhado em arquivos. Visual caos → ordem.",
    Component: HeroDor,
  },
  {
    id: "v3",
    label: "Versão 3 — Resultado / jornada",
    hint: "Transformação ponta a ponta. Visual de timeline de 3 passos.",
    Component: HeroJornada,
  },
] as const;

export default function HeroPreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <main className="flex flex-1 flex-col">
        {versions.map(({ id, label, hint, Component }) => (
          <div key={id}>
            <div className="sticky top-0 z-40 flex flex-col gap-0.5 border-y border-nuki-cinza-borda bg-nuki-preto px-6 py-3 md:px-12">
              <p className="text-[14px] font-bold text-nuki-branco">{label}</p>
              <p className="text-[12px] text-nuki-cinza-7">{hint}</p>
            </div>
            <Component />
          </div>
        ))}
      </main>
    </div>
  );
}
