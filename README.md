# T4

- **Nom du groupe** : Bate Munster
- **Membres du groupe** : Picouleau Mathéo, Schwob Lucien, Kieffer Baptiste, Lamorlette Maxime
- **Liens vers les évaluations T4** :
  - [Évaluation de Léo Lienhard](Evaluation-Leo_Lienhard.md)
  - [Évaluation de Mehdi Bentaibi](Evaluation-Mehdi_Bentaibi.md)
  - [Évaluation de Noah Dumangin](Evaluation-Noah_Dumangin.md)
  - [Évaluation de Nolan Denis](Evaluation-Nolan_Denis.md)
  - [Évaluation de Thomas Barseghian](Evaluation-Thomas_Barseghian.md)
  - [Évaluation de Emina Halimovic](Evaluation-Emina_Halimovic.md)
  - [Évaluation de Fabio Giorgi Panazzolo](Evaluation-Fabio_Giorgi_Panazzolo.md)

## Instructions de fork :

- Forker ce dépôt avec le bouton en haut à droite.
- Le nommer du code complet du groupe T4.
- Ajouter le lien dans le document des groupes.
- Supprimer les instructions de fork du `README.md`.

## Présentation du projet

**"Frise-Moi-ça !"** est un jeu web pédagogique où l'objectif du jeu est de construire une frise historique des services publics en plaçant correctement des cartes dans l'ordre chronologique.

Le premier joueur à atteindre le nombre de points requis gagne la partie.

### Captures d'écran :

![Écran de jeu](/image/image_ecran_home.png)
![Écran d'accueil](/image/image_ecran_create.png)
![Écran d'attente](/image/image_waiting_room.png)
![Écran de fin](/image/image_ecran_de_fin.png)

### Procédures d'installation et d'exécution

Il suffit simplement de se rendre sur ce lien : [https://t4-frise-moi-ca.vercel.app/](https://t4-frise-moi-ca.vercel.app/)

## Cahier des charges

### Objectifs pédagogiques

#### Comprendre l’évolution des services publics
- En découvrant les dates et les contextes, les joueurs saisissent comment les services publics ont émergé et évolué en France.

#### Maîtriser la chronologie historique
- Le joueur s'exerce à organiser logiquement des événements historiques selon leur ordre temporel.

### Objectifs pédagogiques avancés

#### Identifier les enjeux politiques et sociaux liés aux services publics
- Certains services publics apparaissent dans des contextes de crise ou de réforme : le joueur en découvre les causes et les conséquences.

#### Replacer l’histoire dans le débat public contemporain
- À travers le jeu, on peut questionner les débats actuels autour du rôle de l’État en se fondant sur l’histoire de la construction des services publics.

### Références

### Description des fonctionnalités

#### Simulation

Une carte est tirée au sort et posée dans la frise centrale. Elle sert de point de départ.
Chaque joueur, à tour de rôle :
- Pioche une carte décrivant une étape historique, mais sans voir sa date.
- Dispose cette carte dans la frise centrale (à gauche, à droite ou entre deux cartes déjà posées).
- Si la carte est à la bonne place (la chronologie est respectée), le joueur marque un point.
- Sinon, la carte est déplacée à la bonne place et le joueur ne marque aucun point.
- Le premier joueur à atteindre le nombre de points de victoire gagne.

Chaque carte a deux faces :
- Une face avec le titre de l'événement et la thématique.
- Une face avec toutes les informations :
  - Thématique
  - Date de l'événement
  - Titre
  - Type
  - Description

#### Interface

Éléments qui composent l'interface :
- Écran d'accueil avec choix entre créer et rejoindre une partie.
- Formulaire pour créer une partie.
- Formulaire pour rejoindre une partie.
- Écran d'attente des joueurs.
- Écran principal de jeu avec :
  - Une pioche.
  - La frise chronologique du joueur actuel.
  - La carte du joueur actuel, avec son nom et ses points.
  - Les noms et les points des autres joueurs.
  - Un bouton "Quitter".
- Écran de fin avec :
  - Boutons pour revenir au menu ou relancer une partie.
  - Podium affichant les statistiques des trois premiers joueurs.

#### Actions du joueur

**Écran d'accueil** :
- Créer une partie privée ou publique.
- Rejoindre une partie privée ou publique.

**Salle d'attente** :
- Quitter la salle d'attente.
- Lancer la partie.

**Écran de jeu** :
- Piocher une carte.
- Prendre et faire glisser la carte dans la frise chronologique.
- Quitter la partie.

**Écran de fin** :
- Revenir à l'écran d'accueil.
- Créer une nouvelle partie.

#### Gestion des parties en ligne

- Les joueurs doivent pouvoir jouer à partir de n'importe quel ordinateur disposant d'une connexion internet.
- Plusieurs parties peuvent se jouer en même temps.
- Jusqu'à 10 joueurs peuvent jouer dans la même partie.
- Possibilité de créer des parties publiques ou privées.
- Les parties privées doivent être protégées par un mot de passe ou un code unique.
- Ajout d'un mode spectateur pour permettre à des utilisateurs de suivre une partie en cours.
- Intégration d'un chat en ligne pour permettre aux joueurs de communiquer pendant la partie.

#### Accessibilité

- Le jeu doit être compatible avec les navigateurs modernes (Chrome, Firefox, Edge, Safari).
- Le jeu doit être responsive et fonctionner sur mobile, tablette et ordinateur.

### Scénarios

- Parties à nombre de joueurs variable (jusqu'à 10).
- Victoires à différents nombres de points (le joueur peut choisir).

### Contraintes de développement

- Code modularisé, qui sépare vue et modèle.
- Le code doit être documenté pour faciliter la maintenance.
- Le code doit inclure une gestion des erreurs pour éviter les plantages en cas de problème.
- Le jeu doit être optimisé pour fonctionner sans ralentissements, même avec 10 joueurs connectés simultanément.
- Le serveur doit pouvoir gérer un grand nombre de connexions simultanées sans dégradation des performances.

### Fonctionnalités et scénarios avancés

- **Modes de jeu différents** :
  - Mode solo : un joueur peut s'entraîner tout seul.
  - Mode collaboratif : les joueurs peuvent coopérer pour construire une frise commune et atteindre un objectif collectif.
  - Mode contre-la-montre : les joueurs doivent placer correctement le plus de cartes possibles dans un temps imparti.
  - Mode élimination : les joueurs qui font trop d'erreurs sont éliminés, et le dernier joueur restant gagne.

- **Personnalisation** :
  - Les joueurs peuvent créer et ajouter leurs propres cartes historiques.

- **Statistiques** :
  - Un tableau des scores en ligne pour comparer les performances des joueurs.
  - Débloquer des badges ou des succès en fonction des performances ou des actions spécifiques.