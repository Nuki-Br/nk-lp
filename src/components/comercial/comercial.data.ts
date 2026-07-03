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
   Cada metragem tem sua própria composição de unidade e seus eixos
   de mudança entre variações. As contagens por ambiente NÃO são fixas —
   escalam com "opções por componente" oferecidas pela construtora,
   separadas para áreas secas (menos personalização) e molhadas
   (mais componentes: piso, parede, bancada, cuba, torneira, louça...).

   Números base do orçamento Tecer/Manawa (R01, 27/06/2026) assumindo
   ~3 opções por componente. Sala 10, Cozinha 19, Banho 23 etc. são o
   ponto de referência — escalam linearmente conforme o catálogo cresce.
   ============================================================ */

export const TECER_BASE = {
  sala: 10,
  dormitorio: 10,
  escritorio: 10,
  cozinha: 19,
  lavabo: 20,
  banho: 23,
  lavanderia: 17,
  varanda: 18,
} as const;

export type AmbienteTipo = keyof typeof TECER_BASE;

/** Áreas secas x molhadas — cada uma escala com seu próprio input de
    "opções por componente", porque na prática banho/cozinha oferecem
    muito mais surfaces de personalização do que sala/dormitório. */
export const AMBIENTES_SECAS = new Set<AmbienteTipo>(["sala", "dormitorio", "escritorio"]);
export const AMBIENTES_MOLHADAS = new Set<AmbienteTipo>([
  "cozinha",
  "lavabo",
  "banho",
  "lavanderia",
  "varanda",
]);

/** Categoria de "peso" visual dos ambientes — 3 tiers só, pra visualização
    ler à distância sem virar um degradê contínuo difícil de decodificar. */
export type AmbientePeso = "leve" | "medio" | "pesado";
export const AMBIENTE_PESO: Record<AmbienteTipo, AmbientePeso> = {
  sala: "leve",
  dormitorio: "leve",
  escritorio: "leve",
  lavanderia: "medio",
  varanda: "medio",
  cozinha: "medio",
  lavabo: "medio",
  banho: "pesado",
};

/** Baseline de opções/componente que gera os números do orçamento Tecer.
    scaleSecas = opcoesSecas / OPCOES_BASELINE, mesmo pra molhadas. */
export const OPCOES_BASELINE = 3;

/** Rótulo curto de cada tipo de ambiente, usado tanto no card de composição
    quanto na lista de "ambientes impactados". Formas no singular porque cada
    marca de impacto representa 1 unidade daquele tipo re-renderizada. */
export const AMBIENTE_LABEL: Record<AmbienteTipo, string> = {
  sala: "Sala",
  dormitorio: "Quarto",
  escritorio: "Escritório",
  cozinha: "Cozinha",
  lavabo: "Lavabo",
  banho: "Banheiro",
  lavanderia: "Lavanderia",
  varanda: "Varanda",
};

/** Ordem estável em que os ambientes aparecem nos controles de impacto. */
export const AMBIENTE_ORDEM: AmbienteTipo[] = [
  "sala",
  "cozinha",
  "lavanderia",
  "varanda",
  "lavabo",
  "escritorio",
  "dormitorio",
  "banho",
];

/** Ambientes impactados pelas variações extras da metragem. Cada tipo marcado
    contribui com 1 unidade × img(tipo) por variação extra. Modelo simples que
    cobre "cozinha aberta", "1 quarto que vira escritório", "banho reformulado"
    sem precisar de bundles fixos. */
export type ImpactoAmbientes = Partial<Record<AmbienteTipo, boolean>>;

export const emptyImpacto = (): ImpactoAmbientes => ({});

export type MetragemState = {
  /** id estável pra React keys; muda por metragem, nunca reindex por posição */
  id: number;
  dormitorios: number;
  banheiros: number;
  lavabo: boolean;
  escritorio: boolean;
  variacoes: number;
  impactoAmbientes: ImpactoAmbientes;
};

export const CALC_DEFAULTS = {
  opcoesSecas: 3,
  opcoesMolhadas: 3,
  precoPorImagem: 25,
  metragensIniciais: (): MetragemState[] => [
    {
      id: 1,
      dormitorios: 2,
      banheiros: 1,
      lavabo: false,
      escritorio: false,
      variacoes: 1,
      impactoAmbientes: emptyImpacto(),
    },
    {
      id: 2,
      dormitorios: 3,
      banheiros: 2,
      lavabo: true,
      escritorio: false,
      variacoes: 2,
      impactoAmbientes: { sala: true, cozinha: true, lavanderia: true, varanda: true },
    },
  ],
};

export const CALC_RANGES = {
  dormitorios: { min: 1, max: 5 },
  banheiros: { min: 1, max: 4 },
  variacoes: { min: 1, max: 3 },
  metragens: { min: 1, max: 3 },
  opcoesSecas: { min: 1, max: 6 },
  opcoesMolhadas: { min: 1, max: 8 },
  precoPorImagem: { min: 1, max: 999 },
};

export type Plano = {
  n: string;
  itens: string[];
  preco: string;
  destaque?: boolean;
};

export const planos: Plano[] = [
  {
    n: "Plano 01",
    itens: ["Planner", "Infraestrutura", "Suporte"],
    preco: "R$ 889/mês",
  },
  {
    n: "Plano 02",
    itens: ["Planner", "Personaliza", "Infraestrutura", "Suporte"],
    preco: "R$ 1.155/mês",
  },
  {
    n: "Plano 03",
    itens: ["Planner", "Personaliza", "Inspetor", "Infraestrutura", "Suporte"],
    preco: "R$ 1.450/mês",
    destaque: true,
  },
];
