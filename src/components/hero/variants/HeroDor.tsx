import { SolicitarDemoButton } from "@/components/demo-modal";

/**
 * V2 — Dor / problema.
 * Ataca a dor do processo espalhado em arquivos e contrasta com o fluxo único
 * da Nuki. Visual "caos → ordem" montado só com CSS + SVG inline (sem assets).
 */

function FileChip({
  label,
  tone,
  className,
}: {
  label: string;
  tone: "planilha" | "email" | "pdf" | "doc";
  className?: string;
}) {
  const dot = {
    planilha: "bg-nuki-status-verde",
    email: "bg-nuki-status-roxo",
    pdf: "bg-nuki-status-vermelho",
    doc: "bg-nuki-status-laranja",
  }[tone];

  return (
    <div
      className={`${className ?? ""} flex items-center gap-2 rounded-xl border border-nuki-cinza-borda bg-nuki-branco px-3 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.10)]`}
    >
      <span className={`size-6 shrink-0 rounded-md ${dot}`} aria-hidden />
      <span className="truncate text-[13px] font-semibold text-nuki-cinza-medio line-through decoration-nuki-cinza-7/60">
        {label}
      </span>
    </div>
  );
}

export function HeroDor() {
  return (
    <section className="w-full bg-nuki-cinza-claro">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-16 lg:py-20 xl:pl-[108px] xl:pr-[99px] xl:py-[88px]">
        <div className="flex w-full flex-col items-start justify-center gap-6 lg:w-[452px] lg:shrink-0">
          <span className="rounded-full bg-nuki-laranja-suave px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.6px] text-nuki-laranja">
            Chega de planilha, e-mail e PDF
          </span>
          <h1 className="text-[36px] font-extrabold leading-[44px] tracking-[0.1px] text-nuki-preto sm:text-[44px] sm:leading-[52px] md:text-[52px] md:leading-[58px] lg:text-[54px] lg:leading-[58px] xl:text-[58px] xl:leading-[62px]">
            A personalização das suas unidades ainda vive espalhada em arquivos.
          </h1>
          <p className="text-[16px] leading-7 tracking-[0.2px] text-nuki-cinza sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            Escolhas do cliente em planilha, aditivos manuais, conferência de
            obra no olho. A Nuki troca o vai-e-volta manual por um fluxo único,
            rastreável e auditável.
          </p>
          <SolicitarDemoButton className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
            Solicitar demo
          </SolicitarDemoButton>
        </div>

        {/* Visual: caos (arquivos soltos) → ordem (card Nuki único) */}
        <div className="relative w-full lg:h-[520px] lg:w-[560px] lg:shrink-0">
          {/* Antes — pilha bagunçada de arquivos */}
          <div className="relative mx-auto flex max-w-[420px] flex-col gap-3 lg:mx-0">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-[1px] text-nuki-cinza-7">
              Antes
            </p>
            <FileChip label="Memorial_v2_final.xlsx" tone="planilha" className="rotate-[-2deg]" />
            <FileChip label="RE: custos revisados (3)" tone="email" className="ml-6 rotate-[1.5deg]" />
            <FileChip label="aditivo_unidade_1204.doc" tone="doc" className="rotate-[-1deg]" />
            <FileChip label="conferencia_obra.pdf" tone="pdf" className="ml-8 rotate-[2deg]" />
            <FileChip label="planilha_precos_FINAL2.xlsx" tone="planilha" className="ml-2 rotate-[-1.5deg]" />
          </div>

          {/* Seta de transformação */}
          <div className="my-6 flex items-center justify-center gap-2 text-nuki-verde-02 lg:absolute lg:right-[236px] lg:top-1/2 lg:my-0 lg:-translate-y-1/2 lg:flex-col">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className="lg:rotate-0 -rotate-90">
              <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Depois — card Nuki único */}
          <div className="mx-auto max-w-[300px] lg:mx-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[1px] text-nuki-verde-02">
              Com a Nuki
            </p>
            <div className="flex flex-col gap-3 rounded-3xl bg-nuki-verde-03 p-5 shadow-[0_25px_40px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-nuki-verde-02">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12.5l4 4 10-10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[15px] font-bold text-nuki-branco">Empreendimento Aurora</p>
              </div>
              <div className="h-px w-full bg-white/15" />
              {["Custos do memorial", "Escolhas do cliente", "Aditivos formalizados", "Conferência de obra"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
                      <path d="M5 12.5l4 4 10-10" stroke="#e6fafa" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px] font-medium text-nuki-verde-suave">{item}</span>
                  </div>
                )
              )}
              <div className="mt-1 h-px w-full bg-white/15" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.8px] text-white/60">
                Um só fluxo · rastreável · auditável
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
