"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ciclosCobranca, planos, type CicloCobranca } from "./comercial.data";
import { precoComDesconto } from "./calc-shared";

/** Totais publicados pela Calculadora e consumidos por outras seções da
    apresentação (hoje: TotalEstimado, pra compor o "Total consolidado" imagens +
    plataforma). Vive em Context pra evitar prop drilling entre seções
    irmãs em page.tsx sem forçar um refactor de "lift state up" completo. */
export type CalcTotals = {
  imagensTotal: number;
  custoImagens: number;
};

const defaultTotals: CalcTotals = { imagensTotal: 0, custoImagens: 0 };

/** Simulador de planos: meses por tier + ciclo de cobrança. Mora aqui (e não no
    CTA) porque o CTA edita esses valores enquanto o TotalEstimado — que virou
    seção separada, depois da Calculadora — só lê os derivados. */
type PlanoSimulador = {
  /** Array paralelo a `planos`, meses contratados em cada plano. */
  meses: number[];
  setMeses: (updater: (prev: number[]) => number[]) => void;
  ciclo: CicloCobranca;
  setCiclo: (c: CicloCobranca) => void;
  /** Σ meses × preço mensal do tier já com o desconto do ciclo. */
  custoPlataforma: number;
  /** Σ meses de todos os tiers — alimenta o hint "N meses de operação Nuki". */
  totalMeses: number;
  /** custoImagens (Calculadora) + custoPlataforma. */
  totalGeral: number;
};

const CalculadoraContext = createContext<
  {
    totals: CalcTotals;
    setTotals: (t: CalcTotals) => void;
  } & PlanoSimulador
>({
  totals: defaultTotals,
  setTotals: () => {},
  meses: [],
  setMeses: () => {},
  ciclo: ciclosCobranca[0],
  setCiclo: () => {},
  custoPlataforma: 0,
  totalMeses: 0,
  totalGeral: 0,
});

export function CalculadoraProvider({ children }: { children: ReactNode }) {
  const [totals, setTotals] = useState<CalcTotals>(defaultTotals);

  /* Meses contratados por plano — começa em 0 (o user preenche no CTA). */
  const [meses, setMeses] = useState<number[]>(() => planos.map(() => 0));

  /* Ciclo de cobrança selecionado — o desconto reduz o preço mensal exibido e
     alimenta o simulador + total consolidado. Default: Mensal (0%). */
  const [ciclo, setCiclo] = useState<CicloCobranca>(ciclosCobranca[0]);

  const custoPlataforma = useMemo(
    () =>
      meses.reduce(
        (acc, m, i) => acc + m * precoComDesconto(planos[i]?.precoMes ?? 0, ciclo.desconto),
        0,
      ),
    [meses, ciclo.desconto],
  );
  const totalMeses = useMemo(() => meses.reduce((a, b) => a + b, 0), [meses]);
  const totalGeral = totals.custoImagens + custoPlataforma;

  const value = useMemo(
    () => ({
      totals,
      setTotals,
      meses,
      setMeses,
      ciclo,
      setCiclo,
      custoPlataforma,
      totalMeses,
      totalGeral,
    }),
    [totals, meses, ciclo, custoPlataforma, totalMeses, totalGeral],
  );

  return (
    <CalculadoraContext.Provider value={value}>{children}</CalculadoraContext.Provider>
  );
}

export function useCalculadoraTotals() {
  return useContext(CalculadoraContext);
}

/** Açúcar semântico pro CTA e pro TotalEstimado — mesmo Context, nome que diz
    o que a seção está de fato consumindo. */
export function usePlanoSimulador() {
  return useContext(CalculadoraContext);
}
