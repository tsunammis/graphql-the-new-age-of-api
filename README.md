## GraphQL - The new age of API ?

Projet utilisé comme support de présentation pour des [BBL _(Brown Bag Lunch)_](https://stan.life),
Conférences & Meetups.

La présentation a été réalisée avec [Reveal.js](https://github.com/hakimel/reveal.js). Pour qu'elle soit pleinement fonctionnelle, un backend (GraphQL) et frontend (React) doivent être lancés en parallèle.

### Prérequis

Pour simplifier le lancement des 3 projets, [docker](https://www.docker.com/get-docker) _([mac](https://www.docker.com/docker-mac), [windows](https://www.docker.com/docker-windows))_ + [docker-compose](https://docs.docker.com/compose/) sont utilisés pour lancer les 3 projets.

### Installation

```bash
git clone git@github.com:tsunammis/graphql-the-new-age-of-api.git
cd graphql-the-new-age-of-api/
make run
open http://localhost:5000
```

### Under the hood

#### API

Une API GraphQL _(HTTP)_ est exposée _(http://localhost:5002)_, avec un micro-service appelé `μ-likes` utilisé pour expliquer la tolérance aux erreurs de l'engine GraphQL _(http://localhost:5003)_.

Une instance de GraphiQL est lancée en même temps que l'API GraphQL, utilisable à l'adresse suivante -> [http://localhost:5002/graphql](http://localhost:5002/graphql).

*Comment modifier sur l'API ?*

```bash
cd ./api
make local-run
```

#### Frontend

Petit projet réalisé avec React.JS qui affiche une simple liste d'éléments récupérés depuis l'API GraphQL _(http://localhost:5001/)_.

*Comment modifier le frontend ?*

```bash
cd ./front
make local-run
```

#### Slide

Fichiers static qui contiennent les slides de la présentation, réalisée avec Reveal.js

*Comment modifier les slides ?*

```bash
cd ./slide
make local-run
```
