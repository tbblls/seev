var express = require("express"),
    path = require('path'),
    app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose = require('mongoose').connect(config.dbURL),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy =  require('passport-google-oauth').OAuth2Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy,
    LocalStrategy = require('passport-local').Strategy;

app.set('views', path.join(__dirname,'views'));
app.engine('html', require('hogan-express'));
app.set('view engine','html');
app.use(express.static(path.join(__dirname, 'public')));


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

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    fullnamne:String
});

app.use(passport.initialize());
app.use(passport.session());



require('./auth/passportAuth.js')(passport, FacebookStrategy, GoogleStrategy, LinkedInStrategy, LocalStrategy, config, mongoose);
require('./routes/routes.js')(express, app, passport);

var server = app.listen(process.env.PORT, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


