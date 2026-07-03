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
