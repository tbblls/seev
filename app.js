var express = require("express"),
    app     = express(),
    path    = require('path'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    config       = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose     = require('mongoose').connect(config.dbURL),
    passport     = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy   =  require('passport-google-oauth').OAuth2Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy,
    LocalStrategy    = require('passport-local').Strategy,
    bodyParser       = require("body-parser"),
    flash            = require('connect-flash');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

var env = process.env.NODE_ENV || 'development';

if(env==='development'){
    app.use(session({secret:config.sessionSecret, saveUninitialized:true, resave:true}));
}else
{
    //prod
    app.use(session({
        secret:config.sessionSecret,
        store: new ConnectMongo({
            mongoose_connection:mongoose.connections[0],
            stringify:true
        }),
        saveUninitialized:true,
        resave:true}));
}


var seevUser =  new mongoose.Schema({
       profileID:String,
        fullname:String,
        password:String
    });

    var userModel = mongoose.model('seevUser', seevUser);


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./auth/passportAuth.js')(passport, FacebookStrategy, GoogleStrategy, LinkedInStrategy, LocalStrategy, config, mongoose, userModel);
require('./routes/routes.js')(express, app, passport, mongoose, userModel);

var server = app.listen(process.env.PORT, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


