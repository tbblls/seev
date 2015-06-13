var mongoose = require('mongoose');
var CV       = require('../models/cv');
var Address       = require('../models/address');
var Schema = mongoose.Schema;

// define the schema for our user model
var profileSchema = Schema({

    seevId        : String,
    email         : String,
    firstname     : String,
    familyname    : String,
    preferredname : String,
    phone         : String,
    mobile        : String,
    address       : { type: Schema.Types.ObjectId, ref: 'Address' },
    cv            : { type: Schema.Types.ObjectId, ref: 'CV' }
 
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Profile', profileSchema);