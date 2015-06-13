var mongoose = require('mongoose');

// define the schema for our user model
var addressSchema = mongoose.Schema({
    addressline1  : String,
    addressline2  : String,
    state         : String,
    postcode      : String,
    country       : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Address', addressSchema);