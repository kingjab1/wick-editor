#!/usr/bin/env node
/*
 * Builds learn/catalog.json from the files in learn/examples.
 *
 * File naming:  "01 Bouncing Ball -- timing, squash and stretch.wick"
 *   - optional leading number sets the order (01, 02, ...)
 *   - text before " -- " is the title
 *   - comma-separated words after " -- " are tags; tags that match a principle
 *     (by name or alias in principles.json) link the example to that principle
 * Optional files with the same name (before the extension):
 *   - .gif / .png / .jpg / .webp  -> preview image on the card
 *   - .txt                        -> short description on the card
 *
 * Run: node learn/build-catalog.js   (no dependencies)
 */
const fs = require('fs');
const path = require('path');

const LEARN = __dirname;
const EXAMPLES = path.join(LEARN, 'examples');
const PREVIEW_EXTS = ['.gif', '.png', '.jpg', '.jpeg', '.webp'];

const norm = s => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '');
const slug = s => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const urlPath = (...parts) => parts.map(encodeURIComponent).join('/');

const principlesFile = JSON.parse(fs.readFileSync(path.join(LEARN, 'principles.json'), 'utf8'));
const principles = (principlesFile.principles || []).map(p => ({
  id: p.id || slug(p.name),
  name: p.name,
  description: (p.description || '').trim(),
  aliases: p.aliases || [],
}));

// tag text -> principle id
const lookup = {};
principles.forEach(p => {
  [p.id, p.name, ...p.aliases].forEach(k => { lookup[norm(k)] = p.id; });
});

const files = fs.existsSync(EXAMPLES) ? fs.readdirSync(EXAMPLES) : [];
const byBase = {};
files.forEach(f => {
  const ext = path.extname(f).toLowerCase();
  const base = f.slice(0, f.length - ext.length);
  (byBase[base] = byBase[base] || {})[ext] = f;
});

const exercises = [];
Object.keys(byBase).forEach(base => {
  const group = byBase[base];
  const wick = group['.wick'] || group['.zip'];
  if (!wick) return;

  let name = base.trim();
  let order = Infinity;
  const num = name.match(/^(\d+)[\s._-]+(.*)$/);
  if (num) { order = parseInt(num[1], 10); name = num[2]; }

  let tagText = '';
  const split = name.split(/\s+--\s+|\s+—\s+/);
  if (split.length > 1) { name = split[0]; tagText = split.slice(1).join(','); }
  const title = name.trim();

  const linked = [], tags = [];
  tagText.split(',').map(t => t.trim()).filter(Boolean).forEach(t => {
    const id = lookup[norm(t)];
    if (id) { if (linked.indexOf(id) === -1) linked.push(id); }
    else if (tags.indexOf(t) === -1) tags.push(t);
  });

  const previewExt = PREVIEW_EXTS.find(e => group[e]);
  let description = '';
  if (group['.txt']) {
    description = fs.readFileSync(path.join(EXAMPLES, group['.txt']), 'utf8').trim().slice(0, 400);
  }

  exercises.push({
    id: slug(title) || slug(base),
    title,
    order,
    file: urlPath('examples', wick),
    preview: previewExt ? urlPath('examples', group[previewExt]) : null,
    description,
    principles: linked,
    tags,
  });
});

exercises.sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
exercises.forEach(e => { delete e.order; });

const catalog = {
  generated: new Date().toISOString(),
  principles: principles.map(({ id, name, description }) => ({ id, name, description })),
  exercises,
};
fs.writeFileSync(path.join(LEARN, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
console.log(`catalog.json: ${exercises.length} exercise(s), ${principles.length} principle(s)`);
exercises.forEach(e => console.log(`  - ${e.title}  [${e.principles.join(', ')}]${e.tags.length ? '  extra tags: ' + e.tags.join(', ') : ''}${e.preview ? '' : '  (no preview image)'}`));
