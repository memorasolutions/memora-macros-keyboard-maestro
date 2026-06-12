# Tests MEMORA Snippets

Auteur: MEMORA solutions, https://memora.solutions ; info@memora.ca.
Licence: Apache-2.0. Copyright 2026 MEMORA solutions.

Suite de tests légère — zéro dépendance npm, modules intégrés Node.js uniquement (`node:test`, `node:assert`, `node:vm`).

## Lancer les tests

### Tests unitaires des fonctions pures

```bash
node --test tests/logic.test.mjs
```

Couvre `normalize`, `extractVars`, `resolve`, `fuzzy`, `assemble`, `hasVars` extraites via `node:vm` directement depuis le template HTML. Aucune modification du template n'est requise.

### Garde-fous d'intégrité

```bash
node tests/guard.mjs
```

Vérifie :
- Absence de mentions « anthropic » ou « claude » (insensible à la casse) dans le template, les macros et les fichiers `.md`
- Présence de l'en-tête MEMORA en ligne 1 du template
- Absence de ressources externes (src/href/fetch/import url)
- Présence de la balise Content-Security-Policy
- Intégrité du fichier `.kmmacros` (XML valide, `<array>`, UID de groupe)

### Vérification de syntaxe JS

```bash
node tests/check-syntax.mjs
```

Extrait le bloc `<script>` du template et le soumet à `node --check`.

## CI

Le workflow `.github/workflows/ci.yml` enchaîne automatiquement ces trois étapes sur chaque `push` et `pull_request` vers `main`.
