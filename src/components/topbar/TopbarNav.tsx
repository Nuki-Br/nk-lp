"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SolicitarDemoButton } from "@/components/demo-modal";

export type TopbarSubLink = {
  label: string;
  href: string;
};

export type TopbarLink = {
  label: string;
  href: string;
  children?: TopbarSubLink[];
};

export function TopbarNav({ links }: { links: TopbarLink[] }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Mobile menu: scroll-lock + Esc-to-close + click-outside (mirrors DesktopDropdown).
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <>
      {/* Desktop (lg+) inline nav + CTAs */}
      <nav className="hidden lg:flex items-center gap-10">
        {links.map((link) =>
          link.children ? (
            <DesktopDropdown
              key={link.label}
              link={link}
              isOpen={openDropdown === link.label}
              setOpen={(value) =>
                setOpenDropdown(value ? link.label : null)
              }
            />
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center rounded-lg px-3 py-3 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-black/5"
            >
              {link.label}
            </a>
          ),
        )}
      </nav>

      <div className="hidden lg:flex items-center gap-6">
        <a
          href="https://admin.nukibr.com/"
          className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-preto px-6 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-nuki-preto hover:text-nuki-branco whitespace-nowrap"
        >
          Login
        </a>
        <SolicitarDemoButton
          className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02 whitespace-nowrap"
        >
          Solicitar demo
        </SolicitarDemoButton>
      </div>

      {/* Mobile / tablet hamburger */}
      <button
        ref={hamburgerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        className="lg:hidden flex h-12 w-12 items-center justify-center rounded-lg text-nuki-preto transition-colors hover:bg-black/5"
      >
        {open ? <CloseIcon className="size-6" /> : <BurgerIcon className="size-6" />}
      </button>

      {/* Mobile dropdown panel */}
      {open && (
        <div ref={panelRef} className="lg:hidden absolute left-0 right-0 top-full z-40 mt-2 px-6">
          <div className="mx-auto w-full max-w-[1440px] rounded-3xl bg-nuki-branco p-6 shadow-[0_3px_3.2px_rgba(0,0,0,0.15)]">
            <nav className="flex flex-col gap-2">
              {links.map((link) =>
                link.children ? (
                  <MobileSubMenu
                    key={link.label}
                    link={link}
                    isOpen={openMobileSub === link.label}
                    onToggle={() =>
                      setOpenMobileSub((cur) =>
                        cur === link.label ? null : link.label,
                      )
                    }
                    onNavigate={() => {
                      setOpen(false);
                      setOpenMobileSub(null);
                    }}
                  />
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-lg px-3 py-3 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-black/5"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://admin.nukibr.com/"
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-full border-2 border-nuki-preto px-6 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-nuki-preto hover:text-nuki-branco whitespace-nowrap"
              >
                Login
              </a>
              <SolicitarDemoButton
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02 whitespace-nowrap"
              >
                Solicitar demo
              </SolicitarDemoButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DesktopDropdown({
  link,
  isOpen,
  setOpen,
}: {
  link: TopbarLink;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: MouseEvent) {
      const node = wrapperRef.current;
      if (node && !node.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen]);

  const sublinks = link.children ?? [];

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center rounded-lg px-3 py-3 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-black/5"
      >
        {link.label}
        <ChevronDown
          className={`ml-1 size-5 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 mt-3 w-[264px] -translate-x-1/2 rounded-xl border border-nuki-branco bg-nuki-preto p-4 shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
        >
          <ul className="flex flex-col gap-2">
            {sublinks.map((sub, index) => {
              const active = pathname === sub.href;
              return (
                <li key={sub.href} className="flex flex-col gap-2">
                  <Link
                    href={sub.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={`flex items-center rounded-[20px] px-1 py-2 text-[14px] leading-5 text-nuki-branco transition-colors hover:bg-white/10 ${
                      active ? "font-bold" : "font-normal"
                    }`}
                  >
                    {sub.label}
                  </Link>
                  {index < sublinks.length - 1 && (
                    <div className="h-px w-full rounded-full bg-nuki-cinza-divisor/40" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function MobileSubMenu({
  link,
  isOpen,
  onToggle,
  onNavigate,
}: {
  link: TopbarLink;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const sublinks = link.children ?? [];

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between rounded-lg px-3 py-3 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-black/5"
      >
        {link.label}
        <ChevronDown
          className={`ml-1 size-5 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="mt-1 flex flex-col gap-1 pl-3">
          {sublinks.map((sub) => {
            const active = pathname === sub.href;
            return (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  onClick={onNavigate}
                  className={`flex items-center rounded-lg px-4 py-3 text-[16px] leading-5 text-nuki-preto transition-colors hover:bg-black/5 ${
                    active ? "font-bold" : "font-normal"
                  }`}
                >
                  {sub.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
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

function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.41 6.29 6.29-6.29 6.29 1.4 1.41 6.3-6.3 6.3 6.3 1.4-1.41-6.29-6.29 6.29-6.29-1.4-1.41z" />
    </svg>
  );
}
