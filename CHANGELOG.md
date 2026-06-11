# Changelog

Auteur : MEMORA solutions — https://memora.solutions — info@memora.ca

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), versionnage [SemVer](https://semver.org/lang/fr/).

## [2.0.0] - 2026-06-11

### Ajouté
- **Variables dynamiques** dans les snippets : `{{champ:Étiquette}}` (texte libre), `{{choix:Étiquette=A|B|C}}` (menu déroulant), `{{date}}` (mois + année fr-CA), `{{alea:A|B|C}}` (valeur au hasard). Panneau **« Compléter les variables »** avec **aperçu** avant insertion.
- **Recherche instantanée** (insensible casse/accents). Badge `{ }` sur les snippets contenant des variables.
- **Look « tendances 2026 »** : minimalisme macOS, **dark mode automatique** (`prefers-color-scheme`), profondeur douce, en-tête + recherche **translucides**, micro-transitions, accessibilité WCAG 2.2.
- **Bouton « Insérer »** + compteur de sélection ; **Entrée = Insérer**.
- **Snippets d'exemple au 1er lancement** illustrant les 4 types de variables.

### Modifié
- Fenêtre agrandie (720×640) ; édition et complétion via panneaux modaux.

## [1.0.0] - 2026-06-11

### Ajouté
- **MEMORA — Snippets** : fenêtre unique pour insérer des textes réutilisables dans macOS via Keyboard Maestro (déclencheur `;mem`).
- Liste **cochable** + **Insérer** (ou **Entrée**), grille responsive **2 colonnes**, navigation clavier.
- **Gestion dans la fenêtre** : ajouter / modifier / supprimer / réordonner (glisser-déposer + ▲▼) ; « Tout sélectionner / désélectionner ».
- Jeton **`{{date}}`** → mois + année courants (fr-CA) à l'insertion.
- Installation **en un double-clic** via le fichier `.kmmacros` (GitHub Releases).
- Code source de la fenêtre fourni (`templates/memora-snippets.template.html`).

### Prévu (prochaines versions)
- Console d'admin unifiée multi-bibliothèques (dossiers).
- Lanceur « command palette » de tous les snippets (recherche floue).
- Couche **IA** optionnelle (générer / reformuler un snippet, clé utilisateur + aperçu avant insertion).
