import { SolicitarDemoButton } from "@/components/demo-modal";
import { HeroRender } from "./parts";

export function Hero() {
  return (
    <section className="w-full bg-nuki-cinza-claro">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-16 lg:py-20 xl:pl-[108px] xl:pr-[99px] xl:py-[88px]">
        <div className="flex w-full flex-col items-start justify-center gap-8 lg:w-[416px] lg:shrink-0">
          <h1 className="text-[36px] font-extrabold leading-[44px] tracking-[0.1px] text-nuki-preto sm:text-[44px] sm:leading-[52px] md:text-[52px] md:leading-[60px] lg:text-[60px] lg:leading-[60px] xl:text-[64px] xl:leading-[64px]">
            Planeje, personalize e entregue.
          </h1>
          <p className="text-[16px] leading-7 tracking-[0.2px] text-nuki-cinza sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            Do memorial à vistoria, num só fluxo. A construtora monta o catálogo
            no Planner, o cliente escolhe vendo o impacto no Personaliza, e a
            obra entrega com conformidade auditável pelo Inspetor.
          </p>
          <SolicitarDemoButton
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Solicitar demo
          </SolicitarDemoButton>
        </div>

        <HeroRender />
      </div>
    </section>
  );
}
