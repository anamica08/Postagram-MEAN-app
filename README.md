# PostApp (REST)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Connection to DB
mongodb atlas clusters.

## Description

This application enables user to signup and login to create a post of his choice. 
User will upload a image ,title and content to create a post, which clearly states that mongoose is used to create the schema of post.
User has to stay logged in to edit or delete, only the posts created by him.

## Deployed resources 
Following the rest architecture: 
Backend is deployed on https://postagram-app-mean.herokuapp.com/api/posts (No extra storage has been allocated for image files/static files. App may loose images after some time).
Frontend is deployed on aws http://postagram.s3-website-us-east-1.amazonaws.com



visit : http://postagram.s3-website-us-east-1.amazonaws.com



