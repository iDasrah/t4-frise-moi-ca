# T4

- Nom du groupe : Bate Munster
- Membres du groupe : Picouleau Mathéo, Schwob Lucien, Kieffer Baptiste, Lamorlette Maxime
- Liens vers les évaluations T4 :
  - [Évaluation de Léo Lienhard](Evaluation-Leo_Lienhard.md)
  - [Évaluation de Mehdi Bentaibi](Evaluation-Mehdi_Bentaibi.md)
  - [Évaluation de Noah Dumangin](Evaluation-Noah_Dumangin.md)
  - [Évaluation de Nolan Denis](Evaluation-Nolan_Denis.md)
  - [Évaluation de Thomas Barseghian](Evaluation-Thomas_Barseghian.md)
  - [Évaluation de Emina Halimovic](Evaluation-Emina_Halimovic.md)
  - [Évaluation de Fabio Giorgi Panazzolo](Evaluation-Fabio_Giorgi_Panazzolo.md)

## Instructions de fork :

- forker ce dépôt avec le bouton en haut à droite
- le nommer du code complet du groupe T4
- ajouter le lien dans le doc des groupes
- supprimer les instructions de fork du README.md

## Présentation du projet

"Frise-Moi-ça !" est un jeu web pédagogique où l'objectif du jeu est de construire une frise historique des services publics en plaçant correctement des cartes dans l'ordre chronologique.

Le premier joueur à atteindre le nombre de points requis gagne la partie.

### Captures d'écran :

![Écran de jeu](/image/image_ecran_home.png)
![Écran d'accueil](/image/image_ecran_create.png)
![Écran de fin](/image/image_waiting_room.png)
![Écran de fin](/image/image_ecran_de_fin.png)


### Procédures d'installation et d'exécution

Il suffit simplement de se rendre sur ce lien : https://t4-frise-moi-ca.vercel.app/

## Cahier des charges

Pour un exemple de ce qui est attendu, voir https://gitlab.unistra.fr/T234/t4-exemple

### Objectifs pédagogiques

##### Comprendre l’évolution des services publics
- En découvrant les dates et les contextes, les joueurs saisissent comment les services publics ont émergé et évolué en France.

##### Maîtriser la chronologie historique
- Le joueur s'exerce à organiser logiquement des événements historiques selon leur ordre temporel.

#### Objectifs pédagogiques avancés

##### Identifier les enjeux politiques et sociaux liés aux services publics
- Certains services publics apparaissent dans des contextes de crise ou de réforme : le joueur en découvre les causes et les conséquences.

##### Replacer l’histoire dans le débat public contemporain
- À travers le jeu, on peut questionner les débats actuels autour du rôle de l’État en se fondant sur l’histoire de la construction des services publics.

#### Références

### Description des fonctionnalités

#### Simulation

Une carte est tirée au sort et posée dans la frise centrale.
Une carte est tirée au sort et posée dans la frise centrale. Elle sert de point de départ.
Chaque joueur à tour de rôle :
* pioche une carte décrivant une étape historique, mais sans voir sa date
* dispose cette carte dans la frise centrale (à gauche, à droite, ou entre deux cartes déjà posées)
* si la carte est à la bonne place (la chronologie est respectée), le joueur marque un point
* sinon, la carte est déplacée à la bonne place et le joueur ne marque aucun point
* Le premier joueur à atteindre le nombre de points de victoire gagne

Chaque carte a deux faces :
* une face avec le titre de l'événement et la thématique
* une face avec toutes les informations :
  * thématique
  * date de l'événement
  * titre
  * type
  * description

#### Gestion des parties en ligne

- Les joueurs doivent pouvoir jouer à partir de n'importe quel ordinateur disposant d'une connexion internet
- Plusieurs parties peuvent se jouer en même temps
- Jusqu'à 10 joueurs peuvent jouer dans la même partie

#### Interface
Éléments qui composent l'interface :
- Écran d'accueil avec choix entre créer et rejoindre une partie
- Formulaire pour créer une partie
- Formulaire pour rejoindre une partie
- Écran principal de jeu avec :
  - Une pioche
  - La frise chronologique du joueur actuel
  - La carte du joueur actuel, avec son nom et ses points
  - Les noms et les points des autres joueurs
  - Un bouton Quitter
- Écran de fin

#### Actions du joueur

Écran d'accueil :
- Créer une partie
- Rejoindre une partie

Écran de jeu :
- Piocher une carte
- Prendre et faire glisser la carte dans la frise chronologique
- Quitter la partie

Écran de fin :
- Revenir à l'écran d'accueil
- Créer une nouvelle partie

### Scénarios

- Parties à nombre de joueurs variable (jusqu'à 10)
- Victoires à différents nombres de points

### Contraintes de développement

- Code modularisé

### Fonctionnalités et scénarios avancés

- Modes de jeu différents