const MongoClient = require("mongodb").MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect.")

    }
    console.log("Connected to MongoDB Server");

    db.collection("Todos").insertOne({
        text: 'Somehting todo',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log("Unable to insert todo.", err)

        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })
    db.close();
});