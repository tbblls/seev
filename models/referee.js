var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// define the schema for our user model
var refereeSchema = Schema({
    seevId        : String,
    name          : String,
    position      : String,
    company       : String,
    phone         : String,
    mobile        : String,
    email         : String

});

module.exports = mongoose.model('Referee', refereeSchema);

