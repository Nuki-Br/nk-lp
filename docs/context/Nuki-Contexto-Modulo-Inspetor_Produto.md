# Nuki Inspetor - Documento de Produto e Fluxo
 
## 1. Visão Geral do Produto
 
O **Nuki Inspetor** é um módulo da plataforma Nuki que digitaliza e profissionaliza a inspeção final de personalização de unidades imobiliárias em obra, antes da entrega ao cliente final.
 
### Objetivo Central
Transformar um processo manual, descentralizado e sujeito a retrabalho em um checklist digital estruturado, rastreável e integrado com a plataforma Nuki.
 
### Usuários Primários
- **Inspetor de Personalização** - Profissional do time de pós-venda da construtora
- **Coordenador de Personalização** - Responsável por gerir inspeções e gerar relatórios
- **Engenheiro/Supervisor** - Visualiza relatórios de não conformidades
### Contexto de Uso
- Canteiro de obra (ambiente desafiador - luz variável, mãos sujas, conexão instável)
- Dispositivos móveis (smartphone como prioridade)
- Horários de pico da obra (madrugada e manhã cedo)
- Necessidade de velocidade (inspetor não pode gastar mais de 30min por unidade)
---
 
## 2. Problema que o Nuki Inspetor Resolve
 
### Fluxo Atual (Sem o Nuki Inspetor)
 
Construtoras inspecionam personalização através de:
- ❌ Planilhas em papel ou Excel
- ❌ Anotações manuais de problemas
- ❌ Fotos desorganizadas em galeria do celular
- ❌ Comunicação verbal/WhatsApp com obra
- ❌ Retrabalho porque erros não foram documentados
### Dores Resultantes
1. **Retrabalho massivo** - Problemas descobertos na vistoria com cliente custam 10x mais que corrigir na hora
2. **Falta de rastreabilidade** - Sem documentação, não sabe quem fez o quê ou quando
3. **Insatisfação do cliente** - Cliente recebe unidade diferente do combinado
4. **Falta de visibilidade gerencial** - Diretoria não sabe taxa de conformidade real
5. **Erros de interpretação** - Inspetor anota errado, obra entende diferente
6. **Impossibilidade de escalar** - Processo manual não funciona com múltiplas torres simultâneas
### Como Nuki Inspetor Resolve
- ✅ Checklist automático baseado nas escolhas reais do cliente (zero digitação)
- ✅ Captura fotográfica obrigatória de problemas
- ✅ Classificação padrão de não conformidades
- ✅ Rastreabilidade completa (data, hora, responsável, fotos)
- ✅ Relatórios estruturados em tempo real
- ✅ Sincronização automática offline/online
---
 
## 3. Fluxo de Telas e Navegação
 
### 3.1 Estrutura Geral
 
```
┌─────────────────────────────────────────────────────────┐
│                    NUKI INSPETOR                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Login                                                   │
│    ↓                                                      │
│  Lista de Empreendimentos                               │
│    ↓                                                      │
│  Lista de Torres                                         │
│    ↓                                                      │
│  Lista de Unidades (com filtros)                         │
│    ↓                                                      │
│  Visão Geral da Inspeção (Cômodos)                       │
│    ↓                                                      │
│  Inspeção de Item Individual (TELA CRÍTICA)              │
│    ↓                                                      │
│  Relatório de Inspeção                                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```
 
### 3.2 Descrição Detalhada de Cada Tela
 
#### **TELA 1: LOGIN**
 
**Propósito:** Autenticar inspetor na plataforma
 
**Fluxo:**
1. Inspetor acessa o app
2. Insere e-mail e senha
3. Sistema valida credenciais contra API da Nuki
4. Se válido e tem role "Inspector" ou "Admin" → vai para Lista de Empreendimentos
5. Se inválido → mostra erro
**Dados necessários:**
- E-mail (unique)
- Senha (hashed)
- Role/Permissão (Inspector, Admin, Viewer)
**Estados:**
- Vazio (inicial)
- Carregando (validando)
- Erro (credenciais inválidas)
- Sucesso (redireciona)
---
 
#### **TELA 2: LISTA DE EMPREENDIMENTOS**
 
**Propósito:** Inspetor seleciona qual empreendimento vai inspecionar
 
