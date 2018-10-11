const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Represent = require('../Represent-Modelent-Model');
const Parent = require('./register/Parent-Modell');

//var representSchema = new Represent; 

let validSexTypes = {

    values: ['Masculino', 'Femenino'],
    message: "{VALUE} is not a valid sex type"

}

let studentSchema = new Schema({

    name: {

        type: String,
        required: [true, 'The name field is needed']

    },

    identification: {

        type: Number,
        unique: true,
        required: [true, 'The identification field is needed']

    },

    sex: {

        type: String,
        enum: validSexTypes,
        required: [true, 'The sex field is needed']

    },

    birthday: {

        type: Date,
        required: [true, 'The bithday field is needed']

    },

    birthdayPlace: {

        type: String,
        required: [true, 'The birthday place field is needed']

    },

    municipality: {

        type: String,
        required: [true, 'The municipality field is needed']

    },

    country: {

        type: String,
        required: [true, 'The country is needed']

    },

    age: {

        type: Number,
        required: [true, 'The age field is needed']

    },

    weight: {

        type: Number,
        required: [true, 'The weight field is needed']

    },

    height: {

        type: Number,
        required: [true, 'The height field is needed']

    },

    shirtSize: {

        type: Number,
        required: [true, 'The size of the shit field is needed']

    },

    pantSize: {

        type: Number,
        required: [true, 'The size of the pants field is needed']

    },

    shoeSize: {

        type: Number,
        required: [true, 'The size of the shoes field is needed']

    },

    liveWithParents: {

        type: Boolean,
        required: [true, 'The live with parents field is needed']

    },

    direction: {

        type: String,
        required: [true, 'The direction field is needed']

    },
    
    phoneNumber: {

        type: Number,
        required: [true, 'The phone number field is needed']

    },

    impedimentToSports: {

        type: String,
        required: [true, 'The impediment to make sports field is needed']

    },

    alergicTo: {

        type: String,
        required: [true, 'The alergic to field is needed']

    },

    representAndParent: [Represent.schema, Parent.schema]

});

studentSchema.plugin(uniqueValidator, {

    message: '{PATH} must be unique'

});

module.exports = mongoose.model('Student', studentSchema);