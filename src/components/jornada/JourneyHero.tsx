import { SolicitarDemoButton } from "@/components/demo-modal";

export function JourneyHero() {
  return (
    <header className="hero" data-reveal-group="">
      <p className="kicker reveal">Lançamentos Nuki</p>
      <h1 className="reveal">
        A jornada, <em>do custo à entrega.</em>
      </h1>
      <p className="reveal">Planner, Personaliza e Inspetor — role para descer.</p>
      <SolicitarDemoButton className="mt-8 inline-flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
        Solicitar demo
      </SolicitarDemoButton>
      <div className="scrolldot reveal" aria-hidden="true">
        ↓
      </div>
    </header>
  );
}
