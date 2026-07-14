import { SolicitarDemoButton } from "@/components/demo-modal";
import { HeroRender } from "../parts";

/**
 * V1 — Categoria explícita.
 * Diz de cara o que a Nuki é e para quem, reaproveitando o render imersivo.
 */
export function HeroCategoria() {
  return (
    <section className="w-full bg-nuki-cinza-claro">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-16 lg:py-20 xl:pl-[108px] xl:pr-[99px] xl:py-[88px]">
        <div className="flex w-full flex-col items-start justify-center gap-6 lg:w-[452px] lg:shrink-0">
          <span className="rounded-full bg-nuki-verde-suave px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.6px] text-nuki-verde-02">
            Software para construtoras e incorporadoras
          </span>
          <h1 className="text-[36px] font-extrabold leading-[44px] tracking-[0.1px] text-nuki-preto sm:text-[44px] sm:leading-[52px] md:text-[52px] md:leading-[58px] lg:text-[54px] lg:leading-[58px] xl:text-[58px] xl:leading-[62px]">
            A personalização de acabamentos das suas unidades, sob controle.
          </h1>
          <p className="text-[16px] leading-7 tracking-[0.2px] text-nuki-cinza sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            A Nuki centraliza o processo inteiro — do planejamento de custo do
            memorial à entrega em obra. Sem planilha solta, e-mail perdido ou
            retrabalho entre pós-venda, engenharia e compras.
          </p>
          <SolicitarDemoButton className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
            Solicitar demo
          </SolicitarDemoButton>
        </div>

        <HeroRender />
      </div>
    </section>
  );
}
