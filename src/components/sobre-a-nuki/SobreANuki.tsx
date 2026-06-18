import Link from "next/link";

export function SobreANuki() {
  return (
    <section className="relative w-full overflow-hidden bg-nuki-preto h-auto">
      <img
        src="/sobre-a-nuki/decoracao-simbolo-pearl.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-42 w-[620px] translate-y-1/4 max-lg:hidden"
      />
      <img
        src="/sobre-a-nuki/nuki_quadradinho_pearl 5.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-24 top-220 w-[200px] -translate-y-1/2 blur-[3px] max-lg:hidden"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-16 pb-24 sm:px-8 sm:pt-20 sm:pb-28 md:px-12 md:pt-24 md:pb-32 lg:px-16 lg:pt-32 lg:pb-[400px] xl:px-27 xl:pt-40 xl:pb-120">
        <div className="mx-auto flex w-full flex-col items-start gap-10 lg:w-254 lg:flex-row lg:justify-center lg:gap-8">
          <div className="flex flex-1 flex-col items-start">
            <h2 className="w-full text-[28px] leading-8 tracking-[0.1px] text-nuki-branco sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-13.5">
              <span className="font-normal">Sobre a </span>
              <span className="font-bold">Nuki</span>
            </h2>
          </div>

          <div className="flex flex-1 flex-col items-start gap-10">
            <div className="flex w-full flex-col gap-9 text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-branco sm:text-[17px] md:text-[18px] lg:text-[19px] lg:leading-9 xl:text-[20px]">
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

            <Link
              href="/conheca-nossa-historia"
              className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-preto"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
