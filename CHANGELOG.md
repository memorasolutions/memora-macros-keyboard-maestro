# Changelog

Auteur : MEMORA solutions — https://memora.solutions — info@memora.ca

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), versionnage [SemVer](https://semver.org/lang/fr/).

## [8.8.0] - 2026-06-12

### Ajouté
- **Glisser-déposer dans le panneau de variables** : en plus du clic, **glissez** un champ (Champ, Choix, Date, Profil, Presse-papier…) et **déposez-le** à l'endroit voulu dans le texte (Snippets et Atelier).

## [8.7.0] - 2026-06-12

### Ajouté
- **Variable presse-papier `{{presse-papier}}`** : insère le contenu actuel du presse-papier (dans les Snippets et l'Atelier).

### Modifié
- **Fenêtre de l'Atelier plus compacte** (~40 % de l'écran au lieu de 62 %), mieux adaptée à un formulaire. *(Astuce : pour la rendre librement redimensionnable, cochez « Resizable » dans le menu engrenage ⚙ de l'action Custom HTML Prompt dans Keyboard Maestro.)*

## [8.6.0] - 2026-06-12

### Ajouté (Atelier)
- **Déclencheur par raccourci clavier** : en plus (ou à la place) de la chaîne tapée, assignez un **raccourci** (ex. ⇧⌘E) à votre macro — capturé directement dans la fenêtre, comme dans Keyboard Maestro. Au moins un déclencheur (chaîne ou raccourci) est requis.

## [8.5.0] - 2026-06-12

### Ajouté (Atelier)
- **Gestion des macros créées** : la fenêtre **`;atelier`** liste désormais vos macros (groupe « Mes textes MEMORA ») avec **✎ Ouvrir dans Keyboard Maestro** (pour les éditer avec toute la puissance de KM) et **🗑 Supprimer** (confirmation intégrée, sans popup).

## [8.4.0] - 2026-06-12

### Ajouté
- **Variables de profil `{{moi:champ}}`** (prénom, nom, courriel, téléphone, entreprise, rôle, site) — remplies **automatiquement** depuis votre profil, dans les Snippets **et** dans les macros de l'Atelier.
- **Éditeur de profil** (bouton **👤**) : saisissez vos infos une seule fois, réutilisez-les partout. Boutons dédiés dans le panneau de variables.

## [8.3.0] - 2026-06-12

### Ajouté
- **Champ « Date » avec format au choix** : `{{date}}` (mois année), **`{{date:complet}}`** (« vendredi 12 juin 2026 »), **`{{date:court}}`** (« 12/06/2026 »), `{{date:jour}}`, `{{date:iso}}`.
- **Sélecteur de date** **`{{datechoix:Étiquette}}`** : un vrai calendrier (date picker) demandé au moment de l'insertion, puis formaté en français.
- Boutons dédiés dans le panneau de variables (outil Snippets **et** Atelier).

## [8.2.0] - 2026-06-12

### Ajouté (Atelier)
- **Panneau de champs façon TypeDesk** : dans l'Atelier, **cliquez pour insérer une variable** dans le texte de la macro — `+ Champ`, `+ Choix`, `+ Civilité`, `+ Date`, `+ Moment`, `+ Aléatoire` (insérée au curseur).
- Les **macros créées avec des variables** ouvrent automatiquement une **petite fenêtre de remplissage** (demande les valeurs, aperçu live, puis insère le texte complété) — moteur réutilisé de l'outil Snippets. Les macros sans variable insèrent directement le texte.

## [8.1.0] - 2026-06-12

### Ajouté
- **Atelier MEMORA** *(nouveau)* : une fenêtre **`;atelier`** pour créer de **vraies macros Keyboard Maestro indépendantes** — saisissez un **nom**, un **déclencheur** (chaîne tapée, ex. `;courriel`) et un **texte** ; la macro autonome est créée dans le groupe « Mes textes MEMORA ». La facilité de TypeDesk, la puissance de Keyboard Maestro. Fichiers : `macros/MEMORA-Atelier.kmmacros` + `templates/memora-atelier.template.html`. *(Phase 1 : texte simple + déclencheur ; champs/variables à venir.)*

## [8.0.0] - 2026-06-12

### Modifié
- **Fenêtre adaptable à chaque écran** : s'ouvre à ~84 % de l'écran, quelle que soit la résolution (au lieu d'une taille fixe).
- **Nouvelle palette indigo**, sobre et professionnelle (contrastes WCAG AA conservés).
- Libellé clarifié : « Coché par défaut » → **« Pré-coché à l'ouverture »** (avec correctif d'affichage de l'apostrophe).

## [7.0.0] - 2026-06-12

### Modifié
- **Nouvelle interface** : fenêtre **beaucoup plus grande** (positionnée depuis l'écran), **barre latérale de catégories** (Tous · ⭐ Favoris · 🕘 Fréquents · dossiers) et **grille de cartes adaptative** — le **nombre de colonnes s'ajuste à la largeur**. Design rafraîchi 2026 (profondeur douce, translucence subtile, typographie soignée), **responsive** (la barre latérale passe en haut sur fenêtre étroite).
- Toutes les fonctions conservées (favoris, aperçus, glisser-déposer, recherche floue, annulation, variables) ; **contrastes WCAG AA et modales accessibles maintenus**.

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
