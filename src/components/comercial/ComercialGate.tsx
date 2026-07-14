"use client";

import { useState, useSyncExternalStore } from "react";
import Clarity from "@microsoft/clarity";

const STORAGE_KEY = "nuki-comercial-unlocked";

/** Senha compartilhada do time. Client-side (vai no bundle) — não é segredo de
    verdade, só uma barreira leve pra apresentação não ficar 100% aberta.
    Configurável via env sem tocar no código. */
const PASSWORD = process.env.NEXT_PUBLIC_COMERCIAL_PASSWORD ?? "nuki2026";

/* Store externo do flag de unlock (localStorage) lido via useSyncExternalStore:
   evita mismatch de hidratação (server sempre "trancado") e o lint de setState
   síncrono em effect. `notify` re-renderiza os assinantes após o unlock na mesma
   aba, já que o evento nativo "storage" não dispara pra própria aba. */
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "1";
}
function getServerSnapshot() {
  return false;
}
function unlockStore() {
  localStorage.setItem(STORAGE_KEY, "1");
  listeners.forEach((l) => l());
}

/**
 * Portão de senha na frente do /comercial. Uma vez desbloqueado, grava um flag
 * no localStorage — em reloads seguintes o conteúdo aparece direto, sem pedir
 * senha de novo.
 */
export function ComercialGate({ children }: { children: React.ReactNode }) {
  const unlocked = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      setError(false);
      Clarity.setTag("comercial_access", "granted");
      Clarity.event("comercial_unlocked");
      unlockStore();
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="comercial-gate">
      <form className="comercial-gate-card" onSubmit={submit}>
        <span className="comercial-gate-tag">Acesso restrito</span>
        <h1 className="comercial-gate-title">Apresentação comercial Nuki</h1>
        <p className="comercial-gate-lead">
          Este conteúdo é exclusivo para o time Nuki. Informe a senha de acesso
          para continuar.
        </p>
        <label className="comercial-gate-label" htmlFor="comercial-gate-input">
          Senha
        </label>
        <input
          id="comercial-gate-input"
          className={`comercial-gate-input${error ? " has-error" : ""}`}
          type="password"
          autoComplete="current-password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          placeholder="••••••••"
        />
        {error && (
          <p className="comercial-gate-error" role="alert">
            Senha incorreta. Tente novamente.
          </p>
        )}
        <button type="submit" className="comercial-gate-btn">
          Entrar
        </button>
      </form>
    </div>
  );
}
