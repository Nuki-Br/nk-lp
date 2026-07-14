# Nuki — Módulo de Planejamento e Orçamento
### Documento de Produto e Fluxo de Telas · v2.0 · Junho 2026
 
---
 
## 1. Visão geral do módulo
 
O módulo de Planejamento e Orçamento é o ponto de entrada do ciclo de vida de um empreendimento na Nuki. Ele digitaliza o processo de definição de materiais, composição de custos e formação de preços de personalização — processo que hoje acontece inteiramente em planilhas, ao longo de 3 a 4 meses, com múltiplas versões e troca manual de arquivos entre incorporadora e construtora.
 
Ao final do processo, o módulo exporta automaticamente a configuração de materiais e preços para o módulo de Personalização de Unidades (fase 02), eliminando a entrada manual de dados entre as duas etapas.
 
### 1.1 Posicionamento nas fases do produto
 
| Fase | Módulo | Status |
|------|--------|--------|
| **01** | Planejamento e Orçamento | **Este documento** |
| **02** | Personalização de Unidades | Existente |
| **03** | Acompanhamento em Obra | Futuro |
 
> O módulo é um microserviço independente. Ao ser publicado, exporta a configuração necessária para alimentar o microserviço de Personalização.
 
### 1.2 Atores
 
| Ator | Acesso | Responsabilidade |
|------|--------|-----------------|
| **Incorporadora** | Plataforma Nuki (autenticado) | Configura tudo — catálogo, tipologias, kits, taxas. Valida custos e publica. |
| **Construtora** | Link tokenizado (sem login) | Preenche custos de material e mão de obra por item. |
| **Admin Nuki** | Plataforma Nuki (autenticado) | Suporte e visualização. Não participa do fluxo de orçamento. |
 
---
 
## 2. Jornada completa
 
```
CONFIGURAÇÃO
┌─────────────────────────────────────────────────────────────┐
│  1. Config base  →  2. Catálogo  →  3. Tipologias           │
└─────────────────────────────────────────────────────────────┘
                              ↓
CUSTOS
┌─────────────────────────────────────────────────────────────┐
│  4. Custos base  →  5. Construtor de preço                  │
│     ↑ opcional: envio de link para construtora preencher    │
└─────────────────────────────────────────────────────────────┘
                              ↓
PUBLICAÇÃO
┌─────────────────────────────────────────────────────────────┐
│  6. Publicar  →  alimenta fase 02 automaticamente           │
└─────────────────────────────────────────────────────────────┘
```
 
O envio de link para a construtora é **opcional** — algumas incorporadoras preenchem os custos internamente ou têm construtora própria.
 
---
 
## 3. Telas e fluxos detalhados
 
### 3.1 Dashboard
 
**Propósito:** ponto de entrada — visão geral de todos os empreendimentos em planejamento.
 
**Conteúdo:**
- Cards de resumo: total de empreendimentos, em andamento, publicados, rascunhos
- Tabela de empreendimentos: nome, construtora, status, data de envio, prazo de retorno, barra de progresso de preenchimento
- Filtros: por status, por período
- Ação primária: criar novo empreendimento
**Estados:**
- Vazio: onboarding com CTA "Criar primeiro empreendimento"
- Com dados: tabela paginada, clique na linha abre o empreendimento
**Navegação de saída:** → Config base (novo empreendimento) ou → Tipologias (empreendimento existente)
 
---
 
### 3.2 Config base
 
**Propósito:** dados fundamentais do empreendimento antes de qualquer configuração de materiais.
 
**Conteúdo:**
 
*Card "Dados do empreendimento":*
- Nome do empreendimento, torre/bloco (opcional)
- Incorporadora (preenchida automaticamente pela organização)
- Data base INCC
*Card "Construtora":*
- Nome da construtora
- E-mail(s) para envio do link de preenchimento
- Nota: campo opcional — nem toda incorporadora terceiriza a construção
*Card "Taxas globais":*
- Esses campos são o ponto de partida da fórmula de preço, mas **não são fixos** — cada campo pode ser sobrescrito por componente individualmente na tabela de orçamento
- Campos sugeridos como ponto de partida: taxa construtora (%), contingência INCC (%), taxa incorporadora (%)
- O usuário pode ignorar esses campos e definir tudo diretamente na tabela de orçamento
**Comportamento:**
- Autosave como rascunho
- Avança para Catálogo sem obrigatoriedade de preencher todos os campos
**Navegação de saída:** → Catálogo de materiais
 
