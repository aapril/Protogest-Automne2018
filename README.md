# Protogest Front-End (Angular)
This application is part of the application layer of the Protogest 2.0 project, an end-of-study project, built on Angular 6. This project gets its data by sending requests to the back-end's RESTful API.

## Prerequisites
* NodeJS https://nodejs.org/
* Back-end project https://github.com/aapril/protogest

## Packages
* Angular 6
* Bootstrap
* ng-Bootstrap

## Quick start
* Clone repo
* Access the project folder through the terminal
* Run npm install -g @angular/cli to install Angular Command Line
* Run npm install to install the packages locally
* Run ng serve --open to run the app
    * The app will run locally through localhost:4200
    * Note: it is possible that you will encounter CORS errors if you run the app in Chrome. To bypass this issue, the back-end services needs to allow CORS at the local address.
    
## Application Architecture
* App (root)
    * Layout
        * Dashboard
        * Create Event
        * Events
            * Tasks Groups
                * Task
        * Calendar
    * Top bar
    * Side bar
    * Login
    * Register
