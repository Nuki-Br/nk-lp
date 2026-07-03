"use client";

import { useEffect, useRef, useState } from "react";
import {
  TECER_BASE,
  AMBIENTES_SECAS,
  AMBIENTE_PESO,
  AMBIENTE_LABEL,
  AMBIENTE_ORDEM,
  OPCOES_BASELINE,
  emptyImpacto,
  CALC_DEFAULTS,
  CALC_RANGES,
  type AmbienteTipo,
  type AmbientePeso,
  type MetragemState,
} from "./comercial.data";

/* ============ TIPOS AUXILIARES ============ */

type Ambiente = {
  key: string;
  label: string;
  tipo: AmbienteTipo;
  peso: AmbientePeso;
  imagens: number;
};

type MetragemCalc = {
  /** Composição completa da metragem — os tiles da Variação 01 */
  ambientes: Ambiente[];
  /** Subset re-renderizado a cada variação extra — os tiles da Variação 02+ */
  impactados: Ambiente[];
  /** Imgs da composição base (Var 01) */
  base: number;
  /** Imgs re-renderizadas por variação extra (soma dos impactados) */
  extrasPorVariacao: number;
  /** Imgs de todas as variações extras somadas */
  extrasTotal: number;
  /** Total da metragem (base + extrasTotal) */
  total: number;
};

/* ============ HELPERS DE CÁLCULO ============ */

function imgsAmbiente(tipo: AmbienteTipo, scaleSecas: number, scaleMolh: number): number {
  const scale = AMBIENTES_SECAS.has(tipo) ? scaleSecas : scaleMolh;
  return Math.round(TECER_BASE[tipo] * scale);
}

function buildAmbientes(
  m: MetragemState,
  scaleSecas: number,
  scaleMolh: number,
): Ambiente[] {
  const mk = (key: string, label: string, tipo: AmbienteTipo): Ambiente => ({
    key,
    label,
    tipo,
    peso: AMBIENTE_PESO[tipo],
    imagens: imgsAmbiente(tipo, scaleSecas, scaleMolh),
  });

  const list: Ambiente[] = [
    mk("sala", "Sala", "sala"),
    mk("cozinha", "Cozinha", "cozinha"),
    mk("lavanderia", "Lavanderia", "lavanderia"),
    mk("varanda", "Varanda", "varanda"),
  ];
  if (m.lavabo) list.push(mk("lavabo", "Lavabo", "lavabo"));
  if (m.escritorio) list.push(mk("escritorio", "Escritório", "escritorio"));
  for (let i = 1; i <= m.dormitorios; i++) list.push(mk(`dorm-${i}`, `Q${i}`, "dormitorio"));
  for (let i = 1; i <= m.banheiros; i++) list.push(mk(`banho-${i}`, `B${i}`, "banho"));
  return list;
}

/** Constrói os tiles de "ambientes impactados" — 1 unidade por tipo marcado,
    na ordem oficial de leitura (AMBIENTE_ORDEM). É o que aparece nos cards
    de Variação 02+, representando o subset que muda entre variações. */
function buildImpactados(
  m: MetragemState,
  scaleSecas: number,
  scaleMolh: number,
): Ambiente[] {
  return AMBIENTE_ORDEM.filter((tipo) => m.impactoAmbientes[tipo]).map((tipo) => ({
    key: `impacto-${tipo}`,
    label: AMBIENTE_LABEL[tipo],
    tipo,
    peso: AMBIENTE_PESO[tipo],
    imagens: imgsAmbiente(tipo, scaleSecas, scaleMolh),
  }));
}

function calcularMetragem(
  m: MetragemState,
  scaleSecas: number,
  scaleMolh: number,
): MetragemCalc {
  const ambientes = buildAmbientes(m, scaleSecas, scaleMolh);
  const impactados = buildImpactados(m, scaleSecas, scaleMolh);
  const base = ambientes.reduce((acc, a) => acc + a.imagens, 0);
  const extrasPorVariacao = impactados.reduce((acc, a) => acc + a.imagens, 0);
  const extrasTotal = (m.variacoes - 1) * extrasPorVariacao;
  return {
    ambientes,
    impactados,
    base,
    extrasPorVariacao,
    extrasTotal,
    total: base + extrasTotal,
  };
}

/* ============ HOOKS ============ */

/** Animação de contagem — parte do valor atualmente exibido (não do último
    target). Se o user mexer rápido, retoma de onde está, sem teleporte. */
