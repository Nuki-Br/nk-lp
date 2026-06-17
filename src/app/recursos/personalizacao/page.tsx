import Image from "next/image";
import Link from "next/link";
import { SolicitarDemoButton } from "@/components/demo-modal";
import { Footer } from "@/components/footer";
import { LiberdadeAccordion } from "./LiberdadeAccordion";

export default function RecursosPersonalizacaoPage() {
  return (
    <main className="flex flex-col bg-nuki-branco">
      <div className="w-full bg-nuki-branco">
        <div className="mx-auto w-full max-w-[1440px] px-6 pt-4 sm:px-8 md:px-12 lg:px-16 xl:px-[108px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-nuki-cinza-medio transition-colors hover:text-nuki-preto"
          >
            <ChevronLeftIcon className="size-4" />
            Início
          </Link>
        </div>
      </div>

      <section className="w-full bg-nuki-branco">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-3 px-6 pt-8 text-center sm:px-8 md:px-12 md:pt-12 lg:px-16 xl:px-[108px] xl:pt-16">
          <p className="text-[14px] font-extrabold leading-6 tracking-[0.1px] text-nuki-verde-08">
            RECURSO
          </p>
          <h1 className="text-[36px] font-extrabold leading-10 tracking-[0.1px] text-nuki-preto sm:text-[42px] sm:leading-12 md:text-[48px] md:leading-[54px] lg:text-[54px] lg:leading-[60px] xl:text-[60px] xl:leading-[66px]">
            Personalização
          </h1>
          <p className="max-w-[440px] text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-cinza sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            Com a Nuki, seu cliente personaliza o imóvel com total liberdade e
            facilidade
          </p>
        </div>
      </section>

      <section className="w-full bg-nuki-branco">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <div className="flex w-full flex-col gap-8 lg:flex-1">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px]">
              Liberdade de escolhas
            </h2>
            <LiberdadeAccordion />
          </div>

          <HeroAmbientesCozinhaMockup />
        </div>
      </section>

      <section className="w-full bg-nuki-cinza-claro">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <div className="flex w-full flex-col gap-8 lg:flex-[671]">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[36px] lg:leading-[48px] xl:text-[32px] xl:leading-[54px]">
              Solução pronta
            </h2>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Nuki é uma plataforma <strong className="font-bold">white label,</strong>{" "}
              oferecendo um sistema que pode ser totalmente personalizado por
              outras empresas. Isso significa que, em vez de desenvolver uma
              estrutura de personalização de plantas do zero, você pode integrar
              a tecnologia da Nuki em seus próprios produtos e serviços,
              apresentando-o com sua marca e identidade visual.
            </p>
            <SolicitarDemoButton
              className="flex w-fit items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              Solicitar demo
            </SolicitarDemoButton>
          </div>

          <h3 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:flex-1 lg:text-[32px] lg:leading-[44px] xl:text-[36px] xl:leading-[48px]">
            Aproveite uma tecnologia avançada sem os custos e complexidades.
          </h3>
        </div>
      </section>

      <section className="w-full bg-nuki-branco">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <BemVindoMockup />
        </div>
      </section>

      <section className="w-full bg-nuki-branco">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <AmigavelMockup />

          <div className="flex w-full flex-col gap-6 lg:flex-1 lg:gap-8">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[36px] lg:leading-[48px] xl:text-[32px] xl:leading-[54px]">
              Amigável e intuitiva
            </h2>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Na Nuki, a simplicidade é prioridade! Com uma plataforma
              intuitiva, ícones claros e uma navegação linear, qualquer pessoa
              pode personalizar seu apartamento de forma fácil e descomplicada,
              garantindo uma experiência fluida do início ao fim.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-nuki-cinza-claro">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src="/recursos-personalizacao/amigavel-floor-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-6 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-28 xl:px-[108px] xl:py-32">
          <h2 className="max-w-[800px] text-[28px] leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[32px] lg:leading-[54px] xl:text-[32px] xl:leading-[54px]">
            <span className="font-medium">Login</span>
            <span className="font-extrabold"> seguro e individual</span>
          </h2>
          <p className="max-w-[700px] text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            Cada cliente cadastrado na Nuki recebe um login exclusivo para
            personalizar suas escolhas, com total privacidade e segurança,
            garantindo uma experiência tranquila e protegida em cada etapa.
          </p>
          <SolicitarDemoButton className="flex w-fit items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02">
            Solicitar demo
          </SolicitarDemoButton>
        </div>
      </section>

      <section className="w-full bg-nuki-verde-03">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col-reverse items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20 lg:pl-16 lg:pr-0 xl:py-[88px] xl:pl-[108px] xl:pr-0">
          <div className="flex w-full flex-col gap-8 lg:w-[468px] lg:shrink-0">
            <div className="flex w-full flex-col gap-3">
              <p className="text-[14px] font-extrabold leading-6 text-nuki-verde-02 sm:text-[16px]">
                RECURSO
              </p>
              <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-branco sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px]">
                Controle e análise
              </h2>
            </div>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-branco sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Nuki oferece um dashboard completo para acompanhar a jornada de
              personalização do cliente. Com visibilidade total das escolhas,
              contratos, você garante uma gestão eficiente e organizada em cada
              etapa.
            </p>
            <Link
              href="/recursos/controle-analise"
              className="flex w-fit items-center justify-center rounded-full border-2 border-nuki-branco px-6 py-3 text-[16px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-verde-03"
            >
              Saiba mais
            </Link>
          </div>

          <ControleDashboardMockup />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function HeroAmbientesCozinhaMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-[36px] bg-nuki-cinza-borda shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:flex-1 lg:max-w-[600px]">
      <div className="relative aspect-[600/766] w-full">
        <Image
          src="/recursos-personalizacao/hero-cozinha-foto.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />

        <div className="absolute left-0 top-0 flex h-full w-[12.5%] flex-col items-center gap-3 rounded-tr-[36px] border-l border-nuki-cinza-borda bg-nuki-branco py-3">
          <div className="flex w-full flex-col items-center gap-1 px-1">
            <div className="h-[30px] w-[40px] rounded-md bg-[#d9d9d9]/40" />
            <p className="text-center text-[8px] text-nuki-cinza-medio/40">Seu logo</p>
          </div>
          <div className="border-t border-nuki-cinza-borda" />
          <div className="flex flex-col items-center gap-4 py-3">
            <div className="flex flex-col items-center gap-1 px-2">
              <img src="/recursos-personalizacao/ic-view-in-ar.svg" alt="" className="size-4" />
              <p className="text-[9px] text-nuki-preto">1. Planta</p>
            </div>
            <div className="flex w-full flex-col items-center gap-1 bg-nuki-cinza-claro px-2 py-2 border-r border-nuki-cinza-borda">
              <DashboardIcon className="size-4 text-nuki-preto" />
              <p className="text-[9px] text-nuki-preto">2. Ambientes</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              <img src="/recursos-personalizacao/ic-checkroom.svg" alt="" className="size-4" />
              <p className="text-[9px] text-nuki-preto">3. Resumo</p>
            </div>
          </div>
        </div>

        <div className="absolute left-[12.5%] top-0 flex h-[7%] w-[33%] items-center border-b border-r border-nuki-cinza-borda bg-nuki-branco px-3 py-2">
          <div className="flex flex-col gap-0.5">
            <p className="text-[8px] text-nuki-cinza-medio">Torre A - Unidade 22</p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-[80px] rounded-full bg-[#d9d9d9]/40" />
              <img src="/recursos-personalizacao/ic-logout.svg" alt="" className="size-3" />
            </div>
          </div>
        </div>

        <div className="absolute left-[12.5%] top-[7%] flex h-[80%] w-[33%] flex-col gap-2 border-r border-nuki-cinza-borda bg-nuki-branco p-3">
          <div className="flex items-center gap-1">
            <p className="text-[9px] font-bold text-nuki-cinza">Selecione um ambiente</p>
            <div className="size-3 rounded-full bg-nuki-cinza-borda" />
          </div>

          <MenuItem icon="/recursos-personalizacao/ic-weekend.svg" selected />
          <Divider />
          <MenuItem icon="/recursos-personalizacao/ic-kitchen.svg" highlighted expanded />
          <Divider />
          <MenuItem icon="/recursos-personalizacao/ic-grass.svg" />
          <Divider />
          <MenuItem icon="/recursos-personalizacao/ic-bed.svg" />
          <Divider />
          <MenuItem icon="/recursos-personalizacao/ic-shower.svg" />
          <Divider />
          <MenuItem icon="/recursos-personalizacao/ic-checkroom.svg" />
          <Divider />
          <MenuItem icon="/recursos-personalizacao/ic-coffee.svg" />

          <div className="mt-auto flex items-center justify-between rounded-md bg-nuki-laranja-suave px-2 py-1">
            <div className="flex items-center gap-1">
              <div className="size-2.5 rounded-sm bg-nuki-laranja" />
              <p className="text-[7px] text-[#d5653c]">Prazo de acesso</p>
            </div>
            <div className="h-2 w-[40px] rounded-full bg-[#ffd7c7]" />
          </div>
        </div>

        <div className="absolute bottom-[6%] left-[12.5%] flex h-[8%] w-[33%] flex-col gap-1 border-r border-t border-nuki-cinza-borda bg-nuki-branco p-2">
          <div className="flex items-center justify-between">
            <p className="text-[8px] text-nuki-cinza-medio">Valor Total</p>
            <div className="flex items-center gap-1">
              <p className="text-[8px] font-bold text-[#141414]">R$</p>
              <div className="h-1.5 w-[40px] rounded-full bg-[#d9d9d9]/40" />
            </div>
          </div>
          <button className="rounded-full bg-[#141414] py-1 text-[9px] text-nuki-branco">
            Finalizar
          </button>
        </div>

        <div className="absolute right-3 top-3 flex h-[12%] w-[24%] items-center justify-center overflow-hidden rounded-2xl bg-nuki-branco shadow-md">
          <Image
            src="/recursos-personalizacao/hero-planta-arquitetonica.png"
            alt=""
            width={120}
            height={120}
            className="size-full object-contain"
          />
          <div className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-[#141414]">
            <img src="/recursos-personalizacao/ic-eye.svg" alt="" className="size-2" />
          </div>
        </div>

        <div className="absolute bottom-[16%] right-3 flex w-[37%] flex-col rounded-t-3xl bg-nuki-branco shadow-md">
          <div className="flex items-center gap-1.5 border-b border-nuki-cinza-borda px-3 py-2">
            <MenuOpenIcon className="size-3 rotate-180" />
            <p className="text-[9px] font-bold text-[#262626]">Composições</p>
            <div className="size-3 rounded-full bg-nuki-cinza-borda" />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <CompositionCard active />
            <CompositionCard />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 flex w-[37%] items-center justify-between border-l border-t border-nuki-cinza-borda bg-nuki-branco p-2">
          <div className="flex flex-col gap-1">
            <p className="text-[7px] text-nuki-cinza-medio">Total cozinha / A.S.</p>
            <div className="flex items-center gap-1">
              <p className="text-[8px] text-nuki-preto">R$</p>
              <div className="h-1.5 w-[30px] rounded-full bg-[#d9d9d9]/40" />
            </div>
          </div>
          <button className="rounded-full border border-nuki-cinza px-2 py-1 text-[7px] text-[#141414]">
            Salvar escolhas
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, selected, highlighted, expanded }: { icon: string; selected?: boolean; highlighted?: boolean; expanded?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center gap-1 rounded-md px-1 py-1 ${expanded ? "border border-nuki-cinza-borda" : ""}`}
      >
        <img src={icon} alt="" className="size-3 shrink-0" />
        <div className="flex h-2 flex-1 items-center justify-center rounded-full bg-[#d9d9d9]/40" />
        {selected ? (
          <img src="/recursos-personalizacao/ic-check-circle.svg" alt="" className="size-3 shrink-0" />
        ) : highlighted ? (
          <img src="/recursos-personalizacao/ic-check-outline.svg" alt="" className="size-3 shrink-0" />
        ) : (
          <img src="/recursos-personalizacao/ic-record.svg" alt="" className="size-3 shrink-0" />
        )}
      </div>
      {expanded && (
        <div className="ml-2 flex flex-col gap-0.5 border-l border-nuki-cinza-divisor pl-2">
          <div className="h-3 rounded-md bg-nuki-verde-suave px-1 py-0.5">
            <div className="h-full w-[80%] rounded-full bg-[#b0ecec]" />
          </div>
          <div className="h-2 w-[70%] rounded-full bg-[#d9d9d9]/40" />
          <div className="h-2 w-[70%] rounded-full bg-[#d9d9d9]/40" />
          <div className="h-2 w-[50%] rounded-full bg-[#d9d9d9]/40" />
          <div className="h-2 w-[35%] rounded-full bg-[#d9d9d9]/40" />
          <div className="h-2 w-[70%] rounded-full bg-[#d9d9d9]/40" />
          <div className="h-2 w-[48%] rounded-full bg-[#d9d9d9]/40" />
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-nuki-cinza-divisor" />;
}

function CompositionCard({ active }: { active?: boolean }) {
  return (
    <div
      className={`flex gap-2 rounded-2xl p-2 ${active ? "bg-nuki-cinza-claro" : "border border-nuki-cinza-divisor"}`}
    >
      <div className="relative size-12 shrink-0 overflow-hidden rounded-xl">
        <Image
          src="/recursos-personalizacao/hero-material-preview.png"
          alt=""
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-1">
          <p className="text-[8px] font-bold text-[#141414]">
            {active ? "Padrão" : "Composição 01"}
          </p>
          {!active && (
            <img src="/recursos-personalizacao/ic-premium.svg" alt="" className="size-2.5" />
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <p className="text-[7px] text-nuki-cinza-medio">R$</p>
          <div className="h-1.5 w-[28px] rounded-full bg-[#d9d9d9]/40" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#d9d9d9]/40" />
        <div className="h-1.5 w-full rounded-full bg-[#d9d9d9]/40" />
        <div className="h-1.5 w-[36%] rounded-full bg-[#d9d9d9]/40" />
        {!active && (
          <div className="flex items-end gap-0.5 pt-0.5">
            <p className="text-[7px] underline">Ver mais</p>
            <ChevronDownIconSmall className="size-2" />
          </div>
        )}
      </div>
    </div>
  );
}

function BemVindoMockup() {
  return (
    <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[40px] bg-nuki-branco shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex h-12 items-center border-b border-nuki-cinza-borda px-4 sm:px-6">
        <div className="flex w-[60px] flex-col gap-1">
          <div className="h-3 w-10 rounded bg-[#d9d9d9]/40" />
          <div className="flex items-center gap-1">
            <p className="text-[8px] text-nuki-cinza-medio">Mariana Rodrigues</p>
            <img src="/recursos-personalizacao/ic-logout.svg" alt="" className="size-3" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-12">
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] font-bold leading-tight text-[#0d0d0d] sm:text-[28px] md:text-[32px] xl:text-[36px]">
            Bem vindo(a) novamente!
          </h3>
          <p className="text-[12px] text-nuki-cinza sm:text-[14px] md:text-[16px] xl:text-[18px]">
            Selecione um apartamento para personalizar
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-nuki-cinza-medio sm:text-[14px] md:text-[16px]">
            <FilterPill icon="/recursos-personalizacao/ic-sort.svg" label="Ordenar" />
            <FilterPill icon="/recursos-personalizacao/ic-filter.svg" label="Ano de lançamento" />
            <FilterPill icon="/recursos-personalizacao/ic-filter.svg" label="Etapa" />
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-nuki-verde-02 px-4 py-2 text-[12px] font-semibold text-nuki-branco transition-colors hover:bg-nuki-verde-03 sm:text-[14px] md:px-5 md:text-[16px]">
            <img src="/recursos-personalizacao/ic-plus.svg" alt="" className="size-4" />
            <span>Adicionar empreendimento</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ValeVerdeCard status="cadastro" />
          <ValeVerdeCard status="finalizado" />
          <ValeVerdeCard status="personalizacao" />
        </div>
      </div>
    </div>
  );
}

function FilterPill({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <img src={icon} alt="" className="size-3.5" />
      {label}
      <ChevronDownIconSmall className="size-3" />
    </span>
  );
}

const statusStyles = {
  cadastro: { bg: "bg-nuki-verde-suave", text: "text-nuki-verde-02", label: "Em cadastro", icon: "/recursos-personalizacao/ic-info-green.svg" },
  finalizado: { bg: "bg-nuki-cinza-divisor", text: "text-nuki-cinza-medio", label: "Período de personalização finalizado", icon: "/recursos-personalizacao/ic-info-gray.svg" },
  personalizacao: { bg: "bg-nuki-laranja-suave", text: "text-nuki-laranja", label: "Em período de personalização", icon: "/recursos-personalizacao/ic-info-orange.svg" },
};

function ValeVerdeCard({ status }: { status: keyof typeof statusStyles }) {
  const s = statusStyles[status];
  return (
    <article className="flex flex-col gap-6 rounded-3xl bg-nuki-branco p-4 shadow-[2px_2px_5px_rgba(0,0,0,0.08)]">
      <header className="flex items-center justify-between gap-3">
        <p className="flex-1 text-[16px] font-semibold text-[#0d0d0d] md:text-[18px] xl:text-[20px]">
          Vale Verde
        </p>
        <Image
          src="/recursos-personalizacao/bv-jm-logo.png"
          alt="JM"
          width={70}
          height={39}
          className="h-8 w-auto object-contain"
        />
      </header>
      <div className="h-3 w-[80%] rounded-full bg-[#d9d9d9]/40" aria-hidden />
      <div className="h-px w-full bg-nuki-cinza-divisor" aria-hidden />
      <div className="flex flex-col gap-2 text-[12px] md:text-[14px]">
        {["Tipo:", "Lançamento:", "Início obras:"].map((label) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-[80px] shrink-0 text-[#0d0d0d]">{label}</span>
            <span className="h-3 w-[60px] rounded-full bg-[#d9d9d9]/40" aria-hidden />
          </div>
        ))}
      </div>
      <footer className="flex items-center justify-between">
        <span
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-normal md:text-[12px] ${s.bg} ${s.text}`}
        >
          {s.label}
          <img src={s.icon} alt="" className="size-3" />
        </span>
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full bg-nuki-verde-08 text-nuki-branco"
        >
          <ChevronRightIconSmall className="size-4" />
        </span>
      </footer>
    </article>
  );
}

