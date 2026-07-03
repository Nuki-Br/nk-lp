import { diferenciais } from "./comercial.data";

export function Diferenciais() {
  return (
    <section className="cm-section diferenciais" id="diferenciais" data-tone="dark" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Diferenciais</p>
          <h2 className="reveal">
            O que faz a Nuki ser <em>a escolha certa.</em>
          </h2>
          <p className="lead reveal">
            Seis pontos que separam a Nuki de qualquer solução parcial — ferramentas isoladas, planilhas ou build interno.
          </p>
        </div>

        <div className="grid">
          {diferenciais.map((d) => (
            <article className="item reveal" key={d.n}>
              <span className="n">{d.n}</span>
              <h3>{d.titulo}</h3>
              <p>{d.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
