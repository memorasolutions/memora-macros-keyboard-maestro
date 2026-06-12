// Auteur: MEMORA solutions, https://memora.solutions ; info@memora.ca.
// Licence: Apache-2.0 (SPDX-License-Identifier: Apache-2.0). Copyright 2026 MEMORA solutions.
// Tests unitaires des fonctions pures du template — node:test + node:vm (zéro dépendance npm).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatePath = join(__dirname, '..', 'templates', 'memora-snippets.template.html');

// --- Extraction du bloc <script> ---
const html = readFileSync(templatePath, 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('Bloc <script> introuvable dans le template.');
const rawScript = scriptMatch[1];

// On injecte l'export APRÈS le corps du script pour éviter toute exécution DOM.
const scriptWithExport =
  rawScript +
  '\nglobalThis.__memora = { normalize, extractVars, resolve, fuzzy, assemble, hasVars };';

// --- Stubs DOM (empêchent l'exécution de init()) ---
// document.readyState = 'loading'  → la dernière ligne du script appelle
//   document.addEventListener('DOMContentLoaded', init)  (stub no-op)
// et n'appelle JAMAIS init() directement.
const makeFakeElement = () => ({
  style: {},
  classList: { add() {}, remove() {} },
  addEventListener() {},
  appendChild() {},
  setAttribute() {},
  innerHTML: '',
  textContent: '',
  dataset: {},
  value: '',
  checked: false,
  focus() {},
  select() {},
  querySelectorAll() { return []; },
  querySelector() { return null; },
  closest() { return null; },
  remove() {},
  matches() { return false; },
});

const sandbox = vm.createContext({
  // DOM stubs
  document: {
    readyState: 'loading',
    addEventListener() {},
    getElementById() { return makeFakeElement(); },
    querySelectorAll() { return []; },
    createElement() { return makeFakeElement(); },
    body: {
      appendChild() {},
      addEventListener() {},
      contains() { return false; },
    },
  },
  window: {},
  navigator: { clipboard: { writeText() {} } },

  // JS builtins réels
  Intl: globalThis.Intl,
  Date: globalThis.Date,
  Math: globalThis.Math,
  JSON: globalThis.JSON,
  Number: globalThis.Number,
  String: globalThis.String,
  Boolean: globalThis.Boolean,
  Array: globalThis.Array,
  Object: globalThis.Object,
  RegExp: globalThis.RegExp,
  Map: globalThis.Map,
  Set: globalThis.Set,
  Symbol: globalThis.Symbol,
  Error: globalThis.Error,
  parseInt: globalThis.parseInt,
  parseFloat: globalThis.parseFloat,
  isNaN: globalThis.isNaN,
  isFinite: globalThis.isFinite,

  // Timers (no-op)
  setTimeout: () => 0,
  clearTimeout: () => {},

  MutationObserver: class { observe() {} disconnect() {} },
  console,
});

vm.runInContext(scriptWithExport, sandbox);

// --- Récupération des fonctions exportées ---
const exported = sandbox.__memora;
if (!exported) throw new Error('globalThis.__memora absent après exécution du script.');

// Vérification préalable : toutes les fonctions doivent exister.
const EXPECTED_FUNS = ['normalize', 'extractVars', 'resolve', 'fuzzy', 'assemble', 'hasVars'];
for (const name of EXPECTED_FUNS) {
  if (typeof exported[name] !== 'function') {
    throw new Error(`Fonction manquante ou invalide dans le template : ${name}`);
  }
}

const { normalize, extractVars, resolve, fuzzy, assemble, hasVars } = exported;

// ===== TESTS =====

test('normalize — enlève les accents et met en minuscules', () => {
  assert.strictEqual(normalize('Étiquette'), 'etiquette');
  assert.strictEqual(normalize('PRÉNOM'), 'prenom');
  assert.strictEqual(normalize('café'), 'cafe');
  assert.strictEqual(normalize('ÇA va'), 'ca va');
  assert.strictEqual(normalize(''), '');
});

test('extractVars — retourne 2 entrées avec labels et types corrects', () => {
  const vars = extractVars('{{champ:Prénom}} et {{choix:Ton=Formel|Amical}}');
  assert.strictEqual(vars.length, 2, 'doit retourner exactement 2 variables');

  assert.strictEqual(vars[0].label, 'Prénom');
  assert.strictEqual(vars[0].type, 'champ');
  // spread vers le realm hôte pour éviter l'inégalité cross-realm vm vs hôte
  assert.deepStrictEqual([...vars[0].choices], []);

  assert.strictEqual(vars[1].label, 'Ton');
  assert.strictEqual(vars[1].type, 'choix');
  assert.deepStrictEqual([...vars[1].choices], ['Formel', 'Amical']);
});

test('extractVars — texte sans variable retourne tableau vide', () => {
  assert.strictEqual(extractVars('Bonjour tout le monde').length, 0);
  assert.strictEqual(extractVars('').length, 0);
});

test('resolve — substitution champ simple', () => {
  assert.strictEqual(
    resolve('Bonjour {{champ:Prénom}}', { Prénom: 'Alice' }),
    'Bonjour Alice',
  );
});

test('resolve — substitution choix', () => {
  assert.strictEqual(
    resolve('{{choix:Ton=Formel|Amical}} !', { Ton: 'Formel' }),
    'Formel !',
  );
});

test('resolve — label avec métacaractères regex (parenthèses) ne lève pas d\'erreur', () => {
  let result;
  assert.doesNotThrow(() => {
    result = resolve('Montant : {{champ:Prix (€)}}', { 'Prix (€)': '12 €' });
  });
  assert.strictEqual(result, 'Montant : 12 €');
});

test('resolve — valeur contenant $& insérée littéralement (anti-bug $-pattern)', () => {
  // String.prototype.replace avec une chaîne de remplacement interprète $& comme
  // "insérer la correspondance entière". La résolution utilise une fonction (() => val)
  // pour court-circuiter ce comportement ; la valeur doit apparaître telle quelle.
  const result = resolve('Prix: {{champ:Total}}', { Total: '$&.00' });
  assert.strictEqual(result, 'Prix: $&.00');
});

test('resolve — aucune substitution si valeurs vides objet', () => {
  const text = 'Bonjour {{champ:Nom}}';
  assert.strictEqual(resolve(text, {}), text);
});

test('fuzzy — correspondance partielle vraie', () => {
  assert.strictEqual(fuzzy('slt', 'Salutation'), true);
});

test('fuzzy — correspondance partielle fausse', () => {
  assert.strictEqual(fuzzy('xyz', 'Salutation'), false);
});

test('fuzzy — chaîne vide correspond à tout', () => {
  assert.strictEqual(fuzzy('', 'quoi'), true);
  assert.strictEqual(fuzzy('', ''), true);
});

test('hasVars — vrai quand variables présentes', () => {
  assert.strictEqual(hasVars('{{champ:X}}'), true);
  assert.strictEqual(hasVars('{{choix:Ton=A|B}}'), true);
  assert.strictEqual(hasVars('debut {{champ:Nom}} fin'), true);
});

test('hasVars — faux sans variables', () => {
  assert.strictEqual(hasVars('texte simple'), false);
  assert.strictEqual(hasVars(''), false);
  assert.strictEqual(hasVars('{{date}}'), false);   // date n'est pas champ/choix
  assert.strictEqual(hasVars('{{alea:A|B}}'), false); // alea non plus
});

test('assemble — joint plusieurs snippets résolus avec double saut de ligne', () => {
  const snippets = [
    { texte: 'Bonjour {{champ:Prénom}}' },
    { texte: 'Cordialement' },
  ];
  const result = assemble(snippets, { Prénom: 'Bob' });
  assert.strictEqual(result, 'Bonjour Bob\n\nCordialement');
});
