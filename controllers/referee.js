var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Referee = mongoose.model('Referee');

exports.add = function(req,res){
    var referee = new Referee();
    
    console.log(req.body.referee);
    
    referee.seevId      = req.user.seevId;
    referee.name        = req.body.referee.name;
    referee.position    = req.body.referee.position;
    referee.company     = req.body.referee.company;
    referee.mobile      = req.body.referee.mobile;
    referee.phone       = req.body.referee.phone;
    referee.email       = req.body.referee.email;
    
    referee.save(function(err,data){
        if(err){
            throw err;
        }
        var savedReferee = data;
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
                    return res.send(savedReferee);
                 });
            });

    });
    
};

exports.update = function(req,res){

     Referee.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         var referee = result;
        console.log(req.body.referee);
    
        referee.seevId      = req.user.seevId;
        referee.name        = req.body.referee.name;
        referee.position    = req.body.referee.position;
        referee.company     = req.body.referee.company;
        referee.mobile      = req.body.referee.mobile;
        referee.phone       = req.body.referee.phone;
        referee.email       = req.body.referee.email;
         
         referee.save(function(err, data) {
            if (err){
                throw err;
            }
            return res.send(referee);
        });
         
    });
    
};

exports.get = function(req,res){

    Referee.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         return res.send(result);
    });

};

exports.remove = function(req,res){

    Referee.remove({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
        
         return res.send("Referee removed successfully");
    });

};