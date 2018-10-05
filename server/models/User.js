//Exports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

//roles available
let validRoles = {

    values: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    message: "{VALUE} is not a valid role"

}

let userSchema = new Schema({

    name: {

        type: String,
        required: [true, "The name is obligatory"]

    },

    email: {

        type: String,
        required: [true, "The email is obligatory"],
        unique: true

    },

    password: {

        type: String,
        required: [true, "The password is obligatory"] 

    },

    identification: {

        type: String,
        required: [true, "The identification is obligatory"],
        unique: true

    },

    role: {

        type: String,
        enum: validRoles,
        required: false,
        default: "USER"

    },

    online: {

        type: Boolean,
        default: false

    },

    birthday: {

        type: Date,
        required: false,

    }

});

userSchema.methods.toJSON = function() {

    let user = this;

    userObject = user.toObject();

    delete userObject.password;

    return userObject;

}

userSchema.plugin(uniqueValidator, {message: "{PATH} must be unique"});

module.exports = mongoose.model("User", userSchema);