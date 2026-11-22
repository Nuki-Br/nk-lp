"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/** Totais publicados pela Calculadora e consumidos por outras seções da
    apresentação (hoje: TotalEstimado, o frame de fechamento). Vive em Context
    pra evitar prop drilling entre seções irmãs em page.tsx sem forçar um
    refactor de "lift state up" completo. */
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
  const value = useMemo(() => ({ totals, setTotals }), [totals]);

  return (
    <CalculadoraContext.Provider value={value}>{children}</CalculadoraContext.Provider>
  );
}

export function useCalculadoraTotals() {
  return useContext(CalculadoraContext);
}