---
 
### 3.3 Catálogo de materiais
 
**Propósito:** repositório centralizado de todos os materiais e kits disponíveis para o empreendimento. É a fundação — nada pode ser configurado nas tipologias sem que o item exista no catálogo.
 
**Conteúdo:**
- Listagem com filtro por categoria e busca por nome, código ou fabricante
- Chips de categoria para filtro rápido
- Distinção visual entre **materiais individuais** e **kits**
- Coluna "Uso": quantos componentes/tipologias referenciam aquele item, com modal de detalhamento
**Tipos de entidade no catálogo:**
 
**Material individual**
- Código de referência, especificação completa, fabricante, categoria, unidade de medida
- Custo material e custo de mão de obra — campos opcionais no catálogo (preenchidos via revisão de custos ou portal da construtora)
- Pode ser: piso, rodapé, pedra, metal, cuba, misturador, sifão, chuveiro, soleira, reserva técnica, etc.
**Kit**
- Nome do kit, categoria
- Composição: lista de materiais do próprio catálogo (N sub-itens)
- Sem custo no catálogo — custo é calculado pela soma dos sub-itens na revisão de custos
- Exemplos: "Metais Bronze" (Ducha + Monocomando + Chuveiro + Torneira), "Piso Barcelona + Rodapé + Soleira"
- A quantidade de cada sub-item **não** é definida no catálogo — é definida por tipologia
**Distinção visual:**
- Badge "Kit" na coluna tipo, com ícone de agrupamento
- Na coluna especificação: kits mostram nome + "· N itens"
- Na coluna custo: kits mostram `—`
**Ações:**
- Adicionar material (modal com campos de cadastro)
- Criar kit (modal com nome, categoria e seleção de sub-itens do catálogo)
- Editar, arquivar
- Importar via CSV (materiais individuais apenas)
**Importação CSV:**
- Fluxo de 4 etapas: Upload → Mapeamento de colunas → Pré-visualização → Confirmação
- Campos importáveis: código, especificação, fabricante, categoria, unidade, custo material, custo MO
- Custo pode ser vazio — preenchido depois
**Navegação de saída:** → Tipologias
 
---
 
### 3.4 Tipologias
 
**Propósito:** definir a estrutura completa do empreendimento — variações de planta, ambientes, componentes e a composição de materiais/kits de cada componente.
 
**Layout:** duas colunas — lista de tipologias à esquerda, detalhe da tipologia selecionada à direita.
 
**Painel esquerdo — lista de tipologias:**
- Cada card: nome, status (completa/incompleta), progresso de componentes configurados
- Ações: adicionar tipologia, duplicar
- Duplicar copia estrutura de ambientes e componentes, mas não as associações de materiais
**Painel direito — detalhe:**
 
*Cabeçalho:*
- Nome, metragem, descrição do layout
- Grupos de unidades (UnitGroups da fase 02): chips editáveis
*Accordion de ambientes:*
- Cada ambiente lista seus componentes
- Por componente: nome, unidade de medida, quantidade, % reserva técnica, material/kit padrão associado
- Badge "Kit" quando o padrão for um kit
- Botão "Configurar →" abre a tela de configuração de materiais por componente
*Ações:*
- Adicionar ambiente (modal simples)
- Adicionar componente (modal com nome, unidade, quantidade, RT, seleção do padrão)
- Reordenar por drag
**Modal "Adicionar componente":**
- Nome, unidade de medida, quantidade, % reserva técnica
- Campo "Material/kit padrão": seleciona do catálogo — lista materiais e kits (com badge distintos)
- Se kit for selecionado como padrão → segundo passo do modal pede o quantitativo de cada sub-item para esta tipologia
**Navegação de saída:** → Configuração de materiais por componente (ao clicar em "Configurar →") ou → Custos base (ao avançar)
 
