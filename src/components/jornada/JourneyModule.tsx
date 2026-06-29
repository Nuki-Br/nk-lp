import Link from "next/link";
import type {
  JourneyModuleData,
  JourneyShot,
  JourneyBeat,
  JourneyHighlight,
} from "./journey.data";

function Shot({ shot, eager }: { shot: JourneyShot; eager: boolean }) {
  const { base, kind, alt } = shot;
  const loading = eager ? undefined : "lazy";

  if (kind === "phone") {
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={`/jornada/${base}-320.webp 320w, /jornada/${base}-640.webp 640w`}
          sizes="(min-width:1143px) 320px, (min-width:821px) 28vw, 60vw"
        />
        <img
          className="device"
          src={`/jornada/${base}-320.png`}
          width={2160}
          height={3840}
          alt={alt}
          loading={loading}
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/jornada/${base}-740.webp 740w, /jornada/${base}-1480.webp 1480w`}
        sizes="(min-width:1544px) 740px, (min-width:821px) calc(50vw - 32px), 92vw"
      />
      <img
        className="device"
        src={`/jornada/${base}-740.png`}
        width={2560}
        height={1600}
        alt={alt}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
}

/** Bloco de texto de um passo (compartilhado pelos dois layouts). */
function StepText({
  beat,
  isLast,
  highlights,
  href,
}: {
  beat: JourneyBeat;
  isLast: boolean;
  highlights: JourneyHighlight[];
  href: string;
}) {
  return (
    <div className="beat-text">
      <h3 className="reveal">{beat.title}</h3>
      <p className="dsc reveal">{beat.description}</p>

      {isLast && (
        <>
          <div className="highlights">
            {highlights.map((h) => (
              <div className="hi reveal" key={h.label}>
                <span
                  className="num"
                  data-target={h.target}
                  data-prefix={h.prefix}
                  data-suffix={h.suffix}
                >
                  {(h.prefix ?? "") + h.target + (h.suffix ?? "")}
                </span>
                <span className="lbl">{h.label}</span>
              </div>
            ))}
          </div>
          <Link className="lnk reveal" href={href}>
            Saiba mais <i aria-hidden="true">→</i>
          </Link>
        </>
      )}
    </div>
  );
}

/** Layout padrão: cada passo é uma linha texto | imagem lado a lado. Renderizado
    full-width (fora do .wrap) para a imagem poder sangrar até a borda do viewport;
    o texto é realinhado à coluna da marca via padding no CSS. */
function BeatsLayout({ data }: { data: JourneyModuleData }) {
  return (
    <div className="beats">
      {data.beats.map((beat, i) => (
        <div className="beat" data-reveal-group="" key={beat.title}>
          <StepText
            beat={beat}
            isLast={i === data.beats.length - 1}
            highlights={data.highlights}
            href={data.saibaMaisHref}
          />
          <figure className="shot reveal">
            <Shot shot={beat.shot} eager={i === 0} />
          </figure>
        </div>
      ))}
    </div>
  );
}

/** Layout "vitrine de app": passos rolam à esquerda; um celular fica sticky à
    direita e a tela troca por passo (cross-fade, dirigido pelo JourneyScripts).
    No mobile (<=820px) o celular sticky some e cada passo mostra a tela inline. */
function DeviceLayout({ data }: { data: JourneyModuleData }) {
  return (
    <div className="device-grid">
      <div className="device-steps">
        {data.beats.map((beat, i) => (
          <div className="device-step" data-step={i} data-reveal-group="" key={beat.title}>
            <StepText
              beat={beat}
              isLast={i === data.beats.length - 1}
              highlights={data.highlights}
              href={data.saibaMaisHref}
            />
            <figure className="shot phone-inline reveal">
              <Shot shot={beat.shot} eager={false} />
            </figure>
          </div>
        ))}
      </div>

      <div className="device-col">
        <div className="device">
          <div className="device-screens">
            {data.beats.map((beat, i) => (
              <figure
                className={`device-screen${i === 0 ? " show" : ""}`}
                data-screen={i}
                key={beat.shot.base}
              >
                <Shot shot={beat.shot} eager={i === 0} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function JourneyModule({ data }: { data: JourneyModuleData }) {
  return (
    <section className={`module${data.reverse ? " alt reverse" : ""}`} id={data.id}>
      <span className="bgnum" data-parallax="-70" aria-hidden="true">
        {data.num}
      </span>
      <div className="wrap">
        <div className="head" data-reveal-group="">
          <p className="tag reveal">{data.tag}</p>
          <h2 className="reveal">{data.title}</h2>
        </div>

        {data.layout === "sticky-device" && <DeviceLayout data={data} />}
      </div>

      {data.layout !== "sticky-device" && <BeatsLayout data={data} />}
    </section>
  );
}
