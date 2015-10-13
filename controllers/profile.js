var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');
var Address = mongoose.model('Address');

exports.update = function(req, res){
     Profile.findOne({'seevId':req.user.seevId})
     .populate('address')
     .exec(function(err, result){
            if (err){
                throw err;
            }  
            

            var profile  = result;
            profile.firstname = req.body.profile.firstname;
            profile.familyname = req.body.profile.familyname;
            profile.phone = req.body.profile.phone;
            profile.mobile = req.body.profile.mobile;
            profile.email = req.body.profile.email;
            profile.preferredname = req.body.profile.preferredname;

            var profileAddress;

            if(profile.address){
                profileAddress = profile.address;
            }else{
                profileAddress = new Address();
            }
            
            console.log(profileAddress);
            console.log(req.body.profile.address);
            
            profileAddress.addressline1 = req.body.profile.address.addressline1;
            profileAddress.addressline2 = req.body.profile.address.addressline2;
            profileAddress.state = req.body.profile.address.state;
            profileAddress.postcode = req.body.profile.address.postcode;
            profileAddress.country = req.body.profile.address.country;
            profileAddress.save(function(err, data) {
                if (err){
                    throw err;
                }
                
                profile.address = data._id;   
                profile.save(function(err) {
                    if (err){
                        throw err;
                    } 
                    console.log('Profile changes saved to db.');
                    return res.send('Success');
                });
            });

           
    })
};


exports.get =  function(req, res){
     Profile.findOne({'seevId':req.user.seevId})
      .populate('address')
      .populate('referees')
      .populate('careers')
      .populate('skills')
      .populate('qualifications')
      .exec(function(err, result){
            if (err){
                throw err;
            }
            if(!result.address){
                result.address = new Address();
            }
            console.log('get:' + result);
            return res.send(result); 
      });
};