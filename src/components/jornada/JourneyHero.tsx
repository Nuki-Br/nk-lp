export function JourneyHero() {
  return (
    <header className="hero" data-reveal-group="">
      <p className="kicker reveal">O problema</p>
      <h1 className="reveal">
        Hoje, a personalização vive espalhada em{" "}
        <em>planilhas, e-mails e PDFs.</em>
      </h1>
      <p className="reveal max-w-[600px]">
        Três áreas, três verdades diferentes: meses no orçamento, retrabalho
        entre pós-venda, engenharia e obra, e risco jurídico nos aditivos. <b>A Nuki
        junta tudo numa jornada só</b>  — role para ver.
      </p>
      <a className="scrolldot reveal" href="#planner" aria-label="Ir para a Jornada">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15.875 9.00002L11.995 12.88L8.11501 9.00002C7.72501 8.61002 7.09501 8.61002 6.70501 9.00002C6.31501 9.39002 6.31501 10.02 6.70501 10.41L11.295 15C11.685 15.39 12.315 15.39 12.705 15L17.295 10.41C17.685 10.02 17.685 9.39002 17.295 9.00002C16.905 8.62002 16.265 8.61002 15.875 9.00002Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </header>
  );
}
