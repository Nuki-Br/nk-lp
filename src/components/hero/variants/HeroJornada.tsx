import { SolicitarDemoButton } from "@/components/demo-modal";

/**
 * V3 — Resultado / jornada.
 * Foco na transformação ponta a ponta. Visual: timeline de 3 passos, com os
 * nomes dos módulos como labels de apoio. Só CSS + SVG inline (sem assets).
 */

const steps = [
  {
    n: "01",
    module: "Planner",
    title: "Planejar custo",
    desc: "Monte o memorial e forme o preço dentro da plataforma.",
  },
  {
    n: "02",
    module: "Personaliza",
    title: "Cliente escolhe",
    desc: "O comprador seleciona acabamentos vendo o impacto na unidade.",
  },
  {
    n: "03",
    module: "Inspetor",
    title: "Conferir na obra",
    desc: "A entrega é validada com conformidade auditável, item a item.",
  },
] as const;

export function HeroJornada() {
  return (
    <section className="w-full bg-nuki-cinza-claro">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-10 px-6 py-16 text-center sm:px-8 md:px-12 md:py-20 xl:py-24">
        <div className="flex max-w-[760px] flex-col items-center gap-6">
          <span className="rounded-full bg-nuki-verde-suave px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.6px] text-nuki-verde-02">
            Da formação de custo à entrega
          </span>
          <h1 className="text-[36px] font-extrabold leading-[44px] tracking-[0.1px] text-nuki-preto sm:text-[44px] sm:leading-[52px] md:text-[54px] md:leading-[60px] xl:text-[60px] xl:leading-[64px]">
            Do memorial de incorporação à vistoria de entrega, num só fluxo.
          </h1>
          <p className="max-w-[620px] text-[16px] leading-7 tracking-[0.2px] text-nuki-cinza sm:text-[17px] md:text-[19px] xl:text-[20px] xl:leading-9">
            Planeje o custo, deixe o cliente escolher vendo o impacto e entregue
            com conformidade auditável. Uma plataforma para as três fases da
            personalização.
          </p>
          <SolicitarDemoButton className="mt-1 flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
            Solicitar demo
          </SolicitarDemoButton>
        </div>

        {/* Timeline de 3 passos */}
        <ol className="relative grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-3 md:gap-4">
          {/* linha conectora (desktop) */}
          <div
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[40px] hidden h-0.5 bg-nuki-cinza-borda md:block"
            aria-hidden
          />
          {steps.map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col items-center gap-3 rounded-3xl bg-nuki-branco px-5 py-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              <span className="relative z-10 grid size-12 place-items-center rounded-full bg-nuki-verde-02 text-[16px] font-extrabold text-nuki-branco">
                {step.n}
              </span>
              <span className="rounded-full bg-nuki-verde-suave px-3 py-1 text-[12px] font-bold uppercase tracking-[0.6px] text-nuki-verde-02">
                {step.module}
              </span>
              <p className="text-[18px] font-bold text-nuki-preto">{step.title}</p>
              <p className="max-w-[240px] text-[14px] leading-6 text-nuki-cinza">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
