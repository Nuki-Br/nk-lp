// parser.js — Extract per-section JSX from the Figma design context dump
const fs = require('fs');
const path = require('path');

const DESIGN_CONTEXT_PATH =
  'C:/Users/felip/.claude/projects/C--Users-felip-nuki/b79f2f24-e207-4fee-bf49-8a0ac7920c8d/tool-results/toolu_01EcnLJ5rTWmmarNyLp2rNgv.json';
const OUT_DIR = 'C:/Users/felip/nuki/nk-lp/.section-dumps';

// ------------- Read JSON & extract JSX -------------
const raw = fs.readFileSync(DESIGN_CONTEXT_PATH, 'utf8');
const parsed = JSON.parse(raw);
let firstText;
if (Array.isArray(parsed)) {
  firstText = parsed[0]?.text;
} else if (parsed?.content && Array.isArray(parsed.content)) {
  firstText = parsed.content[0]?.text;
} else if (parsed?.text) {
  firstText = parsed.text;
} else {
  const stack = [parsed];
  while (stack.length) {
    const node = stack.pop();
    if (node && typeof node === 'object') {
      if (typeof node.text === 'string' && node.text.length > 1000) { firstText = node.text; break; }
      for (const v of Object.values(node)) if (v && typeof v === 'object') stack.push(v);
    }
  }
}
if (!firstText) { console.error('Could not extract JSX text from JSON.'); process.exit(1); }
fs.writeFileSync(path.join(OUT_DIR, 'full-jsx.txt'), firstText, 'utf8');
console.log(`Wrote full-jsx.txt (${firstText.length} chars)`);

// ------------- Asset URL map -------------
const assetMap = new Map();
const assetRe = /const\s+(img[A-Za-z0-9_]+)\s*=\s*"([^"]+)"\s*;?/g;
let m;
while ((m = assetRe.exec(firstText)) !== null) assetMap.set(m[1], m[2]);
console.log(`Found ${assetMap.size} asset URL constants`);

// ------------- Helpers: walk balanced JSX -------------
function findEndOfOpenTag(t, s) {
  let i = s, inBraces = 0, inStr = null;
  while (i < t.length) {
    const ch = t[i];
    if (inStr) { if (ch === inStr) inStr = null; }
    else if (ch === '"' || ch === "'") inStr = ch;
    else if (ch === '{') inBraces++;
    else if (ch === '}') inBraces--;
    else if (ch === '>' && inBraces === 0) return i;
    i++;
  }
  return -1;
}
function findElementEnd(t, s) {
  let i = s;
  const tagRe = /<\/?([A-Za-z][A-Za-z0-9]*)\b[^>]*?(\/?)>/g;
  tagRe.lastIndex = i;
  let depth = 0, first = false;
  while (true) {
    tagRe.lastIndex = Math.max(tagRe.lastIndex, i);
    const tt = tagRe.exec(t);
    if (!tt) return -1;
    const isClosing = tt[0].startsWith('</');
    const selfClosing = tt[2] === '/' || tt[0].endsWith('/>');
    if (!first) {
      first = true;
      if (isClosing) return -1;
      if (selfClosing) return tt.index + tt[0].length;
      depth = 1; i = tt.index + tt[0].length; continue;
    }
    if (selfClosing) { i = tt.index + tt[0].length; continue; }
    if (isClosing) { depth--; if (depth === 0) return tt.index + tt[0].length; } else depth++;
    i = tt.index + tt[0].length;
  }
}

// ------------- Locate root and top-level children -------------
const rootStart = firstText.search(/<div[^>]*data-name="Landing Page \| Home"/);
if (rootStart < 0) { console.error('Root not found'); process.exit(1); }
const rootOpenEnd = findEndOfOpenTag(firstText, rootStart);
let cursor = rootOpenEnd + 1;
const children = [];
while (cursor < firstText.length) {
  const lt = firstText.indexOf('<', cursor);
  if (lt < 0) break;
  if (firstText.startsWith('</', lt)) break; // root close
  const start = lt;
  const end = findElementEnd(firstText, start);
  if (end < 0) break;
  const jsx = firstText.slice(start, end);
  // Extract metadata
  const dnM = /data-name="([^"]+)"/.exec(jsx.slice(0, 400));
  const topM = /top-\[(-?\d+)px\]/.exec(jsx.slice(0, 400));
  children.push({
    start, end, jsx,
    dataName: dnM ? dnM[1] : null,
    top: topM ? parseInt(topM[1], 10) : null,
  });
  cursor = end;
}
console.log(`Top-level children of root: ${children.length}`);

