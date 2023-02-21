# Gebhaly NestJS App
A simple application  implemented using NestJS and MongoDB.

## The app Contains
- Authentication module
- Users module with address book

## Project set up
- ``` git clone  https://github.com/MNaguib2611/gebhaly.git```
- ``` cd gebhaly```
- ``` cp .env .env.example```
- ``` docker-compose build ```
- ``` docker-compose up ```
- the application will be running on ```http://localhost:3000/```







 ## Libraries used
 * NodeJS using NestJS framework
 * MongoDB (mongoose library)
 * Docker 
 * bcrypt & passport (authentication)


## Endpoints
* Post `/auth/register`  new user registration
* Post `/auth/login`  new user registration
* Put `/users/update-password`  change logged in user
* Get `/users/:id`  get user using id
* Get `/users/`  list all users


 ### Note
 the postman collection for dev environment and endpoints are in the `postman_collections` directory  
 










