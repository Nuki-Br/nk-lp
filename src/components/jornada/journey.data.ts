// Conteúdo da jornada animada (Planner · Personaliza · Inspetor).
// Portado de nk-lp-animation/index.html — data-driven para os componentes.
// Métricas (target) e destinos "Saiba mais" são placeholders sinalizados no
// README da animação; trocar pelos valores reais no sign-off de marketing.

export type ShotKind = "desktop" | "phone";

export type JourneyShot = {
  /** nome-base do asset em /public/jornada (sem sufixo de largura/extensão) */
  base: string;
  kind: ShotKind;
  alt: string;
};

export type JourneyBeat = {
  title: string;
  description: string;
  shot: JourneyShot;
};

export type JourneyHighlight = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type JourneyModuleData = {
  /** id da âncora (#planner/#personaliza/#inspetor) */
  id: string;
  /** numeral gigante de fundo */
  num: string;
  tag: string;
  title: string;
  /** layout espelhado (texto à direita, fundo cinza-claro) */
  reverse?: boolean;
  /**
   * "beats" (padrão): cada passo é uma linha texto | imagem lado a lado.
   * "sticky-device": um único celular fica fixo (sticky) ao lado e a tela
   * troca por passo — usado p/ telas em proporção de celular (Inspetor).
   * "sticky-media": mesmo sticky, porém full-bleed e em proporção landscape —
   * a imagem sangra até a borda e troca por passo (Planner/Personaliza).
   */
  layout?: "beats" | "sticky-device" | "sticky-media";
  beats: JourneyBeat[];
  highlights: JourneyHighlight[];
  saibaMaisHref: string;
};

export const journeyNav = [
  { id: "planner", label: "Planner" },
  { id: "personaliza", label: "Personaliza" },
  { id: "inspetor", label: "Inspetor" },
] as const;

export const journeyModules: JourneyModuleData[] = [
  {
    id: "planner",
    num: "01",
    tag: "Fase 01 — Planejamento",
    title: "Planner",
    layout: "sticky-media",
    saibaMaisHref: "/recursos/controle-analise",
    beats: [
      {
        title: "Configure o memorial",
        description:
          "Tipologias, ambientes, materiais e kits num só lugar — a estrutura da personalização, sem planilha solta.",
        shot: {
          base: "configure-memorial",
          kind: "desktop",
          alt: "Tela do Planner: configuração do memorial com tipologias, ambientes, materiais e kits num só lugar",
        },
      },
      {
        title: "Construa os custos com fórmulas livres",
        description:
          "Crie as colunas de cálculo como sua empresa trabalha; a construtora preenche por link, com histórico de versões.",
        shot: {
          base: "planner-orcamento",
          kind: "desktop",
          alt: "Tela do Planner: orçamento por tipologia, com colunas de cálculo em fórmulas livres preenchidas pela construtora",
        },
      },
      {
        title: "Visualize, edite e conecte",
        description:
          "Monte o catálogo de materiais num mapa editável com sua equipe. As opções configuradas aqui alimentam direto o orçamento e as escolhas do cliente.",
        shot: {
          base: "vizualizador-planner",
          kind: "desktop",
          alt: "Tela do Planner: mapa editável de materiais, conectado ao orçamento e às escolhas do cliente",
        },
      },
    ],
    highlights: [
      { target: 60, suffix: "%", label: "menos tempo no orçamento" },
      { target: 1, label: "estado único e versionado" },
    ],
  },
  {
    id: "personaliza",
    num: "02",
    tag: "Fase 02 — Personalização",
    title: "Personaliza",
    reverse: true,
    layout: "sticky-media",
    saibaMaisHref: "/recursos/personalizacao",
    beats: [
      {
        title: "O cliente escolhe vendo o impacto",
        description:
          "Cada acabamento com o impacto técnico e financeiro aparecendo na hora da escolha.",
        shot: {
          base: "personaliza-escolha",
          kind: "desktop",
          alt: "Tela do Personaliza: cliente escolhendo um acabamento com o impacto técnico e financeiro visível na hora",
        },
      },
      {
        title: "Visualiza no ambiente",
        description:
          "As opções aparecem no layout da unidade, com clareza do que está sendo escolhido.",
        shot: {
          base: "personaliza-ambiente",
          kind: "desktop",
          alt: "Tela do Personaliza: opções de acabamento aplicadas no layout da unidade",
        },
      },
      {
        title: "Formaliza com aditivo digital",
        description:
          "Escolha aprovada vira aditivo com assinatura eletrônica — tudo puxando o que o Planner já produziu.",
        shot: {
          base: "personaliza-adtivo",
          kind: "desktop",
          alt: "Tela do Personaliza: aditivo digital gerado a partir da escolha, com assinatura eletrônica",
        },
      },
    ],
    highlights: [
      { target: 100, suffix: "%", label: "das escolhas formalizadas" },
      { target: 3, label: "fases conectadas, sem digitar" },
    ],
  },
  {
    id: "inspetor",
    num: "03",
    tag: "Fase 03 — Entrega",
    title: "Inspetor",
    layout: "sticky-device",
    saibaMaisHref: "/recursos/controle-analise",
    beats: [
      {
        title: "Checklist das escolhas reais",
        description:
          "Na obra, o checklist já vem das escolhas do cliente — zero digitação para começar a vistoria.",
        shot: {
          base: "inspetor-checklist-2",
          kind: "phone",
          alt: "Tela do Inspetor no celular: checklist de vistoria já preenchido com as escolhas do cliente",
        },
      },
      {
        title: "Foto e conformidade item a item",
        description:
          "Compara o especificado com o executado, com foto e classificação de não conformidade.",
        shot: {
          base: "inspetor-vistoria",
          kind: "phone",
          alt: "Tela do Inspetor: vistoria item a item, comparando o especificado com o executado, com foto e não conformidade",
        },
      },
      {
        title: "Relatório pronto na entrega",
        description:
          "Conformidade e evidências consolidadas para a obra e a diretoria. O que foi prometido é o que se valida.",
        shot: {
          base: "inspetor-relatorio",
          kind: "phone",
          alt: "Tela do Inspetor: relatório de conformidade consolidado para a obra e a diretoria",
        },
      },
    ],
    highlights: [
      { target: 10, suffix: "x", label: "menos custo de retrabalho" },
      { target: 95, suffix: "%", label: "conformidade na entrega" },
    ],
  },
];
