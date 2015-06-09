var Profile          = require('../models/profile');
var CV          = require('../models/cv');
var bodyParser       = require('body-parser');
var fs = require('fs');

module.exports = function(express, app, passport){
 
    var router = express.Router();
 
    router.get('/', function (req, res, next) {
      res.render('common/index', { message: req.flash('message') });  
    });

    router.get('/jobseeker', securePages, function (req, res, next) {
      console.log(req.user.seevId);
      //load profile for current user and return  
      Profile.findOne({'seevId':req.user.seevId}, function(err, result){
            if (err){
                throw err;
            }
          res.render('jobseeker/Home', {title:'SeeV', profile:result})  
      });
      
      
    });
    
    var urlencodedParser = bodyParser.urlencoded({ extended: true });

    var jsonParser = bodyParser.json();
     
    router.route('/jobseeker/uploadCV', urlencodedParser)
     .post(function(req, res){
        console.log(req.body);
        console.log(req.files);
        
        /* var cv = new CV();
         var binary = fs.readFileSync(req.body.UploadSeeV);
         
         cv.seevId        = req.user.seevId;
         cv.filename      = '';
         cv.fileType      = '';
         cv.file          = '';
         
         cv.save(function(err) {
            if (err){
                throw err;
            }
            console.log('cv saved to db.');
            return res.send('Success');
         });*/
        return res.send('Success');
     });

    
    router.route('/jobseeker/contactDetails', urlencodedParser)
    .post(function(req,res){
        console.log(req.body);
        console.log(req.files);
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

            profile.save(function(err) {
                if (err){
                    throw err;
                }
                console.log('Profile changes saved to db.');
                return res.send('Success');
            });

        });
  
    });
    
    router.get('/jobseeker/search', function (req, res, next) {
      res.render('jobseeker/Search', {title:'SeeV'})  
    });
    
    router.get('/notifactions', function (req, res, next) {
      res.render('common/notifactions', {title:'SeeV'})  
    });

    
    router.get('/employer', function (req, res, next) {
      res.render('employer/Home', {title:'SeeV'})  
    });
    
    router.get('/employer/search', function (req, res, next) {
      res.render('emplorer/Search', {title:'SeeV'})  
    });
    
    
    router.get('/employer/shortlist', function (req, res, next) {
      res.render('employer/ShortList', {title:'SeeV'})  
    });

    function securePages(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    }
    
    router.get('/logout', function(request, response, next){
        request.logout();
        console.log('user signed out');
        response.redirect('/');
    });
    
    router.get('/securetest', securePages, function(request, response, next){
        response.render('/common/securetest', {title:'SeeV'});
    });
    
    
    
     router.get('/auth/facebook', passport.authenticate('facebook',{ scope: 'email'}));
     router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));
     
      // facebook -------------------------------

        // send to facebook to do the authentication
        router.get('/auth/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        router.get('/auth/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/jobseeker',
                failureRedirect : '/'
            }));

     
        router.get('/auth/google', passport.authenticate('google',{ scope : ['profile', 'email'] }));
 
        router.get('/auth/google/callback', passport.authenticate('google', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));
     
         
       // send to google to do the authentication
        router.get('/auth/google', passport.authorize('google', { scope : ['profile', 'email'] }));
    
        // the callback after google has authorized the user
        router.get('/auth/google/callback',
            passport.authorize('google', {
                successRedirect : '/jobseeker',
                failureRedirect : '/'
        }));
     
     
     
        router.get('/auth/linkedin', passport.authenticate('linkedin',{ scope : 'r_emailaddress' } ));

        router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));

        // send to linkedin to do the authentication
        router.get('/auth/linkedin', passport.authorize('linkedin', { scope : 'r_emailaddress' }));
    
        // handle the callback after linkedin has authorized the user
        router.get('/auth/linkedin/callback',
            passport.authorize('linkedin', {
            successRedirect : '/jobseeker',
            failureRedirect : '/'
        }));
    
        
        router.post('/auth/local/signup', passport.authenticate('local-signup', {
            successRedirect : '/jobseeker', // redirect to the secure profile section
            failureRedirect : '/' // redirect back to the signup page if there is an error
        }));
    
       router.post('/auth/local/login', passport.authenticate('local-login', {
            successRedirect : '/jobseeker', // redirect to the secure profile section
            failureRedirect : '/'
        }));


    app.use('/', router);
}