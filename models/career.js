var mongoose = require('mongoose');

// define the schema for our user model
var careerSchema = mongoose.Schema({
    seevId        : String,
    role          : String,
    company       : String,
    start         : Date,
    end           : Date,
    description   : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Career', careerSchema);