import { SolicitarDemoButton } from "@/components/demo-modal";
import { planos } from "./comercial.data";

export function CTA() {
  return (
    <section className="cm-section cta" id="cta" data-tone="dark" data-reveal-group="">
      <div className="cm-wrap">
        <div className="cm-head">
          <p className="tag reveal">Plano & contato</p>
          <h2 className="reveal">
            Um plano para <em>cada fase</em> do seu empreendimento.
          </h2>
          <p className="lead reveal">
            Fee mensal por empreendimento ativo. Módulos combinados conforme sua operação.
          </p>
        </div>

        <div className="planos">
          {planos.map((p) => (
            <article className={`plano reveal${p.destaque ? " destaque" : ""}`} key={p.n}>
              <span className="n">{p.n}</span>
              <ul>
                {p.itens.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="preco">
                {p.preco}
                <span className="un">por empreendimento</span>
              </div>
            </article>
          ))}
        </div>

        <p className="nota reveal">
          A contratação e desenvolvimento das imagens é realizada à parte com parceiros homologados pela Nuki.
        </p>

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
