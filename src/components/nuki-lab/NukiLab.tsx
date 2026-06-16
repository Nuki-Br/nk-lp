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

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-[108px] py-[120px]">
        <div className="flex w-[440px] max-w-full flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-[48px] leading-[54px] tracking-[0.1px] text-nuki-preto">
              <span className="font-normal">Nuki</span>
              <span className="font-extrabold"> Lab</span>
            </h2>
            <p className="text-[20px] font-normal leading-[36px] tracking-[0.1px] text-nuki-preto">
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
