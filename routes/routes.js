var profile          = require('../controllers/profile');
var referee          = require('../controllers/referee');
var cv               = require('../controllers/cv');
var skill            = require('../controllers/skill');
var career           = require('../controllers/career');
var qualification   = require('../controllers/qualification');
var bodyParser       = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

module.exports = function(express, app, passport){
 
    var router = express.Router();
 
    function securePages(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    }
 
    router.get('/', function (req, res, next) {
      res.render('common/index', { message: req.flash('message') });  
    });

    router.get('/jobseeker', securePages, profile.get);

    router.route('/jobseeker/uploadCV', jsonParser)
     .post(cv.add);

    router.route('/jobseeker/contactDetails', urlencodedParser)
    .post(profile.update);
    
    router.route('/jobseeker/referee', urlencodedParser)
    .post(referee.add);
    
    router.route('/jobseeker/skill', urlencodedParser)
    .post(skill.add);
    
    router.route('/jobseeker/career', urlencodedParser)
    .post(career.add);
    
    router.route('/jobseeker/qualification', urlencodedParser)
    .post(qualification.add);
    
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

    router.get('/logout', function(request, response, next){
        request.logout();
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