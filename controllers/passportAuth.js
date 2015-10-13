var User             = require('../models/user');
var Profile          = require('../models/profile');
var shortid          = require('shortid');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(passport, config){

    passport.serializeUser(function(user,done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: config.fb.appId,
        clientSecret: config.fb.appSecret,
        callbackURL: config.fb.callbackURL,
        passReqToCallback :true,
        profileFields: ['id', 'displayName', 'emails']
    },
        function(req, token, refreshToken, profile, done){
            
             process.nextTick(function() {
              // check if the user is already logged in
                if (!req.user) {
                    User.findOne({'facebook.id':profile.id}, function(err, result){
                        if(result){
                            done(null, result);
                        }
                        else{
                            var newUser = new User();
                            var seevId  = shortid.generate();
                            newUser.facebook.token    = token;
                            newUser.facebook.id       = profile.id;
                            newUser.seevId            = seevId;
        
                            newUser.save(function(err){
                                if (err){
                                    throw err;
                                }
                                
                                var email = profile.emails[0].value;
                                var preferredName = profile.displayName;
                                
                                addProfile(seevId, email, preferredName);
                                    
                                done(null, newUser);
                            });
                        }
                    });
                }
                else
                {
                    // user already exists and is logged in, we have to link accounts
                    var user            = req.user; // pull the user out of the session
    
                    // update the current users facebook credentials
                    user.facebook.id    = profile.id;
                    user.facebook.token = token;
 
                    // save the user
                    user.save(function(err) {
                        if (err){
                            throw err;
                        }
                        return done(null, user);
                    });
                    
                }
        });

    }));
    

    
    
    
     passport.use(new GoogleStrategy({

        clientID        : config.googleAuth.clientID,
        clientSecret    : config.googleAuth.clientSecret,
        callbackURL     : config.googleAuth.callbackURL,
        passReqToCallback :true

    },
    function(req, token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // check if the user is already logged in
                if (!req.user) {
                    // try to find the user based on their google id
                    User.findOne({ 'google.id' : profile.id }, function(err, user) {
                        if (err){
                            return done(err);
                        }
                        if (user) {
        
                            // if a user is found, log them in
                            return done(null, user);
                        } else {
                            // if the user isnt in our database, create a new user
                            
                          var newUser = new User();
                          var seevId =   shortid.generate();
                                newUser.google.token = token;
                                newUser.google.id    = profile.id;
                   
                                newUser.seevId   = seevId;
                                
                            newUser.save(function(err){
                                if (err){
                                    throw err;
                                }
                                
                                addProfile(seevId,profile.emails[0].value,profile.displayName);
                                
                                done(null, newUser);
                            });
                        }
                    });
                }else{
                     // user already exists and is logged in, we have to link accounts
                            var user            = req.user; // pull the user out of the session
            
                            // update the current users google credentials
                            user.google.token = token;
                            user.google.id    = profile.id;
                       

                            // save the user
                            user.save(function(err) {
                                if (err){
                                    throw err;
                                }
                                return done(null, user);
                            });
                }
        });

    }));
    
    
    passport.use(new LinkedInStrategy({
        consumerKey        : config.linkedinAuth.clientID,
        consumerSecret    : config.linkedinAuth.clientSecret,
        callbackURL     : config.linkedinAuth.callbackURL,
        profileFields: ['id', 'first-name', 'last-name', 'email-address'],
        passReqToCallback :true
    },
    function(req, token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {
                    // try to find the user based on their linked id
                    User.findOne({ 'linkedin.id' : profile.id }, function(err, user) {
                        if (err){
                            return done(err);
                        }
                        if (user) {
        
                            // if a user is found, log them in
                            return done(null, user);
                        } else {
                            // if the user isnt in our database, create a new user
                            
                            var newUser = new User();
                            var seevId  = shortid.generate();
                                newUser.linkedin.token = token;
                                newUser.linkedin.id    = profile.id;
            
                                newUser.seevId   = seevId;
        
                            newUser.save(function(err){
                                if (err){
                                    throw err;}
                                    
                                    console.log(profile);
                                    
                                    addProfile(seevId,profile.emails[0].value,profile.displayName);
                                    
                                done(null, newUser);
                            });
                        }
                    });
                }else{
             
                            var user            = req.user; // pull the user out of the session
            
                            // update the current users linkedin credentials
                            user.linkedin.token = token;
                            user.linkedin.id    = profile.id;
                         

                            // save the user
                            user.save(function(err) {
                                if (err){
                                    throw err;
                                }
                                return done(null, user);
                            });
                }
        });

    }));
    
    

   passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,  email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){
                console.log('user reg err');
                return done(err);
            }
            // check to see if theres already a user with that email
            if (user) {
                console.log('user exists');
                return done(null, false, req.flash('message', 'That email is already taken.'));
            } else {

                    // if there is no user with that email
                    // create the user
                    var newUser            = new User();
                    var seevId =     shortid.generate();
                    // set the user's local credentials
                    newUser.seevId   = seevId;
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);
        
                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            throw err;
                        }
                        
                        
                        addProfile(seevId,email,req.body.displayName);
                       
                        
                       return done(null, newUser);
                        
                        
                    });
                }

        });    

        });

    }));

   function addProfile(seevId, email, preferredname)
   {

        var newProfile               = new Profile();
            newProfile.seevId        = seevId;
            newProfile.email         = email;
            newProfile.preferredname = preferredname;
    
            newProfile.save(function(err){
                if(err){
                    throw err;
                }
            });
   }


   passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err);
            }
            // if no user is found, return the message
            if (!user){
                return done(null, false, req.flash('message', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('message', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            return done(null, user);
        });

    }));



}