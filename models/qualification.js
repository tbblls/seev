var mongoose = require('mongoose');

// define the schema for our user model
var qualificationSchema = mongoose.Schema({
    seevId        : String,
    category      : String,
    name          : String,
    datereceived  : Date
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Qualification', qualificationSchema);