#!/usr/bin/env node
// Auteur: MEMORA solutions, https://memora.solutions ; info@memora.ca.
// Licence: Apache-2.0 (SPDX-License-Identifier: Apache-2.0). Copyright 2026 MEMORA solutions.
// Garde-fous d'intégrité du dépôt — node tests/guard.mjs (zéro dépendance npm).

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

let failures = 0;

function pass(label) { console.log(`  ✓  ${label}`); }
function fail(label, detail = '') {
  console.error(`  ✗  ${label}${detail ? ` — ${detail}` : ''}`);
  failures++;
}
function check(label, condition, detail = '') {
  condition ? pass(label) : fail(label, detail);
}

// --- Lecture de tous les fichiers du produit ---
const templatesDir = join(root, 'templates');
const macrosDir    = join(root, 'macros');

if (!existsSync(templatesDir)) { fail('Dossier templates/ introuvable', templatesDir); process.exit(1); }
if (!existsSync(macrosDir))    { fail('Dossier macros/ introuvable',    macrosDir);    process.exit(1); }

// Charge tous les templates HTML : [{ name, content }]
const templates = readdirSync(templatesDir)
  .filter(f => f.endsWith('.html'))
  .map(f => ({ name: f, content: readFileSync(join(templatesDir, f), 'utf8') }));

// Charge tous les fichiers kmmacros : [{ name, content }]
const kmmacros = readdirSync(macrosDir)
  .filter(f => f.endsWith('.kmmacros'))
  .map(f => ({ name: f, content: readFileSync(join(macrosDir, f), 'utf8') }));

// Charge tous les fichiers Markdown à la racine : [{ name, content }]
const mdFiles = readdirSync(root)
  .filter(f => f.endsWith('.md'))
  .map(f => ({ name: f, content: readFileSync(join(root, f), 'utf8') }));

if (templates.length === 0) { fail('Aucun template HTML trouvé dans templates/'); process.exit(1); }
if (kmmacros.length  === 0) { fail('Aucun fichier .kmmacros trouvé dans macros/'); process.exit(1); }

console.log('\n── Garde-fous MEMORA — intégrité du dépôt ──\n');

// ── 1. Aucune mention de marque d'outil IA tierce (insensible à la casse) ──
// Périmètre : templates/*.html, macros/*.kmmacros, *.md
// Termes décodés à l'exécution pour ne pas les faire figurer en clair dans le dépôt.
const aiPattern = new RegExp([atob('YW50aHJvcGlj'), atob('Y2xhdWRl')].join('|'), 'i');

const aiFailing = [
  ...templates.filter(t => aiPattern.test(t.content)).map(t => `templates/${t.name}`),
  ...kmmacros.filter(k => aiPattern.test(k.content)).map(k => `macros/${k.name}`),
  ...mdFiles.filter(m => aiPattern.test(m.content)).map(m => m.name),
];
check(
  'Aucune mention de marque IA tierce (templates + macros + .md)',
  aiFailing.length === 0,
  aiFailing.join(', '),
);

// ── 2. En-tête "MEMORA solutions" en ligne 1 de chaque template ──
const headerFailing = templates.filter(t => !t.content.split('\n')[0].includes('MEMORA solutions'));
check(
  'En-tête "MEMORA solutions" présent en ligne 1 de chaque template',
  headerFailing.length === 0,
  headerFailing.map(t => t.name).join(', '),
);

// ── 3. Aucune ressource externe chargée dans les templates ──
// Cible : attributs src="http…", href="http…" (hors texte/commentaires),
//         appels fetch(…), balises <script src, @import url(http…)
// Exclut les URLs en texte libre (ex. dans les snippets de démo ou commentaires HTML).
const externalChecks = [
  { label: 'src="http  dans un attribut HTML', re: /\bsrc="https?:/i },
  { label: 'href="http dans un attribut HTML', re: /\bhref="https?:/i },
  { label: 'appel fetch(',                     re: /\bfetch\s*\(/    },
  { label: '<script src externe',              re: /<script\s+src/i  },
  { label: '@import url(http  en CSS',         re: /@import\s+url\s*\(\s*https?:/i },
];
const extFailing = [];
for (const tmpl of templates) {
  const hits = externalChecks.filter(({ re }) => re.test(tmpl.content)).map(({ label }) => label);
  if (hits.length > 0) extFailing.push(`${tmpl.name} (${hits.join(', ')})`);
}
check(
  'Aucune ressource externe dans les templates',
  extFailing.length === 0,
  extFailing.join(' | '),
);

// ── 4. Balise Content-Security-Policy présente dans chaque template ──
const cspFailing = templates.filter(t => !t.content.includes('Content-Security-Policy'));
check(
  'Balise Content-Security-Policy présente dans chaque template',
  cspFailing.length === 0,
  cspFailing.map(t => t.name).join(', '),
);

// ── 5. Intégrité structurelle de chaque fichier kmmacros ──
const xmlFailing   = kmmacros.filter(k => !k.content.trimStart().startsWith('<?xml'));
const arrayFailing = kmmacros.filter(k => !k.content.includes('<array>'));
check(
  'Chaque kmmacros commence par <?xml',
  xmlFailing.length === 0,
  xmlFailing.map(k => k.name).join(', '),
);
check(
  'Chaque kmmacros contient <array>',
  arrayFailing.length === 0,
  arrayFailing.map(k => k.name).join(', '),
);

// ── 6. UID de groupe spécifique (MEMORA-Snippets.kmmacros) ──
const snippetsKm = kmmacros.find(k => k.name === 'MEMORA-Snippets.kmmacros');
check(
  'MEMORA-Snippets.kmmacros — UID de groupe 34272D1B-7790-48E3-989E-7718566ECFA7',
  !!snippetsKm && snippetsKm.content.includes('34272D1B-7790-48E3-989E-7718566ECFA7'),
  snippetsKm ? 'UID absent' : 'fichier introuvable',
);

// ── Résumé ──
console.log('');
if (failures > 0) {
  console.error(`${failures} vérification(s) échouée(s). Corrigez avant de pousser.\n`);
  process.exit(1);
} else {
  console.log('Tous les garde-fous passent.\n');
}
