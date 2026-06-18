import Image from "next/image";
import Link from "next/link";

const statusItems = [
  { label: "Finalizado", percent: "30%", count: "123", color: "bg-nuki-verde-03" },
  { label: "Esperando validação", percent: "11%", count: "40", color: "bg-nuki-verde-02" },
  { label: "Em aberto", percent: "12%", count: "20", color: "bg-[#7fcfcf]" },
  { label: "Não acessou", percent: "47%", count: "15", color: "bg-[#c5eaea]" },
];

export function RecursoControleAnalise() {
  return (
    <section className="w-full bg-nuki-branco">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col-reverse gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20 lg:pl-16 lg:pr-0 xl:py-[88px] xl:pl-[108px] xl:pr-0">
        <div className="flex w-full flex-col items-start justify-center gap-8 lg:h-[522px] lg:w-[468px] lg:shrink-0 lg:justify-center lg:gap-10">
          <div className="flex w-full flex-col gap-8 tracking-[0.1px]">
            <div className="flex w-full flex-col gap-3">
              <p className="text-[16px] font-extrabold leading-6 text-nuki-verde-08">
                RECURSO
              </p>
              <h2 className="text-[28px] font-extrabold leading-8 text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px]">
                Controle e análise
              </h2>
            </div>
            <p className="text-[16px] leading-7 text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Nuki oferece um dashboard completo para acompanhar a jornada de
              personalização do cliente. Com visibilidade total das escolhas,
              contratos, você garante uma gestão eficiente e organizada em cada
              etapa.
            </p>
          </div>
          <Link
            href="/recursos/controle-analise"
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Saiba mais
          </Link>
        </div>

        <div className="relative aspect-[700/520] w-full lg:h-[520px] lg:flex-1 lg:aspect-auto">
          <Image
            src="/recurso-controle-analise/ambiente-banheiro.png"
            alt="Ambiente personalizável com análise de dados"
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 50vw, 700px"
            className="object-contain object-right"
          />

          <div className="absolute right-4 top-4 flex w-[190px] flex-col gap-3 rounded-2xl bg-nuki-branco p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] max-lg:hidden md:w-[210px] lg:w-[230px]">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-bold text-nuki-preto">Vale Verde</p>
              <div className="relative h-7 w-12 shrink-0">
                <Image
                  src="/recursos-controle-analise/jml.png"
                  alt="JML"
                  fill
                  sizes="48px"
                  className="object-contain object-right"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[11px]">
              <FieldRow label="Tipo:" />
              <FieldRow label="Lançamento:" />
              <FieldRow label="Início obras:" />
            </div>
            <div className="flex items-center justify-between rounded-full bg-nuki-cinza-claro px-3 py-1.5">
              <span className="text-[10px] text-nuki-cinza">
                Período de personalização finalizado
              </span>
              <span
                aria-hidden
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-nuki-verde-02 text-nuki-branco"
              >
                <ChevronRightIcon className="size-3" />
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 w-60 max-lg:hidden lg:w-72.5">
            <div
              role="presentation"
              aria-hidden
              className="absolute -top-5 -right-22 flex items-center gap-1 rounded-full bg-nuki-verde-02 px-4 py-2 text-[12px] font-bold text-nuki-branco whitespace-nowrap max-md:hidden"
            >
              <span>+</span>
              Adicionar empreendimento
            </div>

            <div className="flex w-full gap-4 rounded-2xl bg-nuki-branco p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <div className="relative size-20 shrink-0">
                <Image
                  src="/recurso-controle-analise/grafico-pizza.png"
                  alt="Gráfico de status dos clientes"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <p className="text-[11px] font-bold text-nuki-preto">
                  Status dos clientes
                </p>
                <p className="text-[8px] text-nuki-cinza">
                  Divisão dos clientes por status
                </p>
                <ul className="flex flex-col gap-0.5">
                  {statusItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between text-[8px]"
                    >
                      <span className="flex items-center gap-1 text-nuki-preto">
                        <span
                          aria-hidden
                          className={`size-1.5 rounded-full ${item.color}`}
                        />
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2 text-nuki-cinza">
                        <span>{item.percent}</span>
                        <span>{item.count}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function FieldRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-nuki-cinza">{label}</span>
      <span className="h-1 flex-1 rounded-full bg-nuki-cinza-divisor" aria-hidden />
    </div>
  );
}
