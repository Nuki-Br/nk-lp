const logos = [
  { name: "Fibra", file: "/carrossel-logos/fibra-logo.png", width: 226, height: 30 },
  { name: "Patriani", file: "/carrossel-logos/patriani-logo.png", width: 226, height: 37 },
  { name: "Piemonte", file: "/carrossel-logos/piemonte-logo.png", width: 226, height: 48 },
  { name: "Mampei", file: "/carrossel-logos/mampei-logo.png", width: 200, height: 30 },
];

export function CarrosselLogos() {
  return (
    <section className="w-full bg-nuki-verde-08">
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-10 px-6 pt-6 pb-12 sm:gap-12 sm:px-8 sm:pb-14 md:gap-14 md:px-12 md:pb-16 lg:px-16 lg:pb-20 xl:gap-16 xl:px-[108px] xl:pb-[88px]">
        <h3 className="text-center text-[20px] leading-7 tracking-[0.1px] text-nuki-branco sm:text-[21px] md:text-[22px] lg:text-[23px] xl:text-[24px] xl:leading-8">
          <span className="font-extrabold">Construtoras</span>
          <span className="font-normal"> que acreditam no nosso trabalho</span>
        </h3>
        <div className="grid w-full max-w-295 grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 md:flex md:justify-between md:gap-0">
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.file}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-auto max-w-[120px] sm:max-w-[150px] md:max-w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
