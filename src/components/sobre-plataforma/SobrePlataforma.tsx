type Tab = {
  id: string;
  label: string;
  icon: string;
  description?: string;
};

const tabs: Tab[] = [
  {
    id: "personalizacao",
    label: "Personalização",
    icon: "/sobre-plataforma/ic-personalizacao.svg",
    description:
      "Na Nuki, seu cliente tem liberdade! Desde a escolha da planta ideal até os acabamentos perfeitos, tudo personalizado. E ainda pode optar pela melhor forma de pagamento, garantindo uma experiência completa e sem limitações.",
  },
  {
    id: "experiencia",
    label: "Experiência em foco",
    icon: "/sobre-plataforma/ic-experiencia.svg",
  },
  {
    id: "elimine",
    label: "Elimine os processos manuais",
    icon: "/sobre-plataforma/ic-elimine.svg",
  },
];

const activeId = "personalizacao";

export function SobrePlataforma() {
  return (
    <section className="w-full bg-nuki-verde-03">
      <div className="mx-auto max-w-[1440px] px-[108px] py-[88px]">
        <header className="mb-[82px] flex flex-col items-center gap-2.5 text-center">
          <h2 className="text-[48px] leading-[54px] tracking-[0.1px] text-nuki-branco">
            <span className="font-normal">Sobre a </span>
            <span className="font-extrabold">plataforma</span>
          </h2>
          <p className="text-[20px] leading-[28px] tracking-[0.1px] text-nuki-branco">
            Simplifique as operações com nosso sistema
          </p>
        </header>

        <div className="flex h-[473px] w-full gap-6">
          {tabs.map((tab) =>
            tab.id === activeId ? (
              <TabExpanded key={tab.id} tab={tab} />
            ) : (
              <TabNarrow key={tab.id} tab={tab} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function TabNarrow({ tab }: { tab: Tab }) {
  return (
    <button
      type="button"
      className="flex h-full w-[129px] shrink-0 flex-col items-center justify-between rounded-3xl bg-white/10 px-[48px] py-[39px] transition-colors hover:bg-white/15"
    >
      <img
        src={tab.icon}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <p
        className="whitespace-nowrap text-[28px] font-normal leading-[1.2] text-nuki-branco"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {tab.label}
      </p>
    </button>
  );
}

function TabExpanded({ tab }: { tab: Tab }) {
  return (
    <div className="flex h-full flex-1 items-stretch gap-12 rounded-3xl bg-white/10 p-6">
      <div className="flex w-8 shrink-0 flex-col items-center justify-between">
        <img
          src={tab.icon}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0"
        />
        <p
          className="whitespace-nowrap text-[28px] font-normal leading-[1.2] text-nuki-branco"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {tab.label}
        </p>
      </div>

      <div className="ml-auto flex w-[429px] flex-col justify-between">
        <div className="flex flex-col gap-8">
          <h3 className="text-[32px] font-extrabold leading-[0.79] text-nuki-branco">
            {tab.label}
          </h3>
          <p className="text-[20px] leading-9 tracking-[0.1px] text-nuki-branco">
            {tab.description}
          </p>
        </div>
        <button
          type="button"
          className="flex h-12 w-fit items-center justify-center gap-2 rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-verde-03"
        >
          Próximo
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
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
