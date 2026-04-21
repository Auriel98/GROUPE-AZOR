# Groupe Gabon — Site Vitrine

Site vitrine React présentant les 3 entreprises du groupe :
- **EGENEM** — Nettoyage & Entretien industriel
- **SMIT Engineering** — Ingénierie & Structures métalliques
- **Azor Engineering** — Génie Civil & BTP

---

## Structure du projet

```
groupe-gabon/
├── index.html                     ← Point d'entrée HTML
├── package.json                   ← Dépendances npm
├── vite.config.js                 ← Configuration Vite
└── src/
    ├── main.jsx                   ← Point d'entrée React
    ├── App.jsx                    ← Composant racine (assemble tout)
    ├── data/
    │   └── companies.js           ← Données des 3 entreprises (URLs, couleurs, services...)
    ├── hooks/
    │   └── useInView.js           ← Hook d'animation au scroll (IntersectionObserver)
    ├── styles/
    │   └── global.css             ← Styles globaux (reset, typographie)
    └── components/
        ├── Navbar.jsx             ← Navigation sticky
        ├── Hero.jsx               ← Section d'en-tête avec titre et statistiques
        ├── CompaniesSection.jsx   ← Grille des 3 cartes entreprises
        ├── CompanyCard.jsx        ← Carte individuelle d'une entreprise
        ├── ContactSection.jsx     ← Section CTA avec boutons vers chaque site
        └── Footer.jsx             ← Pied de page
```

---

## Commandes

### 1. Créer le projet depuis zéro

```bash
# Créer un nouveau projet React avec Vite
npm create vite@latest groupe-gabon -- --template react

# Aller dans le dossier
cd groupe-gabon

# Installer les dépendances
npm install
```

> Ensuite, **remplacez** les fichiers générés par les fichiers de ce projet.

---

### 2. Démarrer en mode développement

```bash
cd groupe-gabon
npm run dev
```

Le site sera accessible sur : **http://localhost:5173**

---

### 3. Construire pour la production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

---

### 4. Prévisualiser la version de production

```bash
npm run preview
```

---

### 5. Déployer sur un hébergeur

**Netlify (recommandé, gratuit) :**
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

**Vercel (recommandé, gratuit) :**
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer (suivre les instructions)
vercel --prod
```

---

## Personnalisation

### Changer les URLs des sites

Dans `src/data/companies.js`, remplacez les valeurs `url` :

```js
{
  id: "egenem",
  url: "https://www.egenem.ga",  // ← Votre vraie URL ici
  ...
}
```

### Changer le nom du groupe

Dans `src/components/Navbar.jsx` et `src/components/Footer.jsx`,
modifiez le texte **"Groupe Gabon"**.

### Ajouter/modifier les services

Dans `src/data/companies.js`, chaque entreprise a un tableau `services` :

```js
services: [
  "Nettoyage & Désinfection",
  "Nettoyage Industriel",
  // Ajouter ici...
],
```

---

## Technologies utilisées

| Outil | Rôle |
|-------|------|
| React 18 | Interface utilisateur |
| Vite 5 | Build tool & dev server |
| CSS-in-JS (inline styles) | Styles des composants |
| IntersectionObserver API | Animations au scroll |
"# GROUPE-AZOR" 
