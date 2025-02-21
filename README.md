# Mk last

Plateforme de discussion en groupe avec gestion des membres, messages et réactions, cours en ligne.

## 🌟 Fonctionnalités Principales

- Création/Suppression de groupes
- Envoi de messages avec réponses hiérarchiques
- Réactions aux messages (❤️, 👍, etc.)
- Gestion des rôles (Membre/Modérateur/Admin)
- Suppression de messages (admin ou auteur)
- Système de conversations privées
- Gestion cours

## Technologies Utilisées

- **Backend:** PHP ^8.2 avec Laravel ^11.31
- **Base de données:** Postgresql
- **Architecture:** Modèle-Vue-Contrôleur (MVC)
- **Frontend:** (si applicable) Typescript avec React
- **Tests:** Pest pour les tests backend
- **Broadcasting:** Websockets (via l'événement `GroupMessageSent`)

## Prérequis

Assurez-vous d'avoir installé les logiciels suivants :
- PHP (>=8.2)
- Composer pour la gestion des dépendances PHP
- Node.js et npm
- Un serveur de base de données Postgresql
- appwrite pour stocker les images

## Installation

Suivez ces étapes pour installer le projet :

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/Aissam-salman/mklara.git
   cd mklara
   ```

2. **Installer les dépendances PHP**

   ```bash
   make install
   ```

3. **Configurer l'environnement**

   `.env` ajustez les configurations nécessaires, notamment les accès à la base de données.

   ```

## 🔒 Compte Admin Par Défaut

Un administrateur est créé automatiquement :
- Email: aissam.lamjadab@gmail.com
- Mot de passe: Gisti250146

4. **Lancer le projet**

   ```bash
   make up
   ```

