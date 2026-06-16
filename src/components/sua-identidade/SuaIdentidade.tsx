export function SuaIdentidade() {
  return (
    <section className="w-full bg-nuki-verde-08">
      <div className="mx-auto max-w-[1440px] px-[108px] py-[88px]">
        <div className="flex w-full items-start justify-between gap-16">
          <h2 className="shrink-0 whitespace-nowrap text-[48px] leading-[54px] tracking-[0.1px] text-nuki-branco">
            <span className="font-normal">Sua </span>
            <span className="font-extrabold">identidade</span>
          </h2>

          <div className="flex w-[496px] shrink-0 flex-col items-start gap-10">
            <p className="text-[20px] font-normal leading-9 tracking-[0.1px] text-nuki-branco">
              A Nuki é uma plataforma white label, que se adapta totalmente à
              sua marca e identidade visual, oferecendo um sistema personalizado
              para entregar uma experiência alinhada ao seu negócio.
            </p>

            <a
              href="#demo"
              className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-verde-08"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