---
 
### 3.5 Configuração de materiais por componente
 
**Propósito:** para cada componente de cada tipologia, definir o material/kit padrão e as opções de upgrade disponíveis ao cliente.
 
**Acesso:** a partir do accordion de componentes na tela de Tipologias.
 
**Cabeçalho:** breadcrumb completo → tipologia → ambiente → componente. Quantidade com e sem reserva técnica.
 
**Card "Material/kit padrão":**
- Exibe o padrão configurado (material individual ou kit)
- Se kit: mostra os sub-itens indentados abaixo (somente leitura) com seus quantitativos para esta tipologia
- Botão "Trocar padrão" abre modal de seleção (materiais e kits do catálogo, filtrados pela categoria do componente)
- Status: preenchido (custo existe) ou pendente (aguardando construtora)
**Card "Opções de upgrade":**
- Lista de opções que o cliente pode escolher no portal de personalização
- Cada opção pode ser material individual ou kit
- Kits têm toggle de expand para ver sub-itens
- Custo de kits mostra `—` com tooltip "Calculado pela soma dos sub-itens"
- Botão "Adicionar opção" → mesmo modal de seleção
**Ao adicionar kit como upgrade:**
- Segundo passo do modal pede quantitativo de cada sub-item para esta tipologia
- Exemplo: kit "Piso Barcelona" → Piso: 10,78 m², Soleira: 1 und., Reserva Técnica: 2,175 m²
**Comportamento:**
- Um material/kit pode aparecer em múltiplos componentes e tipologias
- Se o custo já foi preenchido em outra ocorrência, é reaproveitado automaticamente
**Navegação de saída:** ← Tipologias
 
---
 
### 3.6 Custos base
 
**Propósito:** centraliza o preenchimento dos custos de material e mão de obra por item do catálogo. É onde a informação da construtora entra no sistema.
 
**Conteúdo:**
- Tabela de todos os materiais individuais do catálogo (kits não aparecem — custo é calculado)
- Colunas: código, especificação, fabricante, categoria, custo material (R$/unidade), custo MO (R$/unidade), comentário, status
- Células de custo editáveis inline com clique
- Thread de comentários por item: incorporadora ↔ construtora
- Filtros: por categoria, por status (preenchido/pendente/com comentário), por variação
- Histórico: ao atualizar um valor, o anterior é guardado com data — colunas "Valor anterior" e "Variação (R$ e %)"
- Itens com variação acima de threshold configurável são destacados visualmente
- Exportação da tabela para CSV/XLSX
**Envio para construtora (feature opcional):**
- Botão "Enviar para construtora" no cabeçalho — abre painel lateral com:
  - E-mail(s) de destino (pré-preenchido da config base)
  - Prazo de retorno
  - Mensagem opcional
  - Resumo: quantos materiais para preencher por tipologia
- Gera link tokenizado único e envia por e-mail
- Construtora acessa sem login — vê apenas sua tela simplificada (ver 3.6.1)
- Status do empreendimento muda para "Em preenchimento"
- Barra de progresso no cabeçalho: "47 de 120 itens preenchidos"
- Link pode ser reenviado, compartilhado com múltiplos e-mails ou revogado
**Navegação de saída:** → Construtor de preço
 
---
 
### 3.6.1 Portal da construtora (acesso via link)
 
**Propósito:** interface simplificada onde a construtora preenche os custos. Sem sidebar, sem navegação da plataforma Nuki.
 
**Cabeçalho:** nome do empreendimento, prazo de retorno, barra de progresso global.
 
**Navegação por tipologia:** abas no topo.
 
**Tabela por tipologia:**
- Agrupada por ambiente
- Por material: especificação, código, categoria, campo de custo material, campo de custo MO, campo de comentário
- Salvamento automático ao sair do campo (sem botão salvar)
- Indicador visual por item: não preenchido / preenchido / com comentário pendente
**Restrições:**
- Construtora não vê as taxas da incorporadora
- Construtora não vê os preços finais ao cliente
- Construtora não vê kits — vê apenas os materiais individuais que compõem os kits
**Submissão:**
- Botão "Submeter preenchimento" notifica a incorporadora por e-mail
- Não bloqueia edições posteriores — construtora pode retornar pelo mesmo link
---
 
