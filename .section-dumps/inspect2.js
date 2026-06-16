const fs = require('fs');
const text = fs.readFileSync('C:/Users/felip/nuki/nk-lp/.section-dumps/full-jsx.txt', 'utf8');
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
// Print first ~400 chars of all children to identify
for (let i = 0; i < children.length; i++) {
  const c = children[i];
  const head = c.jsx.slice(0, 250).replace(/\s+/g, ' ');
  // Try to find top-[XXXpx]
  const topMatch = /top-\[(-?\d+px)\]/.exec(c.jsx.slice(0, 400));
  console.log(`[${String(i).padStart(2,'0')}] top=${topMatch ? topMatch[1] : '?'} len=${c.end-c.start}  ${head.slice(0, 160)}`);
}
