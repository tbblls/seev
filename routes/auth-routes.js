var config       = require('../config/config.js');

module.exports = function(express, app, passport){

    require('../controllers/passportAuth.js')(passport, config);

    var router = express.Router();

    router.get('/logout', function(request, response, next){
        request.logout();
        response.redirect('/');
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
