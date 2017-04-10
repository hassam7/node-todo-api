const {
    MongoClient,
    ObjectID
} = require("mongodb"); //Object destructuring
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect.")

    }
    // db.collection("Todos")
    //     .find({
    //         _id: new ObjectID("58eb804b25dde916ccf69851")
    //     })
    //     .toArray().
    // then((result) => console.log(result))
    //     .then(() => db.close()).
    // catch((error) => console.log(error))
    // console.log("Connected to MongoDB Server");
    db.collection("Todos")
        .find()
        .count().
    then((count) => console.log("Todos Count: ",count))
        .then(() => db.close()).
    catch((error) => console.log(error))
    console.log("Connected to MongoDB Server");
});