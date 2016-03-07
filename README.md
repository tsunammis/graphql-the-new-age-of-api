## Introduction à GraphQL

Ce projet est utilisé comme démo pour les [BBL _(Brown Bag Lunch)_](http://brownbaglunch.fr) &
Meetups que j'effectue.

Les slides _(powerpoint)_ sont disponibles directement dans ce repository -> **[./introduction-graphql.pptx](https://github.com/tsunammis/intro-graphql/blob/master/introduction-graphql.pptx)** N'hésitez pas à vous les approprier ;-)

Pour installer et utiliser le projet, exécuter simplement ces 2 lignes

```bash
npm install
make
```

Une fois la commande executée, vous devrez voir ces 2 lignes.

```bash
graphql listen on localhost:3000
μ-likes listen on localhost:3001
```

* L'**API GraphQL** est accessible via HTTP à l'adresse [http:://localhost:3000/graphql](http:://localhost:3000/graphql)
* L'**API μ-likes** qui expose le nombre de likes pour une vidéo, est accessible à l'adresse [http://localhost:3001/{video_id}](http://localhost:3001/1)
* L'outil **GraphiQL** est accessible à l'adresse [http://localhost:3000/graphql](http://localhost:3000/graphql) depuis votre navigateur.

Voici ci-dessous quelques requêtes que vous pouvez executer depuis GraphiQL.

#### Afficher la liste des vidéos ainsi que le nom du propriétaire
```
{
  videos {
    id
    title
    owner {
      name
    }
    url
  }
}
```

#### Afficher la liste des vidéos ainsi que le nom du propriétaire (avec les likes)

Le nombre de likes est récupéré depuis le micro-service **μ-likes**

_**Attention**, la video avec l'ID 7 ne contient pas de data pour le nombre de likes
ce qui produira une erreur, ceci afin de présenter la gestion des erreurs sous
GraphQL_
```
{
  videos {
    id
    title
    owner {
      name
    }
    url
    likes
  }
}
```

#### Afficher la vidéo avec l'id "3"
```
{
  video(id: "3") {
    id
    title
    owner {
      name
    }
    url
    likes
  }
}
```

#### Afficher la liste des fields de l'object Video en utilisant l'introspection

```
{
  __type(name: "Video") {
    name
    fields {
      name
      type {
        name
      }
    }
  }
}
```

## Introduction to GraphQL

This project is used to make demonstration during [BBL _(Brown Bag Lunch)_](http://brownbaglunch.fr) & meetups I give.

slides _(powerpoint)_ are available in this repository -> **[./introduction-graphql.pptx](https://github.com/tsunammis/intro-graphql/blob/master/introduction-graphql.pptx)** Feel free to use it ;-)
