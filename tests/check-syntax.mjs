#!/usr/bin/env node
// Auteur: MEMORA solutions, https://memora.solutions ; info@memora.ca.
// Licence: Apache-2.0 (SPDX-License-Identifier: Apache-2.0). Copyright 2026 MEMORA solutions.
// Vérifie la syntaxe JS du bloc <script> du template via node --check (zéro dépendance npm).

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const root       = join(__dirname, '..');

const html = readFileSync(join(root, 'templates', 'memora-snippets.template.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);

if (!match) {
  console.error('✗  Aucun bloc <script> trouvé dans le template.');
  process.exit(1);
}

const tmpFile = join(tmpdir(), `memora-template-syntax-${Date.now()}.js`);
writeFileSync(tmpFile, match[1], 'utf8');

const result = spawnSync(process.execPath, ['--check', tmpFile], { encoding: 'utf8' });

try { unlinkSync(tmpFile); } catch (_) { /* nettoyage best-effort */ }

if (result.status !== 0) {
  console.error('✗  Erreur de syntaxe dans le script du template :');
  if (result.stderr) console.error(result.stderr);
  process.exit(1);
}

console.log('✓  Syntaxe JS du template valide (node --check).');