function useCountUp(value: number, durationMs = 450): number {
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

const currency = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/* ============ COMPONENTE PRINCIPAL ============ */

export function Calculadora() {
  const [opcoesSecas, setOpcoesSecas] = useState(CALC_DEFAULTS.opcoesSecas);
  const [opcoesMolhadas, setOpcoesMolhadas] = useState(CALC_DEFAULTS.opcoesMolhadas);
  const [precoPorImagem, setPrecoPorImagem] = useState(CALC_DEFAULTS.precoPorImagem);
  const [metragens, setMetragens] = useState<MetragemState[]>(() =>
    CALC_DEFAULTS.metragensIniciais(),
  );
  const [metragemAtiva, setMetragemAtiva] = useState(0);
  const nextIdRef = useRef(metragens.length + 1);

  const scaleSecas = opcoesSecas / OPCOES_BASELINE;
  const scaleMolh = opcoesMolhadas / OPCOES_BASELINE;

  const metragensCalc = metragens.map((m) => ({ m, calc: calcularMetragem(m, scaleSecas, scaleMolh) }));
  const imagensTotal = metragensCalc.reduce((a, { calc }) => a + calc.total, 0);
  const custoTotal = imagensTotal * precoPorImagem;

  const imagensDisplay = useCountUp(imagensTotal);
  const custoDisplay = useCountUp(custoTotal);

  const ativa = metragens[metragemAtiva];
  const ativaCalc = metragensCalc[metragemAtiva]?.calc;

  /* ============ MUTATORS ============ */

  const updateAtiva = (patch: Partial<MetragemState>) => {
    setMetragens((prev) =>
      prev.map((m, i) => (i === metragemAtiva ? { ...m, ...patch } : m)),
    );
  };

  const toggleImpacto = (tipo: AmbienteTipo) => {
    setMetragens((prev) =>
      prev.map((m, i) =>
        i === metragemAtiva
          ? {
              ...m,
              impactoAmbientes: { ...m.impactoAmbientes, [tipo]: !m.impactoAmbientes[tipo] },
            }
          : m,
      ),
    );
  };

  const addMetragem = () => {
    if (metragens.length >= CALC_RANGES.metragens.max) return;
    const id = nextIdRef.current++;
    const nova: MetragemState = {
      id,
      dormitorios: 3,
      banheiros: 2,
      lavabo: false,
      escritorio: false,
      variacoes: 1,
      impactoAmbientes: emptyImpacto(),
    };
    setMetragens((prev) => [...prev, nova]);
    setMetragemAtiva(metragens.length);
  };

  const removeMetragem = (idx: number) => {
    if (metragens.length <= CALC_RANGES.metragens.min) return;
    setMetragens((prev) => prev.filter((_, i) => i !== idx));
    setMetragemAtiva((prev) => {
      if (prev > idx) return prev - 1;
      if (prev === idx) return Math.max(0, idx - 1);
      return prev;
    });
  };

  /* ============ JSX ============ */

  return (
    <section className="cm-section calculadora" id="calculadora" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Estime o setup</p>
          <h2 className="reveal">
            Descubra quantas imagens seu empreendimento{" "}
            <em>vai precisar.</em>
          </h2>
          <p className="lead reveal">
            Configure metragens, composição e variações. A calculadora escala com o tamanho do seu catálogo de acabamentos e mostra a operação estimada com um parceiro homologado.
          </p>
        </div>

        <div className="calc-grid reveal">
          {/* ============ INPUTS ============ */}
          <div className="calc-inputs">
            {/* Bar global */}
            <div className="calc-global-bar">
              <div className="calc-field">
                <label className="calc-label calc-label-sm">Opções por componente · secas</label>
                <Stepper
                  value={opcoesSecas}
                  min={CALC_RANGES.opcoesSecas.min}
                  max={CALC_RANGES.opcoesSecas.max}
                  onChange={setOpcoesSecas}
                  ariaLabel="Opções por componente em áreas secas"
                />
              </div>
              <div className="calc-field">
                <label className="calc-label calc-label-sm">Opções por componente · molhadas</label>
                <Stepper
                  value={opcoesMolhadas}
                  min={CALC_RANGES.opcoesMolhadas.min}
                  max={CALC_RANGES.opcoesMolhadas.max}
                  onChange={setOpcoesMolhadas}
                  ariaLabel="Opções por componente em áreas molhadas"
                />
              </div>
              <div className="calc-field">
                <label className="calc-label calc-label-sm">Valor por imagem</label>
                <div className="calc-money">
                  <span className="calc-money-prefix">R$</span>
                  <input
                    type="number"
                    min={CALC_RANGES.precoPorImagem.min}
                    max={CALC_RANGES.precoPorImagem.max}
                    step={1}
                    value={precoPorImagem}
                    onChange={(e) =>
                      setPrecoPorImagem(
                        clamp(
                          parseInt(e.target.value, 10) || 1,
                          CALC_RANGES.precoPorImagem.min,
                          CALC_RANGES.precoPorImagem.max,
                        ),
                      )
                    }
                    aria-label="Valor por imagem em reais"
                  />
                </div>
              </div>
            </div>

            {/* Tabs de metragens */}
            <div className="calc-metragem-tabs" role="tablist" aria-label="Metragens do empreendimento">
              {metragens.map((m, i) => (
                <div
                  key={m.id}
                  className={`calc-metragem-tab${i === metragemAtiva ? " on" : ""}`}
                  role="tab"
                  aria-selected={i === metragemAtiva}
                >
                  <button
                    type="button"
                    className="calc-metragem-tab-btn"
                    onClick={() => setMetragemAtiva(i)}
                  >
                    Metragem {String(i + 1).padStart(2, "0")}
                  </button>
                  {metragens.length > CALC_RANGES.metragens.min && (
                    <button
                      type="button"
                      className="calc-metragem-tab-x"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMetragem(i);
                      }}
                      aria-label={`Remover metragem ${i + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {metragens.length < CALC_RANGES.metragens.max && (
                <button
                  type="button"
                  className="calc-metragem-add"
                  onClick={addMetragem}
                  aria-label="Adicionar metragem"
                >
                  + Adicionar
                </button>
              )}
            </div>

            {/* Painel da metragem ativa */}
            {ativa && (
              <div className="calc-metragem-panel">
                <div className="calc-field">
                  <label className="calc-label">Dormitórios</label>
                  <Stepper
                    value={ativa.dormitorios}
                    min={CALC_RANGES.dormitorios.min}
                    max={CALC_RANGES.dormitorios.max}
                    onChange={(v) => updateAtiva({ dormitorios: v })}
                    ariaLabel="Dormitórios"
                  />
                </div>

                <div className="calc-field">
                  <label className="calc-label">Banheiros</label>
                  <Stepper
                    value={ativa.banheiros}
                    min={CALC_RANGES.banheiros.min}
                    max={CALC_RANGES.banheiros.max}
                    onChange={(v) => updateAtiva({ banheiros: v })}
                    ariaLabel="Banheiros"
                  />
                </div>

                <div className="calc-field calc-field-inline">
                  <label className="calc-label">Lavabo</label>
                  <Toggle
                    checked={ativa.lavabo}
                    onChange={(v) => updateAtiva({ lavabo: v })}
                    ariaLabel="Lavabo"
                  />
                </div>

                <div className="calc-field calc-field-inline">
                  <label className="calc-label">Escritório</label>
                  <Toggle
                    checked={ativa.escritorio}
                    onChange={(v) => updateAtiva({ escritorio: v })}
                    ariaLabel="Escritório"
                  />
                </div>

                <div className="calc-field">
                  <label className="calc-label">Variações desta metragem</label>
                  <div className="calc-pills calc-pills-wide" role="radiogroup" aria-label="Variações">
                    {[1, 2, 3].map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={n === ativa.variacoes}
                        className={`calc-pill${n === ativa.variacoes ? " on" : ""}`}
                        onClick={() => updateAtiva({ variacoes: n })}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {ativa.variacoes > 1 && (
                  <div className="calc-field calc-axes">
                    <div className="calc-axes-head">
                      <label className="calc-label">Ambientes impactados nas variações</label>
                      <p className="calc-axes-hint">
                        1 unidade de cada tipo marcado é re-renderizada por variação extra.
                      </p>
                    </div>
                    <div className="calc-axes-grid">
                      {AMBIENTE_ORDEM.map((tipo) => (
                        <label key={tipo} className="calc-axis">
                          <input
                            type="checkbox"
                            checked={!!ativa.impactoAmbientes[tipo]}
                            onChange={() => toggleImpacto(tipo)}
                          />
                          <span className="calc-axis-box" aria-hidden="true" />
                          <span className="calc-axis-title">{AMBIENTE_LABEL[tipo]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ============ VISUAL + OUTPUT ============ */}
          <div className="calc-visual">
            <div className="calc-cards">
              {metragensCalc.map(({ m, calc }, mIdx) => (
                <MetragemGroup
                  key={m.id}
                  index={mIdx}
                  metragem={m}
                  calc={calc}
                  ativa={mIdx === metragemAtiva}
                />
              ))}
            </div>

            <div className="calc-output">
              <div className="calc-out-block">
                <span className="calc-out-value">
                  {imagensDisplay.toLocaleString("pt-BR")}
                </span>
                <span className="calc-out-label">imagens necessárias</span>
              </div>
              <div className="calc-out-divider" aria-hidden="true" />
              <div className="calc-out-block">
                <span className="calc-out-value">{currency(custoDisplay)}</span>
                <span className="calc-out-label">operação com parceiro homologado</span>
              </div>
            </div>

            <aside className="calc-disclaimer" role="note" aria-label="Aviso sobre a estimativa">
              <span className="calc-disclaimer-icon" aria-hidden="true">
                <InfoIcon />
              </span>
              <div className="calc-disclaimer-body">
                <p className="calc-disclaimer-title">Este valor é uma aproximação</p>
                <p className="calc-disclaimer-text">
                  A estimativa serve como referência inicial pra dimensionar o esforço da operação de imagens. O orçamento oficial só é fechado no momento da contratação da geração das imagens com um parceiro homologado (arquiteto ou escritório), quando são consideradas as particularidades reais do empreendimento e do catálogo de acabamentos.
                </p>
              </div>
            </aside>

            <p className="calc-note">
              {metragens.length} {metragens.length === 1 ? "metragem" : "metragens"} · escala {opcoesSecas}/{opcoesMolhadas} opções por componente (secas/molhadas) · R$ {precoPorImagem} por imagem.
              {ativaCalc && (
                <>
                  {" "}
                  Metragem {String(metragemAtiva + 1).padStart(2, "0")}: {ativaCalc.base} base
                  {ativaCalc.extrasTotal > 0 && ` + ${ativaCalc.extrasTotal} das variações`}.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SUB-COMPONENTES ============ */

function MetragemGroup({
  index,
  metragem,
  calc,
  ativa,
}: {
  index: number;
  metragem: MetragemState;
  calc: MetragemCalc;
  ativa: boolean;
}) {
  return (
    <div className={`metragem-group${ativa ? " ativa" : ""}`}>
      <header className="metragem-group-head">
        <span className="metragem-group-idx">Metragem {String(index + 1).padStart(2, "0")}</span>
        <span className="metragem-group-imgs">{calc.total.toLocaleString("pt-BR")} imagens</span>
      </header>
      <div className="metragem-group-cards">
        {Array.from({ length: metragem.variacoes }, (_, v) => {
          const isBase = v === 0;
          return (
            <TipologiaCard
              key={v}
              variacaoIdx={v + 1}
              mode={isBase ? "base" : "extras"}
              ambientes={isBase ? calc.ambientes : calc.impactados}
              imagens={isBase ? calc.base : calc.extrasPorVariacao}
            />
          );
        })}
      </div>
    </div>
  );
}

function TipologiaCard({
  variacaoIdx,
  mode,
  ambientes,
  imagens,
}: {
  variacaoIdx: number;
  mode: "base" | "extras";
  ambientes: Ambiente[];
  imagens: number;
}) {
  const isBase = mode === "base";
  return (
    <article className={`tipologia-card tipologia-card-${mode}`} role="listitem">
      <header className="tipologia-head">
        <span className="tipologia-idx">
          Variação {String(variacaoIdx).padStart(2, "0")}
          {!isBase && <span className="tipologia-tag">apenas ambientes impactados</span>}
        </span>
        <span className="tipologia-imgs">
          {isBase ? "" : "+"}
          {imagens.toLocaleString("pt-BR")} imgs
        </span>
      </header>
      {ambientes.length > 0 ? (
        <div className="tipologia-grid">
          {ambientes.map((a) => (
            <div key={a.key} className={`ambient-tile peso-${a.peso}`}>
              <span className="ambient-label">{a.label}</span>
              <span className="ambient-imgs">{a.imagens}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="tipologia-empty">Nenhum ambiente marcado como impactado.</p>
      )}
    </article>
  );
}

function Stepper({
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

function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`calc-toggle${checked ? " on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="calc-toggle-thumb" />
    </button>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        fill="currentColor"
      />
    </svg>
  );
}
