const {ObjectID} = require('mongodb');
const {
    mongoose
} = require('../server/db/mongoose');
const {
    Todo
} = require('../server/models/todo');

var id = "58ebe2baaf40f1271091cfca";
if(!ObjectID.isValid(id)){
    return console.log("Invalid Id");
}
// Todo.find({
//     _id: id
// }).then((success) => console.log("todos: ", success));

// Todo.findOne({
//     _id: id
// }).then((success) => console.log("Todo : ", success));

Todo.findById(id).then((success) => {
    if(!success){
        return console.log("No Entry");
    }
    console.log("FindById : ", success)
}).catch((ex)=>console.log(ex));