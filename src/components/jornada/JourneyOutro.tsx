import { SolicitarDemoButton } from "@/components/demo-modal";

export function JourneyOutro() {
  return (
    <section className="outro" data-reveal-group="">
      <h2 className="reveal">
        Do custo <em>à entrega.</em>
      </h2>
      <SolicitarDemoButton className="inline-flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
        Solicitar demo
      </SolicitarDemoButton>
    </section>
  );
}
