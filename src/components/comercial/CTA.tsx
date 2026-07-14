"use client";

import { useState } from "react";
import { SolicitarDemoButton } from "@/components/demo-modal";
import { planos, ciclosCobranca } from "./comercial.data";
import { Stepper, useCountUp, currency } from "./calc-shared";
import { useCalculadoraTotals } from "./CalculadoraContext";

const MESES_MAX = 24;

/** Preço mensal do plano já com o desconto do ciclo aplicado, arredondado. */
const precoComDesconto = (precoMes: number, desconto: number) =>
  Math.round(precoMes * (1 - desconto));

export function CTA() {
  /* Meses por plano — array paralelo ao `planos`, começa em 0 (user preenche).
     Cada mês num tier é cobrado pelo preço INTEIRO daquele plano (Plano 02 já
     inclui Planner, Plano 03 já inclui os anteriores — sem preço aditivo). */
  const [meses, setMeses] = useState<number[]>(() => planos.map(() => 0));

  /* Ciclo de cobrança selecionado — o desconto reduz o preço mensal exibido e
     alimenta o simulador + total consolidado. Default: Mensal (0%). */
  const [ciclo, setCiclo] = useState(ciclosCobranca[0]);

  const { totals } = useCalculadoraTotals();

  const custoPlataforma = meses.reduce(
    (acc, m, i) => acc + m * precoComDesconto(planos[i].precoMes, ciclo.desconto),
    0,
  );
  const totalMeses = meses.reduce((a, b) => a + b, 0);
  const totalGeral = totals.custoImagens + custoPlataforma;

  const custoPlataformaDisplay = useCountUp(custoPlataforma);
  const totalGeralDisplay = useCountUp(totalGeral);
  const custoImagensDisplay = useCountUp(totals.custoImagens);

  const updateMeses = (idx: number, v: number) => {
    setMeses((prev) => prev.map((m, i) => (i === idx ? v : m)));
  };

  return (
    <section className="cm-section cta" id="cta" data-tone="dark" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Plano & contato</p>
          <h2 className="reveal">
            Um plano para <em>cada fase</em> do seu empreendimento.
          </h2>
          <p className="lead reveal">
            Fee mensal por empreendimento ativo. Simule quantos meses o empreendimento fica em cada tier — a Nuki cobra por período em cada plano.
          </p>
        </div>

        <div className="ciclo-toggle reveal" role="tablist" aria-label="Ciclo de cobrança">
          {ciclosCobranca.map((c) => (
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

        <div className="planos">
          {planos.map((p, i) => {
            const precoMesFinal = precoComDesconto(p.precoMes, ciclo.desconto);
            const subtotal = meses[i] * precoMesFinal;
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
                  <span className="cta-plano-simulador-label">Meses neste plano</span>
                  <Stepper
                    value={meses[i]}
                    min={0}
                    max={MESES_MAX}
                    onChange={(v) => updateMeses(i, v)}
                    ariaLabel={`Meses no ${p.n}`}
                  />
                  <span className={`cta-plano-simulador-sub${meses[i] > 0 ? " on" : ""}`}>
                    {meses[i] > 0 ? currency(subtotal) : "—"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <p className="nota reveal">
          A contratação e desenvolvimento das imagens é realizada à parte com parceiros homologados pela Nuki.
        </p>

        {/* ============ TOTAL CONSOLIDADO ============ */}
        <div className="cta-consolidado reveal" aria-label="Total estimado do empreendimento">
          <div className="cta-consolidado-head">
            <span className="cta-consolidado-tag">Total estimado do empreendimento</span>
          </div>
          <div className="cta-consolidado-grid">
            <div className="cta-consolidado-line">
              <span className="cta-consolidado-line-label">Setup de imagens</span>
              <span className="cta-consolidado-line-value">
                {currency(custoImagensDisplay)}
              </span>
              <span className="cta-consolidado-line-hint">
                {totals.imagensTotal.toLocaleString("pt-BR")} imagens · parceiro homologado
              </span>
            </div>
            <div className="cta-consolidado-line">
              <span className="cta-consolidado-line-label">Plataforma</span>
              <span className="cta-consolidado-line-value">
                {currency(custoPlataformaDisplay)}
              </span>
              <span className="cta-consolidado-line-hint">
                {totalMeses === 0
                  ? "configure os meses acima"
                  : `${totalMeses} ${totalMeses === 1 ? "mês" : "meses"} de operação Nuki`}
              </span>
            </div>
            <div className="cta-consolidado-total">
              <span className="cta-consolidado-total-label">Total</span>
              <span className="cta-consolidado-total-value">
                {currency(totalGeralDisplay)}
              </span>
            </div>
          </div>
        </div>

        <div className="contatos reveal">
          <a href="mailto:contato@nukibr.com">contato@nukibr.com</a>
          <a href="https://wa.me/551531994490" target="_blank" rel="noopener noreferrer">
            +55 15 3199-4490
          </a>
          <a href="https://www.nukibr.com" target="_blank" rel="noopener noreferrer">
            www.nukibr.com
          </a>
          <div className="demo">
            <SolicitarDemoButton className="inline-flex items-center justify-center rounded-full bg-nuki-branco px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-preto transition-colors hover:bg-nuki-verde-suave">
              Solicitar demo
            </SolicitarDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
