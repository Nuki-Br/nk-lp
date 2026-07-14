"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
/**
 * `onOpenDemo` — se presente, o click no CTA "Explorar" chama a callback em vez
 * de fazer scroll pro `#{id}-demo`. Usado na home, onde a demo abre em modal
 * fullscreen em vez de slide adjacente. Ausente = comportamento default do
 * /comercial (scroll pro slide de demo).
 *
 * `hideDemoCta` — oculta o botão "Explorar o …" (só faz sentido pra módulos com
 * `demoUrl`). Usado na home pública, que não deve expor as demos interativas.
 */
export function ModuloSlide({
  data,
  index,
  onOpenDemo,
  hideDemoCta = false,
}: {
  data: ModuloData;
  index: number;
  onOpenDemo?: () => void;
  hideDemoCta?: boolean;
}) {
  const [beatAtivo, setBeatAtivo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  /* Timer dos beats só roda quando a seção está de fato visível — evita gastar
     ciclos (e "queimar" beats) enquanto o módulo está fora da viewport. */
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || isPaused || !isVisible || data.beats.length <= 1) return;

    const timer = window.setInterval(() => {
      setBeatAtivo((prev) => (prev + 1) % data.beats.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, isVisible, data.beats.length]);

  const beat = data.beats[beatAtivo];
  const isPhone = data.beats[0]?.shot.kind === "phone";
  const panelId = `${data.id}-panel`;

  return (
    <section
      ref={sectionRef}
      className={`cm-section modulo-slide${isPhone ? " is-phone" : " is-desktop"}`}
      id={data.id}
      data-reveal-group=""
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Numeral gigante "01/02/03" de fundo — herda estilo base de
          `.jornada .bgnum` (jornada.css:95-105) já importado. Parallax nativo
          via animation-timeline: view() ou fallback JS do ComercialScripts. */}
      <span className="bgnum" data-parallax="-70" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* Pearl decorativa — mesma linguagem do /antiga (SobreANuki, FaleComAGente).
          Off-canvas parcial, borrada, transparente — assinatura de marca sem
          competir com o produto. */}
      <Image
        src="/sobre-a-nuki/nuki_quadradinho_pearl 5.svg"
        alt=""
        width={240}
        height={240}
        className="modulo-slide-pearl"
        aria-hidden="true"
      />
      <div className="cm-wrap">
        <div className="modulo-slide-grid">
          {/* -------- Coluna esquerda: cópia + tabs + highlights -------- */}
          <div className="modulo-slide-copy">
            <p className="tag reveal">{data.tag}</p>
            <h2 className="reveal">
              <span className="modulo-slide-h2-pre">{data.title.pre}</span>{" "}
              <strong>{data.title.strong}</strong>
            </h2>
            <p className="lead reveal">{data.descricao}</p>

            <ul
              className="modulo-slide-tabs reveal"
              role="tablist"
              aria-label={`Recursos do ${data.title.strong}`}
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
              hideDemoCta ? null : (
                <button
                  type="button"
                  className="modulo-slide-cta reveal"
                  onClick={() => {
                    if (onOpenDemo) {
                      onOpenDemo();
                      return;
                    }
                    document
                      .getElementById(`${data.id}-demo`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <span className="modulo-slide-cta-glyph" aria-hidden="true">
                    ▷
                  </span>
                  Explorar o {data.title.strong}
                </button>
              )
            ) : (
              <Link className="modulo-slide-link reveal" href={data.saibaMaisHref}>
                Saiba mais <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {/* -------- Coluna direita: mídia (vídeo quando disponível, cross-fade
              de screenshots como fallback) --------

              TODO — ativação do vídeo YouTube quando o primeiro material chegar:
              1. `npm install @next/third-parties@latest` (antes verificar API na
                 versão instalada do Next em `node_modules/next/dist/docs/`)
              2. `import { YouTubeEmbed } from "@next/third-parties/google";`
              3. Substituir o bloco `{data.videoUrl ? (...) : (...)}` abaixo por:
                   {data.videoUrl ? (
                     <div className="modulo-slide-video">
                       <YouTubeEmbed videoid={data.videoUrl} params="rel=0" />
                     </div>
                   ) : (...)}
              4. Setar `videoUrl` no módulo alvo em `modulos.data.ts`.
              Enquanto `videoUrl` estiver undefined pra um módulo, o cross-fade
              de screenshots roda normalmente. */}
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
