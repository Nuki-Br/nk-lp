import { fluxoModulos } from "./comercial.data";

export function OQueEANuki() {
  return (
    <section className="cm-section o-que-e" id="o-que-e" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">O que é a Nuki</p>
          <h2 className="reveal">
            A camada de gestão de todo o ciclo de personalização —{" "}
            <em>em uma plataforma só.</em>
          </h2>
          <p className="lead reveal">
            A Nuki transforma um processo manual e fragmentado em um ciclo estruturado, integrado e escalável — da formação de custo do memorial à entrega validada em obra.
          </p>
        </div>

        <div className="fluxo reveal">
          {fluxoModulos.map((m) => (
            <div className="step" key={m.nome}>
              <span className="fase">{m.fase}</span>
              <span className="nome">{m.nome}</span>
              <p className="desc">{m.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