**O que mostra:**
- Todos os empreendimentos da organização do inspetor
- Para cada empreendimento:
  - Nome e logo
  - Localização (cidade)
  - Número total de unidades com personalização
  - Taxa de conformidade geral (%)
  - Quantidade de inspeções pendentes
  - Quantidade de unidades já inspecionadas
**Interações:**
- Buscar empreendimento por nome
- Clicar em card → vai para Lista de Torres
**Dados vindos da API:**
```
GET /api/inspector/enterprises
{
  id: number
  name: string
  logoUrl: string
  city: string
  stats: {
    totalUnits: number
    inspectedUnits: number
    pendingInspections: number
    conformityRate: number (0-100)
  }
}
```
 
---
 
#### **TELA 3: LISTA DE TORRES**
 
**Propósito:** Selecionar a torre do empreendimento
 
**O que mostra:**
- Todas as torres/blocos do empreendimento
- Para cada torre:
  - Nome (ex: "Torre A", "Bloco 1")
  - Quantidade de unidades
  - Quantidade de unidades aprovadas
  - Quantidade de unidades com pendências
**Interações:**
- Botão voltar → volta para Lista de Empreendimentos
- Clicar em torre → vai para Lista de Unidades
**Dados:**
```
GET /api/inspector/enterprises/:id/towers
{
  id: number
  name: string
  unitCount: number
  inspectionStats: {
    total: number
    approved: number
    pending: number
  }
}
```
 
---
 
#### **TELA 4: LISTA DE UNIDADES**
 
**Propósito:** Selecionar qual unidade inspecionar
 
**O que mostra:**
- Cards de unidades da torre selecionada
- Para cada unidade:
  - Número (ex: "101", "102")
  - Nome do cliente
  - Tipo de planta/Blueprint
  - Status de inspeção (Não iniciada / Em andamento / Aprovada / Com pendências)
  - Se iniciada: progresso (X de Y itens inspecionados) com barra visual
  - Badge de sincronização
**Filtros:**
- "Todas (X)" - mostra todas
- "Não iniciadas (X)" - ainda não começaram
- "Em andamento (X)" - foram iniciadas mas não finalizadas
- "Aprovadas (X)" - 100% conforme
- "Com pendências (X)" - tem itens não conformes
**Interações:**
- Clicar em chip de filtro → filtra lista
- Clicar em card de unidade → vai para Visão Geral da Inspeção
- Botão voltar → volta para Lista de Torres
**Dados:**
```
GET /api/inspector/towers/:id/units
{
  id: number
  unitNumber: string
  clientName: string
  blueprint: {
    id: number
    name: string
  }
  inspection: {
    id: number
    status: string // "pending", "in-progress", "approved", "with-issues"
    progress: number (0-100)
    inspectedItems: number
    totalItems: number
    lastInspectedAt: datetime
  } | null
}
```
 
---
 
#### **TELA 5: VISÃO GERAL DA INSPEÇÃO** ⭐ **IMPORTANTE**
 
**Propósito:** Ver todos os cômodos e itens personalizados da unidade, navegação para inspecionar cada item
 
**O que mostra:**
 
**Header (fixo):**
- Número da unidade
- Nome do cliente
- Progresso geral (X de Y itens inspecionados, com percentual)
- Badge de sincronização (online/offline)
**Conteúdo (lista expandível):**
 
Accordion organizado por cômodo:
- Sala de Estar
- Cozinha
- Suíte Master
- Suíte 2
- Banheiro Social
- Banheiro Suíte
- Lavanderia
- etc.
Para cada cômodo (header do accordion):
- Ícone do cômodo
- Nome do cômodo
- Quantidade de personalizações
- Badge com contagem (X/Y itens conformes)
- Indicação expandido/colapsado
Expandindo um cômodo, mostra lista de itens:
- Ícone de status (✓ conforme / ⚠ não conforme / ○ não inspecionado)
- Nome do componente (ex: "Piso", "Rodapé", "Pintura")
- Nome do material escolhido
- Se tem problema: badge vermelho "Não conforme"
**Interações:**
- Clicar em header do cômodo → expande/colapsa
- Clicar em item → vai para Inspeção de Item Individual
- Botão "Ver Relatório" no footer → vai para Relatório de Inspeção
**Dados:**
```
GET /api/inspector/units/:id/inspection
{
  unit: { id, unitNumber, clientName }
  inspection: { id, status, progress, totalItems, inspectedItems }
  rooms: [
    {
      id: number
      name: string
      customizationItems: [
        {
          id: number
          component: string
          material: {
            name: string
            images: string[]
            metadata: object
          }
          inspectionItem: {
            id: number
            status: string // "not-inspected", "compliant", "non-compliant", "corrected"
            photosUrls: string[]
            observations: string | null
            nonConformityType: string | null
            inspectedAt: datetime | null
          } | null
        }
      ]
    }
  ]
}
```
 
