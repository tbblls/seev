var mongoose = require('mongoose');


// define the schema for our user model
var profileSchema = mongoose.Schema({

    seevId        : String,
    email         : String,
    firstname     : String,
    familyname    : String,
    preferredname : String,
    phone         : String,
    mobile        : String
 
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Profile', profileSchema);