"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ciclosCobranca,
  ciclosPlanoUnico,
  planos,
  planoUnico,
  type CicloCobranca,
  type Plano,
} from "./comercial.data";
import { precoComDesconto } from "./calc-shared";

/** Modelo de precificação exibido no CTA. `tres` = os 3 tiers históricos
    (default); `unico` = plano único com todos os módulos. Alternado só pelo
    painel escondido da Calculadora (Ctrl+Alt+K). */
export type ModoPlano = "tres" | "unico";

const planosDoModo = (m: ModoPlano): Plano[] => (m === "unico" ? planoUnico : planos);
const ciclosDoModo = (m: ModoPlano): CicloCobranca[] =>
  m === "unico" ? ciclosPlanoUnico : ciclosCobranca;

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
  /** Modelo de precificação em exibição + os planos/ciclos correspondentes. */
  modoPlano: ModoPlano;
  setModoPlano: (m: ModoPlano) => void;
  planosAtivos: Plano[];
  ciclosAtivos: CicloCobranca[];
  /** Array paralelo a `planosAtivos`, meses contratados em cada tier. Zera ao
      trocar de modo, já que a quantidade de planos muda. */
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
  modoPlano: "tres",
  setModoPlano: () => {},
  planosAtivos: planos,
  ciclosAtivos: ciclosCobranca,
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

  const [modoPlano, setModoPlanoState] = useState<ModoPlano>("tres");
  const planosAtivos = planosDoModo(modoPlano);
  const ciclosAtivos = ciclosDoModo(modoPlano);

  /* Cada mês num tier é cobrado pelo preço INTEIRO daquele plano (Plano 02 já
     inclui Planner, Plano 03 já inclui os anteriores — sem preço aditivo). */
  const [meses, setMeses] = useState<number[]>(() => planos.map(() => 0));

  /* Ciclo de cobrança selecionado — o desconto reduz o preço mensal exibido e
     alimenta o simulador + total consolidado. Default: Mensal (0%). */
  const [ciclo, setCiclo] = useState<CicloCobranca>(ciclosCobranca[0]);

  /* Trocar de modelo rezera o simulador: a quantidade de planos muda (3 ↔ 1) e
     o ciclo ativo pode não existir na outra lista (ex: Trimestral → plano
     único). Sem isso, `meses` ficaria dessincronizado de `planosAtivos`. */
  const setModoPlano = useCallback((m: ModoPlano) => {
    setModoPlanoState(m);
    setMeses(planosDoModo(m).map(() => 0));
    setCiclo(ciclosDoModo(m)[0]);
  }, []);

  const custoPlataforma = useMemo(
    () =>
      meses.reduce(
        (acc, m, i) => acc + m * precoComDesconto(planosAtivos[i]?.precoMes ?? 0, ciclo.desconto),
        0,
      ),
    [meses, ciclo.desconto, planosAtivos],
  );
  const totalMeses = useMemo(() => meses.reduce((a, b) => a + b, 0), [meses]);
  const totalGeral = totals.custoImagens + custoPlataforma;

  const value = useMemo(
    () => ({
      totals,
      setTotals,
      modoPlano,
      setModoPlano,
      planosAtivos,
      ciclosAtivos,
      meses,
      setMeses,
      ciclo,
      setCiclo,
      custoPlataforma,
      totalMeses,
      totalGeral,
    }),
    [
      totals,
      modoPlano,
      setModoPlano,
      planosAtivos,
      ciclosAtivos,
      meses,
      ciclo,
      custoPlataforma,
      totalMeses,
      totalGeral,
    ],
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
