var mongoose = require('mongoose');

// define the schema for our user model
var skillSchema = mongoose.Schema({
    seevId        : String,
    category      : String,
    name          : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Skill', skillSchema);