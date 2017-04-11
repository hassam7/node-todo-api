var mongoose = require('mongoose');
var validator = require('validator');
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: `{VALUE} is not valid Email`
        }
    },
    password: {
        type: String,
        required: true,
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

module.exports = {
    User
};