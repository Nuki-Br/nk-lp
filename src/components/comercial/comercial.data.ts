/* Conteúdo da apresentação comercial Nuki.
   Rascunhos baseados em (a) PPT "Migração do Modelo de Precificação" (slides 1-13)
   e (b) contexto-de-produto-v2.md (§§ 1-12). Copy pode ser refinado pelo user;
   estrutura das seções serve como base. */

export const comercialNav = [
  { id: "capa", label: "Capa" },
  { id: "problema", label: "O problema" },
  { id: "o-que-e", label: "O que é a Nuki" },
  { id: "planner", label: "Planner" },
  { id: "personaliza", label: "Personaliza" },
  { id: "inspetor", label: "Inspetor" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "publico", label: "Pra quem serve" },
  { id: "cases", label: "Cases" },
  { id: "calculadora", label: "Estime o setup" },
  { id: "cta", label: "Plano & contato" },
  { id: "total", label: "Total estimado" },
] as const;

export type ProblemaCard = {
  step: string;
  titulo: string;
  descricao: string;
  dor: string;
};

export const problemaCards: ProblemaCard[] = [
  {
    step: "Etapa 01",
    titulo: "Planejamento",
    descricao:
      "Antes da venda, a construtora monta o memorial: catálogo, opções por tipologia, custos e preços. Hoje isso vive em planilhas com múltiplas versões por e-mail, com dados entrando na plataforma só ao final.",
    dor: "Processo consome 3 a 4 meses, com alto risco de erro e retrabalho.",
  },
  {
    step: "Etapa 02",
    titulo: "Atendimento",
    descricao:
      "Com o memorial pronto, o cliente escolhe seus acabamentos. Sem plataforma, isso acontece por planilhas, PDFs e e-mails, com troca manual entre pós-venda, engenharia e compras.",
    dor: "Erros de interpretação, falta de rastreabilidade e risco jurídico.",
  },
  {
    step: "Etapa 03",
    titulo: "Vistoria em obra",
    descricao:
      "Depois de executado, alguém confere se o que foi personalizado foi entregue. Prancheta, foto solta no celular e WhatsApp com a obra.",
    dor: "Problema encontrado na vistoria com o cliente custa muito mais para corrigir.",
  },
];

export type FluxoModulo = {
  fase: string;
  nome: string;
  descricao: string;
};

export const fluxoModulos: FluxoModulo[] = [
  {
    fase: "Antes da venda",
    nome: "Planner",
    descricao: "Planejamento e formação de custo do memorial de personalização.",
  },
  {
    fase: "Durante a venda",
    nome: "Personaliza",
    descricao: "Atendimento ao cliente e gestão das escolhas de acabamento.",
  },
  {
    fase: "Após a execução",
    nome: "Inspetor",
    descricao: "Validação do que foi executado vs. o que foi personalizado pelo cliente.",
  },
];

export type Diferencial = {
  n: string;
  titulo: string;
  descricao: string;
};

export const diferenciais: Diferencial[] = [
  {
    n: "01",
    titulo: "Cobertura do ciclo completo",
    descricao:
      "A única plataforma que conecta planejamento, atendimento e vistoria em obra — do custo à entrega.",
  },
  {
    n: "02",
    titulo: "Integração nativa entre módulos",
    descricao:
      "Os dados fluem automaticamente entre fases. Publicou no Planner, alimentou o Personaliza. Escolheu no Personaliza, virou checklist no Inspetor.",
  },
  {
    n: "03",
    titulo: "Flexibilidade sem perder estrutura",
    descricao:
      "Fórmulas de preço livres, catálogo customizável, fluxo adaptável ao porte da construtora — sem modelo imposto.",
  },
  {
    n: "04",
    titulo: "Feito pra realidade de obra",
    descricao:
      "O Inspetor funciona offline, com foco em velocidade e captura fotográfica no campo. Sincroniza sozinho ao voltar o sinal.",
  },
  {
    n: "05",
    titulo: "Rastreabilidade e segurança jurídica",
    descricao:
      "Cada decisão, custo, escolha e inspeção fica registrada com data, responsável e histórico. Em disputa, você tem a prova.",
  },
  {
    n: "06",
    titulo: "Escalabilidade operacional",
    descricao:
      "Processo estruturado que cresce com o volume de empreendimentos, sem aumentar headcount na mesma proporção.",
  },
];