// ------------- Image URL substitution -------------
function substituteImages(jsx) {
  return jsx.replace(/src=\{(img[A-Za-z0-9_]+)\}/g, (match, v) => {
    if (assetMap.has(v)) return `src="${assetMap.get(v)}"`;
    return match;
  });
}

// ------------- Identify REMAINING sections by content + top position -------------
// Build a finder: returns the first child satisfying the predicate.
function findChild(pred) {
  for (const c of children) if (pred(c)) return c;
  return null;
}

const targets = [
  {
    slug: 'recurso-personalizacao',
    name: 'Recurso Personalização',
    detect: (c) => c.dataName === 'Funcionalidade' && /Personaliza/i.test(c.jsx) && /RECURSO/.test(c.jsx) && /Saiba mais/i.test(c.jsx),
  },
  {
    slug: 'recurso-controle-analise',
    name: 'Recurso Controle e Análise',
    detect: (c) => c.dataName === 'Funcionalidade' && /Controle e/i.test(c.jsx) && /RECURSO/.test(c.jsx) && /an[aá]lise/i.test(c.jsx),
  },
  {
    slug: 'sua-identidade',
    name: 'Sua Identidade',
    // It's a div with no data-name but contains "identidade" + Button Secundário Negativo
    detect: (c) => /Sua /.test(c.jsx) && /identidade/i.test(c.jsx) && /Button Secund[aá]rio Negativo/i.test(c.jsx),
  },
  {
    slug: 'nuki-lab',
    name: 'Nuki Lab',
    detect: (c) => c.dataName === 'Funcionalidade' && /Nuki/.test(c.jsx) && /Lab/.test(c.jsx) && !/Sobre a/.test(c.jsx),
  },
  {
    slug: 'sobre-a-nuki',
    name: 'Sobre a Nuki',
    detect: (c) => c.dataName === 'Funcionalidade' && /Sobre a/.test(c.jsx) && /Nuki/.test(c.jsx) && /startup/i.test(c.jsx),
  },
  {
    slug: 'fale-com-a-gente',
    name: 'Fale com a Gente',
    detect: (c) => /Fale com a gente/i.test(c.jsx) && /Contato/.test(c.jsx),
  },
  {
    slug: 'footer',
    name: 'Footer',
    detect: (c) => c.dataName === 'Footer' || /data-name="Footer"/.test(c.jsx.slice(0, 200)),
  },
];

// Match each target
const matched = [];
const usedIdx = new Set();
for (const t of targets) {
  let found = null;
  for (let i = 0; i < children.length; i++) {
    if (usedIdx.has(i)) continue;
    if (t.detect(children[i])) {
      found = { ...t, ...children[i], childIndex: i };
      usedIdx.add(i);
      break;
    }
  }
  if (found) matched.push(found);
}

// Sort by 'top' position in document. Footer uses bottom-anchored, so always force last.
matched.sort((a, b) => {
  if (a.slug === 'footer') return 1;
  if (b.slug === 'footer') return -1;
  const at = a.top ?? Infinity;
  const bt = b.top ?? Infinity;
  return at - bt;
});

console.log(`\nIdentified ${matched.length} remaining sections:`);
matched.forEach((s, i) => {
  console.log(`  [${i}] ${s.name} (slug=${s.slug}) child=${s.childIndex} top=${s.top}px len=${s.end - s.start}`);
});

// Write out
for (const s of matched) {
  const out = substituteImages(s.jsx);
  const filePath = path.join(OUT_DIR, `${s.slug}.jsx`);
  fs.writeFileSync(filePath, out, 'utf8');
  console.log(`Wrote ${s.slug}.jsx (${out.length} chars)`);
}

// Report missing
const missing = targets.filter((p) => !matched.find((m2) => m2.slug === p.slug));
if (missing.length) {
  console.log('\nMISSING:');
  for (const m2 of missing) console.log(`  - ${m2.name} (${m2.slug})`);
}

// Also dump children index for reference
fs.writeFileSync(
  path.join(OUT_DIR, '_children-index.json'),
  JSON.stringify(
    children.map((c, i) => ({ i, dataName: c.dataName, top: c.top, len: c.end - c.start })),
    null, 2,
  ),
  'utf8',
);
console.log('\nWrote _children-index.json');

// Emit ordered slug list
console.log('\nFinal page order (matched only):');
matched.forEach((s, i) => console.log(`  ${i}. ${s.slug}  (${s.name})`));
