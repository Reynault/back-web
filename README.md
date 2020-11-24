# Cookie Book : Back-End

## Cookie Book

Cookie Book est une application web permettant à l'utilisateur de gérer et partager ses
recettes de cuisine. Les fonctionnalités sont alors les suivantes:

- Créer un compte
- Se connecter
- Créer une recette
- Modifier une recette
- Supprimer une recette
- Modifier son compte
- Supprimer son compte
- Lister toutes les recettes
- Lister ses recettes

L'application utilise le concept des JWT pour permettre à l'API d'identifier les
utilisateurs.

## Description des dépôts

Ce dépôt git contient la partie Back du projet de l'unité d'enseignement 
"Nouvelles technologies du web".

Pour installer et lancer Cookie Book:
- Commencez par installer et lancer la partie [Back-End](https://github.com/Reynault/back-web).
- Installez et lancez le [Front-End](https://github.com/Reynault/front-web).

Chaque dépôt contient les informations permettant l'installation et le lancement de 
sa partie respective. Le back a été réalisé avec Nest JS et le front avec Angular.


## Dépendances requises

```bash
 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/


[System Information]
OS Version     : Windows 10
NodeJS Version : v14.15.1
NPM Version    : 6.14.8

[Nest CLI]
Nest CLI Version : 7.5.3

[Nest Platform Information]
platform-fastify version : 7.4.4
mongoose version         : 7.0.2
passport version         : 7.1.3
swagger version          : 4.6.1
common version           : 7.4.4
core version             : 7.4.4
jwt version              : 7.2.0
```

- Il vous faut également une installation Docker fonctionnelle avec docker-compose

## Installation du Back

Pour pouvoir installer la partie Back:

- Installation du git
```bash
$ git clone https://github.com/Reynault/back-web.git
```

- Installation des dépendances (npm ou yarn)
```bash
$ npm install
```
```
$ yarn install
```

- Il faut ensuite mettre en place la Base de données
    - On peut utiliser le [script](https://github.com/Reynault/back-web/blob/master/docker-compose.yml)
    qui permet de lancer une instance de mongoDB sur un container Docker
    - Il faut alors réaliser les commandes suivantes à la racine du projet:
```bash
$ docker-compose up
$ docker-compose start
```

- Créez la base de données cookie_book
- Ajoutez les données en utilisant le [script fourni](https://github.com/Reynault/back-web/blob/master/scripts/init.mongo.js)
- Un [autre script](https://github.com/Reynault/back-web/blob/master/scripts/drop.mongo.js) permet de les supprimer

## Lancement du Back

- Lancer le projet Nest JS
```bash
$ nest start
```

- Vous pouvez désormais accéder au Back sur http://localhost:3000/ 
- Une documentation Swagger a été créée et est accessible sur http://localhost:3000/documentation

## Équipe de développement

- Angela Ipseiz
- Reynault Sies
