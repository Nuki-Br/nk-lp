/**
 * Dados dos módulos (Planner · Personaliza · Inspetor) usados na apresentação
 * comercial. Cópia inicial do que existe em `nk-lp/src/components/jornada/
 * journey.data.ts` — desacoplado propositalmente: alterar copy/screenshots da
 * home não afeta a apresentação comercial e vice-versa. Types locais pra
 * evitar dependência cruzada entre as duas seções do site.
 *
 * Assets continuam vindo de `/public/jornada/*.webp` (compartilhados).
 */

export type ShotKind = "desktop" | "phone";

export type ModuloShot = {
  /** nome-base do asset em /public/jornada (sem sufixo de largura/extensão) */
  base: string;
  kind: ShotKind;
  alt: string;
};

export type ModuloBeat = {
  title: string;
  description: string;
  shot: ModuloShot;
};

export type ModuloHighlight = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type ModuloData = {
  /** id da âncora (#planner/#personaliza/#inspetor) — casa com comercialNav */
  id: string;
  tag: string;
  /** Título dividido em prefixo de peso normal + palavra principal em extrabold
      — assinatura tipográfica Nuki (`Conheça o **Planner**`), espelha o padrão
      dos H2 do /antiga (SobreANuki, SuaIdentidade, SobrePlataforma). `strong` é
      também a palavra usada isoladamente pelos consumidores (CTA "Explorar o
      {strong}", aria-labels, alt-texts) — mantém strings curtas e naturais. */
  title: { pre: string; strong: string };
  /** intro curta que aparece no topo da coluna esquerda */
  descricao: string;
  beats: ModuloBeat[];
  highlights: ModuloHighlight[];
  saibaMaisHref: string;
  /** Opcional. CTAs que abrem o produto real em nova aba. Tem precedência sobre
      `demoUrl` e sobre o "Saiba mais" — quando o módulo já tem app público no ar,
      mandar o prospect pro produto vale mais que qualquer demo embutida. */
  links?: { label: string; href: string }[];
  /** Opcional. Se presente, um segundo slide fullscreen é renderizado logo após o
      descritivo com esse HTML embutido num iframe. O descritivo troca o "Saiba
      mais" por um CTA "▷ Explorar o {title}" que ancora em `#{id}-demo`.
      Sem demoUrl → módulo mantém apenas o slide descritivo. */
  demoUrl?: string;
  /** Opcional. ID do vídeo YouTube (11 chars) ou URL completa. Quando setado, a
      coluna direita do descritivo hospeda o vídeo explicativo em vez do cross-fade
      de screenshots. Ativação real via `<YouTubeEmbed>` do `@next/third-parties/google`
      — pacote ainda não instalado (todos módulos com `videoUrl` undefined nesta
      iteração). Ver `ModuloSlide.tsx` para o snippet de ativação. */
  videoUrl?: string;
};

export const modulos: ModuloData[] = [
  {
    id: "planner",
    tag: "Fase 01 — Planejamento",
    title: { pre: "Conheça o", strong: "Planner" },
    descricao:
      "Estrutura o memorial e forma o custo antes da venda começar — o que hoje leva 3 a 4 meses em planilhas. Catálogo, tipologias e preços na plataforma, com a construtora colaborando por link e rastreabilidade total.",
    saibaMaisHref: "/recursos/controle-analise",
    links: [{ label: "Explorar o Planner", href: "https://planner.nukibr.com/" }],
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
    tag: "Fase 02 — Personalização",
    title: { pre: "Descubra o", strong: "Personaliza" },
    descricao:
      "Seu cliente escolhe os acabamentos vendo o impacto técnico e financeiro na hora — e cada decisão vira aditivo digital, receita no dashboard e insumo pronto para a obra. Tudo puxando o que o Planner já produziu.",
    saibaMaisHref: "/recursos/personalizacao",
    links: [
      { label: "Conheça o Personaliza", href: "https://admin.nukibr.com/" },
      { label: "Visão do cliente", href: "https://structa.nukibr.com/" },
    ],
    beats: [
      {
        title: "Começa pela planta ideal",
        description:
          "O cliente filtra por preferência — quartos, suítes, varanda, cozinha — e já escolhe a tipologia que combina com o estilo de vida dele.",
        shot: {
          base: "personaliza-planta",
          kind: "desktop",
          alt: "Tela do Personaliza: filtros de preferência e cards de tipologia para o cliente escolher a planta ideal",
        },
      },
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
        title: "Formaliza com aditivo digital",
        description:
          "Escolha aprovada vira aditivo com assinatura eletrônica — tudo puxando o que o Planner já produziu.",
        shot: {
          base: "personaliza-adtivo",
          kind: "desktop",
          alt: "Tela do Personaliza: aditivo digital gerado a partir da escolha, com assinatura eletrônica",
        },
      },
      {
        title: "Personalização vira receita visível",
        description:
          "Acompanhe ticket médio, conversão do funil e receita por empreendimento em tempo real. O que o cliente escolhe vira número na diretoria.",
        shot: {
          base: "personaliza-dashboard",
          kind: "desktop",
          alt: "Dashboard da construtora: receita líquida, ticket médio, funil de personalização e performance por empreendimento",
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
    tag: "Fase 03 — Entrega",
    title: { pre: "Entenda o", strong: "Inspetor" },
    descricao:
      "A vistoria sai do papel e ganha rastreabilidade. Checklist automático das escolhas do cliente, foto e conformidade item a item, relatório pronto no fim da inspeção — retrabalho de obra custa 10x mais quando aparece na entrega.",
    saibaMaisHref: "/recursos/controle-analise",
    demoUrl: "/demos/inspetor/index.html",
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
