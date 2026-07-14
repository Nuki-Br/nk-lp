import { SolicitarDemoButton } from "@/components/demo-modal";

export function JourneyOutro() {
  return (
    <section className="outro" data-reveal-group="">
      <h2 className="reveal max-w-[800px]">
        Pronto para tirar a personalização da <em>planilha?</em>
      </h2>
      <p className="reveal max-w-[52ch] text-[16px] leading-7 tracking-[0.2px] text-nuki-cinza sm:text-[18px]">
        Veja a Nuki rodando com os seus empreendimentos, do <b>custo à entrega</b>.
      </p>
      <SolicitarDemoButton className="inline-flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
        Solicitar demo
      </SolicitarDemoButton>
    </section>
  );
}
