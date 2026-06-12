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

// --- Lecture des fichiers ---
const templatePath = join(root, 'templates', 'memora-snippets.template.html');
const kmmacrosPath = join(root, 'macros', 'MEMORA-Snippets.kmmacros');

if (!existsSync(templatePath)) { fail('Template introuvable', templatePath); process.exit(1); }
if (!existsSync(kmmacrosPath)) { fail('Fichier kmmacros introuvable', kmmacrosPath); process.exit(1); }

const template  = readFileSync(templatePath,  'utf8');
const kmmacros  = readFileSync(kmmacrosPath,  'utf8');

// Fichiers Markdown (.md) à la racine du dépôt
const mdContents = readdirSync(root)
  .filter(f => f.endsWith('.md'))
  .map(f => readFileSync(join(root, f), 'utf8'));

console.log('\n── Garde-fous MEMORA — intégrité du dépôt ──\n');

// ── 1. Aucune mention de marque d'outil IA tierce (insensible à la casse) ──
// Périmètre : templates/*.html, *.md, macros/*.kmmacros
// Termes décodés à l'exécution pour ne pas les faire figurer en clair dans le dépôt.
const aiPattern = new RegExp([atob('YW50aHJvcGlj'), atob('Y2xhdWRl')].join('|'), 'i');
const templateMentionsAI = aiPattern.test(template);
const kmmacrosMentionsAI = aiPattern.test(kmmacros);
const mdMentionsAI       = mdContents.some(c => aiPattern.test(c));
check(
  'Aucune mention de marque IA tierce (templates + macros + .md)',
  !templateMentionsAI && !kmmacrosMentionsAI && !mdMentionsAI,
  [
    templateMentionsAI  ? 'trouvé dans template'  : '',
    kmmacrosMentionsAI  ? 'trouvé dans kmmacros'  : '',
    mdMentionsAI        ? 'trouvé dans un .md'     : '',
  ].filter(Boolean).join(', '),
);

// ── 2. En-tête "MEMORA solutions" en ligne 1 du template ──
const firstLine = template.split('\n')[0];
check(
  'En-tête "MEMORA solutions" présent en ligne 1 du template',
  firstLine.includes('MEMORA solutions'),
  `ligne 1 : ${firstLine.slice(0, 80)}`,
);

// ── 3. Aucune ressource externe chargée dans le template ──
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
const extFailures = externalChecks.filter(({ re }) => re.test(template)).map(({ label }) => label);
check(
  'Aucune ressource externe dans le template',
  extFailures.length === 0,
  extFailures.join(', '),
);

// ── 4. Balise Content-Security-Policy présente ──
check(
  'Balise Content-Security-Policy présente dans le template',
  template.includes('Content-Security-Policy'),
);

// ── 5. Intégrité du fichier kmmacros ──
check('kmmacros commence par <?xml',          kmmacros.trimStart().startsWith('<?xml'));
check('kmmacros contient <array>',            kmmacros.includes('<array>'));
check(
  'kmmacros contient l\'UID de groupe 34272D1B-7790-48E3-989E-7718566ECFA7',
  kmmacros.includes('34272D1B-7790-48E3-989E-7718566ECFA7'),
);

// ── Résumé ──
console.log('');
if (failures > 0) {
  console.error(`${failures} vérification(s) échouée(s). Corrigez avant de pousser.\n`);
  process.exit(1);
} else {
  console.log('Tous les garde-fous passent.\n');
}
