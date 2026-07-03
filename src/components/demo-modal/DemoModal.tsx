"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useDemoModal } from "./DemoModalContext";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const RELAY_WEBHOOK_URL =
  "https://hook.relay.app/api/v1/playbook/cmo95qy2900fy0qlyavsa8zkw/trigger/Lye0mu6B4I3f39-35eIjkQ";
const NUKI_WHATSAPP = "551531994490";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoModal() {
  const { isOpen, step, email, close, submit } = useDemoModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const card = cardRef.current;
    const getFocusable = () =>
      card
        ? Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetParent !== null,
          )
        : [];

    getFocusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !card) return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !card.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !card.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, step, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        tabIndex={-1}
        className={
          step === "form"
            ? "relative flex max-h-[90vh] w-full max-w-[480px] flex-col overflow-hidden rounded-[32px] bg-nuki-branco shadow-[0_25px_60px_rgba(0,0,0,0.35)] outline-none md:max-w-[996px] md:flex-row md:rounded-l-[48px] md:rounded-r-[72px]"
            : "relative flex max-h-[90vh] w-full max-w-[728px] flex-col overflow-hidden rounded-[32px] bg-nuki-branco shadow-[0_25px_60px_rgba(0,0,0,0.35)] outline-none md:rounded-[48px]"
        }
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-nuki-preto transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-nuki-verde-02"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {step === "form" ? (
          <FormStep onSubmit={submit} onClose={close} />
        ) : (
          <SuccessStep email={email} onClose={close} />
        )}
      </div>
    </div>
  );
}

function FormStep({
  onSubmit,
  onClose,
}: {
  onSubmit: (email: string) => void;
  onClose: () => void;
}) {
  const [emailError, setEmailError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("demo-nome") ?? "").trim();
    const email = String(data.get("demo-email") ?? "").trim();
    const company = String(data.get("demo-empresa") ?? "").trim();

    if (!EMAIL_RE.test(email)) {
      setEmailError("Informe um e-mail válido (ex.: nome@empresa.com).");
      return;
    }
    setEmailError(null);

    const message = `Olá! Gostaria de agendar uma demonstração da plataforma Nuki.\n\nNome: ${name}\nEmpresa: ${company}\nE-mail: ${email}`;

    // 1) Envia os dados para o relay.app (fire-and-forget)
    fetch(RELAY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        source: "landing-page-demo-modal",
        createdAt: new Date().toISOString(),
      }),
    }).catch(() => {});

    // 2) Abre o WhatsApp com a mensagem personalizada (chamada síncrona no gesto do usuário)
    window.open(
      `https://wa.me/${NUKI_WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );

    track("demo_requested", { company });

    onSubmit(email);
  }

  return (
    <>
      <div className="relative hidden shrink-0 bg-nuki-cinza-borda md:block md:w-[444px]">
        <Image
          src="/demo-modal/predio.png"
          alt="Empreendimento Nuki"
          fill
          sizes="444px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6 max-md:py-4 sm:px-8 md:py-10 md:pl-12 md:pr-10">
        <div className="flex flex-col gap-2 pr-14 md:pr-0">
          <h2
            id="demo-modal-title"
            className="text-balance text-[28px] leading-tight tracking-[0.1px] text-nuki-preto sm:text-[32px] md:text-[36px] md:leading-[42px]"
          >
            <span className="font-extrabold">Solicite</span>{" "}
            <span className="font-normal">uma demonstração</span>
          </h2>
          <p className="text-[14px] font-normal leading-6 tracking-[0.1px] text-nuki-preto sm:text-[15px] md:text-[16px] md:leading-7">
            Adoraríamos te mostrar como a Nuki funciona.
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Field
            id="demo-nome"
            label="Nome"
            placeholder="Entre seu nome"
            autoComplete="name"
            required
          />

          <Field
            id="demo-email"
            label="Email"
            type="email"
            placeholder="Entre seu e-mail"
            autoComplete="email"
            required
            error={emailError}
          />

          <Field
            id="demo-empresa"
            label="Nome da empresa"
            placeholder="Nome da sua empresa"
            autoComplete="organization"
            required
          />

          <label className="flex items-start gap-3 text-[14px] font-medium leading-snug text-nuki-cinza-medio">
            <input
              type="checkbox"
              required
              className="mt-0.5 size-5 shrink-0 rounded-[3px] border border-nuki-cinza-borda accent-nuki-verde-02"
            />
            <span>
              Ao checar o box ao lado você está concordando com as{" "}
              <span className="underline">políticas de privacidade</span> da
              Nuki
            </span>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02 sm:w-auto"
            >
              Solicitar demo
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg px-4 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-black/5 sm:w-auto"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function SuccessStep({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) {
  const displayEmail = email || "seu e-mail";
  return (
    <div className="flex flex-col items-center gap-8 px-6 pt-16 pb-10 text-center sm:px-12 sm:py-14 md:px-20 md:py-16">
      <h2
        id="demo-modal-title"
        className="text-balance text-[28px] font-extrabold leading-tight tracking-[0.1px] text-nuki-preto sm:text-[36px] md:text-[48px] md:leading-[54px]"
      >
        Versão demo solicitada!
      </h2>
      <p className="max-w-[520px] text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-preto sm:text-[18px] md:text-[20px] md:leading-8">
        Perfeito! Entraremos em contato com o email{" "}
        <span className="font-semibold">{displayEmail}</span> em até 72 horas.
        Muito obrigado pelo seu interesse na plataforma Nuki :)
      </p>
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
      >
        Fechar
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required = false,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string | null;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div
        className={`flex h-14 flex-col justify-center gap-1 rounded-lg border bg-nuki-branco px-3 py-2 transition-colors focus-within:border-nuki-verde-02 ${
          error ? "border-red-500" : "border-nuki-cinza-borda"
        }`}
      >
        <label htmlFor={id} className="text-[12px] leading-none text-nuki-cinza-12">
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? true : undefined}
          className="w-full bg-transparent text-[16px] leading-none text-nuki-cinza-12 outline-none placeholder:text-nuki-cinza-7"
        />
      </div>
      {error ? (
        <p className="mt-1 text-[12px] leading-snug text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
