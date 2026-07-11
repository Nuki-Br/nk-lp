"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ModuloData, ModuloShot } from "./modulos.data";

const AUTO_ADVANCE_MS = 5000;

/**
 * Slide de um módulo (Planner · Personaliza · Inspetor) no padrão da apresentação
 * comercial. Layout 2-col estático:
 *   ┌─ COPY (~40%)                         ┌─ SHOT (~60%) ────────────┐
 *   │  tag                                 │                          │
 *   │  título grande                       │  screenshot ativo do beat│
 *   │  descrição                           │  (cross-fade ao trocar)  │
 *   │  ▸ tabs verticais dos beats          │                          │
 *   │  ▸ descrição do beat ativo           │                          │
 *   │  ▸ 2 highlights                      │                          │
 *   │  → Saiba mais                        │                          │
 *   └─                                     └──────────────────────────┘
 *
 * Auto-advance dos beats a cada AUTO_ADVANCE_MS, pausa on hover/focus na seção
 * inteira. `prefers-reduced-motion` desliga o auto-advance (user controla via
 * click). Nada scroll-driven — a slide é 100% estática.
 */
export function ModuloSlide({ data }: { data: ModuloData }) {
  const [beatAtivo, setBeatAtivo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || isPaused || data.beats.length <= 1) return;

    const timer = window.setInterval(() => {
      setBeatAtivo((prev) => (prev + 1) % data.beats.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, data.beats.length]);

  const beat = data.beats[beatAtivo];
  const isPhone = data.beats[0]?.shot.kind === "phone";
  const panelId = `${data.id}-panel`;

  return (
    <section
      className={`cm-section modulo-slide${isPhone ? " is-phone" : " is-desktop"}`}
      id={data.id}
      data-reveal-group=""
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="cm-wrap">
        <div className="modulo-slide-grid">
          {/* -------- Coluna esquerda: cópia + tabs + highlights -------- */}
          <div className="modulo-slide-copy">
            <p className="tag reveal">{data.tag}</p>
            <h2 className="reveal">{data.title}</h2>
            <p className="lead reveal">{data.descricao}</p>

            <ul
              className="modulo-slide-tabs reveal"
              role="tablist"
              aria-label={`Recursos do ${data.title}`}
            >
              {data.beats.map((b, i) => (
                <li key={b.shot.base} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`${data.id}-tab-${i}`}
                    aria-selected={i === beatAtivo}
                    aria-controls={panelId}
                    tabIndex={i === beatAtivo ? 0 : -1}
                    className={`modulo-slide-tab${i === beatAtivo ? " on" : ""}`}
                    onClick={() => setBeatAtivo(i)}
                  >
                    <span className="modulo-slide-tab-num">
                      Beat {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="modulo-slide-tab-title">{b.title}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div
              className="modulo-slide-detail"
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${data.id}-tab-${beatAtivo}`}
            >
              <p key={beat.description} className="modulo-slide-detail-desc">
                {beat.description}
              </p>
            </div>

            <div className="modulo-slide-highlights reveal">
              {data.highlights.map((h) => (
                <div className="modulo-slide-hl" key={h.label}>
                  <span className="modulo-slide-hl-num">
                    {(h.prefix ?? "") + h.target + (h.suffix ?? "")}
                  </span>
                  <span className="modulo-slide-hl-lbl">{h.label}</span>
                </div>
              ))}
            </div>

            {data.demoUrl ? (
              <button
                type="button"
                className="modulo-slide-cta reveal"
                onClick={() => {
                  document
                    .getElementById(`${data.id}-demo`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="modulo-slide-cta-glyph" aria-hidden="true">
                  ▷
                </span>
                Explorar o {data.title}
              </button>
            ) : (
              <Link className="modulo-slide-link reveal" href={data.saibaMaisHref}>
                Saiba mais <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {/* -------- Coluna direita: screenshot com cross-fade -------- */}
          <div className="modulo-slide-shot">
            <div className="modulo-slide-shot-stage">
              {data.beats.map((b, i) => (
                <ShotSlot
                  key={b.shot.base}
                  shot={b.shot}
                  active={i === beatAtivo}
                  eager={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Slot de imagem no stage do cross-fade. Cada beat monta a sua slot; apenas a
 * com .on tem opacity 1, as demais ficam invisíveis mas montadas — troca via
 * transition de CSS, sem remount. Cópia enxuta do <Shot> do JourneyModule com
 * srcSet + sizes adaptados ao layout novo (fixed max-width por tipo).
 */
function ShotSlot({
  shot,
  active,
  eager,
}: {
  shot: ModuloShot;
  active: boolean;
  eager: boolean;
}) {
  const { base, kind, alt } = shot;
  const loading = eager ? undefined : "lazy";
  const cls = `modulo-slide-shot-slot${active ? " on" : ""}`;

  if (kind === "phone") {
    return (
      <picture className={cls}>
        <source
          type="image/webp"
          srcSet={`/jornada/${base}-320.webp 320w, /jornada/${base}-640.webp 640w, /jornada/${base}-960.webp 960w`}
          sizes="(min-width: 900px) 320px, 280px"
        />
        <img
          src={`/jornada/${base}-320.png`}
          width={2160}
          height={3840}
          alt={alt}
          loading={loading}
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <picture className={cls}>
      <source
        type="image/webp"
        srcSet={`/jornada/${base}-740.webp 740w, /jornada/${base}-1480.webp 1480w, /jornada/${base}-2220.webp 2220w`}
        sizes="(min-width: 1280px) 780px, (min-width: 900px) 58vw, 92vw"
      />
      <img
        src={`/jornada/${base}-740.png`}
        width={2560}
        height={1600}
        alt={alt}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
}
