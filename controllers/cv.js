var mongoose = require('mongoose');
var CV = mongoose.model('CV');
var Profile = mongoose.model('Profile');
var fs = require('fs');

exports.add = function(req,res){
     var cv = new CV();
         var binary = fs.readFileSync(req.files.fileCV.path);
         
         cv.seevId        = req.user.seevId;
         cv.filename      = req.files.fileCV.originalname;
         cv.filetype      = req.files.fileCV.extension;
         cv.file          = binary;
         
         cv.save(function(err, data) {
            if (err){
                throw err;
            }
            console.log(data._id);
           Profile.findOne({'seevId':req.user.seevId}, function(err, result){
                 if (err){
                    throw err;
                 }
                 //add reference to profile
                result.cv = data._id;
                result.save(function(err, data) {
                    if (err){
                        throw err;
                    }
                    return res.send('Success');
                 });
            });
            
            
         });
};

exports.getMetadata = function(req,res){
     CV.findOne({'seevId':req.user.seevId}, function(err, result){
            if (err){
                throw err;
            }  

            return res.send({
                seevId    :result.seevId,
                filename  :result.filename,
                filetype  :result.filetype
            });
     });
};