---
 
#### **TELA 6: INSPEÇÃO DE ITEM INDIVIDUAL** ⭐⭐⭐ **TELA CRÍTICA**
 
**Propósito:** Inspecionar um item específico e marcar como conforme ou não conforme
 
Esta é a tela onde o inspetor passa mais tempo. É aqui que a qualidade da inspeção acontece.
 
**O que mostra:**
 
**Header (fixo):**
- Botão voltar
- Nome do componente (ex: "Piso")
- Nome do cômodo (ex: "Sala de Estar")
**Seção 1: Material Especificado**
- Foto de referência do material que o cliente escolheu (grande e clara)
- Nome completo do material
- Especificações técnicas (tipo, marca, referência, etc)
**Seção 2: Fotos da Execução**
- Interface para capturar até 5 fotos do que foi executado na obra
- Grid de thumbs das fotos já capturadas
- Botão para remover fotos
- Botão "Adicionar fotos" que abre câmera ou galeria
**Seção 3: Status da Inspeção**
Radio buttons grandes (card-style):
- **Conforme** - Foto de referência vs execução estão iguais, sem problemas
- **Não Conforme** - Há discrepâncias entre especificado e executado
**Seção 4: Se "Não Conforme" (condicional)**
- Select de tipo de não conformidade:
  - Produto diferente do especificado
  - Instalação incorreta
  - Acabamento com defeito
  - Dimensão/medida incorreta
  - Cor/tonalidade diferente
  - Outro
- Textarea para observações (obrigatório): "Descreva o problema encontrado"
**Seção 5: Notas do Inspetor (opcional)**
- Textarea para observações gerais (opcional)
**Footer (fixo):**
- Botão "Cancelar" - Volta sem salvar
- Botão "Salvar" - Salva e volta para Visão Geral
**Validações:**
- Status é obrigatório
- Se "Não Conforme": tipo de não conformidade é obrigatório
- Se "Não Conforme": observações são obrigatórias
- Se "Não Conforme": foto é obrigatória
**Fluxo de salvamento:**
1. Inspetor preenche tudo
2. Clica "Salvar"
3. Se offline: salva localmente no IndexedDB, adiciona à fila de sincronização
4. Se online: envia para API imediatamente
5. Toast de sucesso: "Item salvo com sucesso"
6. Volta para Visão Geral da Inspeção
7. Aquele item agora mostra status "Conforme" ou "Não conforme" com ícone atualizado
---
 
#### **TELA 7: RELATÓRIO DE INSPEÇÃO**
 
**Propósito:** Visualizar resultado consolidado e profissional da inspeção, compartilhável
 
**O que mostra:**
 
**Header (fixo):**
- Botão voltar
- Título "Relatório de Inspeção"
- Subtítulo com número da unidade
- Botões de ação: Download PDF, Compartilhar
**Conteúdo:**
 
**Seção 1: Identificação**
- Logo/avatar do empreendimento
- Nome do empreendimento
- Endereço completo
- Grid com informações:
  - Torre/Bloco
  - Unidade
  - Cliente
  - Data da inspeção
  - Inspetor responsável
**Seção 2: Resumo Executivo**
- Total de itens personalizados
- Itens conformes (verde)
- Itens não conformes (vermelho)
- Taxa de conformidade (%)
- Indicador visual (verde se >= 95%, amarelo se < 95%)
**Seção 3: Detalhamento por Cômodo**
 
Para cada cômodo com itens:
- Nome do cômodo (com ícone)
- Contagem "X/Y itens conformes"
- Lista de items com:
  - Ícone de status (✓ verde ou ⚠ vermelho)
  - Nome do componente
  - Material especificado
  - Status
  - Se não conforme:
    - Tipo de não conformidade (badge vermelho)
    - Observação do inspetor
    - Fotos capturadas (grid 2 colunas)
**Seção 4: Assinatura Digital**
- Avatar do inspetor
- Nome do inspetor
- Data e hora exata da inspeção
- Label "Inspecionado por"
**Interações:**
- Botão voltar → volta para Visão Geral
- Download → baixa PDF para compartilhação
- Compartilhar → envia por e-mail ou gera link
**Dados:**
Consolidação dos dados da inspeção com cálculos:
- Percentuais
- Contagens
- Formatação para apresentação
---
 
