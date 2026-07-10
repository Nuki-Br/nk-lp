"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/** Totais publicados pela Calculadora e consumidos por outras seções da
    apresentação (hoje: CTA, pra compor o "Total consolidado" imagens +
    plataforma). Vive em Context pra evitar prop drilling entre seções
    irmãs em page.tsx sem forçar um refactor de "lift state up" completo. */
export type CalcTotals = {
  imagensTotal: number;
  custoImagens: number;
};

const defaultTotals: CalcTotals = { imagensTotal: 0, custoImagens: 0 };

const CalculadoraContext = createContext<{
  totals: CalcTotals;
  setTotals: (t: CalcTotals) => void;
}>({
  totals: defaultTotals,
  setTotals: () => {},
});

export function CalculadoraProvider({ children }: { children: ReactNode }) {
  const [totals, setTotals] = useState<CalcTotals>(defaultTotals);
  return (
    <CalculadoraContext.Provider value={{ totals, setTotals }}>
      {children}
    </CalculadoraContext.Provider>
  );
}

export function useCalculadoraTotals() {
  return useContext(CalculadoraContext);
}