export type Persona = {
  role: string;
  nome: string;
  foco: string;
  dor: string;
};

export const personas: Persona[] = [
  {
    role: "Persona 01",
    nome: "Coordenadora de Personalização",
    foco:
      "Organização e controle do processo, redução de retrabalho, visibilidade em tempo real do andamento das unidades.",
    dor:
      "Processos manuais sem padronização, falta de rastreabilidade das escolhas, pressão da obra e da diretoria.",
  },
  {
    role: "Persona 02",
    nome: "Diretor / CEO",
    foco:
      "Eficiência operacional e margem, diferenciação de mercado, escalabilidade sem aumento de headcount, governança e redução de risco.",
    dor:
      "Retrabalho invisível que come margem, disputas jurídicas, tecnologia como vantagem competitiva ainda não capturada.",
  },
  {
    role: "Persona 03",
    nome: "Supervisor de Obra",
    foco:
      "Clareza sobre o que precisa ser corrigido, documentação que sustenta decisões técnicas, comunicação limpa com o pós-venda.",
    dor:
      "Recebe comunicados vagos sobre o que corrigir, sem registro formal do que foi aprovado ou rejeitado.",
  },
];

export const fitList = [
  "Múltiplos empreendimentos ou torres simultâneas com personalização",
  "Retrabalho entre planejamento, pós-venda, engenharia e obra",
  "Objetivo de profissionalizar o atendimento ao cliente na etapa de personalização",
  "Necessidade de rastreabilidade e segurança jurídica no processo",
  "Escalar volume de empreendimentos sem aumentar headcount operacional",
];

/* ============================================================
   Calculadora "Estime o setup"

   Hierarquia: empreendimento → metragens (1-3) → variações (1-3).
   Cada metragem tem uma lista de ambientes editável. Por default vem
   com Quartos + Banheiros; o user adiciona ambientes custom via
   "+ Adicionar ambiente" (nome + classificação seca/molhada).

   Cálculo por ambiente:
     imgs = ambiente.quantidade × ambiente.componentes × opcoes[classe]
   Onde opcoes[classe] vem dos inputs globais de "Opções por componente"
   separados em secas vs molhadas.

   Referência histórica dos números do orçamento Tecer/Manawa (R01, 27/06/2026)
   quando as unidades assumiam 3 opções por componente:
     Sala 10 · Dorm 10 · Escrit 10 · Cozinha 19 · Lavabo 20 · Banho 23
     Lavanderia 17 · Varanda 18
   Não é mais fonte primária — serve só de sanity check pros defaults.
   ============================================================ */

/** Classe do ambiente decide qual multiplicador de opções usar. Áreas
    molhadas (banho, cozinha, lavanderia) oferecem mais superfícies
    personalizáveis do que secas (quartos, sala). */
export type AmbienteClasse = "seca" | "molhada";

/** Categoria de "peso" visual do tile — 3 tiers só, pra ler à distância
    sem virar um degradê contínuo difícil de decodificar. */
export type AmbientePeso = "leve" | "medio" | "pesado";

/** Configuração de um ambiente dentro de uma metragem. */
export type AmbienteConfig = {
  /** único por metragem: "quartos"/"banheiros" pros defaults, "custom-N" pros criados pelo user */
  id: string;
  nome: string;
  classe: AmbienteClasse;
  peso: AmbientePeso;
  quantidade: number;
  componentes: number;
  /** true = não pode ser removido nem tem nome/classe editáveis (defaults Quartos/Banheiros) */
  locked?: boolean;
};

/** Ambientes impactados pelas variações extras da metragem — keyed pelo
    ambient.id. Cada id marcado contribui com 1 unidade × img por variação
    extra. Modelo simples que cobre "cozinha aberta", "1 quarto que vira
    escritório", "banho reformulado" sem bundles fixos. */
export type ImpactoAmbientes = Record<string, boolean>;

export const emptyImpacto = (): ImpactoAmbientes => ({});

