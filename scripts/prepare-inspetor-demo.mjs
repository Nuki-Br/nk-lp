#!/usr/bin/env node
/**
 * prepare-inspetor-demo.mjs
 * ─────────────────────────────────────────────────────────────
 * Trims the Claude Design HTML export of the Nuki Inspector into a demo suitable
 * for embedding as iframe inside /comercial.
 *
 * IMPORTANTE — variante "App-in-template" (ver docs/comercial-demo-pattern.md):
 * diferente do Planner (App root num módulo do __bundler/manifest), o Inspetor
 * define PrototypeFlow + App inline dentro de <script type="__bundler/template">,
 * num bloco <script type="text/babel">. Todos os patches operam contra a string
 * do TEMPLATE. O manifest passa intacto.
 *
 * Patches aplicados:
 *
 *   1. Strip <TweaksPanel>…</TweaksPanel>
 *      Remove o rail de dev tooling do Claude Design (controles "Variante de
 *      comparação" / "Cor de acento") que o prospect não deveria ver.
 *
 * Não aplica patches canônicos 1/3 (screen initial / navigate intercept): user
 * optou por preservar o fluxo original começando em "login" — todos os 6 passos
 * do protótipo (login → emp → torres → unidades → overview → inspect → report)
 * ficam navegáveis.
 *
 * Gotcha crítico do JSON.stringify (mesmo que o loader usa em __resources):
 * o template raw grava tags de fechamento como <\/TweaksPanel> com "/" escapado
 * pro parser HTML não terminar o <script type="__bundler/template"> no primeiro
 * "</". JSON.stringify do Node NÃO re-escapa "/", então precisamos post-process
 * com .replace(/<\//g, "<\\/") antes de re-injetar.
 *
 * Reads:  src/HTML/Nuki Inspector - Protótipo (offline).html
 * Writes: public/demos/inspetor/index.html
 *
 * Usage:
 *   cd nk-lp && node scripts/prepare-inspetor-demo.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = join(ROOT, "src", "HTML", "Nuki Inspector - Protótipo (offline).html");
const OUT_DIR = join(ROOT, "public", "demos", "inspetor");
const OUT = join(OUT_DIR, "index.html");

console.log("[inspetor-demo] reading", SRC);
const html = readFileSync(SRC, "utf8");

const TEMPLATE_RE = /<script type="__bundler\/template">([\s\S]*?)<\/script>/;
const match = html.match(TEMPLATE_RE);
if (!match) throw new Error("Template script tag not found in HTML");

// Template payload é uma string JSON-encoded (o Design bundler serializa o HTML
// inteiro do template como uma única string dentro do <script>).
const template = JSON.parse(match[1].trim());
if (typeof template !== "string") {
  throw new Error(`Expected template to be a string, got ${typeof template}`);
}
console.log(`[inspetor-demo] template length: ${template.length}`);

const patches = { tweaks: 0 };

let patched = template;

// Patch 1: strip TweaksPanel — lazy match cobre o JSX block inteiro do App().
const TWEAKS_RE = /<TweaksPanel>[\s\S]*?<\/TweaksPanel>/;
if (TWEAKS_RE.test(patched)) {
  patched = patched.replace(TWEAKS_RE, "");
  patches.tweaks++;
}

console.log("[inspetor-demo] patches applied:", patches);

if (patches.tweaks === 0) {
  console.warn(
    "[inspetor-demo] WARN: TweaksPanel strip missed — panel may still show. Verify regex vs template.",
  );
}

// Re-encode: JSON.stringify + escape </ pra não fechar o <script type="__bundler/template">
// prematuramente quando o browser parseia o HTML.
const encoded = JSON.stringify(patched).replace(/<\//g, "<\\/");

let newHtml = html.replace(
  TEMPLATE_RE,
  `<script type="__bundler/template">${encoded}</script>`,
);

// ESC bridge — mesmo snippet usado no Planner. capture:true dispara ANTES de
// qualquer handler React interno. Quando o HTML é embutido como iframe em outra
// página (window.parent !== window), o parent recebe postMessage({type: 'nuki-demo:esc'})
// e responde saindo do modo demo. Listener no window persiste depois da troca
// de body feita pelo loader.
const ESC_BRIDGE = `<script>
(function(){
  window.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && window.parent !== window) {
      e.preventDefault();
      try { window.parent.postMessage({ type: 'nuki-demo:esc' }, '*'); } catch(_){}
    }
  }, { capture: true });
})();
</script>`;

if (newHtml.includes("</head>")) {
  newHtml = newHtml.replace("</head>", `${ESC_BRIDGE}\n</head>`);
} else {
  console.warn("[inspetor-demo] WARN: </head> not found, ESC bridge not injected");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, newHtml, "utf8");

const inputKB = (html.length / 1024).toFixed(0);
const outputKB = (newHtml.length / 1024).toFixed(0);
console.log(
  `[inspetor-demo] wrote ${OUT}\n              ${outputKB} KB output (input ${inputKB} KB source)`,
);
