var mongoose = require('mongoose');

// define the schema for our user model
var cvSchema = mongoose.Schema({
    seevId        : String,
    filename      : String,
    fileType      : String,
    file          : Buffer

});

// create the model for users and expose it to our app
module.exports = mongoose.model('CV', cvSchema);