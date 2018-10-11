const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let validCivilState = {

    values: ['Casado', 'Soltero', 'Viudo'],
    message: "{VALUE} is not a valid civil state"

}

let validSexType = {

    values: ['Masculino', 'Femenino'],
    message: "{VALUE} is not a valid sex type"

}

let parentSchema = new Schema({
        
    name: {

        type: String,
        required: [true, 'The name field is needed']

    },

    sex: {

        type: String,
        required: [true, 'The sex field is needed'],
        enum: validSexType

    },

    identification: {

        type: Number,
        unique: true,
        required: [true, 'The identification field is needed']

    },

    birthday: {

        type: Date,
        required: [true, 'The bithday field is needed']

    },

    company: {

        type: String,
        required: [true, 'The company field is needed']

    },

    civilState: {

        type: String,
        enum: validCivilState,
        required: [true, 'The civil state field is needed']

    },

    ocupation: {

        type: String,
        required: [true, 'The ocupation field is needed']

    },

    direction: {

        type: String,
        required: [true, 'The direction field is needed']

    },

    phoneNumber1: {

        type: Number,
        required: [true, 'The phone number 1 is needed']

    },
    
    phoneNumber2: {

        type: Number,
        required: false

    },

    liveWithKid: {

        type: Boolean,
        required: [true, 'The live with kid field is needed']

    }

});

parentSchema.plugin(uniqueValidator, {

    message: "{PATH} must be unique"

})

module.exports = mongoose.model('Parent', parentSchema);