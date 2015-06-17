var mongoose = require('mongoose');
var CV       = require('../models/cv');
var Address       = require('../models/address');
var Referee       = require('../models/referee');
var Skill         = require('../models/skill');
var Career        = require('../models/career');
var Qualification = require('../models/qualification');
var Schema = mongoose.Schema;

// define the schema for our user model
var profileSchema = Schema({

    seevId         : String,
    email          : String,
    firstname      : String,
    familyname     : String,
    preferredname  : String,
    phone          : String,
    mobile         : String,
    address        : { type: Schema.Types.ObjectId, ref: 'Address' },
    cv             : { type: Schema.Types.ObjectId, ref: 'CV' },
    referees       : [{ type: Schema.Types.ObjectId, ref: 'Referee'}],
    skills         : [{ type: Schema.Types.ObjectId, ref: 'Skill'}],
    careers        : [{ type: Schema.Types.ObjectId, ref: 'Career'}],
    qualifications : [{ type: Schema.Types.ObjectId, ref: 'Qualification'}]
 
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Profile', profileSchema);