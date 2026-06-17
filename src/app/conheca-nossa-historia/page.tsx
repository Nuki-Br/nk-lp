import Image from "next/image";
import Link from "next/link";
import { CarrosselLogos } from "@/components/carrossel-logos";
import { SolicitarDemoButton } from "@/components/demo-modal";
import { Footer } from "@/components/footer";

export default function ConhecaNossaHistoriaPage() {
  return (
    <main className="flex flex-col">
      {/* ===== História (fundo preto) ===== */}
      <section className="relative w-full overflow-hidden bg-nuki-preto">
        {/* Decorações pearl */}
        <Image
          src="/conheca-nossa-historia/quadradinho-pearl.png"
          alt=""
          aria-hidden
          width={195}
          height={193}
          className="pointer-events-none absolute right-[6%] top-[8%] w-[120px] rotate-180 opacity-90 blur-[7px] sm:w-[150px] lg:w-[195px]"
        />
        <Image
          src="/conheca-nossa-historia/quadradinho-pearl.png"
          alt=""
          aria-hidden
          width={521}
          height={515}
          className="pointer-events-none absolute -left-24 top-[38%] w-[260px] opacity-90 blur-[7px] lg:w-[400px] xl:w-[521px]"
        />
        <Image
          src="/conheca-nossa-historia/quadradinho-pearl.png"
          alt=""
          aria-hidden
          width={382}
          height={378}
          className="pointer-events-none absolute right-[1%] top-[70%] w-[180px] opacity-90 blur-[7px] lg:w-[300px] xl:w-[382px]"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 pt-4 sm:px-8 sm:pb-20 md:px-12 md:pb-24 lg:px-16 lg:pb-28 xl:px-[108px] xl:pb-[120px]">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-white/10"
          >
            <ChevronLeftIcon className="size-5" />
            Voltar
          </Link>

          <h1 className="mt-6 text-center text-[28px] font-normal leading-tight tracking-[0.1px] text-nuki-branco sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] xl:leading-[54px]">
            Conheça nossa <span className="font-extrabold">história</span>
          </h1>

          <div className="mt-14 flex flex-col gap-16 sm:mt-16 sm:gap-20 md:mt-20 md:gap-24 lg:gap-28 xl:mt-24 xl:gap-32">
            {/* Linha 1 — texto (esq) / imagem pill (dir) */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <StoryText
                title="Como começamos"
                lead="Texto sobre como começamos e como tivemos essa ideia."
              >
                Lorem ipsum dolor sit amet consectetur. Eget elementum eget
                pellentesque nunc ut elementum. Lorem ipsum dolomet consectetur.
                Lorem ipsum dolor sit ametr.
              </StoryText>

              <div className="relative mx-auto w-full max-w-[429px] lg:mx-0 lg:w-[429px] lg:shrink-0">
                <div className="relative aspect-[429/631] w-full overflow-hidden rounded-[120px] shadow-[0_25px_30.8px_rgba(0,0,0,0.25)] sm:rounded-[160px] xl:rounded-[200px]">
                  <Image
                    src="/conheca-nossa-historia/sala-estar.png"
                    alt="Sala de estar personalizada"
                    fill
                    sizes="(max-width: 1024px) 100vw, 429px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute left-[-6%] top-[12%] z-10 flex aspect-square w-[18%] items-center justify-center rounded-[22%] bg-nuki-branco shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
                  <RollerIcon className="w-[56%] text-nuki-verde-02" />
                </span>
                <span className="absolute bottom-[4%] right-[-8%] z-10 flex aspect-square w-[26%] items-center justify-center rounded-[20%] bg-nuki-verde-02">
                  <WeekendIcon className="w-[48%] text-nuki-branco" />
                </span>
              </div>
            </div>

            {/* Linha 2 — imagem (esq, sangra) / texto (dir) */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
              <div className="relative w-full lg:-ml-16 lg:flex-1 xl:-ml-[108px]">
                <div className="relative aspect-[722/709] w-full overflow-hidden rounded-[48px] shadow-[0_29px_35.8px_rgba(0,0,0,0.25)] lg:rounded-l-none lg:rounded-r-[200px] xl:rounded-r-[400px]">
                  <Image
                    src="/conheca-nossa-historia/textura-3d.png"
                    alt="Detalhe arquitetônico"
                    fill
                    sizes="(max-width: 1024px) 100vw, 722px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-[-6%] left-[28%] z-10 flex aspect-square w-[13%] items-center justify-center rounded-[20%] bg-nuki-verde-02">
                  <ViewInArIcon className="w-[58%] text-nuki-branco" />
                </span>
              </div>

              <StoryText
                title="Nosso time"
                lead="Texto sobre quem compõe nosso time e mini resumo das nossas expertises."
              >
                Lorem ipsum dolor sit amet consectetur. Eget elementum eget
                pellentesque nunc ut elementum. Lorem ipsum dolomet consectetur.
                Lorem ipsum dolor sit ametr.
              </StoryText>
            </div>

            {/* Linha 3 — texto (esq) / imagem círculo (dir) */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <StoryText
                title="Nossa missão"
                lead="Texto sobre porque acreditamos que podemos te ajudar."
              >
                Lorem ipsum dolor sit amet consectetur. Eget elementum eget
                pellentesque nunc ut elementum. Lorem ipsum dolomet consectetur.
                Lorem ipsum dolor sit ametr.
              </StoryText>

              <div className="relative mx-auto w-full max-w-[498px] lg:mx-0 lg:w-[498px] lg:shrink-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-full">
                  <Image
                    src="/conheca-nossa-historia/cozinha.png"
                    alt="Cozinha personalizada"
                    fill
                    sizes="(max-width: 1024px) 100vw, 498px"
                    className="object-cover"
                  />
                </div>
                <TextureIcon className="absolute right-[1%] top-[-3%] z-10 w-[26%] text-nuki-verde-02" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Carrossel de logos ===== */}
      <CarrosselLogos />

      {/* ===== Fale com a gente (fundo claro) ===== */}
      <section className="relative w-full overflow-hidden bg-nuki-cinza-claro">
        <Image
          src="/conheca-nossa-historia/simbolo-pearl.png"
          alt=""
          aria-hidden
          width={827}
          height={588}
          className="pointer-events-none absolute -bottom-10 -left-32 w-[380px] opacity-70 lg:w-[580px] xl:w-[760px]"
        />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-6 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 xl:px-[108px] xl:py-28">
          <div className="flex w-full max-w-[440px] flex-col items-center gap-6 xl:gap-8">
            <h2 className="text-[28px] font-extrabold leading-tight tracking-[0.1px] text-nuki-preto sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] xl:leading-[54px]">
              Fale com a gente!
            </h2>
            <p className="text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Ficou interessado? Nos mande uma mensagem
              <br />
              por e-mail ou nos contate por telefone!
            </p>
            <div className="flex w-full items-center justify-between p-2.5">
              <a
                href="mailto:nuki@email.com"
                className="flex items-center gap-2 text-nuki-preto transition-opacity hover:opacity-70"
              >
                <EmailIcon className="size-5 shrink-0" />
                <span className="whitespace-nowrap text-[16px] font-extrabold leading-5 tracking-[0.1px] sm:text-[18px] xl:text-[20px]">
                  nuki@email.com
                </span>
              </a>
              <span aria-hidden className="px-1 text-[20px] font-normal text-nuki-preto">
                |
              </span>
              <a
                href="tel:0000000000"
                className="flex items-center gap-2 text-nuki-preto transition-opacity hover:opacity-70"
              >
                <PhoneIcon className="size-5 shrink-0" />
                <span className="whitespace-nowrap text-[16px] font-extrabold leading-5 tracking-[0.1px] sm:text-[18px] xl:text-[20px]">
                  00 0000.0000
                </span>
              </a>
            </div>
          </div>

          <SolicitarDemoButton
            className="flex items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
          >
            Solicitar demo
          </SolicitarDemoButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StoryText({
  title,
  lead,
  children,
  className = "lg:w-[415px] lg:shrink-0",
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex w-full flex-col gap-6 xl:gap-8 ${className}`}>
      <h2 className="text-[22px] font-normal leading-tight tracking-[0.1px] text-nuki-branco sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px]">
        {title}
      </h2>
      <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-branco sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
        <span className="font-bold">{lead}</span> {children}
      </p>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.5 14.41C12.82 14.08 12.82 13.56 12.5 13.23L9.27 10L12.5 6.77C12.82 6.44 12.82 5.92 12.5 5.59C12.17 5.27 11.65 5.27 11.32 5.59L7.5 9.42C7.17 9.74 7.17 10.26 7.5 10.58L11.32 14.41C11.65 14.73 12.17 14.73 12.5 14.41Z" />
    </svg>
  );
}

function RollerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 35.2062 41.0739"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M35.2062 1.9559V9.77951C35.2062 10.8553 34.3261 11.7354 33.2503 11.7354H9.77951C8.70377 11.7354 7.82361 10.8553 7.82361 9.77951V7.82361H3.9118V15.6472H19.559C21.7105 15.6472 23.4708 17.4075 23.4708 19.559V25.4267H25.4267C26.5025 25.4267 27.3826 26.3069 27.3826 27.3826V39.118C27.3826 40.1938 26.5025 41.0739 25.4267 41.0739H17.6031C16.5274 41.0739 15.6472 40.1938 15.6472 39.118V27.3826C15.6472 26.3069 16.5274 25.4267 17.6031 25.4267H19.559V19.559H3.9118C1.76031 19.559 0 17.7987 0 15.6472V7.82361C0 5.67212 1.76031 3.9118 3.9118 3.9118H7.82361V1.9559C7.82361 0.880156 8.70377 0 9.77951 0H33.2503C34.3261 0 35.2062 0.880156 35.2062 1.9559Z" />
    </svg>
  );
}

function WeekendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 55.8493 55.8493"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M48.8681 20.9436V16.2895C48.8681 12.4499 45.7266 9.30838 41.887 9.30838H13.9623C10.1227 9.30838 6.98116 12.4499 6.98116 16.2895V20.9436C3.14152 20.9436 0 24.0852 0 27.9248V39.5601C0 43.3997 3.14152 46.5412 6.98116 46.5412H48.8681C52.7078 46.5412 55.8493 43.3997 55.8493 39.5601V27.9248C55.8493 24.0852 52.7078 20.9436 48.8681 20.9436ZM11.6353 16.2895C11.6353 15.0097 12.6824 13.9625 13.9623 13.9625H41.887C43.1668 13.9625 44.214 15.0097 44.214 16.2895V22.7587C42.7945 24.0386 41.887 25.877 41.887 27.9248V32.5789H13.9623V27.9248C13.9623 25.877 13.0548 24.0386 11.6353 22.7587V16.2895ZM51.1952 39.5601C51.1952 40.84 50.148 41.8871 48.8681 41.8871H6.98116C5.70128 41.8871 4.65411 40.84 4.65411 39.5601V27.9248C4.65411 26.6449 5.70128 25.5978 6.98116 25.5978C8.26104 25.5978 9.30821 26.6449 9.30821 27.9248V37.233H46.5411V27.9248C46.5411 26.6449 47.5882 25.5978 48.8681 25.5978C50.148 25.5978 51.1952 26.6449 51.1952 27.9248V39.5601Z" />
    </svg>
  );
}

function ViewInArIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 58.6667 58.6667"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2.66667 13.3333C4.13333 13.3333 5.33333 12.1333 5.33333 10.6667V8C5.33333 6.53333 6.53333 5.33333 8 5.33333H10.6667C12.1333 5.33333 13.3333 4.13333 13.3333 2.66667C13.3333 1.2 12.1333 0 10.6667 0H8C3.57333 0 0 3.57333 0 8V10.6667C0 12.1333 1.2 13.3333 2.66667 13.3333Z" />
      <path d="M10.6667 53.3333H8C6.53333 53.3333 5.33333 52.1333 5.33333 50.6667V48C5.33333 46.5333 4.13333 45.3333 2.66667 45.3333C1.2 45.3333 0 46.5333 0 48V50.6667C0 55.0933 3.57333 58.6667 8 58.6667H10.6667C12.1333 58.6667 13.3333 57.4667 13.3333 56C13.3333 54.5333 12.1333 53.3333 10.6667 53.3333Z" />
      <path d="M50.6667 0H48C46.5333 0 45.3333 1.2 45.3333 2.66667C45.3333 4.13333 46.5333 5.33333 48 5.33333H50.6667C52.1333 5.33333 53.3333 6.53333 53.3333 8V10.6667C53.3333 12.1333 54.5333 13.3333 56 13.3333C57.4667 13.3333 58.6667 12.1333 58.6667 10.6667V8C58.6667 3.57333 55.0933 0 50.6667 0Z" />
      <path d="M56 45.3333C54.5333 45.3333 53.3333 46.5333 53.3333 48V50.6667C53.3333 52.1333 52.1333 53.3333 50.6667 53.3333H48C46.5333 53.3333 45.3333 54.5333 45.3333 56C45.3333 57.4667 46.5333 58.6667 48 58.6667H50.6667C55.0933 58.6667 58.6667 55.0933 58.6667 50.6667V48C58.6667 46.5333 57.4667 45.3333 56 45.3333Z" />
      <path d="M48 36.9867V21.68C48 19.76 46.9867 18 45.3333 17.0667L32 9.38667C31.1733 8.90667 30.2667 8.66667 29.3333 8.66667C28.4 8.66667 27.4933 8.90667 26.6667 9.38667L13.3333 17.04C11.68 18 10.6667 19.76 10.6667 21.68V36.9867C10.6667 38.9067 11.68 40.6667 13.3333 41.6L26.6667 49.28C27.4933 49.76 28.4 50 29.3333 50C30.2667 50 31.1733 49.76 32 49.28L45.3333 41.6C46.9867 40.6667 48 38.9067 48 36.9867ZM26.6667 43.12L16 36.9867V24.64L26.6667 30.8533V43.12ZM29.3333 26.24L18.7733 20.08L29.3333 14L39.8933 20.08L29.3333 26.24ZM42.6667 36.9867L32 43.12V30.8533L42.6667 24.64V36.9867Z" />
    </svg>
  );
}

function TextureIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M88.0533 0.426666L0.426668 88.0533C0.906668 89.8667 1.86667 91.52 3.14667 92.8533C4.48 94.1333 6.13333 95.0933 7.94667 95.5733L95.6267 7.94667C94.6133 4.26667 91.7333 1.38667 88.0533 0.426666ZM47.36 0L0 47.36V62.4533L62.4533 0H47.36ZM10.6667 0C4.8 0 0 4.8 0 10.6667V21.3333L21.3333 0H10.6667ZM85.3333 96C88.2667 96 90.9333 94.8267 92.8533 92.8533C94.8267 90.9333 96 88.2667 96 85.3333V74.6667L74.6667 96H85.3333ZM33.5467 96H48.64L96 48.64V33.5467L33.5467 96Z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 0.3125C4.64613 0.3125 0.3125 4.64527 0.3125 10C0.3125 15.3539 4.64527 19.6875 10 19.6875C11.881 19.6875 13.7243 19.1352 15.2894 18.1163C15.7583 17.811 15.8607 17.1675 15.5062 16.7346L15.1087 16.2489C14.8091 15.8829 14.2814 15.7932 13.8832 16.0486C12.7313 16.7874 11.3795 17.1875 10 17.1875C6.0368 17.1875 2.8125 13.9632 2.8125 10C2.8125 6.0368 6.0368 2.8125 10 2.8125C13.9117 2.8125 17.1875 5.06324 17.1875 9.0625C17.1875 10.5776 16.3636 12.1774 14.9152 12.3318C14.2375 12.314 14.2547 11.8295 14.3888 11.1589L15.3042 6.42809C15.4161 5.84961 14.973 5.3125 14.3838 5.3125H12.6267C12.497 5.3125 12.3718 5.36025 12.275 5.44666C12.1782 5.53306 12.1167 5.65207 12.102 5.78098L12.1016 5.78457C11.5275 5.08531 10.5216 4.93398 9.75902 4.93398C6.84574 4.93398 4.375 7.365 4.375 10.8504C4.375 13.4013 5.81191 14.9859 8.125 14.9859C9.17906 14.9859 10.366 14.3751 11.0543 13.4886C11.4263 14.8207 12.6408 14.8207 13.8164 14.8207C18.0707 14.8207 19.6875 12.0234 19.6875 9.0625C19.6875 3.73645 15.3915 0.3125 10 0.3125ZM9.15313 12.2043C8.28402 12.2043 7.74414 11.594 7.74414 10.6117C7.74414 8.85414 8.94645 7.7707 10.0344 7.7707C10.9052 7.7707 11.425 8.36605 11.425 9.36328C11.425 11.1235 10.1018 12.2043 9.15313 12.2043Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.2739 0.960743L15.2114 0.0232431C14.7699 -0.0783193 14.3168 0.152149 14.1371 0.566212L12.2621 4.94121C12.0981 5.32402 12.2074 5.77324 12.5317 6.03496L14.8989 7.97246C13.4926 10.9686 11.0356 13.4607 7.97698 14.8943L6.03947 12.5271C5.77385 12.2029 5.32854 12.0936 4.94572 12.2576L0.57072 14.1326C0.152751 14.3162 -0.0777182 14.7693 0.0238444 15.2107L0.961345 19.2732C1.059 19.6951 1.434 19.9998 1.87541 19.9998C11.8793 19.9998 20.0004 11.8943 20.0004 1.8748C20.0004 1.43731 19.6996 1.0584 19.2739 0.960743Z" />
    </svg>
  );
}
