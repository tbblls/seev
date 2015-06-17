var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');
var Address = mongoose.model('Address');

exports.update = function(req, res){
     Profile.findOne({'seevId':req.user.seevId}, function(err, result){
            if (err){
                throw err;
            }  

            var profile  = result;
            profile.firstname = req.body.fname;
            profile.familyname = req.body.lname;
            profile.phone = req.body.hphone;
            profile.mobile = req.body.mphone;
            profile.email = req.body.email;
            profile.preferredname = req.body.pname;

//TODO populate address from result...

            var newAddress = new Address();
            newAddress.addressline1 = req.body.address1;
            newAddress.addressline2 = req.body.address2;
            newAddress.state = req.body.state;
            newAddress.postcode = req.body.postcode;
            newAddress.country = req.body.country;
            newAddress.save(function(err, data) {
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
      .exec(function(err, result){
            if (err){
                throw err;
            }
            
            console.log(result);
            res.render('jobseeker/Home', {title:'SeeV', profile:result})  
      });
};