## 4. Fluxo de Dados - Integração com Nuki
 
### 4.1 Origem dos Dados
 
O Nuki Inspetor **depende 100%** dos dados de personalização criados na plataforma principal Nuki:
 
```
Cliente escolhe acabamentos na Nuki Web
           ↓
Dados salvos em banco (Enterprise, Unit, Customization, Material, RoomComponent)
           ↓
Nuki Inspetor puxa esses dados automaticamente
           ↓
Gera checklist de inspeção estruturado
           ↓
Inspetor compara e valida
           ↓
Salva resultados (Inspection, InspectionItem)
```
 
### 4.2 Dados Principais
 
**Dados que Nuki Inspetor CONSOME:**
- Enterprise (empreendimento)
- Tower (torre/bloco)
- ClientUnit (unidade)
- Customization (personalização da unidade)
- CustomizationItem (cada item personalizado)
- RoomComponent (componente do cômodo - ex: "Piso da Sala")
- Material (material escolhido - foto, nome, metadados)
- Blueprint (planta/projeto)
**Dados que Nuki Inspetor PRODUZ:**
- Inspection (uma inspeção da unidade)
- InspectionItem (resultado da inspeção de um item)
- Photos (fotos capturadas)
### 4.3 Mudanças Pós-Aprovação
 
Caso o cliente mude algo após já estar aprovado:
- Cusomization é atualizado na plataforma Nuki
- Nuki Inspetor detecta mudança na próxima sincronização
- Novo item aparece como "Não inspecionado"
- Item anterior mantém status anterior (para rastreabilidade)
- Sistema notifica inspetor: "Esta unidade teve atualizações"
---
 
## 5. Modo Offline e Sincronização
 
### 5.1 Por que é Crítico
 
Canteiros de obra têm internet instável:
- Sinal fraco ou ausente em andares altos
- Data móvel cara/limitada
- Conexões de WiFi público pouco confiáveis
Se o app exigisse conexão contínua, seria inútil. Então:
 
### 5.2 Como Funciona
 
**Estratégia: Offline-First com Sincronização Inteligente**
 
**Sincronização de Entrada (ao abrir o app):**
- Baixa lista de empreendimentos
- Baixa estrutura de unidades (torres, unidades, cômodos, itens)
- Armazena localmente em IndexedDB
- Usuário pode usar tudo que baixou mesmo sem internet
**Durante a Inspeção (sem internet):**
- Inspetor captura fotos
- Fotos comprimidas e salvas localmente
- Marcações de status salvas localmente
- Badge mostra "Offline - X itens pendentes de sincronização"
**Quando Volta a Conectar:**
- App detecta conexão
- Começa sincronização automática
- Upla de fotos (pode demorar se muitas fotos grandes)
- Atualização de status dos itens
- Badge muda para "Online - Sincronizando..." depois "Online"
- Dados refletem instantaneamente no servidor
**Se der Erro na Sincronização:**
- Sistema tenta novamente automaticamente
- Mostra "Sincronização falhou - Tentando novamente"
- Usuário pode continuar trabalhando offline
---
 
## 6. Segurança e Rastreabilidade
 
### 6.1 Autenticação
- JWT tokens (mesmos da plataforma Nuki)
- Token refresh automático
- Logout após inatividade (15 min)
### 6.2 Autorização
- Inspetor só vê empreendimentos da sua organização
- Inspetor não pode deletar inspeções (apenas criar versões novas)
- Admin pode ver relatórios de todos
### 6.3 Rastreabilidade
Cada ação é registrada:
- Quem inspecionou (InspisonatorId, nome, foto)
- Quando (data + hora exata em UTC)
- O quê (status, observações, fotos)
- Mudanças anteriores (versionamento)
### 6.4 Fotos
- Upload direto para S3 (não fica no servidor PHP)
- Pre-signed URLs (expira em 24h)
- Compressão automática (máx 1920px, 80% quality)
- Limite: 5 fotos por item, até 5MB por foto
---
 
## 7. Performance e UX
 
