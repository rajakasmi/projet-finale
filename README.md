# projet-finale
1. Technologies utilisées (Stack MERN)

Le projet utilise le MERN stack, qui est composé de :

MongoDB (Base de données NoSQL)

Stocke les tâches, utilisateurs, deadlines, état d’avancement.

Format BSON/JSON, donc facile à manipuler avec JavaScript.

Express.js (Backend Framework pour Node.js)

Gère les routes et API (CRUD : Create, Read, Update, Delete).

Exemple : /api/tasks, /api/users/register, /api/users/login.

React.js (Frontend)

Crée une interface utilisateur moderne, dynamique et réactive.

Permet aux utilisateurs d’interagir avec leurs tâches facilement.

Node.js (Runtime JavaScript côté serveur)

Exécute le backend.

Communique avec MongoDB via Mongoose.

🔹 2. Fonctionnalités principales

Authentification des utilisateurs (Sign up / Login)
Chaque utilisateur a son propre compte → JWT (JSON Web Token) pour sécuriser les sessions.

Gestion des tâches :

Créer une tâche avec : titre, description, deadline, statut.

Modifier une tâche.

Supprimer une tâche.

Marquer comme en cours, terminée, etc.

Suivi de progression

Filtrer par tâches terminées ou en retard.

Voir le pourcentage d’avancement.

🔹 3. Interfaces principales (UI/UX)

Voici les pages que tu pourrais développer avec React :

Page d’accueil (Landing Page)

Présentation simple de l’application.

Boutons "S’inscrire" et "Se connecter".

Page d’inscription (Sign Up)

Formulaire : nom, email, mot de passe.

Envoie les infos vers l’API (/api/users/register).

Page de connexion (Login)

Formulaire email + mot de passe.

JWT généré après succès → stocké dans localStorage.

Dashboard (Tableau de bord de l’utilisateur)

Liste des tâches personnelles.

Bouton + Ajouter une tâche.

Boutons "Modifier" et "Supprimer".

Affichage du statut (à faire ✅, en cours 🔄, terminé 🎉).

Page de gestion d’une tâche

Formulaire pour créer/éditer une tâche avec :

Titre

Description

Deadline

Statut

Profil utilisateur (optionnel)

Modifier ses infos personnelles.