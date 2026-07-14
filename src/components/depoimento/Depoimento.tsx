import Image from "next/image";

/**
 * Bloco de prova social da home — um depoimento de cliente logo antes do
 * carrossel de logos. Segue a linguagem visual das seções `.jornada`
 * (bg-nuki-cinza-claro, pearl decorativa, entrada via `.reveal`).
 *
 * TODO (marketing): trocar `depoimento` abaixo por uma citação REAL de cliente
 * com atribuição confirmada (nome, cargo e construtora — idealmente uma das já
 * exibidas no CarrosselLogos: Fibra / Patriani / Piemonte / Mampei). A frase
 * atual é um placeholder aprovado no plano, não uma citação real.
 */
const depoimento = {
  quote:
    "Tiramos a personalização da planilha e paramos de descobrir erro só na entrega. Hoje o processo é rastreável do orçamento à obra.",
  nome: "«Nome do cliente»",
  cargo: "«Cargo»",
  empresa: "«Construtora»",
};

export function Depoimento() {
  return (
    <section
      className="relative w-full overflow-hidden bg-nuki-cinza-claro"
      data-reveal-group=""
    >
      <Image
        src="/sobre-a-nuki/nuki_quadradinho_pearl 5.svg"
        alt=""
        width={240}
        height={240}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 opacity-60 blur-[1px]"
      />
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-8 px-6 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16">
        <span className="reveal rounded-full bg-nuki-verde-suave px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.6px] text-nuki-verde-02">
          Quem usa
        </span>
        <blockquote className="reveal text-balance text-[24px] font-extrabold leading-[32px] tracking-[0.1px] text-nuki-preto sm:text-[30px] sm:leading-[40px] md:text-[36px] md:leading-[46px]">
          “{depoimento.quote}”
        </blockquote>
        <figcaption className="reveal text-[14px] leading-6 tracking-[0.2px] text-nuki-cinza sm:text-[15px]">
          <span className="font-bold text-nuki-preto">{depoimento.nome}</span>
          {" — "}
          {depoimento.cargo}, {depoimento.empresa}
        </figcaption>
      </div>
    </section>
  );
}
