const logos = [
  { name: "Direcional", file: "/carrossel-logos/direcional.png", width: 226, height: 30 },
  { name: "Pacaembu", file: "/carrossel-logos/pacaembu.svg", width: 192, height: 37 },
  { name: "MPD", file: "/carrossel-logos/mpd.png", width: 176, height: 48 },
  { name: "Plaenge", file: "/carrossel-logos/plaenge.png", width: 185, height: 40 },
];

export function CarrosselLogos() {
  return (
    <section className="w-full bg-nuki-verde-08">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-[108px] pt-6 pb-[88px]">
        <h3 className="text-center text-[24px] leading-8 tracking-[0.1px] text-nuki-branco">
          <span className="font-extrabold">Construtoras</span>
          <span className="font-normal"> que acreditam no nosso trabalho</span>
        </h3>
        <div className="flex w-full max-w-[1180px] items-center justify-between">
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.file}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
