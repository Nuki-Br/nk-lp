import { JourneyModule, journeyModules } from "@/components/jornada";

/**
 * Renderiza os 3 módulos (Planner, Personaliza, Inspetor) reusando o
 * JourneyModule da home. Cada módulo já é uma seção com id (#planner,
 * #personaliza, #inspetor) e vira uma "parte" da apresentação — o progress
 * nav do /comercial ancora direto nesses ids.
 */
export function Modulos() {
  return (
    <>
      {journeyModules.map((data) => (
        <JourneyModule key={data.id} data={data} />
      ))}
    </>
  );
}
