var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Referee = mongoose.model('Referee');

exports.add = function(req,res){
    var referee = new Referee();
    
    referee.seevId = req.user.seevId;;
    referee.name   = req.body.refereeName;
    referee.position = req.body.refereePosition;
    referee.company = req.body.refereePhone;
    referee.mobile = req.body.refereeMobile;
    referee.email = req.body.refereeEmail;
    
    referee.save(function(err,data){
        if(err){
            throw err;
        }
        
        Profile.findOne({'seevId':req.user.seevId}, function(err, result){
                 if (err){
                    throw err;
                 }
                 //add reference to profile
                result.referees.push(data._id);
                result.save(function(err, data) {
                    if (err){
                        throw err;
                    }
                    return res.send('Success');
                 });
            });

    });
    
};


