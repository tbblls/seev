
var bodyParser       = require('body-parser');


module.exports = function(express, app){
 
    var router = express.Router();

    
    function securePages(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    }

    router.get('/', function (req, res, next) {
      res.render('index', { message: req.flash('message') });  
    });

    router.get('/jobseeker', securePages, function(req, res, next){
        res.render('jobseeker/Home');
    });

    
    //************************************************
    //The below routes have not been fully implemented
    //************************************************
    
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

    //************************************************
    //************************************************

    app.use('/', router);
}