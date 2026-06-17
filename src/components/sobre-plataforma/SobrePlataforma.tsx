"use client";

import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  displayLabel?: React.ReactNode;
  icon: string;
  description: string;
  href?: string;
};

const tabs: Tab[] = [
  {
    id: "personalizacao",
    label: "Personalização",
    icon: "/sobre-plataforma/ic-personalizacao.svg",
    description:
      "Na Nuki, seu cliente tem liberdade! Desde a escolha da planta ideal até os acabamentos perfeitos, tudo personalizado. E ainda pode optar pela melhor forma de pagamento, garantindo uma experiência completa e sem limitações.",
    href: "/recursos/personalizacao",
  },
  {
    id: "experiencia",
    label: "Experiência em foco",
    icon: "/sobre-plataforma/ic-experiencia.svg",
    description:
      "Facilitar a experiência do cliente é nossa prioridade! Com uma plataforma simples e intuitiva, qualquer pessoa pode personalizar seu imóvel com facilidade.",
  },
  {
    id: "elimine",
    label: "Elimine os processos manuais",
    displayLabel: (
      <>
        Elimine os
        <br />
        processos manuais
      </>
    ),
    icon: "/sobre-plataforma/ic-elimine.svg",
    description:
      "Cadastre plantas e acabamentos de forma rápida, ajuste preços e descrições em poucos cliques e acompanhe cada fase da personalização do cliente. Tudo centralizado em uma plataforma única.",
  },
];

export function SobrePlataforma() {
  const [activeId, setActiveId] = useState(tabs[0].id);

  return (
    <section className="w-full bg-nuki-verde-03">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[108px] py-12 sm:py-14 md:py-16 lg:py-20 xl:py-[88px]">
        <header className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-[82px] flex flex-col items-center gap-2.5 text-center">
          <h2 className="text-[28px] leading-8 sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px] tracking-[0.1px] text-nuki-branco">
            <span className="font-normal">Sobre a </span>
            <span className="font-extrabold">plataforma</span>
          </h2>
          <p className="text-[16px] leading-7 sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-[28px] tracking-[0.1px] text-nuki-branco">
            Simplifique as operações com nosso sistema
          </p>
        </header>

        <div className="flex flex-col gap-4 w-full lg:h-[473px] lg:flex-row lg:gap-6">
          {tabs.map((tab) =>
            tab.id === activeId ? (
              <TabExpanded key={tab.id} tab={tab} />
            ) : (
              <TabNarrow
                key={tab.id}
                tab={tab}
                onSelect={() => setActiveId(tab.id)}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function TabNarrow({ tab, onSelect }: { tab: Tab; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={false}
      className="flex h-16 w-full shrink-0 cursor-pointer flex-row items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-white/10 lg:h-full lg:w-[129px] lg:flex-col lg:justify-between lg:rounded-3xl lg:px-[48px] lg:py-[39px] transition-colors hover:bg-white/15"
    >
      <img
        src={tab.icon}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <p className="text-[18px] font-normal text-nuki-branco text-center lg:text-[28px] lg:leading-[1.2] lg:whitespace-nowrap lg:[writing-mode:vertical-rl] lg:rotate-180">
        {tab.displayLabel ?? tab.label}
      </p>
    </button>
  );
}

function TabExpanded({ tab }: { tab: Tab }) {
  return (
    <div
      role="region"
      aria-label={tab.label}
      className="flex flex-col h-full flex-1 items-stretch gap-6 rounded-3xl bg-white/10 p-6 lg:flex-row lg:gap-12"
    >
      <div className="flex w-full shrink-0 flex-row items-center justify-between gap-4 lg:w-8 lg:flex-col">
        <img
          src={tab.icon}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0"
        />
        <p className="text-[18px] font-normal text-nuki-branco text-center lg:mt-auto lg:text-left lg:text-[28px] lg:leading-[1.2] lg:[writing-mode:vertical-rl] lg:rotate-180">
          {tab.displayLabel ?? tab.label}
        </p>
      </div>

      <div className="flex w-full flex-col justify-between gap-8 lg:ml-auto lg:w-[429px] lg:gap-0">
        <div className="flex flex-col gap-6 lg:gap-8">
          <h3 className="text-[22px] sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] xl:leading-9 font-extrabold text-nuki-branco">
            {tab.label}
          </h3>
          <p className="text-[16px] leading-7 sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9 tracking-[0.1px] text-nuki-branco">
            {tab.description}
          </p>
        </div>
        {tab.href && (
          <a
            href={tab.href}
            className="flex h-12 w-fit items-center justify-center gap-2 rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-verde-03"
          >
            Saiba mais
            <ChevronRight className="size-5" />
          </a>
        )}
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
