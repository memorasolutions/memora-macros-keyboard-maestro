# Changelog

Auteur : MEMORA solutions — https://memora.solutions — info@memora.ca

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), versionnage [SemVer](https://semver.org/lang/fr/).

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