function AmigavelMockup() {
  return (
    <div className="relative w-full lg:flex-1 lg:max-w-[600px]">
      <Image
        src="/recursos-personalizacao/amigavel-pearl.png"
        alt=""
        width={469}
        height={465}
        aria-hidden
        className="pointer-events-none absolute -left-8 -top-4 w-[60%] opacity-90"
      />
      <div className="relative aspect-[600/520] w-full overflow-hidden rounded-[48px]">
        <div className="absolute inset-0 bg-nuki-verde-08" />
        <Image
          src="/recursos-personalizacao/amigavel-floor-bg.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover opacity-60"
        />

        <div className="absolute left-[6%] top-[5%] flex w-[58%] flex-col rounded-3xl bg-nuki-branco shadow-md">
          <div className="flex items-center gap-2 border-b border-nuki-cinza-borda px-6 py-4">
            <MenuOpenIcon className="size-4 rotate-180" />
            <p className="flex-1 text-[13px] font-bold text-[#262626] md:text-[16px]">
              Revise suas escolhas
            </p>
            <div className="size-4 rounded-full bg-nuki-cinza-borda" />
            <img src="/recursos-personalizacao/ic-arrow-circle.svg" alt="" className="size-5 rotate-180" />
          </div>

          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <img src="/recursos-personalizacao/ic-view-in-ar.svg" alt="" className="size-4" />
              <p className="text-[11px] text-nuki-preto md:text-[14px]">Planta escolhida</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-bold text-nuki-preto md:text-[14px]">Planta 01:</p>
              <div className="h-3 flex-1 rounded-full bg-[#d9d9d9]/40" />
              <SwapIcon className="size-4 text-nuki-preto" />
            </div>
            <div className="h-px w-full bg-[#bfbfbf]" />

            <MenuRow icon="/recursos-personalizacao/ic-weekend.svg" label="Estar/Jantar/Cirulação" />
            <div className="h-px w-full bg-nuki-cinza-divisor" />
            <MenuRow icon="/recursos-personalizacao/ic-kitchen.svg" label="Cozinha / A.S." />
            <div className="h-px w-full bg-nuki-cinza-divisor" />
            <div className="flex items-center gap-2">
              <img src="/recursos-personalizacao/ic-checkroom.svg" alt="" className="size-4" />
              <p className="flex-1 text-[11px] text-nuki-laranja md:text-[14px]">Dormitório</p>
              <div className="flex items-center gap-1 rounded-md bg-nuki-laranja px-2 py-1">
                <WarningIcon className="size-3 text-nuki-branco" />
                <p className="text-[9px] font-normal text-nuki-branco md:text-[10px]">
                  Não visualizado
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[6%] left-[24%] flex items-center gap-3 rounded-full bg-nuki-verde-08 px-5 shadow-md">
          <ZoomOutMapIcon className="size-5 text-nuki-branco md:size-6" />
          <div className="h-6 w-px bg-nuki-cinza-divisor" />
          <ZoomInIcon className="size-5 text-nuki-branco md:size-6" />
          <div className="h-6 w-px bg-nuki-cinza-divisor" />
          <ZoomOutIcon className="size-5 text-nuki-branco md:size-6" />
          <div className="h-6 w-px bg-nuki-cinza-divisor" />
          <FileDownloadIcon className="size-5 text-nuki-branco md:size-6" />
        </div>

        <div className="absolute bottom-[4%] right-[2%] flex w-[52%] flex-col overflow-hidden rounded-2xl shadow-md">
          <div className="flex items-center justify-between bg-[#000] px-4 py-2">
            <p className="text-[13px] font-bold text-nuki-branco md:text-[16px]">Atenção!</p>
            <img src="/recursos-personalizacao/ic-info-gray.svg" alt="" className="size-5" />
          </div>
          <div className="flex flex-col gap-4 bg-[#000] p-4">
            <p className="text-[11px] text-nuki-branco md:text-[14px]">
              Ops, você realmente gostaria de finalizar? Você ainda não
              visualizou as escolhas a baixo:
            </p>
            <div className="h-px w-full bg-nuki-cinza-divisor" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img src="/recursos-personalizacao/ic-bed.svg" alt="" className="size-4 invert" />
                <p className="text-[11px] text-nuki-branco md:text-[14px]">Suíte Master</p>
              </div>
              <div className="flex w-fit items-center rounded-md bg-nuki-branco px-2 py-1">
                <p className="text-[10px] text-nuki-preto">Piso e rodapé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src={icon} alt="" className="size-4" />
      <p className="flex-1 text-[11px] text-nuki-preto md:text-[14px]">{label}</p>
      <ChevronDownIconSmall className="size-3 text-nuki-preto" />
    </div>
  );
}

