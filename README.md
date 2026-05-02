# ⭐ JoJo Portfolio

Un portfolio web complet avec thème **JoJo's Bizarre Adventure**, système de connexion, gestion de contenu dynamique et déploiement automatique sur **GitHub Pages**.

🔗 **Live** : [https://Pucci-07.github.io/portfolio](https://Pucci-07.github.io/portfolio)

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🔐 **Connexion / Inscription** | Email + mot de passe, sauvegardé en `localStorage` |
| 🎲 **Timeline JoJo aléatoire** | Un arc JoJo différent à chaque visite |
| 💎 **Projets dynamiques** | Ajouter / supprimer des projets |
| ⭐ **Compétences** | Ajouter compétences avec niveau (Expert / Intermédiaire / Débutant) |
| 👤 **Profil** | Bio + liens sociaux (GitHub, LinkedIn, Twitter, Discord) |
| 📨 **Contact** | Formulaire de contact simulé |
| 🎨 **Design JoJo** | 8 arcs, animations, particules, effets dorés |
| 📱 **Responsive** | Mobile, tablette, desktop |
| 🚀 **GitHub Pages** | Déploiement automatique via GitHub Actions |

---

## 🚀 Utilisation locale

```bash
git clone https://github.com/Pucci-07/portfolio.git
cd portfolio
# Ouvrez index.html dans votre navigateur
```

> Aucun serveur backend requis – 100% statique.

---

## 🎪 Premier lancement

1. La **page de connexion** s'affiche automatiquement
2. Cliquez sur **"Créer un compte"**
3. Remplissez nom, email, mot de passe (6+ caractères)
4. Vous êtes connecté et votre portfolio est prêt !
5. Ajoutez votre **bio**, vos **projets** et **compétences**

> ℹ️ Les données persistent en `localStorage` – elles sont conservées entre les sessions sur le même navigateur.

---

## 🌟 À chaque visite

- La **timeline JoJo change aléatoirement** (1 des 8 arcs)
- **30% de chance** de créer des particules au clic
- Phrases JoJo aléatoires (ORA!, MUDA!, ZA WARUDO!, …)

---

## 📁 Structure

```
portfolio/
├── index.html          ← Application principale
├── style.css           ← Design responsive
├── jojo-theme.css      ← Animations & effets JoJo
├── auth.js             ← Connexion / inscription
├── storage.js          ← Gestion localStorage
├── components.js       ← Composants UI réutilisables
├── timeline.js         ← Timeline JoJo aléatoire
├── effects.js          ← Particules & effets visuels
├── main.js             ← Orchestration de l'app
├── data/
│   └── jojo-arcs.json  ← Données des 8 arcs JoJo
└── .github/
    └── workflows/
        └── deploy.yml  ← Déploiement GitHub Pages auto
```

---

## 🔧 Déploiement GitHub Pages

Le déploiement est **automatique** : chaque push sur `main` déclenche le workflow.

Pour activer GitHub Pages manuellement :

1. **Settings** → **Pages**
2. Source : **GitHub Actions**
3. Le site sera disponible à : `https://Pucci-07.github.io/portfolio`

---

## 🎨 Arcs JoJo intégrés

| Arc | Protagoniste | Pouvoir |
|---|---|---|
| 🌹 Phantom Blood | Jonathan Joestar | Hamon |
| 🌀 Battle Tendency | Joseph Joestar | Hamon |
| ⭐ Stardust Crusaders | Jotaro Kujo | Star Platinum |
| 💎 Diamond is Unbreakable | Josuke Higashikata | Crazy Diamond |
| 🌟 Golden Wind | Giorno Giovanna | Gold Experience Requiem |
| 🌊 Stone Ocean | Jolyne Cujoh | Stone Free |
| 🐎 Steel Ball Run | Johnny Joestar | Tusk ACT 4 |
| 🫧 JoJolion | Josuke (Gappy) | Soft & Wet |

---

## 🛠️ Technologies

- **HTML5** – Structure sémantique
- **CSS3** – Flexbox, Grid, animations, CSS custom properties
- **JavaScript ES6+** – Modules, `localStorage`, `IntersectionObserver`
- **GitHub Pages** + **GitHub Actions** – CI/CD gratuit

---

*"I, Giorno Giovanna, have a dream!"* 🌟
