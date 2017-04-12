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
var {
    authenticate
} = require('./middlewares/authenticate');
var app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    debugger;
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id

    }).save().then((success) => {
        res.send({
            success
        });
    }, (error) => {
        res.status(400).send(error);

    });
});
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({
            todos
        });
    }, (error) => {
        res.status(400).send(error);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    if (!req.params.id) {
        return res.status(400).send("No Id Specified");
    }
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("No Id Specified");
    }
    Todo.findOne({
        _id: req.params.id,
        _creator: req.user._id
    }).then((success) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
    if (!req.params.id) {
        return res.status(400).send("No Id Specified");
    }
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("No Id Specified");
    }
    Todo.findOneAndRemove({
        _id: req.params.id,
        _creator: req.user._id
    }).then((success) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
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
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {
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
app.post("/users", (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error => {
        res.status(400).send(error);
    }))
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header("x-auth", token).send(user);
            });
        }).catch((e) => {
            res.status(400).send();
        });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});
app.listen(3000, () => {
    console.log("Server started at port 3000");
});