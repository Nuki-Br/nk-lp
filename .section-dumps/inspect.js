// inspect.js — quick look at each Funcionalidade and unnamed child
const fs = require('fs');
const path = require('path');

const text = fs.readFileSync('C:/Users/felip/nuki/nk-lp/.section-dumps/full-jsx.txt', 'utf8');
const idx = JSON.parse(fs.readFileSync('C:/Users/felip/nuki/nk-lp/.section-dumps/_children-index.json', 'utf8'));

// Recompute starts the same way as parser
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
    if (!first) { first = true; if (isClosing) return -1; if (selfClosing) return tt.index + tt[0].length; depth = 1; i = tt.index + tt[0].length; continue; }
    if (selfClosing) { i = tt.index + tt[0].length; continue; }
    if (isClosing) { depth--; if (depth === 0) return tt.index + tt[0].length; } else depth++;
    i = tt.index + tt[0].length;
  }
}

// Find root start
const rootStart = text.search(/<div[^>]*data-name="Landing Page \| Home"/);
const rootOpenEnd = findEndOfOpenTag(text, rootStart);
let cursor = rootOpenEnd + 1;
const children = [];
while (cursor < text.length) {
  const lt = text.indexOf('<', cursor);
  if (lt < 0) break;
  if (text.startsWith('</', lt)) break;
  const start = lt;
  const end = findElementEnd(text, start);
  if (end < 0) break;
  children.push({ start, end, jsx: text.slice(start, end) });
  cursor = end;
}

const targets = [7, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24];
for (const i of targets) {
  const c = children[i];
  if (!c) { console.log(`#${i} missing`); continue; }
  // Print first 600 chars
  const snippet = c.jsx.slice(0, 600).replace(/\s+/g, ' ');
  console.log(`\n=== child[${i}] start=${c.start} len=${c.end - c.start} ===`);
  console.log(snippet);
}

// Also save each unnamed/funcionalidade to disk for inspection
const dir = 'C:/Users/felip/nuki/nk-lp/.section-dumps/_inspect';
fs.mkdirSync(dir, { recursive: true });
for (const i of targets) {
  const c = children[i];
  if (!c) continue;
  fs.writeFileSync(path.join(dir, `child-${String(i).padStart(2, '0')}.jsx`), c.jsx);
}
console.log('\nSaved inspect dumps.');
