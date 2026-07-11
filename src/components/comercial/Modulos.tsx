import { Fragment } from "react";
import { ModuloSlide } from "./ModuloSlide";
import { ModuloDemoSlide } from "./ModuloDemoSlide";
import { modulos } from "./modulos.data";

/**
 * Renderiza os 3 módulos (Planner, Personaliza, Inspetor) como slides estáticos
 * no padrão da apresentação comercial. Cada módulo pode emitir até DOIS slides:
 *   1. Descritivo (`#planner`, `#personaliza`, `#inspetor`) — sempre presente
 *   2. Demo interativa (`#planner-demo`, etc) — emitido só se `data.demoUrl` existe
 *
 * O progress-nav lateral só ancora nos ids "topic" (comercialNav intacto).
 * Os slides de demo passam despercebidos pelo observer da nav mas são navegáveis
 * via setas ← → globais (o ComercialScripts deriva a lista walkable do DOM).
 *
 * Home continua com JourneyModule intocado — a linguagem scrollytelling fica lá.
 */
export function Modulos() {
  return (
    <>
      {modulos.map((data) => (
        <Fragment key={data.id}>
          <ModuloSlide data={data} />
          {data.demoUrl && <ModuloDemoSlide data={data} />}
        </Fragment>
      ))}
    </>
  );
}
