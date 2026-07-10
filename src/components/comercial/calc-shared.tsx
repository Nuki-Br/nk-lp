"use client";

import { useEffect, useRef, useState } from "react";

/** Animação de contagem — parte do valor atualmente exibido (não do último
    target). Se o user mexer rápido, retoma de onde está, sem teleporte.
    Compartilhado entre Calculadora (imagens/custo) e CTA (meses/total). */
export function useCountUp(value: number, durationMs = 450): number {
  const [display, setDisplay] = useState(value);
  const displayRef = useRef(value);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const from = displayRef.current;
    const to = value;
    if (from === to) return;

    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return display;
}

export const currency = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** Stepper compartilhado. Estilo default é claro (fundo branco, botão preto);
    o CSS pai pode sobrescrever cores via descendant selectors — usado assim
    no `.cta-plano-simulador` pra virar variant dark. */
export function Stepper({
  value,
  min,
  max,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  return (
    <div
      className="calc-stepper"
      role="spinbutton"
      aria-label={ariaLabel}
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <button
        type="button"
        className="calc-stepper-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={`Diminuir ${ariaLabel}`}
        disabled={value <= min}
      >
        −
      </button>
      <span className="calc-stepper-value">{value}</span>
      <button
        type="button"
        className="calc-stepper-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={`Aumentar ${ariaLabel}`}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
