var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Career = mongoose.model('Career');

exports.add = function(req,res){
    var careerHistory = new Career();
    
    careerHistory.seevId = req.user.seevId;;
  
  console.log(req.body.career);
  
    careerHistory.role           = req.body.career.role;
    careerHistory.company        = req.body.career.company;
    careerHistory.start          = req.body.career.start;
    careerHistory.end            = req.body.career.end;
    careerHistory.description    = req.body.career.description;
  
    
    careerHistory.save(function(err,data){
        if(err){
            throw err;
        }
        var savedCareer = data;
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
                    return res.send(savedCareer);
                 });
            });

    });
    
};

exports.get = function(req,res){

    Career.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         return res.send(result);
    });

};

exports.remove = function(req,res){

    Career.remove({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
        
         return res.send("Career removed successfully");
    });

};

exports.update = function(req,res){

     Career.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         var career = result;
        console.log(req.body.career);
    
        career.seevId            = req.user.seevId;
        career.role              = req.body.career.role;
        career.company           = req.body.career.company;
        career.start             = req.body.career.start;
        career.end               = req.body.career.end;
        career.description       = req.body.career.description;
        

         
         career.save(function(err, data) {
            if (err){
                throw err;
            }
            return res.send(career);
        });
         
    });
    
};