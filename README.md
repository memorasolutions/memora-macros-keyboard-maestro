# MEMORA — Snippets pour Keyboard Maestro

> Auteur : **MEMORA solutions** — https://memora.solutions — info@memora.ca · Licence MIT

Une fenêtre simple et rapide pour **insérer vos textes réutilisables** (snippets) dans n'importe quelle application sur macOS, propulsée par **Keyboard Maestro**. Pensée pour être installée **en un double-clic**, même par un débutant.

![Aperçu](docs/apercu.png)

---

## ✨ Ce que ça fait

- Une seule fenêtre : **cochez** les textes à insérer, cliquez **Insérer** (ou appuyez sur **Entrée**).
- **Gérez vos snippets dans la fenêtre** : ➕ ajouter · ✎ modifier · 🗑 supprimer · glisser ou ▲▼ pour réordonner · « Tout sélectionner ».
- **Grille 2 colonnes** responsive, accents parfaits, navigation clavier.
- Jeton **`{{date}}`** dans un snippet → remplacé à l'insertion par le **mois + année** courants (ex. « juin 2026 »).
- Vos snippets sont mémorisés dans une variable Keyboard Maestro (`memora_snippets`).

---

## 🚀 Installation (3 étapes — débutant)

1. **[⬇️ Télécharger la dernière version](../../releases/latest)** → fichier `MEMORA-Snippets-vX.Y.kmmacros`.
2. **Double-cliquez** le fichier téléchargé → Keyboard Maestro l'importe automatiquement (groupe **« MEMORA Snippets »**).
3. Dans n'importe quelle app, tapez **`;mem`** → la fenêtre s'ouvre. 🎉

> Prérequis : macOS avec **Keyboard Maestro 11+** installé.

---

## ⌨️ Utilisation

- Tapez **`;mem`** pour ouvrir la fenêtre.
- **Cochez** un ou plusieurs snippets, puis **Insérer** (ou **Entrée**). Le texte est collé dans l'app active.
- Cliquez **⚙ / ✎** pour **modifier**, **➕** pour **ajouter**, **🗑** pour **supprimer** un snippet.
- Astuce : mettez `{{date}}` dans un snippet pour insérer automatiquement le mois courant.

---

## 🛠️ Pour utilisateurs avancés

- Le code source de la fenêtre est dans **`templates/memora-snippets.template.html`** (HTML/CSS/JS, sans dépendance).
- Vous pouvez l'adapter puis le coller dans une action **« Custom HTML Prompt »** de Keyboard Maestro.
- Structure de la macro : `Set Variable memora_texte = ""` → `Custom HTML Prompt` → `Insert Text by Pasting %Variable%memora_texte%`.
- Les snippets sont un JSON dans la variable `memora_snippets` : `[{ "terme": "...", "texte": "...", "coché": false }]`.

---

## 📦 Contenu du dépôt

```
macros/      MEMORA-Snippets-vX.Y.kmmacros   (installation 1 double-clic)
templates/   memora-snippets.template.html   (code source de la fenêtre)
docs/        captures d'écran
```

---

## 📝 Licence

MIT — voir [LICENSE](LICENSE). Utilisez, modifiez et partagez librement.

---

Fait avec soin par **MEMORA solutions** — https://memora.solutions — info@memora.ca
