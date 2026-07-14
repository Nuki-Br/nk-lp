"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

/** Project ID do Microsoft Clarity (público — pode viver no bundle). */
const CLARITY_PROJECT_ID = "xmfyl2hh1b";

/**
 * Inicializa o Microsoft Clarity no client uma única vez, após a montagem.
 * Fica no root layout ao lado do <Analytics /> da Vercel. Eventos custom
 * (`Clarity.event` / `Clarity.setTag`) são disparados nos pontos de interesse
 * (solicitação de demo, unlock do /comercial, abertura de demo).
 */
export function ClarityInit() {
  useEffect(() => {
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return null;
}
