"use client";

import { Fragment, useState } from "react";
import { ModuloSlide } from "@/components/comercial/ModuloSlide";
import { ModuloDemoModal } from "@/components/comercial/ModuloDemoModal";
import { modulos } from "@/components/comercial/modulos.data";

/**
 * Renderiza os 3 módulos (Planner · Personaliza · Inspetor) na home usando o
 * mesmo `ModuloSlide` do /comercial (2-col, chip verde, H2 misto, bgnum, pearl,
 * CTA editorial). Diferença chave em relação ao /comercial: a demo interativa
 * NÃO é renderizada por padrão como slide adjacente. Só aparece se o user
 * clicar em "▷ Explorar" — abre um modal fullscreen (`ModuloDemoModal`) sobre
 * a home.
 *
 * Módulos sem `demoUrl` (ex: Personaliza hoje) renderizam "Saiba mais →" no
 * lugar do CTA de explorar — comportamento default do `ModuloSlide`.
 */
export function HomeModulos() {
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null);
  const activeDemo = activeDemoId
    ? modulos.find((m) => m.id === activeDemoId) ?? null
    : null;

  return (
    <>
      {modulos.map((data, index) => (
        <Fragment key={data.id}>
          <ModuloSlide
            data={data}
            index={index}
            onOpenDemo={
              data.demoUrl ? () => setActiveDemoId(data.id) : undefined
            }
          />
        </Fragment>
      ))}
      {activeDemo && (
        <ModuloDemoModal
          data={activeDemo}
          onClose={() => setActiveDemoId(null)}
        />
      )}
    </>
  );
}
