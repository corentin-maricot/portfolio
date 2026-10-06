# Portfolio

Site vitrine statique (HTML / CSS / JS), prêt à héberger gratuitement sur
GitHub Pages.

## Structure

```
portfolio/
├── index.html          # page d'accueil — grille des projets
├── projet-1.html        # page projet (modèle, à dupliquer)
├── projet-2.html
├── projet-3.html
├── projet-4.html
├── a-propos.html        # page "à propos"
├── css/
│   └── style.css        # toute la mise en forme (variables en haut du fichier)
├── js/
│   └── script.js        # année automatique, apparition des vignettes, visionneuse
├── images/               # visuels des projets (SVG de remplacement à remplacer)
└── fonts/                # dossier prévu si vous choisissez d'héberger vos polices
```

Les polices utilisées par défaut (Fraunces + Work Sans) sont chargées via
Google Fonts dans `css/style.css` (ligne `@import`). Le dossier `fonts/` est
prêt si vous préférez héberger vos propres fichiers `.woff2` — voir plus bas.

## Personnaliser

**1. Remplacer les images.**
Dans `images/`, chaque projet a une image de couverture
(`projet-1-cover.svg`) et ses photos (`projet-1-01.svg`, `-02`, etc.).
Remplacez-les par vos propres fichiers `.jpg` ou `.webp` en gardant les mêmes
noms, ou changez les chemins `src=""` dans les fichiers `.html` si vous
changez les noms.

**2. Changer les textes.**
Nom, intitulés de projets, années, descriptions : tout est écrit en clair
dans les fichiers `.html`, à modifier directement.

**3. Ajouter un projet.**
Dupliquez `projet-1.html`, renommez-le (`projet-5.html`), changez son
contenu, puis ajoutez une nouvelle vignette dans la grille de `index.html`
(copiez un bloc `<li class="work-card">…</li>`).

**4. Couleurs et typographie.**
Tout se règle en haut de `css/style.css`, dans le bloc `:root { … }`
(couleurs, polices, espacement de la grille).

**5. Espacement de la grille.**
La variable `--gap` dans `css/style.css` contrôle l'espace blanc entre les
vignettes (accueil) et entre les photos (page projet), pour éviter l'effet
« grille collée » façon Instagram.

## Héberger sur GitHub Pages (gratuit)

1. Créez un dépôt sur GitHub (par exemple `portfolio`).
2. Mettez-y tout le contenu de ce dossier à sa racine (`index.html` doit
   être directement à la racine du dépôt, pas dans un sous-dossier).
3. Dans le dépôt : **Settings → Pages**.
4. Sous « Build and deployment », choisissez **Deploy from a branch**,
   branche `main`, dossier `/ (root)`, puis **Save**.
5. Le site sera publié après une minute ou deux, à une adresse du type :
   `https://votre-pseudo.github.io/portfolio/`

### Utiliser vos propres polices (optionnel)

Si vous préférez ne pas dépendre de Google Fonts :
1. Placez vos fichiers `.woff2` dans `fonts/`.
2. Dans `css/style.css`, remplacez la ligne `@import url('https://fonts.googleapis.com/...')`
   par des règles `@font-face` pointant vers `fonts/votre-police.woff2`.

## Accessibilité et compatibilité

- Navigation adaptée au clavier (focus visible).
- Respecte la préférence système « réduire les animations ».
- Images en `loading="lazy"` pour des pages plus légères.
- Mise en page responsive : 2 colonnes sur ordinateur et tablette,
  1 colonne sur téléphone (point de rupture à 720px, réglable dans
  `css/style.css`).
