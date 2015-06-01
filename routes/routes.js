module.exports = function(express, app, passport){
 
    var router = express.Router();
 
    router.get('/', function (req, res, next) {
      console.log('route to index');
      res.render('index', {title:'SeeV'})  
    });

    router.get('/jobseeker', function (req, res, next) {
      res.render('jobseekerHome', {title:'SeeV'})  
    });

    function securePages(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    }
    
     router.get('/auth/facebook', passport.authenticate('facebook'));
     router.get('/auth/google', passport.authenticate('google',{ scope : ['profile', 'email'] }));
     router.get('/auth/linkedin', passport.authenticate('linkedin'));

     router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));
     router.get('/auth/google/callback', passport.authenticate('google', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));
     router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
            successRedirect:'/jobseeker',
            failureRedirect:"/"
        }));

    router.post('/auth/local/login', passport.authenticate('local', {
        successRedirect: '/jobseeker',
        failureRedirect: '/'
      })
    );


    app.use('/', router);
}