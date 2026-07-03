import { problemaCards } from "./comercial.data";

export function Problema() {
  return (
    <section className="cm-section problema" id="problema" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">O problema</p>
          <h2 className="reveal">
            A personalização de unidades acontece hoje em três etapas —{" "}
            <em>manuais e desconectadas.</em>
          </h2>
          <p className="lead reveal">
            Cada etapa tem sua própria dor. E todas viraram um custo invisível dentro da construtora: retrabalho, risco jurídico e insatisfação do cliente.
          </p>
        </div>

        <div className="cards">
          {problemaCards.map((c) => (
            <article className="card reveal" key={c.step}>
              <span className="step">{c.step}</span>
              <h3>{c.titulo}</h3>
              <p>{c.descricao}</p>
              <p className="dor">{c.dor}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
