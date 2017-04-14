# Todo List API in Node.js,MongoDB and JWT
As headings say it is a Todo List RESTFUL api which used Node.js as backend, MongoDB as persistence store and JWT as authentication
mechanism. This project was built while following online course.

While creating this application following features were use:

## Node.js
* Express.js  as web server
* Express.js  middlewares for protecting routes
* Body-parser for converting incoming requests into json object
* lodash      for extracting only relevant fields from request object

## Mongoose
Mongoose is a object modeling tool i.e it used to create relationship between objects and and database documents.
Following features of mongoose were used:
* Schema      require,unique,validate,trim,minlength,maxlength,midllewares(pre),static methods and instance methods are the features used while building schemas

* Collections were used to retrieve and save data. MongoDB operators ($set,$inc) were also used.

#MongoDB Native Driver
The only feature of Native mongodb driver which was used is "ObjectID".

## Authentication
bcryptjs, crypto-js and jsonwebtoken were used for authentication via JWT tokens.


## Postman
Postman (Chrome Plugin) was used to test api end points



