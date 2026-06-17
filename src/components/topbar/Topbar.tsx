import Image from "next/image";
import { TopbarNav, type TopbarLink } from "./TopbarNav";

const links: TopbarLink[] = [
  {
    label: "Recursos",
    href: "#recursos",
    children: [
      { label: "Personalização", href: "/recursos/personalizacao" },
      { label: "Controle e análise", href: "/recursos/controle-analise" },
    ],
  },
  { label: "Sobre a Nuki", href: "#sobre" },
  { label: "Nuki Lab", href: "#lab" },
];

export function Topbar() {
  return (
    <header className="relative w-full px-6 pt-4 pb-6">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center rounded-3xl bg-nuki-branco py-3 shadow-[0_3px_3.2px_rgba(0,0,0,0.15)]">
        <div className="flex w-full max-w-[1224px] items-center justify-between px-6">
          <a href="/" className="flex items-center" aria-label="Nuki">
            <Image
              src="/topbar/nuki-logo.png"
              alt="Nuki"
              width={122}
              height={60}
              priority
              className="h-[60px] w-[122px] object-contain"
            />
          </a>

          <TopbarNav links={links} />
        </div>
      </div>
    </header>
  );
}
