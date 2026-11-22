"use client";

import { useCountUp, currency } from "./calc-shared";
import { useCalculadoraTotals } from "./CalculadoraContext";

/**
 * Frame de fechamento da apresentação — consolida o que o prospect configurou
 * na seção anterior: o setup de imagens (`#calculadora`). Só lê; nada é
 * editável aqui.
 *
 * Vive depois da Calculadora de propósito: é a última coisa antes do footer, e
 * o gradiente da seção costura o branco da Calculadora com o cinza do footer.
 */
export function TotalEstimado() {
  const { totals } = useCalculadoraTotals();

  const custoImagensDisplay = useCountUp(totals.custoImagens);

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
            <div className="total-estimado-total">
              <span className="total-estimado-total-label">Total</span>
              <span className="total-estimado-total-value">
                {currency(custoImagensDisplay)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
