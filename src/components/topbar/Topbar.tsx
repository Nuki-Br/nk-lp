import Image from "next/image";

const links = [
  { label: "Recursos", href: "#recursos", hasMenu: true },
  { label: "Sobre a Nuki", href: "#sobre", hasMenu: false },
  { label: "Nuki Lab", href: "#lab", hasMenu: false },
];

export function Topbar() {
  return (
    <header className="w-full px-6 pt-4 pb-6">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center rounded-3xl bg-nuki-branco py-3 shadow-[0_3px_3.2px_rgba(0,0,0,0.15)]">
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

          <nav className="flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center rounded-lg px-3 py-3 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-black/5"
              >
                {link.label}
                {link.hasMenu && (
                  <ChevronDown className="ml-1 size-5 shrink-0" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href="#login"
              className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-preto px-6 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-nuki-preto hover:text-nuki-branco"
            >
              Login
            </a>
            <a
              href="#demo"
              className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.5 7.5L10 12L14.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
