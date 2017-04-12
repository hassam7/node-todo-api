const jwt = require('jsonwebtoken');
var data = {
    id:10,
    iat:123123
}
var token = jwt.sign(data,"secret");
console.log(token)

var decoded = jwt.verify(token,"secret");
console.log("Decoded: " , decoded);