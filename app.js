var express = require("express"),
    app     = express(),
    path    = require('path'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    config       = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose     = require('mongoose').connect(config.dbURL),
    passport     = require('passport'),
    bodyParser       = require("body-parser"),
    flash            = require('connect-flash'),
    multer           = require('multer');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(multer({ dest: './uploads/'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


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




app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//SeeV view routes
require('./routes/routes.js')(express, app);

//SeeV authentication routes
require('./routes/auth-routes.js')(express, app, passport);

//SeeV API routes
require('./routes/api-routes.js')(express, app);

var server = app.listen(process.env.PORT, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


