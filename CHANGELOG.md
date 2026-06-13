# Changelog

Auteur : MEMORA solutions — https://memora.solutions — info@memora.ca

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), versionnage [SemVer](https://semver.org/lang/fr/).

## [8.21.0] - 2026-06-13

### Ajouté
- **Abréviation directe depuis un snippet** *(bouton ⚡)* : sur chaque snippet, le bouton **⚡** ouvre l'**Atelier pré-rempli** (nom + texte du snippet) — il ne reste qu'à saisir un **déclencheur « chaîne tapée »** (ex. `;sig`) et cliquer **Créer**. Taper l'abréviation insère alors le texte **directement**, sans ouvrir `;mem` (expansion de texte façon TypeDesk). Réutilise le moteur de macros éprouvé de l'Atelier. *(Nécessite l'outil Atelier installé.)*

## [8.20.0] - 2026-06-13

### Modifié
- **Insertion en un seul geste** : **cliquer un snippet l'insère immédiatement** (plus de cases à cocher ni de bouton « Insérer »). Au **clavier** : **↑ / ↓** pour surligner, **Entrée** pour insérer. Les snippets à variables ouvrent la fenêtre de remplissage avant insertion, comme avant.

### Retiré
- Cases à cocher des cartes + bouton « Insérer » + compteur de sélection (l'assemblage de plusieurs snippets d'un coup, seul intérêt des cases, était rarement utilisé).

## [8.19.0] - 2026-06-13

### Modifié
- **Redimensionnement par curseur (slider), en direct** : le bouton **⤢** (à gauche de la barre du haut de `;mem`) ouvre un **curseur**. En le glissant, la **fenêtre se redimensionne en temps réel** (largeur de ~900 px à ~95 % de l'écran, largeur affichée en px). Astuce anti-décrochage : le **coin haut-gauche reste ancré** pendant le glissement → le curseur reste sous la souris (pas de perte de contrôle, contrairement à un redimensionnement qui recentrerait la fenêtre). Remplace l'ancien bouton bascule à 2 tailles.

## [8.18.0] - 2026-06-13

### Modifié
- **Bouton ⤢ Agrandir / Réduire** dans `;mem` : un bouton dans la barre du haut **bascule la fenêtre** entre ~1500 px et **~95 % de l'écran** (via l'API `ResizeWindow` de Keyboard Maestro) — pratique pour ajuster la taille une fois la fenêtre ouverte, les « Custom HTML Prompt » de KM n'ayant pas de poignées de redimensionnement natives.

### Retiré
- **Option « Pré-coché à l'ouverture »** dans l'éditeur de snippet (peu utile, source de confusion) : la sélection se fait simplement en **cliquant un snippet** (clic = cocher / décocher).

## [8.17.0] - 2026-06-13

### Ajouté
- **Assistant ✨ IA dans l'Atelier** *(parité avec Snippets)* : l'éditeur de texte de **`;atelier`** dispose maintenant du même assistant IA — **Reformuler · Traduire · Corriger · Raccourcir · Allonger** ou instruction libre — avec aperçu et bouton **« Utiliser ce texte »**. Réglage **clé OpenRouter + modèle** (menu 3 catégories) intégré dans la fenêtre, et **helper IA dédié** (« MEMORA — IA Atelier ») pour rester **indépendant** de Snippets. Validé avec un vrai appel OpenRouter.

## [8.16.0] - 2026-06-13

### Modifié
- **Fenêtre plus grande et centrée** : `;mem` s'ouvre à une **largeur de base ~1500 px** (plafonnée à **92 % de l'écran** pour ne jamais déborder sur un portable), centrée, hauteur ~88 %. *(Pour un redimensionnement libre à la souris : activer l'option **Resizable** de l'action « Custom HTML Prompt » dans Keyboard Maestro — réglage manuel, non activable par script.)*

## [8.15.0] - 2026-06-13

### Modifié
- **Menu « Modèle IA » enrichi, organisé en 3 catégories** : **⭐ Populaires** (GPT-5, GPT-4o, Gemini 2.5 Pro, DeepSeek R1, Mistral Large), **💲 Économiques (low-cost)** (GPT-4o mini, GPT-5 mini, Gemini 2.5 Flash / Flash-Lite, DeepSeek Chat, Llama 3.3 70B, Qwen 2.5 72B) et **🆓 Gratuits (limités)** (GPT-OSS 120B/20B, Llama 3.3 70B, Gemma 4 31B, Qwen3 Coder, Qwen3 Next 80B). 18 modèles vérifiés valides + option **« Autre… »** pour saisir n'importe quel identifiant OpenRouter.

## [8.14.0] - 2026-06-13

### Modifié
- **Choix du modèle IA en liste déroulante** : dans **👤 Profil**, le modèle se choisit désormais dans un **menu déroulant** (modèles **payants** recommandés + modèles **gratuits** `:free`) — fini les fautes de frappe. Une option **« Autre… »** permet toujours de saisir librement n'importe quel identifiant OpenRouter.

## [8.13.0] - 2026-06-13

### Modifié
- **Fenêtres redimensionnables par défaut** : les fenêtres **`;mem`** (Snippets) et **`;atelier`** (Atelier) s'ouvrent désormais **redimensionnables à la souris** (drapeau `AllowResize` de Keyboard Maestro activé dans l'action « Custom HTML Prompt »). On peut donc agrandir/réduire la fenêtre librement, en plus de sa taille initiale adaptée à l'écran. *(Installations existantes : re-téléchargez et ré-importez la macro, ou cochez « Resizable » dans le menu engrenage ⚙ de l'action.)*

