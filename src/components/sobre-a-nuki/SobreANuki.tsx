export function SobreANuki() {
  return (
    <section className="relative w-full overflow-hidden bg-nuki-preto h-auto">
      <img
        src="/sobre-a-nuki/decoracao-simbolo-pearl.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-42 w-[620px] translate-y-1/4"
      />
      <img
        src="/sobre-a-nuki/nuki_quadradinho_pearl 5.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-24 top-220 w-[200px] -translate-y-1/2 blur-[3px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-[108px] py-[300px]">
        <div className="mx-auto flex w-[1016px] max-w-full items-start justify-center gap-8">
          <div className="flex flex-1 flex-col items-start">
            <h2 className="w-full text-[48px] leading-[54px] tracking-[0.1px] text-nuki-branco">
              <span className="font-normal">Sobre a </span>
              <span className="font-bold">Nuki</span>
            </h2>
          </div>

          <div className="flex flex-1 flex-col items-start gap-10">
            <div className="flex w-full flex-col gap-9 text-[20px] font-normal leading-9 tracking-[0.1px] text-nuki-branco">
              <p>
                A Nuki é uma startup inovadora dedicada a transformar a forma
                como clientes personalizam seus apartamentos.
              </p>
              <p>
                Nosso foco é fornecer uma plataforma intuitiva, prática e
                segura, onde cada detalhe do imóvel é ajustado ao estilo e
                preferência do cliente, sem complicações.
              </p>
            </div>

            <a
              href="#saiba-mais"
              className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-preto"
            >
              Saiba mais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
