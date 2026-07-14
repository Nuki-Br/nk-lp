# Nuki — Pivot de Produto e Modelo de Negócio
### Contexto Estratégico · v1.0
 
---
 
## 1. O que mudou
 
A Nuki deixou de ser um produto único — o módulo hoje chamado **Personaliza** (atendimento e gestão das escolhas de personalização do cliente final) — e passou a ser uma **suíte de três módulos** que cobre uma fatia maior da jornada da construtora/incorporadora:
 
```
PLANNER  →  PERSONALIZA  →  INSPETOR
```
 
| Módulo | Fase da jornada | O que resolve |
|--------|-----------------|----------------|
| **Planner** | Antes da venda de personalização | Planejamento e formação de custo do memorial — o catálogo de materiais e preços que será ofertado às unidades. Hoje feito em planilhas, com 3–4 meses de idas e vindas entre incorporadora e construtora. |
| **Personaliza** | Durante a venda | Atendimento ao cliente final: escolha de acabamentos, formalização das decisões. Módulo original da Nuki, já validado em produção. |
| **Inspetor** | Depois da execução em obra | Conferência do que foi comprado pelo cliente vs. o que foi de fato executado na obra. Hoje é checagem manual, fonte de estresse e retrabalho entre pós-venda e engenharia. |
 
Os três módulos já têm documentação de produto própria (especificações de tela, fluxos, modelo de dados). Este documento **não substitui** essa documentação — ele registra o contexto estratégico e comercial por cima dela: por que a suíte existe, e como ela é vendida agora.
 
---
 
## 2. Mudança de modelo de negócio
 
### 2.1 Como era
 
Cobrávamos por **projeto completo**, pacote fechado por empreendimento, incluindo:
 
- Configuração completa da plataforma conforme o memorial do empreendimento
- Geração de todas as imagens 3D mostradas ao cliente final
- Infraestrutura e suporte operacional
**Por que isso parou de fazer sentido:** o custo operacional e o nível de detalhe exigido por projeto limitavam a capacidade de atendimento a uma média projetada de **~18 empreendimentos/ano**. Esse número é o teto do modelo antigo (capacidade operacional de configuração + geração de imagens), não um limite do modelo novo — é o motivador histórico do pivot, e vale revisitar a memória de cálculo dessa projeção se for citá-la externamente.
 
> **Observação crítica:** vale validar se 18/ano era gargalo de geração de imagens 3D especificamente, ou da operação como um todo (configuração + suporte + infra). São gargalos diferentes e a resposta muda o quanto a terceirização de imagens (seção 3) de fato resolve o problema.
 
### 2.2 Como é agora
 
Modelo de **recorrência por empreendimento ativo**: a Nuki entrega só a **plataforma** (os três módulos), e remove do pacote a parte operacional — configuração detalhada e geração de imagens 3D deixam de ser entregues pela Nuki diretamente.
 
Essa parte operacional é terceirizada para **parceiros homologados** (ver seção 3).
 
---
 
## 3. Hub de parceiros homologados — status: hipótese em maturação
 
> Esta seção descreve uma iniciativa em desenvolvimento, não um produto pronto. A direção estratégica (terceirizar configuração e geração de imagens via parceiros) é decisão fechada; o desenho operacional do hub e o fluxo descrito abaixo ainda têm hipóteses não validadas e funcionalidades não construídas na plataforma.
 
### 3.1 O que é
 
Escritórios de arquitetura **homologados e treinados pela Nuki** para gerar imagens 3D no formato exigido e operar a plataforma de configuração em nome da construtora — substituindo o time operacional interno que a Nuki tinha antes.
 
### 3.2 Modelo de receita
 
Receita adicional para a Nuki via comissão — **~10% do valor do projeto fechado** entre construtora e parceiro. É uma fonte de receita estruturalmente diferente da recorrência por SaaS (transacional/marketplace vs. assinatura), o que vale tratar como uma segunda linha de negócio, não como um detalhe do módulo Planner.
 
### 3.3 Jornada hipotética
 
1. Construtora busca no hub de parceiros Nuki um escritório de arquitetura com disponibilidade
2. Construtora envia as informações necessárias para orçamento (alimentadas a partir do módulo **Planner**)
3. Escritório monta o orçamento e envia para a construtora, pela própria plataforma
4. Contrato é assinado
5. Etapa de desenvolvimento e validação das imagens acontece entre escritório e construtora, dentro da plataforma
6. Escritório entrega as imagens finais e encerra o projeto
### 3.4 O que falta validar/construir
 
- O fluxo acima é a jornada **ideal**, não a atual — não existe ainda na plataforma a funcionalidade que torna os parceiros autônomos para executar essas etapas sem suporte manual da Nuki
- Não está definido neste contexto: critérios de homologação dos escritórios, SLA de disponibilidade, como funciona o matching construtora↔parceiro, o que acontece em disputas de qualidade da entrega de imagens
- Vale registrar essas lacunas explicitamente em qualquer comunicação externa sobre o hub, para não vender uma capacidade que ainda não existe
---
 
## 4. Síntese para uso em prompt/contexto de IA
 
- **Produto:** suíte de 3 módulos (Planner → Personaliza → Inspetor) cobrindo o ciclo completo de personalização de unidades, do planejamento de custo à entrega validada em obra.
- **Modelo comercial atual:** SaaS por recorrência, fee mensal por empreendimento ativo, plataforma apenas (sem operação de configuração/imagens).
- **Modelo comercial legado (descontinuado):** projeto completo com operação interna — limitado a ~18 empreendimentos/ano, motivo do pivot.
- **Iniciativa em maturação:** hub de parceiros homologados (escritórios de arquitetura), comissão de ~10% por projeto fechado, jornada ainda não autônoma na plataforma.
- **Documentação de produto dos módulos** (specs de tela, fluxos, modelo de dados) permanece válida e não é afetada por este pivot — este documento é a camada estratégica/comercial.