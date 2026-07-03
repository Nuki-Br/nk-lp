import Link from "next/link";

export function Capa() {
  return (
    <section className="cm-section capa" id="capa" data-tone="dark" data-reveal-group="">
      <Link href="/" className="cm-back" aria-label="Voltar para a home">
        <ChevronLeftIcon className="cm-back-icon" />
      </Link>
      <div className="cm-wrap">
        <p className="kicker reveal">Apresentação comercial · 2026</p>
        <h1 className="reveal">
          Agora, a jornada completa —{" "}
          <em>do custo à entrega.</em>
        </h1>
        <p className="lead reveal">
          A Nuki organiza, profissionaliza e centraliza o ciclo completo de personalização de acabamentos —
          do planejamento de custo do memorial à validação em obra.
        </p>
        <div className="meta reveal">
          <span>Planner</span>
          <span>·</span>
          <span>Personaliza</span>
          <span>·</span>
          <span>Inspetor</span>
        </div>
      </div>
    </section>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.5 14.41C12.82 14.08 12.82 13.56 12.5 13.23L9.27 10L12.5 6.77C12.82 6.44 12.82 5.92 12.5 5.59C12.17 5.27 11.65 5.27 11.32 5.59L7.5 9.42C7.17 9.74 7.17 10.26 7.5 10.58L11.32 14.41C11.65 14.73 12.17 14.73 12.5 14.41Z" />
    </svg>
  );
}
