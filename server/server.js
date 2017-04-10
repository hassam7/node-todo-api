var express = require('express');
var bodyParser = require('body-parser');

var {
    mongoose
} = require('./db/mongoose.js');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text

    }).save().then((success) => {
        res.send({success});
    }, (error) => {
        res.status(400).send(error);

    });
});
app.get('/todos', (req, res) => {
    Todo.find().then((todos)=>{
      res.send({todos});  
    },(error)=>{
        res.status(400).send(error);        
    }) 
});
app.listen(3000, () => {
    console.log("Server started at port 3000");
});