function ControleDashboardMockup() {
  return (
    <div className="relative w-full lg:flex-1 lg:max-w-175">
      <div className="relative aspect-700/520 w-full">


        <div className="absolute right-[2%] top-[4%] flex w-[55%] flex-col gap-4 rounded-[40px] bg-nuki-branco p-5 shadow-[2px_2px_5px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <p className="flex-1 text-[16px] font-semibold text-[#0d0d0d] md:text-[20px]">
              Vale Verde
            </p>
            <Image
              src="/recursos-personalizacao/ca-jm-logo.png"
              alt="JM"
              width={70}
              height={39}
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="h-3 w-[70%] rounded-full bg-[#d9d9d9]/40" />
          <div className="h-px w-full bg-nuki-cinza-divisor" />
          <div className="flex flex-col gap-2 text-[12px] md:text-[14px]">
            {["Tipo:", "Lançamento:", "Início obras:"].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-[80px] shrink-0 text-[#0d0d0d]">{label}</span>
                <span className="h-3 w-[60px] rounded-full bg-[#d9d9d9]/40" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 rounded-md bg-nuki-cinza-divisor px-2 py-1 text-[10px] text-nuki-cinza-medio md:text-[12px]">
              Período de personalização finalizado
              <img src="/recursos-personalizacao/ic-info-gray.svg" alt="" className="size-3" />
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-nuki-verde-08 text-nuki-branco">
              <ChevronRightIconSmall className="size-4" />
            </span>
          </div>
        </div>

        <div className="absolute bottom-[6%] left-0 flex w-[60%] items-center gap-4 rounded-[40px] bg-nuki-branco px-5 py-4 shadow-[0_3px_3px_rgba(0,0,0,0.25)]">
          <div className="relative size-20 shrink-0">
            <Image
              src="/recursos-personalizacao/ca-grafico-pizza.svg"
              alt="Gráfico de status"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-[11px] font-bold text-nuki-cinza md:text-[12px]">
                Status dos clientes
              </p>
              <p className="text-[9px] text-nuki-cinza-medio md:text-[10px]">
                Divisão dos clientes por status
              </p>
            </div>
            <ul className="flex flex-col gap-1 text-[9px] md:text-[10px]">
              <StatusLegend color="bg-nuki-verde-08" label="Finalizado" percent="30%" count="125" />
              <StatusLegend color="bg-[#049494]" label="Esperando validação" percent="11%" count="80" />
              <StatusLegend color="bg-[#05b1b1]" label="Em aberto" percent="12%" count="20" />
              <StatusLegend color="bg-[#b3efef]" label="Não acessou" percent="47%" count="15" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusLegend({ color, label, percent, count }: { color: string; label: string; percent: string; count: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`size-2 shrink-0 rounded-sm ${color}`} aria-hidden />
      <span className="flex-1 text-nuki-cinza-medio">{label}</span>
      <span className="w-8 text-right text-nuki-cinza-medio">{percent}</span>
      <span className="w-6 text-right font-bold text-nuki-cinza-medio">{count}</span>
    </li>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.5 14.41C12.82 14.08 12.82 13.56 12.5 13.23L9.27 10L12.5 6.77C12.82 6.44 12.82 5.92 12.5 5.59C12.17 5.27 11.65 5.27 11.32 5.59L7.5 9.42C7.17 9.74 7.17 10.26 7.5 10.58L11.32 14.41C11.65 14.73 12.17 14.73 12.5 14.41Z" />
    </svg>
  );
}

function ChevronRightIconSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 5.59C7.18 5.92 7.18 6.44 7.5 6.77L10.73 10L7.5 13.23C7.18 13.56 7.18 14.08 7.5 14.41C7.83 14.73 8.35 14.73 8.68 14.41L12.5 10.58C12.83 10.26 12.83 9.73 12.5 9.41L8.68 5.58C8.36 5.27 7.83 5.27 7.5 5.59Z" />
    </svg>
  );
}

function ChevronDownIconSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.59 7.5C5.92 7.18 6.44 7.18 6.77 7.5L10 10.73L13.23 7.5C13.56 7.18 14.08 7.18 14.41 7.5C14.73 7.83 14.73 8.35 14.41 8.68L10.58 12.5C10.26 12.83 9.73 12.83 9.41 12.5L5.59 8.68C5.27 8.36 5.27 7.83 5.59 7.5Z" />
    </svg>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}

function MenuOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
    </svg>
  );
}

function SwapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  );
}

function ZoomOutMapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z" />
    </svg>
  );
}

function ZoomInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-5.5 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-.5-7h1v2h2v1h-2v2h-1v-2h-2v-1h2V7z" />
    </svg>
  );
}

function ZoomOutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-5.5 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM7 9h5v1H7z" />
    </svg>
  );
}

function FileDownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
  );
}