### 3.7 Construtor de preço
 
**Propósito:** tela central do módulo. Tabela de orçamento por tipologia onde a incorporadora monta as colunas de cálculo, edita valores e visualiza o preço final ao cliente para cada item.
 
**Navegação:** abas de tipologia no topo.
 
**Estrutura da tabela:**
 
*Colunas fixas (sempre presentes, não configuráveis):*
- Especificação
- Qtd c/ RT (quantidade com reserva técnica)
- Valor un. (custo unitário — material + MO)
- Déb./Créd. (débito do upgrade ou crédito do padrão)
- Custo troca (débito − crédito do padrão)
*Colunas configuráveis (gerenciadas diretamente na tabela):*
- O usuário cria, renomeia, reordena e deleta colunas inline
- Cada coluna representa uma etapa de composição de preço (ex: Taxa Construtora, Contingência INCC, Taxa Incorporadora, BDI, Frete...)
- Células editáveis: valor fixo (ex: `150`) ou fórmula (ex: `=custo_troca * 10%`)
- Fórmulas referenciam outras colunas pelo nome, com autocomplete ao digitar `=`
- Operações suportadas: `+`, `-`, `*`, `/`, `%`
- Erro de fórmula: célula mostra `#ERR` em vermelho com tooltip explicativo
*Colunas especiais pré-setadas (disponíveis ao criar nova coluna):*
- **Total da linha:** soma todas as colunas configuráveis — vira o preço final ao cliente
- **Média da linha:** média das colunas configuráveis
- Essas colunas não são editáveis individualmente — sempre calculadas
*Colunas fixas finais:*
- Total final (preenchido pela coluna Total da linha ou editável manualmente)
- Arredondamento
**Gerenciamento de colunas inline:**
- Botão `+` após a última coluna configurável abre popover: nome + tipo (livre / total / média)
- Double-click no cabeçalho: renomear inline
- Drag pelo cabeçalho: reordenar
- Hover no cabeçalho: ícone `×` para deletar com confirmação
**Agrupamento:**
- Por ambiente, depois por seção: "Acabamentos padrão" (crédito) e "Acabamentos personalizados" (débito)
- Totais por ambiente no rodapé de cada grupo
- Total geral da tipologia no rodapé da tabela
**Comportamento de kits na tabela:**
 
Quando um componente tem um kit (padrão ou upgrade), a tabela exibe:
 
```
▼  Metais Bronze  [Kit]    [soma sub-itens]   [soma sub-itens]   [editável]   R$ 1.240
   · Ducha Higiênica        2 und   R$ 340    R$ 680              —             —
   · Monocomando Chuveiro   1 und   R$ 520    R$ 520              —             —
   · Chuveiro               1 und   R$ 280    R$ 280              —             —
   · Torneira               1 und   R$ 100    R$ 100              —             —
```
 
- **Linha do kit:** colunas fixas calculadas pela soma dos sub-itens; colunas de taxa editáveis normalmente; total final e arredondamento editáveis
- **Sub-itens:** indentados, com linha vertical sutil conectando ao kit pai; mostram apenas qtd, valor unitário e débito individual; colunas de taxa e total mostram `—`
- Toggle expand/collapse no ícone ▼/▶
- Estado padrão: expandido
- Se qualquer sub-item estiver pendente (sem custo), o kit inteiro fica marcado como pendente
**Itens pendentes:**
- Células sem custo preenchido mostram `—` e a linha fica com fundo sutilmente diferenciado
- Alerta no cabeçalho da tipologia quando há itens pendentes que impedem o cálculo
**Recálculo:** em tempo real no cliente, sem chamada de API — qualquer alteração de taxa ou fórmula reflete imediatamente em toda a tabela.
 
**Navegação de saída:** → Publicação
 
---
 
### 3.8 Publicação
 
**Propósito:** validação final e exportação da configuração para o módulo de Personalização (fase 02).
 
