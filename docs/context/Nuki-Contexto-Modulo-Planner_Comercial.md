# Nuki — Módulo de Planejamento e Orçamento
### Documento Comercial Interno · v1.1 · Junho 2026
 
---
 
## 1. O problema que estamos resolvendo
 
Todo empreendimento que passa pela Nuki tem uma etapa invisível para a plataforma hoje: o planejamento e orçamento dos materiais de personalização. Esse processo acontece antes do cliente entrar em cena, é inteiramente manual e consome entre **3 e 4 meses** do time da incorporadora.
 
O fluxo atual, sem exceção em todos os clientes que mapeamos:
 
1. A incorporadora monta uma planilha com todos os materiais, tipologias, ambientes e opções de personalização
2. Envia a planilha para a construtora por e-mail
3. A construtora preenche os custos e devolve — às vezes em outra versão do arquivo
4. A incorporadora aplica suas taxas e margens manualmente
5. Revisões vão e voltam por e-mail até os preços serem validados
6. Alguém digita os preços finais manualmente na Nuki para começar o atendimento ao cliente
**O resultado:** planilhas sem padrão, múltiplas versões circulando por e-mail, erros de digitação na entrada de dados na Nuki, e um processo que nenhum dos envolvidos consegue auditar com clareza.
 
---
 
## 2. O que o módulo entrega
 
### Para a incorporadora
 
**Controle total do processo em um lugar só**
Em vez de gerenciar versões de planilha por e-mail, toda a configuração do empreendimento — tipologias, ambientes, materiais, kits, quantitativos e taxas — vive na Nuki. Qualquer pessoa da equipe vê o estado atual em tempo real.
 
**Fórmula de preço livre, não engessada**
Cada incorporadora tem sua própria lógica de formação de preço. O módulo permite criar as colunas de cálculo do zero — com nome, operação e fórmula livre — exatamente como cada empresa trabalha. Não existe um modelo padrão imposto pela Nuki.
 
**Kits como primeira classe**
Muitos componentes de personalização são compostos por múltiplos itens (piso + soleira + reserva técnica, ou conjunto de metais). O módulo trata kits nativamente: o cliente vê um preço único, mas a incorporadora tem visibilidade completa da composição de custo item a item.
 
**Fim da digitação manual na fase de atendimento**
Ao publicar o orçamento, a configuração de materiais e preços alimenta automaticamente o módulo de Personalização. O que hoje é entrada manual de dados deixa de existir.
 
**Auditoria completa**
Cada alteração de custo fica registrada com data, valor anterior e variação. O empreendimento publicado preserva um snapshot dos valores no momento da publicação. Nada se perde entre versões.
 
**Versionamento com checkpoint e changelog**
A incorporadora salva uma versão do orçamento quando quiser, com um resumo escrito do que mudou. O sistema calcula automaticamente o que foi alterado — materiais, custos, taxas, tipologias — e qualquer versão anterior pode ser restaurada sem perder o trabalho atual. Acaba a prática de manter "v1_final_revisado_2" como nome de arquivo.
 
**Visão visual da estrutura, pensada para arquitetos**
O perfil de quem trabalha com personalização de acabamentos é visual. O módulo oferece uma visão em árvore da tipologia — ambientes, componentes e opções de material — com a imagem real de cada material puxada do acervo da organização. Quem está revisando enxerga de cara o que falta imagem, o que falta custo e o que falta definir, sem abrir planilha. A equipe pode deixar anotações direto na visualização, como um quadro colaborativo, para alinhar pontos de revisão sem sair da ferramenta.
 
---
 
### Para incorporadoras que terceirizam a construção
 
**Colaboração estruturada com a construtora**
Em vez de e-mail com planilha em anexo, a incorporadora gera um link de preenchimento direto na plataforma. A construtora acessa sem precisar criar conta, preenche os custos item a item e pode deixar comentários. A incorporadora acompanha o progresso em tempo real.
 
**Thread de negociação por item**
A discussão de preços entre incorporadora e construtora acontece dentro da plataforma, por item, com histórico. Acaba o vai-e-volta de e-mails com versões diferentes do arquivo.
 
**Visibilidade sem exposição de margens**
A construtora vê apenas o que precisa preencher — custos de material e mão de obra. Ela não vê as taxas da incorporadora nem os preços finais ao cliente. A separação é estrutural, não dependente de disciplina de quem envia o arquivo.
 
---
 
## 3. Posicionamento no ciclo de vida do empreendimento
 
```
PLANEJAMENTO E ORÇAMENTO  →  PERSONALIZAÇÃO  →  ACOMPANHAMENTO EM OBRA
      (este módulo)              (fase 02,              (fase 03,
                                 já existente)            futuro)
```
 
O módulo é o ponto de entrada do ciclo. Ao publicar, ele alimenta automaticamente a fase 02 — que já existe e que nossos clientes já usam. O efeito imediato para clientes atuais: eliminação da entrada manual de dados entre as duas fases.
 
---
 
## 4. Perfil de cliente ideal
 
### Clientes atuais da Nuki (upsell)
 
Todo cliente que já usa o módulo de Personalização (fase 02) tem o problema que este módulo resolve. A entrada manual de materiais e preços na plataforma é um ponto de atrito documentado — reduzir esse atrito é o argumento principal.
 
**Sinais de fit alto:**
- Empreendimentos com muitas tipologias ou muitas opções de personalização (alta complexidade de planilha)
- Times pequenos que gerenciam múltiplos empreendimentos simultaneamente
- Incorporadoras que terceirizam a construção e têm o fluxo de e-mail com construtora como gargalo
- Clientes que já relataram dificuldade na entrada de dados na fase de atendimento
### Novos clientes (aquisição)
 