## [8.12.0] - 2026-06-13

### Modifié
- **Assistant IA — messages d'erreur clairs** : vous pouvez choisir **n'importe quel modèle** OpenRouter, y compris les **modèles gratuits** (suffixe `:free`). Si la **limite d'un modèle gratuit est atteinte**, l'assistant l'indique explicitement (« Limite du modèle GRATUIT atteinte — réessayez plus tard, ou choisissez un autre modèle »). Messages dédiés également pour : **crédits insuffisants** (402), **clé invalide** (401/403), **modèle introuvable** (404) et **limite de débit** (429). Validé avec de **vrais appels OpenRouter** (modèle payant `openai/gpt-4o-mini` et modèle gratuit `google/gemma-4-31b-it:free`).

## [8.11.0] - 2026-06-13

### Ajouté
- **Assistant IA (OpenRouter)** : dans l'éditeur de snippet, transformez votre texte avec l'IA — **Reformuler · Traduire · Corriger · Raccourcir · Allonger** ou une instruction libre, avec **aperçu avant insertion**. Chaque utilisateur saisit **sa propre clé OpenRouter** (via le bouton **👤 Profil**) ; la clé reste **locale à votre Mac** (jamais partagée, jamais incluse dans le dépôt). L'appel réseau passe par une action « Execute Shell Script » — la clé n'est **jamais exposée** dans la fenêtre.

## [8.10.0] - 2026-06-13

### Ajouté
- **Barre de mise en forme Markdown** dans l'éditeur de texte (Snippets **et** Atelier) : **gras**, *italique*, `code`, listes à puces / numérotées, liens — appliqués à la sélection. Le texte reste 100 % portable et s'affiche mis en forme dans les apps compatibles Markdown (le collage stylé natif n'étant pas fiable dans la fenêtre Keyboard Maestro).

## [8.9.0] - 2026-06-13

### Ajouté
- **Champ calculé `{{calc:expression}}`** : effectue un calcul (`+ - * / ( )`, décimaux) qui peut **référencer d'autres champs** par leur nom — ex. `{{calc:Prix * Quantité}}` ou `{{calc:100 * 1.15}}`. Arithmétique **sûre** (évaluation maison, sans `eval`).

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
