# Padrão: demo interativa dos módulos no /comercial

Este doc explica como integrar o HTML de um módulo (Planner / Personaliza / Inspetor) como demo interativa dentro do slide de `/comercial`. Foi escrito depois da integração do **Planner** — o mesmo passo-a-passo vale pra adicionar os outros.

## Convenção de paths

| Papel                 | Localização                                             |
| --------------------- | ------------------------------------------------------- |
| HTML original         | `src/HTML/Nuki <NomeDoModulo>.html`                     |
| Script de trim/unpack | `scripts/prepare-<slug>-demo.mjs`                       |
| HTML pronto (público) | `public/demos/<slug>/index.html`                        |
| Pattern React (data)  | `src/components/comercial/modulos.data.ts` → `demoUrl`  |

`<slug>` = `planner`, `personaliza`, `inspetor`.

## Como ler os HTMLs (importante)

Os HTMLs são gerados pelo Claude Design em wrapper `__bundler`. **~1.5MB por arquivo, em ~185 linhas com linhas gigantes** (manifest + template em uma linha só). O `Read` do Claude Code estoura o token limit.

Formas seguras de inspecionar:

- `head -n 40 <arquivo>` — vê o loader (as primeiras 40 linhas são o skeleton HTML + script de decodificação)
- `sed -n '<start>,<end>p'` — extrai range específico
- Node script — `fs.readFileSync` + regex + `console.log`

Preferir delegar a análise pra um agente Explore com prompt específico (ver seção "Como adicionar um módulo novo" abaixo).

## Estrutura do wrapper `__bundler`

Todo HTML segue o mesmo formato:

- `<script type="__bundler/manifest">` — JSON com N entries `{uuid: {data: base64, compressed: bool, type: mime}}`. Entradas `compressed: true` são gzip-encoded.
- `<script type="__bundler/template">` — JSON com o HTML do template (`<div id="root">` + tags `<script type="text/babel">` referenciando UUIDs por blob URL)
- Loader nas linhas ~40-170 — descompacta manifest, cria blob URLs, injeta template em `document.body.innerHTML`, boota o React

## Os 3 patches conceituais (em cada HTML)

Cada Claude Design tem um módulo App com estado inicial que abre numa "landing" (dashboard, lista de projetos, etc.). Pra virar demo interativa que abre já dentro de UM item pré-selecionado, aplicamos 3 patches no módulo App:

1. **Screen inicial** — `React.useState('<landing>')` vira `React.useState('<primeira_tela_interna>')`. Nomes variam por módulo (Planner: `'dashboard'` → `'typologies'`).

2. **Item selecionado** — `React.useState(null)` do "projeto/vistoria/etc" ativo vira lazy init: `React.useState(() => (window.<Data>Global || {}).<ITEM_FIXO> || null)`. Depende de haver um global no data module (Planner: `window.PlannerData.THE_PROJECT`).

3. **Intercept do navigate** — a função `const navigate = (dest, params = {}) => {` ganha um early check: `if (dest === '<landing>') dest = '<primeira_tela_interna>';`. Isso protege contra sidebar / breadcrumbs / etc que tentem levar o user de volta pra landing.

Além disso, injeta uma **ESC bridge** no `<head>` (postMessage) — genérica, reutilizável:

```js
window.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && window.parent !== window) {
    e.preventDefault();
    try { window.parent.postMessage({ type: 'nuki-demo:esc' }, '*'); } catch(_){}
  }
}, { capture: true });
```

## Variante: App-in-template (Inspetor)

Nem todo módulo tem o App root num entry do manifest. O **Inspetor** define
`PrototypeFlow` + `App` inline dentro de `<script type="__bundler/template">`,
num bloco `<script type="text/babel">`. Sinal: procurar por `function PrototypeFlow`
ou similar dentro do template — se aparecer, o trim opera contra a string do
template, não contra entries de manifest (que passam intactas).

Fluxo dessa variante:

1. Extrair template com regex `<script type="__bundler/template">([\s\S]*?)<\/script>`.
2. `JSON.parse(match[1].trim())` → string plana do template (é uma string JSON-encoded).
3. Aplicar patches direto na string (regex sobre JSX literal — `<TweaksPanel>`, `useState("login")`, etc).
4. **Gotcha do JSON.stringify** — o template original grava tags de fechamento como
   `<\/Tag>` (com `/` escapado) pro parser HTML não terminar o `<script type="__bundler/template">`
   no primeiro `</` do payload. `JSON.stringify` do Node **não** re-escapa `/`, então
   a saída teria `</Tag>` literal e o browser fecharia o `<script>` ali, arruinando
   o loader. Mitigação obrigatória — mesma que o próprio loader do bundler usa em
   `window.__resources`:
   ```js
   const encoded = JSON.stringify(patched).replace(/<\//g, "<\\/");
   ```
5. Re-injetar via `html.replace(TEMPLATE_RE, `<script type="__bundler/template">${encoded}</script>`)`.

