"use client";

import { useEffect, useRef, useState } from "react";
import type { ModuloData } from "./modulos.data";

/**
 * Modal fullscreen com a demo interativa de um módulo — usado na HOME quando
 * o user clica no CTA "▷ Explorar" no `ModuloSlide`. Cobre a viewport inteira
 * por cima da página, sem levar o user pra outra rota.
 *
 * Estrutura:
 *
 *   ┌── barra chrome (48px) ───────────────────────────────┐
 *   │ {title.strong} · Demo interativa           × Fechar  │
 *   ├──────────────────────────────────────────────────────┤
 *   │                                                       │
 *   │            iframe {data.demoUrl}                      │
 *   │                                                       │
 *   └──────────────────────────────────────────────────────┘
 *
 * Fechamento:
 * - Click no × do topo
 * - ESC no window pai (funciona quando foco está fora do iframe)
 * - `postMessage({type: 'nuki-demo:esc'})` do iframe — a ESC bridge já está
 *   injetada em todos os HTMLs de demo (ver `scripts/prepare-*-demo.mjs`),
 *   então ESC funciona mesmo com foco dentro do iframe
 *
 * Efeitos:
 * - Bloqueia scroll do body enquanto aberto (restaura no cleanup)
 * - Foca o botão × ao abrir; retorna foco pro elemento acionador ao fechar
 * - Mobile (<900px): esconde o iframe e mostra fallback "abrir em nova aba"
 *   pra evitar UX ruim de HTMLs pensados pra desktop numa tela estreita
 */
export function ModuloDemoModal({
  data,
  onClose,
}: {
  data: ModuloData;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    /* Guarda o elemento que tinha foco antes de abrir pra restaurar no fechar
       — padrão de modal focus-restore. Sem isso, ao fechar o foco pula pro
       <body>, quebrando teclado-only-nav. */
    if (typeof document !== "undefined") {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    }

    /* Bloqueia scroll do body pra o user não rolar a home atrás do modal. */
    const originalOverflow =
      typeof document !== "undefined" ? document.body.style.overflow : "";
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    /* Foca o × no próximo tick — deixar o React montar antes. */
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    /* Bridge: iframe posta 'nuki-demo:esc' quando o user aperta ESC dentro
       dele (ver scripts/prepare-*-demo.mjs). Aqui só fechamos. */
    const onMessage = (e: MessageEvent) => {
      if (
        e.data &&
        typeof e.data === "object" &&
        (e.data as { type?: unknown }).type === "nuki-demo:esc"
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      if (typeof document !== "undefined") {
        document.body.style.overflow = originalOverflow;
      }
      previousFocusRef.current?.focus?.();
    };
  }, [onClose]);

  /* Guard após hooks (React rules-of-hooks): callers só devem montar esse
     componente quando têm demoUrl, mas fallback pra segurança. */
  if (!data.demoUrl) return null;

  return (
    <div
      className="modulo-demo-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Demo interativa do ${data.title.strong}`}
    >
      <header className="modulo-demo-modal-bar">
        <span className="modulo-demo-modal-title">
          <strong>{data.title.strong}</strong>
          <span className="modulo-demo-modal-sep">·</span>
          <span className="modulo-demo-modal-suffix">Demo interativa</span>
        </span>

        <button
          ref={closeButtonRef}
          type="button"
          className="modulo-demo-modal-close"
          onClick={onClose}
          aria-label={`Fechar demo do ${data.title.strong}`}
          title="Fechar (ESC)"
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <div className="modulo-demo-modal-stage">
        <iframe
          className="modulo-demo-modal-frame"
          src={data.demoUrl}
          title={`${data.title.strong} — demo interativa`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />

        {!loaded && (
          <div className="modulo-demo-modal-skeleton" aria-hidden="true">
            <div className="modulo-demo-modal-skeleton-pulse" />
            <p className="modulo-demo-modal-skeleton-text">Carregando demo…</p>
          </div>
        )}

        <div className="modulo-demo-modal-mobile" role="note">
          <p className="modulo-demo-modal-mobile-title">
            Demo funciona melhor no desktop
          </p>
          <p className="modulo-demo-modal-mobile-body">
            O {data.title.strong} foi feito pra tela larga. No celular, abra em
            uma nova aba pra explorar com espaço.
          </p>
          <a
            className="modulo-demo-modal-mobile-link"
            href={data.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir em nova aba →
          </a>
        </div>
      </div>
    </div>
  );
}
