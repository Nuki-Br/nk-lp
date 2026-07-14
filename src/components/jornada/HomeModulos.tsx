import { Fragment } from "react";
import { ModuloSlide } from "@/components/comercial/ModuloSlide";
import { modulos } from "@/components/comercial/modulos.data";

/**
 * Renderiza os 3 módulos (Planner · Personaliza · Inspetor) na home usando o
 * mesmo `ModuloSlide` do /comercial (2-col, chip verde, H2 misto, bgnum, pearl,
 * CTA editorial).
 *
 * Na home pública as demos interativas NÃO são expostas: passamos `hideDemoCta`
 * pra ocultar os botões "Explorar o …". As demos ficam disponíveis apenas no
 * /comercial (protegido por senha). Módulos sem `demoUrl` (ex: Personaliza)
 * seguem mostrando "Saiba mais →".
 */
export function HomeModulos() {
  return (
    <>
      {modulos.map((data, index) => (
        <Fragment key={data.id}>
          <ModuloSlide data={data} index={index} hideDemoCta />
        </Fragment>
      ))}
    </>
  );
}
