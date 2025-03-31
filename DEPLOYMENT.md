## Guide de déploiement mis à jour pour BRILLA

Ce document fournit les instructions pour déployer l'application BRILLA sur Netlify ou d'autres services d'hébergement.

### Prérequis

- Node.js 18 ou supérieur
- npm ou pnpm (gestionnaire de paquets)
- Un compte Netlify (pour le déploiement sur Netlify)

### Installation locale

1. Décompressez le fichier ZIP dans un dossier de votre choix
2. Ouvrez un terminal et naviguez jusqu'au dossier de l'application
3. Installez les dépendances :
   ```
   npm install
   ```
   ou avec pnpm :
   ```
   pnpm install
   ```
4. Lancez l'application en mode développement :
   ```
   npm run dev
   ```
   ou avec pnpm :
   ```
   pnpm dev
   ```
5. Accédez à l'application dans votre navigateur à l'adresse : http://localhost:3000

### Déploiement sur Netlify

#### Modifications apportées pour résoudre les problèmes de redirection

Cette version mise à jour du code inclut les modifications suivantes pour résoudre les problèmes de redirection sur Netlify :

1. Ajout d'un fichier `public/_redirects` pour gérer les redirections
2. Mise à jour du fichier `netlify.toml` pour utiliser le dossier "out" et le plugin Next.js
3. Modification du script de build dans `package.json` pour générer une version statique avec `next export`

#### Méthode 1 : Déploiement via l'interface Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/) si vous n'en avez pas déjà un
2. Depuis le tableau de bord Netlify, cliquez sur "New site from Git"
3. Connectez votre compte GitHub, GitLab ou Bitbucket (vous devrez d'abord pousser le code sur un de ces services)
4. Sélectionnez le dépôt contenant l'application BRILLA
5. Les paramètres de build sont déjà configurés dans le fichier `netlify.toml`
6. Cliquez sur "Deploy site"

#### Méthode 2 : Déploiement manuel sur Netlify

Si vous préférez ne pas utiliser Git :

1. Construisez l'application localement :
   ```
   npm run build
   ```
   ou avec pnpm :
   ```
   pnpm build
   ```
2. Depuis le tableau de bord Netlify, cliquez sur "Sites" puis "Drag and drop your site folder here"
3. Faites glisser le dossier `out` généré lors de la construction

### Informations de connexion pour tester l'application

Pour tester l'application après le déploiement, vous pouvez utiliser les identifiants suivants :

- Email : demo@brilla.com
- Mot de passe : password

### Personnalisation

Vous pouvez personnaliser l'application en modifiant les fichiers suivants :

- `src/lib/mockData.ts` : Données de démonstration pour les différentes fonctionnalités
- `src/app/globals.css` : Styles globaux et variables CSS
- `tailwind.config.ts` : Configuration de Tailwind CSS, y compris les couleurs et polices

### Support

Si vous rencontrez des problèmes lors du déploiement, n'hésitez pas à me contacter pour obtenir de l'aide.