### 7.1 Velocidade
- Carregamento da tela de inspeção de item: < 2s
- Captura e compressão de foto: < 3s
- Salvamento offline: instantâneo
- Sincronização online: background (não bloqueia UI)
### 7.2 Responsividade
- Mobile first (375px)
- Tablet friendly (768px)
- Desktop funcional (1024px+)
- Touch targets mínimo 44x44px
### 7.3 Acessibilidade
- Contraste AAA (WCAG)
- Suporta screen readers
- Navegação por teclado
- Alt text em todas as fotos
---
 
## 8. Casos de Uso Principais
 
### Caso 1: Inspeção Normal (Sem Problemas)
```
Inspetor abre unidade 101
Vê lista de cômodos (Sala, Cozinha, Suítes, etc)
Expande Sala
Vê 3 itens personalizados (Piso, Rodapé, Pintura)
Clica em "Piso"
Compara foto de referência (Porcelanato Portobello) com execução
Captura foto do piso
Marca "Conforme"
Clica "Salvar"
Volta para Sala
Piso agora mostra ✓ verde
Repete para Rodapé e Pintura
Quando todos estão conformes, abre relatório
Taxa de conformidade mostra 100%
Compartilha relatório com obra/diretoria
```
 
### Caso 2: Encontra Problema
```
Inspetor inspeciona Pintura da Sala
Captura foto
Nota que a tonalidade é mais amarelada que a referência
Marca "Não Conforme"
Sistema mostra "Tipo de não conformidade"
Seleciona "Cor/tonalidade diferente"
Escreve observação: "Tonalidade mais quente que Branco Neve especificado"
Clica "Salvar"
Volta para Sala
Pintura agora mostra ⚠ vermelho com "Não conforme"
Coordenador ve que há problema
Comunica à obra para repintar
Obra repinta
Inspetor volta para validar
Marca como "Conforme"
Sistema registra que foi corrigido (histórico completo)
```
 
### Caso 3: Mudança de Cliente Após Aprovação (Raro)
```
Unidade 102 foi toda aprovada
Cliente liga: "Quer trocar o piso da sala"
Personalização atualizada na plataforma Nuki
Inspetor abre app
Sistema avisa: "Unidade 102 teve atualizações"
Novo item aparece: "Piso da Sala (NOVO MATERIAL)"
Antigo item histórico mostra versão anterior
Inspetor inspeciona novo item
Marca como conforme
Status volta a 100%
```
 
---
 
## 9. Métricas e KPIs Monitorados
 
### Por Inspetor:
- Quantidade de inspeções/dia
- Tempo médio de inspeção por unidade
- Taxa de conformidade primeira inspeção (ideal > 85%)
- Taxa de reinspeções
- Velocidade de correção de problemas
### Por Empreendimento:
- Taxa de conformidade geral
- % de unidades aprovadas
- Tempo médio entre inspeção e entrega
- Tipos de não conformidade mais frequentes
- Redução de retrabalho (antes vs depois)
### Geral:
- Número total de unidades inspecionadas
- Taxa de adoção do app vs processo manual
- Tempo economizado (comparar 30min inspecão + 2h digitação vs 30min no app)
- Redução de reclamações pós-entrega
---
 
## 10. Roadmap Futuro (Pós-MVP)
 
### Fase 2: Gestão de Correções
- Fluxo de notificação automática para obra quando há não conformidade
- Atribuição de responsável + prazo para correção
- Notificação de conclusão
- Workflow de aprovação
### Fase 3: Integração com Entrega
- Cliente assina digitalmente na vistoria final
- Comparação: "aprovado na inspeção" vs "entregue ao cliente"
- Foto de assinatura no relatório
### Fase 4: Analytics Avançado
- Dashboard gerencial com gráficos
- IA para identificar padrões (ex: empreiteiro X sempre erra pintura)
- Alertas automáticos (ex: "Taxa de conformidade caiu para 60% esta semana")
### Fase 5: Integrações Externas
- Sincronização com sistema de compras (rastrear lote de material)
- Integração com sistema de gestão de obra (Sienge, Construct, etc)
- API pública para parceiros
---
 
## 11. Conclusão
 
O **Nuki Inspetor** fecha o ciclo de personalização da Nuki com uma ferramenta prática, digital e profissional para validação em obra. Ele transforma a inspeção de um processo manual e sujeito a falhas em um checklist estruturado com rastreabilidade completa, fotografia obrigatória e relatórios automáticos.
 
O resultado é clientes satisfeitos, construtoras com menos retrabalho, e visibilidade total do processo.