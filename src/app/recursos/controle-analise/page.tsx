import Image from "next/image";
import Link from "next/link";
import { SolicitarDemoButton } from "@/components/demo-modal";
import { Footer } from "@/components/footer";
import { Topbar } from "@/components/topbar";
import { EstamosAquiAccordion } from "./EstamosAquiAccordion";

export default function RecursosControleAnalisePage() {
  return (
    <>
      <div className="bg-nuki-verde-03">
        <Topbar />
      </div>
      <main className="flex flex-col bg-nuki-branco">
        <div className="w-full bg-nuki-verde-03">
          <div className="mx-auto w-full max-w-[1440px] px-6 pt-4 sm:px-8 md:px-12 lg:px-16 xl:px-[108px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-nuki-branco/70 transition-colors hover:text-nuki-branco"
            >
              <ChevronLeftIcon className="size-4" />
              Início
            </Link>
          </div>
        </div>

        <section className="w-full bg-nuki-verde-03">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-3 px-6 pt-8 text-center sm:px-8 md:px-12 md:pt-12 lg:px-16 xl:px-[108px] xl:pt-16">
            <p className="text-[14px] font-extrabold leading-6 tracking-[0.1px] text-nuki-verde-02">
              RECURSO
            </p>
            <h1 className="text-[36px] font-extrabold leading-10 tracking-[0.1px] text-nuki-branco sm:text-[42px] sm:leading-12 md:text-[48px] md:leading-[54px] lg:text-[54px] lg:leading-[60px] xl:text-[60px] xl:leading-[66px]">
              Controle e análise
            </h1>
          </div>
        </section>

      <section className="relative w-full bg-nuki-verde-03 overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <div className="relative w-full lg:flex-1 lg:max-w-[728px]">
            <HomeEmpreendimentoMockup />
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-10 lg:w-[432px] lg:shrink-0">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-branco sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[28px] lg:leading-[42px] xl:text-[32px] xl:leading-[54px]">
              Centralize todos os passos em uma única plataforma
            </h2>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-branco sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Com a Nuki, você tem o controle total! Cadastre plantas e
              acabamentos por categoria e ambiente, ajuste preços e descrições
              em poucos cliques e acompanhe cada etapa da personalização do
              cliente. Tudo isso com métricas precisas e centralizado em uma
              única plataforma, tornando a gestão dos seus empreendimentos mais
              eficiente e lucrativa
            </p>
            <SolicitarDemoButton
              className="flex h-12 items-center justify-center rounded-full border-2 border-nuki-branco px-6 text-[16px] font-semibold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-branco hover:text-nuki-verde-03"
            >
              Solicitar demo
            </SolicitarDemoButton>
          </div>
        </div>
      </section>

      <section className="w-full bg-nuki-verde-03">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-6 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-28 xl:px-[108px] xl:py-32">
          <h2 className="max-w-[900px] text-[32px] leading-10 tracking-[0.1px] text-nuki-branco sm:text-[38px] sm:leading-12 md:text-[44px] md:leading-[54px] lg:text-[48px] lg:leading-[54px] xl:text-[48px] xl:leading-[54px]">
            <span className="font-normal">Simplifique a </span>
            <span className="font-extrabold">emissão de contratos</span>
          </h2>
          <p className="max-w-[800px] text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-branco sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
            Simplifique a gestão de contratos com a Nuki! Revise documentos,
            adicione comentários e finalize tudo com assinatura digital,
            mantendo o controle total em uma única plataforma
          </p>
        </div>
      </section>

      <section className="w-full bg-nuki-branco">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <div className="flex w-full flex-col gap-10 lg:w-[415px] lg:shrink-0">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[28px] lg:leading-[42px] xl:text-[32px] xl:leading-[54px]">
              Visão 360 dos seus
              <br />
              clientes
            </h2>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Acompanhe seus clientes em cada etapa da personalização. Filtre
              facilmente por status, torre ou favoritos e acesse todas as
              informações essenciais em um único lugar. Simplifique a gestão e
              tenha total visibilidade do processo.
            </p>
            <SolicitarDemoButton
              className="flex w-fit items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              Solicitar demo
            </SolicitarDemoButton>
          </div>

          <ClientesMockup />
        </div>
      </section>

      <section className="w-full bg-nuki-cinza-claro">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col-reverse items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <GerencieTimeMockup />

          <div className="flex w-full flex-col gap-10 lg:w-[415px] lg:shrink-0">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[28px] lg:leading-[42px] xl:text-[32px] xl:leading-[54px]">
              Gerencie seu time!
            </h2>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Personalize os acessos dos usuários de forma simples e rápida! Na
              Nuki, o controle de permissões é totalmente adaptável às suas
              necessidades a partir da criação de perfis.
            </p>
            <SolicitarDemoButton
              className="flex w-fit items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              Solicitar demo
            </SolicitarDemoButton>
          </div>
        </div>
      </section>

      <section className="w-full bg-nuki-branco">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <div className="flex w-full flex-col gap-8 lg:w-[429px] lg:shrink-0">
            <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[28px] lg:leading-[42px] xl:text-[32px] xl:leading-[54px]">
              Estamos aqui para ajudar!
            </h2>
            <p className="text-[16px] font-light leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Na Nuki, oferecemos todo o suporte necessário para que você
              aproveite ao máximo nossa plataforma. Deixe a parte técnica com a
              gente e concentre-se no que importa: a satisfação do seu cliente.
            </p>
            <SolicitarDemoButton
              className="flex w-fit items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              Solicitar demo
            </SolicitarDemoButton>
          </div>

          <EstamosAquiAccordion />
        </div>
      </section>

      <section className="w-full bg-nuki-cinza-claro">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-20 xl:px-[108px] xl:py-[88px]">
          <div className="relative w-full lg:flex-1">
            <div className="relative aspect-[700/420] w-full overflow-hidden rounded-[48px] bg-nuki-cinza-borda">
              <Image
                src="/recurso-personalizacao/cozinha-jantar.png"
                alt="Personalização"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <button className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-nuki-preto px-5 py-2 text-[12px] font-semibold text-nuki-branco sm:text-[14px]">
                Opções de plantas
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 lg:w-[376px] lg:shrink-0">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-extrabold leading-6 tracking-[0.1px] text-nuki-verde-08">
                RECURSO
              </p>
              <h2 className="text-[28px] font-extrabold leading-8 tracking-[0.1px] text-nuki-preto sm:text-[32px] sm:leading-9 md:text-[36px] md:leading-10 lg:text-[42px] lg:leading-12 xl:text-[48px] xl:leading-[54px]">
                Personalização
              </h2>
            </div>
            <p className="text-[16px] font-normal leading-7 tracking-[0.1px] text-nuki-preto sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] xl:leading-9">
              Com o recurso de personalização da Nuki, seu cliente customiza o
              imóvel de forma simples e com total liberdade de escolha.
            </p>
            <Link
              href="/recursos/personalizacao"
              className="flex w-fit items-center justify-center rounded-full bg-nuki-preto px-6 py-[14px] text-[16px] font-bold leading-5 tracking-[0.1px] text-nuki-branco transition-colors hover:bg-nuki-verde-02"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </section>

        <Footer />
      </main>
    </>
  );
}

function HomeEmpreendimentoMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-[30px] bg-[#fafafa] shadow-[0_4px_4px_rgba(0,0,0,0.25)] aspect-[728/690]">
      <div className="absolute inset-x-0 top-0 flex h-[5%] items-center justify-end gap-2 border-b border-nuki-cinza-divisor bg-nuki-branco px-4">
        <img src="/recursos-controle-analise/ic-info.svg" alt="" className="size-3" />
        <div className="relative">
          <img src="/recursos-controle-analise/ic-notifications.svg" alt="" className="size-3" />
          <span className="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-nuki-verde-02 text-[6px] text-nuki-verde-suave">1</span>
        </div>
        <div className="size-3 rounded-full bg-nuki-cinza-borda" />
        <div className="h-2 w-12 rounded-full bg-[#d9d9d9]/40" />
        <img src="/recursos-controle-analise/ic-logout.svg" alt="" className="size-3" />
      </div>

      <div className="absolute left-[4%] top-[7%] flex items-center gap-1 text-[7px]">
        <span className="text-nuki-cinza-7">Empreendimentos</span>
        <span className="text-nuki-cinza-7">/</span>
        <span className="text-nuki-cinza">Home</span>
      </div>

      <div className="absolute left-[4%] top-[11%] flex w-[55%] flex-col gap-1">
        <div className="flex items-center gap-1">
          <p className="text-[12px] font-semibold text-[#0d0d0d] sm:text-[14px]">
            Bem vindo(a) a Home do empreendimento{" "}
            <span className="text-nuki-verde-02">JML 747</span>
          </p>
          <img src="/recursos-controle-analise/ic-swap.svg" alt="" className="size-3" />
        </div>
        <div className="h-1.5 w-[60%] rounded-full bg-[#d9d9d9]/40" />
        <div className="h-1.5 w-[30%] rounded-full bg-[#d9d9d9]/40" />
      </div>

      <div className="absolute right-[4%] top-[11%]">
        <Image
          src="/recursos-controle-analise/jm-logo.png"
          alt="JM"
          width={50}
          height={28}
          className="h-7 w-auto object-contain"
        />
      </div>

      <div className="absolute left-[4%] top-[22%] flex w-[28%] flex-col gap-2 rounded bg-nuki-branco p-2">
        <p className="text-[8px] font-bold text-[#0d0d0d]">
          Passos para habilitar a personalização
        </p>
        <div className="h-px w-full bg-nuki-cinza-divisor" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <img src="/recursos-controle-analise/ic-check.svg" alt="" className="size-2" />
            <div className="h-1.5 w-[60%] rounded-full bg-[#d9d9d9]/40" />
          </div>
        ))}
        <button className="mt-1 w-fit rounded-full border border-nuki-verde-02 px-2 py-0.5 text-[6px] text-nuki-verde-02">
          Pausar personalização
        </button>
      </div>

      <div className="absolute left-[35%] top-[22%] flex w-[20%] flex-col items-end rounded bg-nuki-branco p-2">
        <div className="flex w-full items-center gap-1">
          <img src="/recursos-controle-analise/ic-view-in-ar.svg" alt="" className="size-4" />
          <p className="text-[14px] font-semibold text-nuki-verde-02">15</p>
        </div>
        <p className="w-full text-[7px] text-nuki-cinza-medio">Opções de plantas</p>
      </div>

      <div className="absolute left-[57%] top-[22%] flex w-[20%] flex-col items-end rounded bg-nuki-branco p-2">
        <div className="flex w-full items-center gap-1">
          <img src="/recursos-controle-analise/ic-dashboard.svg" alt="" className="size-4" />
          <p className="text-[14px] font-semibold text-nuki-verde-02">95</p>
        </div>
        <p className="w-full text-[7px] text-nuki-cinza-medio">Opções de acabamentos</p>
      </div>

      <div className="absolute right-[4%] top-[22%] flex w-[20%] flex-col items-end rounded bg-nuki-branco p-2">
        <div className="flex w-full items-center gap-1">
          <img src="/recursos-controle-analise/ic-folder.svg" alt="" className="size-4" />
          <p className="text-[14px] font-semibold text-nuki-verde-02">250</p>
        </div>
        <p className="w-full text-[7px] text-nuki-cinza-medio">Clientes cadastrados</p>
      </div>

      <div className="absolute left-[35%] right-[4%] top-[35%] flex items-center gap-3 rounded bg-nuki-branco p-3">
        <div className="relative size-16 shrink-0">
          <Image
            src="/recursos-controle-analise/grafico-pizza.svg"
            alt="Pie chart"
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-bold text-nuki-cinza">Status dos clientes</p>
          </div>
          <p className="text-[7px] text-nuki-cinza-medio">
            Divisão dos clientes por status
          </p>
          <ul className="flex flex-col gap-1 text-[7px]">
            <StatusLegend color="bg-nuki-verde-08" label="Finalizado" />
            <StatusLegend color="bg-[#049494]" label="Esperando validação" />
            <StatusLegend color="bg-[#05b1b1]" label="Em aberto" />
            <StatusLegend color="bg-[#b3efef]" label="Não acessou" />
          </ul>
        </div>
      </div>

      <div className="absolute left-[4%] top-[58%] flex w-[28%] flex-col gap-2 rounded bg-nuki-branco p-3">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-bold text-[#0d0d0d]">Informações</p>
          <button className="rounded-full border border-nuki-verde-02 px-2 py-0.5 text-[6px] text-nuki-verde-02">
            ✎ Editar
          </button>
        </div>
        <div className="h-px w-full bg-nuki-cinza-divisor" />
        {[
          "Endereço:",
          "Tipo:",
          "Lançamento:",
          "Início obras:",
          "Inicio personalização:",
          "Fim personalização:",
        ].map((label) => (
          <div key={label} className="flex items-center gap-1">
            <span className="text-[7px] text-nuki-cinza-medio">{label}</span>
            <div className="h-1.5 flex-1 rounded-full bg-[#d9d9d9]/40" />
          </div>
        ))}
      </div>

      <div className="absolute left-[35%] right-[26%] top-[58%] flex flex-col gap-2 rounded bg-nuki-branco p-3">
        <p className="text-[8px] font-bold text-[#0d0d0d]">Top 10 composições escolhidos</p>
        <div className="h-px w-full bg-nuki-cinza-divisor" />
        <div className="flex items-center gap-1">
          <img src="/recursos-controle-analise/ic-filter.svg" alt="" className="size-2" />
          <p className="text-[7px] text-nuki-cinza-medio">Cozinha e A.S.</p>
        </div>
        <div className="flex flex-col gap-1">
          {[
            { w: "90%", count: "1,230" },
            { w: "65%", count: "751" },
            { w: "45%", count: "471" },
            { w: "32%", count: "280" },
            { w: "18%", count: "87" },
            { w: "10%", count: "50" },
            { w: "8%", count: "48" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 rounded bg-[#b3efef]" style={{ width: b.w }} />
              <span className="text-[7px] text-nuki-cinza-medio">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[4%] top-[58%] flex w-[22%] flex-col gap-2 rounded bg-nuki-branco p-3">
        <p className="text-[8px] font-bold text-[#0d0d0d]">Clientes com acesso pendente</p>
        <p className="text-[7px] text-nuki-cinza-medio">250 clientes</p>
        <div className="h-px w-full bg-nuki-cinza-divisor" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="h-2 w-full rounded-full bg-[#d9d9d9]/40" />
            <div className="flex items-center gap-1">
              <img src="/recursos-controle-analise/ic-email.svg" alt="" className="size-2" />
              <div className="h-1.5 flex-1 rounded-full bg-[#d9d9d9]/40" />
            </div>
            {i < 4 && <div className="h-px w-full bg-nuki-cinza-divisor" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusLegend({ color, label }: { color: string; label: string }) {
  return (
    <li className="flex items-center gap-1">
      <span className={`size-1.5 shrink-0 rounded-full ${color}`} aria-hidden />
      <span className="flex-1 text-nuki-cinza-medio">{label}</span>
      <div className="h-1.5 w-8 rounded-full bg-[#d9d9d9]/40" />
    </li>
  );
}

const statusTagStyles = {
  aberto: "bg-nuki-status-roxo text-nuki-cinza-medio",
  finalizado: "bg-nuki-status-verde text-nuki-cinza-medio",
  naoAcessou: "bg-nuki-status-vermelho text-nuki-cinza-medio",
  esperando: "bg-nuki-status-laranja text-nuki-cinza-medio",
};

const tableRows: { status: keyof typeof statusTagStyles; label: string }[] = [
  { status: "aberto", label: "Em aberto" },
  { status: "finalizado", label: "Finalizado" },
  { status: "naoAcessou", label: "Não acessou" },
  { status: "esperando", label: "Esperando validação" },
  { status: "aberto", label: "Em aberto" },
  { status: "aberto", label: "Em aberto" },
  { status: "naoAcessou", label: "Não acessou" },
  { status: "esperando", label: "Esperando validação" },
];

function ClientesMockup() {
  return (
    <div className="relative w-full lg:flex-1 lg:max-w-[604px]">
      <div className="relative w-full overflow-hidden rounded-[36px] bg-[#fafafa] shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-end gap-2 border-b border-nuki-cinza-divisor bg-nuki-branco px-4 py-2">
          <img src="/recursos-controle-analise/ic-info.svg" alt="" className="size-3" />
          <div className="relative">
            <img src="/recursos-controle-analise/ic-notifications.svg" alt="" className="size-3" />
          </div>
          <div className="size-3 rounded-full bg-nuki-cinza-borda" />
          <div className="h-2 w-12 rounded-full bg-[#d9d9d9]/40" />
          <img src="/recursos-controle-analise/ic-logout.svg" alt="" className="size-3" />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-1 text-[8px]">
            <span className="text-nuki-cinza-7">Empreendimentos</span>
            <span className="text-nuki-cinza-7">/</span>
            <span className="text-nuki-cinza">Clientes</span>
          </div>
          <h3 className="mt-3 text-[14px] font-semibold text-[#0d0d0d]">Clientes</h3>
          <p className="text-[9px] text-nuki-cinza">
            Gerencie todas os clientes desse empreendimento
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-full border border-nuki-cinza-borda px-3 py-1.5">
              <span className="text-[8px] text-nuki-cinza-7">Pesquisar por nome</span>
              <img src="/recursos-controle-analise/ic-search.svg" alt="" className="size-2" />
            </div>
            <p className="text-[8px] text-nuki-cinza-7">Última alteração: 25/08/2024</p>
          </div>
        </div>

        <div className="mx-4 mb-4 rounded-2xl bg-nuki-branco shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between border-b border-nuki-cinza-divisor px-3 py-2">
            <div className="flex flex-wrap items-center gap-3 text-[7px] text-nuki-cinza-medio">
              <span className="flex items-center gap-1">
                <img src="/recursos-controle-analise/ic-info.svg" alt="" className="size-2 -rotate-90" />
                Ordenar <ChevronTinyDown />
              </span>
              <span className="flex items-center gap-1">
                <img src="/recursos-controle-analise/ic-filter.svg" alt="" className="size-2" />
                Torre <ChevronTinyDown />
              </span>
              <span className="flex items-center gap-1">
                <img src="/recursos-controle-analise/ic-filter.svg" alt="" className="size-2" />
                Acessos <ChevronTinyDown />
              </span>
              <span className="flex items-center gap-1">
                <img src="/recursos-controle-analise/ic-filter.svg" alt="" className="size-2" />
                Status <ChevronTinyDown />
              </span>
              <span className="flex items-center gap-1">
                <img src="/recursos-controle-analise/ic-filter.svg" alt="" className="size-2" />
                Favoritos <ChevronTinyDown />
              </span>
            </div>
            <button className="flex shrink-0 items-center gap-1 rounded-full bg-nuki-verde-02 px-2 py-1 text-[7px] text-nuki-branco">
              <img src="/recursos-controle-analise/ic-plus.svg" alt="" className="size-2" />
              Adicionar clientes
            </button>
          </div>

          <div className="overflow-hidden rounded-b-2xl">
            <div className="flex items-center bg-nuki-cinza-claro text-[5px] text-nuki-preto">
              {["", "Nome", "CPF/CNPJ", "Contato", "Torre/Unidade", "Planta", "Acessos", "Contrato", "Valor", "Status", ""].map(
                (h, i) => (
                  <div
                    key={i}
                    className={`px-1 py-2 ${
                      i === 0 || i === 10 ? "w-4 shrink-0" : i === 4 ? "w-12 shrink-0" : i === 9 ? "w-12 shrink-0" : "flex-1"
                    }`}
                  >
                    {h}
                  </div>
                ),
              )}
            </div>

            {tableRows.map((row, i) => (
              <div
                key={i}
                className={`flex items-center text-[5px] ${i % 2 === 0 ? "bg-nuki-branco" : "bg-[#fafafa]"}`}
              >
                <div className="flex w-4 shrink-0 items-center justify-center py-2">
                  <img src="/recursos-controle-analise/ic-star.svg" alt="" className="size-2" />
                </div>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
                  <div key={c} className={`px-1 py-2 ${c === 3 ? "w-12 shrink-0" : "flex-1"}`}>
                    <div className="h-1.5 w-full rounded-full bg-[#d9d9d9]/40" />
                  </div>
                ))}
                <div className="w-12 shrink-0 px-1 py-2">
                  <span
                    className={`flex items-center justify-center gap-0.5 rounded px-1 py-0.5 text-[5px] ${statusTagStyles[row.status]}`}
                  >
                    {row.label}
                    <img src="/recursos-controle-analise/ic-info.svg" alt="" className="size-1.5" />
                  </span>
                </div>
                <div className="flex w-4 shrink-0 items-center justify-center py-2">
                  <img src="/recursos-controle-analise/ic-more.svg" alt="" className="size-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const perfis = [
  {
    nome: "Administrador",
    cor: "bg-[#7fcfcf]",
    permissoes: ["Cadastros", "Relatórios", "Financeiro", "Acessos"],
  },
  {
    nome: "Gerente",
    cor: "bg-nuki-verde-02",
    permissoes: ["Cadastros", "Relatórios", "Financeiro"],
  },
  {
    nome: "Atendente",
    cor: "bg-[#b3efef]",
    permissoes: ["Cadastros", "Relatórios"],
  },
];

function GerencieTimeMockup() {
  return (
    <div className="relative w-full lg:flex-1 lg:max-w-[700px]">
      <div className="relative w-full overflow-hidden rounded-[36px] bg-nuki-branco shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between border-b border-nuki-cinza-divisor px-6 py-3">
          <div className="flex flex-col">
            <p className="text-[14px] font-semibold text-[#0d0d0d] sm:text-[16px] md:text-[18px]">
              Perfis de acesso
            </p>
            <p className="text-[10px] text-nuki-cinza sm:text-[12px]">
              Gerencie permissões por perfil
            </p>
          </div>
          <button className="flex items-center gap-1 rounded-full bg-nuki-verde-02 px-3 py-1.5 text-[10px] font-semibold text-nuki-branco sm:px-4 sm:text-[12px]">
            <img src="/recursos-controle-analise/ic-plus.svg" alt="" className="size-3" />
            Novo perfil
          </button>
        </div>

        <div className="flex flex-col gap-3 p-6">
          {perfis.map((perfil) => (
            <div
              key={perfil.nome}
              className="flex items-center justify-between gap-3 rounded-2xl border border-nuki-cinza-divisor bg-nuki-cinza-claro px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className={`flex size-8 items-center justify-center rounded-full ${perfil.cor}`}>
                  <img src="/recursos-controle-analise/ic-check.svg" alt="" className="size-4 brightness-0 invert" />
                </span>
                <div className="flex flex-col">
                  <p className="text-[12px] font-bold text-[#0d0d0d] sm:text-[14px]">
                    {perfil.nome}
                  </p>
                  <p className="text-[9px] text-nuki-cinza sm:text-[11px]">
                    {perfil.permissoes.length} permissões ativas
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {perfil.permissoes.map((p) => (
                  <span
                    key={p}
                    className="rounded-md bg-nuki-verde-suave px-2 py-0.5 text-[8px] text-nuki-verde-02 sm:text-[10px]"
                  >
                    {p}
                  </span>
                ))}
                <img src="/recursos-controle-analise/ic-more.svg" alt="" className="size-3 shrink-0" />
              </div>
            </div>
          ))}

          <div className="mt-2 flex items-center justify-between border-t border-nuki-cinza-divisor pt-4">
            <p className="text-[10px] text-nuki-cinza-medio sm:text-[12px]">
              3 perfis ativos · 12 usuários
            </p>
            <button className="rounded-full border border-nuki-preto px-3 py-1 text-[10px] font-semibold text-nuki-preto sm:text-[12px]">
              Ver todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronTinyDown() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-2" aria-hidden="true">
      <path d="M5.59 7.5L10 12L14.41 7.5L13 6L10 9L7 6L5.59 7.5Z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.5 14.41C12.82 14.08 12.82 13.56 12.5 13.23L9.27 10L12.5 6.77C12.82 6.44 12.82 5.92 12.5 5.59C12.17 5.27 11.65 5.27 11.32 5.59L7.5 9.42C7.17 9.74 7.17 10.26 7.5 10.58L11.32 14.41C11.65 14.73 12.17 14.73 12.5 14.41Z" />
    </svg>
  );
}
