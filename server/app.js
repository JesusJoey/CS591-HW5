const express = require('express')
    ,api = require('./routes/api')
    ,passport = require('passport')
    ,mongoose = require('mongoose')
    ,AuthHandler = require('./routes/AuthHandler')
    ,UserDB = require('./models/user');
var app = express();

var google_strategy = require('passport-google-oauth').OAuth2Strategy;

app.configure(function() {
  app.set('client-url','http://localhost:3000');
  app.set('client-google-signin','/google?action=signin');

  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(passport.initialize());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.use();

mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connected to db");
});

passport.use(new google_strategy({
      clientID: 'YOUR CLIENT ID',
      clientSecret: 'YOUR CLIENT SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      UserDB.findOne({email: profile._json.email},function(err,usr) {
        usr.token = accessToken;
        usr.save(function(err,usr,num) {
          if(err)	{
            console.log('error saving token');
          }
        });
        process.nextTick(function() {
          return done(null,profile);
        });
      });
    }
));

function setup(app,handlers) {
  app.get('/auth/google',handlers.auth.googleSignIn);
  app.get('/auth/google/callback',handlers.auth.googleSignInCallback);
  console.log("Successfully set up routes");
};

exports.setup = setup;

var handlers = {
  auth: new AuthHandler()
};

setup(app,handlers);
app.use(api);
app.listen(3000);
console.log('Sucess on port 3000');

