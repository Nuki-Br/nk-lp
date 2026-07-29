"use client";

import { useCountUp, currency } from "./calc-shared";
import { usePlanoSimulador } from "./CalculadoraContext";

/**
 * Frame de fechamento da apresentação — consolida o que o prospect configurou
 * nas duas seções anteriores: o setup de imagens (`#calculadora`) e os meses de
 * plataforma por tier (`#cta`). Só lê; nada é editável aqui.
 *
 * Vive depois da Calculadora de propósito: é a última coisa antes do footer, e
 * o gradiente da seção costura o branco da Calculadora com o cinza do footer.
 */
export function TotalEstimado() {
  const { totals, custoPlataforma, totalMeses, totalGeral } = usePlanoSimulador();

  const custoImagensDisplay = useCountUp(totals.custoImagens);
  const custoPlataformaDisplay = useCountUp(custoPlataforma);
  const totalGeralDisplay = useCountUp(totalGeral);

  return (
    <section className="cm-section total-estimado" id="total" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Total estimado</p>
          <h2 className="reveal">
            O investimento completo do seu <em>empreendimento.</em>
          </h2>
        </div>

        <div
          className="total-estimado-card reveal"
          aria-label="Total estimado do empreendimento"
        >
          <div className="total-estimado-grid">
            <div className="total-estimado-line">
              <span className="total-estimado-line-label">Setup de imagens</span>
              <span className="total-estimado-line-value">
                {currency(custoImagensDisplay)}
              </span>
              <span className="total-estimado-line-hint">
                {totals.imagensTotal.toLocaleString("pt-BR")} imagens estimadas
              </span>
            </div>
            <div className="total-estimado-line">
              <span className="total-estimado-line-label">Plataforma</span>
              <span className="total-estimado-line-value">
                {currency(custoPlataformaDisplay)}
              </span>
              <span className="total-estimado-line-hint">
                {totalMeses === 0
                  ? "configure os meses em Plano & contato"
                  : `${totalMeses} ${totalMeses === 1 ? "mês" : "meses"} de operação Nuki`}
              </span>
            </div>
            <div className="total-estimado-total">
              <span className="total-estimado-total-label">Total</span>
              <span className="total-estimado-total-value">
                {currency(totalGeralDisplay)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
