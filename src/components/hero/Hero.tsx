import Image from "next/image";
import { SolicitarDemoButton } from "@/components/demo-modal";

const ambientes = [
  { icon: "/hero/ic-weekend.svg", label: "Estar/Jantar/Circulação", state: "default" },
  { icon: "/hero/ic-kitchen.svg", label: "Cozinha / A.S.", state: "selected" },
  { icon: "/hero/ic-grass.svg", label: "Terraço Gourmet", state: "default" },
  { icon: "/hero/ic-bed.svg", label: "Suíte Master", state: "default" },
  { icon: "/hero/ic-shower.svg", label: "Banheiro", state: "default" },
] as const;

export function Hero() {
  return (
    <section className="w-full bg-nuki-cinza-claro">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-16 lg:py-20 xl:pl-[108px] xl:pr-[99px] xl:py-[88px]">
        <div className="flex w-full flex-col items-start justify-center gap-8 lg:w-[416px] lg:shrink-0">
          <h1 className="text-[36px] font-extrabold leading-[44px] tracking-[0.1px] text-nuki-preto sm:text-[44px] sm:leading-[52px] md:text-[52px] md:leading-[60px] lg:text-[60px] lg:leading-[60px] xl:text-[64px] xl:leading-[64px]">
            Planeje, personalize e entregue.
          </h1>
          <p className="text-[16px] leading-7 tracking-[0.2px] text-nuki-cinza sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            Do memorial à vistoria, num só fluxo. A construtora monta o catálogo
            no Planner, o cliente escolhe vendo o impacto no Personaliza, e a
            obra entrega com conformidade auditável pelo Inspetor.
          </p>
          <SolicitarDemoButton
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Solicitar demo
          </SolicitarDemoButton>
        </div>

        {/* Mobile/Tablet right block (<lg): simplified image + floating card */}
        <div className="relative w-full lg:hidden">
          <div className="relative mx-auto w-full max-w-[429px] aspect-[429/631] overflow-hidden rounded-[80px] shadow-[0_25px_30.8px_rgba(0,0,0,0.25)] sm:rounded-[120px]">
            <Image
              src="/hero/ambiente-10.png"
              alt="Ambiente personalizado"
              fill
              sizes="(max-width: 640px) 100vw, 429px"
              className="object-cover"
              priority
            />
          </div>
          <CompositionCard className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0" />
        </div>

        {/* Desktop right block (lg+): preserve original composition intact */}
        <div className="relative hidden h-[716px] w-[696px] shrink-0 lg:block">
          <div className="absolute left-0 top-[102px] h-[523px] w-[528px] -scale-y-100">
            <Image
              src="/hero/quadrado.png"
              alt=""
              fill
              sizes="528px"
              className="pointer-events-none object-contain"
            />
          </div>

          <div className="absolute left-[239px] top-0 h-[631px] w-[429px] overflow-hidden rounded-[200px] shadow-[0_25px_30.8px_rgba(0,0,0,0.25)]">
            <Image
              src="/hero/ambiente-10.png"
              alt="Ambiente personalizado"
              fill
              sizes="429px"
              className="object-cover"
              priority
            />
          </div>

          <SideMenu className="absolute left-[71px] top-[406px]" />
          <CompositionCard className="absolute left-[426px] top-[118px]" />
        </div>
      </div>
    </section>
  );
}

function SideMenu({ className }: { className?: string }) {
  return (
    <div
      className={`${className ?? ""} w-[263px] rounded-3xl drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]`}
    >
      <div className="flex w-[264px] flex-col gap-4 rounded-3xl border-r border-nuki-cinza-borda bg-nuki-branco p-4">
        <div className="flex w-full items-center gap-2">
          <p className="text-[14px] font-bold text-nuki-cinza">
            Selecione um ambiente
          </p>
          <img
            src="/hero/ic-question.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px]"
          />
        </div>

        <ul className="flex w-full flex-col">
          {ambientes.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-[20px] px-1 py-2 text-left transition-colors hover:bg-black/5 ${
                  item.state === "selected" ? "text-nuki-verde-02" : "text-nuki-preto"
                }`}
              >
                <span className="flex flex-1 items-center gap-2">
                  <img
                    src={item.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px] shrink-0"
                  />
                  <span className="truncate text-[14px] font-normal leading-none">
                    {item.label}
                  </span>
                </span>
                <img
                  src={
                    item.state === "selected"
                      ? "/hero/ic-check.svg"
                      : "/hero/ic-record.svg"
                  }
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] shrink-0"
                />
              </button>
              {i < ambientes.length - 1 && (
                <div className="my-2 h-px w-full rounded-[43px] bg-nuki-cinza-divisor" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CompositionCard({ className }: { className?: string }) {
  return (
    <div
      className={`${className ?? ""} flex w-[270px] max-sm:w-[248px] items-center gap-4 rounded-[20px] bg-nuki-preto px-4 py-3 drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]`}
    >
      <div className="size-[82px] shrink-0 overflow-hidden rounded-[20px]">
        <Image
          src="/hero/material-preview.png"
          alt="Piso laminado"
          width={82}
          height={82}
          className="size-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-bold text-nuki-branco">Material 01</p>
          <img
            src="/hero/ic-premium.svg"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        </div>
        <p className="text-[12px] font-medium leading-tight text-nuki-branco">
          Piso laminado Eucafloor linha Evidence Caravalho.
        </p>
        <button
          type="button"
          className="flex items-end gap-1 py-1.5 text-[12px] font-bold text-nuki-verde-02"
        >
          Ver mais
          <img
            src="/hero/ic-expand-more.svg"
            alt=""
            width={14}
            height={14}
            className="size-[14px]"
          />
        </button>
      </div>
    </div>
  );
}
