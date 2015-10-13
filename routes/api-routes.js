var profile          = require('../controllers/profile');
var referee          = require('../controllers/referee');
var cv               = require('../controllers/cv');
var skill            = require('../controllers/skill');
var career           = require('../controllers/career');
var qualification    = require('../controllers/qualification');
var bodyParser       = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

module.exports = function(express, app){
 
    var router = express.Router();
    var jobseekerAPI = '/jobseeker';
    
    function securePages(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    }
 
   


    router.route('/jobseeker/profiles/:id',securePages, urlencodedParser)
    .get(profile.get)
    .post(profile.update);
  
    /* Referee routes ********************************************
    *************************************************************/
    
        router.route('/jobseeker/referees',securePages, urlencodedParser)
        .post(referee.add);
        
        router.route('/jobseeker/referees/:id',securePages, urlencodedParser)
        .get(referee.get)
        .put(referee.update)
        .delete(referee.remove);
    
    /* End Referee routes ***************************************/
    
    
    //Career routes ********************************************
        router.route('/jobseeker/careers',securePages, urlencodedParser)
        .post(career.add);
        
        router.route('/jobseeker/careers/:id',securePages, urlencodedParser)
        .get(career.get)
        .put(career.update)
        .delete(career.remove);
    //End Career routes ****************************************
    
    //Skill routes ********************************************
        router.route('/jobseeker/skills',securePages, urlencodedParser)
        .post(skill.add);
        
        router.route('/jobseeker/skills/:id',securePages, urlencodedParser)
        .get(skill.get)
        .put(skill.update)
        .delete(skill.remove);
    //End Skill routes ****************************************
    
        
    router.route('/jobseeker/qualifications',securePages, urlencodedParser)
    .post(qualification.add);
    
    router.route('/jobseeker/qualifications/:id',securePages, urlencodedParser)
        .get(qualification.get)
        .put(qualification.update)
        .delete(qualification.remove);
    
    //************************************************
    //The below routes have not been fully implemented
    //************************************************
    
   

   
    router.route('/jobseeker/uploadCV',securePages, jsonParser)
     .post(cv.add);

    //************************************************
    //************************************************

    app.use('/', router);
}