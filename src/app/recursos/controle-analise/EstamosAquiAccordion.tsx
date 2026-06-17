"use client";

import { useState } from "react";

const items = [
  {
    icon: "/recursos-controle-analise/ic-edit-note.svg",
    title: "Gestão de Cadastros Simplificada",
    description:
      "Atualize cadastros, importe dados em lote e mantenha o controle de todos os clientes em uma interface intuitiva.",
  },
  {
    icon: "/recursos-controle-analise/ic-3d.svg",
    title: "Modelos 3D e Renders sob Medida",
    description:
      "Geramos renders fotorrealistas e modelos 3D dos ambientes para você apresentar com qualidade ao cliente final.",
  },
  {
    icon: "/recursos-controle-analise/ic-draw.svg",
    title: "Relatórios Customizados com Insights Rápidos",
    description:
      "Configure dashboards e relatórios sob medida para extrair os insights que importam para sua operação.",
  },
];

export function EstamosAquiAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="flex w-full flex-col lg:w-[557px]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li
            key={item.title}
            className={`w-full ${i < items.length - 1 ? "border-b border-nuki-cinza-divisor" : ""}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-2.5 py-4 text-left transition-colors hover:bg-black/[0.02]"
            >
              <span className="flex flex-1 items-center gap-3">
                <img
                  src={item.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 shrink-0"
                />
                <span className="text-[16px] font-normal leading-tight tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[24px]">
                  {item.title}
                </span>
              </span>
              <ChevronDownIcon
                className={`size-6 shrink-0 text-nuki-preto transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-2.5 pb-4 text-[14px] leading-relaxed tracking-[0.1px] text-nuki-cinza sm:text-[15px] md:text-[16px] xl:text-[18px]">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5.59 7.5C5.92 7.18 6.44 7.18 6.77 7.5L10 10.73L13.23 7.5C13.56 7.18 14.08 7.18 14.41 7.5C14.73 7.83 14.73 8.35 14.41 8.68L10.58 12.5C10.26 12.83 9.73 12.83 9.41 12.5L5.59 8.68C5.27 8.36 5.27 7.83 5.59 7.5Z" />
    </svg>
  );
}
