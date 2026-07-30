"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildDefaultAmbientes,
  emptyImpacto,
  AMBIENTE_PRESETS,
  CALC_DEFAULTS,
  CALC_RANGES,
  CUSTOM_AMBIENTE_DEFAULTS,
  type AmbienteClasse,
  type AmbienteConfig,
  type AmbientePeso,
  type MetragemState,
} from "./comercial.data";
import { Stepper, useCountUp, currency, clamp } from "./calc-shared";
import { useCalculadoraTotals } from "./CalculadoraContext";

/* ============ TIPOS AUXILIARES ============ */

type Ambiente = {
  key: string;
  label: string;
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

function opcoesFor(classe: AmbienteClasse, opcoesSecas: number, opcoesMolh: number): number {
  return classe === "seca" ? opcoesSecas : opcoesMolh;
}

/** Rotula a n-ésima unidade de um ambiente. Se quantidade = 1, usa o nome
    inteiro (Sala, Cozinha, Home Office...). Se quantidade > 1, usa a
    primeira letra maiúscula + índice (Q1, Q2, B1, B2, S1...). */
function labelForUnit(a: AmbienteConfig, i: number): string {
  if (a.quantidade === 1) return a.nome;
  const first = a.nome.trim().charAt(0).toUpperCase() || "A";
  return `${first}${i}`;
}

function buildAmbientes(
  m: MetragemState,
  opcoesSecas: number,
  opcoesMolh: number,
): Ambiente[] {
  const list: Ambiente[] = [];
  m.ambientes.forEach((a) => {
    if (a.quantidade <= 0) return;
    const imgsPerUnit = a.componentes * opcoesFor(a.classe, opcoesSecas, opcoesMolh);
    for (let i = 1; i <= a.quantidade; i++) {
      list.push({
        key: a.quantidade === 1 ? a.id : `${a.id}-${i}`,
        label: labelForUnit(a, i),
        peso: a.peso,
        imagens: imgsPerUnit,
      });
    }
  });
  return list;
}

/** Constrói os tiles de "ambientes impactados" — 1 unidade por ambient
    marcado, na ordem em que aparecem na lista da metragem. É o que
    aparece nos cards de Variação 02+, representando o subset que muda
    entre variações. Usa os componentes definidos na config do ambient. */
function buildImpactados(
  m: MetragemState,
  opcoesSecas: number,
  opcoesMolh: number,
): Ambiente[] {
  return m.ambientes
    .filter((a) => m.impactoAmbientes[a.id])
    .map((a) => ({
      key: `impacto-${a.id}`,
      label: a.nome,
      peso: a.peso,
      imagens: a.componentes * opcoesFor(a.classe, opcoesSecas, opcoesMolh),
    }));
}

function calcularMetragem(
  m: MetragemState,
  opcoesSecas: number,
  opcoesMolh: number,
): MetragemCalc {
  const ambientes = buildAmbientes(m, opcoesSecas, opcoesMolh);
  const impactados = buildImpactados(m, opcoesSecas, opcoesMolh);
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

/* ============ COMPONENTE PRINCIPAL ============ */

/** UI de "+ Adicionar ambiente" tem 3 estados:
    - null: botão colapsado
    - picker: mostra os 5 chips de preset + "Personalizado"
    - custom: mostra o form de nome + classe (fluxo antigo) */
type AddingState =
  | null
  | { mode: "picker" }
  | { mode: "custom"; nome: string; classe: AmbienteClasse };

export function Calculadora() {
  const [opcoesSecas, setOpcoesSecas] = useState(CALC_DEFAULTS.opcoesSecas);
  const [opcoesMolhadas, setOpcoesMolhadas] = useState(CALC_DEFAULTS.opcoesMolhadas);
  const [precoPorImagem, setPrecoPorImagem] = useState(CALC_DEFAULTS.precoPorImagem);
  const [metragens, setMetragens] = useState<MetragemState[]>(() =>
    CALC_DEFAULTS.metragensIniciais(),
  );
  const [metragemAtiva, setMetragemAtiva] = useState(0);
  const [addingAmbiente, setAddingAmbiente] = useState<AddingState>(null);
  /** Painel escondido de config da apresentação. Toggle via Ctrl+Alt+K,
      fecha com ESC. Nunca visível ao cliente sem o atalho. */
  const [adminOpen, setAdminOpen] = useState(false);
  const nextIdRef = useRef(metragens.length + 1);
  const nextCustomIdRef = useRef(1);

  /* Listener global do atalho do painel escondido. Ctrl+Alt+K toggle, ESC
     fecha (só quando aberto — não intercepta ESC de outros contextos). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setAdminOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && adminOpen) {
        setAdminOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adminOpen]);

  const metragensCalc = metragens.map((m) => ({ m, calc: calcularMetragem(m, opcoesSecas, opcoesMolhadas) }));
  const imagensTotal = metragensCalc.reduce((a, { calc }) => a + calc.total, 0);
  const custoTotal = imagensTotal * precoPorImagem;

  const imagensDisplay = useCountUp(imagensTotal);
  const custoDisplay = useCountUp(custoTotal);

  const ativa = metragens[metragemAtiva];
  const ativaCalc = metragensCalc[metragemAtiva]?.calc;

  /* Publica os totais no context pra CTA compor o "Total consolidado".
     Sync intencional de estado derivado entre seções irmãs; alternativa
     seria lift-up completo do state da Calculadora — refactor grande demais. */
  const { setTotals } = useCalculadoraTotals();
  useEffect(() => {
    setTotals({ imagensTotal, custoImagens: custoTotal });
  }, [imagensTotal, custoTotal, setTotals]);

  /* ============ MUTATORS ============ */

  /* Selecionar outra metragem também fecha um eventual form de add-ambient
     aberto — evita que o form migre pra metragem errada sem intenção. */
  const selectMetragem = (idx: number) => {
    setMetragemAtiva(idx);
    setAddingAmbiente(null);
  };

  const updateAtiva = (patch: Partial<MetragemState>) => {
    setMetragens((prev) =>
      prev.map((m, i) => (i === metragemAtiva ? { ...m, ...patch } : m)),
    );
  };

  const updateAmbiente = (id: string, patch: Partial<AmbienteConfig>) => {
    setMetragens((prev) =>
      prev.map((m, i) =>
        i === metragemAtiva
          ? {
              ...m,
              ambientes: m.ambientes.map((a) => (a.id === id ? { ...a, ...patch } : a)),
            }
          : m,
      ),
    );
  };

  const removeAmbiente = (id: string) => {
    setMetragens((prev) =>
      prev.map((m, i) =>
        i === metragemAtiva
          ? {
              ...m,
              ambientes: m.ambientes.filter((a) => a.id !== id),
              impactoAmbientes: Object.fromEntries(
                Object.entries(m.impactoAmbientes).filter(([k]) => k !== id),
              ),
            }
          : m,
      ),
    );
  };

  /** Cria e insere um AmbienteConfig na metragem ativa a partir de
      {nome, classe} — usado tanto pelos presets quanto pelo custom form.
      Peso/quantidade/componentes vêm dos defaults; user edita nos controles
      do tile depois. */
  const addAmbient = (nome: string, classe: AmbienteClasse) => {
    const trimmed = nome.trim();
    if (!trimmed) return;
    const id = `custom-${nextCustomIdRef.current++}`;
    const novo: AmbienteConfig = {
      id,
      nome: trimmed,
      classe,
      peso: CUSTOM_AMBIENTE_DEFAULTS.peso,
      quantidade: CUSTOM_AMBIENTE_DEFAULTS.quantidade,
      componentes: CUSTOM_AMBIENTE_DEFAULTS.componentes,
    };
    setMetragens((prev) =>
      prev.map((m, i) =>
        i === metragemAtiva ? { ...m, ambientes: [...m.ambientes, novo] } : m,
      ),
    );
    setAddingAmbiente(null);
  };

  const confirmAddAmbiente = () => {
    if (addingAmbiente?.mode !== "custom") return;
    addAmbient(addingAmbiente.nome, addingAmbiente.classe);
  };

  const toggleImpacto = (id: string) => {
    setMetragens((prev) =>
      prev.map((m, i) =>
        i === metragemAtiva
          ? {
              ...m,
              impactoAmbientes: { ...m.impactoAmbientes, [id]: !m.impactoAmbientes[id] },
            }
          : m,
      ),
    );
  };

  /* Os guards de min/max rodam DENTRO do updater: `metragens.length` vem do
     closure do render, então cliques em sequência antes do commit leriam um
     length velho e furariam o teto (8 cliques rápidos = 9 metragens). */
  const addMetragem = () => {
    if (metragens.length >= CALC_RANGES.metragens.max) return;
    const id = nextIdRef.current++;
    const nova: MetragemState = {
      id,
      ambientes: buildDefaultAmbientes(),
      variacoes: 1,
      impactoAmbientes: emptyImpacto(),
    };
    setMetragens((prev) =>
      prev.length >= CALC_RANGES.metragens.max ? prev : [...prev, nova],
    );
    setMetragemAtiva(Math.min(metragens.length, CALC_RANGES.metragens.max - 1));
    setAddingAmbiente(null);
  };

  const removeMetragem = (idx: number) => {
    if (metragens.length <= CALC_RANGES.metragens.min) return;
    setMetragens((prev) =>
      prev.length <= CALC_RANGES.metragens.min ? prev : prev.filter((_, i) => i !== idx),
    );
    setMetragemAtiva((prev) => {
      if (prev > idx) return prev - 1;
      if (prev === idx) return Math.max(0, idx - 1);
      return prev;
    });
    setAddingAmbiente(null);
  };

  /* ============ JSX ============ */

  return (
    <>
      {adminOpen && (
        <div
          className="calc-admin-panel"
          role="dialog"
          aria-label="Configuração da apresentação"
        >
          <div className="calc-admin-header">
            <span className="calc-admin-title">Config apresentação</span>
            <button
              type="button"
              className="calc-admin-close"
              onClick={() => setAdminOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
          <div className="calc-admin-field">
            <label className="calc-admin-label" htmlFor="calc-admin-vpi">
              Valor por imagem (R$)
            </label>
            <input
              id="calc-admin-vpi"
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
            />
          </div>
          <p className="calc-admin-hint">Ctrl+Alt+K abre/fecha · ESC fecha</p>
        </div>
      )}
    <section className="cm-section calculadora" id="calculadora" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Estime o setup</p>
          <h2 className="reveal">
            Descubra quantas imagens seu empreendimento{" "}
            <em>vai precisar.</em>
          </h2>
          <p className="lead reveal">
            Configure cada metragem por ambiente — quantidade e componentes personalizáveis. Comece com quartos e banheiros e adicione o que faltar. A calculadora escala com o tamanho do seu catálogo de acabamentos.
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
                    onClick={() => selectMetragem(i)}
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
                <div className="calc-ambient-rows">
                  <p className="calc-label calc-ambient-rows-head">Ambientes personalizáveis</p>
                  {ativa.ambientes.map((a) => (
                    <AmbientRow
                      key={a.id}
                      ambiente={a}
                      onQuantidadeChange={(v) => updateAmbiente(a.id, { quantidade: v })}
                      onComponentesChange={(v) => updateAmbiente(a.id, { componentes: v })}
                      onRemove={() => removeAmbiente(a.id)}
                    />
                  ))}

                  <AddAmbienteControl
                    state={addingAmbiente}
                    onOpen={() => setAddingAmbiente({ mode: "picker" })}
                    onSelectPreset={(preset) => addAmbient(preset.nome, preset.classe)}
                    onSelectCustom={() =>
                      setAddingAmbiente({ mode: "custom", nome: "", classe: "molhada" })
                    }
                    onChange={(patch) =>
                      setAddingAmbiente((prev) =>
                        prev?.mode === "custom" ? { ...prev, ...patch } : prev,
                      )
                    }
                    onConfirm={confirmAddAmbiente}
                    onCancel={() => setAddingAmbiente(null)}
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
                        1 unidade de cada ambient marcado é re-renderizada por variação extra, usando os componentes configurados acima.
                      </p>
                    </div>
                    <div className="calc-axes-grid">
                      {ativa.ambientes.map((a) => (
                        <label key={a.id} className="calc-axis">
                          <input
                            type="checkbox"
                            checked={!!ativa.impactoAmbientes[a.id]}
                            onChange={() => toggleImpacto(a.id)}
                          />
                          <span className="calc-axis-box" aria-hidden="true" />
                          <span className="calc-axis-title">{a.nome}</span>
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
                  onSelect={() => selectMetragem(mIdx)}
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
              {metragens.length} {metragens.length === 1 ? "metragem" : "metragens"} · escala {opcoesSecas}/{opcoesMolhadas} opções por componente (secas/molhadas).
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
    </>
  );
}

/* ============ SUB-COMPONENTES ============ */

function AmbientRow({
  ambiente,
  onQuantidadeChange,
  onComponentesChange,
  onRemove,
}: {
  ambiente: AmbienteConfig;
  onQuantidadeChange: (v: number) => void;
  onComponentesChange: (v: number) => void;
  onRemove: () => void;
}) {
  const zerada = ambiente.quantidade <= 0;
  return (
    <div className={`calc-ambient-row${zerada ? " zerada" : ""}`}>
      <span className="calc-ambient-row-name">
        {ambiente.nome}
        {!ambiente.locked && (
          <span className="calc-ambient-row-classe" aria-label={`Classificação: ${ambiente.classe}`}>
            {ambiente.classe === "seca" ? "seca" : "molhada"}
          </span>
        )}
      </span>
      <div className="calc-ambient-row-fields">
        <div className="calc-micro-field">
          <span className="calc-micro-label">unidades</span>
          <Stepper
            value={ambiente.quantidade}
            min={CALC_RANGES.quantidade.min}
            max={CALC_RANGES.quantidade.max}
            onChange={onQuantidadeChange}
            ariaLabel={`Unidades de ${ambiente.nome}`}
          />
        </div>
        <div className="calc-micro-field">
          <span className="calc-micro-label">componentes</span>
          <Stepper
            value={ambiente.componentes}
            min={CALC_RANGES.componentes.min}
            max={CALC_RANGES.componentes.max}
            onChange={onComponentesChange}
            ariaLabel={`Componentes por ${ambiente.nome}`}
          />
        </div>
        {!ambiente.locked && (
          <button
            type="button"
            className="calc-ambient-remove"
            onClick={onRemove}
            aria-label={`Remover ${ambiente.nome}`}
            title={`Remover ${ambiente.nome}`}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

function AddAmbienteControl({
  state,
  onOpen,
  onSelectPreset,
  onSelectCustom,
  onChange,
  onConfirm,
  onCancel,
}: {
  state: AddingState;
  onOpen: () => void;
  onSelectPreset: (preset: (typeof AMBIENTE_PRESETS)[number]) => void;
  onSelectCustom: () => void;
  onChange: (patch: Partial<{ nome: string; classe: AmbienteClasse }>) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (state === null) {
    return (
      <button type="button" className="calc-add-ambient-btn" onClick={onOpen}>
        + Adicionar ambiente
      </button>
    );
  }

  /* Passo 1: picker com os 5 presets + opção "Personalizado" que abre o
     form de nome livre. Clicar num preset já adiciona o ambient. */
  if (state.mode === "picker") {
    return (
      <div className="calc-add-ambient-picker" role="group" aria-label="Escolher ambiente">
        <p className="calc-add-ambient-picker-label">Escolha um ambiente:</p>
        <div className="calc-add-ambient-preset-list">
          {AMBIENTE_PRESETS.map((preset) => (
            <button
              key={preset.nome}
              type="button"
              className={`calc-add-ambient-preset calc-add-ambient-preset-${preset.classe}`}
              onClick={() => onSelectPreset(preset)}
            >
              <span className="calc-add-ambient-preset-nome">{preset.nome}</span>
              <span className="calc-add-ambient-preset-classe">
                {preset.classe === "seca" ? "seca" : "molhada"}
              </span>
            </button>
          ))}
          <button
            type="button"
            className="calc-add-ambient-preset calc-add-ambient-preset-custom"
            onClick={onSelectCustom}
          >
            <span className="calc-add-ambient-preset-nome">+ Personalizado</span>
          </button>
        </div>
        <button type="button" className="calc-add-ambient-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    );
  }

  /* Passo 2 (só se user escolheu "Personalizado"): form de nome + classe. */
  const canConfirm = state.nome.trim().length > 0;
  return (
    <div className="calc-add-ambient-form" role="group" aria-label="Adicionar ambiente personalizado">
      <input
        type="text"
        className="calc-add-ambient-input"
        placeholder="Nome do ambiente (ex: Home Office)"
        value={state.nome}
        onChange={(e) => onChange({ nome: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter" && canConfirm) onConfirm();
          if (e.key === "Escape") onCancel();
        }}
        autoFocus
        maxLength={40}
      />
      <div className="calc-add-ambient-classe" role="radiogroup" aria-label="Classificação">
        <button
          type="button"
          role="radio"
          aria-checked={state.classe === "seca"}
          className={`calc-pill${state.classe === "seca" ? " on" : ""}`}
          onClick={() => onChange({ classe: "seca" })}
        >
          Seca
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={state.classe === "molhada"}
          className={`calc-pill${state.classe === "molhada" ? " on" : ""}`}
          onClick={() => onChange({ classe: "molhada" })}
        >
          Molhada
        </button>
      </div>
      <div className="calc-add-ambient-actions">
        <button
          type="button"
          className="calc-add-ambient-confirm"
          onClick={onConfirm}
          disabled={!canConfirm}
        >
          Adicionar
        </button>
        <button type="button" className="calc-add-ambient-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

function MetragemGroup({
  index,
  metragem,
  calc,
  ativa,
  onSelect,
}: {
  index: number;
  metragem: MetragemState;
  calc: MetragemCalc;
  ativa: boolean;
  onSelect: () => void;
}) {
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };
  return (
    <div
      className={`metragem-group${ativa ? " ativa" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={ativa}
      aria-label={`Editar Metragem ${String(index + 1).padStart(2, "0")}`}
      onClick={onSelect}
      onKeyDown={handleKey}
    >
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
        <p className="tipologia-empty">
          {isBase
            ? "Nenhum ambiente adicionado. Suba as unidades acima."
            : "Nenhum ambiente marcado como impactado."}
        </p>
      )}
    </article>
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
