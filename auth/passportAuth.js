module.exports = function(passport, FacebookStrategy, GoogleStrategy, LinkedInStrategy, LocalStrategy, config, mongoose, bcrypt, userModel){

    

    passport.serializeUser(function(user,done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        userModel.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: config.fb.appId,
        clientSecret: config.fb.appSecret,
        callbackURL: config.fb.callbackURL,
        profileFields:['id','displayName']
    },
        function(accessToken, refreshToken, profile, done){
            userModel.findOne({'id':profile.id}, function(err, result){
                if(result){
                    done(null, result);
                }
                else{
                    var newSeevUser = new userModel({
                        id:profile.id,
                        fullname:profile.displayName
                    });

                    newSeevUser.save(function(err){
                        done(null, newSeevUser);
                    });
                }
            });

    }));
    

    
    
    
     passport.use(new GoogleStrategy({

        clientID        : config.googleAuth.clientID,
        clientSecret    : config.googleAuth.clientSecret,
        callbackURL     : config.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            userModel.findOne({ 'id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    
                    var newSeevUser = new userModel({
                        id:profile.id,
                        fullname:profile.displayName
                    });
                    
                    // save the user
                    newSeevUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newSeevUser);
                    });
                }
            });
        });

    }));
    
    
    passport.use(new LinkedInStrategy({
        consumerKey        : config.linkedinAuth.clientID,
        consumerSecret    : config.linkedinAuth.clientSecret,
        callbackURL     : config.linkedinAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their linked id
            userModel.findOne({ 'id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    
                    var newSeevUser = new userModel({
                        id:profile.id,
                        fullname:profile.displayName
                    });
                    
                    // save the user
                    newSeevUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newSeevUser);
                    });
                }
            });
        });

    }));
    
    

   /*passport.use(new LocalStrategy( function(email, password, done){
         
               console.log('local auth');
            // try to find the user based on their linked id
            userModel.findOne({ 'email' : email },  function(err, user) {
                  if (err) {
                    return done(err);
                  }
             
                  if (!user) {
                      console.log('user not found');
                    return done(null, false);
                  }
                  
                console.log('user  found');
                    
                  if (!bcrypt.compareSync(user.password, password)) {
                    console.log('password doesnt match');
                     return done(null, false, { message: 'Invalid password' });
                  }
                  console.log('return success');
                  return done(null, user);
            });
    

    }));*/



}