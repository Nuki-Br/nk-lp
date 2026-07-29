"use client";

import { Stepper, currency, precoComDesconto } from "./calc-shared";
import { usePlanoSimulador } from "./CalculadoraContext";

const MESES_MAX = 24;

export function CTA() {
  /* Meses/ciclo/modelo vivem no CalculadoraProvider — o CTA edita, a seção
     #total (TotalEstimado, depois da Calculadora) lê os derivados. Qual lista
     de planos e ciclos aparece depende do `modoPlano` (painel Ctrl+Alt+K). */
  const { meses, setMeses, ciclo, setCiclo, modoPlano, planosAtivos, ciclosAtivos } =
    usePlanoSimulador();
  const unico = modoPlano === "unico";

  const updateMeses = (idx: number, v: number) => {
    setMeses((prev) => prev.map((m, i) => (i === idx ? v : m)));
  };

  return (
    <section className="cm-section cta" id="cta" data-tone="dark" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Plano & contato</p>
          <h2 className="reveal">
            {unico ? (
              <>
                Todos os módulos em <em>um plano só</em>.
              </>
            ) : (
              <>
                Um plano para <em>cada fase</em> do seu empreendimento.
              </>
            )}
          </h2>
          <p className="lead reveal">
            {unico
              ? "Fee mensal por empreendimento ativo, com Planner, Personaliza e Inspetor inclusos desde o primeiro mês. Simule por quantos meses o empreendimento fica na plataforma."
              : "Fee mensal por empreendimento ativo. Simule quantos meses o empreendimento fica em cada tier — a Nuki cobra por período em cada plano."}
          </p>
        </div>

        <div className="ciclo-toggle reveal" role="tablist" aria-label="Ciclo de cobrança">
          {ciclosAtivos.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === ciclo.id}
              className={`ciclo-toggle-btn${c.id === ciclo.id ? " on" : ""}`}
              onClick={() => setCiclo(c)}
            >
              {c.label}
              {c.desconto > 0 && (
                <span className="ciclo-toggle-off">−{Math.round(c.desconto * 100)}%</span>
              )}
            </button>
          ))}
        </div>

        <div className={`planos${unico ? " is-unico" : ""}`}>
          {planosAtivos.map((p, i) => {
            const precoMesFinal = precoComDesconto(p.precoMes, ciclo.desconto);
            const subtotal = (meses[i] ?? 0) * precoMesFinal;
            return (
              <article className={`plano reveal${p.destaque ? " destaque" : ""}`} key={p.n}>
                <span className="n">{p.n}</span>
                <ul>
                  {p.itens.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <div className="preco">
                  {ciclo.desconto > 0 && (
                    <span className="preco-antigo">{currency(p.precoMes)}</span>
                  )}
                  <span className="preco-valor">{currency(precoMesFinal)}/mês</span>
                  <span className="un">
                    por empreendimento
                    {ciclo.desconto > 0 && (
                      <span className="preco-badge">
                        −{Math.round(ciclo.desconto * 100)}%
                      </span>
                    )}
                  </span>
                </div>
                <div className="cta-plano-simulador">
                  <span className="cta-plano-simulador-label">
                    {unico ? "Meses na plataforma" : "Meses neste plano"}
                  </span>
                  <Stepper
                    value={meses[i] ?? 0}
                    min={0}
                    max={MESES_MAX}
                    onChange={(v) => updateMeses(i, v)}
                    ariaLabel={`Meses no ${p.n}`}
                  />
                  <span className={`cta-plano-simulador-sub${(meses[i] ?? 0) > 0 ? " on" : ""}`}>
                    {(meses[i] ?? 0) > 0 ? currency(subtotal) : "—"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
