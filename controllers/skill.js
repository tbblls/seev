var mongoose = require('mongoose');

var Profile = mongoose.model('Profile');
var Skill = mongoose.model('Skill');

exports.add = function(req,res){
    var skill = new Skill();
    
    skill.seevId = req.user.seevId;;
    skill.category   = req.body.skillCategory;
    skill.name = req.body.skillName;
  
    
    skill.save(function(err,data){
        if(err){
            throw err;
        }
        
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
                    return res.send('Success');
                 });
            });

    });
    
};


