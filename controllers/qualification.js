var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Qualification = mongoose.model('Qualification');

exports.add = function(req,res){
    var qualification = new Qualification();
    
    qualification.seevId       = req.user.seevId;;
    qualification.category     = req.body.qualificationCategory;
    qualification.name         = req.body.qualificationName;
    qualification.datereceived = req.body.qualificationDatereceived;
    
    qualification.save(function(err,data){
        if(err){
            throw err;
        }
        
        Profile.findOne({'seevId':req.user.seevId}, function(err, result){
                 if (err){
                    throw err;
                 }
                 //add skill to profile
                result.qualifications.push(data._id);
                result.save(function(err, data) {
                    if (err){
                        throw err;
                    }
                    return res.send('Success');
                 });
            });

    });
    
};