O módulo amplia o ICP da Nuki para incorporadoras que ainda não chegaram à fase de atendimento ao cliente — estão na etapa de planejamento e podem entrar na plataforma por esse ponto.
 
**Perfil:**
- Incorporadoras médias com times de produto/engenharia enxutos
- Empreendimentos de médio-alto padrão com personalização como diferencial de venda
- Incorporadoras que já identificaram o processo de planilha como ineficiente mas não encontraram alternativa
---
 
## 5. Argumentos por interlocutor
 
### Para o CEO / sócio da incorporadora
 
> "Hoje o processo de planejamento de personalização de um empreendimento leva entre 3 e 4 meses em planilhas. Com o módulo, esse processo acontece dentro da Nuki — com histórico, colaboração com a construtora e alimentação automática do portal de atendimento ao cliente. Você reduz tempo, elimina retrabalho e tem visibilidade total do processo em qualquer ponto."
 
### Para o gestor de produto / coordenador de personalização
 
> "A lógica de formação de preço de cada empreendimento é diferente. O módulo não impõe uma fórmula padrão — você cria as colunas de cálculo como precisar, com fórmulas livres que referenciam outras colunas. É a flexibilidade da planilha com a estrutura de um sistema."
 
### Para quem faz o orçamento hoje (analista / engenheiro de custos)
 
> "Você continua trabalhando com a mesma lógica de tabela que usa hoje. A diferença é que o histórico de revisões fica salvo, a negociação com a construtora acontece dentro da plataforma, e quando o orçamento for aprovado, os preços já estão na Nuki — sem precisar digitar nada."
 
### Para o time financeiro / jurídico
 
> "Todo custo preenchido pela construtora fica registrado com data e valor anterior. Se um preço mudar entre versões, você sabe quando mudou, quanto mudou e quem alterou. O empreendimento publicado preserva um snapshot auditável dos valores aprovados."
 
### Para o arquiteto / time de personalização
 
> "A visão em árvore mostra a estrutura completa da tipologia com a foto real de cada material — não uma lista de texto. Você vê de cara onde falta imagem, onde falta custo e onde falta decidir, e pode deixar uma nota ali mesmo pra equipe ajustar. É a primeira vez que esse processo tem uma camada visual em vez de só planilha."
 
---
 
## 6. Objeções frequentes e respostas
 
**"Já temos uma planilha que funciona."**
A planilha funciona individualmente, mas não funciona como processo: não tem colaboração estruturada com a construtora, não tem histórico auditável de revisões e não se conecta automaticamente à fase de atendimento ao cliente. O módulo não substitui a lógica da planilha — ele estrutura o processo ao redor dela.
 
**"Nossa lógica de preço é muito específica, não vai caber num sistema."**
O módulo foi desenhado exatamente para isso. As colunas de cálculo são livres — você cria, nomeia e define a fórmula de cada uma. Não existe modelo predefinido. Se sua lógica cabe numa planilha, cabe no módulo.
 
**"A construtora não vai querer aprender uma nova ferramenta."**
A construtora acessa via link, sem login e sem aprender a plataforma. Ela vê uma tabela simples com os itens para preencher. A curva de aprendizado é zero.
 
**"Usamos a mesma planilha há anos, mudar é risco."**
A migração é incremental: o módulo pode ser usado em paralelo com a planilha durante o primeiro empreendimento, e o time valida os resultados antes de abandonar o fluxo antigo. O risco é gerenciável.
 
**"Hoje guardamos versões antigas da planilha 'por garantia'. Vamos perder isso?"**
Pelo contrário — o módulo formaliza exatamente essa prática. Cada versão salva tem resumo, autor, data e o diff completo do que mudou, e qualquer uma pode ser restaurada. É mais seguro do que uma pasta de arquivos "v1, v2, v2_final".
 
---
 
## 7. Métricas de sucesso para o cliente
 
| Métrica | Situação atual | Com o módulo |
|---------|---------------|-------------|
| Tempo de planejamento e orçamento | 3–4 meses | Redução esperada de 40–60% |
| Versões de planilha por empreendimento | 10–30+ versões | 1 estado único e versionado |
| Tempo de entrada de dados na Nuki (fase 02) | Manual, por empreendimento | Zero — alimentação automática |
| Rastreabilidade de revisões de custo | Nenhuma ou manual | Automática, por item |
| Visibilidade do progresso de preenchimento (construtora) | E-mail | Tempo real na plataforma |
| Tempo para identificar pendências de imagem/custo em uma tipologia | Revisão manual, item a item | Visão única em árvore com indicadores visuais |
| Restauração de uma versão anterior do orçamento | Reabrir arquivo antigo, copiar manualmente | Um clique, sem perder a versão atual |
 
---
 
## 8. O que não é (limites claros para vendas)
 
- **Não é um ERP de obras.** Não controla compras, estoque ou execução. Faz planejamento e formação de preço de personalização.
- **Não substitui o sistema da construtora.** A construtora preenche custos na Nuki via link — ela não precisa migrar nenhum sistema.
- **Não é rígido.** Não tem uma fórmula de preço padrão. Cada cliente configura a sua.
- **Não é o módulo de acompanhamento em obra.** Isso é a fase 03, que virá depois.
---
 
## 9. Próximos passos (roadmap comercial)
 
| Etapa | Status |
|-------|--------|
| Prototipação das telas | Em andamento |
| Validação com clientes selecionados | Próxima etapa |
| Definição de pricing | A definir após validação |
| Beta fechado com 2–3 clientes | Após pricing |
| GA (disponibilidade geral) | A definir |
 
**Clientes prioritários para validação:** incorporadoras com empreendimentos em fase de planejamento ativo que já relataram dificuldade no processo de planilha ou na entrada de dados na Nuki.