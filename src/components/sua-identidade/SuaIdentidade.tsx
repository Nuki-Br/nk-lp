import { SolicitarDemoButton } from "@/components/demo-modal";

export function SuaIdentidade() {
  return (
    <section className="w-full bg-nuki-verde-08">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[108px] py-12 sm:py-14 md:py-16 lg:py-20 xl:py-[88px]">
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <h2 className="text-[28px] leading-8 sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px] tracking-[0.1px] text-nuki-branco">
            <span className="font-normal">Sua </span>
            <span className="font-extrabold">identidade</span>
          </h2>

          <div className="flex w-full lg:w-[496px] lg:shrink-0 flex-col items-start gap-10">
            <p className="text-[16px] leading-7 sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9 font-normal tracking-[0.1px] text-nuki-branco">
              A Nuki é uma plataforma white label, que se adapta totalmente à
              sua marca e identidade visual, oferecendo um sistema personalizado
              para entregar uma experiência alinhada ao seu negócio.
            </p>

            <SolicitarDemoButton
              className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-verde-08"
            >
              Solicitar demo
            </SolicitarDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