**Patches canônicos 1/2/3 são opcionais nessa variante.** Se o fluxo original
do protótipo já é aceitável como demo (ex: Inspetor mantém `login → emp → torres →
unidades → overview → inspect → report`), pula patches 1 e 3 — não tem tela pulada
pra proteger. Pula patch 2 se não houver estado top-level de "item atual" com
data global pra fazer o seed (Inspetor tem só `item`/`room` que legitimamente
começam null e são setados por clique). No caso do Inspetor, o único patch é o
strip do `<TweaksPanel>` (rail de dev tooling do Claude Design que não deveria
aparecer pro prospect).

Referência: `scripts/prepare-inspetor-demo.mjs`.

## Estrutura do trim script

Ver `scripts/prepare-planner-demo.mjs` como referência. Fluxo:

1. Ler HTML
2. Regex extrair manifest JSON
3. Loop nas entries, decodificar (gzip if compressed)
4. String search por assinatura textual em cada entrada. Só a entrada que contém os patterns é decodificada + patchada — resto passa direto
5. Aplicar 3 patches via regex
6. Re-encoder como `compressed: false` + base64 plano (mais fácil pra debug/manutenção)
7. Injetar ESC bridge no `<head>` do HTML string
8. Escrever output

Contadores de patches aplicados no fim do script — se algum for 0, avisa (regex desatualizada).

## Lado React (já genérico, não precisa reescrever)

Tudo já espera novos módulos:

- `ModuloData.demoUrl?: string` — só setar em `modulos.data.ts` pro módulo alvo
- `Modulos.tsx` emite `<ModuloDemoSlide>` automaticamente quando `demoUrl` existe
- `ModuloSlide.tsx` troca "Saiba mais" por CTA "▷ Explorar o {título}" quando `demoUrl` existe
- `ModuloDemoSlide.tsx` — layout fullscreen (barra 44px + iframe), botões `← Voltar` e `Seguir →`, `data-back-target={data.id}` pro observer
- `ComercialScripts.tsx` observer em `.modulo-demo-slide` — pega qualquer demo novo, aplica scroll lock (`html.demo-locked`) via CSS
- CSS `.modulo-demo-*` — cobre desktop + fallback mobile (<900px mostra "abrir em nova aba")

**Falta só**: adicionar `<link rel="prefetch" href="/demos/<slug>/index.html" as="document" />` no `<div>` root de `page.tsx` pro novo demo (opcional mas melhora perceived perf).

## Como adicionar um módulo novo

1. Investigar o HTML — delegar pra Explore agent com prompt específico. Perguntas essenciais:
   - Qual UUID do módulo App? (o que tem o `useState('landing')`)
   - Qual é a `landing screen` e qual é a primeira screen interna razoável?
   - Qual o nome do state var do item ativo? (`project`, `vistoria`, `checklist`, …)
   - Qual o nome do data global? (`window.PlannerData`, `window.InspetorData`, …)
   - O item hardcoded no global tem nome próprio? (`THE_PROJECT`, `THE_VISTORIA`, …)
2. Copiar `scripts/prepare-planner-demo.mjs` → `scripts/prepare-<slug>-demo.mjs`
3. Ajustar constantes `SRC`, `OUT_DIR`, `OUT` no topo
4. Adaptar as regexes de cada patch pro pattern do novo módulo (nome do state var, screen, global)
5. Rodar: `cd nk-lp && node scripts/prepare-<slug>-demo.mjs`
6. Verificar contadores no output: os 3 patches devem sair como 1 cada. Se 0, revisa regex
7. Em `src/components/comercial/modulos.data.ts`, adicionar `demoUrl: "/demos/<slug>/index.html"` no módulo
8. Em `src/app/comercial/page.tsx`, adicionar `<link rel="prefetch" ... />` do novo path
9. `npx tsc --noEmit && npx eslint src/app/comercial src/components/comercial`
10. Abrir `/comercial#<slug>` no browser, testar: CTA "▷ Explorar" abre, iframe carrega no item pré-selecionado, ← Voltar / Seguir → funcionam, ESC no iframe funciona (bridge), scroll lock ativo

## Gotchas

- **Reading da HTML gigante** — nunca use `Read` tool nele. Use `head`/`sed`/Node.
- **CRLF/LF warnings** no `git add` — Windows, inofensivo.
- **Foco no iframe + ESC** — resolvido pela ESC bridge injetada. Sem ela, ESC do parent não funciona quando prospect clica dentro do iframe.
- **Módulos mobile-first** (Inspetor provavelmente) vão precisar de tratamento CSS diferente. HTML do Planner é desktop-fixed sidebar 212px + grids 4-col; se o novo módulo é responsivo, o iframe pode escalar melhor. Testar em mobile antes de dar por fechado.
- **Prefetch** só faz sentido pro módulo que o prospect mais provavelmente vai abrir. Se prefetch todos os 3, você baixa 4.5MB no primeiro load. Manter só o principal ou nenhum, à escolha.
- **Manifest entries que precisam ser patchadas** — normalmente é 1 (o módulo App). Se o script log mostrar > 1 sendo patchada, revisar (talvez algum regex está pegando algo genérico demais).
