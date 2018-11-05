//Exports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({

    userID: {

        type: String

    },

    userSession: {

        type: String

    }

});

module.exports = mongoose.model("Session", sessionSchema);