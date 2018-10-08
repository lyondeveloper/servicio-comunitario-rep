const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let taskSchema = new Schema({

    description: {

        type: String,
        required: [true, 'The description of the task is obligatory'],
        unique: true

    },

    completed: {

        type: Boolean,
        required: false,
        default: false

    },
    
    user: {

        type: Schema.Types.ObjectId, 
        ref: 'User'

    }

});

taskSchema.plugin(uniqueValidator, {

    message: "{PATH} must be unique"

});

module.exports = mongoose.model('Task', taskSchema);