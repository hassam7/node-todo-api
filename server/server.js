const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
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
                success
            })
        }
    }, (error) => {
        return res.status(400).send("Unknown error occured");
    });
});

app.delete('/todos/:id', (req, res) => {
    if (!req.params.id) {
        return res.status(400).send("No Id Specified");
    }
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("No Id Specified");
    }
    Todo.findByIdAndRemove(req.params.id).then((success) => {
        if (!success) {
            return res.status(400).send("No record found with specified ID");
        } else {
            res.send({
                todo: success
            })
        }
    }, (error) => {
        return res.status(400).send({
            error
        });

    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    console.log(body)
    if (!id) {
        return res.status(400).send("No Id Specified");
    }
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("No Id Specified");
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = Date.now();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    console.log(body);
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((success) => {        
        if (!success) {
            return res.status(400).send("No record found with specified ID");
        } else {
            res.send({
                 success
            })
        }
    }, (error) => {
        return res.status(400).send({
            error
        });

    });
});
app.post("/users",(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((error=>{
        res.status(400).send(error);
    }))
});
app.listen(3000, () => {
    console.log("Server started at port 3000");
});