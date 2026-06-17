import Image from "next/image";

export function NukiLab() {
  return (
    <section className="relative w-full overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/nuki-lab/cozinha-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[120px]">
        <div className="flex w-[440px] max-w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-[28px] leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px]">
              <span className="font-normal">Nuki</span>
              <span className="font-extrabold"> Lab</span>
            </h2>
            <p className="text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-[36px]">
              Ofereça aos seus clientes a oportunidade de personalizar seu
              próprio espaço em minutos, criando uma experiência sob medida que
              encante a todos.
            </p>
          </div>
          <a
            href="#saiba-mais"
            className="rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  );
}
