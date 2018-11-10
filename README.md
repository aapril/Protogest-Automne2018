# Protogest Front-End (Angular)
## Prerequisites
* NodeJS https://nodejs.org/

## Packages
* Angular 6
* Bootstrap
* ng-Bootstrap

## Quick start
* Clone repo
* Access the project folder through the terminal
* Run npm install -g @angular/cli
* Run npm install to install the packages locally
* Run ng serve --open to run the app
* The app will run locally through localhost:4200

# Architecture du système
## Event-Service: 
* Ce service gère la création des évènements, l’affichage, la modification ainsi que la gestion
                  de conflit des évènements avec le calendrier de l’utilisateur.
              
              
## Member-Service (User-service) : 
* Ce service gère l’authentification, la création, ainsi qu’au niveau sécurité la gestion de token pour l’utilisateur. Finalement, nous utilisons ce service pour récupérer les informations de la personnes authentifiés et toutes autres tâches reliés au profil de l’utilisateur.

## Task-Service : 
* Ce service gère l’affichage des sections du protocole de l’instance.

## Email-Service :
* Comme son nom l’indique, ce microservice s’occupe de la gestion de courriel, soit l’envoi des notifications aux utilisateurs.

## Calendar-Service: 
* Ce microservice utilise le token de l’utilisateur pour se connecter à son calendrier personnel et gérer les évènements de ce dernier.

## Zuul Service (Gateway) : 
* Le but de l’utilisation d’un gateway est pour avoir un point d’entrée unique dans le système, soit la seul entité exposé à l'extérieur pour le client est Zuul-Service. Son utilisation consiste à traiter les demandes du client et rediriger les requêtes vers le microservice approprié. L’utilisation du Gateway est non seulement pour la redirection mais peut aussi être utilisée pour la sécurité, la gestion du trafic, etc.

## Service Discovery (Eureka) :
* Eureka permet en général la découverte des autres microservices. En effet, il s’agit de la détection automatique des emplacements réseau des instances de chaque microservice, exemple : user-service, event-service, etc. Ces derniers doivent s’enregistrer au Service Registry et ce pour chaque microservice puisse communiquer avec un autre. Cet attribut est très commun dans les systèmes distribués où l’infrastructure est hétérogène et donc les communications se font par un middleware pour que tous les systèmes peuvent se comprendre.

## Databaser-Service :
* Pour le développement sous un profil local, nous utilisons H2 in memory database, plusieurs avantages sont associées à cette utilisation, portabilité et facilité, etc.

