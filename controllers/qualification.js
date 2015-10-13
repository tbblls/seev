var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Qualification = mongoose.model('Qualification');

exports.add = function(req,res){
    var qualification = new Qualification();
    
    qualification.seevId       = req.user.seevId;;
    qualification.category     = req.body.qualification.category;
    qualification.name         = req.body.qualification.name;
    qualification.received     = req.body.qualification.received;
    
    qualification.save(function(err,data){
        if(err){
            throw err;
        }
        
        var savedQualification = data;
        
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
                    return res.send(savedQualification);
                 });
            });

    });
    
};


exports.update = function(req,res){

     Qualification.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         var qualification = result;
        
    
        qualification.seevId      = req.user.seevId;
        qualification.name        = req.body.qualification.name;
        qualification.category    = req.body.qualification.category;
        qualification.received     = req.body.qualification.received;
         
         qualification.save(function(err, data) {
            if (err){
                throw err;
            }
            return res.send(qualification);
        });
         
    });
    
};

exports.get = function(req,res){

    Qualification.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         return res.send(result);
    });

};

exports.remove = function(req,res){

    Qualification.remove({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
        
         return res.send("Qualification removed successfully");
    });

};