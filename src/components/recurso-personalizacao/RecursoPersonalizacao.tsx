import Image from "next/image";

export function RecursoPersonalizacao() {
  return (
    <section className="w-full bg-nuki-branco">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-16 px-[108px] py-[88px]">
        <div className="relative h-[470px] flex-1">
          <Image
            src="/recurso-personalizacao/cozinha-jantar.png"
            alt="Cozinha personalizável"
            fill
            sizes="(max-width: 1440px) 50vw, 700px"
            className="object-contain object-left"
            priority={false}
          />

          <div className="absolute left-1/2 top-3 -translate-x-1/2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-nuki-preto px-5 py-3 text-[14px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              <span aria-hidden>≡</span>
              Opções de plantas
              <ChevronRightIcon className="size-4" />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 flex w-[250px] flex-col gap-3 rounded-2xl bg-nuki-branco p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <div className="flex items-start gap-3">
              <div className="size-14 shrink-0 rounded-lg bg-nuki-cinza-claro" aria-hidden />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <p className="text-[14px] font-bold text-nuki-preto">Planta 01</p>
                  <span aria-hidden className="text-[10px] text-nuki-verde-02">●</span>
                </div>
                <p className="text-[10px] leading-tight text-nuki-cinza">
                  3 quartos sendo 1 suíte, Cozinha americana; Sala ampliada;
                  Varanda integrada à sala de estar; banheiro master ampliado
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 self-start text-[10px] font-bold text-nuki-verde-02"
            >
              Ver menos
              <ChevronUpIcon className="size-3" />
            </button>
          </div>
        </div>

        <div className="flex w-[376px] shrink-0 flex-col items-start justify-center gap-10">
          <div className="flex w-full flex-col items-start gap-8 tracking-[0.1px]">
            <div className="flex w-full flex-col items-start gap-2 font-extrabold">
              <p className="text-[16px] leading-6 text-nuki-verde-08">RECURSO</p>
              <h2 className="text-[48px] leading-[54px] text-nuki-preto">
                Personalização
              </h2>
            </div>
            <p className="text-[20px] font-normal leading-9 text-nuki-preto">
              Com o recurso de personalização da Nuki, seu cliente customiza o
              imóvel de forma simples e com total liberdade de escolha, além de
              contar com condições de pagamento sob medida para uma experiência
              ainda mais personalizada.
            </p>
          </div>
          <a
            href="#saiba-mais"
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M7.5 5.59C7.18 5.92 7.18 6.44 7.5 6.77L10.73 10L7.5 13.23C7.18 13.56 7.18 14.08 7.5 14.41C7.83 14.73 8.35 14.73 8.68 14.41L12.5 10.58C12.83 10.26 12.83 9.73 12.5 9.41L8.68 5.58C8.36 5.27 7.83 5.27 7.5 5.59Z" />
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
