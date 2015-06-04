module.exports = function(express, app, passport, mongoose, userModel){
 
    var router = express.Router();
 
    router.get('/', function (req, res, next) {
      console.log('route to index');
      res.render('index', { message: req.flash('message') });  
    });

    router.get('/jobseeker', function (req, res, next) {
      res.render('jobseekerHome', {title:'SeeV'})  
    });
    
    router.get('/jobseeker/search', function (req, res, next) {
      res.render('jobseekerSearch', {title:'SeeV'})  
    });
    
    router.get('/notifactions', function (req, res, next) {
      res.render('notifactions', {title:'SeeV'})  
    });
    
    router.get('/employer', function (req, res, next) {
      res.render('employerHome', {title:'SeeV'})  
    });
    
    router.get('/employer/search', function (req, res, next) {
      res.render('Search', {title:'SeeV'})  
    });
    
    router.get('/jobseeker/search', function (req, res, next) {
      res.render('jobseekerSearch', {title:'SeeV'})  
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
        response.render('securetest', {title:'SeeV'});
    });
    
    
    
     router.get('/auth/facebook', passport.authenticate('facebook'));
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
     
     
     
     router.get('/auth/linkedin', passport.authenticate('linkedin'));

     router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));
        
        
     // linkedin -------------------------------

        // send to linkedin to do the authentication
        router.get('/auth/linkedin', passport.authorize('linkedin', { scope : 'email' }));

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