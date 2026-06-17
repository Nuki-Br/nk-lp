import Image from "next/image";
import { SolicitarDemoButton } from "@/components/demo-modal";

const cards = [
  {
    number: "01",
    title: "Personalize",
    description: "Personalize seu imóvel com praticidade.",
  },
  {
    number: "02",
    title: "Escolha os acabamentos",
    description: "Selecione as opções visualizando prévias de cada ambiente.",
  },
  {
    number: "03",
    title: "Faça uma simulação",
    description: "Simule suas preferências e orçamentos.",
  },
];

export function NavegandoNaPlataforma() {
  return (
    <section className="relative w-full overflow-hidden bg-nuki-branco">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/navegando-na-plataforma/bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50 blur-[4px]"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-12 sm:gap-14 sm:px-8 sm:py-14 md:gap-16 md:px-12 md:py-16 lg:gap-20 lg:px-16 lg:py-20 xl:gap-24 xl:px-[108px] xl:py-[88px]">
        <h2 className="text-center text-[28px] leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px]">
          <span className="font-extrabold">Navegando</span>
          <span className="font-normal"> na plataforma</span>
        </h2>

        <div className="flex w-full flex-col items-center gap-16">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
            {cards.map((card) => (
              <Card key={card.number} {...card} />
            ))}
          </div>

          <SolicitarDemoButton
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Solicitar demo
          </SolicitarDemoButton>
        </div>
      </div>
    </section>
  );
}

function Card({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[260px] flex-1 flex-col justify-between rounded-3xl bg-nuki-branco p-6 md:min-h-[300px] lg:h-[348px]">
      <div className="flex w-full items-center justify-between">
        <span className="text-[22px] font-extrabold tracking-[0.1px] text-nuki-preto sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] xl:leading-9">
          {number}
        </span>
        <ZoomOutMapIcon className="size-8 text-nuki-preto" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-[22px] font-extrabold tracking-[0.1px] text-nuki-preto sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] xl:leading-9">
          {title}
        </h3>
        <p className="text-[16px] leading-7 tracking-[0.1px] text-nuki-cinza sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
          {description}
        </p>
      </div>
    </div>
  );
}

function ZoomOutMapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20 4h4a4 4 0 014 4v4h-2.667V8A1.333 1.333 0 0024 6.667h-4V4zM12 4v2.667H8A1.333 1.333 0 006.667 8v4H4V8a4 4 0 014-4h4zm16 16v4a4 4 0 01-4 4h-4v-2.667h4A1.333 1.333 0 0025.333 24v-4H28zM6.667 20v4A1.333 1.333 0 008 25.333h4V28H8a4 4 0 01-4-4v-4h2.667z" />
    </svg>
  );
}
