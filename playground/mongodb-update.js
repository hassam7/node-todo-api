const {
    MongoClient,
    ObjectID
} = require("mongodb"); //Object destructuring
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect.")

    }

    db.collection("Todos").findOneAndUpdate({
        text: "Eat Lunch"
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOrignal: false
    }).then((result) => console.log("Result: ", result));

});