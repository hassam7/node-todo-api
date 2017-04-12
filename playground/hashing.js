const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
    id:10,
    iat:123123
}
// var token = jwt.sign(data,"secret");
// console.log(token)

// var decoded = jwt.verify(token,"secret");
// console.log("Decoded: " , decoded);

var password = "testpass";
bcrypt.genSalt(10,(error,salt)=>{
    bcrypt.hash(password,salt,(error,hash)=>{
        console.log(hash)
    })
})

var hashedpwd = "$2a$10$HZw9PK.9QggROvhcERr3YuSlOx98Y/0FkRK5XzNnJKRv3xDp2rXua";
bcrypt.compare(password,hashedpwd,(error,result)=>{
    console.log(result);
})