**Conteúdo:**
- Checklist de pré-publicação:
  - [ ] Todas as tipologias com componentes configurados?
  - [ ] Todos os materiais com custo preenchido?
  - [ ] Colunas de preço configuradas em todas as tipologias?
- Tabela resumo: por tipologia, faixa de preço mínima e máxima de personalização
- Prévia do que será exportado: tipologias, ambientes, componentes, materiais com preços
**Ação de publicação:**
- Botão "Publicar orçamento" com confirmação
- Após publicação: empreendimento fica somente leitura (com opção de criar nova revisão)
- Status muda para "Publicado"
**O que é exportado automaticamente para o microserviço de Personalização:**
- Tipologias e seus ambientes/componentes
- Materiais com preços de venda calculados
- Kits com nome único e preço agregado (sub-itens são internos ao módulo de planejamento)
- Créditos do material padrão por componente
- Associação tipologia ↔ UnitGroups
---
 
## 4. Modelo de dados conceitual
 
### Entidades principais
 
**Empreendimento (Project)**
- Nome, incorporadora, construtora, data base INCC, status
- Referência ao empreendimento na fase 02 (quando publicado)
**Material**
- Código, especificação, fabricante, categoria, unidade de medida
- Custo material (R$/unidade), custo MO (R$/unidade)
- Histórico de valores (versões anteriores com data)
**Kit**
- Nome, categoria
- Composição: lista de referências a materiais do catálogo
**Tipologia (Blueprint)**
- Nome, metragem, descrição do layout
- UnitGroups associados
- Lista de ambientes
**Ambiente (Room)**
- Nome
- Lista de componentes
**Componente (Component)**
- Nome, unidade de medida
- Padrão: referência a material ou kit + quantitativos por sub-item
- Upgrades: lista de referências a materiais ou kits + quantitativos por sub-item
**Associação Componente-Item**
- Referência ao componente e à tipologia
- Referência ao material ou kit
- Quantitativos por sub-item (específicos desta tipologia)
- Papel: padrão ou upgrade
**Coluna de preço (PriceColumn)**
- Nome (label da coluna)
- Tipo: livre / total / média
- Fórmula ou valor padrão
- Valores por linha (overrides individuais)
---
 
## 5. Requisitos não funcionais
 
### Flexibilidade
- Nenhuma coluna de taxa é obrigatória ou predefinida — o usuário cria do zero
- Fórmulas podem referenciar qualquer coluna existente à esquerda
- Quantitativos de sub-itens de kits são específicos por tipologia
- Empreendimentos onde incorporadora e construtora são a mesma empresa: incorporadora preenche os custos diretamente em Custos base, sem precisar enviar link
### Colaboração
- Thread de comentários por material em Custos base (incorporadora ↔ construtora)
- Histórico de alterações de custo com data, valor anterior e variação
- Notificações por e-mail: construtora ao receber link; incorporadora ao receber submissão
### Performance
- Recálculo da tabela de orçamento em tempo real no cliente (sem API)
- Portal da construtora leve — funciona bem em conexões lentas
### Auditoria
- Toda alteração de custo é versionada
- O empreendimento publicado preserva snapshot dos valores no momento da publicação
---
 
## 6. Fora do escopo (v1)
 
- Integração com ERPs ou sistemas de orçamento da construtora
- Aprovação multinível (múltiplos aprovadores)
- Renderização ou visualização 3D de materiais
- Comparação entre múltiplos fornecedores para o mesmo item
- Módulo de acompanhamento em obra (fase 03)
---
 
## 7. Questões abertas
 
| # | Questão | Impacto |
|---|---------|---------|
| 1 | A construtora precisa ver o histórico de revisões dos valores que ela mesma preencheu? | Médio — define nível de transparência no portal da construtora |
| 2 | É necessário controle de acesso granular dentro da incorporadora (ex: apenas financeiro vê as taxas)? | Médio — define modelo de permissões |
| 3 | Kits podem conter outros kits (kits aninhados), ou sempre são compostos apenas de materiais individuais? | Alto — define profundidade do modelo de dados |
| 4 | O preço exportado para a fase 02 é sempre o "Total final" arredondado, ou o usuário pode escolher qual coluna exportar? | Médio — define interface de publicação |