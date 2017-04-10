const {
    MongoClient,
    ObjectID
} = require("mongodb"); //Object destructuring
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect.")

    }
    //deleteMany

    db.collection("Todos").deleteMany({
        text: "Eat Lunch"
    }).then((result) => console.log("Result: ", result));
    //deleteOne
    db.collection("Todos").deleteOne({
        text: "Eat Lunch"
    }).then((result) => console.log("Result: ", result));


    //findOneAndDelete
    db.collection("Todos").findOneAndDelete({
        _id: new ObjectID("58eb895b41d619b781281805")
    }).then((result) => console.log("Result: ", result));
});