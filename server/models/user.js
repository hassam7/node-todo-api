var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        index: {
            unique: true,
            dropDups: true
        },
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "{VALUE} is not valid Email"
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {

            type: String,
            required: true
        }
    }]
});
UserSchema.methods.toJSON = function(){
    var user =this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, "abc123").toString();

    user.tokens.push({
        access,
        token
    });
    return user.save().then(()=>{return token;});
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token,"abc123");
    } catch (err) {
        return new Promise((resolve,reject)=>{
            reject();
        });
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
}
var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};