import Image from "next/image";
import Link from "next/link";

export function RecursoPersonalizacao() {
  return (
    <section className="w-full bg-nuki-branco">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20 lg:pl-0 lg:pr-16 xl:py-[88px] xl:pl-0 xl:pr-[108px]">
        <div className="relative aspect-[700/470] w-full lg:h-[470px] lg:flex-1 lg:aspect-auto">
          <Image
            src="/recurso-personalizacao/cozinha-jantar.png"
            alt="Cozinha personalizável"
            fill
            sizes="(max-width: 1440px) 50vw, 700px"
            className="object-contain object-left"
            priority
          />

          <div className="absolute left-1/2 top-3 -translate-x-1/2">
            <div
              role="presentation"
              className="flex items-center gap-2 rounded-full bg-nuki-preto px-5 py-3 text-[14px] font-semibold text-nuki-branco whitespace-nowrap"
            >
              <span aria-hidden>≡</span>
              Opções de plantas
              <HelpIcon className="size-4" />
            </div>
          </div>

          <div className="absolute bottom-4 right-24 flex w-[200px] flex-col gap-3 rounded-2xl bg-nuki-branco p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:w-[230px] lg:w-[250px]">
            <div className="flex items-start gap-3">
              <div className="relative size-18 shrink-0 overflow-hidden rounded-lg bg-nuki-cinza-claro">
                <Image
                  src="/recursos-personalizacao/planta-baixa-lp.png"
                  alt="Planta baixa do imóvel"
                  fill
                  sizes="62px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <p className="text-[12px] font-bold text-nuki-preto lg:text-[14px]">Planta 01</p>
                  <span aria-hidden className="text-[10px] text-nuki-verde-02">●</span>
                </div>
                <p className="text-[9px] leading-tight text-nuki-cinza lg:text-[10px]">
                  3 quartos sendo 1 suíte; Cozinha americana; Sala ampliada;
                  Varanda integrada a sala de estar; banheiro máster ampliado
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 self-start text-[9px] font-bold text-nuki-verde-02 lg:text-[10px]"
            >
              Ver menos
              <ChevronUpIcon className="size-3" />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-8 lg:w-[376px] lg:shrink-0 lg:gap-10">
          <div className="flex w-full flex-col items-start gap-8 tracking-[0.1px]">
            <div className="flex w-full flex-col items-start gap-2 font-extrabold">
              <p className="text-[16px] leading-6 text-nuki-verde-08">RECURSO</p>
              <h2 className="text-[22px] text-nuki-preto sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] xl:leading-9">
                Personalização
              </h2>
            </div>
            <p className="text-[16px] font-normal leading-7 text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Com o recurso de personalização da Nuki, seu cliente customiza o
              imóvel de forma simples e com total liberdade de escolha, além de
              contar com condições de pagamento sob medida para uma experiência
              ainda mais personalizada.
            </p>
          </div>
          <Link
            href="/recursos/personalizacao"
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </section>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.6" />
      <path d="M6.2 6.1c0-1 0.8-1.8 1.8-1.8s1.8 0.8 1.8 1.8c0 0.6-0.3 1.05-0.8 1.4-0.55 0.4-1 0.7-1 1.4" />
      <circle cx="8" cy="11.3" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14.41 12.5C14.08 12.82 13.56 12.82 13.23 12.5L10 9.27L6.77 12.5C6.44 12.82 5.92 12.82 5.59 12.5C5.27 12.17 5.27 11.65 5.59 11.32L9.41 7.5C9.74 7.17 10.26 7.17 10.58 7.5L14.41 11.32C14.73 11.65 14.73 12.17 14.41 12.5Z" />
    </svg>
  );
}
