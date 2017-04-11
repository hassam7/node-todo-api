var express = require('express');
var bodyParser = require('body-parser');
var {
    ObjectID
} = require('mongodb');
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
        res.send({
            success
        });
    }, (error) => {
        res.status(400).send(error);

    });
});
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (error) => {
        res.status(400).send(error);
    })
});

app.get('/todos/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send("No Id Specified");
    }
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("No Id Specified");
    }
    Todo.findById(req.params.id).then((success) => {
        if (!success) {
            return res.status(400).send("No record found with specified ID");
        } else {
            res.send({
                todo: success
            })
        }
    }, (error) => {
        return res.status(400).send("Unknown error occured");
    });
});


app.listen(3000, () => {
    console.log("Server started at port 3000");
});