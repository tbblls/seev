var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Skill = mongoose.model('Skill');

exports.add = function(req,res){
    var skill = new Skill();
    
    skill.seevId     = req.user.seevId;
    skill.category   = req.body.skill.category;
    skill.name       = req.body.skill.name;
  
    
    skill.save(function(err,data){
        if(err){
            throw err;
        }
        
        var savedSkill = data;
        
        Profile.findOne({'seevId':req.user.seevId}, function(err, result){
                 if (err){
                    throw err;
                 }
                 //add skill to profile
                result.skills.push(data._id);
                result.save(function(err, data) {
                    if (err){
                        throw err;
                    }
                    return res.send(savedSkill);
                 });
            });

    });
    
};


exports.update = function(req,res){

     Skill.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         var skill = result;
        
    
        skill.seevId      = req.user.seevId;
        skill.name        = req.body.skill.name;
        skill.category    = req.body.skill.category;
      
         
         skill.save(function(err, data) {
            if (err){
                throw err;
            }
            return res.send(skill);
        });
         
    });
    
};

exports.get = function(req,res){

    Skill.findOne({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
         return res.send(result);
    });

};

exports.remove = function(req,res){

    Skill.remove({'_id':req.params.id}, function(err, result){
         if (err){
            throw err;
         }
        
         return res.send("Skill removed successfully");
    });

};