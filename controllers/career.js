var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Career = mongoose.model('Career');

exports.add = function(req,res){
    var careerHistory = new Career();
    
    careerHistory.seevId = req.user.seevId;;
  
    careerHistory.role           = req.body.careerRole;
    careerHistory.company        = req.body.careerCompany;
    careerHistory.start          = req.body.careerStartmonth;
    careerHistory.end            = req.body.careerEndmonth;
    careerHistory.description    = req.body.careerDescription;
  
    
    careerHistory.save(function(err,data){
        if(err){
            throw err;
        }
        
        Profile.findOne({'seevId':req.user.seevId}, function(err, result){
                 if (err){
                    throw err;
                 }
                 //add career to profile
                result.careers.push(data._id);
                result.save(function(err, data) {
                    if (err){
                        throw err;
                    }
                    return res.send('Success');
                 });
            });

    });
    
};


