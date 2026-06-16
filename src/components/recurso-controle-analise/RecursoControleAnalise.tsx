import Image from "next/image";

const statusItems = [
  { label: "Finalizado", percent: "30%", count: "123", color: "bg-nuki-verde-03" },
  { label: "Esperando validação", percent: "11%", count: "40", color: "bg-nuki-verde-02" },
  { label: "Em aberto", percent: "12%", count: "20", color: "bg-[#7fcfcf]" },
  { label: "Não acessou", percent: "47%", count: "15", color: "bg-[#c5eaea]" },
];

export function RecursoControleAnalise() {
  return (
    <section className="w-full bg-nuki-branco">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-16 px-[108px] py-[88px]">
        <div className="flex h-[522px] w-[468px] shrink-0 flex-col items-start justify-center gap-10">
          <div className="flex w-full flex-col gap-8 tracking-[0.1px]">
            <div className="flex w-full flex-col gap-3">
              <p className="text-[16px] font-extrabold leading-6 text-nuki-verde-08">
                RECURSO
              </p>
              <h2 className="text-[48px] font-extrabold leading-[54px] text-nuki-preto">
                Controle e análise
              </h2>
            </div>
            <p className="text-[20px] leading-9 text-nuki-preto">
              Nuki oferece um dashboard completo para acompanhar a jornada de
              personalização do cliente. Com visibilidade total das escolhas,
              contratos, você garante uma gestão eficiente e organizada em cada
              etapa.
            </p>
          </div>
          <a
            href="#saiba-mais"
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Saiba mais
          </a>
        </div>

        <div className="relative h-[520px] flex-1">
          <Image
            src="/recurso-controle-analise/ambiente-banheiro.png"
            alt="Ambiente personalizável com análise de dados"
            fill
            sizes="(max-width: 1440px) 50vw, 700px"
            className="object-contain object-right"
          />

          <div className="absolute right-4 top-4 flex w-[230px] flex-col gap-3 rounded-2xl bg-nuki-branco p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-bold text-nuki-preto">Vale Verde</p>
              <span className="text-[12px] font-bold text-nuki-verde-02">JM²</span>
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
                className="flex size-5 items-center justify-center rounded-full bg-nuki-verde-02 text-nuki-branco"
              >
                →
              </span>
            </div>
          </div>

          <button
            type="button"
            className="absolute right-4 top-[170px] flex items-center gap-2 rounded-full bg-nuki-verde-02 px-4 py-2 text-[12px] font-bold text-nuki-branco transition-colors hover:bg-nuki-verde-03"
          >
            <span aria-hidden>+</span>
            Adicionar empreendimento
          </button>

          <div className="absolute bottom-4 left-4 flex w-[290px] gap-4 rounded-2xl bg-nuki-branco p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
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
    </section>
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
