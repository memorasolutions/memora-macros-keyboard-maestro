# Changelog

Auteur : MEMORA solutions — https://memora.solutions — info@memora.ca

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), versionnage [SemVer](https://semver.org/lang/fr/).

## [6.1.0] - 2026-06-12

### Modifié
- **Modales accessibles (WCAG 2.2)** : `role="dialog"` + `aria-modal` + titre lié (`aria-labelledby`), **piège de focus** clavier (Tab / Maj+Tab) et **retour du focus** au bouton d'origine à la fermeture.

### Interne
- **Intégration continue (GitHub Actions)** : tests des fonctions (variables, recherche floue…) et garde-fous (aucune référence externe, en-tête MEMORA, CSP présente) exécutés à chaque modification.

## [6.0.0] - 2026-06-12

### Ajouté
- **Aperçu du contenu sur chaque carte** (2 lignes) : reconnaître un snippet sans l'ouvrir.
- **Favoris ⭐** + filtres **« ⭐ Favoris »** et **« 🕘 Fréquents »** (les plus utilisés) — sans déstabiliser l'ordre manuel de la liste.
- **Glisser-déposer d'une carte sur un dossier** pour la reclasser (drag-and-drop entre dossiers).
- **Recherche floue** (tolérante : « slt » trouve « Salutation »).
- **Annulation de suppression** : barre **« Annuler »** non bloquante (suppression réversible, plus de perte accidentelle).

## [5.1.0] - 2026-06-11

### Ajouté
- **Glisser-déposer amélioré** : **indicateur de dépôt** visuel (on voit où la carte va tomber) et **glisser par la poignée ⠿ uniquement** (fini les glissers accidentels en cliquant une case ou un bouton).

### Modifié
- **Accessibilité (WCAG 2.2 AA)** : contrastes ajustés (texte secondaire, badges `{ }`, bouton/chip primaire en **mode sombre**) pour atteindre le ratio AA.
- **Sécurité** : ajout d'une **Content-Security-Policy** (blocage des connexions réseau sortantes) en défense en profondeur.
- **Robustesse** : recherche **débouncée** (plus fluide), sauvegarde protégée (try/catch), message clair si les données sont illisibles, et insertion fidèle même si une valeur contient « $ ».

## [5.0.0] - 2026-06-11

### Ajouté
- **Insertion visuelle des variables** : lors de l'édition d'un snippet, une **barre de boutons** sous le champ Texte insère le bon jeton au curseur, sans rien mémoriser — **+ Champ**, **+ Choix**, **+ Civilité** (Madame / Monsieur), **+ Date**, **+ Moment**, **+ Aléatoire**. Plus besoin de connaître la syntaxe par cœur.
- **Jeton `{{moment}}`** → insère automatiquement **Matin / Après-midi / Soir** selon l'heure courante.

## [4.0.0] - 2026-06-11

### Ajouté
- **Bibliothèque (Import / Export)** : bouton 📚 → exporter vos snippets en **JSON** (copier pour sauvegarder/partager) et importer un JSON (**Fusionner** ou **Remplacer tout**), avec validation et messages en ligne. Permet sauvegarde, migration entre Macs et partage manuel d'une bibliothèque.

## [3.0.0] - 2026-06-11

### Ajouté
- **Dossiers / catégories** : un champ « Dossier » par snippet + une **barre de chips** (Tous + chaque dossier) pour **filtrer** la liste, combinable avec la recherche. Le champ Dossier propose les dossiers existants (autocomplétion).

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
