//Exports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let validRoles = {

    values: ['SUPER_ADMIN', 'ADMIN'],
    message: "{VALUE} is not a valid role"

}

let userSchema = new Schema({

    name: {

        type: String,
        required: [true, "The name is obligatory"]

    },

    email: {

        type: String,
        required: [true, "The email is obligatory"]

    }

});