/** Ambientes com que toda metragem começa. Só Quartos + Banheiros — o
    resto o user adiciona via "+ Adicionar ambiente" digitando nome e
    escolhendo seca/molhada. */
export const buildDefaultAmbientes = (): AmbienteConfig[] => [
  {
    id: "quartos",
    nome: "Quartos",
    classe: "seca",
    peso: "leve",
    quantidade: 2,
    componentes: 3,
    locked: true,
  },
  {
    id: "banheiros",
    nome: "Banheiros",
    classe: "molhada",
    peso: "pesado",
    quantidade: 1,
    componentes: 8,
    locked: true,
  },
];

/** Defaults aplicados a ambientes custom criados via "+ Adicionar". */
export const CUSTOM_AMBIENTE_DEFAULTS = {
  peso: "medio" as AmbientePeso,
  quantidade: 1,
  componentes: 4,
};

/** Presets rápidos exibidos como chips no "+ Adicionar ambiente". Clicar num
    chip adiciona o ambient com nome + classe pré-preenchidos + defaults de
    peso/quantidade/componentes (via CUSTOM_AMBIENTE_DEFAULTS) — user pode
    editar depois nos controles do tile. Bate com a lista histórica de
    referência: Sala/Cozinha/Lavabo/Lavanderia/Varanda. Cobre 3 molhadas +
    2 secas — as combinações mais comuns em apto residencial. */
export const AMBIENTE_PRESETS: readonly {
  readonly nome: string;
  readonly classe: AmbienteClasse;
}[] = [
  { nome: "Sala", classe: "seca" },
  { nome: "Lavabo", classe: "molhada" },
  { nome: "Cozinha", classe: "molhada" },
  { nome: "Lavanderia", classe: "molhada" },
  { nome: "Varanda", classe: "seca" },
];

export type MetragemState = {
  /** id estável pra React keys; muda por metragem, nunca reindex por posição */
  id: number;
  ambientes: AmbienteConfig[];
  variacoes: number;
  impactoAmbientes: ImpactoAmbientes;
};

export const CALC_DEFAULTS = {
  opcoesSecas: 3,
  opcoesMolhadas: 3,
  /** Valor por imagem em R$. Não é editável na UI do cliente — só via painel
      escondido (Ctrl+Alt+K). Ver Calculadora.tsx. */
  precoPorImagem: 28,
  metragensIniciais: (): MetragemState[] => [
    {
      id: 1,
      ambientes: buildDefaultAmbientes(),
      variacoes: 1,
      impactoAmbientes: emptyImpacto(),
    },
  ],
};

export const CALC_RANGES = {
  quantidade: { min: 0, max: 5 },
  componentes: { min: 1, max: 15 },
  variacoes: { min: 1, max: 3 },
  metragens: { min: 1, max: 6 },
  opcoesSecas: { min: 1, max: 6 },
  opcoesMolhadas: { min: 1, max: 8 },
  precoPorImagem: { min: 1, max: 999 },
};

export type Plano = {
  n: string;
  itens: string[];
  /** Rótulo de exibição formatado (ex: "R$ 889/mês") */
  preco: string;
  /** Valor mensal cru pra cálculos (soma × meses no simulador do CTA) */
  precoMes: number;
  destaque?: boolean;
};

/** Ciclo de cobrança — desconto aplicado sobre o preço mensal de cada plano. */
export type CicloCobranca = { id: string; label: string; desconto: number };

/** Descontos progressivos por ciclo. Sem trimestral — só semestral (−5%)
    e anual (−10%). */
export const ciclosCobranca: CicloCobranca[] = [
  { id: "mensal", label: "Mensal", desconto: 0 },
  { id: "semestral", label: "Semestral", desconto: 0.05 },
  { id: "anual", label: "Anual", desconto: 0.1 },
];

/** Modelo de precificação: um plano só, com todos os módulos inclusos.
    Array de um item porque o CTA e o simulador de meses operam sobre lista —
    mantém a porta aberta pra voltar a ter tiers sem refactor. */
export const planos: Plano[] = [
  {
    n: "Plano único",
    itens: ["Planner", "Personaliza", "Inspetor", "Infraestrutura", "Suporte"],
    preco: "R$ 1.150/mês",
    precoMes: 1150,
    destaque: true,
  },
];
