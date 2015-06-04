module.exports = function(express, app, passport, bcrypt, mongoose, userModel){
 
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
    
    router.get('/logout', function(request, response, next){
        request.logout();
        response.redirect('/');
    });
    
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

    router.post('/auth/local/login', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.session.messages =  [info.message];
          console.log(req.session.messages);
          return res.redirect('/')
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/jobseeker');
        });
      })(req, res, next);
    });


    router.route('/auth/local/register')
    .post(function(req, res){
        console.log('register');
            var name = req.body.displayName;
            var email = req.body.email;
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    
                    //Save user to db
                   userModel.findOne({ 'email' : email }, function(err, user) {
                    if(!user){
                        var newSeevUser = new userModel({
                            username:email,
                            fullname:name,
                            password:hash
                        });
    
                        newSeevUser.save(function(err){
                            
                            console.log('user created');
                            
                        });
                    }
                    else{
                           console.log('user already exists'); 
                    }
                     
                 });
                    
                });
            });
            
        
        }
    );

    app.use('/', router);
}